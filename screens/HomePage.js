import React from 'react'
import { Button, Icon, Divider } from 'react-native-elements';
import { View, Text, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc } from "react-native-responsive-fontsize";
import { connect } from 'react-redux';
import { getAppointment, getEdit } from '../redux/General/actions/AppointmentsActions';
import { DialogTitle } from 'react-native-popup-dialog';
import PopupDialog from 'react-native-popup-dialog';
import MapAppointments from './components/MapAppointments'
import moment from 'moment';
import { styles } from './style/GlobalStyles';
import Drawer from '../drawer.png'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    render() {
        let { objectTypes } = {}
        let total = 0
        this.props.types
            .filter((value) => value.name != "+")
            .map((value) => {
                objectTypes = {
                    ...objectTypes,
                    [value.name]: 0
                }
            })

        this.props.appointmentList
            .filter((value) => value.date == moment().format("YYYY-MM-DD"))
            .map((value) => {
                objectTypes[value.type] += 1,
                    total += 1
            })


        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                
                <View style={{ marginLeft: wp(5), marginTop: hp(3), marginRight: wp(6), }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#404040', fontSize: fontPerc(4.5), fontWeight: 'bold' }}>Hey, {this.props.name}</Text>
                            {/* <Text style={{ color: '#404040', fontSize: fontPerc(2.3) }}>You have {total} appointments today</Text> */}
                        </View>
                        <Button buttonStyle={styles.plusButton}
                            title='+'
                            onPress={() => { this.props.navigation.navigate("AddEvent") }}
                            titleStyle={{ fontSize: fontPerc(3) }}></Button>
                    </View>

                    <View style={{ alignItems: 'flex-end', marginTop: hp(3) }}>
                        <FlatList
                            data={this.props.types.filter((value) => (value.name != "+"))}
                            renderItem={(data) => (
                                <View
                                    style={[styles.box, {
                                        width: wp(40), height: hp(5.3), marginRight: wp(2),
                                    }]}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{ fontWeight: 'bold', marginLeft: wp(4), marginTop: hp(1.4), fontSize: fontPerc(2) }}>{data.item.name}</Text>
                                        {/* <Text style={{ marginLeft: wp(4), fontSize: fontPerc(2) }}>{objectTypes[data.item.name]} appointments</Text> */}

                                        <View style={{ backgroundColor: data.item.color, width: wp(3), height: wp(3), borderRadius: wp(3) / 2, marginTop: hp(1), marginRight: wp(0.8) }}></View>
                                    </View>
                                </View>
                            )}
                            numColumns={2}
                        />

                    </View>
                    <View style={{ marginTop: hp(3), }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp(2) }}>
                            <View>
                                <Text style={{ color: '#404040', fontSize: fontPerc(4), fontWeight: 'bold', marginLeft: wp(2), }}>Analysis</Text>
                            </View>
                            {/* <Button
                                onPress={() => this.props.navigation.navigate("OtherDays")}
                                buttonStyle={{ backgroundColor: '#39b6f6', marginRight: wp(2), borderRadius: 8 }}
                                title='Other days'></Button> */}
                        </View>
                        {/* <ScrollView >
                            <View style={{ marginBottom: hp(10) }}>
                                {this.props.appointmentList.filter((value) => value.date == moment().format("YYYY-MM-DD")).map((data) =>
                                    <MapAppointments object={data} {...this.props} />
                                )}
                            </View>
                        </ScrollView> */}

                        <View
                            style={[
                                styles.box,
                                {
                                    width: wp(86), height: hp(7),
                                }]}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={[styles.boxText, { fontWeight: 'bold' }]}>To do</Text>
                                <Icon
                                    containerStyle={styles.arrowIconContainer}
                                    name="chevron-right" type="font-awesome-5" color='white' size={fontPerc(5)}></Icon>
                            </View>
                        </View>

                        <View
                            style={[
                                styles.box,
                                {
                                    width: wp(86), height: hp(7),
                                }]}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={[styles.boxText, { fontWeight: 'bold' }]}>Projects</Text>
                                <Icon
                                    containerStyle={styles.arrowIconContainer}
                                    name="chevron-right" type="font-awesome-5" color='white' size={fontPerc(5)} ></Icon>
                            </View>
                        </View>

                        <Divider style={{ borderColor: '#4AA6FF', borderWidth: hp(0.2), width: wp(86), alignSelf: 'center' }} />

                        <View
                            style={[
                                styles.box,
                                {
                                    width: wp(86), height: hp(7),
                                }]}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={styles.boxText}>To dos for today</Text>
                                <Icon
                                    containerStyle={styles.arrowIconContainer}
                                    name="chevron-right" type="font-awesome-5" color='white' size={fontPerc(5)} ></Icon>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.box,
                                {
                                    width: wp(86), height: hp(7),
                                }]}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={styles.boxText}>Appointments for today</Text>
                                <Icon
                                    containerStyle={[styles.arrowIconContainer, { marginLeft: wp(0) }]}
                                    name="chevron-right" type="font-awesome-5" color='white' size={fontPerc(5)} ></Icon>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.box,
                                {
                                    width: wp(86), height: hp(7),
                                }]}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={styles.boxText}>Projects due today</Text>
                                <Icon
                                    containerStyle={[styles.arrowIconContainer, { marginLeft: wp(2) }]}
                                    name="chevron-right" type="font-awesome-5" color='white' size={fontPerc(5)} ></Icon>
                            </View>
                        </View>
                    </View>


                    {/* <PopupDialog
                        width={wp(50)}
                        height={hp(45)}
                        visible={this.state.visible}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                        dialogTitle={<DialogTitle title="DONE" />
                        }>

                        <View>
                            <Button title="Edit"
                                onPress={() => {
                                    this.props.navigation.navigate("EditEvent"),
                                        this.setState({ visible: false }),
                                        this.props.getEdit(this.state.object)
                                }}
                            ></Button>
                            <Button title="Delete"
                                onPress={() => {
                                    const list = this.props.appointmentList.filter((value) => value.id != this.state.object.id)
                                    this.props.getAppointment(list)
                                    this.setState({ visible: false })
                                }}
                                buttonStyle={{ backgroundColor: '#42AAFD', marginRight: wp(2), borderRadius: 8, height: hp(10) }}
                            >
                            </Button>
                        </View>

                    </PopupDialog> */}
                </View>
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

export default connect(mapStateToProps, { getAppointment, getEdit })(HomePage)