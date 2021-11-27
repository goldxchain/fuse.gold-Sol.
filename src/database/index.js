let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoDb = require('./db');
const serveStatic = require('serve-static')
const path = require('path')

const OrderRoute = require('./order.route')

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    tls: true,
    tlsCAFile: 'ca-certificate.crt'
}).then(() => {
  console.log('Database connected!')
},
error => {
    console.log(error)
  }
)
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get('/INDEX2', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.use(cors());
app.use('/api', OrderRoute)


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log('Connected on : ' + port)
})

app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

