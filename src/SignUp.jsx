import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';

function SignUp() {
    const firebaseConfig = {
        apiKey: "AIzaSyAoHqmKxapjNj2_KI1PCwmYEpBhDzplwqI",
        authDomain: "Audio-Note-Transcription-b550d.firebaseapp.com",
        projectId: "Audio-Note-Transcription-b550d",
        storageBucket: "Audio-Note-Transcription-b550d.appspot.com",
        messagingSenderId: "508381657343",
        appId: "1:508381657343:web:49f24213e68cf0693a74ca",
        measurementId: "G-ZB5LKXBKZ7"
    };

    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore(app);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [users, setUsers] = useState([]);

    const mystyle = StyleSheet.create({
        body: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightblue'
        },
        container: { 
            width: '60%',
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
        },
        header: {
            alignItems: 'center',
            marginBottom: 20,
        },
        title: {
            color: '#3c009d',
            fontSize: 24,
            fontWeight: '700'
        },
        inputs: {
            marginVertical: 20,
        },
        input: {
            backgroundColor: '#C8A2C8',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            width: '100%',
        },
        signUpButton: {
            backgroundColor: '#3c009d',
            borderRadius: 50,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 20,
        },
        signUpButtonText: {
            color: '#fff',
            fontSize: 19,
            fontWeight: '700',
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
            marginTop: 20,
        },
        userList: {
            marginTop: 20,
        },
        userItem: {
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
        },
    });

    function handleSignUp() {
        setErrorMsg("");
        createUserWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
                const user = userCredential.user;
                return setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email
                }).then(() => user);
                
            })
            .then((user) => {
                console.log("set Param: " + user.uid);
                navigation.navigate('NewApp', user.uid);
            })
            .catch((error) => {
                setErrorMsg("Error: " + error.message);
            });
    }

    function fetchUsers() {
        getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                const usersList = querySnapshot.docs.map(doc => doc.data());
                setUsers(usersList);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <View style={mystyle.body}>
            <View style={mystyle.container}>
                <View style={mystyle.header}>
                    <Text style={mystyle.title}>Sign Up</Text>
                </View>
                <View style={mystyle.inputs}>
                    <TextInput 
                        placeholder='Username' 
                        style={mystyle.input} 
                        value={username} 
                        onChangeText={setUsername} 
                    />
                    <TextInput 
                        placeholder='Email' 
                        style={mystyle.input} 
                        value={email} 
                        onChangeText={setEmail} 
                    />
                    <TextInput 
                        placeholder='Password' 
                        style={mystyle.input} 
                        secureTextEntry={true} 
                        value={password} 
                        onChangeText={setPassword} 
                    />
                </View>
                <TouchableOpacity style={mystyle.signUpButton} onPress={handleSignUp}>
                    <Text style={mystyle.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
                {errorMsg ? <Text style={mystyle.errorMessage}>{errorMsg}</Text> : null}
            </View>
        </View>
    );
}

export default SignUp;

