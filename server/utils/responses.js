
export class ApiSuccess {
  constructor(data, status, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class ApiError {
  constructor(status, error) {
    this.status = status;
    this.error = error;
  }

  toString() {
    return JSON.stringify(this);
  }
}
