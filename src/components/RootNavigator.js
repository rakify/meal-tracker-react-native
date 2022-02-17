import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {useSelector} from 'react-redux';
import Admin from './../pages/Admin';
import Icon from 'react-native-vector-icons/AntDesign';

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
                tabBarLabel: 'Home',
                tabBarIcon: ({focused, color, size}) => (
                  <Icon
                    name="home"
                    color={focused ? 'blue' : 'black'}
                    size={focused ? 25 : 15}
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
                    color={focused ? 'blue' : 'black'}
                    size={focused ? 25 : 15}
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
                tabBarLabel: 'Login',
                tabBarIcon: ({color, size}) => (
                  <Icon name="login" color="green" size={25} />
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
