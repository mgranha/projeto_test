const sgMail = require("@sendgrid/mail");

export default async function (req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email, message } = req.body;

  const message = {
    from: "mgranha.portfolio@gmail.com",
    to: "marcelo.granha10@gmail.com",
    subject: `Message from ${email}`,
    text,
    html: "<b>Hi Marcelo, </b> <BR><BR>" + message,
    replyTo: "mgranha.portfolio@gmail.com",
  };
  const replyMessage = {
    personalizations: [
      {
        to: [
          {
            email,
          },
        ],
        dynamic_template_data: {
          verb: "",
          adjective: "",
          noun: "",
          currentDayofWeek: "",
        },
        subject: `Message from ${email}`,
      },
    ],
    from: {
      email: "mgranha.portfolio@gmail.com",
    },
    template_id: "d-2622bac8fc974472a40376a9a9d27d09",
  };

  try {
    sgMail.send(message);
    sgMail.send(replyMessage);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send(error);
  }
}
