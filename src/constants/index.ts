import { Question } from "../types"

export const REACT_QUERY_DEFAULT_PROPERTIES = {
    enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onError: (error: any) => console.log(error),
}

export const EMPTY_QUESTION = {
    answerSelected: '■■■■■■■■■',
    category: '■■■■■■■■■',
    type: '■■■■■■■■■',
    difficulty: '■■■■■■■■■',
    question: '■■■■■■■■■■■■■■■■■■■■',
    correct_answer: '■■■■■■■■■',
    incorrect_answers: ['■■■■■■■■■', '■■■■■■■■■', '■■■■■■■■■'],
    all_answers: ['■■■■■■■■■', '■■■■■■■■■', '■■■■■■■■■', '■■■■■■■■■']
}

// export const API_URL = "http://localhost:5000" // local
export const API_URL = "https://quiz-api-kbez.onrender.com" // web

export const QUESTION_EMPTY: Question = {
    all_answers: [],
    answerSelected: '',
    question: "",
    type: 'multiple',
    correct_answer: '',
    incorrect_answers: [],
    category: '',
    difficulty: 'easy',
    createdBy: '',
    img: "",
    _id: ""
}

export const CLERK_THEME = {
    elements: {
        formButtonPrimary: "bg-primary text-primary-content hover:bg-primary-focus",
        button: "bg-base-100",
        card: 'bg-base-300',
        headerTitle: 'text-base-content',
        headerSubtitle: 'text-base-content',
        socialButtonsBlockButton: 'border-base-content text-base-content',
        dividerLine: 'bg-base-content',
        dividerText: 'text-base-content',
        formFieldLabel: 'text-base-content',
        formField__identifier: 'text-base-content',
        formFieldInput: 'bg-base-200 text-base-content border-base-content',
        footerActionText: 'text-base-content',
        footerActionLink: 'text-primary hover:text-primary-focus',
        userButtonPopoverCard: 'bg-base-100',

        userPreviewSecondaryIdentifier: 'text-base-content',
        userButtonPopoverActionButtonText: 'text-base-content',
        userButtonPopoverActionButtonIcon: 'text-base-content',
        userButtonPopoverFooter: 'text-white',
        pageScrollBox: 'bg-base-100',
        navbar: 'bg-base-100',
        page: 'bg-base-100',
    }
}

export const ROUTES_LOGOUT = { page: [{ to: '/', tag: 'Home' }, { to: '/sign-in', tag: 'Login' }] }

export const ROUTES_LOGIN = {
    page: [{ to: '/', tag: 'Home' },],
    question: [{ to: '/postquestion', tag: 'Post Question' }, { to: '/patchquestion', tag: 'Patch Question' }, { to: '/deletequestion', tag: 'Delete Question' }],
    category: [{ to: '/postcategory', tag: 'Post Category' }, { to: '/deletecategory', tag: 'Delete Category' }],
}