import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const HistoryScreen = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const unsubscribe = firestore()
      .collection('notifications')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {

        const list = [];

        snapshot.forEach(doc => {

          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setNotifications(list);
      });

    return () => unsubscribe();

  }, []);

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.body}>
        {item.body}
      </Text>

    </View>
  );

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Notification History 🔔
      </Text>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  body: {
    marginTop: 5,
    fontSize: 15,
  },

});