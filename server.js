const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const allRoute = require("./v1/api/api");
const moment = require("moment");
const { handleError, handleUnknownRoutes } = require("./config/errorHandle");
const logApiCall = require("./middleware/logApiCall");
const socket = require("./config/socket");
require("colors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

app.use(logApiCall);
app.use("/api/v1", allRoute);

const io = socket.init(server);
io.on("connection", (socket) => {
  console.log("A user connected".blue);

  socket.on("disconnect", () => {
    console.log("A user disconnected".red);
  });
});

app.use(handleUnknownRoutes);
app.use(handleError);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
