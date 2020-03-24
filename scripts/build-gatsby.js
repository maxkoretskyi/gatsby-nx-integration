/* eslint-disable @typescript-eslint/no-var-requires,no-undef */
const allProgramArgs = {
  '_': ['build'],
  'verbose': false,
  'no-color': false,
  'no-colors': false,
  'noColors': false,
  'noColor': false,
  'json': false,
  'prefix-paths': false,
  'no-uglify': false,
  '$0': 'gatsby',
  'browserslist': ['>0.25%', 'not dead'],
  'report': {},
  'useYarn': true
};

// type BuildArgs
const program = {
  directory: 'D:\\playground\\happyorg\\apps\\gatsbyapp',
  sitePackageJson: {
    'name': 'gatsby-starter-default',
    'private': true,
    'description': 'A simple starter to get up and developing quickly with Gatsby',
    'version': '0.1.0',
    'author': 'Kyle Mathews <mathews.kyle@gmail.com>',
    'dependencies': {
      'gatsby': '^2.19.7',
      'gatsby-image': '^2.2.39',
      'gatsby-plugin-manifest': '^2.2.39',
      'gatsby-plugin-offline': '^3.0.32',
      'gatsby-plugin-react-helmet': '^3.1.21',
      'gatsby-plugin-sharp': '^2.4.3',
      'gatsby-source-filesystem': '^2.1.46',
      'gatsby-transformer-sharp': '^2.3.13',
      'prop-types': '^15.7.2',
      'react': '^16.12.0',
      'react-dom': '^16.12.0',
      'react-helmet': '^5.2.1'
    },
    'devDependencies': { 'prettier': '^1.19.1' },
    'keywords': ['gatsby'],
    'license': 'MIT',
    'scripts': {
      'build': 'gatsby build',
      'develop': 'gatsby develop',
      'format': 'prettier --write "**/*.{js,jsx,json,md}"',
      'start': 'npm run develop',
      'serve': 'gatsby serve',
      'clean': 'gatsby clean',
      'test': 'echo "Write tests! -> https://gatsby.dev/unit-testing" && exit 1'
    },
    'repository': { 'type': 'git', 'url': 'https://github.com/gatsbyjs/gatsby-starter-default' },
    'bugs': { 'url': 'https://github.com/gatsbyjs/gatsby/issues' }
  },
  prefixPaths: false,
  noUglify: false
  // openTracingConfigFile: string
};

process.env.NODE_ENV = `production`;
const build = require('gatsby/dist/commands/build');
// forces package.json to be placed inside `gatsbyapp` directory
build(program);
