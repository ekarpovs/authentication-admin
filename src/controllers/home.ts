'use strict';
import { NextFunction, Request, Response } from 'express';

export let getHome = (req: Request, res: Response, next: NextFunction) => {

  return res.status(200).json('Web API application gateway home page works');
};
