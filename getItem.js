async function getItem() {
  let getUrl = window.location.search;
  const searchParams = new URLSearchParams(getUrl);

  let response = await getProducts(searchParams.get("id"));
  document.getElementById("img").src = response.imageUrl;
}
getItem();
