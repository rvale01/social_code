import React from 'react'
import { Header, Input, Button, Icon } from 'react-native-elements';
import { View, Text, Image, Keyboard, TouchableOpacity, FlatList } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler';
import { ColorPicker } from 'react-native-color-picker'

//redux
import { connect } from 'react-redux';
import { getTypesEvent } from '../redux/General/actions/AppointmentsActions';

//responsive
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc, RFValue } from "react-native-responsive-fontsize";

//pop up
import Dialog, { DialogTitle } from 'react-native-popup-dialog';
import PopupDialog from 'react-native-popup-dialog';


class EventsTypes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            colorTypes: [
                "#42AAFD", "#01BACC", "#EE2375",
                '#8539F9', '#DEDEE5', "#577590",
                '#F08A4B', '#CC5803', '#813405',
                '#8F250C'
            ],
            color: ''
        }
    }

    handleNewType = () => {
        this.setState({
            visible: false
        })
        let type = {
            'name': this.state.name,
            "color": this.state.color

        }
        let typeList = [type, ...this.props.types]
        this.props.getTypesEvent(typeList)
    }

    handleReturnColor = (value) => {
        if (value.item != this.state.color) {
            return (
                <TouchableOpacity
                    onPress={() => { this.setState({ color: value.item }) }}
                    style={{ borderColor: 'black', backgroundColor: value.item, height: hp(6), width: wp(11), marginRight: wp(2), marginBottom: hp(2) }}
                >

                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{ borderColor: 'black', backgroundColor: value.item, height: hp(6), width: wp(11), marginRight: wp(2), marginBottom: hp(2) }}
                >
                    <Icon name="done" containerStyle={{ marginTop: 'auto', marginBottom: 'auto' }} color="white" size={fontPerc(4)}></Icon>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <ScrollView style={{ marginLeft: wp(5), marginTop: hp(7), }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("HomePage")}>
                        <Icon
                            color='#39b6f6'
                            containerStyle={{ alignSelf: 'flex-start' }}
                            name="chevron-left"
                            size={hp(6)}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: fontPerc(3), fontWeight: 'bold', }} >All events</Text>
                    <Button buttonStyle={{
                        backgroundColor: '#39b6f6', paddingTop: hp(0.5),
                        paddingBottom: hp(1), paddingLeft: wp(3),
                        paddingRight: wp(3), marginRight: wp(6),
                        borderRadius: wp(2),
                    }}
                        title='+'
                        onPress={() => { this.setState({ visible: true }) }}
                        titleStyle={{ fontSize: fontPerc(3) }}></Button>
                </View>
                <View style={{ alignItems: 'flex-end', marginTop: hp(3), marginRight: wp(6) }}>
                    {this.props.types
                        .filter((value) => value.name != "+")
                        .map((value) => {
                            return (
                                <View style={{ flexDirection: 'row', marginBottom: hp(2), marginTop: hp(1) }}>
                                    <TouchableOpacity onPress={() => {
                                        removeValue = this.props.types.filter((data) => data.name != value.name),
                                            this.props.getTypesEvent(removeValue)
                                    }}>
                                        <Icon name="delete" containerStyle={{ marginRight: wp(2), marginTop: hp(1.5) }} color={value.color} ></Icon>
                                    </TouchableOpacity>
                                    <View style={{
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
                                        width: wp(84), height: hp(7),
                                    }}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', marginLeft: wp(3.5), marginTop: hp(1), fontSize: fontPerc(2) }}>{value.name}</Text>
                                            <Text style={{ marginLeft: wp(3.5), marginTop: hp(0.2), fontSize: fontPerc(2) }}>1 appointment</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                                            {/* <Text style={{ marginTop: hp(0.8), marginRight: wp(3.5) }}>{`${data.start} - ${data.end}`}</Text> */}

                                            <View style={{ backgroundColor: value.color, width: wp(3), height: wp(3), borderRadius: wp(3) / 2, marginTop: hp(1), marginRight: wp(0.8) }}></View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                </View>

                <PopupDialog
                    width={wp(70)}
                    height={hp(55)}
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    dialogTitle={<DialogTitle title="ADD NEW EVENT" />
                    }>
                    <View style={{ marginLeft: wp(2), marginTop: hp(2) }}>
                        <Text style={{ color: '#404040', fontSize: fontPerc(2.5), marginLeft: wp(2) }}>Name type</Text>

                        <Input
                            value={this.state.typeName}
                            placeholder="Type Name"
                            containerStyle={{ height: wp(1.5), }}
                            inputStyle={{ fontSize: fontPerc(2.5), }}
                            inputContainerStyle={{ borderBottomColor: 'transparent', }}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <View style={{ marginTop: hp(6), marginLeft: wp(2) }}>
                            <Text style={{ color: '#404040', fontSize: fontPerc(2.5), marginBottom: hp(2) }}>Choose colour</Text>
                            <FlatList
                                data={this.state.colorTypes}
                                renderItem={(value) => this.handleReturnColor(value)}

                                numColumns={4}
                            />
                        </View>

                        <Button title="Add new type" buttonStyle={{ marginRight: wp(2), backgroundColor: '#39b6f6' }} onPress={() => { this.handleNewType() }}></Button>
                    </View>
                </PopupDialog>

            </ScrollView >

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

export default connect(mapStateToProps, { getTypesEvent })(EventsTypes)