const bcrypt = require("bcryptjs");
const User = require("./models").User;

module.exports = {

    createUser(newUser, callback){

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);

      return User.create({
          username: newUser.username,
          email: newUser.email,
          password: hashedPassword,
          role: newUser.role
      })
      .then((user) => {
          callback(null, user);
      })
      .catch((err) => {
          callback(err);
      });
  },

  getUser(id, callback) {

    User.findById(id)
    .then((user) => {
        callback(null, user);
    })
    .catch((err)=> {
        callback(err);
    });

  },

  getAllUsers(callback) {

    return User.all()
     .then((users) => {
        callback(null, users);
    })
    .catch((err) => {
        callback(err);
    });
  },

  updateUser(id, updatedRole, callback) {

    return User.findById(id)
    .then((user)=> {
        return user.update({role: updatedRole},{fields: ['role']})
        .then(() => {
            callback(null, user)
        })
        .catch((err) => {
            callback(err);
        });
    });

  }


}
