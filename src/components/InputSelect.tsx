type InputSelectProps = {
    label: string,
    name: string
    value: string
    handlerInputs: (name: string, value: string, type: string, index?: number) => void;
    items: { value: string | number, name: string }[]
}

function InputSelect({ label, name, value, handlerInputs, items }: InputSelectProps) {
    return (
        <label className="join join-vertical">
            <span className='bg-base-300 p-2 px-5 rounded-b-none'>{label}</span>
            <select
                className="select select-bordered w-full rounded-t-none"
                value={value}
                onChange={(event) => handlerInputs(event.target.name, event.target.value, "select")}
                name={name}
            >
                <option value="" disabled>Select a {name}</option>
                {items.map((item) => {
                        return (
                            <option key={item.value} value={item.value}>{item.name}{/*  {category.id} */}</option>
                        )
                    })
                }
            </select>
        </label>
    )
}

export default InputSelect