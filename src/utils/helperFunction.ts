//const request = require('request-promise');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export const sendEmail = async (params) => {
    try {
        let msg = <any>{
            to: params.to,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL,
                name: params.name || 'Admin'
            },
            subject: params.subject,
            html: params.html,
        };

        if (params.attachments) {
            msg = <any>{
                to: params.to,
                from: {
                    email: process.env.SENDGRID_FROM_EMAIL,
                    name: 'Admin'
                },
                subject: params.subject,
                html: params.html,
                attachments: params.attachments,
            };
        }
        await sgMail.send(msg);
    } catch (error) {
        if (error.response) {
            console.error(error.response.body)
        }
        throw new Error(error);
    }
}