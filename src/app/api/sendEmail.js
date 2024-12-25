import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chandusiriyala7@gmail.com",
      pass: "olgc dvmq yrsw aeto", // Use environment variables for better security
    },
  });

  const mailOptions = {
    from: "chandusiriyala7@gmail.com",
    to: email, // Send to the entered email
    subject: "Contact Form Submission",
    text: `You have a new message from ${name}:\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
