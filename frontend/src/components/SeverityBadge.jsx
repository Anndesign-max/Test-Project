import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/solid'

const SEVERITY_CONFIG = {
  critical: {
    className: 'text-white bg-red-700',
    icon: ExclamationTriangleIcon,
  },
  high: {
    className: 'text-yellow-700 bg-yellow-50',
    icon: ExclamationCircleIcon,
  },
  medium: {
    className: 'text-orange-700 bg-orange-50',
    icon: ArrowTrendingDownIcon,
  },
  low: {
    className: 'text-green-700 bg-green-50',
    icon: ArrowTrendingDownIcon,
  },
}

const SeverityBadge = ({ severity = 'low' }) => {
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.low
  const Icon = config.icon

  return (
    <span
      className={`w-fit flex items-center gap-1 px-2 py-1 rounded-lg font-semibold text-sm ${config.className}`}
    >
      <Icon className="w-4 h-4" />
      {severity}
    </span>
  )
}

export default SeverityBadge
