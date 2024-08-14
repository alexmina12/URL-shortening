// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.post(
      "https://cleanuri.com/api/v1/shorten",
      new URLSearchParams({ url })
    );
    res.json({ shortUrl: response.data.result_url });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running`);
});
