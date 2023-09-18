import { useState } from 'react'
import axios from "axios"
import { API_URL } from '../constants';
import useCategoriesByUser from '../hooks/useCategoriesByUser';

type DeleteCategoryProps = {
    authToken: string;
    currentUserName: string
}

function DeleteCategory({ authToken, currentUserName }: DeleteCategoryProps) {
    const {
        isLoading: isLoadingCategoriesByUser,
        isError: isErrorCategoriesByUser,
        data: categoriesByUser,
        refetch,
    } = useCategoriesByUser(authToken);

    const [CategorySelectedId, setCategorySelectedId] = useState<string>("")
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")

    async function deleteCategory() {
        try {
            const response = await axios.delete(
                `${API_URL}/api/v1/Categories/${CategorySelectedId}`,
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
        console.log('ok')
        const responseDeleteCategory = await deleteCategory();
        console.log(responseDeleteCategory)

        refetch()
        if (typeof responseDeleteCategory === "object") {
            setError("")
            setResponse("Category Deleted")
            setTimeout(() => {
                setResponse("")
            }, 2000)
        }
        // if (responseDeleteCategory!.statusText === "OK") {
        //     setResponse("Category Deleted")
        //     setTimeout(() => {
        //         setResponse("")
        //     }, 2000)
        // }
    }

    return (
        <div className="min-h-[90vh] flex flex-col justify-center items-center">
            <div className="text-4xl mb-5">Delete a Category</div>
            <form className="w-[90%] max-w-[50rem] form-control flex flex-col justify-center align-middle gap-5 mb-5" onSubmit={handleSubmit}>
                <label className="input-group">
                    <span>Categories by: {currentUserName}</span>
                    {isLoadingCategoriesByUser ?
                        <div className="loading loading-dots loading-lg"></div>
                        :
                        <select
                            className="select select-bordered w-full"
                            value={CategorySelectedId}
                            onChange={(e) => setCategorySelectedId(e.target.value)}
                            name="CategorySelected"
                        >
                            <option value="" disabled>Select a category</option>

                            {categoriesByUser !== undefined && !isErrorCategoriesByUser ?
                                categoriesByUser.map((categoryUser) => {
                                    return (
                                        <option key={categoryUser._id} value={categoryUser._id} >{categoryUser.name}</option>
                                    )
                                })
                                :
                                <div>Error fetching Categories...</div>
                            }
                        </select>
                    }
                </label>

                <div
                    className={`btn btn-error ${CategorySelectedId === "" ? "btn-disabled" : ""}`}
                    onClick={() => {
                        const modal = document.getElementById('my_modal_deleteCategory')
                        // @ts-ignore
                        if (modal !== null) modal.showModal()
                    }}>
                    Delete Category
                </div>
                <dialog id="my_modal_deleteCategory" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Deleting Category...</h3>
                        <p className="py-4 text-xl md:text-2xl">Are you sure you want to delete this Category?</p>

                        {
                            categoriesByUser?.map((currCategory) => {
                                if (currCategory._id === CategorySelectedId) {
                                    return (
                                        <div key={currCategory._id} className='flex flex-col text-xl md:text-2xl'>
                                            <p>Category: {currCategory.name}</p>
                                            <p>Corect answer: {currCategory.id}</p>
                                        </div>
                                    )
                                }
                            })
                        }

                        <div className="modal-action">
                            <div onClick={() => {
                                const modal = document.getElementById('my_modal_deleteCategory')
                                // @ts-ignore
                                if (modal !== null) modal.close()
                            }} className="btn btn-primary normal-case">Cancel</div>
                            <button type='submit' onClick={() => {
                                const modal = document.getElementById('my_modal_deleteCategory')
                                // @ts-ignore
                                if (modal !== null) modal.close()
                            }} className="btn btn-error normal-case">Yes, delete this Category.</button>
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

export default DeleteCategory