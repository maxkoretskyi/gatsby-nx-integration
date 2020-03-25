### How to run
Just execute the build script in `scripts`:

```
$ node scripts/build-gatsby
``` 

Debugging child processes in Gatsby is described [in this article](https://indepth.dev/how-to-debug-a-child-process-in-node-and-gatsby-js-with-chrome/).

### Findings

- The `directory` property of the `program` argument passed to the `build` command should have the path to the gatsby app inside the workspace:

```
const program = { ... };
program.directory = 'D:\\playground\\happyorg\\apps\\gatsbyapp';
const build = require('gatsby/dist/commands/build');
build(program);
```

- `package.json` specific to gatsby app should be placed  inside the `gatsbyapp` directory

- `node_modules\gatsby\cache-dir\static-entry.js` uses process.cwd() a lot, 
needs to be replaced with the path to the gatsby app (possibly using program.directory if available):

```
const cwdDirectory = "D:\\playground\\happyorg\\apps\\gatsbyapp";
...
fs.readFileSync(`${cwdDirectory}/public/webpack.stats.json`, `utf-8`)
...
const absolutePageDataPath = join(cwdDirectory, `public`, pageDataPath)
...
const pageDataFile = join(cwdDirectory, `public`, pageDataPath)
...
``` 
 
- `node_modules/babel-plugin-remove-graphql-queries/index.js` uses `process.cwd()`,
needs to be replaced with the path to the gatsby app using `program.directory`:
   
```
// const resultPath = nodePath.join(process.cwd(), shortResultPath);
const resultPath = nodePath.join(program.directory, shortResultPath);

```
   
- Environment variable `process.env.NODE_ENV` should be set to `production` in `scripts/gatsby-build.js`:

```
process.env.NODE_ENV = `production`
```

### Current problems

- Gatsby generates `.cache` directory during the build inside the `apps/gatsbyapp` folder. 
However, some parts of the system, expect to find it in the root directory and fail with the error:
> "Cannot find module 'D:\playground\happyorg\.cache\babelState.json'"

If the directory `.cache` copied to the root, the build successfully goes past that stage.

- Currently the error that prevents the build outputs the following message:
> Can't resolve '..\..\..\..\public\static\d\2417117884.json' in 'absolute\path\to\happyorg\apps\gatsbyapp\src\components'
> Can't resolve '..\..\..\..\public\static\d\2969191536.json' in 'absolute\path\to\happyorg\apps\gatsbyapp\src\components'
> ...

These files are generated during the build and are available inside `apps\gatsbyapp\public\static\d`, but the resolver uses wrong path.

