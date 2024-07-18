import { ArrowDown01Icon, ArrowDownIcon, ArrowRightIcon, BarChart2, BarChartIcon, CalendarIcon, Clock } from 'lucide-react'
import React from 'react'
import { CardContent, Card as ShadCard } from './ui/card'
import { LinkType } from '@/types/links'
import moment from 'moment'
import ShareButton from './ShareButton'
import DeleteButton from './DeleteButton'
import { Link } from '@inertiajs/react'

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

export const LinkContainer = ({link} : {link : LinkType}) => {
  return(
    <ShadCard>
      <CardContent className='py-4 flex flex-col sm:flex-row gap-4 justify-between'>
        <div className='space-y-5'>
          <div className='flex flex-col gap-2'>
            <Link href={route('link', [link.slug])}>
              <p className='font-semibold text-xl flex-1 hover:text-blue-500 hover:underline'>{link.name}</p>
            </Link>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
              <a href={link.original_url}>{link.original_url}</a>
              <ArrowRightIcon className='h-3 hidden sm:inline'/>
              <ArrowDownIcon className='h-3 sm:hidden'/>
              <a className='text-blue-500 underline' href={link.short_url}>{link.short_url}</a>
            </div>
          </div>

          <div className='flex gap-8 text-sm sm:text-md'>
            <div className='flex gap-2 items-center'>
              <div className='bg-blue-100 text-gray-800 rounded-sm p-1'><BarChart2 className='h-4 w-4'/></div> {link.clicks} Clicks
            </div>
            <div className='flex gap-2 items-center'>
              <div className='bg-blue-100 text-gray-800 rounded-sm p-1'><CalendarIcon className='h-4 w-4'/></div> {moment(link.created_at).format("ddd, DD MMM YYYY")}
            </div>
            <div className='sm:flex gap-2 items-center hidden'>
              <div className='bg-blue-100 text-gray-800 rounded-sm p-1'><Clock className='h-4 w-4'/></div> {moment(link.created_at).format('HH:MMa')}
            </div>
            <div className='flex gap-2 items-center hidden'>
              <div className='bg-blue-100 text-gray-800 rounded-sm p-1'><BarChartIcon className='h-4 w-4'/></div> {link.clicks}
            </div>
          </div>
        </div>
        <hr className='sm:hidden' />
        <div className='flex items-start gap-2'>
          <ShareButton url={link.short_url}/>
          <DeleteButton slug={link.slug}/>
        </div>
      </CardContent>
    </ShadCard>
  )
}