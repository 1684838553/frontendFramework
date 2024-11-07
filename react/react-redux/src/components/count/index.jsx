import React, { Component } from 'react'
import { Button, Flex, Select } from 'antd';
import './count.css';

export default class Count extends Component {

    state = {
        sum: 0,
        n: 1
    }

    increment = () => {
        const { sum, n } = this.state;
        this.setState({ sum: sum + n })
    }

    decrement = () => {
        const { sum, n } = this.state;
        this.setState({ sum: sum - n })
    }

    incrementOdd = () => {
        const { sum, n } = this.state;
        if (this.state.sum % 2) {
            this.setState({ sum: sum + n })
        }
    }

    incrementWait = () => {
        const { sum, n } = this.state;
        setTimeout(() => {
            this.setState({ sum: sum + n })
        }, 100)
    }

    render() {
        const { n, sum } = this.state;

        return (
            <div className='count'>
                <h1>当前求和为：{sum}</h1>
                <Select
                    defaultValue={1}
                    style={{ width: 350 }}
                    onChange={value => this.state.n = value}
                    options={[
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3' },
                    ]}
                    className='select'
                />
                <Flex gap="small" wrap>
                    <Button onClick={this.increment}>加{n}</Button>
                    <Button onClick={this.decrement}>减{n}</Button>
                    <Button onClick={this.incrementOdd}>和为奇数加{n}</Button>
                    <Button onClick={this.incrementWait}>异步加{n}</Button>
                </Flex>
            </div>
        )
    }
}
