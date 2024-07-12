import React, { FormEventHandler } from 'react'
import TextInput from '../TextInput'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react';
import InputError from '../InputError';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import InputLabel from '../InputLabel';

const Create = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
      link: 'https://',
      slug: '',
  });

  const { toast } = useToast();

const create:FormEventHandler = (e) => {
  e.preventDefault();

  post(route('create.url'), {
    onSuccess: () => {
      toast({
        title: "Url created successfully",
        description: "Start sharing your link and get more people to view your link"
      })
    }
  });
}

return (
    <div className='bg-white p-5 rounded space-y-3'>
        <p className='font-semibold'>Create new short URL</p>

        <form onSubmit={create} className='space-y-2'>
            <div className='grid sm:grid-cols-4 gap-3'>
              <div className='col-span-3'>
                <InputLabel>Original URL</InputLabel>
                <TextInput 
                    id='link'
                    type='url'
                    name='link'
                    value={data.link}
                    className='w-full'
                    placeholder='https://peachy.com'
                    onChange={e => setData('link', e.target.value)}/>
              </div>
              <div>
                <InputLabel>Preferred slug (optional)</InputLabel>
                <TextInput 
                    id='slug'
                    type='text'
                    name='slug'
                    value={data.slug}
                    className='w-full'
                    placeholder='title,name,reference'
                    onChange={e => setData('slug', e.target.value)}/>
              </div>
            </div>
            <Button>{!processing ? 'Shortnen URL' : 'Loading'}</Button>


            <InputError message={errors.link} className="mt-2" />
            <InputError message={errors.slug} className="mt-2" />
        </form>
    </div>
  )
}

export default Create