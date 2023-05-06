import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc } from "react-native-responsive-fontsize";
import { Header, Button, Icon } from 'react-native-elements';
import { DialogTitle } from 'react-native-popup-dialog';
import PopupDialog from 'react-native-popup-dialog';
import { styles } from '../style/GlobalStyles'
//redux
import { connect } from 'react-redux';
import { getAppointment, getEdit } from '../../redux/General/actions/AppointmentsActions';

//styles
import { bullet, buttons } from '../style/GlobalStyles'



class Boxes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: {},
            color: ""
        }
    }

    handleDelete = () => {
        const list = this.props.appointmentList.filter((value) => value.id != this.props.object.id)
        this.props.getAppointment(list)
    }

    render() {
        let { color } = ""
        this.props.types.map((value) => {
            if (this.props.object.type === value.name) {
                color = value.color
                
            }
        })

        return (
            <View style={{ flexDirection: 'row' }}>
                {/* <TouchableOpacity onPress={() => {
                    // let list = this.props.appointmentList.filter((value) => value.id != this.props.object.id)
                    // this.props.getAppointment(list)
                }}>
                    <Icon name="delete" containerStyle={{ marginRight: wp(2), marginTop: hp(2.5) }} color={color} ></Icon>
                </TouchableOpacity> */}
                <View
                    style={[styles.box, {flexDirection:'row'}]}>
                    <View>
                        <Text style={localStyles.titleText}>{this.props.object.title}</Text>
                        <Text style={localStyles.placeText}>{this.props.object.description}</Text>
                        {this.props.object.place ?
                            <Text style={localStyles.placeText}>{this.props.object.place}</Text>
                            : null
                        }
                    </View>
                    {
                        this.props.object.start && this.props.object.end ?
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={localStyles.timeText}>At {this.props.object.start}  {this.props.object.end}</Text>
                                <View style={[{ backgroundColor: color }, bullet]}></View>
                            </View>
                            : <View style={[{ backgroundColor: color }, bullet]}></View>
                    }
                </View>
                {/* <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("EditEvent"),
                        this.props.getEdit(this.props.object)
                }}>
                    <Icon name="edit" containerStyle={{ marginLeft: wp(2), marginTop: hp(2.5) }} color={color} ></Icon>
                </TouchableOpacity> */}
            </View >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        appointmentList: state.appointment.list,
        name: state.appointment.name,
        types: state.appointment.types
    }
}

export default connect(mapStateToProps, { getAppointment, getEdit })(Boxes)


//styles
const localStyles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        marginLeft: wp(3.5),
        marginTop: hp(1),
        fontSize: fontPerc(2)
    },
    placeText: {
        marginLeft: wp(3.5),
        marginTop: hp(0.2),
        fontSize: fontPerc(2)
    },
    timeText: {
        marginTop: hp(0.8),
        marginRight: wp(3.5)
    },
});