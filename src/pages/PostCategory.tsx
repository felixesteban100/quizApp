import { useState } from 'react'
import axios from "axios"
import { Category } from '../types';
import { API_URL } from '../constants';
import SuccesfulMessage from '../components/SuccesfulMessage';
import ErrorMessage from '../components/ErrorMessage';
import InputTextForm from '../components/InputTextForm';
import FormComponent from '../components/FormComponent';
import { handleInputChange, handleSubmit } from '../functions/formFunctions';
import ButtonSubmit from '../components/ButtonSubmit';
import { useAuth } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';

function PostCategory() {
  const { getToken } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams({ _id: "", name: "", id: "1" })

  const category = { _id: searchParams.get("_id") ?? "", name: searchParams.get("name") ?? "", id: searchParams.get("id") ?? "" }

  // const [category, setCategory] = useState<Category>({ _id: "", name: "", id: 1 });

  // change this for a react query
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [response, setResponse] = useState("")

  async function postCategory() {
    const { name, id } = category
    try {
      const tokenClerk = await getToken()
      const response = await axios
        .post(`${API_URL}/api/v1/categories`, { "name": name, "id": id }, { headers: { Authorization: `Bearer ${tokenClerk}` } })
        .catch((error) => setError(error.response.data.msg));
      return response;
    } catch (error) {
      console.table({ type: typeof error, msg: error })
      setError('Opps... an error happend, please try later')
    }
  }
  // change this for a react query

  async function functionWithhandleSubmit(event: React.FormEvent<HTMLFormElement>) {
    await handleSubmit<Category>(event, setLoading, postCategory, setResponse, setError)
  }

  function handlerInputs(name: string, value: string) {
    // handleInputChange<typeof category>(name, value, setCategory)
    handleInputChange(name, value, setSearchParams)
  }

  return (
    <FormComponent
      label={'Post new Category 🗂️'}
      functionWithhandleSubmit={functionWithhandleSubmit}
    >
      <InputTextForm
        label={'Name 🗂️'}
        type={"text"}
        placeholder="Enter name..."
        value={category.name}
        name="name"
        handlerInputs={handlerInputs}
        typeOffuntionToApply={"text"}
      />
      <InputTextForm
        label={'Id #️⃣'}
        type={"number"}
        placeholder="Enter id number..."
        value={category.id}
        name="id"
        min={1}
        handlerInputs={handlerInputs}
        typeOffuntionToApply={"text"}
      />
      <ButtonSubmit
        label='Post Category'
        loading={loading}
        disabled={false}
      />
      <ErrorMessage error={error} />
      <SuccesfulMessage response={response} />
    </FormComponent>
  )
}

export default PostCategory