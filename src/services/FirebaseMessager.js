import MessengerService  from "./MessengerService";
import Firebase from "firebase";

class FirebaseMessager extends MessengerService {
    constructor() {
        super();
        this.uid = "";
        this.messagesRef = null;
        Firebase.initializeApp({
            apiKey: "AIzaSyCMLh5KI8ceIzaJ-u9Z_gbeeOMZmVRBSsU",
            authDomain: "test-63853.firebaseapp.com",
            databaseURL: "https://test-63853.firebaseio.com",
            projectId: "test-63853",
            storageBucket: "test-63853.appspot.com",
            messagingSenderId: "1097423677710",
        });
        Firebase.auth().onAuthStateChanged((user) => {
            if(user)
                this.setUid(user.uid);
            else
                Firebase.auth().signInAnonymously().catch((e) => { alert(e.message); });
        });
    }

    setUid(uid) {
        this.uid = uid;
    }

    getUid() {
        return this.uid;
    }

    loadMessages(callback) {
        this.messagesRef = Firebase.database().ref("messages");
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
            });
        };
        this.messagesRef.limitToLast(20).on("child_added", onReceive);
    }

    sendMessage(message) {
        for(let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: Firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    closeChat() {
        if(this.messagesRef) {
            this.messagesRef.off();
        }
    }
}

export default FirebaseMessager;
