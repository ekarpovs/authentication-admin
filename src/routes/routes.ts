import { Application } from 'express';

// Controllers (route handlers)
import * as apiController from '../controllers/api';

const setRoutes = (app: Application) => {
  app.post('/account/signup', apiController.postSignup);
  app.get('/users', apiController.getList);
};

export default setRoutes;
