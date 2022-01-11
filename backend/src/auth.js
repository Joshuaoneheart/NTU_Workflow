const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// 假造的 Model
const User = (() => {
  const users = [
    { id: 1, email: 'fong@test.com', password: '123456' },
    { id: 2, email: 'kevin@test.com', pasword: '123456' }
  ];
  return {
    findUserById: id => users.find(user => user.id === id),
    findUserByEmail: email => users.find(user => user.email === email),
    addUser: ({ email, password }) => {
      const newUser = {
        id: users.length + 1,
        email,
        password
      };
      users.push(newUser);
      return newUser;
    }
  };
})();

// 用於設定 user 資料以何種方式存入 session 。傳統上用 user.id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
  const user = User.findUserById(id);
  if (!user) return done('User Not Exist');
  return done(null, user);
});

// 設定 passport 如何認證
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    const user = User.findUserByEmail(email);
    if (!user) {
      return done(null, false, 'Invalid Credentials');
    }
    if (user.password !== password) {
      return done(null, false, 'Invalid credentials');
    }
    return done(null, user);
  })
);

function signup({ email, password, req }) {
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  // 為 demo 方便省略加密密碼
  if (User.findUserByEmail(email)) {
    throw new Error('Email in use');
  }
  return User.addUser({ email, password });
}

// 會觸發 'local-storage' 做驗證，驗證成功會回傳 user
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return reject(err);
      }
      if (!user) {
        return reject(new Error('Invalid credentials.'));
      }

      return req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };