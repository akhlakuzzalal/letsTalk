const OK = (res, data, message = "Successful") => {
  const response = {
    status: "success",
    message,
    data,
  };
  return res.status(200).json(response);
};

const CREATED = (res, data, message = "Created successfully") => {
  const response = {
    status: "success",
    message,
    data,
  };
  return res.status(201).json(response);
};

const NO_CONTENT = (res, data, message = "No content") => {
  const response = {
    status: "success",
    message,
    data,
  };
  return res.status(204).json(response);
};

const BAD_REQUEST = (res, message = "Bad request") => {
  const response = {
    status: "error",
    message,
  };
  return res.status(400).json(response);
};

const UNAUTHORIZED = (res, message = "Unauthorized") => {
  const response = {
    status: "error",
    message,
  };
  return res.status(401).json(response);
};

const FORBIDDEN = (res, message = "Forbidden") => {
  const response = {
    status: "error",
    message,
  };
  return res.status(403).json(response);
};

const NOT_FOUND = (res, message = "Not found") => {
  const response = {
    status: "error",
    message,
  };
  return res.status(404).json(response);
};

const ERROR = (res, message = "Internal server error") => {
  const response = {
    status: "error",
    message,
  };
  return res.status(500).json(response);
};

module.exports = {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  ERROR,
};
