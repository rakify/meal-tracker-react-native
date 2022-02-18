import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {useSelector} from 'react-redux';
import Admin from './../pages/Admin';
import Icon from 'react-native-vector-icons/AntDesign';
import Calculation from './../pages/Calculation';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Tab.Group>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="home"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 30 : 15}
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
                    size={focused ? 30 : 15}
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
                    size={focused ? 30 : 15}
                  />
                ),
              }}
            />
          </Tab.Group>
        ) : (
          <Tab.Group>
            <Tab.Screen
              name="Login"
              component={Login}
              options={{
                tabBarStyle: {display: 'none'},
              }}
            />
          </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
