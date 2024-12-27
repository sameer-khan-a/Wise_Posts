import express from 'express';

const app = new express();
const port = 4000;
let posts = [
    {
      id: 1,
      title: "The Rise of Decentralized Finance",
      content:
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
      author: "Alex Thompson",
      date: "2023-08-01T10:00:00Z",
    },
    {
      id: 2,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content:
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
    },
    {
      id: 3,
      title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
      content:
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
      author: "Samuel Green",
      date: "2023-08-10T09:15:00Z",
    },
  ];
  let oldId = posts.length;
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  


app.get('/posts', (req, res) => {
    res.json(posts);
  })

app.post('/create', (req, res) => {
  var newId = oldId + 1;
    var newPost = {
      id: newId,
      author: req.body.author,
      title: req.body.title,
      content: req.body.content
    }
    newId+=1;
    posts.push(newPost);
    res.json(newPost);
})
app.get('/posts/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var post = posts.find((post) => post.id === id);
    console.log(post);
    post?res.json(post):res.status(404).json({error: 'post does not exist'});
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

app.patch('/posts/:id', (req, res) => {
    var currentPost = posts.find((p) => p.id === parseInt(req.params.id));
      req.body.title?currentPost.title = req.body.title:currentPost.title;
      req.body.content?currentPost.content = req.body.content:currentPost.content;
      req.body.author?currentPost.author = req.body.author:currentPost.author;
    currentPost?res.json(currentPost):res.status(404).res.json({error: 'post does not exist'});
    })
    app.listen(port, () => {
        console.log(`App listening on port ${port}.`)
    })