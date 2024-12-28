import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get('/', async (req, res) => {
    const response = await axios.get(`${API_URL}/posts`);
    res.render('index.ejs', {
        title: 'Home',
        posts: response.data
    });
})

app.get('/create', (req, res) => {
    res.render('create.ejs', {
        heading: "Add a Post",
    });
})

app.get("/posts/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${parseInt(req.params.id)}`);
      console.log(response.data);
      res.render("modify.ejs", {
        heading: "Edit Post",
        submit: "Update Post",
        post: response.data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
  });

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
    console.log("called");
    try {
      const response = await axios.patch(
        `${API_URL}/posts/${req.params.id}`,
        req.body
      );
      // console.log(response.data);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error updating post" });
    }
  });
  app.get('/api/delete/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);
        // console.log(response.data); // Log the response for debugging
        res.redirect('/'); // Redirect to home or another page after deletion
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Error deleting post');
    }
});

  app.post('/api/posts', async (req, res) => {
    const response = await axios.post(`${API_URL}/create`, req.body);
    // console.log(response);
    res.redirect("/");
  })
        app.listen(port, () => {
          console.log(`App listening on port ${port}.`)
        })

      