import React, { Component } from 'react';
import { Table } from 'antd';
import {getSysInfo} from './RestApi';

class SysData extends Component {

    constructor(props) {
        super(props)

        this.columns =
            [
                {title: "Параметр", dataIndex: "name", width: "35%", sorter: (a, b) => a.name.localeCompare(b.name)},
                {title: "Значение", dataIndex: "value"}
            ]
        this.data = []
        this.state = {
            data: this.data,
            pagination: {},
            loading: false
        };
        this.fetchData = this.fetchData.bind(this);

    }

    fetchData() {
        this.setState({
            loading: true
        });

        getSysInfo()
            .then(response => {
                this.setState({
                    data: response,
                    pagination: {},
                    loading: false
                })
            }).catch(error => {
            this.setState({
                loading: false
            })
        });

    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <h1>Системные переменные</h1>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}

export default SysData;