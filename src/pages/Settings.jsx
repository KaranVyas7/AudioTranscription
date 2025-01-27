import React, { Component } from 'react';
import ProfileButton from '../components/ProfileButton';
import {StyleSheet} from 'react-native';
function Settings(){
    const mystyle = StyleSheet.create({
        div:{
            backgroundColor: 'lightblue',
            textAlign: 'center',
            height: '1000px'
        }
    });
    return( 
    <div style={mystyle.div}>
      <h1>Setting</h1>
    </div>
    );
}
export default Settings;