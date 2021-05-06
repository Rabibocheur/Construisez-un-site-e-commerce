async function getItem() {
  let getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);
  let response = await getProducts(searchParams.get("id"));
  const item = document.getElementById("item");

  let colors = "";
  for (let i = 0; i < response.colors.length; i++) {
    colors += `<li class="list-group-item" style="background-color: ${response.colors[i]};">${response.colors[i]}</li>`;
  }

  item.innerHTML = `
  <img class="col-12 col-md-6 col-sm-12 p-0 m-auto m-sm-0 m-md-0 shadow-sm" src="${response.imageUrl}" alt="" />
  <section class="d-flex flex-column col-md-5 p-0">
    <div class="card mb-3 shadow-sm">
      <div class="card-body">
        <h3>${response.name}</h3>
        <h5>Prix : ${response.price}</h5>
        <p>${response.description}</p>
      </div>
    </div>
    <ol class="list-group list-group-numbered mb-3">
      ${colors}
    </ol>
    <button class="btn btn-secondary w-100 shadow mt-auto" type="button">Ajouter au panier</button>
  </section>
  `;

  document.querySelector("button").addEventListener("click", () => {
    let addItem = {
      id: response._id,
      nom: response.name,
      quantite: 1,
      prix: response.price,
      total: response.price,
    };

    let getItems = [];
    if (!localStorage.getItem("items")) {
      getItems.push(addItem);
    } else {
      getItems = JSON.parse(localStorage.getItem("items"));
      let exist = 0;
      for (let i = 0; i < getItems.length; i++) {
        if (response._id === getItems[i].id) {
          getItems[i].quantite += 1;
          getItems[i].total = getItems[i].quantite * getItems[i].prix;
          exist = 1;
        }
      }
      if (!exist) {
        getItems.push(addItem);
      }
    }
    localStorage.setItem("items", JSON.stringify(getItems));
  });
}
getItem();
