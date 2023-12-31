import { Leaf } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="w-screen">
        <div className='mt-[250px] flex items-center justify-center'>
            <Leaf className="w-[70px] h-[70px] text-primary animate-bounce" />
        </div>
    </div>
  )
}

export default Loader