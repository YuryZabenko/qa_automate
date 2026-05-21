const fse = require('fs-extra');

fse.ensureDirSync('./dir1');
fse.ensureFileSync('./dir1/file1.txt');
fse.ensureDirSync('./dir2');
fse.moveSync('./dir1/file1.txt', './dir2/file1.txt');
fse.ensureDirSync('./dir3');
fse.copySync('./dir2/file1.txt', './dir3/file1.txt');
fse.writeJsonSync('./dir1/file.json', {"name": "myName"});
data = fse.readJsonSync('./dir1/file.json');
console.log(data);
fse.removeSync('./dir1/file.json');
fse.removeSync('./dir2/file1.txt');
fse.removeSync('./dir3/file1.txt');
fse.removeSync('./dir3');
fse.removeSync('./dir2');
fse.removeSync('./dir1');