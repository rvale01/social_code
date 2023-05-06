import React from 'react'
import { View, Text, TouchableOpacity, Image, Keyboard, FlatList } from 'react-native'
import { Header, Input, Button, Badge, Icon } from 'react-native-elements';
import { styles } from '../style/GlobalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc } from "react-native-responsive-fontsize";


export default class BackLink extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
                <View style={{ flexDirection: 'row', marginLeft:wp(3) }}>
                    <Icon
                        containerStyle={[styles.arrowIconContainer, { marginLeft: wp(0), }]}
                        name="chevron-left" type="font-awesome-5" color='white' size={fontPerc(5)} ></Icon>
                    <Text style={styles.linkText}>{this.props.text}</Text>
                </View>
        )
    }
}