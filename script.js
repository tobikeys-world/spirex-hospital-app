const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");
const doctorSelect = document.getElementById("doctor");
const dateInput = document.getElementById("date");
const doctorButtons = document.querySelectorAll(".doctor-btn");

// Set minimum appointment date to today
const today = new Date();
const formattedToday = today.toISOString().split("T")[0];

dateInput.min = formattedToday;


// Doctor selection buttons
doctorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedDoctor = button.dataset.doctor;

        doctorSelect.value = selectedDoctor;

        document
            .getElementById("appointment")
            .scrollIntoView({
                behavior: "smooth"
            });

        formMessage.textContent =
            `${selectedDoctor} has been selected. Please complete the appointment form.`;

        formMessage.style.color = "#0f766e";
    });
});


// Appointment form submission
appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const patientName =
        document.getElementById("patientName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const doctor =
        doctorSelect.value;

    const service =
        document.getElementById("service").value;

    const appointmentDate =
        dateInput.value;

    const appointmentTime =
        document.getElementById("time").value;


    // Check that all fields are completed
    if (
        !patientName ||
        !email ||
        !phone ||
        !doctor ||
        !service ||
        !appointmentDate ||
        !appointmentTime
    ) {
        formMessage.textContent =
            "Please complete all appointment details.";

        formMessage.style.color = "#dc2626";

        return;
    }


    // Prevent booking a past date
    const selectedDate = new Date(appointmentDate);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
        formMessage.textContent =
            "Please select today or a future appointment date.";

        formMessage.style.color = "#dc2626";

        return;
    }


    // Format the date for the confirmation message
    const formattedDate = selectedDate.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );


    // Display confirmation
    formMessage.innerHTML = `
    <strong>✓ Appointment Confirmed!</strong><br>
    Thank you, ${patientName}.<br>
    Your appointment with <strong>${doctor}</strong>
    for <strong>${service}</strong>
    is scheduled for <strong>${formattedDate}</strong>
    at <strong>${appointmentTime}</strong>.
  `;

    formMessage.style.color = "#0f766e";


    // Reset the form
    appointmentForm.reset();

    // Keep today's date as the minimum after reset
    dateInput.min = formattedToday;
});