const Promise = require(`bluebird`);
const fs = require(`fs-extra`);
const path = require(`path`);

const htmlComponentRendererPath = 'D:\\playground\\happyorg\\apps\\gatsbyapp\\public\\render-page.js';
const paths = ['/dev-404-page/', '/404/', '/', '/page-2/', '/404.html'];
const envVars = [
  ['NODE_ENV', 'production'],
  ['gatsby_executing_command', 'build'],
  ['gatsby_log_level', 'normal']
];

renderHTML({ htmlComponentRendererPath, paths, envVars });

const generatePathToOutput = outputPath => {
  let outputFileName = outputPath.replace(/^(\/|\\)/, ``); // Remove leading slashes for webpack-dev-server

  if (!/\.(html?)$/i.test(outputFileName)) {
    outputFileName = path.join(outputFileName, `index.html`);
  }

  return path.join(process.cwd(), `public`, outputFileName);
};

function renderHTML({ htmlComponentRendererPath, paths, envVars }) {
  // This is being executed in child process, so we need to set some vars
  // for modules that aren't bundled by webpack.
  envVars.forEach(([key, value]) => (process.env[key] = value));

  return Promise.map(
    paths,
    path =>
      new Promise((resolve, reject) => {
        const htmlComponentRenderer = require(htmlComponentRendererPath);
        try {
          htmlComponentRenderer.default(path, (throwAway, htmlString) => {
            resolve(fs.outputFile(generatePathToOutput(path), htmlString));
          });
        } catch (e) {
          // add some context to error so we can display more helpful message
          e.context = {
            path
          };
          reject(e);
        }
      })
  );
}
