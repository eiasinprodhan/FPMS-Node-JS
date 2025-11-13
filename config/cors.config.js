const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'];

const corsOption = {
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    Credentials: true
};

module.exports = cors(corsOption);