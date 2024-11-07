import React from 'react'
import { useParams } from 'react-router-dom';

export default function Detail() {

  const params = useParams();

  return (
    <div>
      <hr />
      <h3>详情页面</h3>
      <p>详情ID: {params.id}</p>
    </div>
  )
}

