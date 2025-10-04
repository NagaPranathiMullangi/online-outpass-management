import nodemailer from "nodemailer";
import QRCode from "qrcode";

const generateQRCode = async (data) => {
  try {
    const qrCodeURL = await QRCode.toDataURL(data);
    return qrCodeURL;
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
};

const mailer = (studentEmail, qrCodeURL, imageUrl) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: process.env.PORT || 5000,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const base64Content = qrCodeURL.split(",")[1];

  const mailOptions = {
    from: {
      name: "Outpass System",
      address: process.env.USER,
    },
    to: studentEmail,
    subject: "OUTPASS APPROVED...!!",
    html: `
    <p>Dear Student,</p>
    <p>Your outpass has been approved by the warden.</p>
    <p>Please find your QR code below for verification:</p>
    <img src="cid:qrCodeImage" alt="QR Code" style="width:200px; height:200px;" />
    <p>You can also access your consent image by clicking <a href="${imageUrl}" target="_blank">Parent Consent</a>.</p>
    <p>Scan this QR code at the gate for verification.</p>
    <p>Best regards,<br>Student Outpass System</p>
  `,
    attachments: [
      {
        filename: "qrcode.png", // The name of the file
        content: base64Content, // Attach the Base64 content
        encoding: "base64", // Specify that it's Base64 encoded
        cid: "qrCodeImage", // Content ID for referencing in the email HTML
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const Approve = async (enrollment, studentEmail, fromDate, toDate, ImageURL) => {
  // Data for QR code with proper alignment
  const qrData = `
Student ID: ${enrollment}
Status: Approved
Email: ${studentEmail}
From: ${fromDate}
To: ${toDate}
Image Link: ${ImageURL}
`;

  // Generate QR Code
  const qrCodeURL = await generateQRCode(qrData);

  // Send Email with QR Code and image link
  await mailer(studentEmail, qrCodeURL, ImageURL);
};
