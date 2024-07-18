import React, { useMemo } from 'react'
import { Button } from './ui/button'
import { Share2Icon } from 'lucide-react'

interface Prop {
    url : string, 
    title ?: string, 
    description ?: string
}

const ShareButton = ({url, title} : Prop ) => {

    const shareLink = (url : string, title ?: string) => {
        navigator.share({
            title : "",
            url : url
        })
    }

  return (
    <Button 
        variant={'outline'} 
        className='gap-2'
        onClick={() => shareLink(url)}>
            Share Link <Share2Icon className='h-4'/>
    </Button>
  )
}

export default ShareButton