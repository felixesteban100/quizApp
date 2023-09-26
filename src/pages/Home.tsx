import React from 'react'
import { Link } from 'react-router-dom'
import { getEmojiByCategoryName, getGeneralEmojiByDifficulty } from '../functions'
import { Category } from '../types'
import { useInView } from 'react-intersection-observer';
import { BiSolidBrain } from 'react-icons/bi'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import SelectComponent from '../components/SelectComponent';

type HomeProps = {
  categoryId: number
  setCategoryId: React.Dispatch<React.SetStateAction<number>>
  amountOfQuestions: number;
  setAmountOfQuestions: React.Dispatch<React.SetStateAction<number>>
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>
  refetchQuestions: () => void;
  allCategories: Category[] | undefined
  isLoadingCategories: boolean
  isErrorCategories: boolean;
  currentUserName: string | null;
  isFetching: boolean;
  isLoading: boolean
}

function Home({ /* currentUserName, */ allCategories, isLoadingCategories, isErrorCategories, categoryId, setCategoryId, amountOfQuestions, setAmountOfQuestions, difficulty, setDifficulty, type, setType, refetchQuestions, isLoading, isFetching }: HomeProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
  });

  function handlerInputs(toChange: string, value: string) {
    if (typeof value !== 'string') return

    switch (toChange) {
      case "type":
        setType(value)
        break;

      case "difficulty":
        setDifficulty(value)
        break;

      case "category":
        setCategoryId(parseInt(value))
        break;

      default: break;
    }
  }


  return (
    <div ref={sectionRef} className={`flex flex-col mx-auto justify-center items-center gap-8 py-10 ${sectionInView ? "animate-scaleInCenter" : "invisible"}`}>
      <div className='flex flex-row justify-center items-center gap-5 my-10'>
        <div className='text-5xl md:text-7xl lg:text-8xl animate-textShadowPopBr'>
          {/* Welcome <span className='font-bold'>{currentUserName?.split(" ")[0]}</span> */}
          Quizzical
        </div>
        <BiSolidBrain className='text-5xl md:text-7xl lg:text-8xl' />
      </div>

      <label className="join join-vertical w-[90%] max-w-[50rem]">
        <span className='bg-base-300 p-2 px-5 mb-5'>Number of questions: {amountOfQuestions}</span>
        <div className='w-full flex justify-center items-stretch gap-2'>
          <div
            onClick={() => setAmountOfQuestions(prev => prev - 1)}
            className='bg-primary text-base-100 px-2 cursor-pointer rounded-full flex items-center'>
            <AiOutlineArrowLeft />
          </div>
          <input
            onChange={(e) => setAmountOfQuestions(parseInt(e.target.value))}
            type="range"
            min={1}
            max={50}
            value={amountOfQuestions}
            className="range "
          />
          <div
            onClick={() => setAmountOfQuestions(prev => prev + 1)}
            className='bg-primary text-base-100 px-2 cursor-pointer rounded-full flex items-center'>
            <AiOutlineArrowRight />
          </div>
        </div>
      </label>

      {
        isLoadingCategories === true
          ? <span className="loading loading-dots loading-lg"></span>
          : allCategories !== undefined && !isErrorCategories
            ? <SelectComponent
              label="Category 🗂️"
              name="category"
              value={categoryId}
              handlerInputs={handlerInputs}
              items={[
                { value: 0, name: "Any category" },
                ...allCategories.map((category) => {
                  return { value: category.id, name: `${category.name + getEmojiByCategoryName(category.name)}` }
                })
              ]}
            />
            : <div className='text-xl font-semibold text-error'>Error fetching categories created ❗</div>
      }

      <SelectComponent
        label="Difficulty 🧩"
        name="difficulty"
        value={difficulty}
        handlerInputs={handlerInputs}
        items={[
          { value: 'All', name: "Any type" },
          { value: 'easy', name: `${'Easy' + getGeneralEmojiByDifficulty('easy')}` },
          { value: 'medium', name: `${'Medium' + getGeneralEmojiByDifficulty('medium')}` },
          { value: 'hard', name: `${'Hard' + getGeneralEmojiByDifficulty('hard')}` }
        ]}
      />

      <SelectComponent
        label="Type 🔤"
        name="type"
        value={type}
        handlerInputs={handlerInputs}
        items={[
          { value: 'All', name: "Any type" },
          { value: 'multiple', name: `Multiple choice 🔠` },
          { value: 'boolean', name: `True or false 0️⃣1️⃣` },
        ]}
      />



      <Link
        to="/questions" className='btn btn-primary normal-case'
        onClick={() => {
          refetchQuestions()
        }}
      >
        {isFetching || isLoading ?
          <span className="loading loading-spinner loading-lg"></span>
          :
          <p>Get Questions</p>
        }
      </Link>
    </div >
  )
}

export default Home