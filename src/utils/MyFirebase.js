//const firebase = require("firebase");
//require("firebase/firestore");

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCNDsfKLTUw9xHll4Z5_DrH-JpMWj-AWJc",
    authDomain: "utinerary-358a2.firebaseapp.com",
    databaseURL: "https://utinerary-358a2.firebaseio.com",
    projectId: "utinerary-358a2",
    storageBucket: "utinerary-358a2.appspot.com",
    messagingSenderId: "589476865035"
  };

firebase.initializeApp(config);

let db = firebase.firestore();

let colTitles = db.collection("titles");
let colTrips = db.collection("trips");

export function getTitles(cb) {
    colTitles.get().then(
        querySnapshot => {
            let titles = [];
            querySnapshot.forEach(
                doc => {
                    titles.push(doc.data());
                }
            );
            cb(titles);
        }
    )
}

export function getPlaces(id, cb) {
    colTrips.doc(id).get()
        .then(doc => {
            if (doc.exists) {
                let s = doc.data().places;
                cb(JSON.parse(s).places);
            } else {
                console.log(`No document with id = ${id} !`);
            }
        });
}

export function editPlaces(id, editedPlaces) {
    colTrips.doc(id).set(
        {places: editedPlaces}
    ).then( () => {
        console.log("okay");
    })
}

function newTrip(myPlaces) {

}
