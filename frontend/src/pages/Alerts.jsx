// Alerts Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure

import { useEffect, useState } from 'react'
import { getAlerts } from '../services/api'

const Alerts = () => {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    getAlerts().then(res => {
      console.log('ALERTS RESPONSE:', res.data)
      setAlerts(res.data.data)
    }).catch(err => console.error(err))
  }, [])
  

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Alerts</h1>

      {alerts.map(a => (
        <div key={a.id} className="bg-white p-4 rounded shadow">
          <p>{a.message}</p>
          <p className="text-sm text-gray-500">
            {a.severity.toUpperCase()} • {new Date(a.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Alerts
