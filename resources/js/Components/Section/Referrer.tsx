import React, { HTMLAttributes } from 'react'
import { Button } from '../ui/button'
import {
    Table, 
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"

const Referrer = ({ className, country } : HTMLAttributes<HTMLDivElement> & { country : { location : string, count : number }[] }) => {
  return (
    <div className={'bg-white rounded p-5 col-1 space-y-5 ' + className}>
        <div className='flex justify-between items-center'>
            <p className="font-semibold">Top Locations</p>
            <Button variant={'link'}>See all</Button>
        </div>

        <div className='overflow-x-auto relative'>
        <Table>
          <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">LOCATION</TableHead>
                <TableHead className="w-[100px] text-right">CLICKS</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {
                country.map((count) => (
                    <TableRow>
                        <TableCell className="font-medium">{count.location}</TableCell>
                        <TableCell className="font-medium text-right">{count.count}</TableCell>
                    </TableRow>
                ))
            }
          </TableBody>
        </Table>
        </div>
    </div>
  )
}

export default Referrer