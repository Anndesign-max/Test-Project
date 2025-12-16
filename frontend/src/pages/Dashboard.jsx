// Dashboard Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure
import { useEffect, useState } from 'react'
import { getDashboard, getPortfolio } from '../services/api'

import PageHeader from '../components/PageHeader'
import AssetList from '../components/AssetList'
import NewsFeed from '../components/NewsFeed'
import AlertsFeed from '../components/AlertsFeed'
import PortfolioSummary from '../components/PortfolioSummary'

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null)
  const [gainers, setGainers] = useState([])
  const [losers, setLosers] = useState([])
  const [news, setNews] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioRes, dashboardRes] = await Promise.all([
          getPortfolio(),
          getDashboard(),
        ])

        // 🔍 Debug logs (safe to remove later)
        console.log('📦 PORTFOLIO RESPONSE:', portfolioRes.data)
        console.log('📊 DASHBOARD RESPONSE:', dashboardRes.data)

        setPortfolio(portfolioRes.data.data)
        setGainers(dashboardRes.data.data.topGainers || [])
        setLosers(dashboardRes.data.data.topLosers || [])
        setNews(dashboardRes.data.data.recentNews || [])
        setAlerts(dashboardRes.data.data.activeAlerts || [])
      } catch (err) {
        console.error('Dashboard error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading dashboard...</p>

  return (
    <div>
      {/* ================= HEADER ================= */}
      <PageHeader title="Dashboard" />

      {/* ================= PORTFOLIO SUMMARY ================= */}
      <PortfolioSummary portfolio={portfolio} />

      {/* ================= GAINERS / LOSERS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <AssetList title="Top Gainers" items={gainers} />
        <AssetList title="Top Losers" items={losers} />
      </div>

      {/* ================= NEWS & ALERTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NewsFeed news={news} />
        <AlertsFeed alerts={alerts} />
      </div>
    </div>
  )
}

export default Dashboard



// import { useEffect, useState } from 'react'
// import { getDashboard, getPortfolio } from '../services/api'
// import {
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
//   ChevronRightIcon,
// } from '@heroicons/react/24/solid'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
// import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

// const formatDate = (iso) =>
//   new Date(iso).toLocaleString(undefined, {
//     dateStyle: 'medium',
//     timeStyle: 'short',
//   })

// const Dashboard = () => {
//   const [portfolio, setPortfolio] = useState(null)
//   const [gainers, setGainers] = useState([])
//   const [losers, setLosers] = useState([])
//   const [news, setNews] = useState([])
//   const [alerts, setAlerts] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [portfolioRes, dashboardRes] = await Promise.all([
//           getPortfolio(),
//           getDashboard()
//         ])
        
//         // 🔍 DEBUG LOGS — OPEN DEVTOOLS CONSOLE
//         console.log('📦 PORTFOLIO RESPONSE:', portfolioRes.data)
//         console.log('📊 DASHBOARD RESPONSE:', dashboardRes.data)
//         console.log('⬆️ TOP GAINERS:', dashboardRes.data?.data?.topGainers)
//         console.log('⬇️ TOP LOSERS:', dashboardRes.data?.data?.topLosers)
//         console.log('📰 RECENT NEWS:', dashboardRes.data?.data?.recentNews)
//         console.log('🚨 ACTIVE ALERTS:', dashboardRes.data?.data?.activeAlerts)

//         setPortfolio(portfolioRes.data.data)
//         setGainers(dashboardRes.data.data.topGainers || [])
//         setLosers(dashboardRes.data.data.topLosers || [])
//         setNews(dashboardRes.data.data.recentNews || [])
//         setAlerts(dashboardRes.data.data.activeAlerts || [])
//       } catch (err) {
//         console.error('Dashboard error:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   if (loading) return <p>Loading dashboard...</p>

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

//       {/* Portfolio Summary */}
//       {portfolio && (
//         <div className="bg-pulse-light/50 text-black p-6 border border-pulse-primary rounded-lg mb-6">
//           <h2 className="text-lg font-semibold mb-2 text-pulse-primary">Portfolio Value</h2>
//           <div className='flex flex-row gap-4 items-baseline'>
//              <p className="text-4xl font-bold">
//             ${portfolio.totalValue?.toLocaleString()}
//           </p>
//           <p
//             className={`flex items-center gap-2 text-xl font-medium ${
//               portfolio.totalChange >= 0
//                 ? 'text-green-600'
//                 : 'text-red-600'
//             }`}
//           >
//             {portfolio.totalChange} ({portfolio.totalChangePercent}%)
//             {portfolio.totalChange >= 0 ? (
//               <ArrowTrendingUpIcon className="w-5 h-5" />
//             ) : (
//               <ArrowTrendingDownIcon className="w-5 h-5" />
//             )}
            
//           </p>
//           </div>
         
//         </div>
//       )}

//       {/* Gainers & Losers */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
//         <AssetList title="Top Gainers" items={gainers} />
//         <AssetList title="Top Losers" items={losers} />
//       </div>

//       {/* News & Alerts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <NewsFeed news={news} />
//         <AlertsFeed alerts={alerts} />
//       </div>
//     </div>
//   )
// }

// /* ================= SMALL COMPONENTS ================= */

// const AssetList = ({ title, items }) => (
//   <div className="bg-white p-6 rounded-lg border border-pulse-light">
//     <h3 className="font-semibold mb-2 uppercase pb-6 text-gray-400">{title}</h3>
//     {items.slice(0, 3).map((a) => (
//       <div key={a.symbol} className="grid grid-cols-5 justify-between items-center text-sm py-2 border-t border-gray-100">
//         <span className='col-span-1 font-bold bg-pulse-light/50 text-pulse-primary p-2 rounded-lg w-fit'>{a.symbol}</span>
//         <div className='col-span-2 flex flex-col gap-2 justify-start'>
//             <p className='text-black font-bold'>{a.name}</p>
//             <p className='text-black/50'>{a.sector ? a.sector : 'Crypto'}</p>
//         </div>
//         <div className='col-span-1 flex flex-col gap-2 justify-start'>
//           <p className='text-black/50'>Current Price</p>
//             <p className='text-black font-bold'>${a.currentPrice}</p>
            
//         </div>
//         <div className='col-span-1 flex flex-row justify-end '>
//           <span
//             className={`w-fit flex flex-row gap-1 p-2 rounded-lg font-semibold ${
//               a.changePercent >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
//             }`}
//           > 
//           {a.changePercent}%
//             {a.changePercent >= 0 ? (
//               <ArrowTrendingUpIcon className="w-4 h-4" />
//             ) : (
//               <ArrowTrendingDownIcon className="w-4 h-4" />
//             )}
          
//           </span>
//         </div>
       
//       </div>
//     ))}
//   </div>
// )

// const NewsFeed = ({ news }) => (
//   <div className="bg-white p-6 rounded-lg border border-pulse-light">
//     <h3 className="font-semibold mb-2 uppercase pb-6 text-gray-400 py-2 border-b border-gray-100">Recent News</h3>
//     {news.slice(0, 5).map((n) => (
//       <div key={n.id} className="group text-sm mb-2">
//         <div className='p-2 flex flex-row justify-between items-center border-b border-gray-100 group-hover:bg-pulse-light/30 group-hover:rounded-lg cursor-pointer'>
//           <div className='flex flex-col'> 
//             <p className="font-bold group-hover:text-pulse-primary">{n.title}</p>
//             <p className="text-gray-500 mb-4">{n.source}</p>
//             <div className='flex flex-row gap-2'>
//               {n.tags.map(tag => (
//               <span key={tag} className="w-fit bg-pulse-light/50 uppercase text-pulse-dark text-xs px-2 py-1 rounded-full mr-1 mt-1">{tag}</span>
//               ))}
//             </div>           
//           </div>
//           <div className=''>
//             <ChevronRightIcon className="w-5 h-5" />
//           </div>
//         </div> 
//       </div>
        
//     ))}
//   </div>
// )


// const SEVERITY_STYLES = {
//   critical: {
//     className: 'text-white bg-red-700',
//     icon: ExclamationTriangleIcon,
//   },
//   high: {
//     className: 'text-yellow-600 bg-yellow-50',
//     icon: ExclamationCircleIcon,
//   },
//   medium: {
//     className: 'text-orange-600 bg-orange-100',
//     icon: ArrowTrendingDownIcon,
//   },
//   low: {
//     className: 'text-green-700 bg-green-100',
//     icon: ArrowTrendingDownIcon,
//   },
// }

// const AlertsFeed = ({ alerts = [] }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg border border-pulse-light">
//       <h3 className="font-semibold uppercase text-gray-400 pb-6 mb-2 border-b border-gray-100">
//         Active Alerts
//       </h3>

//       {alerts.slice(0, 5).map((a) => {
//         const severityConfig =
//           SEVERITY_STYLES[a.severity] || SEVERITY_STYLES.Low

//         const SeverityIcon = severityConfig.icon

//         return (
//           <div key={a.id} className="group text-sm">
//             <div className="p-2 flex justify-between items-center border-b border-gray-100 group-hover:bg-pulse-light/30 group-hover:rounded-lg cursor-pointer transition">
              
//               {/* LEFT CONTENT */}
//               <div className="flex flex-col w-full">
//                 <p className="font-bold group-hover:text-pulse-primary">
//                   {a.title || a.message}
//                 </p>
//                 <p className="text-gray-500">
//                   {formatDate(a.timestamp)}
//                 </p>
//               </div>

//               {/* SEVERITY BADGE */}
//               <div
//                 className={`flex items-center gap-1 px-2 py-1 rounded-lg font-semibold ${severityConfig.className}`}
//               >
//                 <SeverityIcon className="w-4 h-4" />
//                 {a.severity}
//               </div>

//               {/* CHEVRON */}
//               <ChevronRightIcon className="w-5 h-5  ml-2" />
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default Dashboard
