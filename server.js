// server.js - Final Version
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files from main folder + public
app.use(express.static(__dirname));
app.use("/public", express.static(path.join(__dirname, "public")));

// Video streaming endpoint
app.get("/videos/:filename", (req, res) => {
  const filePath = path.join(__dirname, "public", "videos", req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Video not found!");

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    stream.pipe(res);
  } else {
    res.writeHead(200, { "Content-Length": fileSize, "Content-Type": "video/mp4" });
    fs.createReadStream(filePath).pipe(res);
  }
});

// 24h verification skip page
app.get("/verification", (req, res) => {
  res.sendFile(path.join(__dirname, "verification.html"));
});

// Default route - index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Example: watch now or episode click logic
// You can handle 24h logic in frontend JS (cookies/localStorage) and redirect to /verification if needed

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));