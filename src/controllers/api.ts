'use strict';

import { NextFunction, Request, Response } from 'express';
import { WriteError } from 'mongodb';

import { default as User, UserModel } from '../models/user';

export let getList = (req: Request, res: Response, next: NextFunction) => {
  User.find((err, users) => {
    if (err) { return next(err); }
    return res.status(200).json({users});
  });
};

export let getAccount = (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;

  User.findById(query.id, (err, user: UserModel) => {
    if (err) { return next(err); }
    return res.status(200).json({user});
  });
};

export let postSignup  = (req: Request, res: Response, next: NextFunction) => {

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    roles: req.body.roles
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(400).json({msg: 'Account with that email address already exists.'});
    }
    user.save((error) => {
      if (error) { return next(error); }
      return res.status(200).json({id: user._id});
    });
  });
};

/**
 * POST /account
 * Update current password.
 */
export let putAccount = (req: Request, res: Response, next: NextFunction) => {
  // Verify tocken ?????
  // tslint:disable-next-line:no-console
  // console.log(req.body);
  // return res.status(200).json({ msg: 'Your account has been updated.' });
  User.findById(req.body._id, (err, user: UserModel) => {
    if (err) { return next(err); }
    user.password = req.body.password;
    user.roles = req.body.roles;
    user.save((error: WriteError) => {
      if (error) { return next(error); }
      return res.status(200).json({ msg: 'Your account has been updated.' });
    });
  });
};

/**
 * DELETE /account
 * Delete user account.
 */
export let deleteAccount = (req: Request, res: Response, next: NextFunction) => {
  // Verify tocken ?????
  const query = req.query;
  User.remove({ _id: query.id }, (err) => {
    if (err) { return next(err); }
    return res.status(200).json({ msg: 'Your account has been deleted.' });
  });
};
