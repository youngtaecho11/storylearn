import axios from 'axios';

const URI = 'http://localhost:8080/api/v1/members';

export const checkEmail = async email => {
  return await axios.get(URI + '/validation?email=' + email);
};

export const getMemberByEmail = async email => {
  return await axios.get(URI + '?email=' + email);
};

export const createMember = async data => {
  return await axios.post(URI, data);
};

export const getTasksByMemberId = async id => {
  return await axios.get(URI + '/' + id + '/tasks');
};

export const postTaskWithMemberId = async (id, data) => {
  return await axios.post(URI + '/' + id + '/tasks', {
    contents: data,
    isDone: false,
  });
};

export const deleteAllTasksByMemberId = async id => {
  return await axios.delete(URI + '/' + id + '/tasks');
};
