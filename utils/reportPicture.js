const nodemailer = require('nodemailer');

// Set up reportPicture
const reportPicture = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youssefsalah2272002@gmail.com',
    pass: 'zrok nmzo ryyh jyto'
  }
});

const sendReportMassage = async (toEmail, message ) => {
  console.log(toEmail, message)
    const mailOptions = {
      from: 'youssefsalah2272002@gmail.com',
      to: toEmail,
      subject: 'report Picture',
      text: message,
    };
    try {
      await reportPicture.sendMail(mailOptions);
      console.log('report Picture email sent to:', toEmail);
    } catch (error) {
      console.error('Error sending report Picture email:', error);
    }
  };
  
module.exports = sendReportMassage

