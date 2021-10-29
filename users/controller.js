const User = require('./model');
const bcrypt = require('bcrypt');
module.exports = {
  index: async (req, res) => {
    try {
      res.render("admin/user/view_signin");
    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }).then();
      if (user) {
        if (user.status === 'Y') {
          const checkPassword = bcrypt.compare(password, user.password);
          if (!checkPassword) {
              res.redirect('/')
          } else {
            // req.session.user = {
            //   id: user._id,
            //   email:user.email
            // }
            res.redirect('/dashboard')
          }
        }
      } else {
        console.log('email anda salah');
        res.redirect('/')
      }
    } catch (err) {
      console.log(err);
    }
  },
};
