var BRCAPAWS = require("../index.js");

/*const dataInsert = {
  Email: "jeferson@jeferson.com",
  Cargo: "Backend Pleno",
  Salario: 1500.85,
  EstadoId: 52,
};

BRCAPAWS.OpenSearch_create(
  "teste",
  "contato",
  "us-east-1",
  dataInsert,
  function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);*/

const dataList = {
  query: {
    match: {
      Email: "jeferson@jeferson.com",
    },
  },
};

BRCAPAWS.OpenSearch_getFilter(
  "teste",
  "contato",
  "us-east-1",
  dataList,
  function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);