
type AnswersContainerProps = {
    children: JSX.Element[]
}

function AnswersContainer({children}: AnswersContainerProps) {
  return (
    <div className='w-[80%] h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mt-5 justify-center items-stretch'>
        {children}
    </div>
  )
}

export default AnswersContainer