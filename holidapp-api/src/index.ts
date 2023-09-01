import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
app.use(cors({origin: true}));
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));

//initialize the database and the collection
const db = admin.firestore();
const userCollection = 'users';

//define google cloud function name
interface User {
    id: string,
    email?: string,
    roles?: string[],
}

app.get('/users', async (req, res) => {
    try {
        const userQuerySnapshot = await db.collection(userCollection).get();
        const users: any[] = [];
        userQuerySnapshot.forEach(
            (doc) => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                } as User);
            }
        );
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

export const webApi = functions.https.onRequest(main);
