var fs = require('fs');
var path = require('path');

var TOSDR_BUILD_SCR_DIR = '/tosdr-build/src';

function useIdAs_Id(inputJsonString) {
  var object = JSON.parse(inputJsonString);
  object._id = object.id;
  return JSON.stringify(object)
}

function concatJsonFiles(sourceDirectoryName, outputFilename, mapFileContent) {
  mapFileContent = mapFileContent || useIdAs_Id;
  var foundIds = {};
  var sourceDir = path.join(TOSDR_BUILD_SCR_DIR, sourceDirectoryName);
  var filenames = fs.readdirSync(sourceDir).filter(function (filename) {
    return filename.indexOf('.json') > 0;
  });

  var outputStream = fs.createWriteStream(path.join('/tmp', outputFilename), {flags: 'w'});
  filenames.forEach(function (filename, i) {
    var fileContent = fs.readFileSync(path.join(sourceDir, filename));

    // guard against evil strange ids
    var fileContentObject = JSON.parse(fileContent);
    if (filename !== (fileContentObject.id + '.json')) {
      console.log('Mismatch between id and filename: ', filename, fileContentObject.id);
      return;
    }
    if (foundIds[fileContentObject.id]) {
      console.log('ID is not unique: ', fileContentObject.id);
      return;
    }
    foundIds[fileContentObject.id] = true;

    outputStream.write(mapFileContent(fileContent));
  });
  outputStream.end();
}

concatJsonFiles('topics', 'topics.json');
concatJsonFiles('services', 'services.json');
concatJsonFiles('points', 'points.json', function (pointJson) {
  var point = JSON.parse(pointJson);
  point.approved = true;
  point._id = point.id;
  return JSON.stringify(point);
});


