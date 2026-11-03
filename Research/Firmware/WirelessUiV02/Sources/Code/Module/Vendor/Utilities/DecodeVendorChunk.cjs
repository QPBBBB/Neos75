const FileSystem = require('node:fs');
const Path = require('node:path');
const {VendorDirectory, GetVendorPath, CreateDecoder} = require('./VendorStringUtilities.cjs');

function Main(Arguments = process.argv.slice(2)) {
  let OutputDirectory = VendorDirectory;
  const Names = [];
  for (let Index = 0; Index < Arguments.length; Index++) {
    if (Arguments[Index] === '--OutputDirectory') {
      if (!Arguments[Index + 1]) throw Error('Missing --OutputDirectory value');
      OutputDirectory = Path.resolve(Arguments[++Index]);
    } else if (Arguments[Index] === '--Help') {
      console.log('node DecodeVendorChunk.cjs <VendorFile.js> ... [--OutputDirectory <Directory>]');
      return;
    } else Names.push(Arguments[Index]);
  }
  if (!Names.length) throw Error('Provide at least one vendor JavaScript filename');
  FileSystem.mkdirSync(OutputDirectory, {recursive: true});
  for (const Name of Names) {
    const InputPath = GetVendorPath(Name);
    const Source = FileSystem.readFileSync(InputPath, 'utf8');
    const Decoder = CreateDecoder(Source);
    const Body = Source.replace(Decoder.TableFunction, '/* string table removed */')
      .replace(Decoder.DecoderFunction, '/* decoder removed */')
      .replace(Decoder.Alignment, '/* string alignment removed */');
    const OutputPath = Path.join(OutputDirectory, Path.parse(InputPath).name + 'Decoded.js');
    FileSystem.writeFileSync(OutputPath, Decoder.Decode(Body));
    console.log(OutputPath);
  }
}

if (require.main === module) Main();
module.exports = {Main};
