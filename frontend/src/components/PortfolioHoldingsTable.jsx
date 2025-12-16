import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/solid'

const PortfolioHoldingsTable = ({ assets = [] }) => {
  if (!assets.length) return null

  return (
    <div className="bg-white p-6 rounded-lg border border-pulse-light">
      <h2 className="text-lg font-semibold mb-4 uppercase text-gray-400">
        Holdings
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Asset</th>
            <th>Quantity</th>
            <th>Avg Buy</th>
            <th>Current</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => {
            const isPositive = asset.change >= 0

            return (
              <tr
                key={asset.assetId}
                className="border-b last:border-0 hover:bg-pulse-light/30"
              >
                <td className="py-3 font-bold text-pulse-primary">
                  {asset.assetId}
                </td>

                <td>{asset.quantity}</td>
                <td>${asset.avgBuyPrice.toLocaleString()}</td>
                <td>${asset.currentPrice.toLocaleString()}</td>
                <td className="font-semibold">
                  ${asset.value.toLocaleString()}
                </td>

                <td>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg font-semibold ${
                      isPositive
                        ? 'text-green-600 bg-green-50'
                        : 'text-red-600 bg-red-50'
                    }`}
                  >
                    {asset.changePercent}%
                    {isPositive ? (
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-4 h-4" />
                    )}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PortfolioHoldingsTable
