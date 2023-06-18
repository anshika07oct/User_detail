const ROUTE_PREFIX = `/api/v1/`;

const userRoute = require('./userRoutes');
import * as appUtils from '../utils/appUtils';
import * as constants from '../utils/constant';

export = function (app) {
  
  app.use(`${ROUTE_PREFIX}user`, userRoute);
 
  app.use((err, req, res, next) => {
    appUtils.errorRes(res, err, constants.code.error_code);
  });
}

