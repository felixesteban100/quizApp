import { useState, useEffect } from 'react'
import { getEmojiByCategoryName, getGeneralEmojiByDifficulty, replaceHTMLEntitiesWithCharacters, replaceUnicodeCharacters } from '../functions';
import { Question } from '../types'
import { useInView } from 'react-intersection-observer';


type QuestionsProps = {
  questionsObtained: Question[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  refetchQuestions: () => void;
  amountOfQuestions: number
}

function Questions({ questionsObtained, isLoading, isError, isFetching, refetchQuestions, amountOfQuestions }: QuestionsProps) {
  const [checkAnswers, setCheckAnswers] = useState<boolean>(false)
  const [q_and_a, setQ_and_a] = useState<Question[]>(questionsObtained)

  useEffect(() => {
    setQ_and_a(questionsObtained)
    setCheckAnswers(false)
  }, [questionsObtained])

  function getCorrectAnswers() {
    return q_and_a.reduce((acc, currQ) => {
      if (currQ.correct_answer === currQ.answerSelected) acc = acc + 1
      return acc
    }, 0)
  }

  return (
    <div className='w-[80vw] max-w-[60rem] mx-auto'>
      {
        isFetching || isLoading ?
          <div className='w-full flex flex-col justify-center items-center gap-10 py-5'>
            {
              Array(amountOfQuestions).fill(0).map((_, index) => {
                return (
                  <QuestionCardLoading index={index} key={index} />
                )
              })
            }
          </div>
          :
          questionsObtained !== undefined || isError ?
            <>
              <div className='w-full flex flex-col justify-center items-center gap-10 py-5'>
                {questionsObtained?.map((question, questionindex) => {
                  return (
                    <QuestionCard
                      key={question.question}
                      q_and_a={q_and_a}
                      setQ_and_a={setQ_and_a}
                      currentQuestionIndex={questionindex}
                      checkAnswers={checkAnswers}
                      question={question}
                    />
                  )
                })}

                {
                  checkAnswers ?
                    <div className='text-2xl'>
                      Correct answers: {getCorrectAnswers()}/{amountOfQuestions}
                    </div>
                    :
                    null
                }
                {
                  checkAnswers ?
                    <div className='btn' onClick={() => refetchQuestions()}>More Questions</div>
                    :
                    <div className={`btn`} onClick={() => setCheckAnswers(true)}>Check Answers</div>
                }
              </div>
            </>
            :
            <div>Error</div>
      }
    </div>
  )
}

type QuestionCardProps = {
  checkAnswers: boolean
  question: Question;
  currentQuestionIndex: number
  q_and_a: Question[];
  setQ_and_a: React.Dispatch<React.SetStateAction<Question[]>>
}
function QuestionCard({ checkAnswers, question, currentQuestionIndex, q_and_a, setQ_and_a }: QuestionCardProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    /* Optional properties */
    threshold: 0.2,
  });

  function SelectQuestion(answerSelected: string) {
    setQ_and_a(prev => {
      const result = prev.map((questionC, index) => {
        if (index === currentQuestionIndex) {
          questionC.answerSelected = answerSelected
        }
        return questionC
      })
      return result
    })
  }

  return (
    <div  ref={sectionRef} className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center bg-base-300 ${sectionInView ? `animate-scaleInCenter` : "animate-scaleOutCenter"}`}>
      <div className='flex flex-col w-[80%] justify-center items-center gap-2'>
        <p className='text-2xl'>Category: <span>{question.category + getEmojiByCategoryName(question.category)}</span></p>
        <p className={`text-2xl`}>
          Difficulty: <span className={`font-semibold ${question.difficulty === "hard" ? 'text-error' : question.difficulty === "medium" ? 'text-warning' : 'text-success'}`}>{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1, question.difficulty.length)} {getGeneralEmojiByDifficulty(question.difficulty)}</span>
        </p>
        <p className='text-2xl font-bold'>{currentQuestionIndex + 1}. {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(question.question))}</p>
      </div>

      {
        checkAnswers ?
          <div className='grid grid-cols-2 gap-2 mt-5'>
            {question.all_answers.map((answer) => {
              return (
                <div
                  className={`
                    ${(q_and_a[currentQuestionIndex].answerSelected === answer && answer !== question.correct_answer) ? "btn btn-error" : "btn"}
                    ${(answer === question.correct_answer) ? "btn btn-success" : "btn"}
                    `}
                  key={answer}
                >
                  {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(answer))}
                </div>
              )
            })}
          </div>
          :
          <div className='grid grid-cols-2 gap-2 mt-5'>
            {question.all_answers.map((answer) => {
              return (
                <div
                  onClick={() => SelectQuestion(answer)}
                  className={`${q_and_a[currentQuestionIndex].answerSelected === answer ? "btn btn-primary" : "btn"}`}
                  key={answer}
                >
                  {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(answer))}
                </div>
              )
            })}
          </div>
      }
    </div>
  )
}


function QuestionCardLoading({ index }: { index: number }) {
  return (
    <div key={index} className='min-w-full p-5 rounded-md flex flex-col justify-around items-center bg-base-300'>
      <div className='animate-pulse flex flex-col gap-2'>
        <div className="h-5 w-[15rem] bg-current rounded-md"></div>
        <div className="h-5 w-[10rem] bg-current rounded-md"></div>
        <div className="h-10 w-[25rem] bg-current rounded"></div>
      </div>

      <div className='animate-pulse grid grid-cols-2 gap-2 mt-5'>
        {Array(4).fill(0).map((_, index) => {
          return (
            <div key={index} className="rounded-md h-14 w-[10rem] bg-current"></div>
          )
        })}
      </div>
    </div>
  )
}


export default Questions