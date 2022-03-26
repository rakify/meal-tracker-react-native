import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {logout} from '../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';

const Header = ({from}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const Month = [];
  Month[0] = 'January';
  Month[1] = 'February';
  Month[2] = 'March';
  Month[3] = 'April';
  Month[4] = 'May';
  Month[5] = 'June';
  Month[6] = 'July';
  Month[7] = 'August';
  Month[8] = 'September';
  Month[9] = 'October';
  Month[10] = 'November';
  Month[11] = 'December';
  const d = new Date();
  let month = Month[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  const clearAll = () => {
    logout(dispatch);
  };

  return (
    <>
      {!user && (
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{uri: 'https://i.ibb.co/K78YHkj/meal-tracker.png'}}
          />
        </View>
      )}
      {user && (
        <>
          <View style={styles.subbody}>
            <View>
              <Text>Today is {month + ' ' + date + ', ' + year}</Text>
            </View>
            <View style={styles.right}>
              <Text>{user?.username} </Text>
              <Pressable onPress={clearAll}>
                <Text style={{color: 'red'}}>(Logout)</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: 298,
    height: 218,
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: '400',
  },
  subbody: {
    backgroundColor: '#87ceeb',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Header;
