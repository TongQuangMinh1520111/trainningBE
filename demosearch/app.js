var express = require("express");
var path = require("path");
var app = express();

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

var users = [
	{name: "User1", email: "user1@gmail.com", age: 31}, 
	{name: "User2", email: "user2@gmail.com", age: 20},
	{name: "User1", email: "user1.2@gmail.com", age: 25}
];

app.get('/', function(req, res){
	res.send("<h2>This is my first app</h2>");
})

app.get('/users', function(req, res){
	res.render('index',{
		users: users
	});
})

app.get('/users/search', (req,res) => {
	console.log(req.query);
  var name_search = req.query.name // lấy giá trị của key name trong query parameters gửi lên
	var age_search = req.query.age // lấy giá trị của key age trong query parameters gửi lên
	var result = users.filter( (user) => {
		// tìm kiếm chuỗi name_search trong user name. 
		// Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
		return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === parseInt(age_search)
	})

	res.render('index', {
		users: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
	});
})


app.listen(3000, function () {
  console.log("Your app running on port ");
});
