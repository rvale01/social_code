import React from 'react'
import { Header, Input, Button } from 'react-native-elements';
import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import { Agenda, Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc, RFValue } from "react-native-responsive-fontsize";

import { styles } from '../style/GlobalStyles'
//redux
import { connect } from 'react-redux';
import { getName } from '../../redux/General/actions/AppointmentsActions';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class FirstPage extends React.Component {
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <ImageBackground style={{ width: wp(100), height: hp(100) }} source={require('../../assets/Background_welcome_page.png')}>
                <View style={{ marginTop: hp(30) }}>
                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', justifyContent: 'center', width: wp(300) }} horizontal pagingEnabled={true}>
                        <View style={{ width: wp(100), marginTop: hp(10) }}>
                            <Text style={[styles.welcomeTitle, { marginLeft: wp(30), }]}>Welcome</Text>
                        </View>
                        <View style={{ width: wp(100) }}>
                            <Text style={styles.welcomeTitle}>The easiest app to keep tracking of your appointments, notes and to dos </Text>
                        </View>
                        <View style={{
                            width: wp(100),
                        }}>
                            <Button buttonStyle={styles.button} title="Register" titleStyle={styles.buttonTitle}></Button>
                            <Button buttonStyle={styles.button} title="Login" titleStyle={styles.buttonTitle}></Button>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("NoRegistration")}>
                                <Text style={styles.link}>Or use the App without an account</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    {/* <View></View> */}
                </View>
            </ImageBackground>
        )
    }
}