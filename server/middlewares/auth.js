
import jwt from 'jsonwebtoken';
import config from '../confing/config';
import ApiError from '../utils/responses';

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const authorization = req.headers.authorization.split(' ');
    delete req.headers.authorization;
    if (authorization.length === 2) {
      const token = authorization[1];
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401)
            .json(new ApiError(401, 'Unauthorized'));
        } else {
          req.user = decoded;
          next();
        }
      });
    }
  }
  next();
};

export default auth;
