var docx = require('./docx')
var fs = require('fs');
var xmlEntities = require("xml-entities");

var extractDoc = function(file) {
    docx.extract('./input/' + file.name).then(function(res, err) {
        if (err) {
            console.log(err)
        }
        var textStartPos = res.length, textEndPos = res.length, i = 0, texts = [];
        while (i > -1) {
            textEndPos = res.lastIndexOf('%', textStartPos);
            textStartPos = res.lastIndexOf('%', textEndPos - 1);
            texts.push(res.substring(textStartPos, textEndPos));
            i = textStartPos;
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

fs.readdir('./input', {encoding: 'utf8', withFileTypes: true}, function(err, files) {
    if (err) { console.log(err); throw err }
    files.map(function(file) {
      console.log('Extracting texts from file: ' + file.name);
      extractDoc(file);
    })
  })