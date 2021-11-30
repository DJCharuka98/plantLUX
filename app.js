var express=require('express');
var app=express();
var router=express.Router();
var f=require('fs');
var path=require('path');
var bp=require('body-parser');
var sessions=require('express-session');
var handlebars=require('express-handlebars');
var mysql=require('mysql');
var s;
app.use('/all',router);
app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars'); 
app.use(sessions({
    secret:'rehghefhehw58'
}));

app.use(bp.urlencoded({
    extended: true
  }));


app.use(bp.json());
app.use('/',express.static(__dirname));
app.use('/buyer',express.static(__dirname));
app.use('/cartdelete',express.static(__dirname));
app.use('/itempause',express.static(__dirname));
app.use('/itempublish',express.static(__dirname));
app.use('/itemdelete',express.static(__dirname));
app.use('/cart',express.static(__dirname));
app.use('/ship',express.static(__dirname));
router.use('/',express.static(__dirname));
app.get("/",function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
        res.sendFile('home.html',{root:__dirname});
});
/*app.get("/",function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'
    
    });
    s=req.session;
    if(s.name)
    {
       // res.sendFile('home.html',{root:__dirname});
       con.query("SELECT * FROM customer",function(err,result){
           if(err){console.log(err)}
           else
           {
           console.log(result);
           }
       });
    }
    else
    {
res.sendFile('home.html',{root:__dirname});
    }
});*/

app.get("/sellerlogin",function(req,res){
    res.sendFile('indexx.html',{root:__dirname});
});
app.get("/card",function(req,res){
    res.sendFile('debit.html',{root:__dirname});
});
app.get("/payoption",function(req,res){
    res.sendFile('payoption.html',{root:__dirname});
});
app.get("/dashboard",function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux',
        multipleStatements:true});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    
    var sql="SELECT * FROM item WHERE statuss="+"'publish' "+"AND seller_id="+mysql.escape(s.seller_id)+";SELECT * FROM item WHERE statuss="+"'pause' "+"AND seller_id="+mysql.escape(s.seller_id);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result[0]);
            
            res.render('dashboard',
            {
                result:result[0],
                resultt:result[1]
            }
            );
        });
    });
     
   
});

app.get("/Home",function(request,response){
    response.render('allplant');// usually this for home page
   
});
app.get("/sellerorders",function(request,response){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
        
        var sql="SELECT orderitem.quantity,orderitem.order_id,orderitem.customer_address,item.item_name,item.item_id,item.price,item.image FROM orderitem INNER JOIN item ON item.item_id=orderitem.item_id WHERE seller_id="+mysql.escape(s.seller_id)+" AND orderitem.statuss='notship'";
        con.connect(function(err){
            if(err) throw err;
            con.query(sql,function(err,result){
                if(err) throw err;
                console.log(result);
                response.render('sellerorders',{
                    result:result,
                    
                });
               
            });
        });
    
   
   
});
app.get("/shiporder",function(request,response){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
        
        var sql="SELECT orderitem.quantity,orderitem.order_id,orderitem.customer_address,item.item_name,item.item_id,item.price,item.image FROM orderitem INNER JOIN item ON item.item_id=orderitem.item_id WHERE seller_id="+mysql.escape(s.seller_id)+" AND orderitem.statuss='ship'";
        con.connect(function(err){
            if(err) throw err;
            con.query(sql,function(err,result){
                if(err) throw err;
                console.log(result);
                response.render('shiporder',{
                    result:result,
                    
                });
               
            });
        });
    
   
   
});
app.get("/myorder",function(request,response){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
        
        var sql="SELECT item.item_id,item.price,item.image,plantorder.order_id,orderitem.quantity,plantorder.date,item.description FROM ((item INNER JOIN orderitem ON item.item_id=orderitem.item_id) INNER JOIN plantorder ON orderitem.order_id=plantorder.order_id) WHERE custom_id=2";
        //var sql="SELECT * FROM item WHERE category='Plants'";
        con.connect(function(err){
            if(err) throw err;
            con.query(sql,function(err,result){
                if(err) throw err;
                console.log(result);
                response.render('order',{
                    result:result,
                    
                });
               
            });
        });// usually this for home page
   
});
app.get("/cart",function(request,response){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
        
       var sql="SELECT * FROM cartt INNER JOIN item ON cartt.item_id=item.item_id WHERE custom_id=2";
        con.connect(function(err){
            if(err) throw err;
            con.query(sql,function(err,result){
                if(err) throw err;
                console.log(result);
                response.render('cart',{
                    result:result,
                    
                });
               
            });
        });// usually this for home page
   
});
router.get('/:id',function(request,response){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
        var d=request.params['id'];
        console.log(d);
        var sql="SELECT * FROM item WHERE category="+mysql.escape(d);
        //var sql="SELECT * FROM item WHERE category='Plants'";
        con.connect(function(err){
            if(err) throw err;
            con.query(sql,function(err,result){
                if(err) throw err;
                console.log(result);
                response.render('allplant',{
                    result:result,
                    title:d
                });
               
            });
        });
   // usually this for home page
    
});

/*app.post("/user",function(request,response){
    response.sendFile('hom.html',{root:__dirname});// usually this for home page
    response.end("name is "+JSON.stringify(request.body.name));
});*/

