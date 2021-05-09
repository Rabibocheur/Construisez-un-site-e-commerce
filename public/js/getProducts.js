/*
 * Récupération des informations de l'API
 */
let getProducts = function (url) {
  if (url === undefined) {
    url = "";
  }
  return new Promise(function (resolve, reject) {
    fetch("https://orinocco-gb-p5.herokuapp.com/api/teddies/" + url)
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(console.error("ERREUR:", response.status));
      }
    });
  });
};
