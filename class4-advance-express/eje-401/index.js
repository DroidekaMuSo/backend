const express = require("express");
const displayRoutes = require("express-routemap");

const PORT = 5_000;
const API_BASE_PATH = "/api";
const initialPhrase = "Initial phrase";

let phrase = initialPhrase.toLocaleLowerCase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`${API_BASE_PATH}/phrase`, (req, res) => {
  try {
    res.json({
      message: "Current phrase",
      phrase: phrase,
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:19 ~ app.get ~ error:", error);
  }
});

app.get(`${API_BASE_PATH}/word/:pos`, (req, res) => {
  try {
    const { pos } = req.params;

    if (isNaN(pos)) {
      return res.status(400).json({
        message: `Position invalided ${pos}`,
      });
    }

    const position = Number(pos);
    const words = phrase.split(" ");

    if (pos <= 0 || pos > words.length) {
      return res.status(400).json({ message: "Position out of range" });
    }

    res.json({
      message: `Word found in position ${pos}`,
      seach: words[position - 1],
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:30 ~ app.get ~ error:", error);
  }
});

app.post(`${API_BASE_PATH}/words`, (req, res) => {
  try {
    const { word } = req.body;

    phrase = phrase + ` ${word}`;

    return res.json({
      message: `Word added to the initial phrase`,
      word,
      pos: phrase.split(" ").length,
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:55 ~ app.post ~ error:", error);
  }
});

app.patch(`${API_BASE_PATH}/words/:pos`, (req, res) => {
  try {
    const { pos } = req.params;
    const { word } = req.body;

    if (isNaN(pos)) {
      return res.status(400).json({
        message: "Invalidad position",
      });
    }

    const position = Number(pos);
    const listWords = phrase.split(" ");

    if (position <= 0 || position > listWords.length) {
      return res.status(400).json({
        message: "Position out of range",
      });
    }

    const afterWord = listWords[position - 1];
    listWords[position - 1] = word;
    phrase = listWords.join(" ");

    return res.json({
      message: " ",
      wordUpdated: word,
      afterWord,
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:72 ~ app.patch ~ error:", error);
  }
});

app.delete(`${API_BASE_PATH}/words/:pos`, (req, res) => {
  try {
    const { pos } = req.params;

    if (isNaN(pos)) {
      return res.status(400).json({
        message: "Invalid position",
      });
    }

    const position = Number(pos);
    const listWords = phrase.split(" ");

    if (position <= 0 || position > listWords.length) {
      return res.status(400).json({
        message: "Position out of range",
      });
    }

    const deleteWord = listWords[position - 1];
    listWords.splice(position - 1, 1);

    phrase = listWords.join(" ");

    return res.json({
      message: `${position} has been deleted`,
      delete: deleteWord,
      phrase,
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js:105 ~ app.delete ~ error:", error);
  }
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API running on port ${PORT}`);
});
