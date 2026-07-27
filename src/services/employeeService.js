import api from './api';

const endpoint = '/employees';

export const employeeService = {
  list() {
    return api.get(endpoint).then((response) => response.data);
  },

  create(payload) {
    return api.post(endpoint, payload).then((response) => response.data);
  },

  update(id, payload) {
    return api.put(`${endpoint}/${id}`, payload).then((response) => response.data);
  },

  remove(id) {
    return api.delete(`${endpoint}/${id}`).then((response) => response.data);
  },
};
