const express = require('express');
const router = express.Router();

router.post('/webhook', async (req, res) => {
    const body = req.body;
  
    // Check if this is a page subscription
    if (body.object === 'page') {
      body.entry.forEach((entry) => {
        // Process each messaging event
        entry.messaging.forEach(async (event) => {
          if (event.message && event.sender) {
            const senderId = event.sender.id;
            const messageText = event.message.text || 'No text content';
  
            // Compose the Slack message
            const slackMessage = {
              text: `*New Facebook Message*\n• *From:* ${senderId}\n• *Message:* ${messageText}`,
            };
  
            try {
              // Send the message to Slack using the Incoming Webhook URL
              await axios.post(process.env.SLACK_WEBHOOK_URL, slackMessage);
              console.log('✅ Message forwarded to Slack');
            } catch (error) {
              console.error('❌ Error sending message to Slack:', error.message);
            }
          }
        });
      });
      // Respond to Facebook that the message was received
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Return a "404 Not Found" if event is not from a page subscription
      res.sendStatus(404);
    }
  });

module.exports = router;