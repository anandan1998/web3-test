import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataDisplay() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 确保这里的 URL 是后端的 API 地址
    axios.get('http://localhost:5000/api/data/')  // 请替换为实际的后端 API 地址
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>BigQuery Data</h1>
      <table>
        <thead>
          <tr>
            {/* 根据你的 BigQuery 表的字段定义表头 */}
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            {/* 更多列 */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {/* 根据你的数据结构填充表格 */}
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              {/* 更多列 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplay;
