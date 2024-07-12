import Card from '../Card'
import { BarChart } from 'lucide-react'

const Data = ({urls, clicks} : { urls : number, clicks : number}) => {
  return (
    <section className="flex overflow-x-auto gap-6">
        <Card
            title='short urls'
            value={urls}
            Icon={BarChart}/>
        <Card
            title='total clicks'
            value={clicks}
            Icon={BarChart}/>
        <Card
            title='short urls'
            value={123}
            Icon={BarChart}/>
    </section>  
)
}

export default Data