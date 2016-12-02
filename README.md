# Atom Test Runner

The atom test-runner package provides a Test Runner interface for atom. It uses
a service to load test runners from other packages.

## Design
The package use [vuejs](https://vuejs.org/) as libary for rendering components
and [vuex](https://vuex.vuejs.org/en/) for state management. This descision has
been made since atom will drop support for the space-pen library some time. The
code is then transpilied with webpack to a single file CommonJS2 module.
See the [install section](#installation).

### Configuration file
The test runner looks for a `.ttrc` at the project root. This is a simple yaml
file with the test runner configuration for this project. A example file looks
like this:
``` yaml
- name: Python Unit Tests
  runner: pytest
  package: example.tests.unit
- name: Python Integration Tests
  runner: pytest
  package: example.tests.integration
```
This example has two test configurations for the not yet existing pytest runner.
The `runner` key is used to find the corrisponding provider and the `name` is
shown in the list. Everything else is passed into the runner as options.

## Installation
You can install the test runner through the atom package manager. Or clone this
repository and run `yarn` or `npm install`.

## Debugging
In order debug the changes you'll just have to run webpack in scanner mode and
reload atom once your changes are saved. For example:
`webpack --config webpack.config.js -s`


## Adding a Test Runner
To add a test runner simply create a package that provides a test runner
service.
```
"providedServices": {
  "test-runner-service": {
    "versions": {
      "1.0.0": "provideTestRunner"
    }
  }
}
```
The function has to return an object with a key used to identify the runner and
runner as class/constructor function. The interface and an example class is
located under lib/model.js. Alternatively you can use the runner in the
`test-runner-vunit` package as an example.

## Report a bug
You can report bugs or feature requests at the [project page](https://github.com/go2sh/test-runner).

## License
Copyright (c) 2016 Christoph Seitz

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
