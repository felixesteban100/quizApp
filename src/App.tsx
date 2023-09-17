import { Link, Routes, Route } from 'react-router-dom'
import Questions from './components/Questions'
import Home from './components/Home'
import { BiSolidBrain } from 'react-icons/bi'
import { useQuery } from 'react-query';
import axios from "axios"
import { APIQuestionsResponse, Question } from './types'
import useLocalStorage from './hooks/useLocalStorage'
import ChangeTheme from './components/ChangeTheme';


function App() {
  const [theme, setTheme] = useLocalStorage("QUIZZAPP_THEME", "dark")

  const [amountOfQuestions, setAmountOfQuestions] = useLocalStorage<number>('QUIZZAPP_AMOUNT_OF_QUESTIONS', 10)
  const [category, setCategory] = useLocalStorage<number>('QUIZZAPP_CATEGORY', 9)
  const [difficulty, setDifficulty] = useLocalStorage<string>('QUIZZAPP_DIFFICULTY', '')
  const [type, setType] = useLocalStorage<string>('QUIZZAPP_TYPE', '')

  const { isLoading, isError, data: questionsObtained, refetch: refetchQuestions, isFetching } = useQuery<Question[]>({
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryKey: ["Questions"],
    queryFn: async () => {
      const result = await axios.get<APIQuestionsResponse>(`https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${category}&type=${type}&difficulty=${difficulty}`).then((response) => response.data)
      return result.results.map(cu => {
        cu.all_answers = [cu.correct_answer, ...cu.incorrect_answers].sort(() => Math.random() - 0.5)
        cu.answerSelected = ""
        return cu
      })
    },
    onError: (error) => console.log(error),
  })


  return (
    <div data-theme={theme} className='min-h-[100vh] transition-colors duration-700'>
      <div className="h-[7vh] navbar bg-base-200 justify-between ">
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className='btn btn-ghost flex justify-center items-center normal-case text-xl'>
            Quizzical <BiSolidBrain className="text-primary text-3xl" />
          </Link>
        </div>
        <ChangeTheme
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              category={category}
              setCategory={setCategory}
              amountOfQuestions={amountOfQuestions}
              setAmountOfQuestions={setAmountOfQuestions}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              type={type}
              setType={setType}
              refetchQuestions={refetchQuestions}
            />
          }
        />
        <Route
          path={"/questions"}
          element={
            questionsObtained !== undefined && questionsObtained.length === amountOfQuestions ?
              <Questions
                questionsObtained={questionsObtained}
                isLoading={isLoading}
                isError={isError}
                isFetching={isFetching}
                refetchQuestions={refetchQuestions}
                amountOfQuestions={amountOfQuestions}
              />
              :
              <Home
                category={category}
                setCategory={setCategory}
                amountOfQuestions={amountOfQuestions}
                setAmountOfQuestions={setAmountOfQuestions}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                type={type}
                setType={setType}
                refetchQuestions={refetchQuestions}
              />
          }
        />
      </Routes>
    </div>
  )
}

export default App