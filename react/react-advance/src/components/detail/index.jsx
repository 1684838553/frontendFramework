import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { getUser } from '../../config';

export default function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  const detailId = searchParams.get('id');

  const updateSearch = () => {
    setSearchParams({
      username: getUser().username,
      id: detailId
    })
  }

  return (
    <div>
      <hr />
      <h3>详情页面</h3>
      <div>详情ID:
        <div>params参数： {params.id}</div>
        <button onClick={updateSearch}>修改search参数</button>
      </div>
    </div>
  )
}

