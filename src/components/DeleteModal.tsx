
type DeleteModalProps = {
    children: JSX.Element[]
    disabled: boolean
    loading: boolean
    modalId: string 
    label: string
}

function DeleteModal({ 
    children,
    disabled,
    loading,
    modalId,
    label
}: DeleteModalProps) {
    return (
        <>
            <div
                className={`w-[50%] mx-auto btn btn-error ${disabled ? "btn-disabled" : ""}`}
                onClick={() => {
                    const modal = document.getElementById(modalId)
                    // @ts-ignore
                    if (modal !== null) modal.showModal()
                }}
            >
                {loading ? <span className="loading loading-spinner loading-md"></span> : `Delete ${label}`}
            </div>
            <dialog id={modalId} className="modal">
                <div className="modal-box w-11/12 max-w-5xl flex flex-col gap-5">
                    {children}
                    <div className="modal-action">
                        <div onClick={() => {
                            const modal = document.getElementById(modalId)
                            // @ts-ignore
                            if (modal !== null) modal.close()
                        }} className="btn btn-primary normal-case">Cancel</div>
                        <button type='submit' onClick={() => {
                            const modal = document.getElementById(modalId)
                            // @ts-ignore
                            if (modal !== null) modal.close()
                        }} className="btn btn-error normal-case">Yes, delete this {label}.</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeleteModal