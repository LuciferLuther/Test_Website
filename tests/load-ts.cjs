const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");
const cache = new Map();

function resolveLocal(request, parentFile) {
  let candidate;
  if (request.startsWith("@/")) {
    candidate = path.join(projectRoot, request.slice(2));
  } else if (request.startsWith(".")) {
    candidate = path.resolve(path.dirname(parentFile), request);
  } else {
    return null;
  }

  for (const file of [candidate, `${candidate}.ts`, `${candidate}.tsx`, path.join(candidate, "index.ts")]) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  throw new Error(`Could not resolve ${request} from ${parentFile}`);
}

function loadTypeScript(filePath) {
  const absolute = path.resolve(filePath);
  if (cache.has(absolute)) return cache.get(absolute).exports;

  const moduleRecord = { exports: {} };
  cache.set(absolute, moduleRecord);

  const source = fs.readFileSync(absolute, "utf8");
  const output = ts.transpileModule(source, {
    fileName: absolute,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;

  const localRequire = (request) => {
    const resolved = resolveLocal(request, absolute);
    return resolved ? loadTypeScript(resolved) : require(request);
  };

  const execute = new Function("exports", "require", "module", "__filename", "__dirname", output);
  execute(moduleRecord.exports, localRequire, moduleRecord, absolute, path.dirname(absolute));
  return moduleRecord.exports;
}

module.exports = { loadTypeScript };
