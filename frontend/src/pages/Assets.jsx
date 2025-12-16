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
        const stocksRes = await getStocks()
        const cryptoRes = await getCrypto()

        console.log('📈 STOCKS RESPONSE:', stocksRes.data)
        console.log('🪙 CRYPTO RESPONSE:', cryptoRes.data)

        const stocks = Array.isArray(stocksRes.data)
          ? stocksRes.data.map(a => ({
              ...a,
              type: 'stock',
            }))
          : []

        const crypto = Array.isArray(cryptoRes.data)
          ? cryptoRes.data.map(a => ({
              ...a,
              type: 'crypto',
              sector: a.sector || 'Crypto',
            }))
          : []

        const mergedAssets = [...stocks, ...crypto]

        console.log('🧾 MERGED ASSETS:', mergedAssets)

        setAssets(mergedAssets)
      } catch (err) {
        console.error('Assets error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  if (loading) return <p>Loading assets...</p>

  // ✅ THIS WAS MISSING / MISNAMED
  const filteredAssets =
    filter === 'all'
      ? assets
      : assets.filter(a => a.type === filter)

  return (
    <div>
      <PageHeader title="Assets" />

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-6">
        {['all', 'stock', 'crypto'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg border transition ${
              filter === f
                ? 'bg-pulse-primary text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ✅ NOW DEFINED */}
      <AssetList title="All Assets" items={filteredAssets} />
    </div>
  )
}

export default Assets
