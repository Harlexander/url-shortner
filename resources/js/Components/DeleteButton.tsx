import React from 'react'
import { Button } from './ui/button'
import { TrashIcon } from 'lucide-react'

const DeleteButton = ({slug}: { slug : string}) => {
  return (
    <Button className='' variant={'outline'}><TrashIcon className='h-4'/></Button>
  )
}

export default DeleteButton