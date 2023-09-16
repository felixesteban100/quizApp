export type ChangeThemeProps = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

function ChangeTheme({ theme, setTheme }: ChangeThemeProps) {
    const themes = ["mytheme1", "mytheme2", "mytheme3", "mytheme4", "mytheme5", "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]

    return (
        <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn m-1">Theme: {theme}</label>
            <ul tabIndex={0} className="max-h-[70vh] overflow-y-scroll overflow-hidden dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72 ">
                {
                    themes.map((currentTheme) => (
                        <li data-theme={currentTheme} key={currentTheme} onClick={() => setTheme(currentTheme)}><a>{currentTheme}</a></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChangeTheme