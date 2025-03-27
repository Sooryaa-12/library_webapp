// // File: app/api/send-rejection-email/route.js

// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { userEmail, userName, bookTitle, rejectionReason } = body;
    
//     // Validate inputs
//     if (!userEmail || !userName || !bookTitle || !rejectionReason) {
//       return NextResponse.json(
//         { message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }
    
//     // Create email transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
    
//     // Format the email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: `Book Renewal Request - Rejected: ${bookTitle}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
//           <div style="background: linear-gradient(to right, #4f46e5, #8b5cf6); padding: 20px; color: white; border-radius: 5px 5px 0 0;">
//             <h1 style="margin: 0; font-size: 24px;">Book Renewal Request Update</h1>
//           </div>
          
//           <div style="padding: 20px;">
//             <p>Dear ${userName},</p>
//             <p>Your request to renew <strong>${bookTitle}</strong> has been reviewed and unfortunately, we are unable to approve your request at this time.</p>
            
//             <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #4f46e5; margin: 20px 0;">
//               <p style="margin: 0;"><strong>Reason for Rejection:</strong></p>
//               <p style="margin: 10px 0 0 0;">${rejectionReason}</p>
//             </div>
            
//             <p>Please return the book by its original due date to avoid any late fees.</p>
//             <p>If you have any questions or would like to discuss this further, please contact the library staff.</p>
            
//             <p style="margin-top: 30px;">Best regards,<br>Library Management Team</p>
//           </div>
          
//           <div style="background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; font-size: 12px; color: #666;">
//             <p>This is an automated email. Please do not reply to this message.</p>
//           </div>
//         </div>
//       `,
//     };
    
//     // Send the email
//     await transporter.sendMail(mailOptions);
    
//     return NextResponse.json(
//       { message: 'Rejection email sent successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error sending rejection email:', error);
    
//     return NextResponse.json(
//       { message: 'Failed to send rejection email', error: error.message },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const body = await request.json()
    const { userEmail, userName, bookTitle, rejectionReason } = body

    // Validate inputs
    if (!userEmail || !userName || !bookTitle || !rejectionReason) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Format the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Book Renewal Request - Rejected: ${bookTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <div style="background: linear-gradient(to right, #4f46e5, #8b5cf6); padding: 20px; color: white; border-radius: 5px 5px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Book Renewal Request Update</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear ${userName},</p>
            <p>Your request to renew <strong>${bookTitle}</strong> has been reviewed and unfortunately, we are unable to approve your request at this time.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #4f46e5; margin: 20px 0;">
              <p style="margin: 0;"><strong>Reason for Rejection:</strong></p>
              <p style="margin: 10px 0 0 0;">${rejectionReason}</p>
            </div>
            
            <p>Please return the book by its original due date to avoid any late fees.</p>
            <p>If you have any questions or would like to discuss this further, please contact the library staff.</p>
            
            <p style="margin-top: 30px;">Best regards,<br>Library Management Team</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; font-size: 12px; color: #666;">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Rejection email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending rejection email:", error)

    return NextResponse.json({ message: "Failed to send rejection email", error: error.message }, { status: 500 })
  }
}

