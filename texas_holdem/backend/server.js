const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var Promise = require('bluebird');
const pgp = require('pg-promise')();

const db = pgp({
  database: 'texas_holdem_db'
});
const uuid = require('uuid');

const app = express();
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(cors());


app.get('/api/tables', (req, resp, next) => {

  var data = {}
  db.any('SELECT DISTINCT category from tablelist')
    .then(function(categories){
      data.category = categories;
       db.any(`
     select * from tablelist`)
   .then(function(tables){
     data.table = tables;
     resp.json(data)
   })
 }).catch(next);
})

//grab user information

app.post('/api/tables/userInfo', (req, resp, next) => {
  let user_id = req.body.id;
  console.log('in the userInfo')
  console.log('user_id',user_id)
  db.one(`
    select * from account
    where id = $1`,[user_id])
  .then(user => resp.json(user))
  .catch(next);
})

// app.get('/api/tables', (req, resp, next) => {
//   db.any('select * from table')
//     .then(account => resp.json(account))
//     .catch(next);
// });

app.post('/api/user/modifyChips', (req, resp, next) => {
  let user_id = req.body.user_id;
  let chips = req.body.chips;
  let aichip = req.body.aichip;
  let table_id = req.body.table_id;
  console.log('in the moifyChips')
  console.log('user_id',user_id)
  console.log('chips',chips)
  console.log('aichip',aichip)
  console.log('tabie',table_id)
  db.one(`
    UPDATE account
    SET chips = $1
    WHERE id = $2 returning *`, [chips, user_id])
  .then(function(user){
    return db.one(`
      UPDATE tablelist
      SET aichips = $1
      WHERE id = $2 returning *`, [aichip, table_id]
    )
  }).then(

    user => {
    console.log('info:', user)
    resp.json(user)})
  .catch(next);

})

app.get('/api/tables/:id', (req, resp, next) => {
  let table_id = req.params.id;
  let user_id = req.query.user_id;
  console.log('user_id', user_id);
  var table_info = {}
  db.one(`
    select * from tablelist
    where id = $1`,[table_id])
  .then(function(table){
    table_info.table = table;
    return db.one(`select * from account
    where id = $1`,[user_id])
  }).then(function(account){
    table_info.account = account
    resp.json(table_info)
  }).catch(next)


})

app.post('/api/user/signup', (req, resp, next) =>{
  let user_name = req.body.username;
  let name = req.body.name;
  let password = req.body.password;
  let email = req.body.email;
  bcrypt.hash(password, 10)
    .then(function(encrypted){
      return db.one(`
        insert into account values(default, $1, $2, $3, $4)
        returning *
        `, [user_name, name, encrypted, email]);
    })
    .then(page => resp.json(page))
    .catch(next);
})

app.post('/api/user/login', (req, resp, next) => {
  let user_name = req.body.username;
  let password = req.body.password;
  var matched
  db.one(`
    SELECT * from account
    WHERE username = $1`, [user_name])
    .then(function(data){
      matched = bcrypt.compare(password, data.password)
      return (data);
    })
    .then(function(data){
      if (matched){
        let token = uuid.v4()
        console.log(token);
        db.none(`
          insert into auth_token values(default, $1, $2)`,[token, data.id])
        data.token = token

        resp.json(data)

      } else{

      }
    }).catch(next);
})

app.use(function authentication(req, resp, next){
  let token = req.body.token || req.query.token;
  console.log('token:',token);
  if (token){

    db.oneOrNone(`
      Select * from auth_token where auth_token = $1`,[token])
    .then(function(user){

      if (user){
        console.log('passed');
        next();
      }
      else{
        console.log('blocked');
        resp.json('unauthorized');
      }
    })

  }
  else {
    resp.json('unauthorized');
  }
})

app.post('/api/user/createtable', (req, resp, next) => {
  let account_id = req.body.account_id;
  let table_name = req.body.table_name;
  let aichips = req.body.aichips;
  let probability_assist = req.body.probability_assist;
  db.one(`
      insert into tablelist values(default, default, $1, $2, $3, $4)
      returning *
      `, [account_id, table_name, aichips, probability_assist])

  .then(page => resp.json(page))
    .catch(next);
})

app.post('/api/shopping_cart', (req, resp, next) => {
  let table_id = req.body.table_id;
  let account_id = req.body.account_id;
  db.none(`
    INSERT into shopping_cart values(default, $1, $2)`,[table_id, account_id])
  .then(function(data){
    resp.json(data);
  }).catch(next);
});

app.get('/api/shopping_cart', (req, resp, next) =>{
  let account_id = req.query.account_id;
  db.any(`
    SELECT * from shopping_cart
    where account_id = $1`,[account_id])
  .then(function(data){
    resp.json(data);
  }).catch(next);
})

app.post('/api/shopping_cart/checkout', (req, resp, next) =>{
  let account_id = req.body.account_id;
  console.log('starting checkout');
  db.any(`
    SELECT * from shopping_cart
    where account_id = $1`,[account_id])
  .then(function(data){
    console.log('starting mapping');
    console.log(data);
     var promises = data.map((table)=>{
      db.none(`
        INSERT into purchase values(default, $1, $2)`,[table.table_id, table.account_id])
    })
    console.log('starting promises');
    return Promise.all(promises)

  }).then(function(data){
    db.none(`DELETE FROM shopping_cart
    WHERE account_id = $1`,[account_id])

  }).then(function(){
    resp.json('done');
  }).catch(next);

})

app.listen(4000, () =>{
  console.log('listening to 4000 yo');
});
