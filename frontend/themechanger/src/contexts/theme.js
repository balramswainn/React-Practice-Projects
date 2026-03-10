import { createContext, useContext } from "react";

export const ThemeContext = createContext({   
    themeMode: "light",                          //ye sab demo hai nhi likhe toh bhi chalega just createContext()
    darkmode: () => {},
    lightmode: () => {},   
})

export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
}



