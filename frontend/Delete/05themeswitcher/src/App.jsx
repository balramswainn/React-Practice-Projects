import { useEffect, useState } from 'react'
import { ThemeContextProvider } from './contexts/theme'
import './App.css'
import ThemeBtn from './components/ThemeBtn'
import Card from './components/Card'

function App() {
  const [thememode,setThememode] =useState('light')

  const lightMode=()=>{
    setThememode('light')
  }
  const darkMode=()=>{
    setThememode('dark')
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove('dark','light')
    document.querySelector('html').classList.add(thememode)
  },[thememode])

  return (
    <ThemeContextProvider value={{thememode,lightMode,darkMode}}>
      <div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <ThemeBtn/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       <Card/>
                    </div>
                </div>
            </div>

    </ThemeContextProvider>
  )
}

export default App
