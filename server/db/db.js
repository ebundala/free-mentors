/* eslint-disable class-methods-use-this */
import fake from 'faker';

const storage = {
  users: {
  },
  sessions: {
  },
  reviews: {},
  usersIndex: {},
};
// the default admin user;
const defaultAdmin = {
  firstName: 'admin',
  lastName: 'admin',
  email: 'admin@freementors.com',
  password: 'admin12345',
  dob: fake.date.past(18),
  address: fake.address.streetAddress(true),
  bio: fake.lorem.words(100),
  occupation: fake.name.jobTitle(),
  expertise: fake.name.jobArea(),
  avator: fake.internet.avatar(),
  role: 'admin',
};
const defaultMentee = {
  firstName: fake.name.firstName,
  lastName: fake.name.lastName(),
  email: 'mentee@freementors.com',
  password: 'mentee12345',
  dob: fake.date.past(18),
  address: fake.address.streetAddress(true),
  bio: fake.lorem.words(100),
  occupation: fake.name.jobTitle(),
  expertise: fake.name.jobArea(),
  avator: fake.internet.avatar(),
  role: 'mentee',
};
const defaultMentor = {
  firstName: fake.name.firstName(),
  lastName: fake.name.lastName(),
  email: 'mentor@freementors.com',
  password: 'mentor12345',
  dob: fake.date.past(18),
  address: fake.address.streetAddress(true),
  bio: fake.lorem.words(100),
  occupation: fake.name.jobTitle(),
  expertise: fake.name.jobArea(),
  avator: fake.internet.avatar(),
  role: 'mentor',
};

export default class Db {
  constructor() {
    this.txCount = 0;
    if (!this.userExist('admin@freementors.com')) {
      this.insert(defaultAdmin, Db.USERS);
    }
    if (!this.userExist('mentor@freementors.com')) {
      this.insert(defaultMentor, Db.USERS);
    }
    if (!this.userExist('mentee@freementors.com')) {
      this.insert(defaultMentee, Db.USERS);
    }
  }

  getStorage() {
    return storage;
  }

  timestamp() {
    const date = new Date();
    return Math.ceil(date.getTime());
  }

  userExist(email) {
    const user = this.getByIndex(email);
    return !!user;
  }

  insert(val, collection = Db.USERS, key = 'id') {
    this.txCount = this.txCount + 1;
    if (collection && val) {
      const id = this.timestamp() + (this.txCount * 5000);
      const date = new Date();

      const createdOn = date.toUTCString();

      const value = { ...val, createdOn };
      value[key] = id;

      // create user indexes
      if (collection === Db.USERS) {
        storage.usersIndex[`${val.email}`] = id;
      }

      storage[`${collection}`][`${id}`] = value;
      return id;
    }
    return -1;
  }

  remove(id, collection = Db.USERS) {
    if (collection && id) {
      delete storage[`${collection}`][`${id}`];
      return id;
    }
    return -1;
  }

  update(val, key = 'id', collection = Db.USERS) {
    if (collection && val) {
      if (storage[`${collection}`][`${val[`${key}`]}`]) {
        storage[`${collection}`][`${val[`${key}`]}`] = val;
      }
      return storage[`${collection}`][`${val[`${key}`]}`];
    }
    return null;
  }

  fetch(id, collection = Db.USERS) {
    if (collection && id) {
      return storage[`${collection}`][`${id}`];
    }
    return null;
  }

  getAllByFieldValue(field, value, col = Db.USERS, f2 = null, v2 = null, f3 = null, v3 = null) {
    const vals = storage[`${col}`];
    if (vals) {
      return Object.values(vals).filter((item) => {
        let ch3 = true;
        if (f3 && v3) {
          ch3 = item[`${f3}`] === v3;
        }
        let ch2 = true;
        if (f2 && v2) {
          ch2 = item[`${f2}`] === v2;
        }
        return (item[`${field}`] === value) && ch2 && ch3;
      });
    }
    return null;
  }

  all(collection = Db.USERS) {
    const values = storage[`${collection}`];
    return Object.values(values);
  }

  getByIndex(value, collection = Db.USERS, indexName = Db.USERS_INDEX) {
    const id = this.fetch(value, indexName);
    return this.fetch(id, collection);
  }
}

Db.USERS = 'users';
Db.SESSIONS = 'sessions';
Db.REVIEWS = 'reviews';
Db.USERS_INDEX = 'usersIndex';
