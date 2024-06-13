export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Profile Requests

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .then((userInfo) => {
        // Process userInfo
      });
  }

  // updateUserInfo({ name, description }) {
  //   fetch(`${this._baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name,
  //       description,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }

  //     return Promise.reject(`Error: ${res.status}`);
  //   });
  // }
}
