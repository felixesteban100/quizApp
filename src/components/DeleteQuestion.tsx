import { useState } from 'react'
import axios from "axios"
import { API_URL } from '../constants';
import useQuestionsByUser from '../hooks/useQuestionsByUser';

type DeleteQuestionProps = {
    authToken: string;
    currentUserName: string
}

function DeleteQuestion({ authToken, currentUserName }: DeleteQuestionProps) {
    const {
        isLoading: isLoadingQuestionsByUser,
        isError: isErrorQuestionsByUser,
        data: questionsByUser,
        refetch,
    } = useQuestionsByUser(authToken);

    const [questionSelectedId, setQuestionSelectedId] = useState<string>("")
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")

    async function deleteQuestion() {
        try {
            const response = await axios.delete(
                `${API_URL}/api/v1/questions/${questionSelectedId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            )
                .catch((error) => {
                    setError(error.response.data.msg)
                });
            return response;
        } catch (error) {
            console.log(typeof error)
            console.log(error)
            setError('Opps... an error happend, please try later')
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // console.log(question)
        const responseDeleteQuestion = await deleteQuestion();
        // console.log(responseDeleteQuestion)

        if (typeof responseDeleteQuestion === "object") {
            setError("")
            setResponse("Question Deleted") 
            setTimeout(() => {
                setResponse("") 
            }, 2000)
            refetch()
        }
        // if (responseDeleteQuestion!.statusText === "OK"){
        //     setResponse("Question Deleted") 
        //     refetch()
        // }
    }

    return (
        <div className="min-h-[90vh] flex flex-col justify-center items-center">
            <div className="text-4xl mb-5">Patch a question</div>
            <form className="w-[50%] form-control flex flex-col justify-center align-middle gap-5 mb-5" onSubmit={handleSubmit}>
                <label className="input-group">
                    <span>Questions by: {currentUserName}</span>
                    <select
                        className="select select-bordered w-full"
                        value={questionSelectedId}
                        onChange={(e) => setQuestionSelectedId(e.target.value)}
                        name="questionSelected"
                    >
                        <option value="" disabled selected>Select a category</option>
                        {isLoadingQuestionsByUser ?
                            <span className="loading loading-dots loading-lg"></span>
                            :
                            questionsByUser !== undefined && !isErrorQuestionsByUser ?
                                questionsByUser.map((questionUser) => {
                                    return (
                                        <option key={questionUser._id} value={questionUser._id} >{questionUser.question}</option>
                                    )
                                })
                                :
                                <div>Error fetching questions...</div>
                        }
                    </select>
                </label>

                <div
                    className="btn btn-error"
                    onClick={() => {
                        const modal = document.getElementById('my_modal_4')
                        // @ts-ignore
                        if (modal !== null) modal.showModal()
                    }}>
                    Delete question
                </div>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Deleting question...</h3>
                        <p className="py-4 text-xl md:text-2xl">Are you sure you want to delete this question?</p>

                        {
                            questionsByUser?.map((currQuestion) => {
                                if (currQuestion._id === questionSelectedId) {
                                    return (
                                        <div key={currQuestion._id} className='flex flex-col text-xl md:text-2xl'>
                                            <p>Question: {currQuestion.question}</p>
                                            <p>Corect answer: {currQuestion.correct_answer}</p>
                                            <p>Incorrect answers: {currQuestion.incorrect_answers}</p>
                                            <p>Type: {currQuestion.type}</p>
                                            <p>Category: {currQuestion.category}</p>
                                        </div>
                                    )
                                }
                            })
                        }

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button onClick={() => {deleteQuestion(); refetch()}} className="btn btn-error normal-case">Yes, delete this question.</button>
                            </form>
                        </div>
                    </div>
                </dialog>

                {
                    error !== "" &&
                    <p className='text-red-500'>{error}</p>
                }

                {
                    response !== "" &&
                    <p className='text-green-500'>{response}</p>
                }
            </form>





            {/* <a
                className="w-[30%] btn btn-primary"
                href="#my-modal-2"
            >
                Open modal
            </a>
            <div className="modal" id="my-modal-2">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <a href="#" className="btn">Yay!</a>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default DeleteQuestion