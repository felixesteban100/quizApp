import { Link } from 'react-router-dom';
// import { MouseEventHandler } from "react"
import ChangeTheme from '../components/ChangeTheme';
import { BiSolidBrain } from 'react-icons/bi'


type HeaderProps = {
    setAuthToken: (token: string) => void;
    setCurrentUserName: (name: string) => void
    // listOfLinks: Link[];
    listOfLinks: Links;
    loggedIn: boolean
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

type Link = {
    to: string,
    tag: string
}

type Links = {
    page: Link[],
    question?: Link[],
    category?: Link[]
}



function Header({ setAuthToken, setCurrentUserName, listOfLinks, loggedIn, theme, setTheme }: HeaderProps) {
    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <div className="dropdown ">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <div className='flex sm:flex-row'><p>Welcome&nbsp;</p><p className='font-bold'>{currentUserName !== "" ? currentUserName : 'Guest'}</p> </div> */}
                        {
                            loggedIn &&
                            <li>
                                <Link
                                    to="/login"
                                    onClick={() => {
                                        setAuthToken("")
                                        setCurrentUserName("")
                                    }}
                                    className='text-base sm:text-lg md:text-xl lg:text-2xl'
                                >
                                    Log out
                                </Link>
                            </li>
                        }
                        {
                            listOfLinks.page !== undefined ?
                                <li>
                                    <p className='btn-disabled normal-case font-bold text-base sm:text-lg md:text-xl lg:text-2xl '>Quiz</p>
                                    <ul className="p-2">
                                        {listOfLinks.page.map((currentLinkPage) => {
                                            return (
                                                <li key={currentLinkPage.to}>
                                                    <Link className='text-base sm:text-lg md:text-xl ' to={currentLinkPage.to} >{currentLinkPage.tag}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                :
                                null
                        }
                        {
                            listOfLinks.question !== undefined ?
                                <li>
                                    <p className='btn-disabled normal-case font-bold text-base sm:text-lg md:text-xl lg:text-2xl '>Question</p>
                                    <ul className="p-2">
                                        {listOfLinks.question.map((currentLinkQuestion) => {
                                            return (
                                                <li key={currentLinkQuestion.to}>
                                                    <Link className='text-base sm:text-lg md:text-xl' to={currentLinkQuestion.to} >{currentLinkQuestion.tag}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                :
                                null
                        }
                        {
                            listOfLinks.category !== undefined ?
                                <li>
                                    <p className='btn-disabled normal-case font-bold text-base sm:text-lg md:text-xl lg:text-2xl'>Category</p>
                                    <ul className="p-2">
                                        {listOfLinks.category.map((currentLinkCategory) => {
                                            return (
                                                <li key={currentLinkCategory.to}>
                                                    <Link className='text-base sm:text-lg md:text-xl' to={currentLinkCategory.to} >{currentLinkCategory.tag}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                :
                                null
                        }
                    </ul>
                </div>
            </div>

            <div className="navbar-center">
                {/* <a className="btn btn-ghost normal-case text-sm sm:text-xl">Iglesia Biblica Cristiana en Lynn</a> */}
                <Link to="/" className='btn btn-ghost flex justify-center items-center normal-case text-3xl'>
                    Quizzical <BiSolidBrain className="text-primary text-3xl" />
                </Link>
                {/* <div className='flex justify-center items-center normal-case text-3xl gap-2 animate-textShadowPopBr'>
                    Quizzical <BiSolidBrain className="text-primary text-3xl" />
                </div> */}
            </div>

            <div className="navbar-end flex gap-5">
                <ChangeTheme
                    theme={theme}
                    setTheme={setTheme}
                />
            </div>
        </div>
    )
}

export default Header