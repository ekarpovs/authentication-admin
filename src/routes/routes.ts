import { Application } from 'express';

// Controllers (route handlers)
import * as apiController from '../controllers/api';
import * as homeController from '../controllers/home';

const setRoutes = (app: Application) => {
  app.get('/', homeController.getHome);
  app.post('/account/signup', apiController.postSignup);
  app.get('/account/list', apiController.getList);
  app.get('/account', apiController.getAccount);
  app.put('/account', apiController.putAccount);
  app.delete('/account', apiController.deleteAccount);
};

export default setRoutes;
