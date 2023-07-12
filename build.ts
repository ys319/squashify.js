import * as path from "https://deno.land/std@0.115.1/path/mod.ts"
import { build } from "https://deno.land/x/dnt@0.37.0/mod.ts"
import package_json from "./src/package.json" assert { type: "json" }

const __dirname = new URL(".", import.meta.url).pathname

const inDir = path.join(__dirname, "src")
const outDir = path.join(__dirname, "dist")

await build({
    package: {
        ...package_json,
        version: "0.0.1",
    },
    entryPoints: [
        path.join(inDir, "mod.ts")
    ],
    outDir,
    test: false,
    shims: {},
    compilerOptions: {
        lib: [
            "DOM",
            "ES2015"
        ],
        importHelpers: false,
    },
    packageManager: "npm",
    skipSourceOutput: true,
})
