const router = require('express').Router();
const User = require('../../app/models/user');

const List = require('../../app/models/list');
const Item = require('../../app/models/item');
const helpers = require('./helpers');
const passport = require('passport');


//get all users
//We actually won't need this for our app, but good for testing db
router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    console.log('Error getting users route');
    res.send({users})
  })
})

//get user
router.get('/users/:username', (req, res) => {
  var loggedInUserId = req.session.user_id;
  //we want to send in the logged in user's id
  //so we can determine if we should send back secret wishlists
  helpers.getUser(req.params.username, loggedInUserId)
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    res.status(401).send({err});
  })
})

//add new user
/* Example POST data
{
	"username": "newuser",
	"password": (hashed via bcrypt)
}
*/
router.post('/signup', (req, res) => {
  passport.authenticate('local-signup', (err, user) => {
    if (err) {
      res.status(401).send({err: err});
    } else {
      req.session.user_id = user._id;

      //create a default list for the new user
      helpers.createList({
        title: 'Wishlist',
        secret: false,
        user_id: user._id,
        description: 'This is your default wishlist'
      })
      .then((list) => {
        //get the user again which should now have the wishlist
        return helpers.getUserById(user._id);
      })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(401).send({err});
      });
    }
  })(req, res);
});

//user login
/* Example POST data
{
	"username": "newuser",
	"password": (hashed via bcrypt)
}
*/
router.post('/login', (req, res) => {
  passport.authenticate('local-login', (err, user) => {
    if (err) {
      res.status(401).send({err: err});
    } else {
      req.session.user_id = user._id;
      res.send(user);
    }
  })(req, res);
});

//Logs the user out by clearing the session
router.get('/logout', (req, res) => {
  delete req.session.user_id;
  res.send('success')
});

//Sends back the logged in user's info
//We use this in the react app
router.get('/me', (req, res) => {
  var user_id = req.session.user_id;
  helpers.getUserById(user_id)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.send({});
  });
});

//add new list to user
/* Example POST data
{
	"title": "Secret List",
	"secret": true
}
*/
router.post('/lists', (req, res) => {
  var title = req.body.title;
  var secret = req.body.secret;
  var user_id = req.session.user_id;

  helpers.createList({
    title: title,
    secret: secret,
    user_id: user_id
  })
  .then((list) => {
    res.send(list);
  })
  .catch((err) => {
    res.status(401).send({err});
  });
});


//delete list
router.delete('/lists/:id', (req, res) => {
  var list_id = req.params.id;
  var user_id = req.session.user_id;

  helpers.deleteList(user_id, list_id)
  .then((id) => {
    res.send(`Deleted Wishlist: ${id}`);
  })
  .catch((err) => {
    res.status(401).send({err});
  });
});


//update list
/* Example POST data
{
	"title": "New List Name"
}
or
{
	"secret": false
}
*/
router.put('/lists/:id', (req, res) => {
  var list_id = req.params.id;
  var listUpdates = req.body;
  var user_id = req.session.user_id;

  helpers.updateList(user_id, list_id, listUpdates)
  .then((list) => {
    res.send(list);
  })
  .catch((err) => {
    res.status(401).send({err});
  });
});


//add an item to the list (specific to the user)
/* Example POST data
{
	"title": "New Balance - 247 Classic",
  "price": 79.99,
  "comments": "I wear a size 10.5",
  "url": "http://www.newbalance.com/pd/247-classic/MRL247-C.html?dwvar_MRL247-C_color=Navy&default=true#color=Navy&width=D",
  "image_url": "http://nb.scene7.com/is/image/NB/mrl247rb_nb_02_i?$dw_temp_default_gallery$",
  "list_id": "59cab05eec5719b45039976b"
}
*/
router.post('/items', (req, res) => {
  var user_id = req.session.user_id;

  var item = {};
  item.title = req.body.title;
  item.price = req.body.price;
  item.comments = req.body.comments;
  item.url = req.body.url;
  item.image_url = req.body.image_url;
  item.list_id = req.body.list_id;
  item.user_id = user_id;

  helpers.addItem(user_id, item)
  .then((newItem) => {
    res.send(newItem);
  })
  .catch((err) => {
    res.status(401).send({err});
  });
})

//toggle item purchased
/* Example PUT data
{
	"purchased": true
}
*/
router.put('/setPurchased/:id', (req, res) => {
  var item_id = req.params.id;
  var updates = {purchased: req.body.purchased};

  helpers.updateItem(item_id, updates)
  .then((list) => {
    res.send(list);
  })
  .catch((err) => {
    res.status(401).send({err});
  });
});

//delete item
router.delete('/items/:id', (req, res) => {
  var item_id = req.params.id;
  var user_id = req.session.user_id;

  helpers.deleteItem(user_id, item_id)
  .then((id) => {
    res.send(`Deleted Item: ${id}`);
  })
  .catch((err) => {
    res.status(401).send({err});
  });
});



module.exports = router;
