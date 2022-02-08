# zerofouraddressbook

Zerofouraddressbook is a React web application which uses Firebase Realtime Database, and by using the application, you are able to login and create, read, update and delete the contacts.

# Getting started

## Firebase Realtime Database

Follow the next steps to set up your Firebase Realtime Database, which is necessary to run the application:

1. Go to [Firebase Realtime Database](https://console.firebase.google.com/), click on **Add project**, name your project and click **Continue**.

2. Unable Google Analytics for this project and click **Create project**. Once it is created, click **Continue**.

3. Click on **</>**, Register App -> App nickname -> App name -> click **Register app** -> copy and save the credentials which you will use in your React app -> click **Continue to console**.

4. Click **Realtime Database** -> click **Create Database** -> on Database options choose _Belgium (europe-west1)_ (if located in Europe) -> click **Continue**.

5. On Security rules choose "Start in test mode" -> click **Enable**.

6. Copy the link from the database and add it as a value to the key _databaseURL_, inside the _firebaseConfig_ object:

```
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};
```

## Run the application

Follow the installation process to run the application:

1. Clone the repo:

```
git clone https://github.com/urisk333/zerofouraddressbook
```

2. Add the credentials:

- Create .env file in the app's root folder, and add the credentials, created in the previous steps, to the file:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MSG_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_DATABASE_URL=
```

3. Run the application:

```
cd zerofouraddressbook/addressbook
npm i
npm start
```

# Notes

For login to application use the mock information:

```
Email: admin@admin.com
Password: Admin123$
```

# Tech stack

- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Realtime Database](https://console.firebase.google.com/)

# Author

Ivan Car - [GitHub](https://github.com/urisk333) / [LinkedIn](https://www.linkedin.com/in/ivan-car/)
