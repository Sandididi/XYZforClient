//import express 和 ws 套件
const fs = require('fs')
const https = require('https')
const SocketServer = require('ws').Server
const PORT = 3000 //指定 port

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/sandididi.xyz-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/sandididi.xyz-0001/fullchain.pem'),
}

//http & socket port
const server = https.createServer(options);
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}`);
});

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })
//當有 client 連線成功時
wss.on('connection', ws => {
  ws.send("This website is for test purpose, please do not leave any personal information here.");
  console.log('Client connected');
  // 當收到client消息時
  ws.on('message', data => {
    // 收回來是 Buffer 格式、需轉成字串
    data = data.toString();
    console.log(data) // 可在 terminal 看收到的訊息

    /// 發送給所有client： 
    let clients = wss.clients;  //取得所有連接中的 client
    clients.forEach(client => {
        client.send(data)  // 發送至每個 client
    })
  });
  // 當連線關閉
  ws.on('close', () => {
    console.log('Close connected');
  });
})
