import Card from './Card'
import Badge from './Badge'
import ChangeBadge from './ChangeBadge'

const AssetList = ({ title, items = [] }) => (
  <Card title={title}>
    {items.slice(0, 3).map((a) => (
      <div
        key={a.symbol}
        className="grid grid-cols-5 items-center text-sm py-2 border-t border-gray-100"
      >
        <Badge className="bg-pulse-light/50 text-pulse-primary w-fit">
          {a.symbol}
        </Badge>

        <div className="col-span-2">
          <p className="font-bold">{a.name}</p>
          <p className="text-black/50">{a.sector || 'Crypto'}</p>
        </div>

        <div>
          <p className="text-black/50">Current Price</p>
          <p className="font-bold">${a.currentPrice}</p>
        </div>

        <div className="flex justify-end">
          <ChangeBadge value={a.changePercent} />
        </div>
      </div>
    ))}
  </Card>
)

export default AssetList
