import React from 'react'
import { Header, Input, Button, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import { Agenda, Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc, RFValue } from "react-native-responsive-fontsize";

import { styles } from '../style/GlobalStyles'
//redux
import { connect } from 'react-redux';
import { setName } from '../../redux/General/actions/AppointmentsActions';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class NoRegistration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleSubmit = () => {
        this.props.setName(this.state.name)
    }
    render() {
        return (
            <ImageBackground style={{ width: wp(100), height: hp(100) }} imageStyle={{ resizeMode: 'cover' }} source={require('../../assets/background_no_reg.png')}>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: hp(20) }}>
                        <Text style={styles.welcomeTitle}>Use the app without any registration! Just add your name!</Text>
                        <Input
                            containerStyle={[styles.inputContainer, { marginTop: hp(15) }]}
                            inputContainerStyle={styles.container}
                            inputStyle={{ fontSize: fontPerc(3) }}
                            placeholder="Your name"
                            onChangeText={(text) => { this.setState({ name: text }) }}
                        ></Input>
                        {/* <Button title="Start" buttonStyle={[styles.button, { marginTop: hp(20) }]} titleStyle={styles.buttonTitle} onPress={this.handleSubmit}></Button> */}
                        <TouchableOpacity style={[styles.button, { marginTop: hp(15), flexDirection: 'row' }]} onPress={()=>this.handleSubmit()}>
                            <Text style={[styles.buttonTitle, { marginLeft: wp(5), paddingTop: hp(1), paddingBottom: hp(1) }]}>Start</Text>
                            <Icon
                                containerStyle={{ backgroundColor: '#A0A0A0', width: hp(5), height: hp(5), borderRadius: hp(5) / 2, marginLeft:wp(23), marginTop:hp(1) }}
                                // iconStyle={{backgroundColor:'#A0A0A0', width:20, height:20, borderRadius:50, alignSelf:'flex-end'}} 
                                name="chevron-right" type="font-awesome-5" color='white' size={fontPerc(5)}></Icon>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        name: state.appointment.name
    }
}

export default connect(mapStateToProps, { setName })(NoRegistration)