
import { useTheme } from "../Hooks/useTheme"

export const Header = () => {
  const [isDark, setIsDark] = useTheme()

  return (
    <header className={`header-container ${isDark? 'dark': ''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the World?</a>
        </h2>
        <p className="theme-changer" onClick={()=> {
          setIsDark(!isDark)
          localStorage.setItem('isDarkMode',!isDark)
        }}>
          <i className={`fa-solid fa-${isDark? 'sun': 'moon'}`}></i>
          &nbsp;&nbsp;{`${isDark? 'Light': 'Dark'}`} Mode
        </p>
      </div>
    </header>
  )
}

export default Header
