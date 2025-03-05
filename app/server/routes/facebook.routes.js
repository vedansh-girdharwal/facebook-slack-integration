const express = require("express");
const router = express.Router();
router.get("/webhook", async (req, res) => {
  console.log("facebook/webhook");
  console.log("req", req);
  // const mode = req.query['hub.mode'];
  // const token = req.query['hub.verify_token'];
  // const challenge = req.query['hub.challenge'];

  // if (mode && token) {
  //   if (mode === 'subscribe' && token === process.env.FB_VERIFY_TOKEN) {
  //     console.log('✅ Facebook Webhook Verified!');
  //     return res.status(200).send(challenge);
  //   } else {
  //     console.error('❌ Verification failed. Tokens do not match.');
  //     return res.sendStatus(403);
  //   }
  // }
  res.sendStatus(200);
});

module.exports = router;
