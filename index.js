const fs = require('fs').promises;
const http = require('http');
const _ = require('lodash');

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Error reading or parsing file: ${err.message}`);
  }
}

async function createServer(data){
   const server = http.createServer((req,res) => {

    //Create response header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the randomized colors as JSON to response
    res.end(JSON.stringify(data));  
  });
  return server;
}
function randomize(array,size) {
  if (array.length < size) {
    throw new Error('Array length should be equal or gearter that size');
  }
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, size);
}

(async function randmizeColors(inputFile,numberOfColors){
  try {
    const colorPalette = await readJsonFile(inputFile);
    const randomizedColors = randomize(colorPalette, numberOfColors);
    const server = await createServer(randomizedColors);
    server.listen(3009, () => {
      console.log('Server running at http://localhost:3009/');
    });
  } catch (err) {
    console.error(err.message);
  }
})('./src/color_palette.json', 5);
