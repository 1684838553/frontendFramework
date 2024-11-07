import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Message() {
  const { state } = useLocation();

  return (
    <div>
      <div>{state.username}</div>
      <div>{state.uid}</div>
    </div>
  )
}
