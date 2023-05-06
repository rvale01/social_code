import React from 'react'
import { Header } from 'react-native-elements';
import { View, Text, TouchableOpacity, Image } from 'react-native'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Header containerStyle={{ backgroundColor: 'white', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                        <Image source={require('./drawer.png')} style={{ width: 50, height: 50, tintColor: '#1F73BD' }} />
                    </TouchableOpacity>
                </Header>
            </View>
        )
    }
}

export default HomePage