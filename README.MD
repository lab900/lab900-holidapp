# Holidapp

## Description

Wireframes

![Wireframes](docs/MVP%20Holiday%20app-wireframes.drawio.png)
https://app.diagrams.net/#G1ScMordqAbxYIFCs3XoXJIfnzKfJ3D_lv

Architecture

![Architecture](docs/MVP%20Holiday%20app-architecture.drawio.png)
https://app.diagrams.net/#G1ScMordqAbxYIFCs3XoXJIfnzKfJ3D_lv
## Data model

## Requisites

- [firebase CLI](https://firebase.google.com/docs/cli)
- [Node.js](https://nodejs.org/en/) v18.x or above

## Getting started

1. Clone the repository
2. Build functions and the frontend

```bash
cd holidapp-api
npm i && run build
cd ../
cd integration-calendar
npm i && run build
cd ../
cd integration-paymo
npm i && run build
cd ../
cd integration-sheets
npm i && run build
cd ../
cd notifications
npm i && run build
cd ../
cd frontend
npm i && run build
cd ../
```

3. Start the Firebase emulators using

```bash
firebase emulators:start --export-on-exit --import firestore-data
```

or use the shared runconfiguration in IntelliJ

4. Visit

- http://localhost:4000 to view the emulator UI
- http://localhost:5000 to view the app
- http://127.0.0.1:5001/lab900-holidapp/us-central1/webApi/api/v1/user/:email to trigger the api function
- http://127.0.0.1:5001/lab900-holidapp/us-central1/integrationPaymo to trigger the paymo integration
- http://127.0.0.1:5001/lab900-holidapp/us-central1/integrationCalendar to trigger the Google Calendar integration
- http://127.0.0.1:5001/lab900-holidapp/us-central1/integrationSheets to trigger the Google Sheets integration
- http://127.0.0.1:5001/lab900-holidapp/us-central1/notifications to trigger the notifications integration

## Project setup

### Firebase

Firebase is used to store all data.
Stopping the emulators will persist the data to the `firestore-data` folder.
Starting the emulators will preload the data from the same folder.
The data structure if already defined.
Checkout https://console.firebase.google.com/project/lab900-holidapp/firestore to see the predefined data structure in
Firestore.

The models already have Typescript types that can be found in `frontend/src/models`

### Frontend

The frontend is setup using create-react-app. See https://create-react-app.dev/docs/getting-started/ for more details.
Firebase configuration and an authentication component are already present in the project.
Also, an example of communication with the backend is present in the project.
The frontend fetches user data from the `holidapp-api` function and displays it in the browser.

## Deploy guide

> :warning: **Make sure to build the functions and the frontend before deploying.**
> See [Getting started](#getting-started) for more details.

In root folder, run

```bash
firebase deploy
```

if you only want to deploy the frontend (hosting), run

```bash 
firebase deploy --only hosting
```

It is also possible to deploy just one function. See https://firebase.google.com/docs/cli#deployment for all details.
Firebase console of this project can be found here: https://console.firebase.google.com/project/lab900-holidapp/overview

The frontend can be found at https://lab900-holidapp.firebaseapp.com/.

