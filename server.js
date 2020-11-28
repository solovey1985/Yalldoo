const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const helmet = require('helmet');

const app = express();

app.use(express.static('dist'));

const params = process.argv;

if (params && params.length >= 3 && params[2] === 'prod') {

    const httpPort = 8088;
    const httpsPort = 443;
    const privateKey = fs.readFileSync('/certs/key.pem', 'utf8');
    const certificate = fs.readFileSync('/certs/cert.pem', 'utf8');
    const credentials = {
        cert: certificate,
        key: privateKey,
    };
    const sixtyDaysInSeconds = 5184000;

    app.use(helmet.hsts({
        maxAge: sixtyDaysInSeconds,
        includeSubDomains: true,
    }));

    const httpServer = http.createServer(app);
    httpServer.listen(httpPort, () => {
        console.log(`HTTP Server running on port ${httpPort}`);
    });

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort, () => {
        console.log(`HTTPS Server running on port ${httpsPort}`);
    });
}

else {
    const httpPort = 8088;
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort, () => {
        console.log(`HTTP Server running on port ${httpPort}`);
    });
}
