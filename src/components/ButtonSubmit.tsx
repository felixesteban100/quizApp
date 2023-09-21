
type ButtonSubmitProps = {
    loading: boolean
    label: string
    disabled: boolean
}

function ButtonSubmit({ loading, label, disabled }: ButtonSubmitProps) {
    return (
        <button
            className={`w-[30%] btn btn-primary self-center normal-case ${disabled? "btn-disabled" : ""}`}
            type="submit"
        >
            {loading ? <span className="loading loading-spinner loading-md"></span> : `${label}`}
        </button>
    )
}

export default ButtonSubmit