//imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessage.js'
import User from './dbUser.js'
import Pusher from 'pusher'
import cors from 'cors'
//app config
const app = express();
const port = process.env.PORT || 9000

//middleware
app.use(express.json());
app.use(cors())

//DB config
const connection_url = 'mongodb://ganesh:1xcF6J1Ko90BKKIL@cluster0-shard-00-00.ljg3d.mongodb.net:27017,cluster0-shard-00-01.ljg3d.mongodb.net:27017,cluster0-shard-00-02.ljg3d.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-7yjqr4-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//pusher
const pusher = new Pusher({
    appId: "1171395",
    key: "af6db6e1fbc26b9813d7",
    secret: "6f8e7b6d719665eade4c",
    cluster: "ap2",
    useTLS: true
});

//????

const db = mongoose.connection

db.once("open", () => {
    console.log('DB is connected')

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timeStamp: messageDetails.timeStamp,
                    received: messageDetails.received

                }
            )
        }
        else {
            console.log('Error triggering Pusher')
        }

    })
})


//api routes
app.get('/', (req, res) => res.send('hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(data)
        }
    })
})


app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(`new message created: ${data}`)
        }
    })
})


app.post('/login', (req, res) => {
    const { name, password, imgUrl, mobile } = req.body;

    User.findOne({ name: name })
        .then(savedUser => {
            if (!savedUser) {
                res.status(422).json({ error: "User already exists" })
            }

            const dbUser = new User({
                name,
                password,
                imgUrl
            })

            dbUser.save().then((user) => {
                const { name, imgUrl, mobile } = user
                res.json({ user: { name, imgUrl, mobile } })
                // res.send(user)
            })
                .catch((err) => console.log(err))
        })

    // User.create(dbUser, (err, data) => {
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         res.status(200).send(data);
    //     }
    // })
})

//listen
app.listen(port, () => console.log("listening on port" + port))