import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, getEntry} from '../redux/apiCalls';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import Header from './../components/Header';
import DataTable from './../components/DataTable';

const Home = () => {
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

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
  let monthId = d.getMonth();
  let year = d.getFullYear();

  useEffect(() => {
    getEntry(user.username, monthId, year, dispatch);
  }, [user, dispatch, monthId, year]);

  useEffect(() => {
    getUser(user.username, dispatch);
  }, [user.username, dispatch]);

  return (
    <>
      <SafeAreaView>
        <StatusBar backgroundColor={user ? '#87ceeb' : '#f8f8f8'} />
        <Header />
        <DataTable month={month} />
      </SafeAreaView>
    </>
  );
};

export default Home;
