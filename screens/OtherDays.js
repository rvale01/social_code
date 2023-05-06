import React from 'react'
import { View, FlatList,TouchableOpacity, Text } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc, RFValue } from "react-native-responsive-fontsize";
import moment from 'moment'
import MapAppointments from './components/MapAppointments'

//redux
import { connect } from 'react-redux';
import { getAppointment } from '../redux/General/actions/AppointmentsActions';

class OtherDays extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shownDay: moment().format("YYYY-MM-DD"),
            list: [this.props.list.map((value) => {
                return (
                    value.date
                )
            })],
            day: ''
        }

    }
    getMarkedDates = () => {
        const marked = {};
        this.props.list.forEach((item) => {
            marked[item.date] = { marked: true }
        });
        marked[this.state.shownDay] = {
            selected: true,
            disableTouchEvent: true,

        }
        return marked;
    }
    render() {
        return (
            <View style={{ marginLeft: wp(5), marginTop: hp(4), marginRight: wp(6), }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("HomePage")} style={{flexDirection:'row'}}>
                    <Icon
                        color='#39b6f6'
                        containerStyle={{ alignSelf: 'flex-start' }}
                        name="chevron-left"
                        size={hp(6)}
                    />
                    <Text style={{marginTop:hp(1), fontSize:fontPerc(3)}}>HomePage</Text>
                </TouchableOpacity>
                <View style={{marginTOp:hp(5)}}>
                    <Calendar
                        hideExtraDays={true}
                        onDayPress={(day) => this.setState({
                            shownDay: day.dateString,
                        })}
                        markedDates={this.getMarkedDates()}
                    />
                </View>

                <FlatList
                    data={this.props.list.filter((value) => value.date == this.state.shownDay)}
                    renderItem={(data) =>
                        <MapAppointments object={data.item} {...this.props} />

                    }
                    numColumns={1}
                />

            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        list: state.appointment.list
    }
}

export default connect(mapStateToProps, { getAppointment })(OtherDays)