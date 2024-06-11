class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
        headers: {
          authorization: "a5df8bb7-ccf7-4af1-a820-819df810a6c4"
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          
          return Promise.reject(`Error: ${res.status}`);
        });
    }
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a5df8bb7-ccf7-4af1-a820-819df810a6c4",
    "Content-Type": "application/json",
  },
});
