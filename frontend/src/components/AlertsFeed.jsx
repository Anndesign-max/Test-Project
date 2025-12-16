import Card from './Card'
import SeverityBadge from './SeverityBadge'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { formatDate } from '../utils/formatDate'

const AlertsFeed = ({ alerts = [] }) => (
  <Card title="Active Alerts">
    {alerts.slice(0, 5).map((a) => (
      <div key={a.id} className="group text-sm">
        <div className="p-2 flex justify-between items-center border-b border-gray-100 hover:bg-pulse-light/30 rounded-lg">
          <div className="flex flex-col w-full">
            <p className="font-bold group-hover:text-pulse-primary">
              {a.title || a.message}
            </p>
            <p className="text-gray-500">{formatDate(a.timestamp)}</p>
          </div>

          <SeverityBadge severity={a.severity} />
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </div>
      </div>
    ))}
  </Card>
)

export default AlertsFeed
