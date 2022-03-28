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
import Register from '../pages/Register';
import UpdateUser from '../pages/UpdateUser';
import UpdateKey from './../pages/UpdateKey';

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
          headerStyle: {
            backgroundColor: user.currentUser ? '#87ceeb' : '#f8f8f8',
          },
        }}>
        {user.currentUser ? (
          <Drawer.Group>
            <Drawer.Screen
              name="Home"
              component={Home}
              options={{
                drawerIcon: ({focused, color, size}) => (
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
                drawerIcon: ({focused, color, size}) => (
                  <Icon
                    name="calculator"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Manager"
              component={Admin}
              options={{
                drawerIcon: ({focused, color, size}) => (
                  <Icon
                    name="form"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="UpdateUser"
              component={UpdateUser}
              options={{
                drawerIcon: ({focused, color, size}) => (
                  <Icon
                    name="form"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="UpdateKey"
              component={UpdateKey}
              options={{
                drawerIcon: ({focused, color, size}) => (
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
                DrawerIcon: ({focused, color, size}) => (
                  <Icon
                    name="login"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Register"
              component={user.isFetching ? LoadingScreen : Register}
              options={{
                DrawerIcon: ({focused, color, size}) => (
                  <Icon
                    name="enter"
                    color={focused ? '#03272e' : 'black'}
                    size={focused ? 20 : 15}
                  />
                ),
              }}
            />
          </Drawer.Group>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
