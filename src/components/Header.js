import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {logout} from '../redux/apiCalls';
import {useSelector} from 'react-redux';

const Header = ({from}) => {
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

  const clearAll = async () => {
    logout();
  };

  return (
    <>
      {from === 'login' && (
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{uri: 'https://i.ibb.co/GngZqJH/Meal-Tracker.png'}}
          />
          <Text style={styles.text}>Mess Meal Tracker</Text>
        </View>
      )}
      {user && (
        <>
          <View style={styles.user}>
            <Text style={styles.text}>Mess Meal Tracker</Text>
          </View>
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
    backgroundColor: '#8fa382',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    alignItems: 'center',
  },
  user: {
    backgroundColor: '#8fa382',
    height: 70,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: '#71cad0',
    fontWeight: '600',
    margin: 20,
  },
  subbody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Header;