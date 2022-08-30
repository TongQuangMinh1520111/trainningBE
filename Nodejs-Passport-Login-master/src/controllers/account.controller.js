const AccountController = {
  getLogin : (req, res)=> {
    res.render("login.ejs");
  },

  getMyAccount : (req, res)=> {
    // laays dc id cuar user
    // tu id lay thong tin user de hien thi len layout
    console.log(req.params.id);
    res.render("myAccount.ejs");
  },
}
module.exports = AccountController