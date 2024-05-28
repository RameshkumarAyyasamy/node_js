const fs = require('fs');
const http = require('http');
const _ = require('lodash');

//Read the colors from color_palette file

fs.readFile('../src/color_palette.json', 'utf8', (err, colors) => {
  if (err) {
    console.error('Error if file is not readed:', err);
    return;
  }

  const colorPalette = JSON.parse(colors);

  // Create an HTTP server
  const server = http.createServer((req,res) => {

    const randomizedColors = _.sampleSize(colorPalette, 5);

    //Create response header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the randomized colors as JSON to response
    res.end(JSON.stringify(randomizedColors));  
  });

  //Start the server
  server.listen(3001, () => {
    console.log('Server running at http://localhost:3001/');
  });
});
