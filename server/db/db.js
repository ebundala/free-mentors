// eslint-disable-next-line import/no-extraneous-dependencies
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
  email: 'user@freementors.com',
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
    this.USERS = 'users';
    this.SESSIONS = 'sessions';
    this.REVIEWS = 'reviews';
    this.USERS_INDEX = 'usersIndex';

    if (!Db.userExist('admin@freementors.com')) {
      this.insert(this.USERS, defaultAdmin);
    }
    if (!Db.userExist('mentor@freementors.com')) {
      this.insert(this.USERS, defaultMentor);
    }
    if (!Db.userExist('mentee@freementors.com')) {
      this.insert(this.USERS, defaultMentee);
    }
  }

  static getStorage() {
    return storage;
  }

  static timestamp() {
    const date = new Date();
    return Math.ceil(date.getTime());
  }

  static userExist(email) {
    const user = Db.getByIndex(this.USERS, this.USERS_INDEX, email);
    return !!user;
  }

  insert(collection, val, key = 'id') {
    if (collection && val) {
      const id = Db.timestamp();
      const date = new Date();

      const createdOn = date.toUTCString();

      const value = { ...val, createdOn };
      value[key] = id;

      // create user indexes
      if (collection === this.USERS) {
        storage.usersIndex[`${val.email}`] = id;
      }

      storage[`${collection}`][`${id}`] = value;
      return id;
    }
    return -1;
  }

  static remove(collection, id) {
    if (collection && id) {
      delete storage[`${collection}`][`${id}`];
      return id;
    }
    return -1;
  }

  static update(collection, val, key = 'id') {
    if (collection && val) {
      if (storage[`${collection}`][`${val[`${key}`]}`]) {
        storage[`${collection}`][`${val[`${key}`]}`] = val;
      }
      return storage[`${collection}`][`${val[`${key}`]}`];
    }
    return null;
  }

  static fetch(collection, id) {
    if (collection && id) {
      return storage[`${collection}`][`${id}`];
    }
    return null;
  }

  static getAllByFieldValue(col, field, value, f2 = null, v2 = null, f3 = null, v3 = null) {
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

  static all(collection) {
    const values = storage[`${collection}`];
    return Object.values(values);
  }

  static getByIndex(collection, indexName, value) {
    const id = Db.fetch(indexName, value);
    return Db.fetch(collection, id);
  }
}
