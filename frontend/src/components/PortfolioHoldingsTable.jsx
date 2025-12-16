import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/solid'
import Badge from './Badge'
import Card from './Card'

const PortfolioHoldingsTable = ({ assets = [] }) => {
  if (!assets.length) return null

  return (
    <Card title=" Your Assets">

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-400 uppercase py-3 bg-slate-100 rounded-lg px-4">
            <th className="p-4">Asset</th>
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
                <td className="p-4 font-bold text-pulse-primary">
                    <Badge className="bg-pulse-light/50 text-pulse-primary w-fit">
                     {asset.assetId}
                    </Badge>
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
    </Card>
  )
}

export default PortfolioHoldingsTable
