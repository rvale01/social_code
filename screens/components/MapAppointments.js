import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc } from "react-native-responsive-fontsize";
import { Header, Button, Icon } from 'react-native-elements';
import { DialogTitle } from 'react-native-popup-dialog';
import PopupDialog from 'react-native-popup-dialog';
//redux
import { connect } from 'react-redux';
import { getAppointment, getEdit } from '../../redux/General/actions/AppointmentsActions';

//styles
import { bullet, buttons } from '../style/GlobalStyles'



class MapAppointments extends Component {
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
                <TouchableOpacity onPress={() => {
                    let list = this.props.appointmentList.filter((value) => value.id != this.props.object.id)
                    this.props.getAppointment(list)
                }}>
                    <Icon name="delete" containerStyle={{ marginRight: wp(2), marginTop: hp(2.5) }} color={color} ></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.container}>
                    <View>
                        <Text style={styles.titleText}>{this.props.object.title}</Text>
                        <Text style={styles.placeText}>{this.props.object.place}, {this.props.object.description}</Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <Text style={styles.timeText}>At {this.props.object.start}  {this.props.object.end}</Text>
                        <View style={[{ backgroundColor: color }, bullet]}></View>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("EditEvent"),
                        this.props.getEdit(this.props.object)
                }}>
                    <Icon name="edit" containerStyle={{ marginLeft: wp(2), marginTop: hp(2.5) }} color={color} ></Icon>
                </TouchableOpacity>
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

export default connect(mapStateToProps, { getAppointment, getEdit })(MapAppointments)


//styles
const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        shadowColor: "#107CAF",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.20,
        shadowRadius: 6,
        borderRadius: 7,
        elevation: 7,
        width: wp(84),
        height: hp(7),
        marginBottom: hp(2),
        marginTop: hp(1)
    }
});