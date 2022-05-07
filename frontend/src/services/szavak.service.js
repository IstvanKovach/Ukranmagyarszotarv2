import http from "../http-common";

class SzavakDataService {
  getAll() {
    return http.get("/szotar");
  }

  get(id) {
    return http.get(`/szotar/${id}`);
  }

  create(data) {
    return http.post("/szotar", data);
  }

  update(id, data) {
    return http.put(`/szotar/${id}`, data);
  }

  delete(id) {
    return http.delete(`/szotar/${id}`);
  }

  deleteAll() {
    return http.delete(`/szotar`);
  }

  findBySzo1(szo1) {
    return http.get(`/szotar?szo1=${szo1}`);
  }
}

export default new SzavakDataService();