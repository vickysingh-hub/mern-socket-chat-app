import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className='flex items-cemter gap-2'>
        <input type='text' placeholder='Search' className='input input-boarded rounded-full'/>
        <button type='submit' className='btn btn-circle bg-orange-400 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput