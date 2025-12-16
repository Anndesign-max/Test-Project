// Portfolio Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure
import { useEffect, useState } from 'react'
import { getPortfolio } from '../services/api'
import PageHeader from '../components/PageHeader'
import PortfolioSummary from '../components/PortfolioSummary'
import PortfolioHoldingsTable from '../components/PortfolioHoldingsTable'

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolio()
        console.log('📦 PORTFOLIO RESPONSE:', res.data)
        setPortfolio(res.data.data)
      } catch (err) {
        console.error('Portfolio error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [])

  if (loading) return <p>Loading portfolio...</p>

  return (
    <div>
      <PageHeader title="Portfolio" />

      <PortfolioSummary portfolio={portfolio} />

      <PortfolioHoldingsTable assets={portfolio.assets} />      
    </div>
  )
}

export default Portfolio
