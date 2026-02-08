const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE_NAME = "data/bus.json";
const TOTAL_SEATS = 40;

// Initialize seats
if (!fs.existsSync(FILE_NAME)) {
  const seats = [];
  for (let i = 1; i <= TOTAL_SEATS; i++) {
    seats.push({
      seat_no: i,
      is_booked: false,
      name: "EMPTY",
      phone: "-",
      time: ""
    });
  }
  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(FILE_NAME, JSON.stringify(seats, null, 2));
}

// API to get seats
app.get("/seats", (req, res) => {
  const seats = JSON.parse(fs.readFileSync(FILE_NAME));
  res.json(seats);
});

// API to book seat
app.post("/book", (req, res) => {
  const seats = JSON.parse(fs.readFileSync(FILE_NAME));
  const { seat_no, name, phone } = req.body;

  const seat = seats.find(s => s.seat_no === seat_no);

  if (!seat || seat.is_booked) {
    return res.status(400).json({ message: "Seat unavailable" });
  }

  seat.is_booked = true;
  seat.name = name;
  seat.phone = phone;
  seat.time = new Date().toLocaleString();

  fs.writeFileSync(FILE_NAME, JSON.stringify(seats, null, 2));
  res.json({ message: "Seat booked successfully" });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});