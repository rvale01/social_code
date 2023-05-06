import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, Text } from 'react-native'
import FirstPage from './Welcome/FirstPage'
import NoRegistration from './Welcome/NoRegistration'

//redux
import { connect } from 'react-redux';
import { getAppointment } from '../redux/General/actions/AppointmentsActions'

import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BottomBar from './BottomBar'

//screens
import HomePage from './HomePage'
import AddEvent from './AddEvent'
import EventsTypes from './EventsTypes'
import OtherDays from './OtherDays'
import EditEvent from './EditEvent'

const CustomDrawer = (props) => (
    <SafeAreaView>
        <DrawerItems {...props} />
    </SafeAreaView>
);


const LoginStack = createDrawerNavigator(
    {
        'FirstPage': {
            screen: FirstPage,
            navigationOptions: {
                drawerLockMode: "locked-closed",
                disableGestures: true
            }
        },
        'NoRegistration': {
            screen: NoRegistration,
            navigationOptions: {
                drawerLockMode: "locked-closed",
                disableGestures: true
            }
        },
    }, {
    contentComponent: props => <CustomDrawer {...props} />,

})
const LoginContainer = createAppContainer(LoginStack);

// const AppContainer = createAppContainer(RootStack);

const Screen = (props) => {
    if (props.name == "") {
        return (<LoginContainer {...props} />)
    } else {
        return (<BottomBar />)
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.appointment.name
    }
}

export default connect(mapStateToProps, { getAppointment })(Screen)