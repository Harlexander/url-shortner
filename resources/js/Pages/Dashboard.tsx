import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Create from '@/Components/Section/Create';
import URLS from '@/Components/Section/URLS';
import Referrer from '@/Components/Section/Referrer';
import Data from '@/Components/Section/Data';
import { LinkType } from '@/types/links';

export default function Dashboard({ auth, links, urls, clicks, country }: PageProps & { links : LinkType[], urls : number, clicks : number, country : { location : string, count : 2 }[] }) {    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <section className='sm:px-16 space-y-10 py-10 sm:py-16 px-4'>
                <Head title="Dashboard" />
                <Data urls={urls} clicks={clicks}/>
                <Create/>
                <section className='sm:grid space-y-5 sm:space-y-0 sm:grid-cols-3 gap-4'>
                    <URLS links={links} className='sm:col-span-2 col-1'/>
                    <Referrer country={country}/>
                </section>
            </section>
        </AuthenticatedLayout>
    );
}
