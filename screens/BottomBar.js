import React from 'react';
import { Icon } from 'react-native-elements'
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import Drawer from '../drawer.png'
//screens
import HomePage from './HomePage'

// appointment pages
import AddEvent from './AddEvent'
import EventsTypes from './EventsTypes'
import OtherDays from './OtherDays'
import EditEvent from './EditEvent'

// note page
import Notes from './Notes/Notes'
import AddNotes from './Notes/AddNote'
import EditNotes from './Notes/EditNotes'

const Tab = createBottomTabNavigator();

const NotesStack = createStackNavigator();
const EventsStack = createStackNavigator();
const ToDoStack = createStackNavigator();
const ProjectsStack = createStackNavigator();

function NotesMenu() {
  return (
    <NotesStack.Navigator>
      <NotesStack.Screen name="Notes" component={Notes} options={{headerShown: false}}/>
      <NotesStack.Screen name="AddNotes" component={AddNotes} options={{headerShown: false}}/>
      <NotesStack.Screen name="EditNotes" component={EditNotes} options={{headerShown: false}}/>
    </NotesStack.Navigator>
  );
}
function EventMenu() {
    return (
      <EventsStack.Navigator>
        <EventsStack.Screen name="EditEvent" component={EditEvent} options={{headerShown: false}}/>
        <EventsStack.Screen name="OtherDays" component={OtherDays} options={{headerShown: false}}/>
        <EventsStack.Screen name="EventsTypes" component={EventsTypes} options={{headerShown: false}}/>
        <EventsStack.Screen name="AddEvent" component={AddEvent} options={{headerShown: false}}/>
      </EventsStack.Navigator>
    );
  }
//   function TodoMenu() {
//     return (
//       <ToDoStack.Navigator>
//         <ToDoStack.Screen name="Notes" component={Notes} />
//         <ToDoStack.Screen name="AddNotes" component={AddNotes} />
//       </ToDoStack.Navigator>
//     );
//   }

//   function ProjectsMenu() {
//     return (
//       <ProjectsStack.Navigator>
//         <ProjectsStack.Screen name="Notes" component={Notes} />
//         <ProjectsStack.Screen name="AddNotes" component={AddNotes} />
//       </ProjectsStack.Navigator>
//     );
//   }

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', height: 50 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = route.name;
                const icon = options.tabBarIcon;

                const isFocused = state.index === index;
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                });
                const onPress = () => {
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };


                if (!isFocused && !event.defaultPrevented) {
                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={{ flex: 1 }}>
                                <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                }
                else {
                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={{ flex: 1 }}>
                                <View
                                    style={{
                                        backgroundColor: '#4AA6FF',
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                        textAlign: 'center',
                                        marginTop: -20
                                    }}>
                                    <Icon name={options.tabBarIcon} color="white" size={30} iconStyle={{ marginTop: 8 }}></Icon>
                                </View>
                            </TouchableOpacity>
                        );
                }
            })}
        </View>
    );
}
// headerMode: none
export default function BottomBar() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer> 
                    <Tab.Navigator
                        tabBar={(props) => <MyTabBar {...props} />}
                    >
                        <Tab.Screen name="HomePage" component={HomePage} 
                         options={{
                            tabBarIcon: "home"
                        }} />
                        <Tab.Screen name="EventMenu" component={EventMenu} options={{
                            tabBarIcon: "home"
                        }} />
                        <Tab.Screen name="NotesMenu" component={NotesMenu} options={{
                            tabBarIcon: "home",
                            headerShown: false
                        }} />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}