import React from 'react';
import {View} from 'react-native';


export default class HorBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const stylesLeft = {
            backgroundColor: 'blue',
            flex: this.props.left
        }

        const stylesRight = {
            backgroundColor: 'red',
            flex: this.props.right
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 30
                }}>
                <View style={stylesLeft}/>
                <View style={stylesRight}/>
            </View>
        )
    }

}
