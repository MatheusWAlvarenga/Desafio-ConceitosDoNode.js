const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [ ];

app.get("/repositories", (request, response) => {

  return response.json(repositories)

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

const repository = { id: uuid(), title, url, techs, likes: 0}

repositories.push(repository)

return response.json(repository)

});



app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIdex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIdex === -1) {
    return response.status(400).json({error: "Repositor not found!"})
  }

  const likes = repositories[repositoryIdex].likes
  const repository = { id, title, url, techs, likes}

  repositories[repositoryIdex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIdex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIdex < 0) {
    return response.status(400).json({error: "Repositor not found!"})
  }

  repositories.splice(repositoryIdex, 1)

  return response.status(204).send()


});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIdex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIdex < 0) {
    return response.status(400).json({error: "Repositor not found!"})
  } 

  repositories[repositoryIdex].likes ++


  return response.json(repositories[repositoryIdex])

});

module.exports = app;
