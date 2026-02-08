function viewSeats() {
  fetch("/seats")
    .then(res => res.json())
    .then(seats => {
      document.getElementById("title").innerText = "Seat Status";
      const out = seats.map(
        s => `Seat ${s.seat_no} : ${s.is_booked ? "Booked" : "Available"}`
      ).join("<br>");
      document.getElementById("output").innerHTML = out;
    });
}

function viewLayout() {
  fetch("/seats")
    .then(res => res.json())
    .then(seats => {
      document.getElementById("title").innerText = "Seat Layout";
      let html = "";
      seats.forEach((s, i) => {
        html += s.is_booked ? "[XX] " : `[${String(s.seat_no).padStart(2,"0")}] `;
        if ((i + 1) % 10 === 0) html += "<br>";
      });
      document.getElementById("output").innerHTML = html;
    });
}

function viewPassengers() {
  fetch("/passengers")
    .then(res => res.json())
    .then(seats => {
      document.getElementById("title").innerText = "Passengers";
      let html = "";
      seats.forEach(s => {
        html += `Seat ${s.seat_no} | ${s.name} | ${s.phone} | ${s.time}<br>`;
      });
      document.getElementById("output").innerHTML = html;
    });
}