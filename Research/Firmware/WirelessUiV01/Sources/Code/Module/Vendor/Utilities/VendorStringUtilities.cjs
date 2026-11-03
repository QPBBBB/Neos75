// Evaluate only extracted string decoders. Never execute the vendor application.
const FileSystem = require('node:fs');
const Path = require('node:path');
const VirtualMachine = require('node:vm');

const RepositoryRoot = Path.resolve(__dirname, '../../../..');
const VendorDirectory = Path.join(RepositoryRoot, 'Research', 'Vendor');

function GetVendorPath(Name) {
  const DirectPath = Path.resolve(VendorDirectory, Name);
  if (Path.dirname(DirectPath) !== VendorDirectory) throw Error('Vendor filename must remain inside Research/Vendor');
  if (FileSystem.existsSync(DirectPath)) return DirectPath;
  const Records = JSON.parse(FileSystem.readFileSync(Path.join(RepositoryRoot, 'Research', 'Provenance.json'), 'utf8'));
  const Record = Records.find(Item => Item.OriginalName === Name && Item.RelativePath.startsWith('Research/Vendor/'));
  if (!Record) throw Error('Vendor file not found: ' + Name);
  return Path.join(RepositoryRoot, Record.RelativePath);
}

function ExtractFunction(Source, Name) {
  const Start = Source.indexOf('function ' + Name + '(');
  if (Start < 0) throw Error('Function absent: ' + Name);
  const Opening = Source.indexOf('{', Start);
  let Level = 0;
  let Quote = '';
  let Escaped = false;
  for (let Index = Opening; Index < Source.length; Index++) {
    const Character = Source[Index];
    if (Quote) {
      if (Escaped) Escaped = false;
      else if (Character === '\\') Escaped = true;
      else if (Character === Quote) Quote = '';
    } else if (Character === "'" || Character === '"' || Character === '`') Quote = Character;
    else if (Character === '{') Level++;
    else if (Character === '}' && --Level === 0) return Source.slice(Start, Index + 1);
  }
  throw Error('Unterminated function: ' + Name);
}

function CreateDecoder(Source) {
  const Alignment = Source.match(/\(function\([\s\S]*?\}\((_0x[\da-f]+),0x[\da-f]+\)\);/);
  if (!Alignment) throw Error('No compatible string-table alignment found');
  const DecoderMatch = Alignment[0].match(/(?:const|var|let) _0x[\da-f]+=(_0x[\da-f]+)/);
  if (!DecoderMatch) throw Error('String decoder not found');
  const DecoderName = DecoderMatch[1];
  const TableFunction = ExtractFunction(Source, Alignment[1]);
  const DecoderFunction = ExtractFunction(Source, DecoderName);
  const Context = VirtualMachine.createContext({}, {codeGeneration: {strings: false, wasm: false}});
  VirtualMachine.runInContext(TableFunction + '\n' + DecoderFunction + '\n' + Alignment[0], Context, {timeout: 30000});
  const Aliases = new Set([DecoderName]);
  for (let Pass = 0; Pass < 10; Pass++) {
    for (const Match of Source.matchAll(/(_0x[\da-f]+)=(_0x[\da-f]+)(?=[,;])/g)) {
      if (Aliases.has(Match[2])) Aliases.add(Match[1]);
    }
  }
  function Decode(Text) {
    let Output = Text.replace(/(_0x[\da-f]+)\((0x[\da-f]+),'((?:\\.|[^'\\])*)'\)/g, (Whole, Alias, Index, Key) => {
      if (!Aliases.has(Alias)) return Whole;
      return JSON.stringify(VirtualMachine.runInContext(`${DecoderName}(${Index},'${Key}')`, Context, {timeout: 2000}));
    });
    for (let Pass = 0; Pass < 15; Pass++) {
      Output = Output.replace(/("(?:\\.|[^"\\])*")\+("(?:\\.|[^"\\])*")/g,
        (Whole, Left, Right) => JSON.stringify(JSON.parse(Left) + JSON.parse(Right)));
    }
    return Output;
  }
  return {Context, Alignment: Alignment[0], TableFunction, DecoderFunction, Decode};
}

module.exports = {RepositoryRoot, VendorDirectory, GetVendorPath, ExtractFunction, CreateDecoder};
