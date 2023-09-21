import { useState } from 'react'
import axios from "axios"
import { API_URL } from '../constants';
import useQuestionsByUser from '../hooks/useQuestionsByUser';
import SuccesfulMessage from '../components/SuccesfulMessage';
import ErrorMessage from '../components/ErrorMessage';
import SelectorApiCall from '../components/SelectorApiCall';
import DeleteModal from '../components/DeleteModal';
import { Question } from '../types';
import FormComponent from '../components/FormComponent';
import { handleSubmit } from '../functions/formFunctions';
import { useAuth } from '@clerk/clerk-react';


type DeleteQuestionProps = {
    currentUserName: string | null
}

function DeleteQuestion({ currentUserName }: DeleteQuestionProps) {
    const { getToken } = useAuth();
    const { isLoading: isLoadingQuestionsByUser, isError: isErrorQuestionsByUser, data: questionsByUser, refetch, isFetching } = useQuestionsByUser();

    // change this for a react query
    const [loading, setLoading] = useState(false)
    const [questionSelectedId, setQuestionSelectedId] = useState<string>("")
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")
    async function deleteQuestion() {
        try {
            return await axios.delete(`${API_URL}/api/v1/questions/${questionSelectedId}`, { headers: { Authorization: `Bearer ${await getToken()}` } }).catch((error) => setError(error.response.data.msg));
        } catch (error) {
            console.table({ type: typeof error, msg: error })
            setError('Opps... an error happend, please try later')
        }
    }
    // change this for a react query

    async function functionWithhandleSubmit(event: React.FormEvent<HTMLFormElement>) {
        await handleSubmit<Question>(event, setLoading, deleteQuestion, setResponse, setError)
        refetch()
    }

    return (
        <FormComponent
            label={'Delete a Question ❓'}
            functionWithhandleSubmit={functionWithhandleSubmit}
        >
            <SelectorApiCall
                loading={isLoadingQuestionsByUser || isFetching}
                isError={isErrorQuestionsByUser}
                currentUserName={currentUserName}
                items={questionsByUser === undefined ? [] : questionsByUser.map((q) => {
                    return {
                        name: q.question,
                        _id: q._id
                    }
                })}
                value={questionSelectedId}
                name="questionSelected"
                label='Question'
                setValue={setQuestionSelectedId}
            />

            <DeleteModal
                disabled={questionSelectedId === ""}
                loading={loading}
                modalId="my_modal_deleteQuestion"
                label="Question"
            >
                <h3 className="font-bold text-3xl text-primary">Deleting question...</h3>
                <p className="py-4 text-xl md:text-2xl text-error bg-accent rounded-md">Are you sure you want to delete this question?</p>
                <>
                    {
                        questionsByUser?.map((currQuestion) => {
                            if (currQuestion._id === questionSelectedId) {
                                return (
                                    <div key={currQuestion._id} className='flex flex-col text-xl md:text-2xl gap-5 justify-center items-center'>
                                        <p>Question: {currQuestion.question}</p>
                                        <p>Answer: {currQuestion.correct_answer}</p>
                                        {/* <p>Incorrect answers: {currQuestion.incorrect_answers}</p> */}
                                        <p>Type: {currQuestion.type}</p>
                                        <p>Category: {currQuestion.category}</p>
                                        <img className='w-[80%] max-w-[30rem] h-auto' src={currQuestion.img} alt="img" />
                                    </div>
                                )
                            }
                        })
                    }</>
            </DeleteModal>

            <ErrorMessage error={error} />
            <SuccesfulMessage response={response} />
        </FormComponent>
    )
}

export default DeleteQuestion