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

// import { useEffect, useState } from 'react'
// import { getStocks, getCrypto } from '../services/api'
// import {
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
// } from '@heroicons/react/24/solid'

// const Assets = () => {
//   const [assets, setAssets] = useState([])
//   const [filter, setFilter] = useState('all')
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const stocksRes = await getStocks()
//         const cryptoRes = await getCrypto()

//         console.log('STOCKS RESPONSE:', stocksRes.data)
//         console.log('CRYPTO RESPONSE:', cryptoRes.data)
        
//         const stocks = Array.isArray(stocksRes.data)
//           ? stocksRes.data.map(a => ({ ...a, type: 'stock' }))
//           : []

//         const crypto = Array.isArray(cryptoRes.data)
//           ? cryptoRes.data.map(a => ({ ...a, type: 'crypto' }))
//           : []

//         setAssets([...stocks, ...crypto])
//       } catch (err) {
//         console.error('Assets error:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAssets()
//   }, [])

//   if (loading) return <p>Loading assets...</p>

//   const filtered =
//     filter === 'all' ? assets : assets.filter(a => a.type === filter)

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Assets</h1>

//       <div className="mb-4 space-x-2">
//         {['all', 'stock', 'crypto'].map(f => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className="px-3 py-1 bg-gray-200 rounded"
//           >
//             {f.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       <div className="bg-white p-4 rounded shadow">
//         {filtered.map(a => (
//           <div key={a.symbol} className="grid grid-cols-5 justify-between items-center text-sm py-2 border-b border-gray-100">
//                   <span className='col-span-1 font-bold bg-pulse-light/50 text-pulse-primary p-2 rounded-lg w-fit'>{a.symbol}</span>
//                   <div className='col-span-2 flex flex-col gap-2 justify-start'>
//                       <p className='text-black font-bold'>{a.name}</p>
//                       <p className='text-black/50'>{a.sector ? a.sector : 'Crypto'}</p>
//                   </div>
//                   <div className='col-span-1 flex flex-col gap-2 justify-start'>
//                     <p className='text-black/50'>Current Price</p>
//                       <p className='text-black font-bold'>${a.currentPrice}</p>
                      
//                   </div>
//                   <div className='col-span-1 flex flex-row justify-end '>
//                     <span
//                       className={`w-fit flex flex-row gap-1 p-2 rounded-lg font-semibold ${
//                         a.changePercent >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
//                       }`}
//                     > 
//                     {a.changePercent}%
//                       {a.changePercent >= 0 ? (
//                         <ArrowTrendingUpIcon className="w-4 h-4" />
//                       ) : (
//                         <ArrowTrendingDownIcon className="w-4 h-4" />
//                       )}
                    
//                     </span>
//                   </div>
                 
//                 </div>
          
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Assets
