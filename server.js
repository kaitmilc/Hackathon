const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.get("/api/message", (req, res) => {
    res.json({ message: "Hello from Node.js backend!" });
});

// Log errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
