import React, { useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';

import { auth } from '../services/firebase';

import {
  showLocalNotification,
  scheduleNotification
} from '../services/localNotification';

import {
  requestUserPermission,
  getFCMToken
} from '../services/notificationService';

const HomeScreen = ({ navigation }) => {

  useEffect(() => {

    const initializeNotifications = async () => {

      try {

        setTimeout(async () => {

          await requestUserPermission();

          await getFCMToken();

        }, 2000);

        const unsubscribe = messaging().onMessage(
          async remoteMessage => {

            Alert.alert(
              remoteMessage?.notification?.title || 'Notification',
              remoteMessage?.notification?.body || ''
            );
          }
        );

        return unsubscribe;

      } catch (error) {

        console.log('Notification Error:', error);
      }
    };

    initializeNotifications();

  }, []);

  const handleLogout = async () => {

    await auth().signOut();

    navigation.replace('Login');
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome Home 🚀
      </Text>

      {/* SEND NOTIFICATION */}

      <TouchableOpacity
        style={styles.button}
        onPress={showLocalNotification}
      >

        <Text style={styles.buttonText}>
          Send Notification
        </Text>

      </TouchableOpacity>

      {/* SCHEDULE NOTIFICATION */}

      <TouchableOpacity
        style={styles.button}
        onPress={scheduleNotification}
      >

        <Text style={styles.buttonText}>
          Schedule Notification
        </Text>

      </TouchableOpacity>

      {/* HISTORY */}

<TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('History')}
>

  <Text style={styles.buttonText}>
    Notification History
  </Text>

</TouchableOpacity>

      {/* LOGOUT */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >

        <Text style={styles.buttonText}>
          Logout
        </Text>

      </TouchableOpacity>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },

  button: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});