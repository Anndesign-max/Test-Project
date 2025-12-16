// News Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure
import { useEffect, useState } from 'react'
import { getNews } from '../services/api'
import PageHeader from '../components/PageHeader'
import NewsFeed from '../components/NewsFeed'

const News = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getNews()
        console.log('📰 NEWS RESPONSE:', res.data)
        setNews(res.data.data || [])
      } catch (err) {
        console.error('News error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) return <p>Loading news...</p>

  return (
    <div>
      <PageHeader title="News" />
      <NewsFeed news={news} />
    </div>
  )
}

export default News


// import { useEffect, useState } from 'react'
// import { getNews } from '../services/api'

// const News = () => {
//   const [news, setNews] = useState([])

//   useEffect(() => {
//     getNews().then(res =>  {
//       console.log('NEWS RESPONSE:', res.data)
//       setNews(res.data.data)
//     }).catch(err => console.error(err))
//   }, [])
  
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">News</h1>
//       {news.map(n => (
//         <div key={n.id} className="bg-white p-4 rounded shadow mb-3">
//           <p className="font-semibold">{n.title}</p>
//           <p className="text-gray-500 text-sm">{n.source}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default News
