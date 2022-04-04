const mongoose= require("mongoose")
require("./teams-model")
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true});
mongoose.connection.on("connected", function(){
    console.log("DB connected to ", process.env.DB_NAME);
})
mongoose.connection.on("disconnected", function(){
    console.log("DB connected from ", process.env.DB_NAME);
})
mongoose.connection.on("error", function(err){
    console.log("DB has encountered error", err);
})

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});
process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close(function(){
        console.log(process.env.SIGUSR2_MESSAGE);
    });
});