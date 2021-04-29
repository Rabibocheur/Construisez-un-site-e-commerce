/*
 * Récupération des informations de l'API
 */
let getProducts = function (url) {
  if (url === undefined) {
    url = "";
  }
  return new Promise(function (resolve, reject) {
    fetch("http://localhost:3000/api/teddies/" + url).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(console.error("ERREUR:", response.status));
      }
    });
  });
};
