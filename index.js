import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "index.html");
});

app.get("/getphoto", async (req, res) => {
    res.render("getphoto.ejs", {photoUrl: null})
});

app.post("/submit", async (req, res) => {
    let { width, height, grayscale, blurred, blurAmount } = req.body;
    
    let url = `https://picsum.photos/${width}`;
    if (height) url += `/${height}`;
    if (grayscale.toLowerCase() === "grayscale") url += "?grayscale";
    if (blurred.toLowerCase() === "blur") {
        url += grayscale ? `&blur=${blurAmount || 1}` : `?blur=${blurAmount || 1}`;
    }
    
    res.render("getphoto.ejs", { photoUrl: url });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});