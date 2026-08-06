import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendComplaintEmail = async (issue) => {
    try {
        console.log("Sending Email...");
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,

            subject: "🚨 New Civic Complaint Submitted",

            html: `
                <h2>New Complaint Submitted</h2>

                <p><b>Title:</b> ${issue.title}</p>

                <p><b>Category:</b> ${issue.category}</p>

                <p><b>Location:</b> ${issue.location}</p>

                <p><b>Description:</b> ${issue.description}</p>

                <p><b>User Email:</b> ${issue.userEmail}</p>

                ${
                    issue.image
                        ? `<p><a href="${issue.image}">View Image</a></p>`
                        : ""
                }

                <hr/>

                <p>Please login to the Admin Panel.</p>
            `,
        });

        console.log("✅ Email Sent Successfully");

    } catch (error) {

        console.log("❌ Email Error:", error.message);

    }
};

export default sendComplaintEmail;