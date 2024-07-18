import Card from '../Card'
import { BarChart, BarChart2Icon, LinkIcon, UserIcon } from 'lucide-react'

const Data = ({urls, clicks} : { urls : number, clicks : number}) => {
  return (
    <section className="flex overflow-x-auto gap-6">
        <Card
            title='short urls'
            value={urls}
            Icon={LinkIcon}/>
        <Card
            title='total clicks'
            value={clicks}
            Icon={BarChart2Icon}/>
        <Card
            title='Account Plan'
            value={"Free"}
            Icon={UserIcon}/>
    </section>  
)
}

export default Data