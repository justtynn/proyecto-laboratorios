
const firebaseConfig = {
    apiKey: "AIzaSyCQobaaJNh5Tyf99pD6z8HtRxg8eySyE0w",
    authDomain: "laboratorios-insuco.firebaseapp.com",
    projectId: "laboratorios-insuco",
    storageBucket: "laboratorios-insuco.firebasestorage.app",
    messagingSenderId: "953276066615",
    appId: "1:953276066615:web:ba1184417c7ee4fb3d88b2"
};

// Inicializar Firebase 
firebase.initializeApp(firebaseConfig);

// Exportar instancias para usar en otros archivos
const db = firebase.firestore();
const auth = firebase.auth();