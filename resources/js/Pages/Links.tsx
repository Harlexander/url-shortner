import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { LinkType } from '@/types/links';
import { LinkContainer } from '@/Components/Card';

export default function Links({ auth, links }: PageProps & { links : LinkType[], urls : number, clicks : number, country : { location : string, count : 2 }[] }) {    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Links</h2>}
        >
            <section className='sm:px-16 space-y-10 py-10 sm:py-16 px-4'>
                <Head title="Dashboard" />


                <section className='space-y-4'>
                    {
                        links.map((link) => (
                            <LinkContainer link={link}/>
                        ))
                    }
                </section>
            </section>
        </AuthenticatedLayout>
    );
}
