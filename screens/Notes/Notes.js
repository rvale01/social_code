import React from 'react'
import { Header, Input, Button, Badge, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Image, Keyboard, FlatList } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import { styles } from '../style/GlobalStyles'
//redux
import { connect } from 'react-redux';
import { setObject } from '../../redux/General/actions/AppointmentsActions';
import Boxes from '../components/Boxes'
//responsive
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc, RFValue } from "react-native-responsive-fontsize";

class Notes extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1, }}>
                <View style={{ marginLeft: wp(5), marginTop: hp(3), marginRight: wp(6), }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.titleScreens}>{this.props.name},</Text>
                            <Text style={styles.titleScreens}>Your notes</Text>
                        </View>
                        <Button buttonStyle={styles.plusButton}
                            title='+'
                            onPress={() => { this.props.navigation.navigate("AddNotes") }}
                            titleStyle={{ fontSize: fontPerc(3) }}></Button>
                    </View>

                    {this.props.note && this.props.note.map((value) => {
                        return (
                            <TouchableOpacity
                                style={{ width: wp(90) }}
                                onLongPress={() => {
                                    this.props.setObject(value),
                                    this.props.navigation.navigate("EditNotes")
                                }
                                }>
                                <Boxes object={value} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.appointment.name,
        note: state.notes.note
    }
}

export default connect(mapStateToProps, { setObject })(Notes)