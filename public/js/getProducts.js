/*
 * Récupération des informations de l'API
 */
function getProducts(url = "") {
  const hostname =
    location.hostname === "127.0.0.1" || location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://orinocco-gb-p5.herokuapp.com";

  return new Promise((resolve, reject) => {
    fetch(hostname + "/api/teddies/" + url).then((response) => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject("ERREUR:", response.status);
      }
    });
  });
}
