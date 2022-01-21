const reqLt = (req, res) => {
  let users = [];
  const { url, method } = req;
  console.log(url, method);
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>I will be the king of pirate for sure</h1>');
    res.write(
      '<span>Create new user: </span><form action="createNewUser" method="POST"><input type="username" name="username"><input type="submit"></form>'
    );
    res.write('</body>');
    res.write('</html>');
  }

  if (url === '/users') {
    console.log(users);
    res.write('<html>');
    res.write('<h1>I will be the pirate king for sure!!!</h1>');
    res.write(
      `<body><ul>${users
        .map((name) => `<li>${name}</li>`)
        .join('')}</ul></body>`
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/createNewUser' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];

      res.write('<html>');
      res.write(`<h1>${username} user was created!!!</h1>`);
      users.push(username);
      res.write('</html>');
      return res.end();
    });
  }
};

module.exports = reqLt;
