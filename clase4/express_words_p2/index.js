const express = require("express");
const API_BASE_PATH = "/api";

const PORT = 8000;
let initialPhrase = "Hello world";
let phrase = initialPhrase.toLowerCase();

const app = express();

app.use(express.json); // Transforme el body y lo podamos usar en req.body
app.use(express.urlencoded({ extended: true })); //Procesar req.body y los req.query

//TODO:Fetching the whole phrase
app.get(`${API_BASE_PATH}/phrase`, (req, res) => {
  res.json({ ok: true, message: "Current Phrase", phrase: phrase });
});

//TODO: Fetching the word in a cetain position
app.get(`${API_BASE_PATH}/words/:pos`, (req, res) => {
  const wordPosition = req.params.pos;

  //if the param is not a number
  if (isNaN(wordPosition)) {
    return res.status(400).json({
      ok: false,
      message: `The entered position is not valid ${wordPosition}`,
    });
  }

  //convert the param to number
  const position = Number(wordPosition);
  //Split the phrase into an array
  const words = phrase.split(" ");

  if (position <= 0 || position > words.length) {
    return res
      .status(400)
      .json({ ok: false, message: `Position out of range of the phrase` });
  }

  res.json({
    ok: true,
    message: `Word found in position ${position}`,
    search: words[position - 1],
  });
});

//TODO:Adding a word to the phrase
app.post(`${API_BASE_PATH}/words`, (req, res) => {
  const { word } = req.body;

  phrase = phrase + " " + word;
  return res.json({
    ok: true,
    message: `The added word is ${word}`,
    word: `${word}`,
    pos: `${phrase.split(" ").length}`,
  });
});

//TODO:Updating a word to the phrase
app.put(`${API_BASE_PATH}/words/:pos`, (req, res) => {
  const wordPosition = req.params.pos;
  const { word } = req.body;

  if (isNaN(wordPosition)) {
    return res.status(400).json({
      ok: false,
      message: `The position ${wordPosition} is not valid`,
      pos: wordPosition,
    });
  }
  const position = Number(wordPosition);
  const wordsList = phrase.split(" ");

  if (position <= 0 || position > wordsList.length) {
    return res.status(400).json({
      ok: false,
      message: `Position out of reage of the phrase`,
    });
  }

  const before = wordsList[position - 1];
  wordsList[position - 1] = word;
  phrase = wordsList.join(" ");
  res.json({
    ok: true,
    message: "",
    wordUpdated: word,
    before,
  });
});

//TODO:Deleting a word from the phrase
app.delete(`${API_BASE_PATH}/words/:pos`, (req, res) => {
  const wordPosition = req.params.pos;

  if (isNaN(wordPosition)) {
    return res.status(400).json({
      ok: false,
      message: `The entered position is not valid ${wordPosition}`,
      pos: wordPosition,
    });
  }

  const position = Number(wordPosition);
  const wordsList = phrase.split(" ");

  if (position <= 0 || position > words.length) {
    return res
      .status(400)
      .json({ ok: false, message: "Position out of range of the phrase" });
  }

  const wordDeleted = wordsList[position - 1];
  wordsList.splice(position - 1, 1);
  phrase = wordsList.join();

  res.json({
    ok: true,
    message: `Position ${position} was eliminated successfully`,
    wordDeleted: wordDeleted,
  });
});

//Running the port
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
