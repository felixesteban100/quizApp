type InputTextFormProps = {
    label: string 
    type: string
    placeholder: string
    value: string | number
    name: string
    min?: number
    handlerInputs: (name: string, value: string, type: string, index?: number) => void;
    typeOffuntionToApply: string
}

function InputTextForm({ 
    label, 
    type, 
    placeholder, 
    value, 
    name, 
    min, 
    handlerInputs,
    typeOffuntionToApply
}: InputTextFormProps) {
    return (
        <label className="join join-vertical">
            <span className='bg-base-300 p-2 px-5 rounded-b-none'>{label}</span>
            <input
                required
                type={type}
                placeholder={placeholder}
                className="input input-bordered w-full rounded-t-none"
                value={value}
                name={name}
                min={min}
                onChange={(event) => handlerInputs(event.target.name, event.target.value, typeOffuntionToApply)}
            />
        </label>
    )
}

export default InputTextForm