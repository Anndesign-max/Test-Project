// Assets Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure

import { useEffect, useState } from 'react'
import { getStocks, getCrypto } from '../services/api'

const Assets = () => {
  const [assets, setAssets] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const stocksRes = await getStocks()
        const cryptoRes = await getCrypto()

        console.log('STOCKS RESPONSE:', stocksRes.data)
        console.log('CRYPTO RESPONSE:', cryptoRes.data)
        
        const stocks = Array.isArray(stocksRes.data)
          ? stocksRes.data.map(a => ({ ...a, type: 'stock' }))
          : []

        const crypto = Array.isArray(cryptoRes.data)
          ? cryptoRes.data.map(a => ({ ...a, type: 'crypto' }))
          : []

        setAssets([...stocks, ...crypto])
      } catch (err) {
        console.error('Assets error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  if (loading) return <p>Loading assets...</p>

  const filtered =
    filter === 'all' ? assets : assets.filter(a => a.type === filter)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assets</h1>

      <div className="mb-4 space-x-2">
        {['all', 'stock', 'crypto'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        {filtered.map(a => (
          <div
            key={a.symbol}
            className="flex justify-between text-sm mb-2"
          >
            <span>{a.symbol}</span>
            <span
              className={
                a.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
              }
            >
              {a.changePercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Assets
