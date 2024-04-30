import express from 'express';
import path from 'path'
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';

class App{

  constructor(){
    this.server = express();

    mongoose.connect('mongodb+srv://devHouse:devHouse@devhouse.xuwyssi.mongodb.net/?retryWrites=true&w=majority&appName=devHouse');

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    
    this.server.use(express.json());

  }

  routes(){
    this.server.use(routes);
  }

}

export default new App().server;
