var fs = require('fs');

module.exports = {

    extract: function(filePath) {
        return new Promise(
            function(resolve, reject) {
                fs.readFile(filePath, 'utf8', function(err, res) {
                    if (err) { 
                        reject(err) 
                    }

                    var texts = res.toString().split('%')

                    for(var i = 0; i < texts.length; i++) {
                        texts[i] = '%' + texts[i];
                    }

                    resolve(texts)
                })
            }
        )
    }

}

return module.exports


