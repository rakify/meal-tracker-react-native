import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

const DataTable = ({month}) => {
  const user = useSelector(state => state.user.currentUser);
  const entries = useSelector(state => state.data.entries);

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>{month} Report</Text>
      </View>
      <ScrollView>
        <ScrollView
          horizontal
          style={styles.container}
          contentContainerStyle={{
            flexDirection: 'column',
          }}>
          <View style={styles.TBODY}>
            <View style={styles.TR}>
              <View style={styles.TH}>
                <Text style={styles.THtext}>Date</Text>
              </View>
              <View style={styles.TH}>
                <Text style={styles.THtext}>Spent</Text>
              </View>
              <View style={styles.TH}>
                <Text style={styles.THtext}>Reserved</Text>
              </View>
              <View style={styles.TH}>
                <Text style={styles.THtext}>By</Text>
              </View>
              {user.members.map(i => (
                <View key={i} style={styles.TH}>
                  <Text style={styles.THtext}>{i}</Text>
                </View>
              ))}
              <View style={styles.TH}>
                <Text style={styles.THtext}>Daily Total</Text>
              </View>
            </View>
          </View>

          {entries.map((item, j) => (
            <View key={item._id} style={styles.TBODY}>
              <View style={styles.TR}>
                <View style={styles.TD}>
                  <Text>{item.date}</Text>
                </View>
                <View style={styles.TD}>
                  <Text>{item.spent.toFixed(2)}</Text>
                </View>
                <View style={styles.TD}>
                  <Text>{item.reserved.toFixed(2)}</Text>
                </View>
                <View style={styles.TD}>
                  <Text>{item.by}</Text>
                </View>
                {user.members.map(i => (
                  <View key={item._id + i} style={styles.TD}>
                    <Text>{item.meals[`${i}`] ? item.meals[`${i}`] : 0}</Text>
                  </View>
                ))}
                <View style={styles.TD}>
                  <Text>{item?.totalMeals}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    borderColor: '#2263a5',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: 5,
    backgroundColor: 'white',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    backgroundColor: '#fff',
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
  text: {margin: 6},
});

export default DataTable;
