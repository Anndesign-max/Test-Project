// Dashboard Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure

import { useEffect, useState } from 'react'
import { getDashboard, getPortfolio } from '../services/api'

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
          getDashboard()
        ])
        
        // 🔍 DEBUG LOGS — OPEN DEVTOOLS CONSOLE
        console.log('📦 PORTFOLIO RESPONSE:', portfolioRes.data)
        console.log('📊 DASHBOARD RESPONSE:', dashboardRes.data)
        console.log('⬆️ TOP GAINERS:', dashboardRes.data?.data?.topGainers)
        console.log('⬇️ TOP LOSERS:', dashboardRes.data?.data?.topLosers)
        console.log('📰 RECENT NEWS:', dashboardRes.data?.data?.recentNews)
        console.log('🚨 ACTIVE ALERTS:', dashboardRes.data?.data?.activeAlerts)

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
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Portfolio Summary */}
      {portfolio && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Portfolio Value</h2>
          <p className="text-2xl font-bold">
            ${portfolio.totalValue?.toLocaleString()}
          </p>
          <p
            className={
              portfolio.totalChange >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {portfolio.totalChange} (
            {portfolio.totalChangePercent}%)
          </p>
        </div>
      )}

      {/* Gainers & Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AssetList title="Top Gainers" items={gainers} />
        <AssetList title="Top Losers" items={losers} />
      </div>

      {/* News & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NewsFeed news={news} />
        <AlertsFeed alerts={alerts} />
      </div>
    </div>
  )
}

/* ================= SMALL COMPONENTS ================= */

const AssetList = ({ title, items }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    {items.slice(0, 3).map((a) => (
      <div key={a.symbol} className="flex justify-between text-sm mb-1">
        <span>{a.symbol}</span>
        <span
          className={a.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}
        >
          {a.changePercent}%
        </span>
      </div>
    ))}
  </div>
)

const NewsFeed = ({ news }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">Recent News</h3>
    {news.slice(0, 5).map((n) => (
      <div key={n.id} className="text-sm mb-2">
        <p className="font-medium">{n.title}</p>
        <p className="text-gray-500">{n.source}</p>
      </div>
    ))}
  </div>
)

const AlertsFeed = ({ alerts }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">Active Alerts</h3>
    {alerts.slice(0, 5).map((a) => (
      <div key={a.id} className="text-sm mb-1">
        <span className="font-medium">{a.message}</span>
      </div>
    ))}
  </div>
)

export default Dashboard
