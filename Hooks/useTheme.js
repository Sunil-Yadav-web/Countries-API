import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export function useTheme (){
    const [isDark, setIsDark] = useContext(ThemeContext)
    
    return[isDark, setIsDark]
}