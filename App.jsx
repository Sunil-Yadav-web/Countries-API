import Header from './Components/Header'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './Contexts/ThemeContext'
import './App.css'


const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}

export default App
