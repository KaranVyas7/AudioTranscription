import React, { useState, useEffect } from 'react';
import "./NavBar.css"
import {StyleSheet} from 'react-native';
import ProfileButton from "./ProfileButton";
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Navbar = (id) => {
    const mystyle = StyleSheet.create({
        nav:{
            backgroundColor: '#C8A2C8',
            color: "white",
            //height: "85px",
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            padding: "0.2rem calc((100vw - 1000px) / 2)",
            boxSizing: "border-box"
        },
        navlink:{
            color: "#808080",
            display: "flex",
            alignItems: 'center',
            padding: '0 1rem',
            height: '100%',
            cursor: 'pointer',
            boxSizing: "border-box"
        },
        bars:{
            display: 'none',
            color: '#808080',
            display: 'block',
            position: 'absolute',
            transform: 'translate(-100%, 75%)',
            fontSize: '1.8rem',
            cursor: 'pointer',
            boxSizing: "border-box"
        },
        navA:{
            color: "inherit",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: ".25rem"    
        },
        navList:{
            padding: "0",
            margin: "0",
            listStyle: "none",
            display: "flex",
            gap: "2rem"
        },
        navListElement:{
          
        }
        
    });
    var userId = id;
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
    if (!firebase.apps.length) 
        firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const navigation = useNavigation();
    const route = useRoute();
    const [userData, setUserData] = useState("guest");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("navbar username:" + userData)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = db.collection("users").doc(id.id);
                const doc = await docRef.get();
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    const { username, ...filteredData } = doc.data();
                    setUserData(username);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    function handleSavedNotes(){
        console.log("handling daved notes");
        console.log("user params: " + route.params);
        if(route.params!=null){
            userId  = route.params;
            console.log("handling daved notes id: " + userId);
            navigation.navigate('SavedNotes', { userId: userId });
        }
        else{
            console.log("error in handling saved notes");
        }

    }
    
    return (
       <nav className="nav" style={mystyle.nav}>
            <a href="/" className="siteTital"style={mystyle.navA}>Note Taking App</a>
            <ul style={mystyle.navList} className = "nav ul">
                <li style={mystyle.navList}>
                    <a href= "/" style={mystyle.navA}>Home</a>
                </li>
                <li style={mystyle.navListElement}>
                    <a style={mystyle.navA} onClick = {handleSavedNotes}>Saved Notes</a>  
                 </li>
                 <li>
                    <a href="/" style={mystyle.navA}>Log Out</a>
                </li>
                <li>
                   <ProfileButton username = {userData} mystyle = {mystyle.navA}></ProfileButton>
                </li>
            </ul>
       </nav>
    );
};

export default Navbar;