import Card from './Card'
import SeverityBadge from './SeverityBadge'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { formatDate } from '../utils/formatDate'

const AlertsFeed = ({ alerts = [] }) => (
  <Card title="Active Alerts">
    {alerts.slice(0, 5).map((a) => (
      <div key={a.id} className="group text-sm">
        <div className="p-4 flex justify-between items-center border-b border-gray-100 hover:bg-pulse-light/30 rounded-lg">
          <div className="flex flex-col w-full">
            <p className="font-bold text-lg group-hover:text-pulse-primary mb-2">
              {a.title || a.message}
            </p>
            <div className='flex flex-row items-center gap-2'>
                <SeverityBadge severity={a.severity} />
                <p className="text-gray-500 text-sm">Reported on {formatDate(a.timestamp)}</p>
            </div>
            
          </div>
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </div>
      </div>
    ))}
  </Card>
)

export default AlertsFeed
