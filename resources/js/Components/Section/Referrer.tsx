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
import { Card, CardContent, CardHeader } from '../ui/card'

const Referrer = ({ className, country } : HTMLAttributes<HTMLDivElement> & { country : { location : string, count : number }[] }) => {
  return (
    <Card className=''>
      <CardHeader className='font-bold text-xl'>
        Top Locations
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default Referrer