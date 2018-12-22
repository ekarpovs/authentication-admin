'use strict';

import { NextFunction, Request, Response } from 'express';
import { WriteError } from 'mongodb';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';

import { default as User, UserModel } from '../models/user';

import '../config/passport';
import { JWT_DEV_SECRET } from '../config/secrets';

import jwt from 'jsonwebtoken';

export let postSignup  = (req: Request, res: Response, next: NextFunction) => {

  const user = new User({
    email: req.body.email,
    password: req.body.password
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
 * POST /account/password
 * Update current password.
 */
export let postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
  // Verify tocken ?????
  User.findById(req.user.id, (err, user: UserModel) => {
    if (err) { return next(err); }
    user.password = req.body.password;
    user.save((error: WriteError) => {
      if (error) { return next(error); }
      return res.status(200).json({id: user._id});
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export let postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
  // Verify tocken ?????
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    return res.status(200).json({ msg: 'Your account has been deleted.' });
  });
};

// const verifyToken = () => {

// }
