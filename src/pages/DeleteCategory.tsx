import { useState } from 'react'
import axios from "axios"
import { API_URL } from '../constants';
import useCategoriesByUser from '../hooks/useCategoriesByUser';
import SuccesfulMessage from '../components/SuccesfulMessage';
import ErrorMessage from '../components/ErrorMessage';
import { Category } from '../types';
import { handleSubmit } from '../functions/formFunctions';
import FormComponent from '../components/FormComponent';
import DeleteModal from '../components/DeleteModal';
import { useAuth } from '@clerk/clerk-react';
import SelectorApiCall from '../components/SelectorApiCall';

type DeleteCategoryProps = {
    currentUserName: string | null
}

function DeleteCategory({ currentUserName }: DeleteCategoryProps) {
    const { getToken } = useAuth();
    const { isLoading: isLoadingCategoriesByUser, isError: isErrorCategoriesByUser, data: categoriesByUser, refetch, isFetching } = useCategoriesByUser();

    // change this for a react query
    const [CategorySelectedId, setCategorySelectedId] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")

    async function deleteCategory() {
        try {
            return await axios
                .delete(`${API_URL}/api/v1/categories/${CategorySelectedId}`, { headers: { Authorization: `Bearer ${await getToken()}` } })
                .catch((error) => setError(error.response.data.msg));
        } catch (error) {
            console.table({ type: typeof error, msg: error })
            setError('Opps... an error happend, please try later')
        }
    }
    // change this for a react query
    async function functionWithhandleSubmit(event: React.FormEvent<HTMLFormElement>) {
        await handleSubmit<Category>(event, setLoading, deleteCategory, setResponse, setError)
        refetch()
    }

    return (
        <FormComponent
            label={'Delete Category 🗂️'}
            functionWithhandleSubmit={functionWithhandleSubmit}
        >
            <SelectorApiCall
                loading={isLoadingCategoriesByUser || isFetching}
                isError={isErrorCategoriesByUser}
                currentUserName={currentUserName}
                items={categoriesByUser === undefined ? [] : categoriesByUser.map((c) => {
                    return {
                        name: c.name,
                        _id: c._id
                    }
                })}
                value={CategorySelectedId}
                name="categorySelected"
                label='Category'
                setValue={setCategorySelectedId}
            />

            <DeleteModal
                disabled={CategorySelectedId === ""}
                loading={loading}
                modalId="my_modal_deleteCategory"
                label="Category"
            >
                <h3 className="font-bold text-3xl text-primary">Deleting category...</h3>
                <p className="py-4 text-xl md:text-2xl text-error bg-accent rounded-md">Are you sure you want to delete this category?</p>
                <>
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
                </>
            </DeleteModal>
            <ErrorMessage error={error} />
            <SuccesfulMessage response={response} />
        </FormComponent>
    )
}

export default DeleteCategory