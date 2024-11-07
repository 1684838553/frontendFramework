import React from 'react'
import { useParams, useSearchParams, useLocation, useNavigate } from 'react-router-dom';

export default function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // params参数
  const params = useParams();
  // search参数
  const detailId = searchParams.get('id');
  // state参数
  const { state } = useLocation()
  console.log(state, 'stateparams')

  const updateSearch = () => {
    setSearchParams({
      ...state,
      id: detailId
    })
  }

  const jump = () => {
    navigate('/home/message', {
      state
    })
  }

  return (
    <div>
      <hr />
      <h3>详情页面</h3>
      <div>详情ID:
        <div>params参数： {params.id}</div>
        <button onClick={updateSearch}>修改search参数</button>
        <button onClick={() => navigate(1)}>前进一步</button>
        <button onClick={() => navigate(-1)}>后退一步</button>
        <button onClick={jump}>跳转</button>
      </div>
    </div>
  )
}

