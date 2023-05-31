import express  from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRouters from './routers/author';

const router = express();

// app.use(express.json());

/** Connect to Mongo */

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.log('Connect Succes');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect');
    Logging.error(error);

  });

/** Only Start server if Connect Success */
const StartServer = () => {

    router.use((req, res, next) => {
      /** Log the req */
      Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

      res.on('finish', () => {
          /** Log the res */
          Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
      });

      next();
  });
   
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */

    router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method == 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
          return res.status(200).json({});
      }

      next();
  });

    /** ROUTES */
    router.use('/author', authorRouters)

    /** Healthcheck */

    router.get('/ping', (req,res,next) => res.status(200).json({ message: 'ping'}));
    router.get('/', (req,res,next) => res.status(200).json({ message: 'success'}));

    /** Error handing */
    router.use((req,res) => {
      const error = new Error('Not found');
      Logging.error(error);

      return res.status(404).json({ message: error.message });
    })

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}. || Url: http://localhost:${config.server.port}`))


};
