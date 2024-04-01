import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode");
        const joke = response.data.setup ? `${response.data.setup} ... ${response.data.delivery}` : response.data.joke;
        res.render("index.ejs", { joke }); // Render index.ejs file and pass the joke data
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).send('Failed to fetch joke');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });