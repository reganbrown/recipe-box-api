import express from "express";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/recipes/:id", (req, res) => {
  let recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));
  let recipe = recipes.find((recipe) => {
    if (recipe.id === req.params.id) {
      return recipe;
    }
  });
  res.send(recipe);
});

app.get("/recipes", (req, res) => {
  let recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));
  let list = [];
  recipes.map((recipe) => {
    list.push({ id: recipe.id, name: recipe.name });
  });
  res.send(list);
});

app.post("/recipes", (req, res) => {
  let recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));
  const { name, ingredients, instructions } = req.body;
  const newRecipe = {
    id: uuidv4(),
    name,
    ingredients,
    instructions,
  };
  res.send(newRecipe);
  recipes.push(newRecipe);
  fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes));
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
