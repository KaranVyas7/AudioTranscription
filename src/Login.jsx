import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Login() {
    const firebaseConfig = {
        apiKey: "AIzaSyAoHqmKxapjNj2_KI1PCwmYEpBhDzplwqI",
        authDomain: "Audio-Note-Transcription-b550d.firebaseapp.com",
        projectId: "Audio-Note-Transcription-b550d",
        storageBucket: "Audio-Note-Transcription-b550d.appspot.com",
        messagingSenderId: "508381657343",
        appId: "1:508381657343:web:49f24213e68cf0693a74ca",
        measurementId: "G-ZB5LKXBKZ7"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const navigation = useNavigation();
    const [errorMsg, setErrorMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goToSignIn = () => {
        navigation.navigate("SignUp");
    };

    const handleLogIn = () => {
        setErrorMsg("");
        console.log("email: " + email);
        console.log("password: " + password);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log("handle login user id: " + user.uid);
                navigation.navigate('NewApp', user.uid);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log("errorMessage: " + errorMessage);
                setErrorMsg(errorMessage);
            });
    };

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Email"
                            onChangeText={setEmail}
                            style={styles.enter}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Password"
                            onChangeText={setPassword}
                            style={styles.enter}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogIn}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.signUpText}>
                        Don't Have an Account?{' '}
                        <Text style={styles.signUpTextSpan} onPress={goToSignIn}>
                            Click Here!
                        </Text>
                    </Text>
                </View>
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'lightblue',
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#fff',
        padding: 30,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        color: '#3c009d',
        fontSize: 48,
        fontWeight: '700',
    },
    inputs: {
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#C8A2C8',
        marginBottom: 15,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    enter: {
        height: 50,
        color: '#3c009d',
        fontSize: 19,
    },
    loginButton: {
        backgroundColor: '#3c009d',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '700',
    },
    signUpText: {
        color: '#797979',
        fontSize: 19,
    },
    signUpTextSpan: {
        color: '#4c00b4',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Login;
