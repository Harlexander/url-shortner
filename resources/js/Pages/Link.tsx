import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { LinkType } from '@/types/links';
import Referrer from '@/Components/Section/Referrer';
import { DeviceChart } from '@/Components/Charts/Device';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { BarChart, Calendar, Clipboard, FlagIcon, Map, MapIcon, PenIcon } from 'lucide-react';
import moment from 'moment';
import { Clicks } from '@/Components/Charts/Clicks';
import { CardLink } from '@/Components/Card';

export default function Link({ auth, link, country, city}: PageProps & { link : LinkType, country : { location : string, count : number}[], city : { city : string, count : number}[]} ) {    
    console.log(country)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">URL Details - {link.original_url}</h2>}
        >
            <section className='sm:px-16 space-y-10 py-10 sm:py-16 px-4'>
                <Head title="Dashboard" />

                <section className='grid sm:grid-cols-4 gap-5'>
                    <Card className='sm:col-span-3'>
                        <CardHeader>
                           <div className='flex flex-row justify-between'>
                                <p className='text-xl font-semibold'>Global School of Ministry</p>
                                <div className='space-x-2 hidden sm:block'>
                                    <Button className='gap-3'>Copy Link <Clipboard className='h-4'/></Button>
                                    <Button className='gap-3'>Edit URL <PenIcon className='h-4'/></Button>
                                </div>
                           </div>
                        </CardHeader>

                        <CardContent className='space-y-5'>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                                <CardLink
                                    Icon={Calendar}
                                    value={moment(link.created_at).format("ddd, DD MMM")}
                                    title='Created On'/>
                                <CardLink
                                    Icon={BarChart}
                                    value={link.clicks}
                                    title='Total Clicks'/>
                                <CardLink
                                    Icon={FlagIcon}
                                    value={country[0] ? country[0].location : 'N/A'}
                                    title='Top Country'/>
                                <CardLink
                                    Icon={MapIcon}
                                    value={city[0] ? city[0].city : 'N/A'}
                                    title='Top City'/>
                            </div>
                            <Clicks/>
                        </CardContent>
                    </Card>
                    <section className='space-y-5'>
                        <DeviceChart/>
                        <Referrer country={country}/>
                    </section>

                </section>
            </section>
        </AuthenticatedLayout>
    );
}
