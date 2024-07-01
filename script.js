document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const sortSelect = document.getElementById("sort");

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      productList.innerHTML = "<p>Failed to fetch products.</p>";
    }
  }

  function displayProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
              <h2>${product.name}</h2>
              <p>Email: ${product.email}</p>
              <p>Website: ${product.website}</p>
          `;
      productList.appendChild(productElement);
    });
  }

  function sortProducts(products, criteria) {
    return products.sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
  }

  async function init() {
    const products = await fetchProducts();
    if (products) {
      displayProducts(products);

      sortSelect.addEventListener("change", (event) => {
        const sortedProducts = sortProducts(products, event.target.value);
        displayProducts(sortedProducts);
      });
    }
  }

  init();
});
