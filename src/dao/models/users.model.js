const mongoose = require('mongoose');

const collectionName = 'users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    rol: String
});


//Definimos el modelo
export const usersModel = mongoose.model(collectionName, usersSchema);