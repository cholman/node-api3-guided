const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//three amigas rachel, rita and nancy
function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalURL}`)
  next();
}

//middleware
server.use(express.json()); //built-in middleware
//server.use(morgan("dev"));
server.use(helmet());

//server.use(logger);

//routes - endpoints
server.use('/api/hubs', logger, gatekeeper, hubsRouter);

server.get('/', logger, greeter, gatekeeper, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next){
  req.cohort = "web 26";
  next();
}

function logger(req, res, next){
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

//write a gatekeeper middleware that reads a password from req.headers
//if password is melon let request continue
//if password is not melon send 400 status and message

function gatekeeper(req, res, next){
  const password = req.headers.password;

  if(password && password.toLowerCase() === 'melon'){
    next();
  } else {
     res.status(401).json({errorMessage: "incorrect password"})
  }
}

// function fetchHubs() {
//   const endpoint = 'https://lotr.com/hubs'
//   const options = {
//     headers: {
//       password: 'melon'
//     }
//   }
//   axios.get(endpoint, options).then().catch()
// }