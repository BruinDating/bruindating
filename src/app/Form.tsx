"use client"
import * as React from 'react';
import { useRouter } from "next/navigation";

export default function Form() {
    const router =  useRouter();
   return (
       <div className = 'bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>  
        <h1 className='text-5xl text-black text-center font-semibold'> Bruin Dating </ h1>
        <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
        <div className = 'mt-8'> 
            <div>
                <label className='text-lg text-gray-500 font-medium'>Email</label>
                <input 
                    className='w-full border-2 text-black border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your email'
                />
            </div>
            <div className="mt-4">
                <label className='text-lg text-gray-500 font-medium'>Password</label>
                <input 
                    className='w-full border-2 text-black border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your password'
                    type="password"
                />
            </div>
            <div className='mt-4 flex justify-between items-center'>
                <div>
                    <input
                        className='text-black'
                        type = "checkbox"
                        id = 'remember'
                        />
                        <label className="ml-2 text-gray-500 font-medium text-base" htmlFor="remember">
                            Remember for 30 days
                        </label>
            </div>
         {/* <button className=' font-medium text-base text-vi'></button> */}
           </div>
         <div className='mt-8 flex flex-col gap-y-4'>
            <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-[#2D68C4] text-[#F2A900] text-lg font-bold'> Sign in</button>
             </div>
            <div className='mt-8 flex justify-center itemms-center'>
                <p className=' font-medium text-base text-gray-500'> No account?</p>
                <button className='text-[#2D68C4] text-base font-medium ml-2' onClick={() => router.push("/register")}>
                    Sign Up
                </button>
            </div>
        </div>
      </div>
 
   )
}
