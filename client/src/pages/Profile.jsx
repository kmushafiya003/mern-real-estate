import React from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {
  
  const {user} = useSelector((state)=> state.user);

  const {currentUser} = user;
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold  text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-y-4 '>

        {/* ------------ image --------------- */}

        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        {/* ---------------- username ----------------- */}

        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />

        {/* ---------------- email ----------------- */}

        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' />


        {/* ---------------- password ----------------- */}

        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' />

       {/* -------------- Update  ----------------------- */}

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      


      </form>

      {/* ----------------- button groups ------------------ */}

      <div className='flex justify-between mt-5'>

        <span className='text-red-700 cursor-pointer '>Delete Account</span>
        <span className='text-red-700 cursor-pointer '>Sign out</span>
       
      </div>


    </div>
  )
}

export default Profile