type InputTextAreaFormProps = {
    label: string 
    placeholder: string
    value: string | number
    name: string
    min?: number
    handlerInputs: (name: string, value: string, type: string, index?: number) => void;
    typeOffuntionToApply: string
}

function InputTextAreaForm({
    label, 
    placeholder, 
    value, 
    name, 
    handlerInputs,
    typeOffuntionToApply
 }: InputTextAreaFormProps) {
    return (
        <label className="join join-vertical">
            <span className='bg-base-300 p-2 px-5 rounded-b-none'>{label}</span>
            <textarea
                required
                placeholder={placeholder}
                className="textarea textarea-bordered w-full text-xl h-[12vh] rounded-t-none"
                value={value}
                name={name}
                onChange={(event) => handlerInputs(event.target.name, event.target.value, typeOffuntionToApply)}
            />
        </label>
    )
}

export default InputTextAreaForm