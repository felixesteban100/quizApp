import { useState, useEffect } from 'react'
import { getEmojiByCategoryName, getGeneralEmojiByDifficulty, replaceHTMLEntitiesWithCharacters, replaceUnicodeCharacters } from '../functions';
import { Question } from '../types'
// import { useInView } from 'react-intersection-observer';
import { EMPTY_QUESTION } from '../constants';


type QuestionsProps = {
  questionsObtained: Question[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean
  refetchQuestions: () => void;
  amountOfQuestions: number
}

function Questions({ questionsObtained, isLoading, isFetching, isError, refetchQuestions, amountOfQuestions }: QuestionsProps) {
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
    <div className='w-[90vw] max-w-[115rem] min-h-[80vh] mx-auto'>
      {
        isFetching || isLoading ?
          <>
            <div className='w-full flex flex-col justify-center items-center gap-10 py-5'>
              {
                Array(amountOfQuestions).fill(EMPTY_QUESTION).map((questionEmpty, index) => {
                  return (
                    <QuestionCardLoading question={questionEmpty} key={index} />
                  )
                })
              }
            </div>
          </>
          :
          isError ? 
              <div className='text-center text-2xl'>Opps... something happend try again please</div>
          :
          <>
            <div className='w-full flex flex-col justify-center items-center gap-10 py-5'>
              {
                questionsObtained.length !== 0 ?
                  <>
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
                        <div className='flex justify-center items-center gap-5'>
                          <div className='text-2xl'>
                            Correct answers: {getCorrectAnswers()}/{questionsObtained.length}
                          </div>
                          <div className='btn' onClick={() => { window.scrollTo(0, 0); refetchQuestions() }}>More Questions</div>
                        </div>
                        :
                        <div className={`btn`} onClick={() => setCheckAnswers(true)}>Check Answers</div>
                    }
                  </>
                  :
                  <div>No questions founded</div>
              }
            </div>
          </>
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
  /* const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
  }); */

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
    <div
      // ref={sectionRef}
      // className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center bg-base-300 ${sectionInView ? `animate-scaleInCenter` : "animate-scaleOutCenter"}`}
      className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center bg-base-300`}
    >
      <div className='flex flex-col w-[80%] justify-center items-center gap-2'>
        <p className='text-md md:text-2xl'>Category: <span>{question.category + getEmojiByCategoryName(question.category)}</span></p>
        <p className={`text-md md:text-2xl`}>
          Difficulty: <span className={`font-semibold ${question.difficulty === "hard" ? 'text-error' : question.difficulty === "medium" ? 'text-warning' : 'text-success'}`}>{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1, question.difficulty.length)} {getGeneralEmojiByDifficulty(question.difficulty)}</span>
        </p>
        <p className='text-md md:text-2xl font-bold'>{currentQuestionIndex + 1}. {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(question.question))}</p>
        {
          question.img && question.img.includes('http') ?
            <img className='rounded-md max-h-[20rem]' src={question.img} alt={question.question} />
            :
            null
        }
      </div>
      {
        checkAnswers ?
          <div className='w-[80%] grid grid-cols-2 md:grid-cols-4 gap-2 mt-5'>
            {question.all_answers.map((answer) => {
              return (
                <div
                  // ${(q_and_a[currentQuestionIndex].answerSelected === answer && answer !== question.correct_answer) ? "btn btn-error" : "btn"}
                  className={`
                      btn
                      ${(q_and_a[currentQuestionIndex].answerSelected === answer && answer !== question.correct_answer) ? "btn-error" : ""}
                      ${(answer === question.correct_answer) ? "btn-success" : ""}
                      capitalize
                      overflow-hidden
                    `}
                  key={answer}
                >
                  {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(answer))}
                </div>
              )
            })}
          </div>
          :
          <div className='w-[80%] h-auto grid grid-cols-2 md:grid-cols-4 gap-2 mt-5 justify-center items-center'>
            {question.all_answers.map((answer) => {
              return (
                <div
                  onClick={() => SelectQuestion(answer)}
                  className={`overflow-hidden capitalize ${q_and_a[currentQuestionIndex].answerSelected === answer ? "btn btn-primary" : "btn"}`}
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


function QuestionCardLoading({ question }: { question: Question }) {
  return (
    <div className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center bg-base-300 `}>
      <div className='animate-pulse flex flex-col w-[80%] justify-center items-center gap-2'>
        <p className='text-md md:text-2xl'>■■■■■■■: <span>{question.category + '❓❔'}</span></p>
        <p className={`text-md md:text-2xl`}>
          ■■■■■■■■■■: <span className={`font-semibold text-primary`}>{question.difficulty}</span>
        </p>
        <p className='text-md md:text-2xl font-bold'>{question.question}</p>
      </div>
      <div className='min-w-[100%] grid grid-cols-2 gap-2 mt-5'>
        {question.all_answers.map((answer, index) => {
          return (
            <div
              className={`btn btn-disabled overflow-hidden capitalize`}
              key={index}
            >
              {answer}
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default Questions