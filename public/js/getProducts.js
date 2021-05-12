/*
 * Récupération des informations de l'API
 */
let getProducts = function (url) {
  let hostname =
    location.hostname === "127.0.0.1" || location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://orinocco-gb-p5.herokuapp.com";

  if (url === undefined) {
    url = "";
  }
  return new Promise(function (resolve, reject) {
    fetch(hostname + "/api/teddies/" + url).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(console.error("ERREUR:", response.status));
      }
    });
  });
};
