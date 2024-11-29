const sharp = require('sharp');
const fs = require('fs');

const inputFile = './assets/dog.jpeg'; 
const outputFile = 'output.jpg';

// Resize image
sharp(inputFile)
    .resize(300, 300) 
    .toFile(outputFile, (err) => {
        if (err) {
            console.error('Error resizing image:', err);
        } else {
            console.log('Output file:', outputFile);
        }
    });