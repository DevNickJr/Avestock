'use client'
import Link from 'next/link'
import React, { useReducer, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { IUserLogin, ILoginReducerAction } from '@/interfaces'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import usePost from '@/hooks/usePost'
import { apiLogin } from '@/services/AuthService'
import Loader from '@/components/Loader'

const initialState: IUserLogin = {
  email: '',
  password: ''
}


const Login = () => {
  const [active, setActive] = React.useState<'student' | 'staff'>('student')
  const [loading, setLoading] = React.useState(false)
  const [user, dispatch] = useReducer((state: IUserLogin, action: ILoginReducerAction) => {
    return { ...state, [action.type]: action.payload }
}, initialState)

// const { mutate } = usePost<IUserLogin, any>(
//   apiLogin,
//   {
//     onSuccess: () => {
//       console.log({ active })
//         toast.success("Logged in Successfully")
//         if (active === 'student') {
//           return router.push('/dashboard')
//         }
//         router.push('/staff')
//     },
//     onError: (error: any) => {
//         toast.error(error?.message || "An error occured")
//     }
//   }
// )


  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log("user", user )
        const res = await signIn('credentials', {
            ...user,
            redirect: false,
            // callbackUrl: `${window.location.origin}/dashboard`,
            email: user?.email,
            onUnauthenticated() {
                toast.error("Invalid Credentials")
            }
        })

        console.log("res", res)

        if (!res?.error) {
          if (active === 'student') {
            return router.push('/dashboard')
          }
          return router.push('/staff')
          // return router.push('/dashboard')
        }
        
        throw new Error(res?.error)
    } catch (error: any) {
        console.log("error", error)
        toast.error(error?.message)
    }
    setLoading(false)
}

  return (
    <div className='md:pl-24'>
      {loading && <Loader />}
      <div className="flex flex-col items-center gap-4 mt-16 mb-12">
          <h1 className='text-2xl font-bold'>Welcome Back!</h1>
          <p className='text-sm'>Sign in to continue to Avestock</p>
      </div>
      <form onSubmit={handleLogin} action="" className="max-w-l">
        <div className='grid gap-8 mb-2'>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Email Address</label>
              <input  value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} type="text" name="name" id="name" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Email Address' />
            </div>
            <div className='flex flex-col gap-2 text-xs'>
              <label htmlFor="name">Password</label>
              <input  value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} type="text" name="password" id="password" className='p-3 border rounded-md placeholder:text-sm' placeholder='Enter Password' />
            </div>
        </div>
        <Link href='/forgot-password' className='my-2 text-sm font-semibold text-'>
            Forgot Password?
        </Link>
        <button type='submit' className='flex items-center justify-center w-full gap-2 p-4 pl-5 pr-6 mt-12 text-sm font-bold text-white rounded-md bg-primary'>
            Sign In
        </button>
        <Link href='/register' className='my-2 text-sm font-semibold text-'>
            Register
        </Link>
      </form>
    </div>
  )
}

export default Login