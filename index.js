import fs from 'fs';
import minimist from 'minimist';
import { parse } from 'acorn';
import { simple as walk } from './node_modules/acorn/dist/walk.js';

const argv = minimist(process.argv.slice(2));
const withFunctionParams = argv['params'] === false ? false : true;
const top = argv['top'] !== undefined ? argv['top'] : 30;
const file = argv['file'];
const summary = argv['summary'] === false ? false : true;

if (!file) {
  console.error(`Please pass a js file to parse : --file [filename.js]`);
  process.exit(-1);
}

// Read physical file
const source = fs.readFileSync(file);

// Get me the AST
const ast = parse(source, {
  ecmaVersion: 6,
  sourceType: 'module'
});

// Declare an object we'll use as a Map to store { variableName: 42, ... }
// We don't want to inherit from Object.prototype (hasOwnProperty, toString
// can exist as variable names)
const vars = Object.create(null);

// Helper function that check if the key already exists or not
function incVariableName(name) {
  vars[name] = (vars[name] || 0) + 1;
};

// Walk through the AST
walk(ast, {
  VariableDeclaration: function(d) {
    let declarator = d.declarations.filter(d => d.type === 'VariableDeclarator');
    declarator.forEach(d => incVariableName(d.id.name));
  },
  FunctionDeclaration: function(d) {
    if (withFunctionParams) {
      d.params.forEach(p => incVariableName(p.name));
    }
  }
});

// Our map (object) to an array to sort it
const arr = [];
for (let k in vars) {
  if (Object.prototype.hasOwnProperty.call(vars, k)) {
    arr.push({k, v: vars[k]});
  }
}

// Sort the most-used variable names
arr.sort(function(k1, k2) {
  if (k1.v === k2.v)
    return k1.k < k2.k ? -1 : 1;
  if (k1.v < k2.v)
    return 1;
  return -1;
});

// Output
if (summary) {
  console.log(`# Total: ${arr.reduce((total, k) => total + k.v, 0)}`);
  console.log(`# Total Distinct: ${arr.length}`);
  if (top) {
    console.log(`# Top ${top}:`);
  }
}

let output = arr;
if (top) {
  output = arr.slice(0, top);
}
output.forEach(k => console.log(k.v + ' ' + k.k));
