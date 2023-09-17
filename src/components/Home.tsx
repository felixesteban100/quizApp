import React from 'react'
import allCategories from '../constants/categories.json'
import { Link } from 'react-router-dom'
import { getEmojiByCategoryName, getGeneralEmojiByDifficulty } from '../functions'

type HomeProps = {
  category: number
  setCategory: React.Dispatch<React.SetStateAction<number>>
  amountOfQuestions: number;
  setAmountOfQuestions: React.Dispatch<React.SetStateAction<number>>
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>
  refetchQuestions: () => void
}

function Home({ category, setCategory, amountOfQuestions, setAmountOfQuestions, difficulty, setDifficulty, type, setType, refetchQuestions }: HomeProps) {
  return (
    <div className='flex flex-col mx-auto justify-center items-center gap-5 py-10'>
      <img className='h-[20vw] max-h-[10rem]' src="https://cdn-icons-png.flaticon.com/512/6193/6193558.png" alt="" />
      <div className='flex flex-col justify-center items-center gap-2'>
        <p className='text-2xl'>How many questions?</p>
        <input
          onChange={(e) => setAmountOfQuestions(parseInt(e.target.value))}
          type="range"
          min={1}
          max={50}
          value={amountOfQuestions}
          className="range w-[20rem]"
        />
        {amountOfQuestions}
      </div>

      <p className='text-2xl'>Category</p>
      <select value={category} onChange={(e) => setCategory(parseInt(e.target.value))} className="select select-bordered w-full max-w-xs text-xl">
        <option className='text-xl' value={0}>{'Any category'}</option>
        {allCategories.trivia_categories.map((category) => {
          return (
            <option className='text-xl' value={category.id} key={category.name}>{category.name + getEmojiByCategoryName(category.name)}</option>
          )
        })}
      </select>

      <p className='text-2xl'>Difficulty</p>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="select select-bordered w-full max-w-xs text-xl">
        <option className='text-xl' value="">{'Any'}</option>
        <option className='text-xl' value="easy">{'Easy' + getGeneralEmojiByDifficulty('easy')}</option>
        <option className='text-xl' value="medium">{'Medium' + getGeneralEmojiByDifficulty('medium')}</option>
        <option className='text-xl' value="hard">{'Hard' + getGeneralEmojiByDifficulty('hard')}</option>
      </select>

      <p className='text-2xl'>Type</p>
      <select value={type} onChange={(e) => setType(e.target.value)} className="select select-bordered w-full max-w-xs text-xl">
        <option className='text-xl' value="">{'Any'}</option>
        <option className='text-xl' value="multiple">{'Multiple choice 🔠'}</option>
        <option className='text-xl' value="boolean">{'True or false 0️⃣1️⃣'}</option>
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