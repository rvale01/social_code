import React from 'react'
import { Header, Input, Button, Badge, Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, Image, Keyboard, FlatList } from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import BackLink from '../components/BackLink'
//redux
import { connect } from 'react-redux';
import { setNote } from '../../redux/General/actions/notesAction';

//responsive
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFPercentage as fontPerc, RFValue } from "react-native-responsive-fontsize";

//pop up
import { DialogTitle } from 'react-native-popup-dialog';
import PopupDialog from 'react-native-popup-dialog';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../style/GlobalStyles';


class EditNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "",
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
        let list = this.props.noteList.filter((value)=>value.id === this.state.object.id)
        let note = {
            title: this.state.title,
            description: this.state.description,
            id: moment().format('YYYYMMDDhhmmss')
        }
        this.setState({
            title: '',
            description: '',
            type: '',
            id: ''
        })
        list = [
            ...list,
            note
        ]
        this.props.setNote(list)
        this.props.navigation.navigate("Notes")
    }

    handleText = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleButtonTypes = (types) => {
        if (types === this.state.type) {
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
            if (this.state.title && this.state.type && this.state.date && this.state.start != '') {
                disabled = false
            }
            return (
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true} style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{ marginLeft: wp(4), marginTop: hp(1.5), marginRight: wp(4) }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Notes")}>
                            <BackLink text="Notes" />
                        </TouchableOpacity>

                        <View style={{ marginTop: hp(2), }}>
                            <Input
                                value={this.state.title}
                                placeholder="Title"
                                containerStyle={styles.inputContainer}
                                inputStyle={{ fontSize: fontPerc(3), }}
                                inputContainerStyle={{ borderBottomColor: 'transparent', }}
                                onChangeText={(title) => this.handleText("title", title)}
                            />
                            <Input
                                value={this.state.description}
                                placeholder="Description"
                                containerStyle={[styles.inputContainer, { height: hp(20) }]}
                                inputStyle={{ fontSize: fontPerc(3), }}
                                inputContainerStyle={{ borderBottomColor: 'transparent', }}
                                onChangeText={(description) => this.handleText("description", description)}
                            />
                            {/* box */}
                            <View style={{ marginTop: hp(2), }}>
                                <FlatList
                                    style={{ marginTop: hp(3), marginLeft: wp(2) }}
                                    data={this.props.types}
                                    renderItem={(data) => (
                                        <View>
                                            <Button
                                                onPress={() => {
                                                    data.item.name !== "+" ?
                                                        this.setState({ type: data.item.name })
                                                        : this.props.navigation.navigate("EventsTypes")
                                                }}
                                                buttonStyle=
                                                {{
                                                    backgroundColor: data.item.color,
                                                    marginRight: wp(3.5), marginBottom: hp(1), borderRadius: wp(2), padding: wp(2)
                                                }}
                                                titleStyle={{ fontSize: fontPerc(2.5), }} title={data.item.name}></Button>
                                            {this.handleButtonTypes(data.item.name)}
                                        </View>
                                    )

                                    }
                                    numColumns={4}
                                />
                            </View>


                            <TouchableOpacity
                                // disabled={disabled}
                                style={[styles.button, { width: wp(70), paddingBottom: hp(1.5), paddingTop: hp(1), marginTop: hp(2) }]}
                                onPress={() => this.handleSubmit()}
                                disabledStyle={{ marginTop: hp(2.5), width: wp(70), borderRadius: wp(1), backgroundColor: '#62c2ea', padding: wp(2) }}
                                disabledTitleStyle={{ color: 'white' }}
                            >
                                <Text style={[styles.buttonTitle, { fontSize: fontPerc(3), textAlign: 'center' }]}>Add new note</Text>
                            </TouchableOpacity>

                        </View>
                        {/* <PopupDialog
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

                        <Text style={{ textAlign: "center", marginTop: hp(2.5), fontSize: fontPerc(2.9) }}>New appointment added!</Text>

                    </PopupDialog> */}
                    </View>
                </KeyboardAwareScrollView>
            )
        }else{return(<View></View>)}
    }
}


const mapStateToProps = (state) => {
    return {
        types: state.appointment.types,
        note: state.notes.note,
        object: state.appointment.object
    }
}

export default connect(mapStateToProps, { setNote })(EditNotes)