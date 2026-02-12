const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE = "data/bus.json";
const TOTAL_SEATS = 40;

// Initialize data
if (!fs.existsSync(FILE)) {
  fs.mkdirSync("data", { recursive: true });
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
  fs.writeFileSync(FILE, JSON.stringify(seats, null, 2));
}

function readSeats() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function writeSeats(seats) {
  fs.writeFileSync(FILE, JSON.stringify(seats, null, 2));
}

// ---- API ROUTES ----
app.get("/seats", (req, res) => {
  try {
    res.json(readSeats());
  } catch (err) {
    res.status(500).json({ error: "Failed to read seats" });
  }
});

app.get("/passengers", (req, res) => {
  try {
    res.json(readSeats());
  } catch (err) {
    res.status(500).json({ error: "Failed to read passengers" });
  }
});

app.post("/book", (req, res) => {
  const { seat_no, name, phone } = req.body;
  const seats = readSeats();
  const seat = seats.find(s => s.seat_no === seat_no);

  if (!seat || seat.is_booked) {
    return res.status(400).json({ message: "Seat unavailable" });
  }

  seat.is_booked = true;
  seat.name = name;
  seat.phone = phone;
  seat.time = new Date().toLocaleString();

  writeSeats(seats);
  res.json({ message: "Seat booked successfully" });
});

app.post("/cancel", (req, res) => {
  const seat_no = Number(req.body.seat_no);
  const seats = readSeats();
  const seat = seats.find(s => s.seat_no === seat_no);

  if (!seat || !seat.is_booked) {
    return res.status(400).json({ message: "Seat not booked" });
  }

  seat.is_booked = false;
  seat.name = "EMPTY";
  seat.phone = "-";
  seat.time = "";

  writeSeats(seats);
  res.json({ message: "Booking cancelled" });
});

// ---- START SERVER ----
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});