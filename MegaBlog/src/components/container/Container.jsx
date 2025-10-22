import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>; //semicolon is imp to show line break
  
}

export default Container

