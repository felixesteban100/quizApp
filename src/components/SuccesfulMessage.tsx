
type SuccesfulMessageProps = {
    response: string
}

function SuccesfulMessage({response}: SuccesfulMessageProps) {
    if(response === "") return null

    return (
        <div className="toast">
            <div className="alert alert-success">
                <span>{response} ✔</span>
            </div>
        </div>
    )
}

export default SuccesfulMessage