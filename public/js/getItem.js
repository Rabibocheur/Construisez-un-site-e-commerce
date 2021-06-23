(async () => {
  const getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);
  const product = await getAPI(searchParams.get("id"));
  getItem(product);
  document
    .querySelector("button[data-bs-toggle='modal']")
    .addEventListener("click", () => createMyItem(product));
})();

// get an item
function getItem(product) {
  let colors = "";
  for (let i in product.colors)
    colors += `<option>${product.colors[i]}</option>`;

  document.getElementById("item").innerHTML = `
    <img class="col-12 col-md-6 col-sm-12 p-0 m-auto m-sm-0 m-md-0 shadow-sm" src="${
      product.imageUrl
    }" alt="ours ${product.name}" />
    <section class="d-flex flex-column col-md-5 p-0">
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h3>${product.name}</h3>
            <h5>Prix : ${product.price / 100} €</h5>
          </div>
          <p>${product.description}</p>
        </div>
      </div>
      <h6>Choisissez votre couleur</h6>
      <select class="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
        ${colors}
      </select>
      <h6>Choisissez votre quantité</h6>
      <input type="number" value="1" class="form-control mb-3">
      <button class="btn btn-secondary w-100 shadow mt-auto" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Ajouter au panier
      </button>
    </section>
  `;
}

// Creating an article object
function createMyItem(product) {
  const quantity = parseInt(document.querySelector("input").value, 10);
  const price = product.price;

  let myItem = {
    id: product._id,
    name: product.name,
    color: document.querySelector("select").value,
    quantity: quantity,
    price: price,
    total: quantity * price,
  };

  addToStorage(myItem);
}

// Add an item to local storage
function addToStorage(addItem) {
  let getItems = [];

  if (!localStorage.getItem("items")) {
    getItems.push(addItem);
  } else {
    getItems = JSON.parse(localStorage.getItem("items"));
    getItems.push(addItem);
  }
  localStorage.setItem("items", JSON.stringify(getItems));

  basketMessage(addItem);
}

// message for adding an item to the cart
function basketMessage(item) {
  document.querySelector(".modal-title").innerHTML = `
    <strong>${item.name}</strong> a été ajouté à votre panier !
  `;
  document.querySelector(".table_order").innerHTML = `
    <tr>
      <td>${item.name}</td>
      <td>${item.color}</td>
      <td>${item.quantity}</td>
      <td>${item.price / 100}€</td>
      <td>${item.total / 100}€</td>
    </tr>
  `;
}
