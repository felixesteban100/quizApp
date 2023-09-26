import { Link } from 'react-router-dom';
import ChangeTheme from '../components/ChangeTheme';
import { BiSolidBrain } from 'react-icons/bi'
import {
    SheetTrigger,
  } from "@/components/ui/sheet"

type HeaderProps = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>
}




function Header({ theme, setTheme }: HeaderProps) {
    return (
        <div className="navbar bg-base-300 sticky top-0 z-[10]">
            <div className="navbar-start">
                <div className="dropdown ">
                    <SheetTrigger className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </SheetTrigger>
                </div>
            </div>

            <div className="navbar-center">
                <Link to="/" className='btn btn-ghost flex justify-center items-center normal-case text-3xl'>
                    Quizzical <BiSolidBrain className="text-primary text-3xl" />
                </Link>
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