// ========================================
// HEALTHDESK JAVASCRIPT - PART 2
// ========================================


// ========================================
// LOGOUT
// ========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        alert("You have been logged out.");

        window.location.href = "index.html";

    });

}


// ========================================
// APPOINTMENT FORM
// ========================================

const appointmentForm =
    document.getElementById("appointmentForm");


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function (event) {

            // Stop page from refreshing
            event.preventDefault();


            // Get information from the form
            const studentName =
                document.getElementById("studentName").value;

            const studentId =
                document.getElementById("studentId").value;

            const appointmentDate =
                document.getElementById("appointmentDate").value;

            const appointmentTime =
                document.getElementById("appointmentTime").value;

            const reason =
                document.getElementById("reason").value;

            const notes =
                document.getElementById("notes").value;


            // Create appointment object
            const appointment = {

                id: Date.now(),

                studentName: studentName,

                studentId: studentId,

                date: appointmentDate,

                time: appointmentTime,

                reason: reason,

                notes: notes,

                status: "Pending"

            };


            // Get existing appointments
            let appointments =
                JSON.parse(
                    localStorage.getItem("healthdeskAppointments")
                ) || [];


            // Add new appointment
            appointments.push(appointment);


            // Save appointments
            localStorage.setItem(
                "healthdeskAppointments",
                JSON.stringify(appointments)
            );


            // Tell user it worked
            alert(
                "Your clinic appointment has been submitted!"
            );


            // Clear the form
            appointmentForm.reset();


            // Go to My Appointments
            window.location.href =
                "appointments.html";

        }
    );

}


// ========================================
// DISPLAY APPOINTMENTS
// ========================================

const appointmentsList =
    document.getElementById("appointmentsList");


if (appointmentsList) {

    // Get saved appointments
    const appointments =
        JSON.parse(
            localStorage.getItem("healthdeskAppointments")
        ) || [];


    // If there are no appointments
    if (appointments.length === 0) {

        appointmentsList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📅
                </div>

                <h2>No Appointments Yet</h2>

                <p>
                    You haven't booked a clinic appointment yet.
                </p>

                <a
                    href="appointment.html"
                    class="btn primary-btn">

                    Book an Appointment

                </a>

            </div>

        `;

    }

    // If appointments exist
    else {

        appointmentsList.innerHTML = "";

        appointments.forEach(function (appointment) {

            const appointmentCard =
                document.createElement("div");

            appointmentCard.className =
                "appointment-card";


            appointmentCard.innerHTML = `

                <div class="appointment-header">

                    <h2>
                        🩺 Clinic Appointment
                    </h2>

                    <span class="appointment-status">
                        ${appointment.status}
                    </span>

                </div>


                <div class="appointment-details">

                    <p>
                        <strong>Student:</strong>
                        ${appointment.studentName}
                    </p>

                    <p>
                        <strong>Student ID:</strong>
                        ${appointment.studentId}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${appointment.date}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${appointment.time}
                    </p>

                    <p>
                        <strong>Reason:</strong>
                        ${appointment.reason}
                    </p>

                    ${
                        appointment.notes
                        ?
                        `<p>
                            <strong>Notes:</strong>
                            ${appointment.notes}
                        </p>`
                        :
                        ""
                    }

                </div>


                <button
                    class="cancel-btn"
                    onclick="cancelAppointment(${appointment.id})">

                    Cancel Appointment

                </button>

            `;


            appointmentsList.appendChild(
                appointmentCard
            );

        });

    }

}


// ========================================
// CANCEL APPOINTMENT
// ========================================

function cancelAppointment(id) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmCancel) {

        return;

    }


    // Get appointments
    let appointments =
        JSON.parse(
            localStorage.getItem("healthdeskAppointments")
        ) || [];


    // Remove selected appointment
    appointments =
        appointments.filter(function (appointment) {

            return appointment.id !== id;

        });


    // Save updated appointments
    localStorage.setItem(
        "healthdeskAppointments",
        JSON.stringify(appointments)
    );


    // Refresh page
    location.reload();

}