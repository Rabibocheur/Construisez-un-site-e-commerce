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
          <button id="${response[i]._id}" class="btn btn-sm btn-outline-secondary">
          Plus d'infos
          </button>
        </div>
      </div>
    </section>
    `;
  }

  let btn = document.querySelectorAll("button");
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      window.location.href = "item.html?id=" + response[i]._id;
    });
  }
}
getItems();
