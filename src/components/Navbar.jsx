import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='flex flex-row flex-wrap gap-5 bg-green-700 text-white font-semibold p-4 w-screen justify-center'>
        <div><Link to="all-idioms">Idioms</Link></div>
        <div><Link to="all-one-word">One Word</Link></div>
        <div><Link to="all-vocab">Vocab</Link></div>
        <div><Link to="all-current">Current-affairs</Link></div>
    </div>
  )
}
