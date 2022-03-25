import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RNBootSplash from 'react-native-bootsplash';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {useSelector} from 'react-redux';
import Admin from './../pages/Admin';
import Icon from 'react-native-vector-icons/AntDesign';
import Calculation from './../pages/Calculation';
import LoadingScreen from './LoadingScreen';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const user = useSelector(state => state.user);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {user.currentUser ? (
          <Drawer.Group>
            <Drawer.Screen
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
            <Drawer.Screen
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
            <Drawer.Screen
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
          </Drawer.Group>
        ) : (
          <Drawer.Group>
            <Drawer.Screen
              name="Login"
              component={user.isFetching ? LoadingScreen : Login}
              options={{
                tabBarStyle: {display: 'none'},
              }}
            />
          </Drawer.Group>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
