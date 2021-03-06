var express     = require('express');
var extend = require('util')._extend;
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var Project     = require('./app/models/project'); // get the mongoose model
var Issue     = require('./app/models/issue'); // get the mongoose model
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);



app.use(function (req, res, next) {
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, skip, limit');

    // Pass to next layer of middleware
    next();
});


// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();


 // create a new user account (POST http://localhost:8080/api/signup)
 apiRoutes.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.password ) {
        res.json({success: false, msg: 'Please fill in all Data( name, password).'});
    } else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            fullname: req.body.fullname,
            gender: req.body.gender
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: 301, msg: 'Username already exists.'});
            }
            res.json({success: 200, msg: 'Successful created new user.'});
        });
    }
 });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, skip, limit, Authorization");
    next();
});


// connect the api routes under /api/*
app.use('/api', apiRoutes);


//User
 apiRoutes.post('/authenticate', function(req, res) {
     User.findOne({
        name: req.body.name
     }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
        // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                // if user is found and password is right create a token
                var token = jwt.encode(user, config.secret);
                // return the information including token as JSON
                res.json({success: 200, token: 'JWT ' + token});
                } else {
                    res.send({success: 401, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
     });
 });

 apiRoutes.get('/user', passport.authenticate('jwt', { session: false}), function(req, res) {
     var token = getToken(req.headers);
     if (token) {
         var decoded = jwt.decode(token, config.secret);
         User.findOne({
             name: decoded.name
             },{_id: 0, __v: 0 , password: 0}, function(err, user) {
             if (err) throw err;
             if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
             } else {
                res.json({success: 200, msg: {"user": user}});
             }
         });
     } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
     }
 });



getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


//Project
apiRoutes.post('/project', function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        },{_id: 0, __v: 0 , password: 0}, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed.'});
            } else {
                var newProject = new Project({
                    projectName: req.body.projectName,
                    time: 0,
                    programRef: req.body.programRef,
                    userRef: decoded.name
                });
                // save the user
                newProject.save(function(err) {
                    if (err) {
                        return res.json({success: 301, msg: err});
                    }
                    res.json({success: 200, msg: 'Successful created new project.'});
                });
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

apiRoutes.get('/project', function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.find({
            name: decoded.name
        },{_id: 0, __v: 0 , password: 0}, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed.'});
            } else {

                Project.find({ userRef: decoded.name}, {__v: 0}, function (err, projects) {
                    if (err) throw err;
                    projects.forEach(function (k, v, arr) {
                        Project.findOne({ _id : v._id}, function (err, project) {
                            if (err) throw err;
                            var totalTime = 0;
                            Issue.find({projectName: v._id}, function (err, issues) {
                               issues.forEach(function (k, v, arr) {
                                   totalTime =+ v.time;
                               });
                                project.set('time', totalTime);
                                project.save();

                            });
                        });
                    });
                    Project.find({ userRef: decoded.name}, {__v: 0}, function (err, projs) {
                        res.json({success: 200, result: projects});
                    });

                });


            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

apiRoutes.get('/project/:id', function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name,
        },{_id: 0, __v: 0 , password: 0}, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed.'});
            } else {
                Project.findOne({ userRef: decoded.name, _id: req.params.id}, {__v: 0}, function (err, project) {
                    if (err) throw err;
                    var totalTime = 0;
                    Issue.find({projectName: project._id}, function (err, issues) {
                        issues.forEach(function (k, v, arr) {
                            totalTime =+ v.time;
                        });
                        project.set('time', totalTime);
                        project.save();
                    });
                    Project.findOne({ userRef: decoded.name, _id: req.params.id}, {__v: 0}, function (err, proj) {
                        res.json({success: 200, result: proj});
                    });
                });
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

apiRoutes.get('/issue/:project', function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.find({
            name: decoded.name
        },{_id: 0, __v: 0 , password: 0}, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed.'});
            } else {
                Issue.find({ userRef: decoded.name, projectName: req.params.project }, {__v: 0, projectName: 0, userRef: 0}, function (err, projects) {
                    if (err) throw err;
                    res.json({success: 200, result: projects});
                });
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

apiRoutes.post('/issue/:id', function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name,
        },{_id: 0, __v: 0 , password: 0}, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed.'});
            } else {
                Issue.findOne({ userRef: decoded.name, _id: req.params.id }, {}, function (err, project) {
                    if (err) throw err;
                    if(req.body.name) project.set('name', req.body.name);
                    if(req.body.description) project.set('description', req.body.description);
                    if(req.body.time) project.set('time', req.body.time);
                    if(req.body.project) project.set('projectName', req.body.project);
                    project.save();
                    res.json({success: 200, msg: 'Successful edited new Issue.'});
                });
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});


apiRoutes.post('/issue', function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        },{_id: 0, __v: 0 , password: 0}, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed.'});
            } else {
                console.log("start.Issue.newIssue: " + " " + req.body.name + " " + req.body.description + " " + req.body.time + " " + req.body.project + " " + decoded.name);
                var newIssue= new Issue({
                    name: req.body.name,
                    description: req.body.description,
                    time: req.body.time,
                    projectName: req.body.project,
                    userRef: decoded.name
                });
                // save the user
                newIssue.save(function(err) {
                    if (err) {
                        return res.json({success: 301, msg: err});
                    }
                    res.json({success: 200, msg: 'Successful created new Issue.'});
                });
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});
