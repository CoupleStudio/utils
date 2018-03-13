let fs = require('fs');
let path = require('path');
let getPixels = require('get-pixels');
// let rootDir = "/Users/Neil/Downloads/test/resources";
// let targetDir = "/Users/Neil/Downloads/test/newResources";
let rootDir = process.argv[2];
let targetDir = path.join(process.cwd(), "newResources");
let cwd = process.cwd();
let options = {
    flag: 'a'
};

function list(src, dest) {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }
    fs.readdir(src, (err, files) => {
        for (const file of files) {
            let filePath = path.join(src, file);
            let newFilePath = path.join(dest, file);

            fs.stat(filePath, (err, stats) => {

                if (stats.isFile()) {
                    let name = path.extname(filePath);
                    if (name == '.png' || name == '.jpg') {
                        let baseName = path.basename(filePath);
                        getPixels(filePath, function (err, pixels) {
                            if (err) {
                                console.log('bad image path');
                            }
                            let str = baseName + '  ' + pixels.shape;
                            // fs.appendFileSync(cwd + '/picDetail.txt', str + '\r\n', options);
                            fs.writeFileSync(cwd + '/picDetail.txt', str + '\r\n', options);
                        });
                    }

                } else if (stats.isDirectory()) {

                    list(filePath, newFilePath);
                }
            });
        }
    });
}

list(rootDir, targetDir);