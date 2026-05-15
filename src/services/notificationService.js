import messaging from '@react-native-firebase/messaging';

import { Alert, PermissionsAndroid, Platform } from 'react-native';

export async function requestUserPermission() {

  if (Platform.OS === 'android') {

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {

    console.log('Notification Permission Granted');
  }
}

export async function getFCMToken() {

  const token = await messaging().getToken();

  console.log('FCM TOKEN:', token);

  Alert.alert('FCM Token', token);

  return token;
}