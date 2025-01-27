import React, { useState, useEffect } from 'react';

import axios from 'axios';

function App() {
 
 const [file, setFile] = useState(null);
 const [msg, setMsg] = useState(null);
 const [progress, setProgress] =useState({started: false, pc: 0});

  

function handleUpload(){
  if(!file){
    setMsg("No file selected");
    return;
  }

  const fd = new FormData();
  fd.append('file', file);
  fd.append('id_token', 'token');
  
  setMsg("Uploading...");
  setProgress(prevState => {
    return {...prevState, started:true}
  })

  //To see file contents in console
  axios.post('http://httpbin.org/post', fd, {
    onUploadProgress: (ProgressEvent) => { setProgress(prevState => {
      return {...prevState, pc: ProgressEvent.progress*100}
    })},
  })
  .then(res => {
    setMsg("Upload Successful");
    console.log(res.data);
  })
  .catch(err => {
    setMsg("Upload Unsuccessful");
    console.error(err);
  });


  //sending to flask backend
  axios.post('/upload', fd, {
    onUploadProgress: (ProgressEvent) => { setProgress(prevState => {
      return {...prevState, pc: ProgressEvent.progress*100}
    })},
  })
  .then(res => {
    setMsg("Upload Successful");
    console.log("Data: " + res.data);
  })
  .catch(err => {
    setMsg("Upload Unsuccessful");
    console.error(err);
  });



}

  return(

  
    <div className="App">
      <h1>Uploading Files in React</h1>
      <input onChange={(e) => setFile(e.target.files[0])} type="file"/>
      <button onClick={handleUpload}>Upload</button>
      <p></p>
      {msg && <span>{msg}</span>}
      <p></p>
      {progress.started && <progress max = "100" value = {progress.pc}></progress>}

   
    </div>


  )
}

export default App

