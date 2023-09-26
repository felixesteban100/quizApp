import { useState, useEffect } from 'react'
import { getEmojiByCategoryName, getGeneralEmojiByDifficulty, replaceHTMLEntitiesWithCharacters, replaceUnicodeCharacters } from '../functions';
import { Question } from '../types'
// import { EMPTY_QUESTION } from '../constants';
import { useInView } from 'react-intersection-observer';
import AnswersContainer from '../components/AnswersContainer';
import { Link } from 'react-router-dom';

type QuestionsProps = {
  questionsObtained: Question[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean
  refetchQuestions: () => void;
  amountOfQuestions: number
}

function Questions({ questionsObtained, isLoading, isFetching, isError, refetchQuestions/* , amountOfQuestions */ }: QuestionsProps) {
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

  /* return (
    <div className={`w-[90vw] max-w-[115rem] min-h-[80vh] mx-auto`}>
      <div className='w-full flex flex-col justify-center items-center gap-10 py-5'>
        {Array(1).fill(EMPTY_QUESTION).map((questionEmpty, index) => <QuestionCardLoading question={questionEmpty} key={index} />)}
      </div>
    </div>
  )
 */
  return (
    <div className={`w-[90vw] max-w-[115rem] min-h-[80vh] mx-auto`}>
      {
        isFetching || isLoading ?
          <>
            {/* <div className='w-full flex flex-col justify-center items-center gap-10 py-5'>
              {Array(amountOfQuestions).fill(EMPTY_QUESTION).map((questionEmpty, index) => <QuestionCardLoading question={questionEmpty} key={index} />)}
            </div> */}
            <div className='w-full flex justify-center h-[90vh]'>
              <span className="w-[30%] mx-auto loading loading-dots"></span>
            </div>
          </>
          :
          isError
            ? <div className='text-center text-2xl capitalize'>Opps... something happend try again please</div>
            : <>
              <div className='w-full flex flex-col justify-center items-center gap-10 py-5'>
                {
                  questionsObtained.length !== 0 && q_and_a.length !== 0
                    ? <>
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
                          <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
                            <div className='text-2xl capitalize'>
                              Correct answers: {getCorrectAnswers()}/{questionsObtained.length}
                            </div>
                            <div className='flex flex-row justify-center items-center gap-5'>
                              <div className='btn capitalize btn-primary' onClick={() => {
                                window.scrollTo(0, 0)
                                setTimeout(() => {
                                  refetchQuestions()
                                }, 1000)
                              }}
                              >
                                More Questions
                              </div>
                              <Link
                                className='btn  capitalize'
                                to="/"
                              >
                                Return home page
                              </Link>
                            </div>
                          </div>
                          :
                          <div className={`btn capitalize text-2xl p-5 h-fit`} onClick={() => setCheckAnswers(true)}>Check Answers</div>
                      }
                    </>
                    : null //<div>No questions found</div>
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
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
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
    <div
      ref={sectionRef}
      // className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center bg-base-300 ${sectionInView ? `animate-scaleInCenter` : "animate-scaleOutCenter"}`}
      className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center ${sectionInView ? `animate-scaleInCenter` : "animate-scaleOutCenter"}`}
    // className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center bg-base-300`}
    >
      <div className='flex flex-col w-[80%] justify-center items-center gap-2'>
        <p className='text-xl md:text-2xl lg:text-3xl'>Category: <span className='font-bold'>{question.category + getEmojiByCategoryName(question.category)}</span></p>
        <p className={`text-xl md:text-2xl lg:text-3xl`}>
          Difficulty: <span className={`font-bold ${question.difficulty === "hard" ? 'text-error' : question.difficulty === "medium" ? 'text-warning' : 'text-success'}`}>{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1, question.difficulty.length)} {getGeneralEmojiByDifficulty(question.difficulty)}</span>
        </p>
        <p className='my-5 text-2xl md:text-2xl lg:text-5xl font-bold'>{currentQuestionIndex + 1}. {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(question.question))}</p>
        {
          question.img && question.img.includes('http') ?
            <img className='rounded-md max-h-[20rem]' src={question.img} alt={question.question} />
            :
            null
        }
      </div>
      {
        checkAnswers ?
          <AnswersContainer>
            {question.all_answers.map((answer) => {
              return (
                <div
                  className={`
                      ${(q_and_a[currentQuestionIndex].answerSelected === answer && answer !== question.correct_answer) ? "bg-error text-error-content" : ""}
                      ${(answer === question.correct_answer) ? "bg-success text-success-content" : ""}
                      flex justify-center items-center
                      capitalize
                      overflow-hidden
                      text-md md:text-xl 
                      p-5
                      rounded-md
                      bg-base-300
                    `}
                  key={answer}
                >
                  {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(answer))}
                </div>
              )
            })}
          </AnswersContainer>
          :
          <AnswersContainer>
            {question.all_answers.map((answer) => {
              if (q_and_a[currentQuestionIndex] === undefined) return (
                <div
                  onClick={() => SelectQuestion(answer)}
                  className={`overflow-hidden capitalize btn `}
                  key={answer}
                >
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              )
              return (
                <div
                  onClick={() => SelectQuestion(answer)}
                  className={
                    `flex justify-center items-center
                    text-md md:text-xl 
                    cursor-pointer 
                    overflow-hidden 
                    capitalize 
                    p-5 
                    rounded-md 
                    hover:bg-primary 
                    hover:text-primary-content
                    font-semibold
                    bg-base-300
                    ${q_and_a[currentQuestionIndex].answerSelected === answer ?
                      "bg-primary text-primary-content"
                      :
                      "bg-base-100"
                    }
                    `
                  }
                  key={answer}
                >
                  {replaceHTMLEntitiesWithCharacters(replaceUnicodeCharacters(answer))}
                </div>
              )
            })}
          </AnswersContainer>
      }
      <br />
      <hr className='h-2 w-[90%] bg-current' />
    </div>
  )
}


/* function QuestionCardLoading({ question }: { question: Question }) {
  return (
    <div className={`min-w-full p-5 rounded-md flex flex-col justify-around items-center `}>
      <div className='animate-pulse flex flex-col w-[80%] justify-center items-center gap-2'>
        <span className='bg-base-content h-5 w-[30%] rounded-md'></span>
        <span className='bg-base-content h-5 w-[70%] rounded-md'></span>
        <span className='bg-base-content h-5 w-[30%] rounded-md'></span>
        <span className='bg-base-content h-[30%] w-[30%] rounded-md'></span>
      </div>
      <AnswersContainer>
        {question.all_answers.map((answer) => {
          return (
            <div
              className={`
                      flex justify-center items-center
                      capitalize
                      overflow-hidden
                      text-md md:text-xl 
                      p-5
                      rounded-md
                      bg-base-300
                    `}
              key={answer}
            >
              <span className='bg-base-content h-5 w-[30%] rounded-md'></span>
            </div>
          )
        })
        }
      </AnswersContainer>
    </div>
  )
} */


export default Questions