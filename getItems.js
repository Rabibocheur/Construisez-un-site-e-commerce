/*
 * Affichage des produits
 */
getItems();
async function getItems() {
  let response = await getProducts();
  const allItems = document.getElementById("items");

  for (let i = 0; i < response.length; i++) {
    // Créations des cartes
    let sectionItem = document.createElement("section");
    let cardItem = document.createElement("div");
    let imgItem = document.createElement("img");
    let cardBodyItem = document.createElement("div");
    let nameItem = document.createElement("p");
    let btnItem = document.createElement("button");

    // Créations des classes bootstrap
    sectionItem.setAttribute("class", "col-md-4 col-sm-6");
    cardItem.setAttribute("class", "card mb-4 shadow-sm");
    imgItem.setAttribute("class", "img-card card-img-top");
    imgItem.setAttribute("src", response[i].imageUrl);
    cardBodyItem.setAttribute("class", "card-body");
    btnItem.setAttribute("class", "btn btn-sm btn-outline-secondary");

    nameItem.textContent = response[i].name;
    btnItem.id = response[i]._id;
    btnItem.textContent = "Plus d'infos";

    // Affichage des cartes
    allItems.appendChild(sectionItem);
    sectionItem.appendChild(cardItem);
    cardItem.appendChild(imgItem);
    cardItem.appendChild(cardBodyItem);
    cardBodyItem.appendChild(nameItem);
    cardBodyItem.appendChild(btnItem);

    // Evenement click de redirection sur la page item
    let btn = document.getElementById(response[i]._id);
    btn.addEventListener("click", () => {
      window.location.href = "item.html?id=" + btn.id;
    });
  }
}
