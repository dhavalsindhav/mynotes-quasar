const userPrefix = "/users";
const notePrefix = "/note";

export const USER = {
  LOGIN: `${userPrefix}/signin`,
  REGISTER: `${userPrefix}/signup`,
};

export const NOTE = {
  LIST: notePrefix,
  SAVE: notePrefix,
  UPDATE: `${notePrefix}/:id`,
  DELETE: `${notePrefix}/:id`,
};

