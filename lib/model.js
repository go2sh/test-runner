import Emitter from "event-kit"

/**
 * @class TestRunner
 *
 * Base class to implement as a test runner. A sub class must implement the
 * name, getTests and runTest function.
 */
class TestRunner {
  constructor(options) {
    this.emitter = new Emiiter()
    this.options = options
  }

  /**
   * Name of the runner
   */
  get name() {
    return "" /* subclass this*/
  }

  /**
   * Add a callback to the test-start event
   *
   * The callback gets a TestStartInfo object as argument.
   *
   * @param {function} callback A callback function to add
   */
  onTestStart(callback) {
    this.emitter.on("test-start", callback)
  }

  /**
   * Add a callback to the test-end event
   *
   * The callback gets a TestEndInfo object as argument.
   *
   * @param {function} callback A callback function to add
   */
  onTestEnd(callback) {
    this.emitter.on("test-end", callback)
  }

  /**
   * Get all test for the given configuration
   *
   * The function returns a promise which resolves when the tests have
   * successfully been discovered. The resolve function has to provide the tests
   * as first argument.
   *
   * @return {Promise} promise for the test discovery
   */
  getTests() {
    /* subclass this */
  }

  /**
   * Run all tests available with this configuration.
   *
   * The function returns a promise which resolves when all tests have
   * been executed. While running, the function has to emit test-start and
   * test-end events accordingly with the respective event data types.
   *
   * @return {Promise} A promise for the test run
   */
  runAllTests() {
    /* subclass this */
  }

  /**
   * Run selected tests
   *
   * The function executes all tests from the argument list.
   *
   * @param {TestInfo[]} tests A list of tests to run.
   * @return {Promise} A promise which resolves when all tests have run
   */
  runTests(tests) {
    return new Promise((resolve, reject) => {
      var index = 0
      /**
       * Schedule asynchronous list execution with promise
       */
      execTest = () => {
        /* run a test * @property {String} */
        this.runTest(tests[index]).then(() => {
          index++
          /* schedule only if elements left */
          if (index < tests.length)
            process.nextTick(execTest)
          else
            resolve()
        }).catch((err) => {
          reject(err)
        })
      }
      /* schedule only if elements left */
      if (i < tests.length)
        process.nextTick(execTest)
      else
        resolve()
    })
  }

  /**
   * Run a tests
   *
   * The function returns a promise which resolves when the test has
   * been executed. While running, the function has to emit a test-start and
   * test-end event accordingly with the respective event data types.
   *
   * @param {Test} test The test object to run
   * @return {Promise} A promise for the test run
   */
  runTest(test) {
    /* subclass this */
  }
}

/**
 * @typedef StacktraceEntry
 *
 * Entry in a stacktrace
 *
 * @property {String} filename The filename of the entry
 * @property {String} line The line of the entry
 * @property {String} column The column of the entry
 * @property {String} entryname The nam of the entry (e.g. function)
 * @property {String} type (Assert|Function|Exception)
 */

/**
 * @typedef TestInfo
 *
 * Information returned by the getTests function and passed to runTest
 *
 * @property {String} testIdentifier String to identify the test
 * @property {String} packageNames Package path the test is in. Can be empty
 * @property {String} classname The class the test is in. Can be empty
 * @property {String} testname The name of the test
 * @property {String} filename The filename of the test
 * @property {String} line The line the test is definied in
 * @property {String} column The column the test is definied in
 */

/**
 * @typedef TestStartInfo
 *
 * Object passed to the onTestStart callback
 *
 * @property {String} testIdentifier String to identify the test
 * @property {String} testname The name of the test
 * @property {String} testclass The class the test is in. Can be empty
 * @property {String[]} packageNames Package path the test is in. Can be empty
 */

 /**
  * @typedef TestEndInfo
  *
  * Object passed to the onTestEnd callback
  *
  * @property {String} testIdentifier String to identify your test
  * @property {String} testName The name of the test
  * @property {String} testClass The class the test is in. Can be empty
  * @property {String[]} packageNames Package path the test is in. Can be empty
  * @property {Boolean} hasFailed Test has failed
  * @property {Boolean} hasError Test has an error
  * @property {Number} duration Test duration
  * @property {String[]} log Logging lines of the test
  * @property {StacktraceEntry[]} stacktrace The stacktrace of the failed test
  */
