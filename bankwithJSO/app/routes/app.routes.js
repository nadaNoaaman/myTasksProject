const router = require("express").Router();
const User = require("../controller/app.controller");

router.get("/", User.add);
router.post("/", User.addUserLogic);
router.get("/all", User.showAll);
router.get("/editUser/:id", User.edituser);
router.post("/editUser/:id", User.editUserLogic);
router.get("/single/:id", User.single);
router.get("/delete/:id", User.Delete);
router.get("/AddWithdraw", User.addwithDraw);
router.get("/addCash/:id", User.addCash);
router.post("/addCash/:id", User.addCashLogic);
router.get("/withdraw/:id", User.withdraw);
router.post("/withdraw/:id", User.withdrawLogic);
module.exports = router;
