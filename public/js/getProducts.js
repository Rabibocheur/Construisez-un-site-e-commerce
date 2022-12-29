/*
 * Retrieving information from the API
 */
function getAPI(url = "", init) {
  const hostname =
    location.hostname === "127.0.0.1" || location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://likeable-morning-cornet.glitch.me/";

  if (init == undefined) init = { method: "GET" };

  return new Promise((resolve, reject) => {
    fetch(`${hostname}/api/teddies/${url}`, init)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          console.error("Problème de connexion : ", response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error("Il y a eu un problème avec l'opération fetch: ", error.message);
      });
  });
}
