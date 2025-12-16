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