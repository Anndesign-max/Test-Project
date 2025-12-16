import Badge from './Badge'
import ChangeBadge from './ChangeBadge'
import Card from './Card'

const AssetList = ({ title, items, limit }) => {
  const visibleItems = limit ? items.slice(0, limit) : items

  return (
    <Card title={title}>
      {/* HEADER ROW */}
      <div className="grid grid-cols-5 text-xs font-semibold text-gray-400 uppercase py-3 bg-slate-100 rounded-lg px-4">
        <div><p>Symbol</p></div>
        <div className="col-span-2"><p>Asset</p></div>
        <div><p>Current Price</p></div>
        <div className="text-right"><p>Change</p></div>
      </div>

      {/* ROWS */}
      {visibleItems.length === 0 && (
        <p className="text-gray-400 text-sm mt-4">
          No assets found.
        </p>
      )}

      {visibleItems.map(a => (
        <div
        key={a.symbol}
        className="grid grid-cols-5 items-center text-sm p-4 border-t border-gray-100"
      >
        <Badge className="bg-pulse-light/50 text-pulse-primary w-fit">
          {a.symbol}
        </Badge>

        <div className="col-span-2">
          <p className="font-bold">{a.name}</p>
          <p className="text-black/50">{a.sector || 'Crypto'}</p>
        </div>
      
        <p className="font-bold ">${a.currentPrice}</p>
  

        <div className="flex justify-end">
          <ChangeBadge value={a.changePercent} />
        </div>
      </div>
      ))}
    </Card>
  )
}

export default AssetList
