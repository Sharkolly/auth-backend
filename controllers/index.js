const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserAuth = require("../models/user");
const SubscriptionEmail = require("../models/subscribe");

const getData = (req, res) => {
  res.json([{
      id: 1,
      name: "tunde",
      level: 500
    },
    {
      id: 2,
      name: "Tope",
      level: 300
    },
  ]);
};

const handleErrorFromMongoDB = (err) => {
  let error = {
    email: "",
    password: ""
  };
  //check Duplicated Email
  if (err.code === 11000) {
    error["email"] === "Email is already registered";
    return error;
  }
  //Check if there is error in the email or password signup
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).map(({
      properties
    }) => {
      const {
        path,
        message
      } = properties;
      error[path] = message;
    });
  };
  return error;
};

const postSignUp = async (req, res) => {
  const {
    email,
    password,
    userName,
    confirmPassword
  } = req.body;
  const token = jwt.sign({
    email,
    userName
  }, process.env.JWTSECRETKEY);
  const genSalt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, genSalt);
  try {
    // Check if Email exists
    
    // const findEmail = await UserAuth.find({ email });
    // if (!findEmail) {
    //   // Database Sign Up MongoDB
    //   const NewUser = await new UserAuth({ email, hashPassword, token });
    //   const saveToDatabase = await NewUser.save();
    // }
    // if (findEmail) console.log("Email already exists");
    setTimeout(() => {
      res.json({
        token
      });
    }, 1800);
  } catch (err) {
    console.log(err.message);
    const error = handleErrorFromMongoDB(err);
  };
};

const postSignIn = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const token = jwt.sign({ email }, process.env.JWTSECRETKEY);
  console.log('Here:', email, password);
  try {
    //Database Sign In MongoDB
    // const findEmail = await UserAuth.find({ email });
    // if (!findEmail) console.log("Email not found");
    // const comparePassword = await bcrypt.compare(password, findEmail.password);
    // if (!comparePassword) console.log("Wrong Email or Password");

    setTimeout(() => {
      res.json({
        token
      });
    }, 1800);
  } catch (err) {
    console.log(err.message);
  }
};

const subscribe = async (req, res) => {
  const {
    email
  } = req.body;
  console.log(email);
  res.json({
    success: `Email of  is saved already`
  });
  // try {
  //   // Check if user is subscribed already
  //   // const findEmail = await SubsciptionEmail.find({ email });
  //   // if (findEmail) console.log("Email has been subscribed");
  //   // const NewUserSubscribed = await new SubscriptionEmail({ email });
  //   // const saveToDatabase = await NewUserSubscribed.save();

  //   console.log('Worked!!!!');
  // } catch (err) {
  //   console.log(err.message);
  // };
};

const handleSubscribe = async (req, res) => {
  const {
    email
  } = req.body;
  console.log(email);
  res.json('seen')
}

module.exports = {
  getData,
  postSignIn,
  postSignUp,
  subscribe,
  handleSubscribe
};