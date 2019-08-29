// import { Hash } from 'crypto';
import jwt from 'jsonwebtoken';
import DB from '../db/db';
// eslint-disable-next-line import/named
import { JWT_SECRET } from '../confing/config';
// eslint-disable-next-line no-unused-vars
export default class User extends DB {
  // constructor() {
  //  super();
  /* {
    firstName, lastName, password, email, address, occupation, expertise, dob, bio, avator, role,
  } */
  /* this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.address = address;
    this.bio = bio;
    this.occupation = occupation;
    this.expertise = expertise;
    this.avator = avator;
    this.role = role; */
  // }

  signUp(user) {
    if (user.email && !DB.userExist(user.email)) {
      const role = 'mentee';
      const id = this.insert(this.USERS, { ...user, role });
      if (id > 0) { return DB.fetch(this.USERS, id); }
    }
    return null;
  }

  static signIn(credentials) {
    if (DB.userExist(credentials.email)) {
      const user = DB.getByIndex(credentials.email);
      if (user.password === credentials.password) {
        const token = jwt.sign(user, JWT_SECRET);
        return { ...user, token, password: null };
      }
    }
    return null;
  }
}
