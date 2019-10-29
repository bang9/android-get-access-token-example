const open = require('open');
const {google} = require('googleapis');
const account = require('./service-account.json');
const express = require('express');

const app = express();

const JWTClient = new google.auth.JWT(
    account.client_email,
    null,
    account.private_key,
    ["https://www.googleapis.com/auth/androidpublisher"]
);

app.get('/', (req, res) => {
    JWTClient.getAccessToken((err,token)=>{
        if(err){
            return res.status(404).send("get access token failed");
        }

        return res.status(200).send(token);
    })
});

app.listen(8000);

open('http://localhost:8000');
