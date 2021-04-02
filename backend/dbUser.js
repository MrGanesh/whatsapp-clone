import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    imgUrl: String,
    mobile: String
})

export default mongoose.model('user', userSchema);