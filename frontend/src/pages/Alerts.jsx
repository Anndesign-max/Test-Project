// Alerts Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure

import { useEffect, useState } from 'react'
import { getAlerts } from '../services/api'
import PageHeader from '../components/PageHeader'
import AlertsFeed from '../components/AlertsFeed'

const Alerts = () => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await getAlerts()
        console.log('🚨 ALERTS RESPONSE:', res.data)
        setAlerts(res.data.data || [])
      } catch (err) {
        console.error('Alerts error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  if (loading) return <p>Loading alerts...</p>

  return (
    <div>
      <PageHeader title="Alerts" />
      <AlertsFeed alerts={alerts} />
    </div>
  )
}

export default Alerts
