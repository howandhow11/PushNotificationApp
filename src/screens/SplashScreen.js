import React, { useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {

    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Push Notification App
      </Text>

    </View>

  );
};

export default SplashScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

});