const router = require("express").Router();
const {
  getData,
  postSignIn,
  postSignUp,
  updateData,
  deleteData,
  subscribe,
  handleSubscribe,
} = require("../controllers/index");

const authenticateToken = require("../middleware");

router.get("/", getData);
router.post("/user", subscribe);
router.post("/signup", postSignUp);
router.post("signupuser", handleSubscribe )
router.post("/signin", postSignIn);
router.post("/subscribe", subscribe);

module.exports = router;