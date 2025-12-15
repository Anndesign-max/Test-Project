// Portfolio Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure

import { useEffect, useState } from 'react'
import { getPortfolio } from '../services/api'

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null)

  useEffect(() => {
    getPortfolio().then(res =>  {
      console.log('PORTFOLIO RESPONSE::', res.data)
      setPortfolio(res.data.data)
    }).catch(err => console.error(err))
  }, [])
  
  if (!portfolio) return <p>Loading portfolio...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
      <div className="bg-white p-6 rounded shadow">
        <p>Total Value: ${portfolio.totalValue.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default Portfolio
