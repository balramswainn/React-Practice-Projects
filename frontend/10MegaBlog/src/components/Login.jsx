import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)  // isee login hoga 
            if (session) {
                const userData = await authService.getCurrentUser()  // login k hone k baad user ka info dikhane k liye usse redux mai state ko dena padega isiliye 
                if(userData) dispatch(authLogin({userData}));     //useData ek object k andhr hai so waha hum payload={ useData } 
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>  {/* form jab bhi submit hoga waha handlesubmit  hi use hoga ye ek method hai jisme hum apna method dete hai ki mai istarah se form handle karunga and form jab submit hoga ab ye event hai jo call hoga it is imp bcz jitne bhi input field yaha pe denge waha hum ye register ko use karenge react-hook-form se jo import kiya so automatic jo value waha likhi hai unka state hume manage nhi karna padega yahase apne aap ye valye pick karega and handlesubmit hote time sari value lelega */}

         {/* handleSubmit — react-hook-form ka method hai, Ye pehle validation check karta hai, Sab valid ho toh tumhara login function call karta hai, Aur saari form values automatically pass karta hai login(data) me */}

            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {      // register Ye input ko react-hook-form ke saath connect karta hai,  Spread {...} isliye kiya kyunki register return karta hai: { name: "email", onChange: fn, onBlur: fn, ref: fn } // ← isliye Input me forwardRef use kiya tha!,  Ye sab props automatically <Input> ko mil jaate hain,  Tumhe manually state banana nahi padta — form khud track karta hai

                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    } //`value` — jo user ne type kiya ,   Regex se check karta hai valid email hai ya nahi,  Agar invalid ho toh error message return hota hai , required: true` — empty nahi hona chahiye

                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login