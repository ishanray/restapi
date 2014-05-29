var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 7000,
    router = express.Router(),
    app = express();

/* config */

app.use(bodyParser());
mongoose.connect('mongodb://localhost/fruits');
var fruitSchema = mongoose.Schema({
    name: String,
    color: String
});
var Fruit = mongoose.model('Fruit', fruitSchema);

router.route('/')
    .get(function (req, res) {
        Fruit.find(function(err, fruits) {
            if (err)
                res.send(err);
            res.send(fruits);
        });
    })
    .post(function (req, res) {
        var fruit = new Fruit();
        fruit.name = req.body.name;
        fruit.color = req.body.color;

        fruit.save(function(err) {
            if (err)
                res.send(err);

            res.send({message: "Fruit created"});
        });
    });

router.route('/:fruit_id')
    .put(function(req, res) {
        Fruit.findOne({_id: req.params.fruit_id}, function(err, fruit) {
            fruit.name = req.body.name;
            fruit.color = req.body.color;

            fruit.save(function(err) {
                if (err)
                    res.send(err);
                res.send({message: "Fruit updated"});
            });

        });
    })
    .delete(function (req, res) {
        Fruit.remove({_id: req.params.fruit_id}, function(err) {
            if (err)
                res.send(err);
            res.json({message: "Fruit Deleted!"});
        });
    });

app.use(router);

app.listen(port);