
import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';
import transform from 'babel-transform-dir';
import rimraf from 'rimraf'; 

const cleanLib =()=>new Promise((resolve, reject) => {
  rimraf('./lib', { force: true }, (err, result)=>err ? reject(err) : resolve(result))
});


const getPackageConfig =()=>{ 
  const pkgFileName = path.resolve(__dirname, '../package.json');
  const pkg = require(pkgFileName);
  return [pkg, pkgFileName];
}

const switchMainToLib =(pkg)=>{ 
  pkg.main = "./lib/index.js";
  return pkg;
};

const transformSrc =()=>{ 
  const srcDir = path.resolve(__dirname, '../src');
  const libDir = path.resolve(__dirname, '../lib');
  const babelrcFileName = path.resolve(__dirname, '../.babelrc');
  const babelrc = jsonfile.readFileSync(babelrcFileName);
  transform(srcDir, libDir, {babel: babelrc, onFile:(file)=>console.log(`src/${file} -> lib/${file}`)});
}

async function build() { 
  await cleanLib();
  console.log('Cleaned Old Lib Files.');
  let [pkg, pkgFileName] = getPackageConfig();
  pkg = switchMainToLib(pkg);
  fs.writeFileSync(pkgFileName, JSON.stringify(pkg, null, 2));
  console.log('Main file set in package.json');
  transformSrc(); 
}

build();
