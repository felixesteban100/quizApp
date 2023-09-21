type SelectComponentProps = {
    label: string,
    name: string
    value: string | number
    handlerInputs: (toChange: string, value: string) => void;
    items: { value: string | number, name: string }[];
}

function SelectComponent({ label, name, value, handlerInputs, items }: SelectComponentProps) {
    return (
        <label className="join join-vertical w-[90%] max-w-[50rem]">
            <span className='bg-base-300 p-2 px-5 rounded-b-none'>{label}</span>
            <select
                className="select select-bordered w-full rounded-t-none"
                value={value}
                onChange={(event) => handlerInputs(name, event.target.value,)}
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

export default SelectComponent