import { Types } from 'mongoose';

const objectId: Types.ObjectId = new Types.ObjectId();

export type Question = {
    _id: string;
    answerSelected: string;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[];
    createdBy?: string;
    img: string;
}

export type APIQuestionsResponse = {
    response_code : number,
    results : Array<Question> 
}

export type Category = {
    _id: string
    name: string;
    id: number,
    createdBy?: typeof objectId
}