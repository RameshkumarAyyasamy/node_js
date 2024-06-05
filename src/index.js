const fs = require('fs').promises;
const _ = require('lodash');

//Read the Data from the mentioned file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    //log the error oif the file cannot be read.
    throw new Error(`Error reading or parsing file: ${err.message}`);
  }
}

//Write the data to the required file/ create a file if it's not exist
async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
  } catch (err) {
    //log the error oif the file cannot be create/write.
    throw new Error(`Error writing file: ${err.message}`);
  }
}

//Randomizing colors
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


async function randomizeColors(inputFile, outputFile, numberOfColors) {
  try {
    //Read the color palette
    const colorPalette = await readJsonFile(inputFile);
    //Randomize the colors
    const randomizedColors = randomize(colorPalette, numberOfColors);
    //write the randomized colors in a new file
    await writeJsonFile(outputFile, randomizedColors);
    //Read the randomized colors
    const readRandomizedColors = await readJsonFile(outputFile);
    //Print the randomied colors
    readRandomizedColors.forEach(color => console.log(color));
  } catch (err) {
    console.error(err.message);
  }
}

(async () => {
  const inputFilePath = '../src/color_palette.json';
  const outputFilePath = 'randomized_color_palette.json';
  
  await randomizeColors(inputFilePath, outputFilePath, 5);
})();