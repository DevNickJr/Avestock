'use client'
import React, { useEffect } from 'react'
import useFetch from '@/hooks/useFetch'
import { apiChangePassword, apiUpdateUser } from '@/services/AuthService'
import { IChangePassword, IVerifiedFace } from '@/interfaces'
import { useSession } from 'next-auth/react'
import usePost from '@/hooks/useMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BiLeftArrow } from 'react-icons/bi'
import { apiGetUser } from '@/services/AuthService'
// import { useSession } from 'next-auth/react'

interface IUserInfo {
  first_name: string
  last_name: string
  email: string
  // phone: string
}


const Settings = () => {
  const session = useSession()
  const user = session.data?.user
  const [step, setStep] = React.useState<"home" | "security" | "profile">('home')
  const router = useRouter()
  const [userInfo, setUserInfo] = React.useReducer((state: IUserInfo, newState: Partial<IUserInfo>): IUserInfo => ({ ...state, ...newState }), {
    first_name: '',
    last_name: '',
    email: '',
  })
  const [passwordState, setPasswordState] = React.useReducer((state: IChangePassword, newState: Partial<IChangePassword>): IChangePassword => ({ ...state, ...newState }), {
    old_password: '',
    password: '',
    confirm_password: ''
  })

  const { data: userDetails, refetch: refetchUser } = useFetch({ 
    api: apiGetUser, 
    key: ['userDetails'],
    param: {
      id: user?._id
    },
   })

   React.useEffect(() => {
      if (userDetails) {
        setUserInfo({
          first_name: userDetails?.first_name,
          last_name: userDetails?.last_name,
          email: userDetails?.email,
        })
      }
    }, [userDetails])


  const updateUser = usePost<IUserInfo, any>(apiUpdateUser, {
    id: user?._id!,
    onSuccess: (data) => {
      console.log(data)
      toast.success('Profile Updated Successfully')
      refetchUser()
      setStep('home')
    },
    onError: (error) => {
      console.log(error)
      toast.error('An error occured')
    }   
  })

  const updatePassword = usePost<IChangePassword, any>(apiChangePassword, {
    id: user?._id!,
    onSuccess: (data) => {
      console.log(data)
      toast.success('Password Changed Successfully')
      refetchUser()
      setStep('home')
    },
    onError: (error) => {
      console.log(error)
      toast.error('An error occured')
    }   
  })

  const handleUpdateUser = () => {
    updateUser.mutate(userInfo)
  }
 
  const handleUpdatePassword = () => {
    updatePassword.mutate(passwordState)
  }

  return (
    <main className='relative p-4 overflow-y-auto md:p-6'>
      {
        (updateUser?.isLoading || updatePassword?.isLoading) && 
        <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50">
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md">
            <p className='mb-4 text-sm font-semibold'>Updating...</p>
            <div className="w-12 h-1 rounded-full bg-primary animate-pulse"></div>
          </div>
        </div>
      }
      <h2 className='mb-6 text-lg font-semibold'>Account Settings: Personalize Your Experience</h2>
      {step === "home" && (
        <>
          <div className="p-5 mb-6 bg-white rounded-md">
            <h4 className='mb-4 font-semibold'>General</h4>
            <div onClick={() => setStep('profile')} className="w-fit cursor-pointer flex flex-col gap-1 p-4 rounded-md shadow-md min-w-[200px] bg-primary text-white">
              <p className='font-semibold'>Profile Information</p>
              <p className='text-xs'>Click to update your profile Information</p>
            </div>
          </div>
          <div className="p-5 mb-6 bg-white rounded-md">
            <h4 className='mb-4 font-semibold'>Verification</h4>
            <Link href={'/dashboard/kyc'} className="w-fit cursor-pointer flex flex-col gap-1 p-4 rounded-md shadow-md min-w-[200px] bg-primary text-white">
              <p className='font-semibold'>Update KYC</p>
              <p className='text-xs'>
                Upload your KYC documents to verify your identity
              </p>
            </Link>
          </div>
          <div className="p-5 mb-6 bg-white rounded-md">
            <h4 className='mb-4 font-semibold'>Security</h4>
            <div onClick={() => setStep('security')} className="w-fit cursor-pointer flex flex-col gap-1 p-4 rounded-md shadow-md min-w-[200px] bg-primary text-white">
              <p className='font-semibold'>Change Password</p>
              <p className='text-xs'>
                Click to update your password
              </p>
            </div>
          </div>
          <div className="p-5 mb-6 bg-white rounded-md">
            <h4 className='mb-4 font-semibold'>Promotions</h4>
            <Link href={'/dashboard/referral'} className="w-fit cursor-pointer flex flex-col gap-1 p-4 rounded-md shadow-md min-w-[200px] bg-primary text-white">
              <p className='font-semibold'>Refer and Earn</p>
              <p className='text-xs'>
                Click to get your referral link
              </p>
            </Link>
          </div>
        </>
      )}
      {step === "profile" && (
        <>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col flex-1 max-w-lg gap-4 p-5 bg-white rounded-md">
              <h4 className='flex items-center gap-4 mb-4 font-semibold'>
                <BiLeftArrow className={'cursor-pointer'} onClick={() => setStep("home")} size={"1.3rem"} />
                Profile Information
              </h4>
              <p className='mb-4 text-sm'>Update your profile information</p>
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col gap-4">
                  <p className='text-xs'>First Name</p>
                  <input value={userInfo?.first_name} onChange={(e) => setUserInfo({'first_name': e.target.value})} name='first_name' id='first_name' type="text" className='rounded-md placeholder:text-sm' placeholder='First Name' />
                </div>
                <div className="flex flex-col gap-4">
                  <p className='text-xs'>Last Name</p>
                  <input value={userInfo?.last_name} onChange={(e) => setUserInfo({'last_name': e.target.value})} name='last_name' id='last_name' type="text" className='rounded-md placeholder:text-sm' placeholder='Last Name' />
                </div>
                <div className="flex flex-col gap-4">
                  <p className='text-xs'>Email</p>
                  <input value={userInfo?.email} onChange={(e) => setUserInfo({'email': e.target.value})} name='email' id='email' type="email" className='rounded-md placeholder:text-sm' placeholder='Email' />
                </div>
                {/* <div className="flex flex-col gap-4">
                  <p className='text-xs'>Phone Number</p>
                  <input value={userInfo?.phone} onChange={(e) => setUserInfo({'phone': e.target.value})} name='phone' id='phone' type="text" className='rounded-md placeholder:text-sm' placeholder='Phone Number' />
                </div> */}
                <button disabled={updateUser?.isLoading} onClick={handleUpdateUser} className='p-3 px-4 mt-8 text-white rounded-md cursor-pointer bg-primary'>Submit</button>
              </div>              
            </div>
          </div>
        </>
      )}
      {step === "security" && (
        <>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col flex-1 max-w-lg gap-4 p-5 bg-white rounded-md">
              <h4 className='flex items-center gap-4 mb-4 font-semibold'>
                <BiLeftArrow className={'cursor-pointer'} onClick={() => setStep("home")} size={"1.3rem"} />
                Update Password
              </h4>
              <p className='mb-4 text-sm'>Update your password</p>
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col gap-4">
                  <p className='text-xs'>Old Password</p>
                  <input value={passwordState?.old_password} onChange={(e) => setPasswordState({'old_password': e.target.value})}  name='old_password' id='old_password' type="password" className='rounded-md placeholder:text-sm' placeholder='Old Password' />
                </div>
                <div className="flex flex-col gap-4">
                  <p className='text-xs'>New Password</p>
                  <input value={passwordState?.password} onChange={(e) => setPasswordState({'password': e.target.value})}  name='new_password' id='new_password' type="password" className='rounded-md placeholder:text-sm' placeholder='New Password' />
                </div>
                <div className="flex flex-col gap-4">
                  <p className='text-xs'>Confirm Password</p>
                  <input value={passwordState?.confirm_password} onChange={(e) => setPasswordState({'confirm_password': e.target.value})}  name='confirm_password' id='confirm_password' type="password" className='rounded-md placeholder:text-sm' placeholder='Confirm Password' />
                </div>
                <button disabled={updatePassword?.isLoading} onClick={handleUpdatePassword} className='p-3 px-4 mt-8 text-white rounded-md cursor-pointer bg-primary'>Submit</button>
              </div>              
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default Settings