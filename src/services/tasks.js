import axios from 'axios';
const URI = 'http://localhost:8080/api/v1/tasks';

export const getTasks = async () => {
  return await axios.get(URI);
};

export const postTask = async data => {
  return await axios.post(URI, {
    contents: data,
    isDone: false,
  });
};

export const patchTask = async (id, data) => {
  return await axios.patch(URI + '/' + id, {
    ...data,
  });
};

export const deleteTask = async id => {
  return await axios.delete(URI + '/' + id);
};

export const deleteAllTasks = async () => {
  return await axios.delete(URI);
};
