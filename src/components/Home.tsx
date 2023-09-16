import React from 'react'
import allCategories from '../constants/categories.json'
import { Link } from 'react-router-dom'
import { getEmojiByCategoryName } from '../functions'

type HomeProps = {
  category: number
  setCategory: React.Dispatch<React.SetStateAction<number>>
  amountOfQuestions: number;
  setAmountOfQuestions: React.Dispatch<React.SetStateAction<number>>
  refetchQuestions: () => void
}

function Home({ category, setCategory, amountOfQuestions, setAmountOfQuestions, refetchQuestions }: HomeProps) {
  return (
    <div className='flex flex-col w-[80vw] mx-auto justify-center items-center gap-5 my-10'>
      <img className='h-[20vw]' src="https://cdn-icons-png.flaticon.com/512/6193/6193558.png" alt="" />
      <div className='flex flex-col justify-center items-center w-[50%]'>
        <p className='text-2xl'>Amount of questions</p>
        <input onChange={(e) => setAmountOfQuestions(parseInt(e.target.value))} type="range" min={1} max={50} value={amountOfQuestions} className="range" />
        {amountOfQuestions}
      </div>

      <p className='text-2xl'>Category</p>
      <select value={category} onChange={(e) => setCategory(parseInt(e.target.value))} className="select select-bordered w-full max-w-xs text-xl">
        {allCategories.trivia_categories.map((category) => {
          return (
            <option className='text-xl' value={category.id} key={category.name}>{category.name + getEmojiByCategoryName(category.name)}</option>
          )
        })}
      </select>

      <Link
        to="/questions" className='btn btn-primary'
        onClick={() => {
          refetchQuestions()
        }}
      >
        <p>Get questions</p>
      </Link>
    </div>
  )
}

export default Home