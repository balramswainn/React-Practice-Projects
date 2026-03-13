import React from 'react'
import useTheme from '../contexts/theme';

export default function ThemeBtn() {
    
    const {themeMode, lightTheme, darkTheme} = useTheme()
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }


    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={themeMode=== "dark"} // Jis bhi input ki value React state mein store ho → us input ko value ya checked se sync karo, warna UI aur state alag ho jaayenge. but humne password generator me checkbox input mai bas value={charAllowed} -> likha tha yaha bhi same themeMode likhu toh nhi chalega? nahi chalega Kyun? themeMode ek string hai — "dark" ya "light" Lekin checked ko boolean chahiye — true ya false
                //Kya hota agar checked={themeMode} likhte? -> checked={"dark"}   // "dark" string → truthy → checkbox hamesha checked ✅✅
                //checked ko hamesha boolean do — agar state string hai toh pehle compare karke boolean banao.
                
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Toggle Theme</span>
        </label>
    );
}

// 9.Jab kisi input ko React state se control karna ho, toh hamesha value ya checked likhna padega.
// // Checkbox/Radio ke liye -> checked={koi_boolean_state}
// // Text/Number input ke liye  -> value={koi_string_state}

// Jo elements aise behave karte hain:-
// 1. <input type="text"> -> value, 
// 2. <input type="checkbox"> -> checked, 
// 3. <input type="radio"> -> checked, 
// 4. <textarea> -> value,
// 5. <select> -> value

// Jis bhi input ki value React state mein store ho → us input ko value ya checked se sync karo, warna UI aur state alag ho jaayenge.




