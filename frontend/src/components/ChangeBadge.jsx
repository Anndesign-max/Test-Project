import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/solid'

const ChangeBadge = ({ value }) => {
  const isPositive = value >= 0

  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 rounded-lg font-semibold ${
        isPositive
          ? 'text-green-600 bg-green-50'
          : 'text-red-600 bg-red-50'
      }`}
    >
      {value}%
      {isPositive ? (
        <ArrowTrendingUpIcon className="w-4 h-4" />
      ) : (
        <ArrowTrendingDownIcon className="w-4 h-4" />
      )}
    </span>
  )
}

export default ChangeBadge
