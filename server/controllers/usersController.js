/* eslint-disable no-unused-vars */
import { debug } from 'console';
import { isBefore, isLength, isEmail } from 'validator';
import User from '../models/user';
import { ApiSuccess, ApiError } from '../utils/responses';


export const signup = (req, res) => {
  const {
    firstName, lastName, address, bio, occupation, expertise, email, dob, gender, password,
  } = req.body;
  // debug(firstName, lastName, address, bio, occupation, expertise, email, dob, gender, password);

  if (firstName
    && lastName
    && address
    && bio
    && occupation
    && expertise
    && isEmail(email)
    && dob
    && gender
    && isLength(password, 6, 20)
  ) {
    const userModel = new User();
    const user = userModel.signUp({
      firstName, lastName, address, bio, occupation, expertise, email, dob, gender, password,
    });
    // eslint-disable-next-line prefer-const
    let result = { ...user, password: null };
    res.status(201).json(new ApiSuccess(result, 201, 'User created successfully'));
  } else {
    res.status(400).json(new ApiError(400, 'Invalid input detected '));
  }
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  if (isEmail(email) && password) {
    const userModel = new User();
    const user = User.signIn({ password, email });
    const result = { ...user, password: null };
    res.status(200).json(new ApiSuccess(result, 200, 'User is successfully logged in'));
  }
  res.status(401).json(new ApiError(401, 'Unauthorized'));
};

// export default { signup };
