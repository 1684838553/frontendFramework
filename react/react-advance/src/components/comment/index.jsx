import { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import moment from 'moment';
import axios from 'axios';

import { getUser, URL } from '../../config';
import './comment.css';

export default function Comment() {
    const [commentlist, setCommentList] = useState([]);
    const [sortType, setSortType] = useState('hot');
    const [content, setContent] = useState('');
    const inputRef = useRef(null);
    const user = getUser();

    useEffect(() => {
        getCommentList();
    }, [])

    const getCommentList = async () => {
        try {
            const { status, data } = await axios.get(`${URL}/commentList`);
            if (status === 200) {
                setCommentList(data.sort((a, b) => b.fave - a.fave))
            }
        } catch { }
    }

    const handlerClick = id => {
        setCommentList(commentlist.filter(item => item.id !== id));
        try {
            axios.delete(`${URL}/deleteComemnt/${id}`);
        } catch { }
    }

    const handlerPublish = async () => {
        const comment = { ...user, content, fave: 0, id: nanoid(), time: moment().format('YYYY-MM-DD HH:mm') }
        setCommentList([...commentlist, comment])
        // 清空输入框
        setContent('');
        // 聚焦
        inputRef.current.focus();
        try {
            await axios.post(`${URL}/updateCommentList`, comment);
        } catch { }
    }

    const changeSortType = sortType => {
        setSortType(sortType);
        if (sortType === 'new') {
            setCommentList(commentlist.sort((a, b) => new Date(b.time) - new Date(a.time)))
        } else {
            setCommentList(commentlist.sort((a, b) => b.fave - a.fave))
        }
    }

    return <div>
        <div className="header">
            <div className='navbar'>
                <div className="title">
                    <h2>评论</h2>
                    <div className="count">{commentlist.length}</div>
                </div>
                <div className="sort-actions">
                    <span className={classnames('text-button', { active: sortType === 'hot' })} onClick={() => changeSortType('hot')}>最热</span>
                    <span className="sort-div"></span>
                    <span className={classnames('text-button', { active: sortType === 'new' })} onClick={() => changeSortType('new')}>最新</span>
                </div>
            </div>
            <div className="comment-box">
                <div className="user-avatar" style={{ backgroundImage: `url(${user && user.avatar})` }}></div>
                <div className="comment-area">
                    <textarea rows={1} ref={inputRef} type="text" placeholder='发一条友善的评论' value={content} onChange={e => setContent(e.target.value)} />
                    <button onClick={handlerPublish}>发布</button>
                </div>
            </div>
        </div>
        <div className='comments'>
            {
                commentlist.map(item => {
                    return <div className="comment" key={item.id}>
                        <div className="user-avatar" style={{ backgroundImage: `url(${item.avatar})` }}></div>
                        <div className="main">
                            <div className="header">
                                <div className="username">{item.username}</div>
                            </div>
                            <div className="content">{item.content}</div>
                            <div className="footer">
                                <div className="time">{item.time}</div>
                                <div className="give-like">点赞数：{item.fave}</div>
                                {
                                    item.uid === user.uid ? <div className="delete" onClick={() => handlerClick(item.id)}>删除</div> : undefined
                                }
                            </div>
                        </div>
                    </div>

                })
            }
        </div>
    </div>;
}