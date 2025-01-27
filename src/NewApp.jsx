import React, { Component, useState, useEffect } from 'react';
import ProfileButton from "./components/ProfileButton";
import ScrollBox from './components/ScrollBox';
import {StyleSheet} from 'react-native';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Settings from './pages/Settings'
import SavedNotes from './pages/SavedNotes';
import SignUp from './SignUp';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function NewApp(){
    const mystyle = StyleSheet.create({
        div:{
            backgroundColor: 'lightblue',
            textAlign: 'center',
            height: '1000px'
        }
    });

    const navigation = useNavigation();
    const route = useRoute();
    let component
    switch(window.location.pathname){
        case "/":
            component = <Home/>
            break
        case "/Audio-Note-Transcription":
            component = <Home/>
            break
        case "/Audio-Note-Transcription/":
            component = <Home/>
            break
         case "/SavedNote":
             component = <SavedNotes/>
            break
         case "/Settings":
            component = <Settings/>
            break
    }
    

    return(
    <>
     <Navbar id = {route.params}/>
     <div>
        {component}
     </div>
    </>
    
    
    );

}
export default NewApp;