const express = require("express");
const app = express();
const { Todo } = require("./models");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", async (req, res) => {
  const allTodos = await Todo.getTodos();
  if (req.accepts("html")) {
    res.render("index", {
      allTodos,
    });
  } else {
    res.json(allTodos);
  }
  app.get("/todos", async (req, res) => {
    try {
      const todos = await Todo.findAll({ order: [["id", "ASC"]] });
      return res.json(todos);
    } catch (error) {
      console.log(error);
      return res.status(422).json(error);
    }
  });

  app.post("/todos", async (req, res) => {
    console.log("Body : ", req.body);
    try {
      const todo = await Todo.addTodo({
        title: req.body.title,
        dueDate: req.body.dueDate,
        completed: false,
      });
      return res.json(todo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });
});

module.exports = app;
