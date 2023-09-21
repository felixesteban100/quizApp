
type ErrorMessageProps = {
    error: string
}

function ErrorMessage({ error }: ErrorMessageProps) {
    if(error === "") return null

    return (
        <div className="toast">
            <div className="alert alert-error">
                <span>{error} ❗</span>
            </div>
        </div>
    )
}

export default ErrorMessage