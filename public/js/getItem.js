const getUrl = window.location.search;
const searchParams = new URLSearchParams(getUrl);

// Ajout et création d'un article dans le localStorage
const addToStorage = async () => {
  const product = await getProducts(searchParams.get("id"));
  const quantity = parseInt(document.querySelector("input").value, 10);
  const price = product.price / 100;
  let getItems = [];

  let addItem = {
    id: product._id,
    name: product.name,
    color: document.querySelector("select").value,
    quantity: quantity,
    price: price,
    total: quantity * price,
  };

  if (!localStorage.getItem("items")) {
    getItems.push(addItem);
  } else {
    getItems = JSON.parse(localStorage.getItem("items"));
    getItems.push(addItem);
  }
  localStorage.setItem("items", JSON.stringify(getItems));

  document.querySelector(".modal-title").innerHTML = `
    <strong>${addItem.name}</strong> a été ajouté à votre panier !
  `;
  document.querySelector(".table_order").innerHTML = `
    <tr>
      <td>${addItem.name}</td>
      <td>${addItem.color}</td>
      <td>${addItem.quantity}</td>
      <td>${addItem.price}€</td>
      <td>${addItem.total}€</td>
    </tr>
  `;
}

// Création de la page d'un article
const getItem = async () => {
  const product = await getProducts(searchParams.get("id"));
  const item = document.getElementById("item");
  let colors = "";
  for (let i in product.colors) colors += `<option>${product.colors[i]}</option>`;

  item.innerHTML = `
    <img class="col-12 col-md-6 col-sm-12 p-0 m-auto m-sm-0 m-md-0 shadow-sm" src="${
      product.imageUrl
    }" alt="" />
    <section class="d-flex flex-column col-md-5 p-0">
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h3>${product.name}</h3>
          <h5>Prix : ${product.price / 100} €</h5>
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

  document.querySelector("button").addEventListener("click", () => addToStorage());
}

getItem();