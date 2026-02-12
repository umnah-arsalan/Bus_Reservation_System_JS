// ---------------- BOOK A SEAT ----------------
function bookSeat() {
  const name = document.getElementById("name").value;
  const seatNo = Number(document.getElementById("seatNo").value);
  const contactNo = document.getElementById("contactNo").value;

  fetch("/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seat_no: seatNo,
      name: name,
      phone: contactNo
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(() => alert("Error booking seat"));
}

// ---------------- AVAILABLE SEATS ----------------
function loadAvailableSeats() {
  fetch("/seats")
    .then(res => res.json())
    .then(seats => {
      const container = document.querySelector(".seats");

      seats.forEach(seat => {
        const no = document.createElement("div");
        no.textContent = seat.seat_no;

        const status = document.createElement("div");
        status.textContent = seat.is_booked ? "Booked" : "Available";
        status.className = seat.is_booked ? "booked" : "free";

        container.appendChild(no);
        container.appendChild(status);
      });
    });
}

// ---------------- CANCEL BOOKING ----------------
function cancelBooking() {
  const seatNo = document.getElementById("seatNo").value;

  fetch("/cancel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seat_no: seatNo })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(() => alert("Cancel failed"));
}

// ---------------- VIEW BOOKINGS ----------------
function loadBookings() {
  fetch("/passengers")
    .then(res => res.json())
    .then(seats => {
      const container = document.querySelector(".passengers");

      seats
        .filter(seat => seat.is_booked)
        .forEach(seat => {
          container.innerHTML += `
            <div>${seat.seat_no}</div>
            <div>${seat.name}</div>
            <div>${seat.phone}</div>
            <div>${seat.time}</div>
          `;
        });
    });
}

// ---------------- SEAT LAYOUT ----------------
function loadSeatLayout() {
  fetch("/seats")
    .then(res => res.json())
    .then(seats => {
      const layout = document.getElementById("layout");
      layout.innerHTML = "";

      seats.forEach(seat => {
        const box = document.createElement("div");
        box.textContent = seat.seat_no.toString().padStart(2, "0");
        box.className = seat.is_booked ? "seat booked" : "seat";

        layout.appendChild(box);
      });
    });
}