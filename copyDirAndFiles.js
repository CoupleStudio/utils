let fs = require('fs');
let path = require('path');

// let rootDir = "/Users/Neil/Downloads/test/resources";
// let targetDir = "/Users/Neil/Downloads/test/newResources";
let rootDir = process.argv[2];
let targetDir = path.join(process.cwd(), "newResources");

function list(src, dest) {
    if(!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
    }
    fs.readdir(src, (err, files)=>{
        for (const file of files) {
            let filePath = path.join(src, file);
            let newFilePath = path.join(dest, file);
            
            fs.stat(filePath, (err, stats)=>{
                if(stats.isFile()){
                    let name = path.extname(filePath);
                    
                    if(process.argv.length <= 1){
                        let readFile = fs.createReadStream(filePath);
                        let outFile = fs.createWriteStream(newFilePath);
                        readFile.pipe(outFile);
                    } else if(process.argv.length>=2){
                        let extArr = process.argv.slice(3);
                        if(extArr.includes(name)){
                            let readFile = fs.createReadStream(filePath);
                            let outFile = fs.createWriteStream(newFilePath);
                            readFile.pipe(outFile);
                        }
                    }

                } else if(stats.isDirectory()){
                    if(!fs.existsSync(newFilePath)) {
                        fs.mkdirSync(newFilePath);
                    }
                    list(filePath, newFilePath);
                }
            });
        }
    });
}

list(rootDir, targetDir);