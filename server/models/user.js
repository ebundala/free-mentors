/* eslint-disable class-methods-use-this */
// import { Hash } from 'crypto';
import { debug } from 'console';
import jwt from 'jsonwebtoken';
import DB from '../db/db';
// eslint-disable-next-line import/named
import config from '../confing/config';

export default class User extends DB {
  signUp(user) {
    if (user.email && !this.userExist(user.email)) {
      const role = 'mentee';
      const id = this.insert({ ...user, role }, DB.USERS);
      if (id > 0) {
        const result = this.fetch(id, DB.USERS);
        // debug('TOKEN IS ', config.JWT_SECRET);
        const token = this.createToken(user);
        return { ...result, token };
      }
    }
    return null;
  }

  signIn({ email, password }) {
    if (this.userExist(email)) {
      const user = this.getByIndex(email, DB.USERS, DB.USERS_INDEX);
      debug('user is with', user, email);
      if (user.password === password) {
        const token = this.createToken(user);
        const data = { ...user, token };
        delete data.password;
        return data;
      }
    }
    return {};
  }

  createToken(user) {
    return jwt.sign(user, config.JWT_SECRET);
  }
}
