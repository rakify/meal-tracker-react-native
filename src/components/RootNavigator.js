import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {useSelector} from 'react-redux';
import Admin from './../pages/Admin';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const user = useSelector(state => state.user.currentUser);
  console.log(user);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Admin" component={Admin} />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={Login} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
