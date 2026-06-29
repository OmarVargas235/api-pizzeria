import { env } from "@config/env.js";
import { transporter } from "./mailer.js";

export class EmailService {
    async sendResetPasswordEmail(email: string, token: string) {
        const resetLink = `${env.FRONTEND_URL}/reset-password?token=${token}`;
        await transporter.sendMail({
            from: `"Auth System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset your password",
            html: `
                <h2>Password Reset</h2>
                <p>You requested a password reset</p>
                <a href="${resetLink}">Click here to reset password</a>
            `,
        });
    }
}
