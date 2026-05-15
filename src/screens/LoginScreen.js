import React, { useState } from 'react';
import { auth } from '../services/firebase';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

  if (!email || !password) {

    Alert.alert('Error', 'Please enter email and password');
    return;
  }

  try {

    await auth().signInWithEmailAndPassword(
      email,
      password
    );

    Alert.alert('Success', 'Login Successful');

    navigation.replace('Home');

  } catch (error) {

    Alert.alert('Login Error', error.message);
  }
};

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome Back
      </Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >

        <Text style={styles.signupText}>
          Don't have an account? Signup
        </Text>

      </TouchableOpacity>

    </View>

  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#007BFF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 16,
  },

});