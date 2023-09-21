
type InputIncorrectAnswersProps = {
    questionType: string,
    label: string
    value0: string
    value1: string
    value2: string
    name: string
    typeOffuntionToApply: string
    handlerInputs: (name: string, value: string, type: string, index?: number) => void;
}

function InputIncorrectAnswers({
    questionType,
    label,
    value0,
    value1,
    value2,
    name,
    typeOffuntionToApply,
    handlerInputs,
}: InputIncorrectAnswersProps) {
    if (questionType === "boolean") return null
    return (

        <label className="join join-vertical flex flex-col">
            <span className='bg-base-300 p-2 px-5 rounded-b-none'>{label}</span>
            <input
                required
                type="text"
                placeholder="Incorrect Answer 1"
                className="input input-bordered w-full rounded-none"
                value={value0 ?? ""}
                name={name}
                onChange={(event) => handlerInputs(event.target.name, event.target.value, typeOffuntionToApply, 0)}
            />
            <input
                required
                type="text"
                placeholder="Incorrect Answer 2"
                className="input input-bordered w-full rounded-none"
                value={value1 ?? ""}
                name={name}
                onChange={(event) => handlerInputs(event.target.name, event.target.value, typeOffuntionToApply, 1)}
            />
            <input
                required
                type="text"
                placeholder="Incorrect Answer 3"
                className="input input-bordered w-full rounded-t-none"
                value={value2 ?? ""}
                name={name}
                onChange={(event) => handlerInputs(event.target.name, event.target.value, typeOffuntionToApply, 2)}
            />
        </label>
    )
}

export default InputIncorrectAnswers