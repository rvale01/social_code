import React, { useState } from 'react'
import { Header, Input, Button, Badge } from 'react-native-elements';
import { View, Text, Image, Keyboard, FlatList, TouchableOpacity } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import { Icon } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { getAppointment } from '../redux/General/actions/AppointmentsActions';

//responsive
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

//pop up
import { DialogTitle } from 'react-native-popup-dialog';
import PopupDialog from 'react-native-popup-dialog';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ValidationComponent from 'react-native-form-validator';


class EditEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateShow: false,
            startShow: false,
            endShow: false,
            visible: false,
            type: '',
            disabled: true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.object, 'please work')
        if (prevProps.object !== this.props.object) {
            this.setState({
                object: this.props.object
            })
        }
    }

    componentDidMount = () => {
        // console.log
        this.setState({
            object: this.props.object
        })
    }

    handleSubmit = () => {
        let list = this.props.appointmentList.filter((value) => value.id != this.props.object.id)
        let appoint = this.state.object

        list = [
            ...list,
            appoint
        ]
        this.setState({
            visible: true,
            object: {}
        })
        this.props.getAppointment(list)
        this.props.navigation.navigate("HomePage")
    }


    handleText = (name, value) => {
        this.setState({
            object: {
                ...this.state.object,
                [name]: value
            }
        })
    }

    handleDateTime = (name, value, show) => {
        this.setState({
            object: {
                ...this.state.object,
                [name]: value
            },
            [show]: false
        })
    }

    handleButtonTypes = (types) => {
        if (types === this.state.object.type) {
            return (
                <Badge
                    status="success"
                    containerStyle={{ position: 'absolute', }}
                />
            )
        } else null
    }


    render() {
        if (this.state.object) {
            let disabled = true
            if (this.state.object.title && this.state.object.type && this.state.object.date && this.state.object.start != '') {
                disabled = false
            }
            return (
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                    style={{ marginLeft: wp(6), marginTop: hp(6.5) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("HomePage")}>
                            <Icon
                                color='#39b6f6'
                                containerStyle={{ alignSelf: 'flex-start' }}
                                name="chevron-left"
                                size={hp(6)}
                            />
                        </TouchableOpacity>
                        <Input
                            value={this.state.object.title}
                            placeholder="Add appointment"
                            containerStyle={{ height: wp(1.5), }}
                            inputStyle={{ fontSize: RFPercentage(4), }}
                            inputContainerStyle={{ borderBottomColor: 'transparent', }}
                            onChangeText={(title) => this.handleText("title", title)}
                        />
                    </View>

                    <View style={{ marginLeft: wp(8.5), marginTop: hp(6), }}>
                        <Text style={{ color: '#404040', fontSize: RFPercentage(2.5) }}>Date</Text>
                        {/* date */}
                        <TouchableOpacity
                            onPress={() => { this.setState({ dateShow: true }), Keyboard.dismiss }}
                        >
                            {this.state.object.date ?
                                <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2.5), marginTop: hp(1), }}>{this.state.object.date}</Text>
                                :
                                <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2.5), marginTop: hp(1) }}>Select date         ▼</Text>
                            }
                        </TouchableOpacity>

                        {/* start */}
                        <Text style={{ color: '#404040', marginTop: hp(3), fontSize: RFPercentage(2.5) }}>Start time</Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ startShow: true }), Keyboard.dismiss }}
                        >
                            {this.state.object.start ?
                                <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2.5), marginTop: hp(1) }}>{this.state.object.start}</Text>
                                :
                                <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2.5), marginTop: hp(1) }}>Select start time         ▼</Text>
                            }
                        </TouchableOpacity>

                        {/* end */}
                        <Text style={{ color: '#404040', marginTop: hp(3), fontSize: RFPercentage(2.5) }}>End time</Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ endShow: true }), Keyboard.dismiss }}
                        >
                            {this.state.object.end ?
                                <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2.5), marginTop: hp(1) }}>{this.state.object.end}</Text>
                                :
                                <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2.5), marginTop: hp(1) }}>Select end time         ▼</Text>
                            }
                        </TouchableOpacity>

                        <DateTimePicker
                            value={this.state.object.date}
                            mode='date'
                            isVisible={this.state.dateShow}
                            onConfirm={(date) => this.handleDateTime("date", moment(date).format("YYYY-MM-DD"), "dateShow")}
                            onCancel={() => { this.setState({ dateShow: false }) }}
                        />

                        <DateTimePicker
                            value={this.state.object.start}
                            mode='time'
                            isVisible={this.state.startShow}
                            onConfirm={(time) => this.handleDateTime("start", moment(time).format('HH:mm'), "startShow")}
                            onCancel={() => { this.setState({ startShow: false }) }}
                        />

                        <DateTimePicker
                            value={this.state.object.end}
                            mode='time'
                            isVisible={this.state.endShow}
                            onConfirm={(time) => this.handleDateTime("end", moment(time).format('HH:mm'), "endShow")}
                            onCancel={() => { this.setState({ endShow: false }) }}
                        />

                        <Text style={{ color: '#404040', marginTop: hp(4), fontSize: RFPercentage(2.5) }}>Type of appointment</Text>
                        <View style={{ marginTop: hp(2), }}>
                            <FlatList
                                data={this.props.types}
                                renderItem={(data) => (
                                    <View>
                                        <Button
                                            onPress={() => {
                                                data.item.name !== "+" ?
                                                    this.setState({ object: { ...this.state.object, type: data.item.name } })
                                                    : this.props.navigation.navigate("Events")
                                            }}
                                            buttonStyle=
                                            {{
                                                backgroundColor: data.item.color,
                                                marginRight: wp(3.5), marginBottom: hp(1), color: 'white', borderRadius: wp(2), padding: wp(2)
                                            }}
                                            titleStyle={{ fontSize: RFPercentage(2.5), }} title={data.item.name}></Button>
                                        {this.handleButtonTypes(data.item.name)}
                                    </View>
                                )

                                }
                                numColumns={3}
                            />
                        </View>
                        <Input
                            value={this.state.object.place}
                            placeholder="Add Place"
                            label="Place"
                            inputStyle={{ fontSize: RFPercentage(2.5), }}
                            labelStyle={{ color: '#404040', marginTop: hp(2), fontSize: RFPercentage(2.5), fontWeight: 'normal', marginLeft: -wp(1.8) }}
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginLeft: -wp(1.8) }}
                            onChangeText={(value) => this.handleText("place", value)}
                        />

                        <Input
                            value={this.state.object.description}
                            placeholder="Add Description"
                            label="Description"
                            inputStyle={{ fontSize: RFPercentage(2.5), }}
                            labelStyle={{ color: '#404040', marginTop: hp(2), fontSize: RFPercentage(2.5), fontWeight: 'normal', marginLeft: -wp(1.8) }}
                            inputContainerStyle={{ borderBottomColor: 'transparent', marginLeft: -wp(1.8) }}
                            onChangeText={(value) => this.handleText("description", value)}
                        />

                        <Button
                            buttonStyle={{ marginTop: hp(2.5), width: wp(70), borderRadius: wp(1), backgroundColor: '#39b6f6', padding: wp(2) }}
                            title="Edit"
                            titleStyle={{ fontWeight: 'bold', fontSize: RFPercentage(2.5) }}
                            onPress={() => this.handleSubmit()}
                            disabled={disabled}
                        >
                        </Button>

                    </View>
                    <PopupDialog
                        width={wp(50)}
                        height={hp(13)}
                        visible={this.state.visible}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                        style={
                            {
                                shadowColor: "#107CAF",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 6,
                                borderRadius: 7,
                                elevation: 7,
                            }
                        }
                    >

                        <Text style={{ textAlign: "center", marginTop: hp(2.5), fontSize: RFPercentage(2.9) }}>Appointment edited!</Text>

                    </PopupDialog>

                </KeyboardAwareScrollView>
            )
        } else {
            return (<View></View>)
        }
    }
}


const mapStateToProps = (state) => {
    return {
        appointmentList: state.appointment.list,
        types: state.appointment.types,
        object: state.appointment.edit
    }
}

export default connect(mapStateToProps, { getAppointment })(EditEvent)