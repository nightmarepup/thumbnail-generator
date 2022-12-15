const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// specify the folder where the original images are located
const inputFolder = './input';

// specify the name of the folder where the thumbnails should be saved
const outputFolder = './output';

// read the contents of the input folder
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    // handle error
    throw err
  } else {
    // delete all the files in the output folder
    fs.readdir(outputFolder, (err, outputFiles) => {
      if (err) {
        // handle error
        throw err
      } else {
        let filesDeleted = 0;
        outputFiles.forEach(outputFile => {
          fs.unlink(path.join(outputFolder, outputFile), err => {
            if (err) {
              // handle error
              throw err
            } else {
              filesDeleted++;
              // check if all the files have been deleted
              if (filesDeleted === outputFiles.length) {
                // all the files have been deleted, so generate the thumbnails
                files.forEach(file => {
                  // get the file name and file path for the current file
                  const fileName = path.parse(file).name;
                  const filePath = path.join(inputFolder, file);

                  // generate a thumbnail for the current file
                  sharp(filePath)
                    .resize(300, 300)
                    .toFormat('webp')
                    // save the thumbnail in the output folder
                    .toFile(path.join(outputFolder, `${fileName}-thumbnail.png`), (err, info) => {
                      if (err) {
                        // handle error
                        throw err
                      } else {
                        // thumbnail was generated successfully
                      }
                    });
                });
              }
            }
          });
        });
      }
    });
  }
});
