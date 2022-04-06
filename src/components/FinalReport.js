import Icon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../redux/apiCalls';
import Button from '../utils/Button';

const FinalReport = () => {
  const dispatch = useDispatch();
  const entries = useSelector(state => state.data.entries);
  const loading = useSelector(state => state.data.isFetching);
  const user = useSelector(state => state.user.currentUser);  

  const[makeDelete, setMakeDelete] = useState('');
  const [key, setKey] = useState('');

  let allMeals = 0,
    allSpent = 0,
    allReserved = 0;

  // set initialMeals per member to 0
  let initialMeals = {};
  for (let i = 0; i < user.members.length; i++) {
    initialMeals[user.members[i]] = 0;
  }

  // set initialReserved per member to 0
  let initialReserved = {};
  for (let i = 0; i < user.members.length; i++) {
    initialReserved[user.members[i]] = 0;
  }

  for (const i in entries) {
    const by = entries[i].by;
    initialReserved[by] += entries[i].reserved;
    allMeals += entries[i].totalMeals;
    allSpent += entries[i].spent;
    allReserved += entries[i].reserved;
    for (let j = 0; j < user.members.length; j++) {
      initialMeals[user.members[j]] += entries[i].meals[user.members[j]];
      if (isNaN(initialMeals[user.members[j]]))
        initialMeals[user.members[j]] = 0;
    }
  }
  let mealRate = allSpent / allMeals;

  const deleteMember = id => {
    let members = [...user.members];
    members.splice(id, 1);
    updateUser(user._id, {members: members, admin_key: key}, dispatch);
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              flexDirection: 'column',
            }}>
            <View style={styles.TBODY}>
              <View style={styles.TR}>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Total Meals</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Total Spent</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Total Reserve</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Remaining</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Meal Rate</Text>
                </View>
              </View>
              <View style={styles.TR}>
                <View style={styles.TD}>
                  <Text>{allMeals}</Text>
                </View>
                <View style={styles.TD}>
                  <Text>{allSpent.toFixed(2)}</Text>
                </View>
                <View style={styles.TD}>
                  <Text>{allReserved.toFixed(2)}</Text>
                </View>
                <View style={styles.TD}>
                  <Text>{(allReserved - allSpent).toFixed(2)}</Text>
                </View>
                <View style={styles.TD}>
                  <Text>{isNaN(mealRate) ? '0.00' : mealRate.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {user.members.map((i, j) => (
            <View key={j} style={styles.container2}>
              <View style={styles.title}>
                <Text style={styles.titleText}>
                  <Icon name="user" size={15} color="#d3c5c5" />
                  {i}
                </Text>
              </View>

              <ScrollView
                horizontal
                style={styles.container2}
                contentContainerStyle={{
                  flexDirection: 'column',
                }}>
                <View style={styles.TBODY}>
                  <View style={styles.TR}>
                    <View style={styles.TH2}>
                      <Text style={styles.THtext}>Meals</Text>
                    </View>
                    <View style={styles.TH2}>
                      <Text style={styles.THtext}>Reserved</Text>
                    </View>
                    <View style={styles.TH2}>
                      <Text style={styles.THtext}>Remaining</Text>
                    </View>
                    <View style={styles.TH2}>
                      <Text style={styles.THtext}>Action</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.TBODY}>
                  <View style={styles.TR}>
                    <View style={styles.TD2}>
                      <Text style={styles.TDtext}>{initialMeals[i]}</Text>
                    </View>
                    <View style={styles.TD2}>
                      <Text style={styles.TDtext}>
                        {initialReserved[i].toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.TD2}>
                      <Text style={styles.TDtext}>
                        {isNaN(initialReserved[i] - initialMeals[i] * mealRate)
                          ? '0.00'
                          : (
                              initialReserved[i] -
                              initialMeals[i] * mealRate
                            ).toFixed(2)}
                      </Text>
                    </View>
                    {initialMeals[i] === 0 && initialReserved[i] === 0 && makeDelete ?
                     <View style={styles.TD2}>
                        <View style={styles.inputFieldRow}>
                          <TextInput
                            style={styles.input}
                            placeholder="Key"
                            onChangeText={value => setKey(value)}
                            placeholderTextColor="green"
                          />
                          <Button
                            style={styles.button}
                            title={'✘'}
                            color="#1eb900"
                            onPressFunction={deleteMember(j)}
                          />
                        </View>
                      </View>
                     : (
                      <View style={styles.TD2}>
                        <Text>VIP</Text>
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingTop: 10,
    flex:1,
  },
  container2: {
    //margin: 10,
  },
  title: {
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  titleText: {
    color: 'black',
    fontSize: 17,
  },
  TBODY: {},
  TR: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  TH: {
    width: 100,
    height: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2263a5',
    borderLeftWidth: 1,
    borderColor: '#f1f8ff',
  },
  THtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  TD: {
    width: 100,
    height: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
  },
  TH2: {
    width: 100,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#697e94',
    borderLeftWidth: 1,
    borderColor: '#f1f8ff',
  },
  TD2: {
    width: 100,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f8ff',
  },
  input: {
    fontSize: 15,
    width: 55,
    height: 35,
    marginTop: 2.5,
    marginBottom: 2.5,
    paddingLeft: 10,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: '#555',
  },
  button: {
    fontSize: 15,
    width: 30,
    height: 35,
    marginTop: 2.5,
    marginBottom: 2.5,
    backgroundColor: 'red',
  },
  inputFieldRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {margin: 6},
});

export default FinalReport;
