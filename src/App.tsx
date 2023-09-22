import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import Home from './pages/Home'
import { useQuery } from 'react-query';
import axios from "axios"
import { APIQuestionsResponse, Category, Question } from './types'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/Header';
import { API_URL, REACT_QUERY_DEFAULT_PROPERTIES, ROUTES_LOGIN, ROUTES_LOGOUT } from './constants';
import PatchQuestion from './pages/PatchQuestion';
import DeleteQuestion from './pages/DeleteQuestion';
import DeleteCategory from './pages/DeleteCategory';
import { useEffect } from 'react';
import PostCategory from './pages/PostCategory';
import PostQuestion from './pages/PostQuestions';
import Questions from './pages/Questions';


import { SignedIn, SignedOut, RedirectToSignIn, SignOutButton } from "@clerk/clerk-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import SignInOwn from './pages/SignInOwn';

import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet"

// add a timer if the user deceides 
// add a explanation for the correct answer

//improve the design of the questionsCards

type Link = {
  to: string,
  tag: string
}

function App() {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const { user, isSignedIn: userExists } = useUser()

  const location = useLocation()
  useEffect(() => {
    refetchAllCategories()
  }, [location])

  const [theme, setTheme] = useLocalStorage("QUIZZAPP_THEME", "dark")
  const [amountOfQuestions, setAmountOfQuestions] = useLocalStorage<number>('QUIZZAPP_AMOUNT_OF_QUESTIONS', 5)
  const [categoryId, setCategoryId] = useLocalStorage<number>('QUIZZAPP_CATEGORYID', 9)
  const [difficulty, setDifficulty] = useLocalStorage<string>('QUIZZAPP_DIFFICULTY', 'All')
  const [type, setType] = useLocalStorage<string>('QUIZZAPP_TYPE', 'All')

  const { isLoading, isError, data: questionsObtained, refetch: refetchQuestions, isFetching } = useQuery<Question[]>({
    ...REACT_QUERY_DEFAULT_PROPERTIES,
    queryKey: ["Questions"],
    queryFn: (isSignedIn === false || isSignedIn === undefined)
      ? async () => {
        const result = await axios
          .get<APIQuestionsResponse>(`https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${categoryId}&type=${type === "All" ? "" : type}&difficulty=${difficulty === "All" ? "" : difficulty}`)
          .then((response) => response.data)
        return result.results.map(cu => {
          cu.all_answers = [cu.correct_answer, ...cu.incorrect_answers].sort(() => Math.random() - 0.5)
          cu.answerSelected = ""
          return cu
        })
      }
      : async () => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${API_URL}/api/v1/questions/filter?amount=${amountOfQuestions}&categoryId=${categoryId}&type=${type}&difficulty=${difficulty}`,
          headers: {
            'Authorization': `Bearer ${await getToken()}`
          }
        };
        const response = await axios.request<Question[]>(config);
        return response.data.map(cu => {
          cu.all_answers = [cu.correct_answer, ...cu.incorrect_answers].sort(() => Math.random() - 0.5)
          return cu
        });
      },
  })

  const { isLoading: isLoadingCategories, isError: isErrorCategories, data: allCategories, refetch: refetchAllCategories } = useQuery<Category[]>({
    ...REACT_QUERY_DEFAULT_PROPERTIES,
    enabled: (isSignedIn !== undefined && isLoaded),
    queryKey: ["Categories"],
    queryFn: (isSignedIn === false || isSignedIn === undefined)
      ? async () => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://opentdb.com/api_category.php',
        };
        const response = await axios.request(config);
        return response.data.trivia_categories
      }
      : async () => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${API_URL}/api/v1/categories`,
          headers: { 'Authorization': `Bearer ${await getToken()}` }
        };
        const response = await axios.request<Category[]>(config);
        return response.data
      },
  })

  async function saveUser() {
    try {
      return await axios
        .post(`${API_URL}/api/v1/user`, { ...user }, { headers: { Authorization: `Bearer ${await getToken()}` } })
        .catch((error) => console.log(error.response.data.msg));
    } catch (error) {
      console.table({ type: typeof error, msg: error })
      console.log('Opps... an error happend, please try later')
    }
  }

  useEffect(() => {
    if ((!isSignedIn)) setCategoryId(0)
    if (userExists === true) saveUser()
    refetchAllCategories()
  }, [isSignedIn])


  return (
    <div data-theme={theme} className='min-h-[100vh] transition-colors duration-700'>
      <Sheet>
        <Header
          theme={theme}
          setTheme={setTheme}
        />
        <SheetContent data-theme={theme} side="left" className='bg-base-300 border-none menu p-4 text-base-content w-[45vw] md:w-[30vw] lg:w-[15rem]'>
          {
            !isSignedIn ?
              <li>
                <p className='btn-disabled normal-case font-bold text-base sm:text-lg md:text-xl lg:text-2xl '>Quiz</p>
                <ul className="p-2">
                  {ROUTES_LOGOUT.page.map((currentLinkPage) => {
                    return (
                      <li key={currentLinkPage.to}>
                        <SheetClose asChild>
                          <Link className='text-base sm:text-lg md:text-xl ' to={currentLinkPage.to} >{currentLinkPage.tag}</Link>
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
              </li>
              :
              null
          }
          {
            isSignedIn ?
              <>
                <li>
                  <p className='btn-disabled normal-case font-bold text-base sm:text-lg md:text-xl lg:text-2xl'>User</p>
                  <ul className="p-2 flex flex-col justify-start items-start gap-2">
                    <div className='flex gap-5 items-center'>
                      <img className='rounded-full h-10' src={user?.imageUrl ?? ""} alt="user_image" />
                      {user?.firstName}
                    </div>
                    <SignOutButton>
                      <div className='btn btn-primary normal-case'>Sign out</div>
                    </SignOutButton>
                  </ul>
                </li>
                <li>
                  <p className='btn-disabled normal-case font-bold text-base sm:text-lg md:text-xl lg:text-2xl '>Question</p>
                  <ul className="p-2">
                    {ROUTES_LOGIN.question.map((currentLinkQuestion) => {
                      return (
                        <li key={currentLinkQuestion.to}>
                          <SheetClose asChild>
                            <Link className='text-base sm:text-lg md:text-xl' to={currentLinkQuestion.to} >{currentLinkQuestion.tag}</Link>
                          </SheetClose>
                        </li>
                      )
                    })}
                  </ul>
                </li>
                <li>
                  <p className='btn-disabled normal-case font-bold text-base sm:text-lg md:text-xl lg:text-2xl'>Category</p>
                  <ul className="p-2">
                    {ROUTES_LOGIN.category.map((currentLinkCategory) => {
                      return (
                        <li key={currentLinkCategory.to}>
                          <SheetClose asChild>
                            <Link className='text-base sm:text-lg md:text-xl' to={currentLinkCategory.to} >{currentLinkCategory.tag}</Link>
                          </SheetClose>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              </>
              :
              null
          }
        </SheetContent>
      </Sheet>

      <Routes>
        <Route
          path="/"
          element={<Home currentUserName={user ? user?.fullName : ""} categoryId={categoryId} setCategoryId={setCategoryId} amountOfQuestions={amountOfQuestions} setAmountOfQuestions={setAmountOfQuestions} difficulty={difficulty} setDifficulty={setDifficulty} type={type} setType={setType} refetchQuestions={refetchQuestions} allCategories={allCategories} isLoadingCategories={isLoadingCategories} isErrorCategories={isErrorCategories} isLoading={isLoading} isFetching={isFetching} />}
        />
        <Route
          path="/sign-in/*"
          element={ <SignInOwn /> }
        />
        <Route
          path={"/questions"}
          element={(!isError)
            ? <Questions questionsObtained={questionsObtained ?? []} isLoading={isLoading} isFetching={isFetching} refetchQuestions={refetchQuestions} amountOfQuestions={amountOfQuestions} isError={isError} />
            : <>Error</>
          }
        />
        <Route
          path="/postquestion"
          element={
            <>
              <SignedIn>
                <PostQuestion allCategories={allCategories} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/patchquestion"
          element={
            <>
              <SignedIn>
                <PatchQuestion currentUserName={user ? user?.fullName : ""} allCategories={allCategories} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/deletequestion"
          element={
            <>
              <SignedIn>
                <DeleteQuestion currentUserName={user ? user?.fullName : ""} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/postcategory"
          element={
            <>
              <SignedIn>
                <PostCategory />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/deletecategory"
          element={
            <>
              <SignedIn>
                <DeleteCategory currentUserName={user ? user?.fullName : ""} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App