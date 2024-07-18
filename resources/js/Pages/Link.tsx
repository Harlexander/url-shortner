import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { LinkType } from '@/types/links';
import Referrer from '@/Components/Section/Referrer';
import { DeviceChart } from '@/Components/Charts/Device';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { BarChart, Calendar, FlagIcon, Map, MapIcon, PenIcon, ShareIcon } from 'lucide-react';
import moment from 'moment';
import { Clicks } from '@/Components/Charts/Clicks';
import { CardLink } from '@/Components/Card';
import ShareButton from '@/Components/ShareButton';
import { EditLink } from '@/Components/Forms/EditLink';

export default function Link({ auth, link, country, city, devices, days}: PageProps & { link : LinkType, country : { location : string, count : number}[], city : { city : string, count : number}[], devices : { user_agent : string, count : number}[], days : { date : string, count : number}[]} ) {    
    console.log(country)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="font-semibold text-xl text-gray-800 leading-tight">{link.name} <span className='hidden sm:inline'>- {link.original_url}</span></div>}
        >
            <section className='sm:px-16 space-y-10 py-10 sm:py-16 px-4'>
                <Head title="Dashboard" />

                <section className='grid sm:grid-cols-4 gap-5'>
                    <Card className='sm:col-span-3'>
                        <CardHeader>
                           <div className='flex flex-col sm:flex-row justify-between gap-3'>
                                <p className='text-xl font-semibold'>{link.name}</p>
                                <div className='space-x-2 flex'>
                                    <ShareButton url={link.short_url}/>
                                    <EditLink link={link}/>
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
                            <Clicks days={days}/>
                        </CardContent>
                    </Card>
                    <section className='space-y-5 flex flex-col'>
                        <DeviceChart devices={devices}/>
                        <Referrer country={country}/>
                    </section>

                </section>
            </section>
        </AuthenticatedLayout>
    );
}
