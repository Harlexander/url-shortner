import React, { HTMLAttributes, PropsWithRef } from 'react'
import { Button } from '../ui/button'
import {
    Table, 
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
import { InertiaLinkProps } from '@inertiajs/react'
import { LinkType } from '@/types/links'
  
const URLS = ({className, links} : HTMLAttributes<HTMLDivElement> & { links: LinkType[] }) => {
  return (
    <div className={'bg-white rounded p-5 space-y-5 ' + className}>
        <div className='flex justify-between items-center'>
            <p className="font-semibold">Latest URLSs</p>
            <Button variant={'link'}>See all</Button>
        </div>

        <div className='overflow-x-auto relative'>
          <Table>
            <TableHeader>
                <TableRow>
                <TableHead>LONG URL</TableHead>
                <TableHead>SHORT URL</TableHead>
                <TableHead>CLICKS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {
                links.map((link) => (
                  <TableRow>
                    <TableCell>{link.original_url.slice(0,22)}{link.original_url.slice(19) && "..."}</TableCell>
                    <TableCell className="font-medium"><a target='blank' className='underline' href={link.short_url}>{link.short_url}</a></TableCell>
                    <TableCell>{link.clicks}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
    </div>
  )
}

export default URLS