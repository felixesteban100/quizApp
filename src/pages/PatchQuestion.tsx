import { useState, useEffect } from 'react'
import axios from "axios"
import { Category, Question } from '../types';
import { API_URL, QUESTION_EMPTY } from '../constants';
import useQuestionsByUser from '../hooks/useQuestionsByUser';
import ErrorMessage from '../components/ErrorMessage';
import SuccesfulMessage from '../components/SuccesfulMessage';
import FormComponent from '../components/FormComponent';
import { handleSubmit, handlerFunctionSetterQuestion } from '../functions/formFunctions';
import InputIncorrectAnswers from '../components/InputIncorrectAnswers';
import InputSelect from '../components/InputSelect';
import InputTextForm from '../components/InputTextForm';
import InputTextAreaForm from '../components/InputTextAreaForm';
import ButtonSubmit from '../components/ButtonSubmit';
import SelectorApiCall from '../components/SelectorApiCall';
import { useAuth } from '@clerk/clerk-react';
import { getGeneralEmojiByDifficulty } from '../functions';


type PatchQuestionProps = {
    allCategories: Category[] | undefined;
    currentUserName: string | null
}

function PatchQuestion({ allCategories, currentUserName }: PatchQuestionProps) {
    const { userId, getToken } = useAuth();

    const { isLoading: isLoadingQuestionsByUser, isError: isErrorQuestionsByUser, data: questionsByUser, refetch } = useQuestionsByUser();

    const [questionSelectedId, setQuestionSelectedId] = useState<string>("")

    const [question, setQuestion] = useState<Question>({ ...QUESTION_EMPTY, createdBy: userId ?? "" });

    useEffect(() => {
        if (questionsByUser === undefined) return
        const questionSelectedById = questionsByUser.reduce((acc, curr) => {
            if (curr._id === questionSelectedId) acc = curr
            return acc
        }, QUESTION_EMPTY)

        setQuestion(questionSelectedById)
    }, [questionSelectedId])

    // change this for a react query
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")

    async function PatchQuestion() {
        try {
            return await axios
                .patch(`${API_URL}/api/v1/questions/${questionSelectedId}`, { ...question }, { headers: { Authorization: `Bearer ${await getToken()}` } })
                .catch((error) => setError(error.response.data.msg));
        } catch (error) {
            console.table({ type: typeof error, msg: error })
            setError('Opps... an error happend, please try later')
        }
    }
    // change this for a react query

    async function functionWithhandleSubmit(event: React.FormEvent<HTMLFormElement>) {
        await handleSubmit<Question>(event, setLoading, PatchQuestion, setResponse, setError)
        refetch()
    }

    function handlerInputs(name: string, value: string, type: string, index?: number) {
        handlerFunctionSetterQuestion(name, value, type, setQuestion, index)
    }

    return (
        <FormComponent
            label={'Patch a Question ❓'}
            functionWithhandleSubmit={functionWithhandleSubmit}
        >
            <SelectorApiCall
                loading={isLoadingQuestionsByUser}
                isError={isErrorQuestionsByUser}
                currentUserName={currentUserName}
                items={questionsByUser === undefined ? [] : questionsByUser.map((q) => {
                    return { name: q.question, _id: q._id }
                })}
                value={questionSelectedId}
                name="questionSelected"
                label='Question'
                setValue={setQuestionSelectedId}
            />
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
                items={[{ value: 'multiple', name: "Multiple choice" }, { value: 'boolean', name: "True / False" }]}
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
                            items={[{ value: 'True', name: "True (Incorrect = False)" }, { value: 'False', name: "False (Incorrect = True)" }]}
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
                items={allCategories === undefined ? [] : allCategories.map((c) => { return { name: c.name, value: c.name } })}
            />
            <InputSelect
                label="Difficulty 🧩"
                name="difficulty"
                value={question.difficulty}
                handlerInputs={handlerInputs}
                items={[{ value: 'easy', name: `Easy ${getGeneralEmojiByDifficulty("easy")}` }, { value: 'medium', name: `Medium ${getGeneralEmojiByDifficulty("medium")}` }, { value: 'hard', name: `Hard ${getGeneralEmojiByDifficulty("hard")}`   }]}
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
                label='Patch Question'
                loading={loading}
                disabled={questionSelectedId === ""}
            />
            <ErrorMessage error={error} />
            <SuccesfulMessage response={response} />

        </FormComponent>
    )
}

export default PatchQuestion