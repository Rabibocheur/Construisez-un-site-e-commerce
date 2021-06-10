getItems();
/*
 * Affichage des produits
 */
async function getItems() {
  const products = await getAPI();
  for (const product of products) {
    document.getElementById("items").innerHTML += `
    <section class="items-card col-md-4 col-sm-6">
      <a class="card mb-4" href="item.html?id=${product._id}">
        <img class="img-responsive" style="height: 250px" src="${
          product.imageUrl
        }">
        <div class="card-body d-flex justify-content-between">
        <h5>${product.name}</h5>
        <h5>${product.price / 100} €</h5>
        </div>
      </a>
    </section>
    `;
  }
}
