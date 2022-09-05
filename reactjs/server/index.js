const express = require("express");

const PORT = process.env.PORT || 9999;

const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/list-user", (req, res) => {
  res.json({ 
    "data": [
      {
        "id": 1, "name": "tèo", "age": 18
      },
      {
        "id": 2, "name": "tèo", "age": 18
      },
      {
        "id": 3, "name": "tèo", "age": 18
      },
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
