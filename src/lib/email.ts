import nodemailer from 'nodemailer'

interface StorySubmissionEmailData {
  firstName: string
  lastName: string
  email: string
  storyTitle: string
  submissionId: string
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
    },
  })
}

// Send confirmation email
export const sendStorySubmissionEmail = async (data: StorySubmissionEmailData) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Story Submission Confirmation - A Thousand Voices',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Story Submission Confirmation</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: white;
              border-radius: 10px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #4928fd;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #4928fd;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #666;
              font-size: 16px;
            }
            .content {
              margin-bottom: 30px;
            }
            .greeting {
              font-size: 18px;
              margin-bottom: 20px;
              color: #333;
            }
            .details {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              padding: 5px 0;
            }
            .detail-label {
              font-weight: bold;
              color: #555;
            }
            .detail-value {
              color: #333;
            }
            .submission-id {
              background-color: #e3f2fd;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
              border-left: 4px solid #4928fd;
            }
            .submission-id-label {
              font-size: 14px;
              color: #666;
              margin-bottom: 5px;
            }
            .submission-id-value {
              font-family: 'Courier New', monospace;
              font-size: 16px;
              font-weight: bold;
              color: #4928fd;
            }
            .next-steps {
              background-color: #fff3cd;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #ffc107;
            }
            .next-steps h3 {
              color: #856404;
              margin-top: 0;
              margin-bottom: 15px;
            }
            .next-steps ul {
              margin: 0;
              padding-left: 20px;
            }
            .next-steps li {
              margin-bottom: 8px;
              color: #856404;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
            .contact-info {
              margin-top: 15px;
            }
            .contact-info a {
              color: #4928fd;
              text-decoration: none;
            }
            .contact-info a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">A Thousand Voices</div>
              <div class="subtitle">Afghanistan's Short Story Competition</div>
            </div>
            
            <div class="content">
              <div class="greeting">
                Dear ${data.firstName} ${data.lastName},
              </div>
              
              <p>Thank you for submitting your story to <strong>A Thousand Voices</strong>! We're excited to read your work and are grateful for your participation in our literary community.</p>
              
              <div class="details">
                <div class="detail-row">
                  <span class="detail-label">Story Title:</span>
                  <span class="detail-value">${data.storyTitle}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Submitted by:</span>
                  <span class="detail-value">${data.firstName} ${data.lastName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${data.email}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Submission Date:</span>
                  <span class="detail-value">${new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
              
              <div class="submission-id">
                <div class="submission-id-label">Submission ID</div>
                <div class="submission-id-value">${data.submissionId}</div>
              </div>
              
              <div class="next-steps">
                <h3>What happens next?</h3>
                <ul>
                  <li><strong>Review Process:</strong> Our team will carefully review your story within 2-3 weeks</li>
                  <li><strong>Notification:</strong> You'll receive an email update about the status of your submission</li>
                  <li><strong>Publication:</strong> Selected stories may be featured on our platform or in our anthology</li>
                  <li><strong>Feedback:</strong> We may provide constructive feedback to help you grow as a writer</li>
                </ul>
              </div>
              
              <p>Please keep this submission ID for your records. If you have any questions about your submission, please include this ID in your correspondence.</p>
              
              <p>We believe in the power of storytelling to connect people across cultures and borders. Your voice matters, and we're honored that you've chosen to share it with us.</p>
              
              <p>Best regards,<br>
              The A Thousand Voices Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
              <div class="contact-info">
                <p>Questions? Contact us at <a href="mailto:info@athousandvoices.org">info@athousandvoices.org</a></p>
                <p>Visit our website: <a href="https://athousandvoices.org">athousandvoices.org</a></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
    
    const result = await transporter.sendMail(mailOptions)
    console.log('Confirmation email sent successfully:', result.messageId)
    return result
    
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw new Error('Failed to send confirmation email')
  }
} 