/** Amazon SES email sending errors
 * links: https://docs.aws.amazon.com/ses/latest/dg/troubleshoot-error-messages.html
 */
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
// DynamoDBClient
import dotenv from 'dotenv'
dotenv.config()

const SES_CONFIG = {
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
  region: `${process.env.AWS_SES_REGION}`
}

/** Create SES sendRegisterVerificationMail service object */
const sesClient = new SESClient(SES_CONFIG)

export const sendRegisterVerificationMail = async (user: any, token: any) => {
  try {
    const params = {
      Source: `${process.env.AWS_SES_SENDER}`,
      Destination: {
        ToAddresses: [
          user.email
        ]
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          // Html: {
          //   Charset: 'UTF-8',
          //   Data: `
          //   <h1>Hello, ${user.name}</h1>
          //   <p>Thanks for registering on our site.</p>
          //   <p>click the link to verify: ${process.env.PROTOCOL}://${process.env.DOMAIN}/api/verify/${token.token}</p>`,
          // },
          Text: {
            Charset: 'UTF-8',
            Data: `Hello ${user.name}, click the link to verify: ${process.env.PROTOCOL}://${process.env.DOMAIN}/api/verify/${token.token}`,
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Identity FS - Email Address Verification Request for register`,
        }
      },
    }
    const sendEmailCommand = new SendEmailCommand(params)
    const res = await sesClient.send(sendEmailCommand);
    console.log("register verification email has been sent!", res);
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      console.error("error in email service ", error.response.body, "Please contact us for assistance!")
    }
  }
}

/** Create SES sendResetPasswordMail service object */
export const sendResetPasswordMail = async (user: any, token: any) => {
  try {
    const params = {
      Source: `${process.env.AWS_SES_SENDER}`,
      Destination: {
        ToAddresses: [
          user.email
        ]
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          // Html: {
          //   Charset: 'UTF-8',
          //   Data: `
          //   <h1>Hello, ${user.name}</h1>
          //   <p>Thanks for registering on our site.</p>
          //   <p>click the link to verify: ${process.env.PROTOCOL}://${process.env.DOMAIN}/api/verify/${token.token}</p>`,
          // },
          Text: {
            Charset: 'UTF-8',
            Data: `Hello ${user.name}, someone (hopefully you) requested a password reset for this account. 
            For security reasons, this link is only valid for four hours.
            if you did not request this reset, please ignore this email.
            Here is the link: ${process.env.PROTOCOL}://${process.env.DOMAIN}/resetPassword/${token.token}`,
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Identity FS - Reset Password Request`,
        }
      },
    }
    const sendEmailCommand = new SendEmailCommand(params)
    const res = await sesClient.send(sendEmailCommand);
    console.log("Reset password email has been sent!", res);
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      console.error("error in email service ", error.response.body, "Please contact us for assistance!")
    }
  }
}

/** Create SES sendResetPasswordMail successfully service object */
export const sendResetPasswordSuccessfullyMail = async (user: any) => {
  try {
    const params = {
      Source: `${process.env.AWS_SES_SENDER}`,
      Destination: {
        ToAddresses: [
          user.email
        ]
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          // Html: {
          //   Charset: 'UTF-8',
          //   Data: `
          //   <h1>Hello, ${user.name}</h1>
          //   <p>Thanks for registering on our site.</p>
          //   <p>click the link to verify: ${process.env.PROTOCOL}://${process.env.DOMAIN}/api/verify/${token.token}</p>`,
          // },
          Text: {
            Charset: 'UTF-8',
            Data: `Hello ${user.name}, reset password successfully!`,
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Identity FS - Reset Password Successfully`,
        }
      },
    }
    const sendEmailCommand = new SendEmailCommand(params)
    const res = await sesClient.send(sendEmailCommand);
    console.log("Reset password successfully email has been sent!", res);
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      console.error("error in email service ", error.response.body, "Please contact us for assistance!")
    }
  }
}

// module.exports = { sendRegisterVerificationMail, sendResetPasswordMail }