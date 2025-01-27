/*import React, { Component, useState, useEffect } from 'react';
import ProfileButton from '../components/ProfileButton';
import {StyleSheet} from 'react-native';
import ScrollBox from '../components/ScrollBox';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
function Home(){
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [summary, setSummary] = useState(null);
    const [progress, setProgress] =useState({started: false, pc: 0});
    var temp = "";
    const navigation = useNavigation();
    const route = useRoute();
    var userId = "";
    const mystyle = StyleSheet.create({
        div:{
            backgroundColor: 'lightblue',
            textAlign: 'center',
            height: '1000px'
        }
    });
    function handleUpload(){
        if(!file){
          setMsg("No file selected");
          return;
        }
        
        if(route.params!=null){
          userId  = route.params;
          console.log("userId " + userId);
          const fd = new FormData();
          fd.append('file', file);
          fd.append('id_token', userId);
          
          setMsg("Uploading...");
          setProgress(prevState => {
            return {...prevState, started:true}
          })
        
          //sending to flask backend
          axios.post('/upload', fd, {
            onUploadProgress: (ProgressEvent) => { setProgress(prevState => {
              return {...prevState, pc: ProgressEvent.progress*100}
            })},
          })
          .then(res => {
            setMsg("Upload Successful");
            console.log("Data: " + res.data);
            setSummary("Summary: "  + res.data);
          })
          .catch(err => {
            setMsg("Upload Unsuccessful");
            console.error(err);
          });
      }

      else{
        setSummary("You must sign in first")
      }
      
      
      }
    return( 
    <div style={mystyle.div}>
      <h1>Hello Welcome To Our Note Taking App</h1>
      <h3>Uploading Audio File Below</h3>
      <input onChange={(e) => setFile(e.target.files[0])} type="file"/>
      <button onClick={handleUpload}>Upload</button>
      <p></p>
      {msg && <span>{msg}</span>}
      <p></p>
      {progress.started && <progress max = "100" value = {progress.pc}></progress>}
      <p></p>
      {summary}
    </div>
    );
}
export default Home;*/



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import EditBox from '../editBox';

function Home() {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [summary, setSummary] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const navigation = useNavigation();
    const route = useRoute();
    var userId = "";

    const handleUpload = () => {
        if (!file) {
            setMsg("No file selected");
            return;
        }

        if (route.params != null) {
            userId = route.params;
            const fd = new FormData();
            fd.append('file', file);
            fd.append('id_token', userId);

            setMsg("Uploading...");
            setProgress(prevState => ({ ...prevState, started: true }));

            axios.post('/upload', fd, {
                onUploadProgress: (ProgressEvent) => {
                    setProgress(prevState => ({ ...prevState, pc: Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total) }));
                },
            })
            .then(res => {
                setMsg("Upload Successful");
                setSummary(res.data);
            })
            .catch(err => {
                setMsg("Upload Unsuccessful");
                console.error(err);
            });
        } else {
            setSummary("You must sign in first");
        }
    };

    return (
      <div style={styles.container}>
          <h3 style={styles.subHeader}>Upload Audio File Below</h3>
          <input style={styles.fileInput} type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button style={styles.uploadButton} onClick={handleUpload}>Upload</button>
          {msg && <p style={styles.message}>{msg}</p>}
          {progress.started && <progress style={styles.progressBar} max="100" value={progress.pc}></progress>}
          <div style={styles.scrollBoxWrapper}>
              <div style={styles.scrollBox}>
                  {summary && <p>{summary}</p>}
              </div>
          </div>
      </div>
  );
}

const styles = {
  container: {
      backgroundColor: 'lightblue',
      textAlign: 'center',
      padding: '20px',
      borderRadius: '10px',
      margin: 'auto',
      height: '90vh',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  header: {
      fontSize: '40px',
      fontWeight: 'bold',
      marginBottom: '20px',
  },
  subHeader: {
      fontSize: '28px',
      marginBottom: '20px',
  },
  fileInput: {
      marginBottom: '20px',
  },
  uploadButton: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
  },
  message: {
      marginTop: '20px',
      fontSize: '16px',
      color: 'black',
  },
  progressBar: {
      width: '30%',
      marginTop: '20px',
      alignSelf: 'center', // Ensure progress bar is center-aligned
  },
  scrollBoxWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
  },
  scrollBox: {
      width: '50%',
      height: '200px',
      overflowY: 'scroll',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '5px',
      border: '2px solid #ccc',
  },
};
export default Home;
