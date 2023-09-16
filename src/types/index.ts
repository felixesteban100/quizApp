export type Question = {
    answerSelected: string;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[]
}

export type APIQuestionsResponse = {
    response_code : number,
    results : Array<Question> 
}

export type Category = {
    name: string;
    id: number
}