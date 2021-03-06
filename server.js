const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to log');
        }
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Site Under Maintenance',
//         welcomeMessage: 'Sorry the Website is currently undergoing maintenance'
//     })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hi, Welcome to the page'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio',
        welcomeMessage: 'My current portfolio of work'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle that request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

