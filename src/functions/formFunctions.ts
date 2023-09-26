import { AxiosResponse } from "axios";
// import { SetStateAction } from "react";
// import { Question } from "../types";
import { SetURLSearchParams } from "react-router-dom";


// export function handleInputChange<T>(
export function handleInputChange(
    name: string,
    value: string,
    // setterFunction: React.Dispatch<React.SetStateAction<T>>,
    setterFunction: SetURLSearchParams,
) {
    // if (value === '0') setterFunction((prev: T) => {
    if (value === '0') setterFunction((prev) => {
        prev.set(name, "1")
        return prev
        // return { ...prev, [name]: 1 }
    }, {replace: true});

    // if (value !== '0') setterFunction((prev: T) => {
    if (value !== '0') setterFunction((prev) => {
        prev.set(name, value)
        return prev
        // return { ...prev, [name]: value }
    }, {replace: true});
};

export async function handleSubmit<T>(
    event: React.FormEvent<HTMLFormElement>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    functionToFetch: () => Promise<void | AxiosResponse<T>>,
    setResponse: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
) {
    event.preventDefault();
    // console.log(category)
    setLoading(true)
    const response = await functionToFetch();
    setLoading(false)
    if (typeof response === "object") {
        setError("")
        setResponse("Success")
        setTimeout(() => {
            setResponse("")
        }, 2000)
    }
}

// export function handlerFunctionSetterQuestion(name: string, value: string, type: string, setterFunction: React.Dispatch<SetStateAction<Question>>, index?: number,){
export function handlerFunctionSetterQuestion(name: string, value: string, type: string, setterFunction: SetURLSearchParams, index?: number,) {
    switch (type) {
        case 'text':
            // handleInputChange<Question>(name, value, setterFunction)
            handleInputChange(name, value, setterFunction)
            break;

        case "incorrect_answers":
            if (index === undefined) break
            // setterFunction((prevQuestion: Question) => {
            //     let inA = prevQuestion.incorrect_answers
            //     inA[index] = value
            //     return { ...prevQuestion, incorrect_answers: inA }
            // })
            setterFunction((prev) => {
                prev.set(name, value)
                return prev
            }, {replace: true})
            break;

        case "correct_answerboolean":
            // setterFunction(prev => {
            //     return {
            //         ...prev,
            //         correct_answer: `${value === "True" ? "True" : "False"}`,
            //         incorrect_answers: [`${value === "True" ? "False" : "True"}`]
            //     }
            // });
            setterFunction((prev) => {
                prev.set("correct_answer", `${value === "True" ? "True" : "False"}`)
                prev.set("incorrect_answers", JSON.stringify([`${value === "True" ? "False" : "True"}`]))
                return prev
            }, {replace: true})
            break;

        case "select":
            if (name === 'type') {
                if (value === 'boolean') {
                    // setterFunction(prev => {
                    //     return(
                    //         { ...prev, [name]: value, incorrect_answers: ['False'], correct_answer: 'True' }
                    //     )
                    // });
                    setterFunction((prev) => {
                        prev.set(name, value)
                        prev.set("incorrect_answers", JSON.stringify(['False']))
                        prev.set("correct_answer", 'True')
                        return prev
                    }, {replace: true})
                } else {
                    // setterFunction(prev => {
                    //     return { ...prev, [name]: value, incorrect_answers: [''], correct_answer: '' }
                    // });
                    setterFunction((prev) => {
                        prev.set(name, value)
                        prev.set("incorrect_answers", JSON.stringify(['']))
                        prev.set("correct_answer", '')
        
                        return prev
                    }, {replace: true})
                }
            } else {
                // setterFunction(prev => {
                //     return { ...prev, [name]: value }
                // });
                setterFunction((prev) => {
                    prev.set(name, value)
                    return prev
                }, {replace: true})
            }
            break;

        default:
            break;
    }
}