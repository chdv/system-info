import React, {Component} from 'react';
import {Chart} from 'primereact/chart';
import {getMemoryInfo} from './RestApi';

class Memory extends Component {

    state = {
        data: {
            used: 0,
            free: 0
        }
    }

    fetchData() {
        this.setState({ loading: true });
        getMemoryInfo()
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
        const data = {
            labels: ['Занято, Мб','Свободно, Мб'],
            datasets: [
                {
                    data: [this.state.data.used,  this.state.data.free],
                    backgroundColor: [
                        "#FF6384",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#FFCE56"
                    ]
                }]
        };

        return (
            <div>
                <h1>Память</h1>
                <Chart type="pie" data={data} />
            </div>
        )
    }
}

export default Memory;