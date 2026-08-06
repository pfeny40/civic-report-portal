import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

const sendComplaintEmail = async (issue) => {
    try {

        console.log("Checking SMTP...");
        await transporter.verify();
        console.log("SMTP VERIFIED");

        console.log("📧 Sending Email...");

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,

            subject: "🚨 New Complaint Submitted",

            html: `
                <h2>New Complaint Submitted</h2>

                <p><b>Title:</b> ${issue.title}</p>
                <p><b>Category:</b> ${issue.category}</p>
                <p><b>Location:</b> ${issue.location}</p>
                <p><b>Description:</b> ${issue.description}</p>
                <p><b>User Email:</b> ${issue.userEmail}</p>
            `,
        });

        console.log("✅ EMAIL SENT");
        console.log(info);

    } catch (err) {

        console.log("❌ EMAIL ERROR");
        console.log(err);

    }
};

export default sendComplaintEmail;