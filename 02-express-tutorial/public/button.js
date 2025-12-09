const button = document.querySelector("#product-btn");
const container = document.querySelector("#product-container");

button.addEventListener("click", async () => {
  const response = await fetch("/api/v1/products");
  const data = await response.json();

  container.innerHTML = "";

  data.forEach((product) => {
    const productItem = document.createElement("p");
    productItem.textContent = product.name;
    container.appendChild(productItem);
  });
});
