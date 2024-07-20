import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='flex flex-col items-center gap-5 mt-3'>
      <h1 className='text-2xl'>Welcome to Exam Prep</h1>
      <div className='bg-slate-400 w-[320px] h-36 rounded-lg flex justify-center items-center text-2xl text-red-950'>
        <Link to="/idioms">Idioms and Phrases</Link>
      </div>
      <div className='bg-slate-400 w-[320px] h-36 rounded-lg flex justify-center items-center text-2xl text-red-950'>
        <Link to="/one-word">One Word</Link>
      </div>
      <div className='bg-slate-400 w-[320px] h-36 rounded-lg flex justify-center items-center text-2xl text-red-950'>
        <Link to="/vocab">Vocab</Link>
      </div>
    </div>
  )
}
