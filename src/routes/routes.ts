import { Application } from 'express';

// Controllers (route handlers)
import * as apiController from '../controllers/api';

const setRoutes = (app: Application) => {
  app.post('/account/signup', apiController.postSignup);
};

export default setRoutes;
