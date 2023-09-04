# Holidapp

## Description

Wireframes
![Wireframes](docs/MVP%20Holiday%20app-wireframes.drawio.png)
Architecture
![Architecture](docs/MVP%20Holiday%20app-architecture.drawio.png)

## Data model

## Requisites

- [firebase CLI](https://firebase.google.com/docs/cli)
- [Node.js](https://nodejs.org/en/)

## Getting started

1. Clone the repository
2. Build functions

```bash
cd holiday-api
npm run build
cd ../
cd integration-calendar
npm run build
cd ../
cd integration-paymo
npm run build
cd ../
cd integration-sheets
npm run build
cd ../
cd notifications
npm run build
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
- http://127.0.0.1:5001/lab900-holidapp/us-central1/webApi/api/v1/users to trigger the api function
- http://127.0.0.1:5001/lab900-holidapp/us-central1/integrationPaymo to trigger the paymo integration
- http://127.0.0.1:5001/lab900-holidapp/us-central1/integrationCalendar to trigger the Google Calendar integration
- http://127.0.0.1:5001/lab900-holidapp/us-central1/integrationSheets to trigger the Google Sheets integration
- http://127.0.0.1:5001/lab900-holidapp/us-central1/notifications to trigger the notifications integration

## Deploy guide

In root folder, run

```bash
firebase deploy
```

See https://firebase.google.com/docs/cli#deployment for all details.
Firebase console of this project can be found here: https://console.firebase.google.com/project/lab900-holidapp/overview

The frontend can be found at https://lab900-holidapp.web.app/.

TODO:

- [ ] check auth
- [ ] share dummy data with data model
- [ ] create git repo
- [ ] extend readme