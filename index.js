var txt = require('./txt')
var fs = require('fs');
var xmlEntities = require("xml-entities");

var extractDoc = function(file) {
    txt.extract('./input/' + file.name).then(function(texts, err) {
        if (err) {
            console.log(err)
        }
        for (var k = 0; k < texts.length; k++) {
            var sigla = texts[k].match(/(%\w+)/g);
            sigla = sigla ? 'filgat' + sigla[0].replace('%', '.') + '.txt' : 'CHANGEME';
            texts[k] = texts[k].replace(/(%\w+)/g, '%');
            if (sigla) {
                console.log('Creating file: ' + sigla);
                fs.writeFile('./output/' + sigla, xmlEntities.decode(texts[k]), function(err) {
                    if (err) { throw err }
                }) 
            }
        }
    })
}

fs.readdir('./input', {encoding: 'ascii', withFileTypes: true}, function(err, files) {
    if (err) { console.log(err); throw err }
    files.map(function(file) {
      console.log('Extracting texts from file: ' + file.name);
      extractDoc(file);
    })
  })