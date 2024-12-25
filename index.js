import express from 'express';

const app = new express();
const port = 3000;
var posts = [];

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})
app.use(express.json());
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

app.delete('/Posts/:title', (req, res) => {
    const title = req.params.title;
    const initialLength = posts.length;
    posts = posts.filter(post => post.title !== title);

    if (posts.length < initialLength) {
        res.status(200).json({ message: `Post titled "${title}" deleted.` });
    } else {
        res.status(404).json({ message: `Post titled "${title}" not found.` });
    }
});

app.get('/update', (req, res) => {
    res.render('update.ejs', {
        title: 'Update a Post',
    });
})

app.put('/update', (req, res) => {
    res.redirect('index.js');
})
app.delete('/Posts/:title', (req, res) => {
    const { title } = req.params;
    const index = posts.findIndex(post => post.title === title);
    if (index !== -1) {
        posts.splice(index, 1);
        res.json({ message: `Post '${title}' deleted successfully!` });
    } else {
        res.status(404).json({ message: `Post '${title}' not found.` });
    }
});