const mongoose = require("mongoose"),
User = require("./user");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String
  }]
});

postSchema.pre('remove', function(next){
  User.findById(this.uid).then(user => {
    user.posts.remove(this.id);
    user.save().then(e => {
      next();
    });
  }).catch(err => next(err));
});

module.exports = mongoose.model('Post', postSchema);
