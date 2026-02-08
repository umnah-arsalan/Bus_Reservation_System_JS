const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE = "data/bus.json";
const TOTAL_SEATS = 40;

// Initialize seats (like initialize_seats())
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

// Read seats
function getSeats() {
  return JSON.parse(fs.readFileSync(FILE));
}

// Save seats
function saveSeats(seats) {
  fs.writeFileSync(FILE, JSON.stringify(seats, null, 2));
}

// View seats
app.get("/seats", (req, res) => {
  res.json(getSeats());
});

// Book seat
app.post("/book", (req, res) => {
  const { seat_no, name, phone } = req.body;
  const seats = getSeats();
  const seat = seats.find(s => s.seat_no === seat_no);

  if (!seat || seat.is_booked) {
    return res.status(400).json({ message: "Seat unavailable" });
  }

  seat.is_booked = true;
  seat.name = name;
  seat.phone = phone;
  seat.time = new Date().toLocaleString();

  saveSeats(seats);
  res.json({ message: "Seat booked" });
});

// Cancel booking
app.post("/cancel", (req, res) => {
  const { seat_no } = req.body;
  const seats = getSeats();
  const seat = seats.find(s => s.seat_no === seat_no);

  if (!seat || !seat.is_booked) {
    return res.status(400).json({ message: "Seat not booked" });
  }

  seat.is_booked = false;
  seat.name = "EMPTY";
  seat.phone = "-";
  seat.time = "";

  saveSeats(seats);
  res.json({ message: "Booking cancelled" });
});

// View passengers
app.get("/passengers", (req, res) => {
  res.json(getSeats());
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);