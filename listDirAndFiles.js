let fs = require('fs');
let path = require('path');

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

                    if (process.argv.length <= 1) {
                        let str = filePath;
                        fs.writeFileSync(path.join(cwd + '/dirAndFileDetail.txt'), str + '\r\n', options);
                    } else if (process.argv.length >= 2) {

                        let extArr = process.argv.slice(3);
                        if (extArr.includes(name)) {
                            let str = filePath;

                            fs.writeFileSync(path.join(cwd + '/dirAndFileDetail.txt'), str + '\r\n', options);
                        }
                    }

                } else if (stats.isDirectory()) {
                    let str = filePath;
                    fs.writeFileSync(path.join(cwd + '/dirAndFileDetail.txt'), str + '\r\n', options);
                    list(filePath, newFilePath);
                }
            });
        }
    });
}

list(rootDir, targetDir);