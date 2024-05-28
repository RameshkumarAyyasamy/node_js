const fs = require('fs');
const _ = require('lodash');

//Read the colors from color_palette file

fs.readFile('../src/color_palette.json', 'utf8', (err, colors) => {
  if (err) {
    console.error('Error if file is not readed:', err);
    return;
  }
  const colorPalette = JSON.parse(colors);
  //Randomize 5 colors
  const randomizedColors = _.sampleSize(colorPalette, 5);

  //Write the randomized colors in randomized_palette.json file
  fs.writeFile('randomized_color_palette.json', JSON.stringify(randomizedColors), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    //Read the randomized colors from randomized_color_palette file
    fs.readFile('randomized_color_palette.json', 'utf8', (err, colors) => {
      if (err) {
        console.error('Error if file is not readed:', err);
        return;
      }
      const randomizedColorPalette = JSON.parse(colors);

      //Printing 5 randomized colors in console
      randomizedColorPalette.forEach(color => console.log(color));
    });
  });
});
