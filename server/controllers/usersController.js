/* eslint-disable no-unused-vars */
import { debug } from 'console';
import { isJWT, isLength, isEmail } from 'validator';
import User from '../models/user';
import { ApiSuccess, ApiError } from '../utils/responses';


export const signup = (req, res) => {
  const {
    firstName, lastName, address, bio, occupation, expertise, email, dob,
    gender, password, role,
  } = req.body;
  // debug(firstName, lastName, address, bio,
  //  occupation, expertise, email, dob, gender, password, role);
  const userModel = new User();
  if (firstName
    && lastName
    && address
    && bio
    && occupation
    && expertise
    && isEmail(email)
    && !userModel.userExist(email)
  // && gender
    && isLength(password, 1, 20)
  ) {
    const user = userModel.signUp({
      firstName, lastName, address, bio, occupation, expertise, email, dob, gender, password,
    });
    const { token } = user;
    if (token && isJWT(token)) {
      const result = { token, message: 'User created successfully' };
      res.status(201).json(new ApiSuccess(result, 201, 'User created successfully'));
    } else {
      res.status(400).json(new ApiError(400, 'Unable to signup '));
    }
  } else {
    res.status(400).json(new ApiError(400, 'Invalid input provided '));
  }
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  if (isEmail(email) && password) {
    const userModel = new User();
    const user = userModel.signIn({ password, email });
    const { token } = user;
    // debug('token is ', token);
    if (token && isJWT(token)) {
      const result = { ...user };
      delete result.password;
      res.status(200).json(new ApiSuccess(result, 200, 'User is successfully logged in'));
    } else {
      res.status(200).json(new ApiError(401, 'Unauthorized'));
    }
  } else {
    res.status(401).json(new ApiError(401, 'Unauthorized'));
  }
};

export const me = (req, res) => {
  try {
    const { user } = req;
    if (user) {
      res.status(200).json(new ApiSuccess(user, 200));
    } else {
      throw user;
    }
  } catch (e) {
    res.status(401).json(new ApiError(401, 'Unauthorized'));
  }
};
// export default { signup };
