import { useState } from 'react'
import axios from "axios"
import { Category, Question } from '../types';
import { API_URL } from '../constants';

type PostQuestionProps = {
  userId: string
  authToken: string;
  allCategories: Category[] | undefined
}

function PostQuestion({ authToken, userId, allCategories }: PostQuestionProps) {
  const [question, setQuestion] = useState<Question>({
    all_answers: [],
    answerSelected: '',
    question: "",
    type: 'multiple',
    correct_answer: '',
    incorrect_answers: [],
    category: '',
    difficulty: 'easy',
    createdBy: userId,
    img: ""
  });

  const [error, setError] = useState("")

  const [response, setResponse] = useState("")

  const [loading, setLoading] = useState(false)

  async function postQuestion({ question, category, correct_answer, difficulty, incorrect_answers, type, img }: Question) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/questions`,
        { question, category, correct_answer, difficulty, incorrect_answers, type, img },
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
    setQuestion({ ...question, [name]: value });
  };

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  function handleIncorrectAnswersChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    setQuestion(prevQuestion => {
      let inA = prevQuestion.incorrect_answers

      inA[index] = event.target.value

      return {
        ...question,
        incorrect_answers: inA
      }
    })
  }

  // console.table(question)

  function handleCorrectAnswerBoolean(event: React.ChangeEvent<HTMLSelectElement>) {
    setQuestion({
      ...question,
      correct_answer: `${event.target.value === "True" ? "True" : "False"}`,
      incorrect_answers: [`${event.target.value === "True" ? "False" : "True"}`]
    });
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    if (name === 'type') {
      if (value === 'boolean') {
        setQuestion({ ...question, [name]: value, incorrect_answers: ['False'], correct_answer: 'True' });
      } else {
        setQuestion({ ...question, [name]: value, incorrect_answers: [''], correct_answer: '' });
      }
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log(member)
    setLoading(true)
    const responsePostMember = await postQuestion(question);
    setLoading(false)

    if (typeof responsePostMember === "object") {
      setError("")
      setResponse("Question posted")
      setTimeout(() => {
        setResponse("")
      }, 2000)
    }
    // if (responsePostMember!.statusText === "Created") {
    //   setResponse("Question posted")
    //   setTimeout(() => {
    //     setResponse("")
    //   }, 2000)
    // }
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center">
      <div className="text-4xl mb-5">Post a question</div>
      <form className="w-[90%] max-w-[50rem] form-control flex flex-col justify-center align-middle gap-5 mb-5" onSubmit={handleSubmit}>
        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Question</span>
          <textarea
            required
            placeholder="Enter question..."
            className="textarea textarea-bordered w-full text-xl h-[12vh] rounded-t-none"
            value={question.question}
            name="question"
            onChange={(event) => handleTextareaChange(event)}
          />
          {/* <input
            required
            type="textarea"
            placeholder="Enter question..."
            className="input input-bordered w-full"
            value={question.question}
            name="question"
            onChange={(event) => handleInputChange(event)}
          /> */}
        </label>
        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Type</span>
          <select
            className="select select-bordered w-full rounded-t-none"
            value={question.type}
            onChange={handleSelectChange}
            name="type"
          >
            <option value="multiple">Multiple choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>
        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Correct answer</span>
          {
            question.type === 'multiple' ?
              <input
                required
                type="text"
                placeholder="Correct answer..."
                className="input input-bordered w-full rounded-t-none"
                value={question.correct_answer}
                name="correct_answer"
                onChange={(event) => handleInputChange(event)}
              />
              :
              <select
                className="select select-bordered w-full rounded-t-none"
                value={question.correct_answer}
                onChange={handleCorrectAnswerBoolean}
                name="correct_answer"
              >
                <option value="True">True (Incorrect = False)</option>
                <option value="False">False (Incorrect = True)</option>
              </select>
          }
        </label>

        {
          question.type === "boolean" ?
            null
            :
            <label className="join join-vertical flex flex-col">
              <span className='bg-base-300 p-2 px-5 rounded-b-none'>Incorrect answers</span>
              <input
                required
                type="text"
                placeholder="Incorrect Answer 1"
                className="input input-bordered w-full rounded-none"
                value={question.incorrect_answers[0] ?? ""}
                name="incorrect_answers"
                onChange={(event) => handleIncorrectAnswersChange(event, 0)}
              />
              <input
                required
                type="text"
                placeholder="Incorrect Answer 2"
                className="input input-bordered w-full rounded-none"
                value={question.incorrect_answers[1] ?? ""}
                name="incorrect_answers"
                onChange={(event) => handleIncorrectAnswersChange(event, 1)}
              />
              <input
                required
                type="text"
                placeholder="Incorrect Answer 3"
                className="input input-bordered w-full rounded-t-none"
                value={question.incorrect_answers[2] ?? ""}
                name="incorrect_answers"
                onChange={(event) => handleIncorrectAnswersChange(event, 2)}
              />
            </label>
        }

        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Category</span>
          <select
            className="select select-bordered w-full rounded-t-none"
            value={question.category}
            onChange={handleSelectChange}
            name="category"
          >
            <option value="" disabled>Select a category</option>
            {allCategories !== undefined ?
              allCategories.map((category) => {
                return (
                  <option key={category.name} value={category.name}>{category.name} {category.id}</option>
                )
              })
              :
              null
            }
          </select>
        </label>


        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Difficulty</span>
          <select
            className="select select-bordered w-full rounded-t-none"
            value={question.difficulty}
            onChange={handleSelectChange}
            name="difficulty"
          >
            <option value="easy">Easy</option>
            <option value="medium">medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label className="join join-vertical">
          <span className='bg-base-300 p-2 px-5 rounded-b-none'>Image</span>
          <input
            required
            type="text"
            placeholder="Enter image..."
            className="input input-bordered w-full rounded-t-none"
            value={question.img}
            name="img"
            onChange={(event) => handleInputChange(event)}
          />
        </label>


        <button
          className="w-[30%] btn btn-primary self-center normal-case"
          type="submit"
        >
          {loading ? <span className="loading loading-spinner loading-md"></span> : "Post Question"}
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

export default PostQuestion