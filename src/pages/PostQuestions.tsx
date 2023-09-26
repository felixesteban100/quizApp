import { useState } from 'react'
import axios from "axios"
import { Category, Question } from '../types';
import { API_URL, QUESTION_EMPTY } from '../constants';
import ErrorMessage from '../components/ErrorMessage';
import SuccesfulMessage from '../components/SuccesfulMessage';
import { handleSubmit, handlerFunctionSetterQuestion } from '../functions/formFunctions';
import InputTextAreaForm from '../components/InputTextAreaForm';
import FormComponent from '../components/FormComponent';
import InputIncorrectAnswers from '../components/InputIncorrectAnswers';
import InputTextForm from '../components/InputTextForm';
import InputSelect from '../components/InputSelect';
import ButtonSubmit from '../components/ButtonSubmit';
import { useAuth } from '@clerk/clerk-react';
import { getGeneralEmojiByDifficulty } from '../functions';
import { useSearchParams } from 'react-router-dom';


type PostQuestionProps = {
  allCategories: Category[] | undefined
}

function PostQuestion({ allCategories }: PostQuestionProps) {
  const { userId, getToken } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams({ ...QUESTION_EMPTY, createdBy: userId ?? "" })

  const question = {
    question: searchParams.get("question") ?? "",
    type: searchParams.get("type") ?? "multiple",
    correct_answer: searchParams.get("type") ?? "",
    incorrect_answers: JSON.parse(searchParams.get("incorrect_answers") ?? "[]") ,
    category: searchParams.get("category") ?? "",
    difficulty: searchParams.get("difficulty") ?? "",
    img: searchParams.get("difficulty") ?? "",
  }

  // const [question, setQuestion] = useState<Question>({ ...QUESTION_EMPTY, createdBy: userId ?? "" });

  // change this for a react query
  const [error, setError] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  async function postQuestion() {
    const tokenClerk = await getToken()
    try {
      const response = await axios
        .post(`${API_URL}/api/v1/questions`, { ...question }, { headers: { Authorization: `Bearer ${tokenClerk}` } })
        .catch((error) => {
          setError(error.response.data.msg)
          setTimeout(() => {
            setError("")
          }, 2000)
        });
      return response;
    } catch (error) {
      console.table({ type: typeof error, msg: error })
      setError('Opps... an error happend, please try later')
    }
  }
  // change this for a react query

  async function functionWithhandleSubmit(event: React.FormEvent<HTMLFormElement>) {
    await handleSubmit<Question>(event, setLoading, postQuestion, setResponse, setError)
  }

  function handlerInputs(name: string, value: string, type: string, index?: number) {
    // handlerFunctionSetterQuestion(name, value, type, setQuestion, index)
    handlerFunctionSetterQuestion(name, value, type, setSearchParams, index)
  }

  return (
    <FormComponent
      label={'Post a new Question ❓'}
      functionWithhandleSubmit={functionWithhandleSubmit}
    >
      <InputTextAreaForm
        label={"Question ❓"}
        placeholder="Enter question..."
        value={question.question}
        name={"question"}
        handlerInputs={handlerInputs}
        typeOffuntionToApply="text"
      />
      <InputSelect
        label="Type 🔤"
        name="type"
        value={question.type}
        handlerInputs={handlerInputs}
        items={[
          { value: 'multiple', name: "Multiple choice 🔠" },
          { value: 'boolean', name: "True / False 0️⃣1️⃣" }
        ]}
      />
      <>
        {
          question.type === 'multiple' ?
            <InputTextForm
              label={'Correct answer ✅'}
              type={"text"}
              placeholder="Enter correct answer..."
              value={question.correct_answer}
              name="correct_answer"
              handlerInputs={handlerInputs}
              typeOffuntionToApply={"text"}
            />
            :
            <InputSelect
              label="Correct answer ✅"
              name="correct_answer"
              value={question.correct_answer}
              handlerInputs={handlerInputs}
              items={[
                { value: 'True', name: "True (Incorrect = False) " },
                { value: 'False', name: "False (Incorrect = True) " }
              ]}
            />
        }
      </>
      <InputIncorrectAnswers
        questionType={question.type}
        label="Incorrect Answers ⛔"
        value0={question.incorrect_answers[0] ?? ""}
        value1={question.incorrect_answers[1] ?? ""}
        value2={question.incorrect_answers[2] ?? ""}
        name="incorrect_answers"
        handlerInputs={handlerInputs}
        typeOffuntionToApply="incorrect_answers"
      />
      <InputSelect
        label="Category 🗂️"
        name="category"
        value={question.category}
        handlerInputs={handlerInputs}
        items={allCategories === undefined ? [] : allCategories.map((c) => {
          return { name: c.name, value: c.name }
        })}
      />
      <InputSelect
        label="Difficulty 🧩"
        name="difficulty"
        value={question.difficulty}
        handlerInputs={handlerInputs}
        items={[
          { value: 'easy', name: `Easy ${getGeneralEmojiByDifficulty("easy")}` },
          { value: 'medium', name: `Medium ${getGeneralEmojiByDifficulty("medium")}` },
          { value: 'hard', name: `Hard ${getGeneralEmojiByDifficulty("hard")}` }
        ]}
      />
      <InputTextForm
        label={'Image 🖼'}
        type={"text"}
        placeholder="Enter image..."
        value={question.img}
        name="img"
        handlerInputs={handlerInputs}
        typeOffuntionToApply={"text"}
      />
      <ButtonSubmit
        label='Post Question'
        loading={loading}
        disabled={false}
      />
      <ErrorMessage error={error} />
      <SuccesfulMessage response={response} />
    </FormComponent>
  )
}

export default PostQuestion