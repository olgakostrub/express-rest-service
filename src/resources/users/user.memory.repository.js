const uuid = require('uuid');

const users = [
  {
    id: '7fb25d25-96e3-4af0-bf1c-ee126dac610c',
    name: 'Olga',
    login: 'olga',
    password: 'olga123'
  }
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async user => {
  const id = uuid.v4();
  users.push({ ...user, id });
  return getById(id);
};

const updateUser = async (id, user) => {
  const originalUser = users.find(currentUser => currentUser.id === id);
  if (!originalUser) return null;
  const originalUserIndex = users.indexOf(originalUser);
  users[originalUserIndex] = {
    ...originalUser,
    ...user
  };
  return users[originalUserIndex];
};

const deleteUser = async id => {
  const user = users.find(currentUser => currentUser.id === id);
  if (!user) return null;
  const userIndex = users.indexOf(user);
  users.splice(userIndex, 1);
  return user;
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
