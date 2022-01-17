const fs = require("fs");
const ValiadtorController = require("./validator.controller");
const { redirect } = require("express/lib/response");
const console = require("console");
const req = require("express/lib/request");

const ReadFromJson = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync("./models/data.json"));
    if (!Array.isArray(data)) throw new Error("data is not array");
  } catch (e) {
    console.log(e.message);
    data = [];
  }
  return data;
};
const writeDataToJson = (data) => {
  try {
    fs.writeFileSync("./models/data.json", JSON.stringify(data));
  } catch (e) {
    console.log(e.message);
  }
};

class User {
  static searchUserIndex = (id, data) => {
    const index = data.findIndex((u) => u.id == id);
    return index;
  };
  static add = (req, res) => {
    res.render("add", { pageTitle: "Add User Post" });
  };

  static addUserLogic = (req, res) => {
    let users = req.body;
    let errors = {};
    //"" 0 +> false     12+=> true
    if (!ValiadtorController.isEmptyString(users.name))
      errors.name = "name is required";
    if (!ValiadtorController.isValidEmail(users.email))
      errors.email = "enter a valid mail";
    if (Object.keys(errors).length > 0)
      return res.render("addWithdraw", {
        pageTitle: "add new user",
        errors,
        user,
      });
    let data = ReadFromJson();
    let user = req.body;
    const id = req.params.id;
    if (data.length == 0) user.id = 1;
    else user.id = data[data.length - 1].id + 1;
    data.push(user);
    writeDataToJson(data);
    res.redirect("/all");
  };

  static showAll = (req, res) => {
    const data = ReadFromJson();
    const isEmpty = data.length == 0;

    res.render("all", { pageTitle: "All Users", data, isEmpty });
  };
  static edituser = (req, res) => {
    const id = req.params.id;
    const data = ReadFromJson();
    const userIndex = this.searchUserIndex(id, data);
    res.render("edituser", { pageTitle: "Edit User", user: data[userIndex] });
  };
  static editUserLogic = (req, res) => {
    const data = ReadFromJson();
    const id = req.params.id;
    const user = { id, ...req.body };
    const userIndex = this.searchUserIndex(id, data);
    data.splice(userIndex, 1, user);
    writeDataToJson(data);

    res.redirect("/all");
  };
  static single = (req, res) => {
    const id = req.params.id;
    const data = ReadFromJson();
    const userIndex = this.searchUserIndex(id, data);

    res.render("single", { pageTitle: "User Info", user: data[userIndex] });
  };
  static Delete = (req, res) => {
    const id = req.params.id;
    const data = ReadFromJson();
    const userindex = this.searchUserIndex(id, data);
    data.splice(userindex, 1);
    writeDataToJson(data);
    res.redirect("/all");
  };
  static addwithDraw = (req, res) => {
    res.render("addWithdraw");
  };

  static addCash = (req, res) => {
    const id = req.params.id;

    res.render("addcash");
  };
  static addCashLogic = (req, res) => {
    const value = req.body.add;
    const id = req.params.id;
    let data = ReadFromJson();
    const userIndex = this.searchUserIndex(id, data);
    data[userIndex].added = value;
    const intial = parseInt(data[userIndex].intial);
    data[userIndex].totalbalance = parseInt(value) + intial;

    writeDataToJson(data);
    res.redirect("/all");
    // console.log(value)
  };
  static withdraw = (req, res) => {
    res.render("withdraw");
  };
  static withdrawLogic = (req, res) => {
    const id = req.params.id;
    let data = ReadFromJson();
    const userIndex = this.searchUserIndex(id, data);
    const value = req.body.value;
    data[userIndex].withdrawed = value;
    const total = parseInt(data[userIndex].totalbalance);
    data[userIndex].totalbalance = total - parseInt(value);
    writeDataToJson(data);
    res.redirect("/all");
  };
}
module.exports = User;
