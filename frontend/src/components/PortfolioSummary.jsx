import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/solid'

const PortfolioSummary = ({ portfolio }) => {
  if (!portfolio) return null

  const isPositive = portfolio.totalChange >= 0

  return (
    <div className="bg-pulse-light/50 text-black p-6 border border-pulse-primary rounded-lg mb-6">
      <h2 className="text-lg font-semibold mb-2 text-pulse-primary">
        Portfolio Value
      </h2>

      <div className="flex gap-4 items-baseline">
        <p className="text-4xl font-bold">
          ${portfolio.totalValue?.toLocaleString()}
        </p>

        <p
          className={`flex items-center gap-2 text-xl font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {portfolio.totalChange} ({portfolio.totalChangePercent}%)
          {isPositive ? (
            <ArrowTrendingUpIcon className="w-5 h-5" />
          ) : (
            <ArrowTrendingDownIcon className="w-5 h-5" />
          )}
        </p>
      </div>
    </div>
  )
}

export default PortfolioSummary
