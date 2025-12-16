import { ChevronRightIcon } from '@heroicons/react/24/solid'
import SeverityBadge from './SeverityBadge'
import { formatDate } from '../utils/formatDate'

const AlertList = ({ alerts = [] }) => (
  <>
    {alerts.slice(0, 5).map((a) => (
      <div
        key={a.id}
        className="p-2 flex justify-between items-center border-b border-gray-100 hover:bg-pulse-light/30 rounded-lg cursor-pointer"
      >
        <div>
          <p className="font-bold">{a.title || a.message}</p>
          <p className="text-gray-500">{formatDate(a.timestamp)}</p>
        </div>

        <SeverityBadge severity={a.severity} />
        <ChevronRightIcon className="w-5 h-5 ml-2" />
      </div>
    ))}
  </>
)

export default AlertList
