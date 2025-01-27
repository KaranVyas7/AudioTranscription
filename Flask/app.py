from flask import Flask, jsonify, request, session
from openai import OpenAI
import os
import firebase_admin
from firebase_admin import credentials, auth, firestore, initialize_app
from werkzeug.utils import secure_filename
import time
import send2trash


UPLOAD_FOLDER = 'C:/Users/AmarS/CapstoneFinalProject/Capstone-Final-Project/Flask'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
transcribed_files = {}

cred = credentials.Certificate("C:/Users/AmarS/CapstoneFinalProject/Capstone-Final-Project/Flask/firebaseapikey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


@app.route("/username", methods=['POST'])
def login():
    username = request.json["username"]
    #username = request.args.get('username')
    return {"username": 'This is the backend -- >'+ username }

@app.route('/upload', methods = ['POST'])
def upload_file():
    target=os.path.join(UPLOAD_FOLDER,'audio_files')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    id_token = request.form['id_token']
    #filename = secure_filename(file.filename)
    filename = "audiofile.mp3"
    destination="/".join([target, filename])
    file.save(destination)
    
    audio_file = open("Flask/audio_files/audiofile.mp3", "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="text"
    )
    transcribed_files[secure_filename(file.filename)] = transcription
    #return transcription
    submit = transcription
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {"role": "system", "content": "You are summarizing text."},
        {"role": "user", "content": "take notes on this: "  +transcription},
        ]
    )
    summary = response.choices[0].message.content
    user_ref = db.collection('users').document(id_token)
    user_ref.set({secure_filename(file.filename): summary}, merge=True)

    return summary


if __name__ == "__main__":
    app.run(debug=True) 
