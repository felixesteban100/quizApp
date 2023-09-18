import { useState } from 'react'
import axios from "axios"
import { Category } from '../types';
import { API_URL } from '../constants';
// import { Types } from 'mongoose';

type PostCategoryProps = {
  userId: string
  authToken: string;
}

function PostCategory({ authToken/* , userId */ }: PostCategoryProps) {
  const [category, setCategory] = useState<Category>({
    name: "",
    id: 1,
    // createdBy: new Types.ObjectId(userId)
  });

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [response, setResponse] = useState("")

  async function postCategory({ name, id }: Category) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/categories`,
        { "name": name, "id": id },
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

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (value === '0') setCategory({ ...category, [name]: 1 });
    if (value !== '0') setCategory({ ...category, [name]: value });
  };


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log(category)
    setLoading(true)
    const responsePostMember = await postCategory(category);
    setLoading(false)
    // console.log(responsePostMember)
    if (typeof responsePostMember === "object") {
      setError("")
      setResponse("Category posted")
      setTimeout(() => {
        setResponse("")
      }, 2000)
    }
    // if (responsePostMember!.statusText === "Created") {
    //   setResponse("Category posted")
    //   setTimeout(() => {
    //     setResponse("")
    //   }, 2000)
    // }
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center">
      <div className="text-4xl mb-5">Post a new category</div>
      <form className="w-[90%] max-w-[50rem] form-control flex flex-col justify-center align-middle gap-5 mb-5" onSubmit={handleSubmit}>
        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Name</span>
          <input
            required
            type="text"
            placeholder="Enter name..."
            className="input input-bordered w-full rounded-t-none"
            value={category.name}
            name="name"
            onChange={(event) => handleInputChange(event)}
          />
        </label>
        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Id</span>
          <input
            required
            type="number"
            placeholder="Enter id number..."
            className="input input-bordered w-full rounded-t-none"
            value={category.id}
            name="id"
            min={1}
            onChange={(event) => handleInputChange(event)}
          />
        </label>

        <button
          className="w-[30%] btn btn-primary self-center normal-case"
          type="submit"
        >
          {loading ? <span className="loading loading-spinner loading-md"></span> : "Post Category"}
        </button>

        {
          error !== "" &&
          <div className="toast">
            <div className="alert alert-error">
              <span>{error} ❗</span>
            </div>
          </div>
        }

        {
          response !== "" &&
          <div className="toast">
            <div className="alert alert-success">
              <span>{response} ✔</span>
            </div>
          </div>
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

export default PostCategory