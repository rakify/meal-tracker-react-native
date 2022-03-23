import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

const FinalReport = ({admin}) => {
  const entries = useSelector(state => state.data.entries);
  const loading = useSelector(state => state.data.isFetching);
  const user = useSelector(state => state.user.currentUser);

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

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.title2}>
            <Text style={styles.title2Text}>Final Calculation</Text>
          </View>
          <ScrollView
            horizontal
            style={styles.container}
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
            <View key={j}>
              <View style={styles.title}>
                <Text style={styles.titleText}>
                  <Icon name="user" size={25} color="#d3c5c5" />
                  {i}
                </Text>
              </View>

              <ScrollView
                horizontal
                style={styles.container}
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
                      <Text style={styles.THtext}>Due(-) | Extra(+)</Text>
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
  title2: {
    alignSelf: 'center',
    margin: 7,
  },
  title: {
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  title2Text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 17,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  container: {
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  TBODY: {},
  TR: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  TH: {
    width: 100,
    height: 50,
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
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
  },
  TH2: {
    width: 150,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#697e94',
    borderLeftWidth: 1,
    borderColor: '#f1f8ff',
  },
  TD2: {
    width: 150,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
  },
  text: {margin: 6},
});

export default FinalReport;
