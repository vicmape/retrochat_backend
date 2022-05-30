require('dotenv').config()

const mongoose = require('mongoose');

module.exports = async () => {

    mongoose.connect(process.env.MONGODB_URI);
    
    const usersSchema = new mongoose.Schema({
        userName: String,
        password: String,
        room:{roomId: String,roomName: String},
    }, { timestamps: true });

    const roomsSchema = new mongoose.Schema({
        roomName: String,
        messages: [{ user:{userName: String, userId: String}, room:{roomName: String, roomId: String}, text: String }]
    }, { timestamps: true });

    mongoose.model('Users', usersSchema);
    mongoose.model('Rooms', roomsSchema);

    const Rooms = require('mongoose').model("Rooms")
    const roomExist = await Rooms.findOne({ roomName:'Lobby' });
    if(!roomExist) {
        const room = await Rooms.create({ roomName:'Lobby' })
    }
}
