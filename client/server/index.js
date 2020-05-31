const path = require('path');
const fs = require('fs');
const express = require('express');

const PORT = 3000;
const app = express();

const router = express.Router();

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    return res.send(data);
  });
}
router.use('^/$', serverRenderer);

router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);

app.use(router)

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
});