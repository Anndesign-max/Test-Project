// Assets Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure

import { useEffect, useState } from 'react'
import { getStocks, getCrypto } from '../services/api'
import PageHeader from '../components/PageHeader'
import AssetList from '../components/AssetList'

const Assets = () => {
  const [assets, setAssets] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const [stocksRes, cryptoRes] = await Promise.all([
          getStocks(),
          getCrypto(),
        ])

        const stocks = stocksRes.data || []
        const crypto = cryptoRes.data || []

        setAssets([...stocks, ...crypto])
      } catch (err) {
        console.error('Assets error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  const filteredAssets =
    filter === 'all'
      ? assets
      : assets.filter((a) =>
          filter === 'stocks' ? a.sector : !a.sector
        )

  if (loading) return <p>Loading assets...</p>

  return (
    <div>
      <PageHeader title="Assets" />

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['all', 'stocks', 'crypto'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg border ${
              filter === f
                ? 'bg-pulse-primary text-white'
                : 'bg-white'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <AssetList title="All Assets" items={filteredAssets} />
    </div>
  )
}

export default Assets