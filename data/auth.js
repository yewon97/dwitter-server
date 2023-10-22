import { v4 as uuid } from 'uuid';

// test1234!
let users = [
  {
    id: '1',
    username: 'josh',
    password: '$2b$12$iqLUWYvop25tb.rxyQT6muHFlA21Esbd.409A/2MIP8S/wLOHotzK',
    name: 'Josh',
    email: 'josh@google.com',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=3000',
  },
];

export async function findByUsername(username) {
  const found = users.find((user) => user.username === username);
  return found;
}

export async function createUser(user) {
  const created = { ...user, id: uuid() };
  users.push(created);
  return created.id;
}

export async function findById(id) {
  console.log(users.find((user) => user.id === id));
  return users.find((user) => user.id === id);
}
