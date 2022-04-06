import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteEntry} from '../redux/apiCalls';
import Button from './../utils/Button';

const DataTable = ({month}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const entries = useSelector(state => state.data.entries);
  const [key, setKey] = useState('');
  const d = new Date();
  const date = d.getDate();

  const deleteHandler = id => {
    deleteEntry(id, key, dispatch).then(res => Alert.alert('Result', res));
    setKey('');
  };
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
              <View style={styles.TH}>
                <Text style={styles.THtext}>Action</Text>
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
                {date === item.date || date - 1 === item.date ? (
                  <View style={styles.TD}>
                    <View style={styles.inputFieldRow}>
                      <TextInput
                        style={styles.input}
                        placeholder="Key"
                        onChangeText={value => setKey(value)}
                        placeholderTextColor="green"
                      />
                      <Button
                        style={styles.button}
                        title={'🗑️'}
                        color="#1eb900"
                        onPressFunction={() => deleteHandler(item._id)}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.TD}>
                    <Text></Text>
                  </View>
                )}
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
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  container: {
    backgroundColor: '#fff',
    paddingBottom: 100,
    flex:1,
  },
  TBODY: {},
  TR: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  TH: {
    width: 100,
    height: 30,
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
    borderLeftWidth: 1,
    borderColor: '#ffffff',
    width: 100,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
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

export default DataTable;
