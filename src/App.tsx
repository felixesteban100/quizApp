import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import { useQuery } from 'react-query';
import axios from "axios"
import { APIQuestionsResponse, Category, Question } from './types'
import useLocalStorage from './hooks/useLocalStorage'
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Questions from './components/Questions';
import PostQuestions from './components/PostQuestions';
import PostCategory from './components/PostCategory';
import { API_URL } from './constants';
import PatchQuestion from './components/PatchQuestion';
import DeleteQuestion from './components/DeleteQuestion';
import DeleteCategory from './components/DeleteCategory';
import { useEffect } from 'react';

function App() {
  const [authToken, setAuthToken] = useLocalStorage("QUIZZAPP_TOKEN", "")
  const [userId, setUserId] = useLocalStorage("QUIZZAPP_USERID", "")
  const [currentUserName, setCurrentUserName] = useLocalStorage("CHURCHAPP_USERNAME", "")

  const [theme, setTheme] = useLocalStorage("QUIZZAPP_THEME", "dark")
  const [amountOfQuestions, setAmountOfQuestions] = useLocalStorage<number>('QUIZZAPP_AMOUNT_OF_QUESTIONS', 5)
  const [categoryId, setCategoryId] = useLocalStorage<number>('QUIZZAPP_CATEGORYID', 9)
  const [difficulty, setDifficulty] = useLocalStorage<string>('QUIZZAPP_DIFFICULTY', 'All')
  const [type, setType] = useLocalStorage<string>('QUIZZAPP_TYPE', 'All')

  const { isLoading, isError, data: questionsObtained, refetch: refetchQuestions, isFetching } = useQuery<Question[]>({
    enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryKey: ["Questions"],
    queryFn: authToken === "" ? async () => {
      const result = await axios.get<APIQuestionsResponse>(`https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${categoryId}&type=${type === "All" ? "" : type}&difficulty=${difficulty === "All" ? "" : difficulty}`).then((response) => response.data)
      return result.results.map(cu => {
        cu.all_answers = [cu.correct_answer, ...cu.incorrect_answers].sort(() => Math.random() - 0.5)
        cu.answerSelected = ""
        return cu
      })
    } :
      async () => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${API_URL}/api/v1/questions/filter?amount=${amountOfQuestions}&categoryId=${categoryId}&type=${type}&difficulty=${difficulty}`,
          // url: `${API_URL}/api/v1/questions/filter?categoryId=1&amount=1&difficulty=All&type=All`,
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        };
        const response = await axios.request<Question[]>(config);
        return response.data.map(cu => {
          cu.all_answers = [cu.correct_answer, ...cu.incorrect_answers].sort(() => Math.random() - 0.5)
          return cu
        });
      },
    onError: (error) => console.log(error),
  })

  const { isLoading: isLoadingCategories, isError: isErrorCategories, data: allCategories, refetch: refetchAllCategories } = useQuery<Category[]>({
    enabled: true,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryKey: ["Categories"],
    queryFn: authToken === "" ?
      async () => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://opentdb.com/api_category.php',
        };
        const response = await axios.request(config);
        return response.data.trivia_categories
      }
      :
      async () => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${API_URL}/api/v1/categories`,
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        };
        const response = await axios.request<Category[]>(config);
        return response.data
      },
    onError: (error) => console.log(error),
  })

  useEffect(() => {
    if(authToken === "") setCategoryId(0)
    refetchAllCategories()
  }, [authToken])

  return (
    <div data-theme={theme} className='min-h-[100vh] transition-colors duration-700'>
      <Header
        theme={theme}
        setTheme={setTheme}
        setAuthToken={setAuthToken}
        currentUserName={currentUserName}
        setCurrentUserName={setCurrentUserName}
        listOfLinks={
          authToken === "" ?
            {
              page: [
                { to: '/', tag: 'Home' },
                { to: '/login', tag: 'Login' },
                { to: '/register', tag: 'Register' },
              ]
            }
            :
            {
              page: [
                { to: '/', tag: 'Home' },
              ],
              question: [
                { to: '/postquestions', tag: 'Post Question' },
                { to: '/patchquestions', tag: 'Patch Question' },
                { to: '/deletequestion', tag: 'Delete Question' },
              ],
              category: [
                { to: '/postcategory', tag: 'Post Category' },
                { to: '/deletecategory', tag: 'Delete Category' },
              ],
            }
        }
        loggedIn={authToken !== ""}
      />

      <Routes>
        {
          authToken === "" ?
            <>
              <Route path="/login" element={<Login setUserId={setUserId} setAuthToken={setAuthToken} setCurrentUserName={setCurrentUserName} />} />
              <Route path="/register" element={<Register />} />
            </>
            :
            <>
              <Route path="/postquestions" element={<PostQuestions allCategories={allCategories} authToken={authToken} userId={userId} />} />
              <Route path="/patchquestions" element={<PatchQuestion currentUserName={currentUserName} allCategories={allCategories} authToken={authToken} userId={userId} />} />
              <Route path="/deletequestion" element={<DeleteQuestion currentUserName={currentUserName} authToken={authToken} />} />
              <Route path="/deletecategory" element={<DeleteCategory currentUserName={currentUserName} authToken={authToken} />} />
              <Route path="/postcategory" element={<PostCategory authToken={authToken} userId={userId} />} />
            </>
        }
        <Route
          path="/"
          element={
            <Home
              currentUserName={currentUserName}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              amountOfQuestions={amountOfQuestions}
              setAmountOfQuestions={setAmountOfQuestions}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              type={type}
              setType={setType}
              refetchQuestions={refetchQuestions}
              allCategories={allCategories}
              isLoadingCategories={isLoadingCategories}
              isErrorCategories={isErrorCategories}
            />
          }
        />
        <Route
          path={"/questions"}
          element={
            (questionsObtained !== undefined && !isError) /* && questionsObtained.length === amountOfQuestions */ ?
              <Questions
                questionsObtained={questionsObtained}
                isLoading={isLoading}
                isFetching={isFetching}
                refetchQuestions={refetchQuestions}
                amountOfQuestions={amountOfQuestions}
                isError={isError}
              />
              :
              <div>Error internet</div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App