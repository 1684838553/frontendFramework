import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './myNavLink.css';

export default class MyNavLink extends Component {
    render() {
        // this.props将children属性也带过来了
        return <NavLink className={({ isActive }) => isActive ? "list-group-item atguigu" : "list-group-item"} {...this.props} />
    }
}
