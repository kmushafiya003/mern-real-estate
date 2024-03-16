import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [formData , setFormData] = useState({});
  const [error , setError] = useState("");
  const [loading , setLoading] = useState(false);


  const handleChange = (events) => {

    setFormData({
      ...formData ,
      [events.target.id] : events.target.value,
    })


  }


  const handleSubmit = async(events) => {
    events.preventDefault();

    try{

      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      }
      );
  
      const data = await res.json();
      console.log("Data: " , data);

      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
  
      setLoading(false);
      setError(null);

      navigate("/sign-in")
  
     

    }catch(err){
        setLoading(false);
        setError(err);
    }

  

   

  }

  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>

        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>

        <button disabled={loading}  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{
          loading ? "Loading..." : "Sign Up"
        }</button>

      </form>

      <div className='flex gap-x-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/sign-in">
           <span className='text-blue-700'>Sign in</span>
        </Link>
        
      </div>
      {
        error && <p className='text-red-500 mt-5'>{error}</p>
      }
    </div>
  )
}

export default SignUp