import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props       //rest parameter hamesha last me hi aana chahiye — yeh JavaScript ka rule hai...props baaki saari properties collect karta hai jo explicitly destructure nahi ki gayi. Agar beech me daalo, JS ko pata nahi chalega ki "baaki" kahan se kahan tak hai — isliye syntax error aata hai.
}, ref){

    const id = useId()
    
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input

// if => function Input({}){}  -> if function ese likhe hote toh 
// export default React.forwardRef(Input) -> toh ese export kar sakte hai ye easy version hai



//Ref kya hai? Ref ek tarika hai jisse parent component directly DOM element ko access kar sake — jaise input pe .focus() call karna, ya value read karna without state. in simple value read karne mai kaam ata hai input ka jese humne passwordGenerator me kiya tha passref.current?.select() -> isse value read kar pa rhe the

// forwardRef ka kaam — parent ka ref catch karo aur andar wale actual DOM element ko do.


// Problem without forwardRef: jsx// Parent
// const inputRef = useRef()
// <Input ref={inputRef} />  // ❌ kaam nahi karega

// // Child (normal component)
// function Input({ ref }) {
//   // ref yahan props me nahi aata — React block karta hai React automatically ref ko props me pass nahi karta — yeh special hai.Solution — forwardRef:
// }



// =========================




// Solution — forwardRef:
// const Input = React.forwardRef(function Input({ label, ...props }, ref) { // ref alag argument me milta hai
//   return (
//     <input {...props} ref={ref} /> //actual DOM input ko de do wo ref
//   )
// })


// Parent
// const inputRef = useRef()

//<Input ref={inputRef} />
//<button onClick={() => inputRef.current.focus()}>Focus karo</button>

// Ab button click pe input focus ho jayega ✅



// **Flow:**
// Parent                    Child (Input)            DOM
// ------                    -------------            ---
// useRef()     →   forwardRef catches ref   →   <input ref={ref} />
// inputRef.current                                    ↑
//                                            ab direct DOM access!