app.listen(3003,function(){
    console.log("Server is running");
});
app.post('/user',function(req,res){
    console.log(req.body);
    console.log(JSON.stringify(req.body));

    if(req.body.name=='admin')
    {
    console.log("welcome admin");
    s=req.session;
    s.name=req.body.name;
    
    
    }
    else
    {
        console.log("invalid");
        console.log(JSON.stringify(req.body.name));
        console.log(JSON.stringify(req.body.password));
    }
    res.end("ok");
});
app.post('/checklogin',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    
    var sql="SELECT * FROM customer WHERE email="+mysql.escape(req.body.email);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            if(result.length>0)
            {
            console.log(result[0].email);
            if(result[0].password==req.body.password)
            {
                
                j={"flag":1,"email":req.body.email,"phone_no":result[0].phone_no,
            "address":result[0].address,"username":result[0].username}
            s=req.session;
            s.custom_id=result[0].custom_id;
            }
            else
            {
                j={"flag":2} 
            }
            }
            else
            {
                j={"flag":3}
            }
        });
    });
    res.end(JSON.stringify(j)); 
});
app.get('/cart/:id',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var d=req.params['id'];
    console.log(d);
    var sql="INSERT INTO cartt(custom_id,item_id,cart_item_id) VALUES (2,"+mysql.escape(d)+",NULL)";
    console.log(sql);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.redirect('/cart');
            
           
        });
    });
    
});
app.get('/cartdelete/:id',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var d=req.params['id'];
    console.log(d);
    var sql="DELETE FROM cartt WHERE cart_item_id="+mysql.escape(d);
    console.log(sql);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.redirect('/cart');
            
           
        });
    });
    
});


app.get('/buyer/:id',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var d=req.params['id'];
    console.log(d);
    var sql="SELECT * FROM item WHERE item_id="+mysql.escape(d);
    console.log(sql);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.render('buyerinfo',{
                result:result
            });
           
        });
    });
    
});

app.post('/delivery',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    
    var sql="SELECT * FROM deliveryfee WHERE district="+mysql.escape(req.body.district);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result[0]);
            res.end(JSON.stringify(result[0])); 
        });
    });
    
});

app.post('/loginseller',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    
    var sql="SELECT * FROM seller WHERE email="+mysql.escape(req.body.email);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            if(result.length>0)
            {
            console.log(result[0].email);
            if(result[0].password==req.body.password)
            {
                
                console.log(result[0].seller_id);
                s=req.session;
            s.seller_id=result[0].seller_id;
            console.log( s.seller_id);
                j={"flag":1,"email":req.body.email,"phone_no":result[0].phone_no,
            "address":result[0].address,"username":result[0].username}
            }
            else
            {
                j={"flag":2} 
            }
            }
            else
            {
                j={"flag":3}
            }
        });
    });
    res.end(JSON.stringify(j)); 
});
app.post('/order',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux',
        multipleStatements:true
    });
    console.log(req.body);
    let date=new Date().toISOString().slice(0,10);
    console.log(date);
  
   var sql="INSERT INTO plantorder(order_id,date,paymethod,custom_id) VALUES (NULL,"+mysql.escape(date)
   +","+mysql.escape(req.body.method)+","+s.custom_id+");"
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            var oid=result.insertId;
            console.log(oid);
            sql="INSERT INTO orderitem(order_id,item_id,quantity,statuss,customer_address) VALUES ("+mysql.escape(oid)
            +","+mysql.escape(req.body.item_code)+","+mysql.escape(req.body.purchase)+",'notship',"+mysql.escape(req.body.address)+")";
            con.query(sql,function(err,result){
                if(err) throw err;
                res.redirect("/myorder");
            });

        });
    });
    
});
app.post('/sellerad',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux',
        multipleStatements:true
    });
    console.log(req.body);
    var image="images/"+req.body.formFile;
    var sql="INSERT INTO item VALUES (NULL,"+mysql.escape(req.body.itemname)
   +","+s.seller_id+","+mysql.escape(req.body.qty)+","+mysql.escape(req.body.price)+","+mysql.escape(req.body.category)+
   ","+mysql.escape(req.body.subcategory)+","+mysql.escape(image)+","+mysql.escape(req.body.description)+
   ","+mysql.escape(req.body.keyword)+");"
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){

        res.redirect('/dashboard');
        });
        });
  
   
    
});
app.get('/itempause/:id',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var d=req.params['id'];
    console.log(d);
    var sql="UPDATE item SET statuss='pause' WHERE item_id="+mysql.escape(d);
    console.log(sql);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.redirect('/dashboard');
            
           
        });
    });
    
});
app.get('/itempublish/:id',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var d=req.params['id'];
    console.log(d);
    var sql="UPDATE item SET statuss='publish' WHERE item_id="+mysql.escape(d);
    console.log(sql);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.redirect('/dashboard');
            
           
        });
    });
    
});
app.get('/itemdelete/:id',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var d=req.params['id'];
    console.log(d);
    var sql="DELETE FROM item WHERE item_id="+mysql.escape(d);
    console.log(sql);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.redirect('/dashboard');
            
           
        });
    });
    
});
app.get('/ship/:id',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux'});
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var d=req.params['id'];
    console.log(d);
    var sql="UPDATE orderitem SET statuss='ship' WHERE order_id="+mysql.escape(d);
    console.log(sql);
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log(result);
            res.redirect('/sellerorders');
            
           
        });
    });
    
});

app.post('/signup',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'plantlux',
        multipleStatements:true
    });
    console.log(req.body);
    
    var sql="INSERT INTO customer(email,password,username) VALUES ("+mysql.escape(req.body.sigemail)+","+mysql.escape(req.body.sigpassword)+","+mysql.escape(req.body.fullname)+")";
    con.connect(function(err){
        if(err) throw err;
        con.query(sql,function(err,result){
            console.log(result);
        res.redirect('/');
        });
        });
  
   
    
});
