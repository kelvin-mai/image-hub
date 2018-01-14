const mongoose = require('mongoose'),
bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

userSchema.pre('save', function(next){
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10).then(hash =>  {
      user.password = hash;
      next();
  }, err => next(err));
});

userSchema.methods.comparePassword = function(attempt, next) {
  bcrypt.compare(attempt, this.password, (err, match) => {
    if(err) return next(err);
    next(null, match);
  });
};

module.exports = mongoose.model('User', userSchema);
