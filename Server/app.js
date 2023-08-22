const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const cors = require('cors');

const app = express();
const proxy = httpProxy.createProxyServer();

const REACT_APP_API_URL = 'http://192.168.1.16:8081'; // URL of your Spring Boot backend


app.use(cors());

// Serve the React frontend
app.use(express.static(path.join(__dirname, '../Client/build')));


app.all('/codes/*', (req, res) => {
  proxy.web(req, res, { target: REACT_APP_API_URL });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Express server is running ',`${PORT}`);
});
