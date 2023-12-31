"use client"
import React from 'react'
import CarItem from './CarItem'
import { ScrollArea } from '../ui/scroll-area'
import { Client } from '@/models/Client.model'


const CarList = ({client}:{client:Client}) => {
  return (
<div className='pt-6'>
    <div className="text-lg font-bold tracking-tight mb-6">
        My Vehicules :
    </div>
    <ScrollArea className='h-[500px]'>
            <div className='flex-col space-y-2'>
              {client?.cars.map((car,index)=><CarItem
                car={car} 
                key={index} />)}
            </div>
        </ScrollArea>
    </div>
  )
}

export default CarList