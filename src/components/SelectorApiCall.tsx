type SelectorApiCallProps = {
    loading: boolean
    isError: boolean
    currentUserName: string | null
    value: string
    name: string
    label: string
    items: { name: string, _id: string }[];
    setValue: React.Dispatch<React.SetStateAction<string>>
}

function SelectorApiCall({
    loading,
    isError,
    currentUserName, 
    value,
    name,
    label,
    items,
    setValue,
}: SelectorApiCallProps & {

}) {
    return (
        <>
            {loading ?
                <span className="mx-auto loading loading-dots loading-lg"></span>
                :
                isError === false ?
                    <label className="join join-vertical w-full">
                        <span className='bg-base-300 p-2 px-5 rounded-b-none'>{label} by: {currentUserName}</span>
                        <select
                            className="select select-bordered w-full rounded-t-none"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            name={name}
                        >
                            <option value="" disabled>Select a {label}</option>
                            {
                                items.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id} >{item.name}</option>
                                    )
                                })

                            }
                        </select>
                    </label>
                    :
                    <div className="mx-auto text-2xl text-error">Error fetching {label}... ❗</div>
            }
        </>
    )
}

export default SelectorApiCall