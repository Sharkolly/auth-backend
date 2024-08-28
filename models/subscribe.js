const mongoose = require("mongoose");

const subscribeEmail = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});

const SubscriptionEmail = mongoose.model("emailSubscription", subscribeEmail);

module.exports = SubscriptionEmail ;
