import express from "express";

const router = express.Router();

router.get("/welcome", (req, res) => {
  try {
    res.status(200).json({ message: "Hi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error from the backend", error: error.message });
  }
});

export default router;
