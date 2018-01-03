var light=require("ueklight");
var mysql=require("./mysql");
var router=light.Router();
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});
})

router.get("/fetch",function (req,res) {
    mysql.query("select * from demos",function (err,result) {
        if(err){
            console.log(err);
            res.end();
        }else{
           // res.render('index.html',{data:result});
            res.send(JSON.stringify(result));
        }
    })
})

router.get("/del/:id",function (req,res) {
    var id=req.params.id.substr(0);
    mysql.query("delete from demos where id="+id,function (err,result) {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.send("ok");
        }
    })
})

router.get("/addCon",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    mysql.query(`insert into demos (name,age,sex) values("${name}","${age}","${sex}")`,
        function (err,result) {
        if(err){
            res.end("err");
        }else{
            res.send("ok");
        }
    })
})

router.get("/edit/:id",function (req,res) {
    var id=req.params.id;
    mysql.query("select * from demos where id="+id,function (err,result) {
        if(err){
            res.end("err");
        }else{
            res.send(JSON.stringify(result));
        }
    })
})

router.get("/editCon",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    var id=req.query.id;
    mysql.query(`update demos set name="${name}",age="${age}",sex="${sex}" where id=`+id,function (err,result) {
        if(err){
            res.end("err");
        }else{
            res.send("ok");
        }
    });
})

