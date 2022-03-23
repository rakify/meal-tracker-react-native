import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addEntry} from '../redux/apiCalls';
import {updateKey} from './../redux/apiCalls';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from './../utils/Button';

const EntryForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);

  const d = new Date();
  let date = d.getDate();

  const [inputs, setInputs] = useState({
    user: user.username,
    spent: 0,
    reserved: 0,
    by: '',
    date: date,
    admin_key: '',
  });
  const [prompt, setPrompt] = useState(false);
  const [keyResponse, setKeyResponse] = useState('');
  const [error, setError] = useState({}); // after submitting show result
  const [confirm, setConfirm] = useState('Confirm'); // after confirming key show loading animation
  const [loading, setLoading] = useState(false); // after submitting show loading animation
  const [submit, setSubmit] = useState('Submit');
  const [modalOpen, setModalOpen] = useState(false);
  const [showMeals, setShowMeals] = useState(false);
  const [showBy, setShowBy] = useState(false);
  //set initialMeals per member as 0
  let initialMeals = {};
  for (let i = 0; i < user.members.length; i++) {
    initialMeals[user.members[i]] = 0;
  }
  const [meals, setMeals] = useState({...initialMeals});

  const handleChange = (name, value) => {
    setInputs({...inputs, [name]: value});
  };

  const handleMeals = (name, value, type) => {
    type === 'dec' && meals[name] === 0
      ? ''
      : setMeals({...meals, [name]: value});
  };

  const handleSubmit = () => {
    setLoading(true);
    console.log(submit, loading);
    let totalMeals = 0;
    for (const i in meals) {
      totalMeals += meals[i];
    }

    if (inputs.by === '') {
      Alert.alert('Warning', 'By field is required.');
    } else {
      addEntry({...inputs, meals, totalMeals}, dispatch).then(res =>
        res.request.status !== 200
          ? Alert.alert('Oops', res.request.responseText.slice(1, -1))
          : Alert.alert('Success', 'Entries updated successfully.'),
      );
    }
    setLoading(false);
  };

  const requestKey = () => {
    setConfirm(`Please Wait..`);
    updateKey(user._id).then(res => setKeyResponse(res.request.responseText));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Submit Todays Entry</Text>
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Money Spent</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder="0"
          onChangeText={value => handleChange('spent', value)}
          placeholderTextColor="green"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Reserved Money</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder="0"
          onChangeText={value => handleChange('reserved', value)}
          placeholderTextColor="green"
        />
      </View>

      <Pressable style={styles.inputField} onPress={() => setShowBy(!showBy)}>
        <Text style={styles.caption}>
          By: * (Selected: {inputs.by !== '' ? inputs.by : 'none'})
        </Text>
        <Icon name={showBy ? 'upcircle' : 'downcircle'} size={25} />
      </Pressable>
      {showBy && (
        <View style={styles.selectParent}>
          {user.members.map(i => (
            <Pressable
              style={styles.selectChild}
              onPress={() => handleChange('by', i)}
              key={i}>
              <Text style={inputs.by === i && {fontWeight: 'bold'}}>{i}</Text>
              {inputs.by === i ? (
                <Icon name="checkcircle" size={25} color="black" />
              ) : (
                <Icon name="checkcircleo" size={25} color="green" />
              )}
            </Pressable>
          ))}
        </View>
      )}

      <Pressable
        style={styles.inputField}
        onPress={() => setShowMeals(!showMeals)}>
        <Text style={styles.caption}>Meals</Text>
        <Icon name={showMeals ? 'upcircle' : 'downcircle'} size={25} />
      </Pressable>
      {showMeals && (
        <View style={styles.selectParent}>
          {user.members.map(i => (
            <View key={i + i} style={styles.selectChild}>
              <Text>{i}</Text>
              <View style={styles.selectRight}>
                <Pressable onPress={() => handleMeals(i, meals[i] - 1, 'dec')}>
                  <Icon name="minuscircle" size={25} color="green" />
                </Pressable>
                <Text style={{margin: 10}}>{meals[i]}</Text>
                <Pressable onPress={() => handleMeals(i, meals[i] + 1, 'inc')}>
                  <Icon name="pluscircle" size={25} color="green" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.inputField}>
        <Text style={styles.caption}>Manager Key</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder="0000"
          onChangeText={value => handleChange('admin_key', value)}
          placeholderTextColor="red"
        />
      </View>
      <Button
        title={loading ? 'Wait...' : 'Submit'}
        color="#1eb900"
        onPressFunction={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    margin: 20,
    alignSelf: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  caption: {
    //text
    marginRight: 20,
  },
  inputField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    width: 80,
    height: 40,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: '#555',
    borderRadius: 3,
  },
  inputColumn: {
    fontSize: 15,
    width: 40,
    height: 40,
    margin: 0,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#555',
    borderRadius: 5,
  },
  selectParent: {
    flex: 1,
    flexDirecton: 'column',
    justifyContent: 'space-between',
    width: 300,
  },
  selectChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  selectRight: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default EntryForm;
