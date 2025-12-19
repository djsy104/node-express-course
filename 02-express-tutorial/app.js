const express = require("express");
const { products } = require("./data");
const peopleRouter = require("./routes/people");
const app = express();

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const currentTime = new Date().toLocaleTimeString();
  console.log(method, url, currentTime);
  next();
};

app.use(logger);
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/people", peopleRouter);

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
        return product.name.includes(search);
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
//   const { name } = req.body;

//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, msg: "Please provide a name." });
//   }

//   people.push({ id: people.length + 1, name: req.body.name });
//   return res.status(201).json({ success: true, name: req.body.name });
// });

app.all("/*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
