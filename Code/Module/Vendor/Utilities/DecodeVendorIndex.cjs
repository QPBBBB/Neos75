const FileSystem = require('node:fs');
const Path = require('node:path');
const VirtualMachine = require('node:vm');
const {VendorDirectory, GetVendorPath, CreateDecoder} = require('./VendorStringUtilities.cjs');

function Main(Arguments = process.argv.slice(2)) {
  let OutputDirectory = VendorDirectory;
  if (Arguments.length) {
    if (Arguments[0] === '--Help') {
      console.log('node DecodeVendorIndex.cjs [--OutputDirectory <Directory>]');
      return;
    }
    if (Arguments.length !== 2 || Arguments[0] !== '--OutputDirectory') throw Error('Expected --OutputDirectory <Directory>');
    OutputDirectory = Path.resolve(Arguments[1]);
  }
  FileSystem.mkdirSync(OutputDirectory, {recursive: true});
  const Source = FileSystem.readFileSync(GetVendorPath('MainIndex.js'), 'utf8');
  const Decoder = CreateDecoder(Source);
  const Begin = Source.indexOf('vc=[{');
  const End = Source.indexOf('async function d8(', Begin);
  if (Begin < 0 || End < 0) throw Error('NEOS75 product definition not found');
  FileSystem.writeFileSync(Path.join(OutputDirectory, 'Neos75ProductDecoded.txt'), Decoder.Decode(Source.slice(Begin, End)));
  const DependenciesBegin = Source.indexOf('const __vite__mapDeps=');
  const DependenciesEnd = Source.indexOf(';', DependenciesBegin);
  const DependenciesSource = Source.slice(DependenciesBegin, DependenciesEnd + 1);
  VirtualMachine.runInContext('const _0x5d7a4d=_0x59e1;\n' + DependenciesSource + '\nthis.VendorDependencies=__vite__mapDeps(Array.from({length:86},(Item,Index)=>Index))', Decoder.Context, {timeout: 5000});
  FileSystem.writeFileSync(Path.join(OutputDirectory, 'DependencyMap.json'), JSON.stringify(Decoder.Context.VendorDependencies, null, 2));
  const BaseIndex = Source.indexOf("'baseURL':en");
  if (BaseIndex < 0) throw Error('Cloud base URL configuration not found');
  FileSystem.writeFileSync(Path.join(OutputDirectory, 'CloudBaseDecoded.txt'), Decoder.Decode(Source.slice(BaseIndex - 1800, BaseIndex + 1600)));
  console.log(OutputDirectory);
}

if (require.main === module) Main();
module.exports = {Main};
