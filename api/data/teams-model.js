const { ObjectId } = require("mongodb");
const mongoose= require("mongoose")
const playerSchema= mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    age: {
        type: Number,
        min: 16,
        max: 70
    }
})
const TeamSchema= mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    year: Number,
    color: String,
    players: [playerSchema]
})

module.exports= mongoose.model("Team", TeamSchema, "teams");