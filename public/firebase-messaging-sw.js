importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAYBbSSd8mIFb5tcZToQVeERBgmFB9P-vM",
  authDomain: "simple-messenger-6b9c4.firebaseapp.com",
  projectId: "simple-messenger-6b9c4",
  storageBucket: "simple-messenger-6b9c4.appspot.com",
  messagingSenderId: "397569086859",
  appId: "1:397569086859:web:dcb0642976a8a13e6d8b8e",
  measurementId: "G-013GBBK0TZ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    `[background] Received message = ${payload}`
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
