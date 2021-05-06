/*
 * Affichage des produits
 */
async function getItems() {
  let response = await getProducts();
  const allItems = document.getElementById("items");

  for (let i = 0; i < response.length; i++) {
    allItems.innerHTML += `
    <section class="col-md-4 col-sm-6">
      <div class="card mb-4 shadow-sm">
        <img class="img-responsive" style="height: 250px" src="${response[i].imageUrl}">
        <div class="card-body">
        <p>${response[i].name}</p>
          <a class="btn btn-sm btn-outline-secondary" href="item.html?id=${response[i]._id}">
            Plus d'infos
          </a>
        </div>
      </div>
    </section>
    `;
  }
}
getItems();
