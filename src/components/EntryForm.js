import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addEntry} from '../redux/apiCalls';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import Button from './../utils/Button';
import Icon from 'react-native-vector-icons/AntDesign';

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
    admin_key: 0,
  });
  const [showMeals, setShowMeals] = useState(false);
  const [showBy, setShowBy] = useState(false);
  //set initialMeals per member as 0
  let initialMeals = {};
  for (let i = 0; i < user.members.length; i++) {
    initialMeals[user.members[i]] = 0;
  }
  const [meals, setMeals] = useState({...initialMeals});

  const handleChangeNum = (name, value) => {
    value === ''
      ? setInputs({...inputs, [name]: 0})
      : setInputs({...inputs, [name]: value});
  };

  const handleChange = (name, value) => {
    setInputs({...inputs, [name]: value});
  };

  const handleMeals = (name, value, type) => {
    type === 'dec' && meals[name] === 0
      ? ''
      : setMeals({...meals, [name]: value});
  };

  const handleSubmit = () => {
    let totalMeals = 0;
    for (const i in meals) {
      totalMeals += meals[i];
    }

    if (inputs.reserved !== 0 && inputs.by === '') {
      Alert.alert(
        'Warning',
        'You can not reserve money without selecting anyone in by field.',
      );
    } else if (
      inputs.spent === 0 &&
      inputs.reserved === 0 &&
      totalMeals === 0
    ) {
      Alert.alert('Error', 'You can not add an empty record.');
    } else {
      inputs.spent = /^\d+$/.test(inputs.spent) ? inputs.spent : 0;
      inputs.reserve = /^\d+$/.test(inputs.reserved) ? inputs.reserved : 0;
      addEntry({...inputs, meals, totalMeals}, dispatch).then(res =>
        res.request.status !== 200
          ? Alert.alert('Oops', res.request.responseText.slice(1, -1))
          : Alert.alert('Success', 'Entries updated successfully.'),
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputFieldRow}>
         <Text style={styles.caption}>Spent Money</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder='0'
          placeholderTextColor='#0f6a94'
          onChangeText={value => handleChangeNum('spent', value)}
        />
      </View>

      <View style={styles.inputFieldRow}>
          <Text style={styles.caption}>Reserved Money</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder='0'
          placeholderTextColor='#0f6a94'
          onChangeText={value => handleChangeNum('reserved', value)}
        />
      </View>

      <View style={styles.inputFieldRow}>
          <Text style={styles.caption}>Manager Key*</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder='0'
          placeholderTextColor='#0f6a94'
          onChangeText={value => handleChangeNum('admin_key', value)}
        />
      </View>

      <Pressable style={styles.selectField} onPress={() => setShowBy(!showBy)}>
        <Text style={styles.caption}>
          <Icon name="form" size={20} color="#0f6a94" /> By{' '}
          {inputs.reserved !== 0 && '*'}(Selected:
          {inputs.by !== '' ? inputs.by : 'none'})
        </Text>
        <Icon
          name={showBy ? 'upcircle' : 'downcircle'}
          size={25}
          color="#0f6a94"
        />
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
                <Icon name="pushpin" size={25} color="black" />
              ) : (
                <Icon name="pushpino" size={25} color="#0f6a94" />
              )}
            </Pressable>
          ))}
        </View>
      )}
      <Pressable
        style={styles.selectField}
        onPress={() => setShowMeals(!showMeals)}>
        <Text style={styles.caption}>
          <Icon name="database" size={20} color="#0f6a94" /> Meals
        </Text>
        <Icon
          name={showMeals ? 'upcircle' : 'downcircle'}
          size={25}
          color="#0f6a94"
        />
      </Pressable>
      {showMeals && (
        <View style={styles.selectParent}>
          {user.members.map(i => (
            <View key={i + i} style={styles.selectChild}>
              <Text>{i}</Text>
              <View style={styles.selectRight}>
                <Pressable onPress={() => handleMeals(i, meals[i] - 1, 'dec')}>
                  <Icon name="minuscircle" size={25} color="#0f6a94" />
                </Pressable>
                <Text style={{margin: 10}}>{meals[i]}</Text>
                <Pressable onPress={() => handleMeals(i, meals[i] + 1, 'inc')}>
                  <Icon name="pluscircle" size={25} color="#0f6a94" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
      <Button
        style={{alignSelf: 'center'}}
        title={'Submit'}
        color="#1eb900"
        onPressFunction={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 10,
    flex:1,
  },
  caption: {
    marginRight: 20,
    fontWeight: 'bold',
    color: '#0f6a94',
  },
  inputField: {
    marginBottom: 10,
    marginLeft: 20,
  },
  inputFieldRow: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    fontSize: 15,
    width: 150,
    height: 45,
    paddingLeft: 10,
    borderWidth: 0.2,
    borderColor: '#555',
    marginRight: 10,
  },
  selectField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    width: 200,
  },
  selectParent: {
    flex: 1,
    flexDirecton: 'column',
    justifyContent: 'space-between',
    width: 300,
    marginLeft: 20,
    marginRight: 20,
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
