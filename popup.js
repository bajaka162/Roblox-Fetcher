let _token = "";
let _fullToken = "";

document.getElementById("fetchBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "fetchCookies" }, (response) => {
    if (!response) {
      alert("Failed to fetch cookies.");
      return;
    }

    _token = response.token || "";
    _fullToken = response.fullToken || "";

    document.getElementById("token").innerText = _token || "No .ROBLOSECURITY cookie found.";
    document.getElementById("fullToken").innerText = _fullToken || "No full token.";

  });
});

document.getElementById("copyToken").addEventListener("click", () => {
  if (_token) navigator.clipboard.writeText(_token);
});

document.getElementById("copyFullToken").addEventListener("click", () => {
  if (_fullToken) navigator.clipboard.writeText(_fullToken);
});
