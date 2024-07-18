import { BarChartIcon } from 'lucide-react'
import React from 'react'
import { CardContent, Card as ShadCard } from './ui/card'

interface Props{
    value ?: number | string,
    Icon ?: any,
    title ?: string
}

const Card = ({value, Icon, title} : Props) => {
  return (
    <div className='bg-white min-w-56 flex-1 rounded p-5 flex justify-between items-center'>
        <div className='flex flex-col'>
            <span className='uppercase'>{title}</span>
            <span className='font-bold text-2xl'>{value}</span>
        </div>
        <div className='bg-blue-500 rounded-full p-3 sm:p-5 text-white'>
            <Icon className='h-6'/>
        </div>
    </div>
  )
}

export default Card;

export const CardLink = ({value, Icon, title} : Props) => {
  return(
    <ShadCard>
      <CardContent className='flex items-center py-5 gap-4'>
          <Icon className='h-5'/>
          <div>
              <span className='text-xs font-light'>{title}</span>
              <p className='font-black text-xl capitalize'>{value}</p>
          </div>
      </CardContent>
  </ShadCard>
  )
}