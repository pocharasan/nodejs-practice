const fs = require('fs');

const requestListener = (req, res) => {
  const { url, method } = req;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    res.write('<html>');
    res.write('<h1>I will be the pirate king for sure!!!</h1>');
    res.write(
      '<body><form action="message" method="POST"><input type="text" name="message"><input type="submit"></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.write('<h1>I will be the pirate king for sure!!!</h1>');
  res.write('</html>');
  res.end();
};

module.exports = requestListener;
