'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useCopy from '@/hooks/useCopy'

const Deposit = () => {
  const session = useSession()
  const user = session.data?.user
  const router = useRouter()
  const { copy } = useCopy()




  return (
    <main className='relative p-4 overflow-y-auto md:p-6'>
      <h2 className='mb-6 text-lg font-semibold'>Referral Program: Share and Earn Together</h2>
        <>
          <div className="flex flex-col gap-1 p-4 bg-white rounded-md shadow-md min-w-[200px] mb-6">
            <p className='text-lg'>0</p>
            <p className='font-semibold text-primary'>Total Referral</p>
          </div>
          <div className="flex flex-col gap-1 p-4 bg-white rounded-md shadow-md min-w-[200px] mb-6">
            <p onClick={() => copy(`https://avestock.com/register?ref=${user?._id}`)} className='flex items-center justify-center gap-2 text-sm text-center text-primary'>
              https://avestock.com/register?ref={user?._id}
              <button className='p-1 px-3 text-xs text-white bg-primary'>Copy</button>
            </p>
          </div>
          <div className="p-5 mb-6 bg-white rounded-md">
            <h4 className='mb-4 font-semibold'>How It Works:</h4>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 rounded-full"></div>
                <p>Copy Your Unique Referral Link Above</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 rounded-full"></div>
                <p>Spread the Word</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 rounded-full"></div>
                <p>Your Friends Sign Up</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 rounded-full"></div>
                <p>You Earn Rewards</p>
              </div>
            </div>
          </div>
        </>
    </main>
  )
}

export default Deposit