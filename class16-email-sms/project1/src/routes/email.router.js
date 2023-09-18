import { Router } from "express";
import nodemailer from "nodemailer";
import path from "path";

import { EMAIL, PSW_EMAIL, __dirname } from "../utils/constants.js";

export const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  user: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PSW_EMAIL,
  },
});

router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

    let result = await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Sendig an email using nodemail",
      html: `
      <div>
        <h1>Hi, this is a test email with images</h1>

        <img src="cid:loro"/>
      </div>
      `,
      attachments: [
        {
          filename: "pet-loro.png",
          path: path.join(__dirname, "../", "../", "/public/img/pet-loro.png"),
          cid: "loro",
        },
        {
          filename: "ejercicios.pdf",
          path: path.join(
            __dirname,
            "../",
            "../",
            "/public/file/ejercicios.pdf"
          ),
          cid: "ejercicios",
        },
      ],
    });

    console.log(
      "🚀 ~ file: email.router.js:41 ~ router.post ~ result:",
      result
    );

    res.send({
      result: `Email sent to ${email}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      error: error.message,
    });
  }
});

export default router;
