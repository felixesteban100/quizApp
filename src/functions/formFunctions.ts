import { AxiosResponse } from "axios";
import { SetStateAction } from "react";
import { Question } from "../types";


export function handleInputChange<T>(
    name: string, 
    value: string,
    setterFunction: React.Dispatch<React.SetStateAction<T>>,
) {
    if (value === '0') setterFunction((prev: T) => {
        return { ...prev, [name]: 1 }
    });
    if (value !== '0') setterFunction((prev: T) => {
        return { ...prev, [name]: value }
    });
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

export function handlerFunctionSetterQuestion(name: string, value: string, type: string, setterFunction: React.Dispatch<SetStateAction<Question>>, index?: number,){
    switch (type) {
        case 'text':
            handleInputChange<Question>(name, value, setterFunction)
            break;

        case "incorrect_answers":
            if (index === undefined) break
            setterFunction((prevQuestion: Question) => {
                let inA = prevQuestion.incorrect_answers
                inA[index] = value
                return { ...prevQuestion, incorrect_answers: inA }
            })
            break;

        case "correct_answerboolean":
            setterFunction(prev => {
                return {
                    ...prev,
                    correct_answer: `${value === "True" ? "True" : "False"}`,
                    incorrect_answers: [`${value === "True" ? "False" : "True"}`]
                }
            });
            break;

        case "select":
            if (name === 'type') {
                if (value === 'boolean') {
                    setterFunction(prev => {
                        return(
                            { ...prev, [name]: value, incorrect_answers: ['False'], correct_answer: 'True' }
                        )
                    });
                } else {
                    setterFunction(prev => {
                        return { ...prev, [name]: value, incorrect_answers: [''], correct_answer: '' }
                    });
                }
            } else {
                setterFunction(prev => {
                    return { ...prev, [name]: value }
                });
            }
            break;

        default:
            break;
    }
}