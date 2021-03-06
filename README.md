# babel-jest

[Babel](https://github.com/babel/babel) [jest](https://github.com/facebook/jest) plugin. Supports mocking empty css modules.

## Usage

Make the following changes to `package.json`:

```json
{
  "devDependencies": {
    "babel-jest": "*",
    "jest-cli": "*"
  },
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
    "testFileExtensions": ["es6", "js"],
    "moduleFileExtensions": ["js", "json", "es6"]
  },
  "babelJest": {
    "include": [
      "src/**/*.js"
    ]
  }
}
```

And run:

    $ npm install

**And you're good to go!**
