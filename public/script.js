fetch("/seats")
  .then(res => res.json())
  .then(seats => {
    const div = document.getElementById("seats");

    seats.forEach(s => {
      const btn = document.createElement("button");
      btn.textContent = s.is_booked ? "XX" : s.seat_no;
      btn.disabled = s.is_booked;

      btn.onclick = () => {
        const name = prompt("Name:");
        const phone = prompt("Phone:");

        fetch("/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            seat_no: s.seat_no,
            name,
            phone
          })
        }).then(() => location.reload());
      };

      div.appendChild(btn);
    });
  });