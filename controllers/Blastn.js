const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
fs = require('fs-extra');
var pathToCovid = path.join(__dirname, '/covidparameters.txt');
var pathToBacteria = path.join(__dirname, '/bacteriaparameters.txt');
router.post('/run', async (req, res) => {
    console.log('geldi');
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an vendor'
        });
    }
    const {queryPath, list, experimentType, databasePath, receivedDate, cellType, basecalling, lengthOfBlast, identity, samplelist} = req.body;
    try {
        console.log(experimentType);
        console.log(databasePath);
        console.log(queryPath);
        console.log(receivedDate);
        console.log(cellType);
        console.log(basecalling);
        console.log(lengthOfBlast);
        console.log(identity);
        console.log(samplelist);
        console.log(list[0]);
        if (experimentType == 'Covid'){
            await fs.appendFile(pathToCovid, 'ReceivedDate: '+ receivedDate + '\n');
            await fs.appendFile(pathToCovid, 'Query: ' + queryPath + '\n' );
            await fs.appendFile(pathToCovid, 'Basecalling: ' + basecalling + '\n');
            await fs.appendFile(pathToCovid, 'CellType: ' + cellType + '\n');
            await fs.appendFile(pathToCovid, 'Identity: ' + identity + '\n');
            await fs.appendFile(pathToCovid, 'Email: ' + list[0] + '\n');
            await fs.appendFile(pathToCovid, 'LengthOfBlast: ' + lengthOfBlast + '\n');
            await fs.appendFile(pathToCovid, 'Samplelist: ' + samplelist);
        }
        else {
            await fs.appendFile(pathToBacteria, 'ReceivedDate: '+ receivedDate + '\n');
            await fs.appendFile(pathToBacteria, 'Query: ' + queryPath + '\n' );
            await fs.appendFile(pathToBacteria, 'Database: ' + databasePath + '\n' );
            await fs.appendFile(pathToBacteria, 'Basecalling: ' + basecalling + '\n');
            await fs.appendFile(pathToBacteria, 'CellType: ' + cellType + '\n');
            await fs.appendFile(pathToBacteria, 'Identity: ' + identity + '\n');
            await fs.appendFile(pathToBacteria, 'Email: ' + list[0] + '\n');
            await fs.appendFile(pathToBacteria, 'LengthOfBlast: ' + lengthOfBlast + '\n');
            await fs.appendFile(pathToBacteria, 'Samplelist: ' + samplelist);
        }

    }catch (error) {
        console.log(error);
      }

},
(error, req, res, next) => {
  if (error) {
    res.status(500).send(error.message);
  }
}
);

module.exports = router;