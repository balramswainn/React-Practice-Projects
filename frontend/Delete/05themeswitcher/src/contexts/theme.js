import {createContext,useContext} from "react";

export const ThemeContext=createContext({
    thememode:'light',
    lightMode:()=>{},
    darkMode:()=>{}

})

export const ThemeContextProvider=ThemeContext.Provider;

export default function useTheme(){
  return useContext(ThemeContext)  
}


  
  
