import express from 'express';
import { Application } from 'express';
import Jimp from 'jimp';
import rp from 'request-promise';
import $ from 'cheerio';
import fs from 'fs';
import { join, normalize } from 'path';

const app: Application = express();
app.use(express.static(normalize(__dirname + '/results')));

const extractGif = async (url: string): Promise<string> => {   // Function to extract direct link to gif from tenor
  let gif: string;
  const html = await rp(url);
  gif = $('div > img', html)['0'].attribs['src'];
  return gif;
}

app.get('/view/:id', async (req, res) => {
  if (fs.existsSync(join(__dirname + '/results' + `${req.params.id}.png`))) {
    res.status(200).sendFile(`./results/${req.params.id}.png`, { root: __dirname });
    return;
  }

  console.log(`https://tenor.com/view/${req.params.id}`)
  const userGif = await Jimp.read(await extractGif(`https://tenor.com/view/${req.params.id}`));
  const text = await Jimp.read('./text.png');
  const template = await Jimp.read('./template.png');
  const whitecream = await Jimp.read('./whitecream.png');
  
  userGif.resize(200, 140);
  whitecream.resize(200, 140);
  template.composite(userGif, 0, 160);
  template.composite(whitecream, 0, 180);
  template.composite(text, 0, 160);
  template.write(`./results/${req.params.id}.png`, () => {
    res.status(200).sendFile('./results/' + req.params.id + '.png', { root: __dirname });
    return;
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});