const express = require("express");
const { products } = require("./data");
const app = express();

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  return res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  return res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const singleProduct = products.find((product) => product.id === idToFind);

  if (!singleProduct) {
    return res.status(404).json({ message: "That product was not found." });
  }

  return res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, type, cost } = req.query;
  let sortedProducts = [...products];

  if (search) {
    if (type === "text") {
      sortedProducts = sortedProducts.filter((product) => {
        return product.name.startsWith(search);
      });
    } else if (type === "regex") {
      const regex = new RegExp(search, "i");
      sortedProducts = sortedProducts.filter((product) => {
        return regex.test(product.name);
      });
    }
  }

  if (cost) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.price < parseFloat(cost);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }

  return res.status(200).json(sortedProducts);
});

app.all("/*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
