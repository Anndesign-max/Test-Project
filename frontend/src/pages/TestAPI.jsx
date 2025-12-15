import { useEffect, useState } from 'react';
import api from '../services/api';

export default function TestAPI() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api('/assets')
      .then(res => {
        console.log('FULL RESPONSE:', res.data);     // inspect everything
        console.log('ASSETS ARRAY:', res.data.data); // inspect assets only
        setData(res.data.data); // ✅ store only the array
      })
      .catch(console.error);
  }, []);
  

  if (!data) return <p>Loading...</p>;

  return<div>
    <div>
    <h2>Assets</h2>
    {data.map(asset => (
      <div key={asset.id}>
        <strong>{asset.symbol}</strong> — {asset.name}
        <br />
        Price: ${asset.currentPrice}
        <br />
        Change: {asset.changePercent}%
        <hr />
      </div>
    ))}
  </div>
  <br/>
 <pre>{JSON.stringify(data, null, 2)}</pre>;
  </div>
}
