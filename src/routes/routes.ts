import { Application } from 'express';

// Controllers (route handlers)
import * as apiController from '../controllers/api';

const setRoutes = (app: Application) => {
  app.post('/account/signup', apiController.postSignup);
  app.get('/account/list', apiController.getList);
};

export default setRoutes;
