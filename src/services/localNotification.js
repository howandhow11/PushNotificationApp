import notifee, {
  AndroidImportance,
  TriggerType,
} from '@notifee/react-native';

import firestore from '@react-native-firebase/firestore';

export async function showLocalNotification() {

  await notifee.requestPermission();

  const channelId = await notifee.createChannel({

    id: 'default',

    name: 'Default Channel',

    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({

    title: 'PushNotificationApp 🚀',

    body: 'Local Notification Working Successfully 🔥',

    android: {

      channelId,

      pressAction: {
        id: 'default',
      },
    },
  });

  // SAVE TO FIRESTORE

  await firestore()
    .collection('notifications')
    .add({

      title: 'PushNotificationApp 🚀',

      body: 'Local Notification Working Successfully 🔥',

      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

export async function scheduleNotification() {

  await notifee.requestPermission();

  const channelId = await notifee.createChannel({

    id: 'default',

    name: 'Default Channel',

    importance: AndroidImportance.HIGH,
  });

  const trigger = {

    type: TriggerType.TIMESTAMP,

    timestamp: Date.now() + 5000,
  };

  await notifee.createTriggerNotification(

    {
      title: 'Scheduled Notification ⏰',

      body: 'This notification appeared after 5 seconds 🔥',

      android: {

        channelId,

        pressAction: {
          id: 'default',
        },
      },
    },

    trigger
  );

  // SAVE TO FIRESTORE

  await firestore()
    .collection('notifications')
    .add({

      title: 'Scheduled Notification ⏰',

      body: 'This notification appeared after 5 seconds 🔥',

      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}