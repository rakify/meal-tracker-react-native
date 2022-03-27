import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {useSelector} from 'react-redux';
import Admin from './../pages/Admin';
import Icon from 'react-native-vector-icons/AntDesign';
import Calculation from './../pages/Calculation';
import LoadingScreen from './LoadingScreen';
import Register from '../pages/Register';
import UpdateUser from '../pages/UpdateUser';
import UpdateKey from './../pages/UpdateKey';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const user = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {user.currentUser ? (
          <Tab.Group>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="home"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Calculation"
              component={Calculation}
              options={{
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="calculator"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Admin"
              component={Admin}
              options={{
                tabBarLabel: 'Manage',
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="form"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="UpdateUser"
              component={UpdateUser}
              options={{
                tabBarLabel: 'Update User',
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="form"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="UpdateKey"
              component={UpdateKey}
              options={{
                tabBarLabel: 'Update Key',
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="form"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
          </Tab.Group>
        ) : (
          <Tab.Group>
            <Tab.Screen
              name="Login"
              component={user.isFetching ? LoadingScreen : Login}
              options={{
                tabBarLabel: 'Login',
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="login"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Register"
              component={user.isFetching ? LoadingScreen : Register}
              options={{
                tabBarLabel: 'Register',
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="enter"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
          </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
