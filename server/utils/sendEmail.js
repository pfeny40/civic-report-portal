import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendComplaintEmail = async (issue) => {
    try {

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.EMAIL_USER,
            subject: "🚨 New Complaint Submitted",

            html: `
                <h2>New Complaint Submitted</h2>

                <p><strong>Title:</strong> ${issue.title}</p>
                <p><strong>Category:</strong> ${issue.category}</p>
                <p><strong>Location:</strong> ${issue.location}</p>
                <p><strong>Description:</strong> ${issue.description}</p>
                <p><strong>User Email:</strong> ${issue.userEmail}</p>

                ${
                    issue.image
                        ? `<p><a href="${issue.image}">View Uploaded Image</a></p>`
                        : ""
                }
            `,
        });

        console.log("✅ Email Sent");
        console.log(data);

    } catch (error) {

        console.log("❌ Email Error");
        console.log(error);

    }
};

export default sendComplaintEmail;