async function getItem() {
  let getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);
  let response = await getProducts(searchParams.get("id"));
  const item = document.getElementById("item");
  let colors = "";
  for (let i = 0; i < response.colors.length; i++) {
    colors += `<div class="" style="background-color: ${response.colors[i]};">f</div>`;
  }
  item.innerHTML = `
  <img class="col-6 img-thumbnail" src="${response.imageUrl}" alt="" />
  <section class="col-md-6">
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
      <h1>${response.name}</h1>
        <h4>Prix : ${response.price}</h4>
        <p>${response.description}</p>
        <div class="d-flex">
          ${colors}
        </div>
      </div>
    </div>
  </section>
  `;
}
getItem();
