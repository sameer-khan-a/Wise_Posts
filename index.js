import express from 'express';

const app = new express();
const port = 3000;
const posts = [];

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', {
        title: 'Home',
        posts: posts
    });
})

app.get('/create', (req, res) => {
    res.render('create.ejs', {
        title: "Add a Post",
    });
})

app.post('/create', (req, res) => {
    posts.push(req.body);
    res.redirect('/');
})

app.delete('/', (req, res) => {
    res.redirect('index.js');
})

app.get('/update', (req, res) => {
    res.render('update.ejs', {
        title: 'Update a Post',
    });
})

app.put('/update', (req, res) => {
    res.redirect('index.js');
})