import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.title}>Please Wait...</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55b2e4',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default LoadingScreen;
