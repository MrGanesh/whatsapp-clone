import mongoose from 'mongoose';

const whatsAPPSchema = new mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String,
    received: Boolean,
    imgUrl: String,
    mobile: String
})

export default mongoose.model("messageContent", whatsAPPSchema)

