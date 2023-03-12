/**
 * AES-256-ECB对称加密
 * @param text {string} 要加密的明文
 * @param secretKey {string} 密钥
 * @returns {string} 加密后的密文，Base64格式
 */
function AES_ECB_ENCRYPT(text, secretKey) {
  var encrypted = CryptoJS.AES.encrypt(text, secretKey);
  return encrypted.toString();
}

/**
 * AES-256-ECB对称解密
 * @param textBase64 {string} 要解密的密文，Base64格式
 * @param secretKey {string} 密钥
 * @returns {string} 解密后的明文
 */
function AES_ECB_DECRYPT(textBase64, secretKey) {
  var decrypt = CryptoJS.AES.decrypt(textBase64, secretKey);
  return CryptoJS.enc.Utf8.stringify(decrypt);
}

function do_encrypt() {
  var text = document.getElementById("ciphertext").value;
  var secretKey = document.getElementById("cipherkey").value;
  console.log(text);
  console.log(secretKey);
  var cyphertext = AES_ECB_ENCRYPT(text, secretKey);
  document.getElementById("cyphertextresult").innerHTML = cyphertext;
}
document.getElementById("encrypt").onclick = do_encrypt;

function do_decrypt() {
  var text = document.getElementById("cyphertext").value;
  var secretKey = document.getElementById("cypherkey").value;
  var ciphertext = AES_ECB_DECRYPT(text, secretKey);
  document.getElementById("ciphertextresult").innerHTML = ciphertext;
}
document.getElementById("decrypt").onclick = do_decrypt;

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

//通过FileReader转化为base64字符串下载
function downloadByBlob(fileName, content) {
  let blob = new Blob([content], {
    type: "text/html;charset=utf-8",
  });
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function (e) {
    let a = document.createElement("a");
    a.download = fileName;
    a.href = e.target.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}

function generate_html() {
  var text = document.getElementById("ciphertext").value;
  var secretKey = document.getElementById("cipherkey").value;
  console.log(text);
  console.log(secretKey);
  var cyphertext = AES_ECB_ENCRYPT(text, secretKey);

  var html = `<!DOCTYPE html>
    <html lang="zh-Hans-CN">
    <head>
        <meta charset="utf-8">
        <title>这是加密的网页</title>
        <script src="http://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.js"></script>
    </head>
    <body>
    </body>
    <script>
        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return pair[1]; }
            }
            return (false);
        }
        var key = getQueryVariable("key");
        var textBase64 = "${cyphertext}";
        var decrypt = CryptoJS.AES.decrypt(textBase64, key);
        var text = CryptoJS.enc.Utf8.stringify(decrypt);
        document.body.innerHTML = text;
    </script>
    </html>`;
  downloadByBlob("data.html", html);
  window.location.href;
  document.getElementById("cyphertextresult").innerHTML = "cyphertext";
}
document.getElementById("generatehtml").onclick = generate_html;
