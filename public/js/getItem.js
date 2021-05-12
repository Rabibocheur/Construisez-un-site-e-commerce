getItem();

async function getItem() {
  let getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);
  let response = await getProducts(searchParams.get("id"));

  let colors = "";
  for (let i = 0; i < response.colors.length; i++) {
    colors += `<option style="color: ${response.colors[i]}">${response.colors[i]}</option>`;
  }

  const item = document.getElementById("item");
  item.innerHTML = `
    <img class="col-12 col-md-6 col-sm-12 p-0 m-auto m-sm-0 m-md-0 shadow-sm" src="${
      response.imageUrl
    }" alt="" />
    <section class="d-flex flex-column col-md-5 p-0">
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h3>${response.name}</h3>
          <h5>Prix : ${response.price / 100} €</h5>
          <p>${response.description}</p>
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

  let addItem = {
    id: response._id,
    name: response.name,
    color: null,
    quantity: null,
    price: response.price / 100,
    total: null,
  };

  document.querySelector("button").addEventListener("click", () => {
    addItem.quantity = parseInt(document.querySelector("input").value, 10);
    addItem.total = addItem.quantity * addItem.price;
    addItem.color = document.querySelector("select").value;

    document.querySelector(
      ".modal-title"
    ).innerHTML = `<strong>${addItem.name}</strong> a été ajouté à votre panier !`;
    document.querySelector(".table_order").innerHTML = `
      <tr>
        <td>${addItem.name}</td>
        <td>${addItem.color}</td>
        <td>${addItem.quantity}</td>
        <td>${addItem.price}€</td>
        <td>${addItem.total}€</td>
      </tr>
    `;

    let getItems = [];
    if (!localStorage.getItem("items")) {
      getItems.push(addItem);
    } else {
      getItems = JSON.parse(localStorage.getItem("items"));
      getItems.push(addItem);
    }
    localStorage.setItem("items", JSON.stringify(getItems));
  });
}
