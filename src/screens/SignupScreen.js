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

const SignupScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {

  if (!name || !email || !password) {

    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  try {

    await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    Alert.alert('Success', 'Account Created');

    navigation.replace('Home');

  } catch (error) {

    Alert.alert('Signup Error', error.message);
  }
};
  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Create Account
      </Text>

      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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
        onPress={handleSignup}
      >

        <Text style={styles.buttonText}>
          Signup
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >

        <Text style={styles.loginText}>
          Already have an account? Login
        </Text>

      </TouchableOpacity>

    </View>

  );
};

export default SignupScreen;

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
    backgroundColor: '#28A745',
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

  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 16,
  },

});