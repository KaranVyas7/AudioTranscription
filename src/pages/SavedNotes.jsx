import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function SavedNotes() {
    const firebaseConfig = {
        apiKey: "AIzaSyAoHqmKxapjNj2_KI1PCwmYEpBhDzplwqI",
        authDomain: "Audio-Note-Transcription-b550d.firebaseapp.com",
        projectId: "Audio-Note-Transcription-b550d",
        storageBucket: "Audio-Note-Transcription-b550d.appspot.com",
        messagingSenderId: "508381657343",
        appId: "1:508381657343:web:49f24213e68cf0693a74ca",
        measurementId: "G-ZB5LKXBKZ7"
    };

    // Check to prevent re-initialization of Firebase app
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params;
    const [userData, setUserData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = db.collection("users").doc(userId);
                const doc = await docRef.get();
                if (doc.exists) {
                    const { username, email, ...filteredData } = doc.data();
                    setUserData(filteredData);
                    setEditedData(filteredData); // Initialize edited data with fetched data
                } else {
                    setUserData(null);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (key, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await db.collection("users").doc(userId).set(editedData, { merge: true });
            setUserData(editedData);
            alert("Changes saved successfully!");
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    const mystyle = StyleSheet.create({
        container: {
            backgroundColor: 'lightblue',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        scrollView: {
            width: '100%',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        content: {
            fontSize: 18,
            marginVertical: 10,
            textAlign: 'center',
        },
        error: {
            color: 'red',
            fontSize: 18,
            textAlign: 'center',
        },
        dataItem: {
            backgroundColor: 'white',
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width: '100%',
        },
        input: {
            borderColor: 'gray',
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
            marginTop: 5,
        },
        saveButton: {
            marginTop: 20,
            padding: 10,
            backgroundColor: '#007BFF',
            borderRadius: 5,
        },
        saveButtonText: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        }
    });

    return (
        <View style={mystyle.container}>
            <Text style={mystyle.title}>Saved Notes</Text>
            {loading ? (
                <Text style={mystyle.content}>Loading...</Text>
            ) : error ? (
                <Text style={mystyle.error}>Error: {error.message}</Text>
            ) : userData ? (
                <ScrollView style={mystyle.scrollView}>
                    {Object.entries(userData).map(([key, value]) => (
                        <View key={key} style={mystyle.dataItem}>
                            <Text style={mystyle.content}>{key}:</Text>
                            <TextInput
                                style={mystyle.input}
                                value={editedData[key]}
                                onChangeText={text => handleInputChange(key, text)}
                                multiline
                            />
                        </View>
                    ))}
                    <Button
                        title="Save Changes"
                        onPress={handleSaveChanges}
                        color="#007BFF"
                    />
                </ScrollView>
            ) : (
                <Text style={mystyle.content}>No user data found</Text>
            )}
        </View>
    );
}

export default SavedNotes;
