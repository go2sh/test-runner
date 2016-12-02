module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _testRunner = __webpack_require__(23);
	
	var _testRunner2 = _interopRequireDefault(_testRunner);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  testRunnerView: null,
	
	  activate: function activate(state) {
	    var _this = this;
	
	    this.testRunnerView = new _vue2.default(_testRunner2.default);
	    this.testRunnerView.$store.dispatch("loadTestConfigs");
	    this.testRunnerView.isVisible = state.isVisible;
	    this.testRunnerView.$store.commit("setTestTree", state.testTree);
	    this.testRunnerView.$store.commit("setTestResults", state.testResults);
	    this.testRunnerView.$store.commit("selectTestConfigByIndex", state.selectedTestConfigIndex);
	
	    atom.commands.add("atom-workspace", {
	      "test-runner:toggle-view": function testRunnerToggleView() {
	        _this.testRunnerView.toggle();
	      },
	      "test-runner:run-current-test-config": function testRunnerRunCurrentTestConfig() {
	        _this.testRunnerView.$store.dispatch("runAllTests");
	      },
	      "test-runner:select-test-config": function testRunnerSelectTestConfig() {}
	    });
	  },
	  deactivate: function deactivate() {
	    this.testRunnerView.$destroy();
	  },
	  serialize: function serialize() {
	    return {
	      isVisible: this.testRunnerView.$data.isVisible,
	      testResults: this.testRunnerView.$store.state.testResults,
	      testTree: this.testRunnerView.$store.state.testTree,
	      selectedTestConfigIndex: this.testRunnerView.$store.state.selectedTestConfigIndex
	    };
	  },
	  consumeService: function consumeService(service) {
	    this.testRunnerView.$store.dispatch("appendRunner", { key: service.key, runner: service.runner });
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("vuex");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _vuex = __webpack_require__(2);
	
	module.exports = {
	  name: "TestInfo",
	  mounted: function mounted() {
	    atom.tooltips.add(this.$refs.runButton, {
	      title: "Run Test Config",
	      placement: "bottom"
	    });
	    atom.tooltips.add(this.$refs.searchButton, {
	      title: "Discover Test Configs",
	      placement: "bottom"
	    });
	  },
	  methods: _extends({}, (0, _vuex.mapActions)(['loadTestConfigs', 'runCurrentTestConfig', 'runFailedTests'])),
	  computed: _extends({
	    'progressClass': function progressClass() {
	      return {
	        'progress-successful': !this.testResults.testsError && !this.testResults.testsFailed,
	        'progress-error': this.testResults.testsError || this.testResults.testsFailed
	      };
	    },
	    progress: function progress() {
	      if (this.testResults.testsTotal == 0) return 0;
	      return this.testResults.testsFinished / this.testResults.testsTotal * 100;
	    },
	    'selectedTestConfigIndex': {
	      get: function get() {
	        return this.$store.state.selectedTestConfigIndex;
	      },
	      set: function set(value) {
	        this.$store.commit('selectTestConfigByIndex', value);
	      }
	    }
	  }, (0, _vuex.mapState)(['testConfigs', 'testResults']))
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	
	__webpack_require__(20);
	
	var _xterm = __webpack_require__(40);
	
	var _xterm2 = _interopRequireDefault(_xterm);
	
	var _vuex = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  name: 'TestLog',
	  mounted: function mounted() {
	    _xterm2.default.loadAddon("fit");
	    this.term = new _xterm2.default();
	    this.term.open(this.$refs.terminal);
	  },
	  computed: _extends({}, (0, _vuex.mapState)(['selectedTest'])),
	  watch: {
	    'selectedTest': function selectedTest() {
	      this.term.fit();
	      this.term.clear();
	      this.term.write(this.selectedTest.log.join(__webpack_require__(38).EOL));
	    }
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _vuex = __webpack_require__(2);
	
	var _testInfo = __webpack_require__(21);
	
	var _testInfo2 = _interopRequireDefault(_testInfo);
	
	var _testTree = __webpack_require__(25);
	
	var _testTree2 = _interopRequireDefault(_testTree);
	
	var _testLog = __webpack_require__(22);
	
	var _testLog2 = _interopRequireDefault(_testLog);
	
	var _store = __webpack_require__(11);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  name: "TestRunner",
	  store: _store2.default,
	  components: {
	    TestInfo: _testInfo2.default,
	    TestTree: _testTree2.default,
	    TestLog: _testLog2.default
	  },
	  data: function data() {
	    return {
	      'isVisible': false
	    };
	  },
	  methods: _extends({
	    toggle: function toggle() {
	      this.isVisible = !this.isVisible;
	    }
	  }, (0, _vuex.mapActions)(['runAllTests', 'runFailedTests'])),
	  watch: {
	    'isVisible': function isVisible() {
	      if (this.isVisible) {
	        this.panel.show();
	      } else {
	        this.panel.hide();
	      }
	    }
	  },
	  created: function created() {
	    var element = document.createElement('div');
	    this.panel = atom.workspace.addBottomPanel({
	      item: element,
	      visible: this.isVisible
	    });
	    this.$mount(element);
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	
	module.exports = {
	  name: "TestTreeNode",
	  props: ['item'],
	  data: function data() {
	    return {
	      isExpanded: false
	    };
	  },
	
	  methods: {
	    onClick: function onClick(event) {
	      this.isExpanded = !this.isExpanded;
	      if (this.item.isTest) this.$store.commit('setSelectTest', this.item);
	    },
	    onDblClick: function onDblClick(event) {
	      if (this.item.isTest) {
	        if (this.item.filename !== undefined) {
	          atom.workspace.open(this.item.filename, {
	            initialLine: this.item.line - 1,
	            initialColumn: this.item.column - 1
	          });
	        }
	      }
	    }
	  },
	  computed: {
	    classObject: function classObject() {
	      return {
	        directory: this.item.isContainer,
	        'list-nested-item': this.item.isContainer,
	        expanded: this.isExpanded,
	        collapsed: !this.isExpanded,
	        file: !this.item.isContainer,
	        'list-item': !this.item.isContainer,
	        selected: this.item === this.$store.state.selectedTest
	      };
	    },
	    iconClass: function iconClass() {
	      return {
	        'fa fa-cubes': this.item.isPackage,
	        'fa fa-file-code-o': this.item.isClass,
	        'fa fa-list-ul': this.item.isTest
	      };
	    }
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _jquery = __webpack_require__(36);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _vuex = __webpack_require__(2);
	
	var _testTreeNode = __webpack_require__(24);
	
	var _testTreeNode2 = _interopRequireDefault(_testTreeNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  name: "TestTree",
	  components: {
	    TestTreeNode: _testTreeNode2.default
	  },
	  data: function data() {
	    return {};
	  },
	
	  computed: _extends({}, (0, _vuex.mapState)(["testTree"])),
	  methods: {
	    startResize: function startResize(event) {
	      this.isResizing = true;
	      this.xOld = event.screenX;
	      (0, _jquery2.default)("body").on("mousemove", this.handleResize);
	      (0, _jquery2.default)("body").on("mouseup", this.stopResize);
	    },
	    handleResize: function handleResize(event) {
	      var obj = (0, _jquery2.default)(this.$refs.content);
	      if (this.isResizing) {
	        obj.width(obj.width() - (this.xOld - event.screenX));
	        this.xOld = event.screenX;
	      }
	    },
	    stopResize: function stopResize(event) {
	      this.isResizing = false;
	      (0, _jquery2.default)("body").off("moseup", this.stopResize);
	      (0, _jquery2.default)("body").off("mousemove", this.handleResize);
	    }
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	var actions = {
	  loadTestConfigs: function loadTestConfigs(context) {
	    var testConfigs = [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = atom.project.getPaths()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var projectPath = _step.value;
	
	        var configFile = path.join(projectPath, ".trrc");
	        try {
	          var stat = fs.statSync(configFile);
	        } catch (e) {
	          return;
	        }
	
	        var configs;
	        try {
	          configs = yaml.safeLoad(fs.readFileSync(configFile, "utf8"));
	        } catch (e) {
	          atom.notifications.addError("Could not load test runner config file.", {
	            detail: e
	          });
	          return;
	        }
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	          for (var _iterator2 = configs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var config = _step2.value;
	
	            config.projectPath = projectPath;
	            /* Check for no name and generate one */
	            if (!("name" in config)) config.name = "Test Config Nr. " + (configs.indexOf(config) + 1);
	            /* Check for no runner */
	            if (!("runner" in config)) {
	              atom.notifications.addWarning("No runner for defined for: " + config.name);
	              config.runner = "unknown";
	            }
	            Object.defineProperty(config, "displayName", {
	              get: function get() {
	                if (this._runner == null) {
	                  return this.name;
	                } else {
	                  return this.name + " (" + this._runner.name + ")";
	                }
	              }
	            });
	            if (config.runner in context.state.runners) {
	              config._runner = new context.state.runners[config.runner](config);
	              config._runner.onTestStart(function (test) {
	                context.commit("incrementTestsStarted");
	              });
	              config._runner.onTestEnd(function (testResult) {
	                context.commit("addTestResult", testResult);
	              });
	            } else config._runner = null;
	            testConfigs.push(config);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    context.commit("setTestConfigs", testConfigs);
	  },
	
	  runCurrentTestConfig: function runCurrentTestConfig(context) {
	    var testConfig = context.getters.selectedTestConfig;
	    if (testConfig == null) {
	      atom.notifications.addError("No test config selected.");
	      return;
	    }
	    if (testConfig._runner == null) {
	      atom.notifications.addError(testConfig.name + "  has no test runner.");
	      return;
	    }
	    testConfig._runner.getTests().then(function (tests) {
	      context.commit("clearTestResults");
	      context.commit("setTests", tests);
	      testConfig._runner.runAllTests();
	    }, function (err) {
	      atom.notifications.addError("Failed to load tests for: " + testConfig.name, { detail: err });
	    });
	  },
	  runFailedTests: function runFailedTests(context) {
	    var testConfig = context.getters.selectedTestConfig;
	    if (testConfig == null) {
	      atom.notifications.addError("No test config selected.");
	      return;
	    }
	    if (testConfig._runner == null) {
	      atom.notifications.addError(testConfig.name + "  has no test runner.");
	      return;
	    }
	    var failedTests = [];
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;
	
	    try {
	      for (var _iterator3 = context.state.tests[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var test = _step3.value;
	
	        if (test.hasFailed) failedTests.push(test);
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }
	
	    context.commit("clearTestResults");
	    context.commit("setTests", failedTests);
	    testConfig._runner.runTests(failedTests);
	  },
	  appendRunner: function appendRunner(context, options) {
	    context.commit("appendRunner", options);
	    context.dispatch("loadTestConfigs");
	  }
	};
	
	module.exports = actions;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(2);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _fs = __webpack_require__(35);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _path = __webpack_require__(39);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _jsYaml = __webpack_require__(37);
	
	var _jsYaml2 = _interopRequireDefault(_jsYaml);
	
	var _state = __webpack_require__(13);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _mutations = __webpack_require__(12);
	
	var _mutations2 = _interopRequireDefault(_mutations);
	
	var _actions = __webpack_require__(10);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vuex2.default);
	
	var getters = {
	  selectedTestConfig: function selectedTestConfig(state) {
	    if (state.selectedTestConfigIndex < 0 && state.selectedTestConfigIndex > state.testConfigs.length) return null;else return state.testConfigs[state.selectedTestConfigIndex];
	  }
	};
	
	exports.default = new _vuex2.default.Store({
	  state: _state2.default,
	  mutations: _mutations2.default,
	  actions: _actions2.default,
	  getters: getters
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var mutations = {
	  appendRunner: function appendRunner(state, _ref) {
	    var key = _ref.key,
	        runner = _ref.runner;
	
	    var runners = state.runners;
	    runners[key] = runner;
	    state.runners = runners;
	  },
	  selectTestConfigByIndex: function selectTestConfigByIndex(state, index) {
	    if (index < 0 && index > state.testConfigs.length) return;
	    state.selectedTestConfigIndex = index;
	  },
	  setTestTree: function setTestTree(state, testTree) {
	    state.testTree = testTree;
	  },
	  setSelectTest: function setSelectTest(state, test) {
	    state.selectedTest = test;
	  },
	  setTestResults: function setTestResults(state, testResults) {
	    state.testResults = testResults;
	  },
	  clearTestResults: function clearTestResults(state) {
	    state.testResults = {
	      testsStarted: 0,
	      testsFinished: 0,
	      testsTotal: 0,
	      testsPassed: 0,
	      testsFailed: 0,
	      testsError: 0,
	      duration: 0
	    };
	  },
	  setTestConfigs: function setTestConfigs(state, testConfigs) {
	    state.testConfigs = testConfigs;
	  },
	  setTests: function setTests(state, tests) {
	    var testTree = {
	      childItems: {}
	    };
	    state.tests.length = 0;
	    var element = testTree;
	    var parent = null;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = tests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var test = _step.value;
	
	        element = testTree;
	        if (test.packageNames instanceof Array) {
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;
	
	          try {
	            for (var _iterator2 = test.packageNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var pkgName = _step2.value;
	
	              if (_typeof(element.childItems[pkgName]) !== "object") {
	                element.childItems[pkgName] = {
	                  isContainer: true,
	                  isPackage: true,
	                  duration: 0,
	                  name: pkgName,
	                  parent: parent,
	                  childItems: {}
	                };
	              }
	              parent = element;
	              element = element.childItems[pkgName];
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	        }
	        if (typeof test.classname === "string") {
	          if (_typeof(element.childItems[test.classname]) !== "object") {
	            element.childItems[test.classname] = {
	              isContainer: true,
	              isClass: true,
	              duration: 0,
	              name: test.classname,
	              parent: parent,
	              childItems: {}
	            };
	          }
	          parent = element;
	          element = element.childItems[test.classname];
	        }
	        element.childItems[test.testname] = {
	          isContainer: false,
	          isTest: true,
	          filename: test.filename,
	          line: test.line,
	          column: test.column,
	          duration: 0,
	          name: test.testname,
	          testIdentifier: test.testIdentifier,
	          testname: test.testname,
	          classname: test.classname,
	          packageNames: test.packageNames,
	          parent: parent,
	          childItems: {},
	          hasRun: false,
	          hasFailed: false,
	          hasError: false,
	          log: [],
	          traceback: []
	        };
	        state.tests.push(element.childItems[test.testname]);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    state.testResults.testsTotal = tests.length;
	    state.testTree = testTree;
	  },
	  addTestResult: function addTestResult(state, result) {
	    /* Discover testTree entry */
	    var test = state.testTree.childItems;
	    if (result.packageNames instanceof Array) {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = result.packageNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var pkgName = _step3.value;
	
	          test = test[pkgName];
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	    if (typeof result.classname === "string") {
	      test = test.childItems[result.classname];
	    }
	    if (result.testname in test.childItems) {
	      test = test.childItems[result.testname];
	    } else {
	      return;
	    }
	    /* Set result */
	    test.hasRun = true;
	    test.hasFailed = result.hasFailed;
	    test.hasError = result.hasError;
	    test.log = result.log;
	    test.traceback = result.traceback;
	    /* recursive duration */
	    var entry = test;
	    while (entry !== null) {
	      entry.duration += result.duration;
	      entry = entry.parent;
	    }
	    state.testResults.duration += result.duration;
	    state.testResults.testsFinished += 1;
	    if (result.hasError) state.testResults.testsError += 1;
	    if (result.hasFailed) state.testResults.testsFailed += 1;
	  },
	  incrementTestsStarted: function incrementTestsStarted(state) {
	    state.testResults.testsStarted += 1;
	  }
	};
	
	module.exports = mutations;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	var state = {
	  runners: {},
	  selectedTest: null,
	  selectedTestConfigIndex: -1,
	  testConfigs: [],
	  testTree: {},
	  tests: [],
	  testResults: {
	    testsStarted: 0,
	    testsFinished: 0,
	    testsTotal: 0,
	    testsPassed: 0,
	    testsFailed: 0,
	    testsError: 0,
	    duration: 0
	  }
	};
	
	module.exports = state;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * xterm.js: xterm, in the browser\n * Copyright (c) 2014-2016, SourceLair Private Company (www.sourcelair.com (MIT License)\n * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)\n * https://github.com/chjj/term.js\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n *\n * Originally forked from (with the author's permission):\n *   Fabrice Bellard's javascript vt100 for jslinux:\n *   http://bellard.org/jslinux/\n *   Copyright (c) 2011 Fabrice Bellard\n *   The original design remains. The terminal itself\n *   has been extended to include xterm CSI codes, among\n *   other features.\n */\n\n/*\n *  Default style for xterm.js\n */\n\n.terminal {\n    background-color: #000;\n    color: #fff;\n    font-family: courier-new, courier, monospace;\n    font-feature-settings: \"liga\" 0;\n    position: relative;\n}\n\n.terminal.focus,\n.terminal:focus {\n    outline: none;\n}\n\n.terminal .xterm-helpers {\n    position: absolute;\n    top: 0;\n}\n\n.terminal .xterm-helper-textarea {\n    /*\n     * HACK: to fix IE's blinking cursor\n     * Move textarea out of the screen to the far left, so that the cursor is not visible.\n     */\n    position: absolute;\n    opacity: 0;\n    left: -9999em;\n    top: -9999em;\n    width: 0;\n    height: 0;\n    z-index: -10;\n    /** Prevent wrapping so the IME appears against the textarea at the correct position */\n    white-space: nowrap;\n    overflow: hidden;\n    resize: none;\n}\n\n.terminal .terminal-cursor {\n    background-color: #fff;\n    color: #000;\n}\n\n.terminal:not(.focus) .terminal-cursor {\n    outline: 1px solid #fff;\n    outline-offset: -1px;\n    background-color: transparent;\n}\n\n.terminal.focus .terminal-cursor.blinking {\n    animation: blink-cursor 1.2s infinite step-end;\n}\n\n@keyframes blink-cursor {\n    0% {\n        background-color: #fff;\n        color: #000;\n    }\n    50% {\n        background-color: transparent;\n        color: #FFF;\n    }\n}\n\n.terminal .composition-view {\n    background: #000;\n    color: #FFF;\n    display: none;\n    position: absolute;\n    white-space: nowrap;\n    z-index: 1;\n}\n\n.terminal .composition-view.active {\n    display: block;\n}\n\n.terminal .xterm-viewport {\n    /* On OS X this is required in order for the scroll bar to appear fully opaque */\n    background-color: #000;\n    overflow-y: scroll;\n}\n\n.terminal .xterm-rows {\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.terminal .xterm-rows > div {\n    /* Lines containing spans and text nodes ocassionally wrap despite being the same width (#327) */\n    white-space: nowrap;\n}\n\n.terminal .xterm-scroll-area {\n    visibility: hidden;\n}\n\n.terminal .xterm-char-measure-element {\n    display: inline-block;\n    visibility: hidden;\n    position: absolute;\n    left: -9999em;\n}\n\n/*\n *  Determine default colors for xterm.js\n */\n.terminal .xterm-bold {\n    font-weight: bold;\n}\n\n.terminal .xterm-underline {\n    text-decoration: underline;\n}\n\n.terminal .xterm-blink {\n    text-decoration: blink;\n}\n\n.terminal .xterm-hidden {\n    visibility: hidden;\n}\n\n.terminal .xterm-color-0 {\n    color: #2e3436;\n}\n\n.terminal .xterm-bg-color-0 {\n    background-color: #2e3436;\n}\n\n.terminal .xterm-color-1 {\n    color: #cc0000;\n}\n\n.terminal .xterm-bg-color-1 {\n    background-color: #cc0000;\n}\n\n.terminal .xterm-color-2 {\n    color: #4e9a06;\n}\n\n.terminal .xterm-bg-color-2 {\n    background-color: #4e9a06;\n}\n\n.terminal .xterm-color-3 {\n    color: #c4a000;\n}\n\n.terminal .xterm-bg-color-3 {\n    background-color: #c4a000;\n}\n\n.terminal .xterm-color-4 {\n    color: #3465a4;\n}\n\n.terminal .xterm-bg-color-4 {\n    background-color: #3465a4;\n}\n\n.terminal .xterm-color-5 {\n    color: #75507b;\n}\n\n.terminal .xterm-bg-color-5 {\n    background-color: #75507b;\n}\n\n.terminal .xterm-color-6 {\n    color: #06989a;\n}\n\n.terminal .xterm-bg-color-6 {\n    background-color: #06989a;\n}\n\n.terminal .xterm-color-7 {\n    color: #d3d7cf;\n}\n\n.terminal .xterm-bg-color-7 {\n    background-color: #d3d7cf;\n}\n\n.terminal .xterm-color-8 {\n    color: #555753;\n}\n\n.terminal .xterm-bg-color-8 {\n    background-color: #555753;\n}\n\n.terminal .xterm-color-9 {\n    color: #ef2929;\n}\n\n.terminal .xterm-bg-color-9 {\n    background-color: #ef2929;\n}\n\n.terminal .xterm-color-10 {\n    color: #8ae234;\n}\n\n.terminal .xterm-bg-color-10 {\n    background-color: #8ae234;\n}\n\n.terminal .xterm-color-11 {\n    color: #fce94f;\n}\n\n.terminal .xterm-bg-color-11 {\n    background-color: #fce94f;\n}\n\n.terminal .xterm-color-12 {\n    color: #729fcf;\n}\n\n.terminal .xterm-bg-color-12 {\n    background-color: #729fcf;\n}\n\n.terminal .xterm-color-13 {\n    color: #ad7fa8;\n}\n\n.terminal .xterm-bg-color-13 {\n    background-color: #ad7fa8;\n}\n\n.terminal .xterm-color-14 {\n    color: #34e2e2;\n}\n\n.terminal .xterm-bg-color-14 {\n    background-color: #34e2e2;\n}\n\n.terminal .xterm-color-15 {\n    color: #eeeeec;\n}\n\n.terminal .xterm-bg-color-15 {\n    background-color: #eeeeec;\n}\n\n.terminal .xterm-color-16 {\n    color: #000000;\n}\n\n.terminal .xterm-bg-color-16 {\n    background-color: #000000;\n}\n\n.terminal .xterm-color-17 {\n    color: #00005f;\n}\n\n.terminal .xterm-bg-color-17 {\n    background-color: #00005f;\n}\n\n.terminal .xterm-color-18 {\n    color: #000087;\n}\n\n.terminal .xterm-bg-color-18 {\n    background-color: #000087;\n}\n\n.terminal .xterm-color-19 {\n    color: #0000af;\n}\n\n.terminal .xterm-bg-color-19 {\n    background-color: #0000af;\n}\n\n.terminal .xterm-color-20 {\n    color: #0000d7;\n}\n\n.terminal .xterm-bg-color-20 {\n    background-color: #0000d7;\n}\n\n.terminal .xterm-color-21 {\n    color: #0000ff;\n}\n\n.terminal .xterm-bg-color-21 {\n    background-color: #0000ff;\n}\n\n.terminal .xterm-color-22 {\n    color: #005f00;\n}\n\n.terminal .xterm-bg-color-22 {\n    background-color: #005f00;\n}\n\n.terminal .xterm-color-23 {\n    color: #005f5f;\n}\n\n.terminal .xterm-bg-color-23 {\n    background-color: #005f5f;\n}\n\n.terminal .xterm-color-24 {\n    color: #005f87;\n}\n\n.terminal .xterm-bg-color-24 {\n    background-color: #005f87;\n}\n\n.terminal .xterm-color-25 {\n    color: #005faf;\n}\n\n.terminal .xterm-bg-color-25 {\n    background-color: #005faf;\n}\n\n.terminal .xterm-color-26 {\n    color: #005fd7;\n}\n\n.terminal .xterm-bg-color-26 {\n    background-color: #005fd7;\n}\n\n.terminal .xterm-color-27 {\n    color: #005fff;\n}\n\n.terminal .xterm-bg-color-27 {\n    background-color: #005fff;\n}\n\n.terminal .xterm-color-28 {\n    color: #008700;\n}\n\n.terminal .xterm-bg-color-28 {\n    background-color: #008700;\n}\n\n.terminal .xterm-color-29 {\n    color: #00875f;\n}\n\n.terminal .xterm-bg-color-29 {\n    background-color: #00875f;\n}\n\n.terminal .xterm-color-30 {\n    color: #008787;\n}\n\n.terminal .xterm-bg-color-30 {\n    background-color: #008787;\n}\n\n.terminal .xterm-color-31 {\n    color: #0087af;\n}\n\n.terminal .xterm-bg-color-31 {\n    background-color: #0087af;\n}\n\n.terminal .xterm-color-32 {\n    color: #0087d7;\n}\n\n.terminal .xterm-bg-color-32 {\n    background-color: #0087d7;\n}\n\n.terminal .xterm-color-33 {\n    color: #0087ff;\n}\n\n.terminal .xterm-bg-color-33 {\n    background-color: #0087ff;\n}\n\n.terminal .xterm-color-34 {\n    color: #00af00;\n}\n\n.terminal .xterm-bg-color-34 {\n    background-color: #00af00;\n}\n\n.terminal .xterm-color-35 {\n    color: #00af5f;\n}\n\n.terminal .xterm-bg-color-35 {\n    background-color: #00af5f;\n}\n\n.terminal .xterm-color-36 {\n    color: #00af87;\n}\n\n.terminal .xterm-bg-color-36 {\n    background-color: #00af87;\n}\n\n.terminal .xterm-color-37 {\n    color: #00afaf;\n}\n\n.terminal .xterm-bg-color-37 {\n    background-color: #00afaf;\n}\n\n.terminal .xterm-color-38 {\n    color: #00afd7;\n}\n\n.terminal .xterm-bg-color-38 {\n    background-color: #00afd7;\n}\n\n.terminal .xterm-color-39 {\n    color: #00afff;\n}\n\n.terminal .xterm-bg-color-39 {\n    background-color: #00afff;\n}\n\n.terminal .xterm-color-40 {\n    color: #00d700;\n}\n\n.terminal .xterm-bg-color-40 {\n    background-color: #00d700;\n}\n\n.terminal .xterm-color-41 {\n    color: #00d75f;\n}\n\n.terminal .xterm-bg-color-41 {\n    background-color: #00d75f;\n}\n\n.terminal .xterm-color-42 {\n    color: #00d787;\n}\n\n.terminal .xterm-bg-color-42 {\n    background-color: #00d787;\n}\n\n.terminal .xterm-color-43 {\n    color: #00d7af;\n}\n\n.terminal .xterm-bg-color-43 {\n    background-color: #00d7af;\n}\n\n.terminal .xterm-color-44 {\n    color: #00d7d7;\n}\n\n.terminal .xterm-bg-color-44 {\n    background-color: #00d7d7;\n}\n\n.terminal .xterm-color-45 {\n    color: #00d7ff;\n}\n\n.terminal .xterm-bg-color-45 {\n    background-color: #00d7ff;\n}\n\n.terminal .xterm-color-46 {\n    color: #00ff00;\n}\n\n.terminal .xterm-bg-color-46 {\n    background-color: #00ff00;\n}\n\n.terminal .xterm-color-47 {\n    color: #00ff5f;\n}\n\n.terminal .xterm-bg-color-47 {\n    background-color: #00ff5f;\n}\n\n.terminal .xterm-color-48 {\n    color: #00ff87;\n}\n\n.terminal .xterm-bg-color-48 {\n    background-color: #00ff87;\n}\n\n.terminal .xterm-color-49 {\n    color: #00ffaf;\n}\n\n.terminal .xterm-bg-color-49 {\n    background-color: #00ffaf;\n}\n\n.terminal .xterm-color-50 {\n    color: #00ffd7;\n}\n\n.terminal .xterm-bg-color-50 {\n    background-color: #00ffd7;\n}\n\n.terminal .xterm-color-51 {\n    color: #00ffff;\n}\n\n.terminal .xterm-bg-color-51 {\n    background-color: #00ffff;\n}\n\n.terminal .xterm-color-52 {\n    color: #5f0000;\n}\n\n.terminal .xterm-bg-color-52 {\n    background-color: #5f0000;\n}\n\n.terminal .xterm-color-53 {\n    color: #5f005f;\n}\n\n.terminal .xterm-bg-color-53 {\n    background-color: #5f005f;\n}\n\n.terminal .xterm-color-54 {\n    color: #5f0087;\n}\n\n.terminal .xterm-bg-color-54 {\n    background-color: #5f0087;\n}\n\n.terminal .xterm-color-55 {\n    color: #5f00af;\n}\n\n.terminal .xterm-bg-color-55 {\n    background-color: #5f00af;\n}\n\n.terminal .xterm-color-56 {\n    color: #5f00d7;\n}\n\n.terminal .xterm-bg-color-56 {\n    background-color: #5f00d7;\n}\n\n.terminal .xterm-color-57 {\n    color: #5f00ff;\n}\n\n.terminal .xterm-bg-color-57 {\n    background-color: #5f00ff;\n}\n\n.terminal .xterm-color-58 {\n    color: #5f5f00;\n}\n\n.terminal .xterm-bg-color-58 {\n    background-color: #5f5f00;\n}\n\n.terminal .xterm-color-59 {\n    color: #5f5f5f;\n}\n\n.terminal .xterm-bg-color-59 {\n    background-color: #5f5f5f;\n}\n\n.terminal .xterm-color-60 {\n    color: #5f5f87;\n}\n\n.terminal .xterm-bg-color-60 {\n    background-color: #5f5f87;\n}\n\n.terminal .xterm-color-61 {\n    color: #5f5faf;\n}\n\n.terminal .xterm-bg-color-61 {\n    background-color: #5f5faf;\n}\n\n.terminal .xterm-color-62 {\n    color: #5f5fd7;\n}\n\n.terminal .xterm-bg-color-62 {\n    background-color: #5f5fd7;\n}\n\n.terminal .xterm-color-63 {\n    color: #5f5fff;\n}\n\n.terminal .xterm-bg-color-63 {\n    background-color: #5f5fff;\n}\n\n.terminal .xterm-color-64 {\n    color: #5f8700;\n}\n\n.terminal .xterm-bg-color-64 {\n    background-color: #5f8700;\n}\n\n.terminal .xterm-color-65 {\n    color: #5f875f;\n}\n\n.terminal .xterm-bg-color-65 {\n    background-color: #5f875f;\n}\n\n.terminal .xterm-color-66 {\n    color: #5f8787;\n}\n\n.terminal .xterm-bg-color-66 {\n    background-color: #5f8787;\n}\n\n.terminal .xterm-color-67 {\n    color: #5f87af;\n}\n\n.terminal .xterm-bg-color-67 {\n    background-color: #5f87af;\n}\n\n.terminal .xterm-color-68 {\n    color: #5f87d7;\n}\n\n.terminal .xterm-bg-color-68 {\n    background-color: #5f87d7;\n}\n\n.terminal .xterm-color-69 {\n    color: #5f87ff;\n}\n\n.terminal .xterm-bg-color-69 {\n    background-color: #5f87ff;\n}\n\n.terminal .xterm-color-70 {\n    color: #5faf00;\n}\n\n.terminal .xterm-bg-color-70 {\n    background-color: #5faf00;\n}\n\n.terminal .xterm-color-71 {\n    color: #5faf5f;\n}\n\n.terminal .xterm-bg-color-71 {\n    background-color: #5faf5f;\n}\n\n.terminal .xterm-color-72 {\n    color: #5faf87;\n}\n\n.terminal .xterm-bg-color-72 {\n    background-color: #5faf87;\n}\n\n.terminal .xterm-color-73 {\n    color: #5fafaf;\n}\n\n.terminal .xterm-bg-color-73 {\n    background-color: #5fafaf;\n}\n\n.terminal .xterm-color-74 {\n    color: #5fafd7;\n}\n\n.terminal .xterm-bg-color-74 {\n    background-color: #5fafd7;\n}\n\n.terminal .xterm-color-75 {\n    color: #5fafff;\n}\n\n.terminal .xterm-bg-color-75 {\n    background-color: #5fafff;\n}\n\n.terminal .xterm-color-76 {\n    color: #5fd700;\n}\n\n.terminal .xterm-bg-color-76 {\n    background-color: #5fd700;\n}\n\n.terminal .xterm-color-77 {\n    color: #5fd75f;\n}\n\n.terminal .xterm-bg-color-77 {\n    background-color: #5fd75f;\n}\n\n.terminal .xterm-color-78 {\n    color: #5fd787;\n}\n\n.terminal .xterm-bg-color-78 {\n    background-color: #5fd787;\n}\n\n.terminal .xterm-color-79 {\n    color: #5fd7af;\n}\n\n.terminal .xterm-bg-color-79 {\n    background-color: #5fd7af;\n}\n\n.terminal .xterm-color-80 {\n    color: #5fd7d7;\n}\n\n.terminal .xterm-bg-color-80 {\n    background-color: #5fd7d7;\n}\n\n.terminal .xterm-color-81 {\n    color: #5fd7ff;\n}\n\n.terminal .xterm-bg-color-81 {\n    background-color: #5fd7ff;\n}\n\n.terminal .xterm-color-82 {\n    color: #5fff00;\n}\n\n.terminal .xterm-bg-color-82 {\n    background-color: #5fff00;\n}\n\n.terminal .xterm-color-83 {\n    color: #5fff5f;\n}\n\n.terminal .xterm-bg-color-83 {\n    background-color: #5fff5f;\n}\n\n.terminal .xterm-color-84 {\n    color: #5fff87;\n}\n\n.terminal .xterm-bg-color-84 {\n    background-color: #5fff87;\n}\n\n.terminal .xterm-color-85 {\n    color: #5fffaf;\n}\n\n.terminal .xterm-bg-color-85 {\n    background-color: #5fffaf;\n}\n\n.terminal .xterm-color-86 {\n    color: #5fffd7;\n}\n\n.terminal .xterm-bg-color-86 {\n    background-color: #5fffd7;\n}\n\n.terminal .xterm-color-87 {\n    color: #5fffff;\n}\n\n.terminal .xterm-bg-color-87 {\n    background-color: #5fffff;\n}\n\n.terminal .xterm-color-88 {\n    color: #870000;\n}\n\n.terminal .xterm-bg-color-88 {\n    background-color: #870000;\n}\n\n.terminal .xterm-color-89 {\n    color: #87005f;\n}\n\n.terminal .xterm-bg-color-89 {\n    background-color: #87005f;\n}\n\n.terminal .xterm-color-90 {\n    color: #870087;\n}\n\n.terminal .xterm-bg-color-90 {\n    background-color: #870087;\n}\n\n.terminal .xterm-color-91 {\n    color: #8700af;\n}\n\n.terminal .xterm-bg-color-91 {\n    background-color: #8700af;\n}\n\n.terminal .xterm-color-92 {\n    color: #8700d7;\n}\n\n.terminal .xterm-bg-color-92 {\n    background-color: #8700d7;\n}\n\n.terminal .xterm-color-93 {\n    color: #8700ff;\n}\n\n.terminal .xterm-bg-color-93 {\n    background-color: #8700ff;\n}\n\n.terminal .xterm-color-94 {\n    color: #875f00;\n}\n\n.terminal .xterm-bg-color-94 {\n    background-color: #875f00;\n}\n\n.terminal .xterm-color-95 {\n    color: #875f5f;\n}\n\n.terminal .xterm-bg-color-95 {\n    background-color: #875f5f;\n}\n\n.terminal .xterm-color-96 {\n    color: #875f87;\n}\n\n.terminal .xterm-bg-color-96 {\n    background-color: #875f87;\n}\n\n.terminal .xterm-color-97 {\n    color: #875faf;\n}\n\n.terminal .xterm-bg-color-97 {\n    background-color: #875faf;\n}\n\n.terminal .xterm-color-98 {\n    color: #875fd7;\n}\n\n.terminal .xterm-bg-color-98 {\n    background-color: #875fd7;\n}\n\n.terminal .xterm-color-99 {\n    color: #875fff;\n}\n\n.terminal .xterm-bg-color-99 {\n    background-color: #875fff;\n}\n\n.terminal .xterm-color-100 {\n    color: #878700;\n}\n\n.terminal .xterm-bg-color-100 {\n    background-color: #878700;\n}\n\n.terminal .xterm-color-101 {\n    color: #87875f;\n}\n\n.terminal .xterm-bg-color-101 {\n    background-color: #87875f;\n}\n\n.terminal .xterm-color-102 {\n    color: #878787;\n}\n\n.terminal .xterm-bg-color-102 {\n    background-color: #878787;\n}\n\n.terminal .xterm-color-103 {\n    color: #8787af;\n}\n\n.terminal .xterm-bg-color-103 {\n    background-color: #8787af;\n}\n\n.terminal .xterm-color-104 {\n    color: #8787d7;\n}\n\n.terminal .xterm-bg-color-104 {\n    background-color: #8787d7;\n}\n\n.terminal .xterm-color-105 {\n    color: #8787ff;\n}\n\n.terminal .xterm-bg-color-105 {\n    background-color: #8787ff;\n}\n\n.terminal .xterm-color-106 {\n    color: #87af00;\n}\n\n.terminal .xterm-bg-color-106 {\n    background-color: #87af00;\n}\n\n.terminal .xterm-color-107 {\n    color: #87af5f;\n}\n\n.terminal .xterm-bg-color-107 {\n    background-color: #87af5f;\n}\n\n.terminal .xterm-color-108 {\n    color: #87af87;\n}\n\n.terminal .xterm-bg-color-108 {\n    background-color: #87af87;\n}\n\n.terminal .xterm-color-109 {\n    color: #87afaf;\n}\n\n.terminal .xterm-bg-color-109 {\n    background-color: #87afaf;\n}\n\n.terminal .xterm-color-110 {\n    color: #87afd7;\n}\n\n.terminal .xterm-bg-color-110 {\n    background-color: #87afd7;\n}\n\n.terminal .xterm-color-111 {\n    color: #87afff;\n}\n\n.terminal .xterm-bg-color-111 {\n    background-color: #87afff;\n}\n\n.terminal .xterm-color-112 {\n    color: #87d700;\n}\n\n.terminal .xterm-bg-color-112 {\n    background-color: #87d700;\n}\n\n.terminal .xterm-color-113 {\n    color: #87d75f;\n}\n\n.terminal .xterm-bg-color-113 {\n    background-color: #87d75f;\n}\n\n.terminal .xterm-color-114 {\n    color: #87d787;\n}\n\n.terminal .xterm-bg-color-114 {\n    background-color: #87d787;\n}\n\n.terminal .xterm-color-115 {\n    color: #87d7af;\n}\n\n.terminal .xterm-bg-color-115 {\n    background-color: #87d7af;\n}\n\n.terminal .xterm-color-116 {\n    color: #87d7d7;\n}\n\n.terminal .xterm-bg-color-116 {\n    background-color: #87d7d7;\n}\n\n.terminal .xterm-color-117 {\n    color: #87d7ff;\n}\n\n.terminal .xterm-bg-color-117 {\n    background-color: #87d7ff;\n}\n\n.terminal .xterm-color-118 {\n    color: #87ff00;\n}\n\n.terminal .xterm-bg-color-118 {\n    background-color: #87ff00;\n}\n\n.terminal .xterm-color-119 {\n    color: #87ff5f;\n}\n\n.terminal .xterm-bg-color-119 {\n    background-color: #87ff5f;\n}\n\n.terminal .xterm-color-120 {\n    color: #87ff87;\n}\n\n.terminal .xterm-bg-color-120 {\n    background-color: #87ff87;\n}\n\n.terminal .xterm-color-121 {\n    color: #87ffaf;\n}\n\n.terminal .xterm-bg-color-121 {\n    background-color: #87ffaf;\n}\n\n.terminal .xterm-color-122 {\n    color: #87ffd7;\n}\n\n.terminal .xterm-bg-color-122 {\n    background-color: #87ffd7;\n}\n\n.terminal .xterm-color-123 {\n    color: #87ffff;\n}\n\n.terminal .xterm-bg-color-123 {\n    background-color: #87ffff;\n}\n\n.terminal .xterm-color-124 {\n    color: #af0000;\n}\n\n.terminal .xterm-bg-color-124 {\n    background-color: #af0000;\n}\n\n.terminal .xterm-color-125 {\n    color: #af005f;\n}\n\n.terminal .xterm-bg-color-125 {\n    background-color: #af005f;\n}\n\n.terminal .xterm-color-126 {\n    color: #af0087;\n}\n\n.terminal .xterm-bg-color-126 {\n    background-color: #af0087;\n}\n\n.terminal .xterm-color-127 {\n    color: #af00af;\n}\n\n.terminal .xterm-bg-color-127 {\n    background-color: #af00af;\n}\n\n.terminal .xterm-color-128 {\n    color: #af00d7;\n}\n\n.terminal .xterm-bg-color-128 {\n    background-color: #af00d7;\n}\n\n.terminal .xterm-color-129 {\n    color: #af00ff;\n}\n\n.terminal .xterm-bg-color-129 {\n    background-color: #af00ff;\n}\n\n.terminal .xterm-color-130 {\n    color: #af5f00;\n}\n\n.terminal .xterm-bg-color-130 {\n    background-color: #af5f00;\n}\n\n.terminal .xterm-color-131 {\n    color: #af5f5f;\n}\n\n.terminal .xterm-bg-color-131 {\n    background-color: #af5f5f;\n}\n\n.terminal .xterm-color-132 {\n    color: #af5f87;\n}\n\n.terminal .xterm-bg-color-132 {\n    background-color: #af5f87;\n}\n\n.terminal .xterm-color-133 {\n    color: #af5faf;\n}\n\n.terminal .xterm-bg-color-133 {\n    background-color: #af5faf;\n}\n\n.terminal .xterm-color-134 {\n    color: #af5fd7;\n}\n\n.terminal .xterm-bg-color-134 {\n    background-color: #af5fd7;\n}\n\n.terminal .xterm-color-135 {\n    color: #af5fff;\n}\n\n.terminal .xterm-bg-color-135 {\n    background-color: #af5fff;\n}\n\n.terminal .xterm-color-136 {\n    color: #af8700;\n}\n\n.terminal .xterm-bg-color-136 {\n    background-color: #af8700;\n}\n\n.terminal .xterm-color-137 {\n    color: #af875f;\n}\n\n.terminal .xterm-bg-color-137 {\n    background-color: #af875f;\n}\n\n.terminal .xterm-color-138 {\n    color: #af8787;\n}\n\n.terminal .xterm-bg-color-138 {\n    background-color: #af8787;\n}\n\n.terminal .xterm-color-139 {\n    color: #af87af;\n}\n\n.terminal .xterm-bg-color-139 {\n    background-color: #af87af;\n}\n\n.terminal .xterm-color-140 {\n    color: #af87d7;\n}\n\n.terminal .xterm-bg-color-140 {\n    background-color: #af87d7;\n}\n\n.terminal .xterm-color-141 {\n    color: #af87ff;\n}\n\n.terminal .xterm-bg-color-141 {\n    background-color: #af87ff;\n}\n\n.terminal .xterm-color-142 {\n    color: #afaf00;\n}\n\n.terminal .xterm-bg-color-142 {\n    background-color: #afaf00;\n}\n\n.terminal .xterm-color-143 {\n    color: #afaf5f;\n}\n\n.terminal .xterm-bg-color-143 {\n    background-color: #afaf5f;\n}\n\n.terminal .xterm-color-144 {\n    color: #afaf87;\n}\n\n.terminal .xterm-bg-color-144 {\n    background-color: #afaf87;\n}\n\n.terminal .xterm-color-145 {\n    color: #afafaf;\n}\n\n.terminal .xterm-bg-color-145 {\n    background-color: #afafaf;\n}\n\n.terminal .xterm-color-146 {\n    color: #afafd7;\n}\n\n.terminal .xterm-bg-color-146 {\n    background-color: #afafd7;\n}\n\n.terminal .xterm-color-147 {\n    color: #afafff;\n}\n\n.terminal .xterm-bg-color-147 {\n    background-color: #afafff;\n}\n\n.terminal .xterm-color-148 {\n    color: #afd700;\n}\n\n.terminal .xterm-bg-color-148 {\n    background-color: #afd700;\n}\n\n.terminal .xterm-color-149 {\n    color: #afd75f;\n}\n\n.terminal .xterm-bg-color-149 {\n    background-color: #afd75f;\n}\n\n.terminal .xterm-color-150 {\n    color: #afd787;\n}\n\n.terminal .xterm-bg-color-150 {\n    background-color: #afd787;\n}\n\n.terminal .xterm-color-151 {\n    color: #afd7af;\n}\n\n.terminal .xterm-bg-color-151 {\n    background-color: #afd7af;\n}\n\n.terminal .xterm-color-152 {\n    color: #afd7d7;\n}\n\n.terminal .xterm-bg-color-152 {\n    background-color: #afd7d7;\n}\n\n.terminal .xterm-color-153 {\n    color: #afd7ff;\n}\n\n.terminal .xterm-bg-color-153 {\n    background-color: #afd7ff;\n}\n\n.terminal .xterm-color-154 {\n    color: #afff00;\n}\n\n.terminal .xterm-bg-color-154 {\n    background-color: #afff00;\n}\n\n.terminal .xterm-color-155 {\n    color: #afff5f;\n}\n\n.terminal .xterm-bg-color-155 {\n    background-color: #afff5f;\n}\n\n.terminal .xterm-color-156 {\n    color: #afff87;\n}\n\n.terminal .xterm-bg-color-156 {\n    background-color: #afff87;\n}\n\n.terminal .xterm-color-157 {\n    color: #afffaf;\n}\n\n.terminal .xterm-bg-color-157 {\n    background-color: #afffaf;\n}\n\n.terminal .xterm-color-158 {\n    color: #afffd7;\n}\n\n.terminal .xterm-bg-color-158 {\n    background-color: #afffd7;\n}\n\n.terminal .xterm-color-159 {\n    color: #afffff;\n}\n\n.terminal .xterm-bg-color-159 {\n    background-color: #afffff;\n}\n\n.terminal .xterm-color-160 {\n    color: #d70000;\n}\n\n.terminal .xterm-bg-color-160 {\n    background-color: #d70000;\n}\n\n.terminal .xterm-color-161 {\n    color: #d7005f;\n}\n\n.terminal .xterm-bg-color-161 {\n    background-color: #d7005f;\n}\n\n.terminal .xterm-color-162 {\n    color: #d70087;\n}\n\n.terminal .xterm-bg-color-162 {\n    background-color: #d70087;\n}\n\n.terminal .xterm-color-163 {\n    color: #d700af;\n}\n\n.terminal .xterm-bg-color-163 {\n    background-color: #d700af;\n}\n\n.terminal .xterm-color-164 {\n    color: #d700d7;\n}\n\n.terminal .xterm-bg-color-164 {\n    background-color: #d700d7;\n}\n\n.terminal .xterm-color-165 {\n    color: #d700ff;\n}\n\n.terminal .xterm-bg-color-165 {\n    background-color: #d700ff;\n}\n\n.terminal .xterm-color-166 {\n    color: #d75f00;\n}\n\n.terminal .xterm-bg-color-166 {\n    background-color: #d75f00;\n}\n\n.terminal .xterm-color-167 {\n    color: #d75f5f;\n}\n\n.terminal .xterm-bg-color-167 {\n    background-color: #d75f5f;\n}\n\n.terminal .xterm-color-168 {\n    color: #d75f87;\n}\n\n.terminal .xterm-bg-color-168 {\n    background-color: #d75f87;\n}\n\n.terminal .xterm-color-169 {\n    color: #d75faf;\n}\n\n.terminal .xterm-bg-color-169 {\n    background-color: #d75faf;\n}\n\n.terminal .xterm-color-170 {\n    color: #d75fd7;\n}\n\n.terminal .xterm-bg-color-170 {\n    background-color: #d75fd7;\n}\n\n.terminal .xterm-color-171 {\n    color: #d75fff;\n}\n\n.terminal .xterm-bg-color-171 {\n    background-color: #d75fff;\n}\n\n.terminal .xterm-color-172 {\n    color: #d78700;\n}\n\n.terminal .xterm-bg-color-172 {\n    background-color: #d78700;\n}\n\n.terminal .xterm-color-173 {\n    color: #d7875f;\n}\n\n.terminal .xterm-bg-color-173 {\n    background-color: #d7875f;\n}\n\n.terminal .xterm-color-174 {\n    color: #d78787;\n}\n\n.terminal .xterm-bg-color-174 {\n    background-color: #d78787;\n}\n\n.terminal .xterm-color-175 {\n    color: #d787af;\n}\n\n.terminal .xterm-bg-color-175 {\n    background-color: #d787af;\n}\n\n.terminal .xterm-color-176 {\n    color: #d787d7;\n}\n\n.terminal .xterm-bg-color-176 {\n    background-color: #d787d7;\n}\n\n.terminal .xterm-color-177 {\n    color: #d787ff;\n}\n\n.terminal .xterm-bg-color-177 {\n    background-color: #d787ff;\n}\n\n.terminal .xterm-color-178 {\n    color: #d7af00;\n}\n\n.terminal .xterm-bg-color-178 {\n    background-color: #d7af00;\n}\n\n.terminal .xterm-color-179 {\n    color: #d7af5f;\n}\n\n.terminal .xterm-bg-color-179 {\n    background-color: #d7af5f;\n}\n\n.terminal .xterm-color-180 {\n    color: #d7af87;\n}\n\n.terminal .xterm-bg-color-180 {\n    background-color: #d7af87;\n}\n\n.terminal .xterm-color-181 {\n    color: #d7afaf;\n}\n\n.terminal .xterm-bg-color-181 {\n    background-color: #d7afaf;\n}\n\n.terminal .xterm-color-182 {\n    color: #d7afd7;\n}\n\n.terminal .xterm-bg-color-182 {\n    background-color: #d7afd7;\n}\n\n.terminal .xterm-color-183 {\n    color: #d7afff;\n}\n\n.terminal .xterm-bg-color-183 {\n    background-color: #d7afff;\n}\n\n.terminal .xterm-color-184 {\n    color: #d7d700;\n}\n\n.terminal .xterm-bg-color-184 {\n    background-color: #d7d700;\n}\n\n.terminal .xterm-color-185 {\n    color: #d7d75f;\n}\n\n.terminal .xterm-bg-color-185 {\n    background-color: #d7d75f;\n}\n\n.terminal .xterm-color-186 {\n    color: #d7d787;\n}\n\n.terminal .xterm-bg-color-186 {\n    background-color: #d7d787;\n}\n\n.terminal .xterm-color-187 {\n    color: #d7d7af;\n}\n\n.terminal .xterm-bg-color-187 {\n    background-color: #d7d7af;\n}\n\n.terminal .xterm-color-188 {\n    color: #d7d7d7;\n}\n\n.terminal .xterm-bg-color-188 {\n    background-color: #d7d7d7;\n}\n\n.terminal .xterm-color-189 {\n    color: #d7d7ff;\n}\n\n.terminal .xterm-bg-color-189 {\n    background-color: #d7d7ff;\n}\n\n.terminal .xterm-color-190 {\n    color: #d7ff00;\n}\n\n.terminal .xterm-bg-color-190 {\n    background-color: #d7ff00;\n}\n\n.terminal .xterm-color-191 {\n    color: #d7ff5f;\n}\n\n.terminal .xterm-bg-color-191 {\n    background-color: #d7ff5f;\n}\n\n.terminal .xterm-color-192 {\n    color: #d7ff87;\n}\n\n.terminal .xterm-bg-color-192 {\n    background-color: #d7ff87;\n}\n\n.terminal .xterm-color-193 {\n    color: #d7ffaf;\n}\n\n.terminal .xterm-bg-color-193 {\n    background-color: #d7ffaf;\n}\n\n.terminal .xterm-color-194 {\n    color: #d7ffd7;\n}\n\n.terminal .xterm-bg-color-194 {\n    background-color: #d7ffd7;\n}\n\n.terminal .xterm-color-195 {\n    color: #d7ffff;\n}\n\n.terminal .xterm-bg-color-195 {\n    background-color: #d7ffff;\n}\n\n.terminal .xterm-color-196 {\n    color: #ff0000;\n}\n\n.terminal .xterm-bg-color-196 {\n    background-color: #ff0000;\n}\n\n.terminal .xterm-color-197 {\n    color: #ff005f;\n}\n\n.terminal .xterm-bg-color-197 {\n    background-color: #ff005f;\n}\n\n.terminal .xterm-color-198 {\n    color: #ff0087;\n}\n\n.terminal .xterm-bg-color-198 {\n    background-color: #ff0087;\n}\n\n.terminal .xterm-color-199 {\n    color: #ff00af;\n}\n\n.terminal .xterm-bg-color-199 {\n    background-color: #ff00af;\n}\n\n.terminal .xterm-color-200 {\n    color: #ff00d7;\n}\n\n.terminal .xterm-bg-color-200 {\n    background-color: #ff00d7;\n}\n\n.terminal .xterm-color-201 {\n    color: #ff00ff;\n}\n\n.terminal .xterm-bg-color-201 {\n    background-color: #ff00ff;\n}\n\n.terminal .xterm-color-202 {\n    color: #ff5f00;\n}\n\n.terminal .xterm-bg-color-202 {\n    background-color: #ff5f00;\n}\n\n.terminal .xterm-color-203 {\n    color: #ff5f5f;\n}\n\n.terminal .xterm-bg-color-203 {\n    background-color: #ff5f5f;\n}\n\n.terminal .xterm-color-204 {\n    color: #ff5f87;\n}\n\n.terminal .xterm-bg-color-204 {\n    background-color: #ff5f87;\n}\n\n.terminal .xterm-color-205 {\n    color: #ff5faf;\n}\n\n.terminal .xterm-bg-color-205 {\n    background-color: #ff5faf;\n}\n\n.terminal .xterm-color-206 {\n    color: #ff5fd7;\n}\n\n.terminal .xterm-bg-color-206 {\n    background-color: #ff5fd7;\n}\n\n.terminal .xterm-color-207 {\n    color: #ff5fff;\n}\n\n.terminal .xterm-bg-color-207 {\n    background-color: #ff5fff;\n}\n\n.terminal .xterm-color-208 {\n    color: #ff8700;\n}\n\n.terminal .xterm-bg-color-208 {\n    background-color: #ff8700;\n}\n\n.terminal .xterm-color-209 {\n    color: #ff875f;\n}\n\n.terminal .xterm-bg-color-209 {\n    background-color: #ff875f;\n}\n\n.terminal .xterm-color-210 {\n    color: #ff8787;\n}\n\n.terminal .xterm-bg-color-210 {\n    background-color: #ff8787;\n}\n\n.terminal .xterm-color-211 {\n    color: #ff87af;\n}\n\n.terminal .xterm-bg-color-211 {\n    background-color: #ff87af;\n}\n\n.terminal .xterm-color-212 {\n    color: #ff87d7;\n}\n\n.terminal .xterm-bg-color-212 {\n    background-color: #ff87d7;\n}\n\n.terminal .xterm-color-213 {\n    color: #ff87ff;\n}\n\n.terminal .xterm-bg-color-213 {\n    background-color: #ff87ff;\n}\n\n.terminal .xterm-color-214 {\n    color: #ffaf00;\n}\n\n.terminal .xterm-bg-color-214 {\n    background-color: #ffaf00;\n}\n\n.terminal .xterm-color-215 {\n    color: #ffaf5f;\n}\n\n.terminal .xterm-bg-color-215 {\n    background-color: #ffaf5f;\n}\n\n.terminal .xterm-color-216 {\n    color: #ffaf87;\n}\n\n.terminal .xterm-bg-color-216 {\n    background-color: #ffaf87;\n}\n\n.terminal .xterm-color-217 {\n    color: #ffafaf;\n}\n\n.terminal .xterm-bg-color-217 {\n    background-color: #ffafaf;\n}\n\n.terminal .xterm-color-218 {\n    color: #ffafd7;\n}\n\n.terminal .xterm-bg-color-218 {\n    background-color: #ffafd7;\n}\n\n.terminal .xterm-color-219 {\n    color: #ffafff;\n}\n\n.terminal .xterm-bg-color-219 {\n    background-color: #ffafff;\n}\n\n.terminal .xterm-color-220 {\n    color: #ffd700;\n}\n\n.terminal .xterm-bg-color-220 {\n    background-color: #ffd700;\n}\n\n.terminal .xterm-color-221 {\n    color: #ffd75f;\n}\n\n.terminal .xterm-bg-color-221 {\n    background-color: #ffd75f;\n}\n\n.terminal .xterm-color-222 {\n    color: #ffd787;\n}\n\n.terminal .xterm-bg-color-222 {\n    background-color: #ffd787;\n}\n\n.terminal .xterm-color-223 {\n    color: #ffd7af;\n}\n\n.terminal .xterm-bg-color-223 {\n    background-color: #ffd7af;\n}\n\n.terminal .xterm-color-224 {\n    color: #ffd7d7;\n}\n\n.terminal .xterm-bg-color-224 {\n    background-color: #ffd7d7;\n}\n\n.terminal .xterm-color-225 {\n    color: #ffd7ff;\n}\n\n.terminal .xterm-bg-color-225 {\n    background-color: #ffd7ff;\n}\n\n.terminal .xterm-color-226 {\n    color: #ffff00;\n}\n\n.terminal .xterm-bg-color-226 {\n    background-color: #ffff00;\n}\n\n.terminal .xterm-color-227 {\n    color: #ffff5f;\n}\n\n.terminal .xterm-bg-color-227 {\n    background-color: #ffff5f;\n}\n\n.terminal .xterm-color-228 {\n    color: #ffff87;\n}\n\n.terminal .xterm-bg-color-228 {\n    background-color: #ffff87;\n}\n\n.terminal .xterm-color-229 {\n    color: #ffffaf;\n}\n\n.terminal .xterm-bg-color-229 {\n    background-color: #ffffaf;\n}\n\n.terminal .xterm-color-230 {\n    color: #ffffd7;\n}\n\n.terminal .xterm-bg-color-230 {\n    background-color: #ffffd7;\n}\n\n.terminal .xterm-color-231 {\n    color: #ffffff;\n}\n\n.terminal .xterm-bg-color-231 {\n    background-color: #ffffff;\n}\n\n.terminal .xterm-color-232 {\n    color: #080808;\n}\n\n.terminal .xterm-bg-color-232 {\n    background-color: #080808;\n}\n\n.terminal .xterm-color-233 {\n    color: #121212;\n}\n\n.terminal .xterm-bg-color-233 {\n    background-color: #121212;\n}\n\n.terminal .xterm-color-234 {\n    color: #1c1c1c;\n}\n\n.terminal .xterm-bg-color-234 {\n    background-color: #1c1c1c;\n}\n\n.terminal .xterm-color-235 {\n    color: #262626;\n}\n\n.terminal .xterm-bg-color-235 {\n    background-color: #262626;\n}\n\n.terminal .xterm-color-236 {\n    color: #303030;\n}\n\n.terminal .xterm-bg-color-236 {\n    background-color: #303030;\n}\n\n.terminal .xterm-color-237 {\n    color: #3a3a3a;\n}\n\n.terminal .xterm-bg-color-237 {\n    background-color: #3a3a3a;\n}\n\n.terminal .xterm-color-238 {\n    color: #444444;\n}\n\n.terminal .xterm-bg-color-238 {\n    background-color: #444444;\n}\n\n.terminal .xterm-color-239 {\n    color: #4e4e4e;\n}\n\n.terminal .xterm-bg-color-239 {\n    background-color: #4e4e4e;\n}\n\n.terminal .xterm-color-240 {\n    color: #585858;\n}\n\n.terminal .xterm-bg-color-240 {\n    background-color: #585858;\n}\n\n.terminal .xterm-color-241 {\n    color: #626262;\n}\n\n.terminal .xterm-bg-color-241 {\n    background-color: #626262;\n}\n\n.terminal .xterm-color-242 {\n    color: #6c6c6c;\n}\n\n.terminal .xterm-bg-color-242 {\n    background-color: #6c6c6c;\n}\n\n.terminal .xterm-color-243 {\n    color: #767676;\n}\n\n.terminal .xterm-bg-color-243 {\n    background-color: #767676;\n}\n\n.terminal .xterm-color-244 {\n    color: #808080;\n}\n\n.terminal .xterm-bg-color-244 {\n    background-color: #808080;\n}\n\n.terminal .xterm-color-245 {\n    color: #8a8a8a;\n}\n\n.terminal .xterm-bg-color-245 {\n    background-color: #8a8a8a;\n}\n\n.terminal .xterm-color-246 {\n    color: #949494;\n}\n\n.terminal .xterm-bg-color-246 {\n    background-color: #949494;\n}\n\n.terminal .xterm-color-247 {\n    color: #9e9e9e;\n}\n\n.terminal .xterm-bg-color-247 {\n    background-color: #9e9e9e;\n}\n\n.terminal .xterm-color-248 {\n    color: #a8a8a8;\n}\n\n.terminal .xterm-bg-color-248 {\n    background-color: #a8a8a8;\n}\n\n.terminal .xterm-color-249 {\n    color: #b2b2b2;\n}\n\n.terminal .xterm-bg-color-249 {\n    background-color: #b2b2b2;\n}\n\n.terminal .xterm-color-250 {\n    color: #bcbcbc;\n}\n\n.terminal .xterm-bg-color-250 {\n    background-color: #bcbcbc;\n}\n\n.terminal .xterm-color-251 {\n    color: #c6c6c6;\n}\n\n.terminal .xterm-bg-color-251 {\n    background-color: #c6c6c6;\n}\n\n.terminal .xterm-color-252 {\n    color: #d0d0d0;\n}\n\n.terminal .xterm-bg-color-252 {\n    background-color: #d0d0d0;\n}\n\n.terminal .xterm-color-253 {\n    color: #dadada;\n}\n\n.terminal .xterm-bg-color-253 {\n    background-color: #dadada;\n}\n\n.terminal .xterm-color-254 {\n    color: #e4e4e4;\n}\n\n.terminal .xterm-bg-color-254 {\n    background-color: #e4e4e4;\n}\n\n.terminal .xterm-color-255 {\n    color: #eeeeee;\n}\n\n.terminal .xterm-bg-color-255 {\n    background-color: #eeeeee;\n}\n", ""]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.test-info {\n  padding: 10px;\n  padding-left: 20px;\n  padding-right: 20px;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  align-items: center;\n  width: 100%;\n}\n.test-info > * {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.test-info:last-child {\n  margin-right: 0px;\n}\n.test-info:first-child {\n  margin-left: 0px;\n}\n.test-info > select {\n  flex: 1 1;\n}\n.test-progress {\n  border-radius: 13px; /* (height of inner div) / 2 + padding */\n  padding: 3px;\n  flex: 3 3;\n}\n.test-progress > div {\n   height: 20px;\n   border-radius: 10px;\n   width: 0%;\n}\n\n", "", {"version":3,"sources":["/./lib/components/test-info.vue?1c338940"],"names":[],"mappings":";AA0EA;EACA,cAAA;EACA,mBAAA;EACA,oBAAA;EACA,cAAA;EACA,kBAAA;EACA,oBAAA;EACA,oBAAA;EACA,YAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,kBAAA;CACA;AAEA;EACA,iBAAA;CACA;AAEA;EACA,UAAA;CACA;AAEA;EACA,oBAAA,CAAA,yCAAA;EACA,aAAA;EACA,UAAA;CACA;AAEA;GACA,aAAA;GACA,oBAAA;GACA,UAAA;CACA","file":"test-info.vue","sourcesContent":["<template>\n<div class=\"test-info\">\n  <select class=\"form-control\" v-model=\"selectedTestConfigIndex\">\n    <option v-for=\"testConfig, index in testConfigs\" v-bind:value=\"index\">\n      {{testConfig.displayName}}\n    </option>\n  </select>\n  <button class=\"btn btn-default fa fa-play\" v-on:click=\"runCurrentTestConfig\" ref=\"runButton\"></button>\n  <button class=\"btn btn-default fa fa-times text-error\" v-on:click=\"runFailedTests\" ref=\"runButton\" />\n  <button class=\"btn btn-default fa fa-search\" v-on:click=\"loadTestConfigs\" ref=\"searchButton\"></button>\n\n  <span>Runs: {{testResults.testsStarted}}/{{testResults.testsTotal}}</span>\n  <span>Errors: {{testResults.testsError}}</span>\n  <span>Failures: {{testResults.testsFailed}}</span>\n  <div class=\"test-progress\" >\n    <div\n      v-bind:style=\"{width: progress + '%' }\"\n      v-bind:class=\"progressClass\"\n    />\n  </div>\n</div>\n</template>\n\n<script>\nimport {mapState, mapActions} from \"vuex\"\n\nmodule.exports = {\n  name: \"TestInfo\",\n  mounted: function() {\n    atom.tooltips.add(this.$refs.runButton,{\n      title: \"Run Test Config\",\n      placement: \"bottom\"\n    })\n    atom.tooltips.add(this.$refs.searchButton,{\n      title: \"Discover Test Configs\",\n      placement: \"bottom\"\n    })\n  },\n  methods: {\n    ...mapActions([\n      'loadTestConfigs',\n      'runCurrentTestConfig',\n      'runFailedTests'\n    ])\n  },\n  computed: {\n    'progressClass': function () {\n      return {\n        'progress-successful': !this.testResults.testsError && !this.testResults.testsFailed,\n        'progress-error': this.testResults.testsError || this.testResults.testsFailed\n      }\n    },\n    progress: function() {\n      if (this.testResults.testsTotal == 0)\n        return 0\n      return (this.testResults.testsFinished / this.testResults.testsTotal)*100\n    },\n    'selectedTestConfigIndex': {\n      get() {\n        return this.$store.state.selectedTestConfigIndex\n      },\n      set(value) {\n        this.$store.commit('selectTestConfigByIndex',value)\n      }\n    },\n    ...mapState([\n      'testConfigs',\n      'testResults'\n    ])\n  }\n}\n</script>\n\n<style>\n.test-info {\n  padding: 10px;\n  padding-left: 20px;\n  padding-right: 20px;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  align-items: center;\n  width: 100%;\n}\n\n.test-info > * {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n.test-info:last-child {\n  margin-right: 0px;\n}\n\n.test-info:first-child {\n  margin-left: 0px;\n}\n\n.test-info > select {\n  flex: 1 1;\n}\n\n.test-progress {\n  border-radius: 13px; /* (height of inner div) / 2 + padding */\n  padding: 3px;\n  flex: 3 3;\n}\n\n.test-progress > div {\n   height: 20px;\n   border-radius: 10px;\n   width: 0%;\n}\n\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.test-runner {\n  display: flex;\n  flex-direction: column;\n}\n.test-runner .test-runner-row {\n  display: flex;\n  flex-direction: row;\n}\n.test-runner-row:last-child {\n  height: 100%;\n}\n", "", {"version":3,"sources":["/./lib/components/test-runner.vue?77d7c22b"],"names":[],"mappings":";AA+DA;EACA,cAAA;EACA,uBAAA;CACA;AACA;EACA,cAAA;EACA,oBAAA;CACA;AACA;EACA,aAAA;CACA","file":"test-runner.vue","sourcesContent":["<template>\n<div class=\"test-runner\">\n  <div class=\"test-runner-row\">\n    <TestInfo />\n  </div>\n  <div class=\"test-runner-row\">\n    <TestTree />\n    <TestLog />\n  </div>\n</div>\n</template>\n\n<script>\nimport {mapState, mapActions} from 'vuex'\n\nimport TestInfo from './test-info.vue'\nimport TestTree from './test-tree.vue'\nimport TestLog from './test-log.vue'\nimport store from '../store'\n\nmodule.exports ={\n  name: \"TestRunner\",\n  store,\n  components: {\n    TestInfo,\n    TestTree,\n    TestLog\n  },\n  data: function () {\n    return {\n      'isVisible': false\n    }\n  },\n  methods: {\n    toggle: function() {\n      this.isVisible = !this.isVisible\n    },\n    ...mapActions([\n      'runAllTests',\n      'runFailedTests',\n    ])\n  },\n  watch: {\n    'isVisible': function() {\n      if (this.isVisible) {\n        this.panel.show()\n      } else {\n        this.panel.hide()\n      }\n    }\n  },\n  created: function () {\n    var element = document.createElement('div')\n    this.panel = atom.workspace.addBottomPanel({\n      item: element,\n      visible: this.isVisible\n    })\n    this.$mount(element)\n  }\n}\n</script>\n\n<style>\n.test-runner {\n  display: flex;\n  flex-direction: column;\n}\n.test-runner .test-runner-row {\n  display: flex;\n  flex-direction: row;\n}\n.test-runner-row:last-child {\n  height: 100%;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.test-log {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-width: 400px;\n  min-height: 100px;\n}\n", "", {"version":3,"sources":["/./lib/components/test-log.vue?ff1fbe64"],"names":[],"mappings":";AAkCA;EACA,cAAA;EACA,QAAA;EACA,uBAAA;EACA,iBAAA;EACA,kBAAA;CACA","file":"test-log.vue","sourcesContent":["<template>\n<div class=\"test-log\">\n  <div ref=\"terminal\" style=\"width:100%;height: 100%;\"></div>\n</div>\n</template>\n\n<script>\nimport 'xterm/src/xterm.css'\nimport Term from 'xterm'\nimport { mapState } from 'vuex'\n\nmodule.exports = {\n  name: 'TestLog',\n  mounted: function() {\n    Term.loadAddon(\"fit\")\n    this.term = new Term()\n    this.term.open(this.$refs.terminal)\n  },\n  computed: {\n    ...mapState([\n        'selectedTest'\n      ]),\n  },\n  watch: {\n    'selectedTest': function() {\n      this.term.fit()\n      this.term.clear()\n      this.term.write(this.selectedTest.log.join(require('os').EOL))\n    }\n  }\n}\n</script>\n\n<style>\n.test-log {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-width: 400px;\n  min-height: 100px;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.test-runner .test-tree {\n  width: 300px;\n}\n", "", {"version":3,"sources":["/./lib/components/test-tree.vue?644972f0"],"names":[],"mappings":";AAsDA;EACA,aAAA;CACA","file":"test-tree.vue","sourcesContent":["<template>\n<div class=\"test-tree tree-view-resizer tool-panel\" ref=\"content\">\n  <div class=\"tree-view-scroller order--center\">\n    <ol class=\"tree-view full-menu list-tree has-collapsable-children focusable-panel\">\n      <TestTreeNode v-for=\"item in testTree.childItems\" v-bind:item=\"item\"/>\n    </ol>\n  </div>\n  <div class=\"tree-view-resize-handle\" ref=\"handle\" v-on:mousedown=\"startResize\" style=\"right:-5px;\"></div>\n</div>\n</template>\n<script>\nimport $ from \"jquery\"\nimport {mapState} from \"vuex\"\n\nimport TestTreeNode from \"./test-tree-node.vue\"\n\nmodule.exports = {\n  name: \"TestTree\",\n  components: {\n    TestTreeNode\n  },\n  data() {\n    return {\n    }\n  },\n  computed: {\n    ...mapState([\n      \"testTree\"\n    ])\n  },\n  methods: {\n    startResize: function (event) {\n      this.isResizing = true;\n      this.xOld = event.screenX;\n      $(\"body\").on(\"mousemove\",this.handleResize);\n      $(\"body\").on(\"mouseup\",this.stopResize);\n    },\n    handleResize: function (event) {\n      var obj = $(this.$refs.content)\n      if (this.isResizing) {\n        obj.width(obj.width() - (this.xOld - event.screenX));\n        this.xOld = event.screenX;\n      }\n    },\n    stopResize: function (event) {\n      this.isResizing = false;\n      $(\"body\").off(\"moseup\",this.stopResize)\n      $(\"body\").off(\"mousemove\",this.handleResize)\n    }\n  }\n}\n</script>\n\n<style>\n.test-runner .test-tree {\n  width: 300px;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./xterm.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./xterm.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(31)
	
	/* script */
	__vue_exports__ = __webpack_require__(5)
	
	/* template */
	var __vue_template__ = __webpack_require__(26)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\Users\\cseitz\\github\\test-runner\\lib\\components\\test-info.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-107c9d7d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-107c9d7d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] test-info.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(33)
	
	/* script */
	__vue_exports__ = __webpack_require__(6)
	
	/* template */
	var __vue_template__ = __webpack_require__(28)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\Users\\cseitz\\github\\test-runner\\lib\\components\\test-log.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3dc883c5", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3dc883c5", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] test-log.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(32)
	
	/* script */
	__vue_exports__ = __webpack_require__(7)
	
	/* template */
	var __vue_template__ = __webpack_require__(27)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\Users\\cseitz\\github\\test-runner\\lib\\components\\test-runner.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2036d582", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2036d582", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] test-runner.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(8)
	
	/* template */
	var __vue_template__ = __webpack_require__(30)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\Users\\cseitz\\github\\test-runner\\lib\\components\\test-tree-node.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-65e423dc", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-65e423dc", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] test-tree-node.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(34)
	
	/* script */
	__vue_exports__ = __webpack_require__(9)
	
	/* template */
	var __vue_template__ = __webpack_require__(29)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\Users\\cseitz\\github\\test-runner\\lib\\components\\test-tree.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5880b46d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5880b46d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] test-tree.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "test-info"
	  }, [_h('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.selectedTestConfigIndex),
	      expression: "selectedTestConfigIndex"
	    }],
	    staticClass: "form-control",
	    on: {
	      "change": function($event) {
	        _vm.selectedTestConfigIndex = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        })[0]
	      }
	    }
	  }, [_vm._l((_vm.testConfigs), function(testConfig, index) {
	    return _h('option', {
	      domProps: {
	        "value": index
	      }
	    }, ["\n      " + _vm._s(testConfig.displayName) + "\n    "])
	  })]), " ", _h('button', {
	    ref: "runButton",
	    staticClass: "btn btn-default fa fa-play",
	    on: {
	      "click": _vm.runCurrentTestConfig
	    }
	  }), " ", _h('button', {
	    ref: "runButton",
	    staticClass: "btn btn-default fa fa-times text-error",
	    on: {
	      "click": _vm.runFailedTests
	    }
	  }), " ", _h('button', {
	    ref: "searchButton",
	    staticClass: "btn btn-default fa fa-search",
	    on: {
	      "click": _vm.loadTestConfigs
	    }
	  }), " ", _h('span', ["Runs: " + _vm._s(_vm.testResults.testsStarted) + "/" + _vm._s(_vm.testResults.testsTotal)]), " ", _h('span', ["Errors: " + _vm._s(_vm.testResults.testsError)]), " ", _h('span', ["Failures: " + _vm._s(_vm.testResults.testsFailed)]), " ", _h('div', {
	    staticClass: "test-progress"
	  }, [_h('div', {
	    class: _vm.progressClass,
	    style: ({
	      width: _vm.progress + '%'
	    })
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-107c9d7d", module.exports)
	  }
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "test-runner"
	  }, [_h('div', {
	    staticClass: "test-runner-row"
	  }, [_h('TestInfo')]), " ", _h('div', {
	    staticClass: "test-runner-row"
	  }, [_h('TestTree'), " ", _h('TestLog')])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2036d582", module.exports)
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "test-log"
	  }, [_h('div', {
	    ref: "terminal",
	    staticStyle: {
	      "width": "100%",
	      "height": "100%"
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3dc883c5", module.exports)
	  }
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    ref: "content",
	    staticClass: "test-tree tree-view-resizer tool-panel"
	  }, [_h('div', {
	    staticClass: "tree-view-scroller order--center"
	  }, [_h('ol', {
	    staticClass: "tree-view full-menu list-tree has-collapsable-children focusable-panel"
	  }, [_vm._l((_vm.testTree.childItems), function(item) {
	    return _h('TestTreeNode', {
	      attrs: {
	        "item": item
	      }
	    })
	  })])]), " ", _h('div', {
	    ref: "handle",
	    staticClass: "tree-view-resize-handle",
	    staticStyle: {
	      "right": "-5px"
	    },
	    on: {
	      "mousedown": _vm.startResize
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5880b46d", module.exports)
	  }
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('li', {
	    staticClass: "entry",
	    class: _vm.classObject,
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.onClick($event)
	      },
	      "dblclick": function($event) {
	        $event.stopPropagation();
	        _vm.onDblClick($event)
	      }
	    }
	  }, [_h('div', {
	    staticClass: "header list-item",
	    class: {
	      'test-failed': _vm.item.hasFailed
	    }
	  }, [_h('span', {
	    staticClass: "name icon",
	    class: _vm.iconClass
	  }), " ", _h('span', [_vm._s(_vm.item.name)]), " ", (_vm.item.duration > 0.0) ? _h('span', {
	    staticClass: "test-time"
	  }, [" (" + _vm._s(_vm.item.duration.toFixed(3)) + "s)"]) : _vm._e()]), " ", _h('ol', {
	    staticClass: "entries list-tree"
	  }, [_vm._l((_vm.item.childItems), function(child) {
	    return _h('TestTreeNode', {
	      attrs: {
	        "item": child
	      }
	    })
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-65e423dc", module.exports)
	  }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-107c9d7d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-info.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-107c9d7d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-info.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2036d582!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-runner.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2036d582!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-runner.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3dc883c5!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-log.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3dc883c5!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-log.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5880b46d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-tree.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5880b46d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-tree.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("js-yaml");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("xterm");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWYyNmYzZmE5NzU3NTQxODk4OWYiLCJ3ZWJwYWNrOi8vLy4vQzovVXNlcnMvY3NlaXR6L2dpdGh1Yi90ZXN0LXJ1bm5lci9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInZ1ZXhcIiIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInZ1ZVwiIiwid2VicGFjazovLy90ZXN0LWluZm8udnVlIiwid2VicGFjazovLy90ZXN0LWxvZy52dWUiLCJ3ZWJwYWNrOi8vL3Rlc3QtcnVubmVyLnZ1ZSIsIndlYnBhY2s6Ly8vdGVzdC10cmVlLW5vZGUudnVlIiwid2VicGFjazovLy90ZXN0LXRyZWUudnVlIiwid2VicGFjazovLy8uL0M6L1VzZXJzL2NzZWl0ei9naXRodWIvdGVzdC1ydW5uZXIvbGliL3N0b3JlL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vQzovVXNlcnMvY3NlaXR6L2dpdGh1Yi90ZXN0LXJ1bm5lci9saWIvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vQzovVXNlcnMvY3NlaXR6L2dpdGh1Yi90ZXN0LXJ1bm5lci9saWIvc3RvcmUvbXV0YXRpb25zLmpzIiwid2VicGFjazovLy8uL0M6L1VzZXJzL2NzZWl0ei9naXRodWIvdGVzdC1ydW5uZXIvbGliL3N0b3JlL3N0YXRlLmpzIiwid2VicGFjazovLy8uL34veHRlcm0vc3JjL3h0ZXJtLmNzcyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlP2YzYTIiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1ydW5uZXIudnVlPzVkMDAiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1sb2cudnVlPzc5NGMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLnZ1ZT80NWI2Iiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3h0ZXJtL3NyYy94dGVybS5jc3M/NTcxMCIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LXJ1bm5lci52dWUiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLW5vZGUudnVlIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS52dWUiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1pbmZvLnZ1ZT9lZGE2Iiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZT8yNjU5Iiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtbG9nLnZ1ZT9mMjQ5Iiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS52dWU/Njk5ZiIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LXRyZWUtbm9kZS52dWU/NGNlMiIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlP2M5NjciLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1ydW5uZXIudnVlPzE4MGQiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1sb2cudnVlPzFlMzIiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLnZ1ZT8yYjhiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianMteWFtbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInh0ZXJtXCIiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInRlc3RSdW5uZXJWaWV3IiwiYWN0aXZhdGUiLCJzdGF0ZSIsIiRzdG9yZSIsImRpc3BhdGNoIiwiaXNWaXNpYmxlIiwiY29tbWl0IiwidGVzdFRyZWUiLCJ0ZXN0UmVzdWx0cyIsInNlbGVjdGVkVGVzdENvbmZpZ0luZGV4IiwiYXRvbSIsImNvbW1hbmRzIiwiYWRkIiwidG9nZ2xlIiwiZGVhY3RpdmF0ZSIsIiRkZXN0cm95Iiwic2VyaWFsaXplIiwiJGRhdGEiLCJjb25zdW1lU2VydmljZSIsInNlcnZpY2UiLCJrZXkiLCJydW5uZXIiLCJhY3Rpb25zIiwibG9hZFRlc3RDb25maWdzIiwiY29udGV4dCIsInRlc3RDb25maWdzIiwicHJvamVjdCIsImdldFBhdGhzIiwicHJvamVjdFBhdGgiLCJjb25maWdGaWxlIiwicGF0aCIsImpvaW4iLCJzdGF0IiwiZnMiLCJzdGF0U3luYyIsImUiLCJjb25maWdzIiwieWFtbCIsInNhZmVMb2FkIiwicmVhZEZpbGVTeW5jIiwibm90aWZpY2F0aW9ucyIsImFkZEVycm9yIiwiZGV0YWlsIiwiY29uZmlnIiwibmFtZSIsImluZGV4T2YiLCJhZGRXYXJuaW5nIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJfcnVubmVyIiwicnVubmVycyIsIm9uVGVzdFN0YXJ0IiwidGVzdCIsIm9uVGVzdEVuZCIsInRlc3RSZXN1bHQiLCJwdXNoIiwicnVuQ3VycmVudFRlc3RDb25maWciLCJ0ZXN0Q29uZmlnIiwiZ2V0dGVycyIsInNlbGVjdGVkVGVzdENvbmZpZyIsImdldFRlc3RzIiwidGhlbiIsInRlc3RzIiwicnVuQWxsVGVzdHMiLCJlcnIiLCJydW5GYWlsZWRUZXN0cyIsImZhaWxlZFRlc3RzIiwiaGFzRmFpbGVkIiwicnVuVGVzdHMiLCJhcHBlbmRSdW5uZXIiLCJvcHRpb25zIiwidXNlIiwibGVuZ3RoIiwiU3RvcmUiLCJtdXRhdGlvbnMiLCJzZWxlY3RUZXN0Q29uZmlnQnlJbmRleCIsImluZGV4Iiwic2V0VGVzdFRyZWUiLCJzZXRTZWxlY3RUZXN0Iiwic2VsZWN0ZWRUZXN0Iiwic2V0VGVzdFJlc3VsdHMiLCJjbGVhclRlc3RSZXN1bHRzIiwidGVzdHNTdGFydGVkIiwidGVzdHNGaW5pc2hlZCIsInRlc3RzVG90YWwiLCJ0ZXN0c1Bhc3NlZCIsInRlc3RzRmFpbGVkIiwidGVzdHNFcnJvciIsImR1cmF0aW9uIiwic2V0VGVzdENvbmZpZ3MiLCJzZXRUZXN0cyIsImNoaWxkSXRlbXMiLCJlbGVtZW50IiwicGFyZW50IiwicGFja2FnZU5hbWVzIiwiQXJyYXkiLCJwa2dOYW1lIiwiaXNDb250YWluZXIiLCJpc1BhY2thZ2UiLCJjbGFzc25hbWUiLCJpc0NsYXNzIiwidGVzdG5hbWUiLCJpc1Rlc3QiLCJmaWxlbmFtZSIsImxpbmUiLCJjb2x1bW4iLCJ0ZXN0SWRlbnRpZmllciIsImhhc1J1biIsImhhc0Vycm9yIiwibG9nIiwidHJhY2ViYWNrIiwiYWRkVGVzdFJlc3VsdCIsInJlc3VsdCIsImVudHJ5IiwiaW5jcmVtZW50VGVzdHNTdGFydGVkIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7Ozs7QUFFQUEsUUFBT0MsT0FBUCxHQUFpQjtBQUNmQyxtQkFBZ0IsSUFERDs7QUFHZkMsV0FIZSxvQkFHTkMsS0FITSxFQUdDO0FBQUE7O0FBQ2QsVUFBS0YsY0FBTCxHQUFzQix1Q0FBdEI7QUFDQSxVQUFLQSxjQUFMLENBQW9CRyxN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QyxHQUFHLDhCQUE4QixxQkFBcUIsR0FBRyxpQ0FBaUMsZ0NBQWdDLEdBQUcsOEJBQThCLHFCQUFxQixHQUFHLGlDQUFpQyxnQ0FBZ0MsR0FBRyw4QkFBOEIscUJBQXFCLEdBQUcsaUNBQWlDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1D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QUNBO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBdUY7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7OztBQ3BCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUF1RjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQXVGO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNwQkEsZ0M7Ozs7OztBQ0FBLG9DOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEsZ0M7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSxtQyIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWYyNmYzZmE5NzU3NTQxODk4OWYiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIlxuaW1wb3J0IFRlc3RSdW5uZXJWaWV3IGZyb20gXCIuL2NvbXBvbmVudHMvdGVzdC1ydW5uZXIudnVlXCJcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlc3RSdW5uZXJWaWV3OiBudWxsLFxuXG4gIGFjdGl2YXRlKHN0YXRlKSB7XG4gICAgdGhpcy50ZXN0UnVubmVyVmlldyA9IG5ldyBWdWUoVGVzdFJ1bm5lclZpZXcpXG4gICAgdGhpcy50ZXN0UnVubmVyVmlldy4kc3RvcmUuZGlzcGF0Y2goXCJsb2FkVGVzdENvbmZpZ3NcIilcbiAgICB0aGlzLnRlc3RSdW5uZXJWaWV3LmlzVmlzaWJsZSA9IHN0YXRlLmlzVmlzaWJsZVxuICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmNvbW1pdChcInNldFRlc3RUcmVlXCIsIHN0YXRlLnRlc3RUcmVlKVxuICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmNvbW1pdChcInNldFRlc3RSZXN1bHRzXCIsIHN0YXRlLnRlc3RSZXN1bHRzKVxuICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmNvbW1pdChcInNlbGVjdFRlc3RDb25maWdCeUluZGV4XCIsc3RhdGUuc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXgpXG5cbiAgICBhdG9tLmNvbW1hbmRzLmFkZChcImF0b20td29ya3NwYWNlXCIsIHtcbiAgICAgIFwidGVzdC1ydW5uZXI6dG9nZ2xlLXZpZXdcIjogKCkgPT4ge1xuICAgICAgICB0aGlzLnRlc3RSdW5uZXJWaWV3LnRvZ2dsZSgpXG4gICAgICB9LFxuICAgICAgXCJ0ZXN0LXJ1bm5lcjpydW4tY3VycmVudC10ZXN0LWNvbmZpZ1wiOiAoKSA9PiB7XG4gICAgICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmRpc3BhdGNoKFwicnVuQWxsVGVzdHNcIilcbiAgICAgIH0sXG4gICAgICBcInRlc3QtcnVubmVyOnNlbGVjdC10ZXN0LWNvbmZpZ1wiOiAoKSA9PiB7XG5cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy50ZXN0UnVubmVyVmlldy4kZGVzdHJveSgpXG4gIH0sXG5cbiAgc2VyaWFsaXplKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc1Zpc2libGU6IHRoaXMudGVzdFJ1bm5lclZpZXcuJGRhdGEuaXNWaXNpYmxlLFxuICAgICAgdGVzdFJlc3VsdHM6IHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLnN0YXRlLnRlc3RSZXN1bHRzLFxuICAgICAgdGVzdFRyZWU6IHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLnN0YXRlLnRlc3RUcmVlLFxuICAgICAgc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXg6IHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLnN0YXRlLnNlbGVjdGVkVGVzdENvbmZpZ0luZGV4XG4gICAgfVxuICB9LFxuXG4gIGNvbnN1bWVTZXJ2aWNlKHNlcnZpY2UpIHtcbiAgICB0aGlzLnRlc3RSdW5uZXJWaWV3LiRzdG9yZS5kaXNwYXRjaChcImFwcGVuZFJ1bm5lclwiLCB7a2V5OiBzZXJ2aWNlLmtleSwgcnVubmVyOiBzZXJ2aWNlLnJ1bm5lcn0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0M6L1VzZXJzL2NzZWl0ei9naXRodWIvdGVzdC1ydW5uZXIvbGliL21haW4uanMiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInZ1ZXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ2dWV4XCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcblx0XHR2YXIgbWVtbztcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBtZW1vO1xuXHRcdH07XG5cdH0sXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcblx0fSksXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuXHR9KSxcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0XHR9XG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcblx0XHRpZihuZXdPYmopIHtcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0aWYgKG1lZGlhKSB7XG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcblx0XHQvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG5cdFx0Y3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nO1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcblx0XHR9XG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidnVlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidnVlXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cInRlc3QtaW5mb1wiPlxuICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdi1tb2RlbD1cInNlbGVjdGVkVGVzdENvbmZpZ0luZGV4XCI+XG4gICAgPG9wdGlvbiB2LWZvcj1cInRlc3RDb25maWcsIGluZGV4IGluIHRlc3RDb25maWdzXCIgdi1iaW5kOnZhbHVlPVwiaW5kZXhcIj5cbiAgICAgIHt7dGVzdENvbmZpZy5kaXNwbGF5TmFtZX19XG4gICAgPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGZhIGZhLXBsYXlcIiB2LW9uOmNsaWNrPVwicnVuQ3VycmVudFRlc3RDb25maWdcIiByZWY9XCJydW5CdXR0b25cIj48L2J1dHRvbj5cbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBmYSBmYS10aW1lcyB0ZXh0LWVycm9yXCIgdi1vbjpjbGljaz1cInJ1bkZhaWxlZFRlc3RzXCIgcmVmPVwicnVuQnV0dG9uXCIgLz5cbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBmYSBmYS1zZWFyY2hcIiB2LW9uOmNsaWNrPVwibG9hZFRlc3RDb25maWdzXCIgcmVmPVwic2VhcmNoQnV0dG9uXCI+PC9idXR0b24+XG5cbiAgPHNwYW4+UnVuczoge3t0ZXN0UmVzdWx0cy50ZXN0c1N0YXJ0ZWR9fS97e3Rlc3RSZXN1bHRzLnRlc3RzVG90YWx9fTwvc3Bhbj5cbiAgPHNwYW4+RXJyb3JzOiB7e3Rlc3RSZXN1bHRzLnRlc3RzRXJyb3J9fTwvc3Bhbj5cbiAgPHNwYW4+RmFpbHVyZXM6IHt7dGVzdFJlc3VsdHMudGVzdHNGYWlsZWR9fTwvc3Bhbj5cbiAgPGRpdiBjbGFzcz1cInRlc3QtcHJvZ3Jlc3NcIiA+XG4gICAgPGRpdlxuICAgICAgdi1iaW5kOnN0eWxlPVwie3dpZHRoOiBwcm9ncmVzcyArICclJyB9XCJcbiAgICAgIHYtYmluZDpjbGFzcz1cInByb2dyZXNzQ2xhc3NcIlxuICAgIC8+XG4gIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHttYXBTdGF0ZSwgbWFwQWN0aW9uc30gZnJvbSBcInZ1ZXhcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogXCJUZXN0SW5mb1wiLFxuICBtb3VudGVkOiBmdW5jdGlvbigpIHtcbiAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLiRyZWZzLnJ1bkJ1dHRvbix7XG4gICAgICB0aXRsZTogXCJSdW4gVGVzdCBDb25maWdcIixcbiAgICAgIHBsYWNlbWVudDogXCJib3R0b21cIlxuICAgIH0pXG4gICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy4kcmVmcy5zZWFyY2hCdXR0b24se1xuICAgICAgdGl0bGU6IFwiRGlzY292ZXIgVGVzdCBDb25maWdzXCIsXG4gICAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCJcbiAgICB9KVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLi4ubWFwQWN0aW9ucyhbXG4gICAgICAnbG9hZFRlc3RDb25maWdzJyxcbiAgICAgICdydW5DdXJyZW50VGVzdENvbmZpZycsXG4gICAgICAncnVuRmFpbGVkVGVzdHMnXG4gICAgXSlcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICAncHJvZ3Jlc3NDbGFzcyc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdwcm9ncmVzcy1zdWNjZXNzZnVsJzogIXRoaXMudGVzdFJlc3VsdHMudGVzdHNFcnJvciAmJiAhdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0ZhaWxlZCxcbiAgICAgICAgJ3Byb2dyZXNzLWVycm9yJzogdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0Vycm9yIHx8IHRoaXMudGVzdFJlc3VsdHMudGVzdHNGYWlsZWRcbiAgICAgIH1cbiAgICB9LFxuICAgIHByb2dyZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzVG90YWwgPT0gMClcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIHJldHVybiAodGhpcy50ZXN0UmVzdWx0cy50ZXN0c0ZpbmlzaGVkIC8gdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1RvdGFsKSoxMDBcbiAgICB9LFxuICAgICdzZWxlY3RlZFRlc3RDb25maWdJbmRleCc6IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLnNlbGVjdGVkVGVzdENvbmZpZ0luZGV4XG4gICAgICB9LFxuICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2VsZWN0VGVzdENvbmZpZ0J5SW5kZXgnLHZhbHVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgLi4ubWFwU3RhdGUoW1xuICAgICAgJ3Rlc3RDb25maWdzJyxcbiAgICAgICd0ZXN0UmVzdWx0cydcbiAgICBdKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuLnRlc3QtaW5mbyB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbiAgcGFkZGluZy1yaWdodDogMjBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiBub3dyYXA7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4udGVzdC1pbmZvID4gKiB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi50ZXN0LWluZm86bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1yaWdodDogMHB4O1xufVxuXG4udGVzdC1pbmZvOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLWxlZnQ6IDBweDtcbn1cblxuLnRlc3QtaW5mbyA+IHNlbGVjdCB7XG4gIGZsZXg6IDEgMTtcbn1cblxuLnRlc3QtcHJvZ3Jlc3Mge1xuICBib3JkZXItcmFkaXVzOiAxM3B4OyAvKiAoaGVpZ2h0IG9mIGlubmVyIGRpdikgLyAyICsgcGFkZGluZyAqL1xuICBwYWRkaW5nOiAzcHg7XG4gIGZsZXg6IDMgMztcbn1cblxuLnRlc3QtcHJvZ3Jlc3MgPiBkaXYge1xuICAgaGVpZ2h0OiAyMHB4O1xuICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgIHdpZHRoOiAwJTtcbn1cblxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB0ZXN0LWluZm8udnVlPzFjMzM4OTQwIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cInRlc3QtbG9nXCI+XG4gIDxkaXYgcmVmPVwidGVybWluYWxcIiBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OiAxMDAlO1wiPjwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0ICd4dGVybS9zcmMveHRlcm0uY3NzJ1xuaW1wb3J0IFRlcm0gZnJvbSAneHRlcm0nXG5pbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiAnVGVzdExvZycsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uKCkge1xuICAgIFRlcm0ubG9hZEFkZG9uKFwiZml0XCIpXG4gICAgdGhpcy50ZXJtID0gbmV3IFRlcm0oKVxuICAgIHRoaXMudGVybS5vcGVuKHRoaXMuJHJlZnMudGVybWluYWwpXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgLi4ubWFwU3RhdGUoW1xuICAgICAgICAnc2VsZWN0ZWRUZXN0J1xuICAgICAgXSksXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgJ3NlbGVjdGVkVGVzdCc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy50ZXJtLmZpdCgpXG4gICAgICB0aGlzLnRlcm0uY2xlYXIoKVxuICAgICAgdGhpcy50ZXJtLndyaXRlKHRoaXMuc2VsZWN0ZWRUZXN0LmxvZy5qb2luKHJlcXVpcmUoJ29zJykuRU9MKSlcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4udGVzdC1sb2cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4OiAxO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtaW4td2lkdGg6IDQwMHB4O1xuICBtaW4taGVpZ2h0OiAxMDBweDtcbn1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdGVzdC1sb2cudnVlP2ZmMWZiZTY0IiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cInRlc3QtcnVubmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJ0ZXN0LXJ1bm5lci1yb3dcIj5cbiAgICA8VGVzdEluZm8gLz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ0ZXN0LXJ1bm5lci1yb3dcIj5cbiAgICA8VGVzdFRyZWUgLz5cbiAgICA8VGVzdExvZyAvPlxuICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7bWFwU3RhdGUsIG1hcEFjdGlvbnN9IGZyb20gJ3Z1ZXgnXG5cbmltcG9ydCBUZXN0SW5mbyBmcm9tICcuL3Rlc3QtaW5mby52dWUnXG5pbXBvcnQgVGVzdFRyZWUgZnJvbSAnLi90ZXN0LXRyZWUudnVlJ1xuaW1wb3J0IFRlc3RMb2cgZnJvbSAnLi90ZXN0LWxvZy52dWUnXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vc3RvcmUnXG5cbm1vZHVsZS5leHBvcnRzID17XG4gIG5hbWU6IFwiVGVzdFJ1bm5lclwiLFxuICBzdG9yZSxcbiAgY29tcG9uZW50czoge1xuICAgIFRlc3RJbmZvLFxuICAgIFRlc3RUcmVlLFxuICAgIFRlc3RMb2dcbiAgfSxcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnaXNWaXNpYmxlJzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSAhdGhpcy5pc1Zpc2libGVcbiAgICB9LFxuICAgIC4uLm1hcEFjdGlvbnMoW1xuICAgICAgJ3J1bkFsbFRlc3RzJyxcbiAgICAgICdydW5GYWlsZWRUZXN0cycsXG4gICAgXSlcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICAnaXNWaXNpYmxlJzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5wYW5lbC5zaG93KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFuZWwuaGlkZSgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjcmVhdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRCb3R0b21QYW5lbCh7XG4gICAgICBpdGVtOiBlbGVtZW50LFxuICAgICAgdmlzaWJsZTogdGhpcy5pc1Zpc2libGVcbiAgICB9KVxuICAgIHRoaXMuJG1vdW50KGVsZW1lbnQpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4udGVzdC1ydW5uZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnRlc3QtcnVubmVyIC50ZXN0LXJ1bm5lci1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxuLnRlc3QtcnVubmVyLXJvdzpsYXN0LWNoaWxkIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB0ZXN0LXJ1bm5lci52dWU/NzdkN2MyMmIiLCI8dGVtcGxhdGU+XG48bGkgY2xhc3M9XCJlbnRyeVwiXG4gICAgdi1iaW5kOmNsYXNzPVwiY2xhc3NPYmplY3RcIiB2LW9uOmNsaWNrLnN0b3A9XCJvbkNsaWNrXCIgdi1vbjpkYmxjbGljay5zdG9wPVwib25EYmxDbGlja1wiPlxuICA8ZGl2IGNsYXNzPVwiaGVhZGVyIGxpc3QtaXRlbVwiIHYtYmluZDpjbGFzcz1cInsndGVzdC1mYWlsZWQnOiBpdGVtLmhhc0ZhaWxlZH1cIj5cbiAgICA8c3BhbiBjbGFzcz1cIm5hbWUgaWNvblwiIHYtYmluZDpjbGFzcz1cImljb25DbGFzc1wiIC8+XG4gICAgPHNwYW4+e3sgaXRlbS5uYW1lIH19PC9zcGFuPlxuICAgIDxzcGFuIHYtaWY9XCJpdGVtLmR1cmF0aW9uID4gMC4wXCIgY2xhc3M9XCJ0ZXN0LXRpbWVcIj4mbmJzcDsoe3sgaXRlbS5kdXJhdGlvbi50b0ZpeGVkKDMpIH19cyk8L3NwYW4+XG4gIDwvZGl2PlxuICA8b2wgY2xhc3M9XCJlbnRyaWVzIGxpc3QtdHJlZVwiPlxuICAgIDxUZXN0VHJlZU5vZGUgdi1mb3I9XCJjaGlsZCBpbiBpdGVtLmNoaWxkSXRlbXNcIiB2LWJpbmQ6aXRlbT1cImNoaWxkXCIgLz5cbiAgPC9vbD5cbjwvbGk+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogXCJUZXN0VHJlZU5vZGVcIixcbiAgcHJvcHM6IFtcbiAgICAnaXRlbSdcbiAgXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNFeHBhbmRlZDogZmFsc2VcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuaXNFeHBhbmRlZCA9ICF0aGlzLmlzRXhwYW5kZWQ7XG4gICAgICBpZiAodGhpcy5pdGVtLmlzVGVzdClcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRTZWxlY3RUZXN0Jyx0aGlzLml0ZW0pXG4gICAgfSxcbiAgICBvbkRibENsaWNrOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKHRoaXMuaXRlbS5pc1Rlc3QpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbS5maWxlbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLml0ZW0uZmlsZW5hbWUsIHtcbiAgICAgICAgICAgIGluaXRpYWxMaW5lOiB0aGlzLml0ZW0ubGluZS0xLFxuICAgICAgICAgICAgaW5pdGlhbENvbHVtbjogdGhpcy5pdGVtLmNvbHVtbi0xXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc09iamVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGlyZWN0b3J5OiB0aGlzLml0ZW0uaXNDb250YWluZXIsXG4gICAgICAgICdsaXN0LW5lc3RlZC1pdGVtJzogdGhpcy5pdGVtLmlzQ29udGFpbmVyLFxuICAgICAgICBleHBhbmRlZDogdGhpcy5pc0V4cGFuZGVkLFxuICAgICAgICBjb2xsYXBzZWQ6ICF0aGlzLmlzRXhwYW5kZWQsXG4gICAgICAgIGZpbGUgOiAhdGhpcy5pdGVtLmlzQ29udGFpbmVyLFxuICAgICAgICAnbGlzdC1pdGVtJyA6ICF0aGlzLml0ZW0uaXNDb250YWluZXIsXG4gICAgICAgIHNlbGVjdGVkOiB0aGlzLml0ZW0gPT09IHRoaXMuJHN0b3JlLnN0YXRlLnNlbGVjdGVkVGVzdFxuICAgICAgfVxuICAgIH0sXG4gICAgaWNvbkNsYXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnZmEgZmEtY3ViZXMnOiB0aGlzLml0ZW0uaXNQYWNrYWdlLFxuICAgICAgICAnZmEgZmEtZmlsZS1jb2RlLW8nIDogdGhpcy5pdGVtLmlzQ2xhc3MsXG4gICAgICAgICdmYSBmYS1saXN0LXVsJyA6IHRoaXMuaXRlbS5pc1Rlc3RcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdGVzdC10cmVlLW5vZGUudnVlPzZjYTQxYjMxIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cInRlc3QtdHJlZSB0cmVlLXZpZXctcmVzaXplciB0b29sLXBhbmVsXCIgcmVmPVwiY29udGVudFwiPlxuICA8ZGl2IGNsYXNzPVwidHJlZS12aWV3LXNjcm9sbGVyIG9yZGVyLS1jZW50ZXJcIj5cbiAgICA8b2wgY2xhc3M9XCJ0cmVlLXZpZXcgZnVsbC1tZW51IGxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4gZm9jdXNhYmxlLXBhbmVsXCI+XG4gICAgICA8VGVzdFRyZWVOb2RlIHYtZm9yPVwiaXRlbSBpbiB0ZXN0VHJlZS5jaGlsZEl0ZW1zXCIgdi1iaW5kOml0ZW09XCJpdGVtXCIvPlxuICAgIDwvb2w+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidHJlZS12aWV3LXJlc2l6ZS1oYW5kbGVcIiByZWY9XCJoYW5kbGVcIiB2LW9uOm1vdXNlZG93bj1cInN0YXJ0UmVzaXplXCIgc3R5bGU9XCJyaWdodDotNXB4O1wiPjwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIlxuaW1wb3J0IHttYXBTdGF0ZX0gZnJvbSBcInZ1ZXhcIlxuXG5pbXBvcnQgVGVzdFRyZWVOb2RlIGZyb20gXCIuL3Rlc3QtdHJlZS1ub2RlLnZ1ZVwiXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiBcIlRlc3RUcmVlXCIsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBUZXN0VHJlZU5vZGVcbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICAuLi5tYXBTdGF0ZShbXG4gICAgICBcInRlc3RUcmVlXCJcbiAgICBdKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3RhcnRSZXNpemU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMueE9sZCA9IGV2ZW50LnNjcmVlblg7XG4gICAgICAkKFwiYm9keVwiKS5vbihcIm1vdXNlbW92ZVwiLHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICAgICQoXCJib2R5XCIpLm9uKFwibW91c2V1cFwiLHRoaXMuc3RvcFJlc2l6ZSk7XG4gICAgfSxcbiAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIG9iaiA9ICQodGhpcy4kcmVmcy5jb250ZW50KVxuICAgICAgaWYgKHRoaXMuaXNSZXNpemluZykge1xuICAgICAgICBvYmoud2lkdGgob2JqLndpZHRoKCkgLSAodGhpcy54T2xkIC0gZXZlbnQuc2NyZWVuWCkpO1xuICAgICAgICB0aGlzLnhPbGQgPSBldmVudC5zY3JlZW5YO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcFJlc2l6ZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB0aGlzLmlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICQoXCJib2R5XCIpLm9mZihcIm1vc2V1cFwiLHRoaXMuc3RvcFJlc2l6ZSlcbiAgICAgICQoXCJib2R5XCIpLm9mZihcIm1vdXNlbW92ZVwiLHRoaXMuaGFuZGxlUmVzaXplKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbi50ZXN0LXJ1bm5lciAudGVzdC10cmVlIHtcbiAgd2lkdGg6IDMwMHB4O1xufVxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB0ZXN0LXRyZWUudnVlPzY0NDk3MmYwIiwiY29uc3QgYWN0aW9ucyA9IHtcbiAgbG9hZFRlc3RDb25maWdzKGNvbnRleHQpIHtcbiAgICB2YXIgdGVzdENvbmZpZ3MgPSBbXVxuICAgIGZvciAodmFyIHByb2plY3RQYXRoIG9mIGF0b20ucHJvamVjdC5nZXRQYXRocygpKSB7XG4gICAgICB2YXIgY29uZmlnRmlsZSA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgXCIudHJyY1wiKVxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHN0YXQgPSBmcy5zdGF0U3luYyhjb25maWdGaWxlKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdmFyIGNvbmZpZ3NcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbmZpZ3MgPSB5YW1sLnNhZmVMb2FkKGZzLnJlYWRGaWxlU3luYyhjb25maWdGaWxlLCBcInV0ZjhcIikpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHRlc3QgcnVubmVyIGNvbmZpZyBmaWxlLlwiLCB7XG4gICAgICAgICAgZGV0YWlsOiBlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZm9yICh2YXIgY29uZmlnIG9mIGNvbmZpZ3MpIHtcbiAgICAgICAgY29uZmlnLnByb2plY3RQYXRoID0gcHJvamVjdFBhdGhcbiAgICAgICAgLyogQ2hlY2sgZm9yIG5vIG5hbWUgYW5kIGdlbmVyYXRlIG9uZSAqL1xuICAgICAgICBpZiAoIShcIm5hbWVcIiBpbiBjb25maWcpKVxuICAgICAgICAgIGNvbmZpZy5uYW1lID0gXCJUZXN0IENvbmZpZyBOci4gXCIgKyAoY29uZmlncy5pbmRleE9mKGNvbmZpZykrMSlcbiAgICAgICAgLyogQ2hlY2sgZm9yIG5vIHJ1bm5lciAqL1xuICAgICAgICBpZiAoIShcInJ1bm5lclwiIGluIGNvbmZpZykpIHtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcIk5vIHJ1bm5lciBmb3IgZGVmaW5lZCBmb3I6IFwiICsgY29uZmlnLm5hbWUpXG4gICAgICAgICAgY29uZmlnLnJ1bm5lciA9IFwidW5rbm93blwiXG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbmZpZywgXCJkaXNwbGF5TmFtZVwiLCB7XG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3J1bm5lciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIiAoXCIgKyB0aGlzLl9ydW5uZXIubmFtZSArIFwiKVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvbmZpZy5ydW5uZXIgaW4gY29udGV4dC5zdGF0ZS5ydW5uZXJzKSB7XG4gICAgICAgICAgY29uZmlnLl9ydW5uZXIgPSBuZXcgY29udGV4dC5zdGF0ZS5ydW5uZXJzW2NvbmZpZy5ydW5uZXJdKGNvbmZpZylcbiAgICAgICAgICBjb25maWcuX3J1bm5lci5vblRlc3RTdGFydCgodGVzdCkgPT4ge1xuICAgICAgICAgICAgY29udGV4dC5jb21taXQoXCJpbmNyZW1lbnRUZXN0c1N0YXJ0ZWRcIilcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbmZpZy5fcnVubmVyLm9uVGVzdEVuZCgodGVzdFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29udGV4dC5jb21taXQoXCJhZGRUZXN0UmVzdWx0XCIsIHRlc3RSZXN1bHQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgY29uZmlnLl9ydW5uZXIgPSBudWxsXG4gICAgICAgIHRlc3RDb25maWdzLnB1c2goY29uZmlnKVxuICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0LmNvbW1pdChcInNldFRlc3RDb25maWdzXCIsIHRlc3RDb25maWdzKVxuICB9LFxuICBydW5DdXJyZW50VGVzdENvbmZpZzogZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciB0ZXN0Q29uZmlnID0gY29udGV4dC5nZXR0ZXJzLnNlbGVjdGVkVGVzdENvbmZpZ1xuICAgIGlmICh0ZXN0Q29uZmlnID09IG51bGwpIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcIk5vIHRlc3QgY29uZmlnIHNlbGVjdGVkLlwiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0ZXN0Q29uZmlnLl9ydW5uZXIgPT0gbnVsbCkge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKHRlc3RDb25maWcubmFtZSArIFwiICBoYXMgbm8gdGVzdCBydW5uZXIuXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGVzdENvbmZpZy5fcnVubmVyLmdldFRlc3RzKCkudGhlbihcbiAgICAgICh0ZXN0cykgPT4ge1xuICAgICAgICBjb250ZXh0LmNvbW1pdChcImNsZWFyVGVzdFJlc3VsdHNcIilcbiAgICAgICAgY29udGV4dC5jb21taXQoXCJzZXRUZXN0c1wiLCB0ZXN0cylcbiAgICAgICAgdGVzdENvbmZpZy5fcnVubmVyLnJ1bkFsbFRlc3RzKClcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFwiRmFpbGVkIHRvIGxvYWQgdGVzdHMgZm9yOiBcIiArIHRlc3RDb25maWcubmFtZSwge2RldGFpbDogZXJyfSlcbiAgICAgIH0pXG4gIH0sXG4gIHJ1bkZhaWxlZFRlc3RzOiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgdmFyIHRlc3RDb25maWcgPSBjb250ZXh0LmdldHRlcnMuc2VsZWN0ZWRUZXN0Q29uZmlnXG4gICAgaWYgKHRlc3RDb25maWcgPT0gbnVsbCkge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFwiTm8gdGVzdCBjb25maWcgc2VsZWN0ZWQuXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRlc3RDb25maWcuX3J1bm5lciA9PSBudWxsKSB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IodGVzdENvbmZpZy5uYW1lICsgXCIgIGhhcyBubyB0ZXN0IHJ1bm5lci5cIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgZmFpbGVkVGVzdHMgPSBbXVxuICAgIGZvciAodmFyIHRlc3Qgb2YgY29udGV4dC5zdGF0ZS50ZXN0cylcbiAgICAgIGlmICh0ZXN0Lmhhc0ZhaWxlZClcbiAgICAgICAgZmFpbGVkVGVzdHMucHVzaCh0ZXN0KVxuICAgIGNvbnRleHQuY29tbWl0KFwiY2xlYXJUZXN0UmVzdWx0c1wiKVxuICAgIGNvbnRleHQuY29tbWl0KFwic2V0VGVzdHNcIixmYWlsZWRUZXN0cylcbiAgICB0ZXN0Q29uZmlnLl9ydW5uZXIucnVuVGVzdHMoZmFpbGVkVGVzdHMpXG4gIH0sXG4gIGFwcGVuZFJ1bm5lcihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgY29udGV4dC5jb21taXQoXCJhcHBlbmRSdW5uZXJcIiwgb3B0aW9ucylcbiAgICBjb250ZXh0LmRpc3BhdGNoKFwibG9hZFRlc3RDb25maWdzXCIpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY3Rpb25zXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DOi9Vc2Vycy9jc2VpdHovZ2l0aHViL3Rlc3QtcnVubmVyL2xpYi9zdG9yZS9hY3Rpb25zLmpzIiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHlhbWwgZnJvbSBcImpzLXlhbWxcIlxuXG5WdWUudXNlKFZ1ZXgpXG5cbmNvbnN0IGdldHRlcnMgPSB7XG4gIHNlbGVjdGVkVGVzdENvbmZpZyhzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5zZWxlY3RlZFRlc3RDb25maWdJbmRleCA8IDAgJiYgc3RhdGUuc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXggPiBzdGF0ZS50ZXN0Q29uZmlncy5sZW5ndGgpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIGVsc2VcbiAgICAgIHJldHVybiBzdGF0ZS50ZXN0Q29uZmlnc1tzdGF0ZS5zZWxlY3RlZFRlc3RDb25maWdJbmRleF1cbiAgfVxufVxuXG5pbXBvcnQgc3RhdGUgZnJvbSBcIi4vc3RhdGUuanNcIlxuaW1wb3J0IG11dGF0aW9ucyBmcm9tIFwiLi9tdXRhdGlvbnMuanNcIlxuaW1wb3J0IGFjdGlvbnMgZnJvbSBcIi4vYWN0aW9ucy5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV4LlN0b3JlKHtcbiAgc3RhdGUsXG4gIG11dGF0aW9ucyxcbiAgYWN0aW9ucyxcbiAgZ2V0dGVyc1xufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0M6L1VzZXJzL2NzZWl0ei9naXRodWIvdGVzdC1ydW5uZXIvbGliL3N0b3JlL2luZGV4LmpzIiwiY29uc3QgbXV0YXRpb25zID0ge1xuICBhcHBlbmRSdW5uZXIoc3RhdGUsIHtcbiAgICBrZXksXG4gICAgcnVubmVyXG4gIH0pIHtcbiAgICB2YXIgcnVubmVycyA9IHN0YXRlLnJ1bm5lcnNcbiAgICBydW5uZXJzW2tleV0gPSBydW5uZXJcbiAgICBzdGF0ZS5ydW5uZXJzID0gcnVubmVyc1xuICB9LFxuICBzZWxlY3RUZXN0Q29uZmlnQnlJbmRleChzdGF0ZSwgaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwICYmIGluZGV4ID4gc3RhdGUudGVzdENvbmZpZ3MubGVuZ3RoKSByZXR1cm5cbiAgICBzdGF0ZS5zZWxlY3RlZFRlc3RDb25maWdJbmRleCA9IGluZGV4XG4gIH0sXG4gIHNldFRlc3RUcmVlKHN0YXRlLCB0ZXN0VHJlZSkge1xuICAgIHN0YXRlLnRlc3RUcmVlID0gdGVzdFRyZWVcbiAgfSxcbiAgc2V0U2VsZWN0VGVzdChzdGF0ZSwgdGVzdCkge1xuICAgIHN0YXRlLnNlbGVjdGVkVGVzdCA9IHRlc3RcbiAgfSxcbiAgc2V0VGVzdFJlc3VsdHMoc3RhdGUsIHRlc3RSZXN1bHRzKSB7XG4gICAgc3RhdGUudGVzdFJlc3VsdHMgPSB0ZXN0UmVzdWx0c1xuICB9LFxuICBjbGVhclRlc3RSZXN1bHRzKHN0YXRlKSB7XG4gICAgc3RhdGUudGVzdFJlc3VsdHMgPSB7XG4gICAgICB0ZXN0c1N0YXJ0ZWQ6IDAsXG4gICAgICB0ZXN0c0ZpbmlzaGVkOiAwLFxuICAgICAgdGVzdHNUb3RhbDogMCxcbiAgICAgIHRlc3RzUGFzc2VkOiAwLFxuICAgICAgdGVzdHNGYWlsZWQ6IDAsXG4gICAgICB0ZXN0c0Vycm9yOiAwLFxuICAgICAgZHVyYXRpb246IDBcbiAgICB9XG4gIH0sXG4gIHNldFRlc3RDb25maWdzKHN0YXRlLCB0ZXN0Q29uZmlncykge1xuICAgIHN0YXRlLnRlc3RDb25maWdzID0gdGVzdENvbmZpZ3NcbiAgfSxcbiAgc2V0VGVzdHMoc3RhdGUsIHRlc3RzKSB7XG4gICAgdmFyIHRlc3RUcmVlID0ge1xuICAgICAgY2hpbGRJdGVtczoge31cbiAgICB9XG4gICAgc3RhdGUudGVzdHMubGVuZ3RoID0gMFxuICAgIHZhciBlbGVtZW50ID0gdGVzdFRyZWVcbiAgICB2YXIgcGFyZW50ID0gbnVsbFxuICAgIGZvciAodmFyIHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgIGVsZW1lbnQgPSB0ZXN0VHJlZVxuICAgICAgaWYgKHRlc3QucGFja2FnZU5hbWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgcGtnTmFtZSBvZiB0ZXN0LnBhY2thZ2VOYW1lcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5jaGlsZEl0ZW1zW3BrZ05hbWVdICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNoaWxkSXRlbXNbcGtnTmFtZV0gPSB7XG4gICAgICAgICAgICAgIGlzQ29udGFpbmVyOiB0cnVlLFxuICAgICAgICAgICAgICBpc1BhY2thZ2U6IHRydWUsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICBuYW1lOiBwa2dOYW1lLFxuICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICAgICAgY2hpbGRJdGVtczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyZW50ID0gZWxlbWVudFxuICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmNoaWxkSXRlbXNbcGtnTmFtZV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0ZXN0LmNsYXNzbmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQuY2hpbGRJdGVtc1t0ZXN0LmNsYXNzbmFtZV0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICBlbGVtZW50LmNoaWxkSXRlbXNbdGVzdC5jbGFzc25hbWVdID0ge1xuICAgICAgICAgICAgaXNDb250YWluZXI6IHRydWUsXG4gICAgICAgICAgICBpc0NsYXNzOiB0cnVlLFxuICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICBuYW1lOiB0ZXN0LmNsYXNzbmFtZSxcbiAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgY2hpbGRJdGVtczoge31cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gZWxlbWVudFxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5jaGlsZEl0ZW1zW3Rlc3QuY2xhc3NuYW1lXVxuICAgICAgfVxuICAgICAgZWxlbWVudC5jaGlsZEl0ZW1zW3Rlc3QudGVzdG5hbWVdID0ge1xuICAgICAgICBpc0NvbnRhaW5lcjogZmFsc2UsXG4gICAgICAgIGlzVGVzdDogdHJ1ZSxcbiAgICAgICAgZmlsZW5hbWU6IHRlc3QuZmlsZW5hbWUsXG4gICAgICAgIGxpbmU6IHRlc3QubGluZSxcbiAgICAgICAgY29sdW1uOiB0ZXN0LmNvbHVtbixcbiAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgIG5hbWU6IHRlc3QudGVzdG5hbWUsXG4gICAgICAgIHRlc3RJZGVudGlmaWVyOiB0ZXN0LnRlc3RJZGVudGlmaWVyLFxuICAgICAgICB0ZXN0bmFtZTogdGVzdC50ZXN0bmFtZSxcbiAgICAgICAgY2xhc3NuYW1lOiB0ZXN0LmNsYXNzbmFtZSxcbiAgICAgICAgcGFja2FnZU5hbWVzOiB0ZXN0LnBhY2thZ2VOYW1lcyxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgIGNoaWxkSXRlbXM6IHt9LFxuICAgICAgICBoYXNSdW46IGZhbHNlLFxuICAgICAgICBoYXNGYWlsZWQ6IGZhbHNlLFxuICAgICAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgICAgIGxvZzogW10sXG4gICAgICAgIHRyYWNlYmFjazogW11cbiAgICAgIH1cbiAgICAgIHN0YXRlLnRlc3RzLnB1c2goZWxlbWVudC5jaGlsZEl0ZW1zW3Rlc3QudGVzdG5hbWVdKVxuICAgIH1cbiAgICBzdGF0ZS50ZXN0UmVzdWx0cy50ZXN0c1RvdGFsID0gdGVzdHMubGVuZ3RoXG4gICAgc3RhdGUudGVzdFRyZWUgPSB0ZXN0VHJlZVxuICB9LFxuICBhZGRUZXN0UmVzdWx0KHN0YXRlLCByZXN1bHQpIHtcbiAgICAvKiBEaXNjb3ZlciB0ZXN0VHJlZSBlbnRyeSAqL1xuICAgIHZhciB0ZXN0ID0gc3RhdGUudGVzdFRyZWUuY2hpbGRJdGVtc1xuICAgIGlmIChyZXN1bHQucGFja2FnZU5hbWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGZvciAodmFyIHBrZ05hbWUgb2YgcmVzdWx0LnBhY2thZ2VOYW1lcykge1xuICAgICAgICB0ZXN0ID0gdGVzdFtwa2dOYW1lXVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdC5jbGFzc25hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRlc3QgPSB0ZXN0LmNoaWxkSXRlbXNbcmVzdWx0LmNsYXNzbmFtZV1cbiAgICB9XG4gICAgaWYgKHJlc3VsdC50ZXN0bmFtZSBpbiB0ZXN0LmNoaWxkSXRlbXMpIHtcbiAgICAgIHRlc3QgPSB0ZXN0LmNoaWxkSXRlbXNbcmVzdWx0LnRlc3RuYW1lXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLyogU2V0IHJlc3VsdCAqL1xuICAgIHRlc3QuaGFzUnVuID0gdHJ1ZVxuICAgIHRlc3QuaGFzRmFpbGVkID0gcmVzdWx0Lmhhc0ZhaWxlZFxuICAgIHRlc3QuaGFzRXJyb3IgPSByZXN1bHQuaGFzRXJyb3JcbiAgICB0ZXN0LmxvZyA9IHJlc3VsdC5sb2dcbiAgICB0ZXN0LnRyYWNlYmFjayA9IHJlc3VsdC50cmFjZWJhY2tcbiAgICAvKiByZWN1cnNpdmUgZHVyYXRpb24gKi9cbiAgICB2YXIgZW50cnkgPSB0ZXN0XG4gICAgd2hpbGUgKGVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBlbnRyeS5kdXJhdGlvbiArPSByZXN1bHQuZHVyYXRpb25cbiAgICAgIGVudHJ5ID0gZW50cnkucGFyZW50XG4gICAgfVxuICAgIHN0YXRlLnRlc3RSZXN1bHRzLmR1cmF0aW9uICs9IHJlc3VsdC5kdXJhdGlvblxuICAgIHN0YXRlLnRlc3RSZXN1bHRzLnRlc3RzRmluaXNoZWQgKz0gMVxuICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIHN0YXRlLnRlc3RSZXN1bHRzLnRlc3RzRXJyb3IgKz0gMVxuICAgIGlmIChyZXN1bHQuaGFzRmFpbGVkKSBzdGF0ZS50ZXN0UmVzdWx0cy50ZXN0c0ZhaWxlZCArPSAxXG4gIH0sXG4gIGluY3JlbWVudFRlc3RzU3RhcnRlZChzdGF0ZSkge1xuICAgIHN0YXRlLnRlc3RSZXN1bHRzLnRlc3RzU3RhcnRlZCArPSAxXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtdXRhdGlvbnNcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0M6L1VzZXJzL2NzZWl0ei9naXRodWIvdGVzdC1ydW5uZXIvbGliL3N0b3JlL211dGF0aW9ucy5qcyIsImNvbnN0IHN0YXRlID0ge1xuICBydW5uZXJzOiB7fSxcbiAgc2VsZWN0ZWRUZXN0OiBudWxsLFxuICBzZWxlY3RlZFRlc3RDb25maWdJbmRleDogLTEsXG4gIHRlc3RDb25maWdzOiBbXSxcbiAgdGVzdFRyZWU6IHt9LFxuICB0ZXN0czogW10sXG4gIHRlc3RSZXN1bHRzOiB7XG4gICAgdGVzdHNTdGFydGVkOiAwLFxuICAgIHRlc3RzRmluaXNoZWQ6IDAsXG4gICAgdGVzdHNUb3RhbDogMCxcbiAgICB0ZXN0c1Bhc3NlZDogMCxcbiAgICB0ZXN0c0ZhaWxlZDogMCxcbiAgICB0ZXN0c0Vycm9yOiAwLFxuICAgIGR1cmF0aW9uOiAwXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQzovVXNlcnMvY3NlaXR6L2dpdGh1Yi90ZXN0LXJ1bm5lci9saWIvc3RvcmUvc3RhdGUuanMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogeHRlcm0uanM6IHh0ZXJtLCBpbiB0aGUgYnJvd3NlclxcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE2LCBTb3VyY2VMYWlyIFByaXZhdGUgQ29tcGFueSAod3d3LnNvdXJjZWxhaXIuY29tIChNSVQgTGljZW5zZSlcXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxMywgQ2hyaXN0b3BoZXIgSmVmZnJleSAoTUlUIExpY2Vuc2UpXFxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoamovdGVybS5qc1xcbiAqXFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFxcXCJTb2Z0d2FyZVxcXCIpLCB0byBkZWFsXFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxcbiAqXFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cXG4gKlxcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcXFwiQVMgSVNcXFwiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXFxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXFxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxcbiAqIFRIRSBTT0ZUV0FSRS5cXG4gKlxcbiAqIE9yaWdpbmFsbHkgZm9ya2VkIGZyb20gKHdpdGggdGhlIGF1dGhvcidzIHBlcm1pc3Npb24pOlxcbiAqICAgRmFicmljZSBCZWxsYXJkJ3MgamF2YXNjcmlwdCB2dDEwMCBmb3IganNsaW51eDpcXG4gKiAgIGh0dHA6Ly9iZWxsYXJkLm9yZy9qc2xpbnV4L1xcbiAqICAgQ29weXJpZ2h0IChjKSAyMDExIEZhYnJpY2UgQmVsbGFyZFxcbiAqICAgVGhlIG9yaWdpbmFsIGRlc2lnbiByZW1haW5zLiBUaGUgdGVybWluYWwgaXRzZWxmXFxuICogICBoYXMgYmVlbiBleHRlbmRlZCB0byBpbmNsdWRlIHh0ZXJtIENTSSBjb2RlcywgYW1vbmdcXG4gKiAgIG90aGVyIGZlYXR1cmVzLlxcbiAqL1xcblxcbi8qXFxuICogIERlZmF1bHQgc3R5bGUgZm9yIHh0ZXJtLmpzXFxuICovXFxuXFxuLnRlcm1pbmFsIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiBjb3VyaWVyLW5ldywgY291cmllciwgbW9ub3NwYWNlO1xcbiAgICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFxcXCJsaWdhXFxcIiAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi50ZXJtaW5hbC5mb2N1cyxcXG4udGVybWluYWw6Zm9jdXMge1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWhlbHBlcnMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1oZWxwZXItdGV4dGFyZWEge1xcbiAgICAvKlxcbiAgICAgKiBIQUNLOiB0byBmaXggSUUncyBibGlua2luZyBjdXJzb3JcXG4gICAgICogTW92ZSB0ZXh0YXJlYSBvdXQgb2YgdGhlIHNjcmVlbiB0byB0aGUgZmFyIGxlZnQsIHNvIHRoYXQgdGhlIGN1cnNvciBpcyBub3QgdmlzaWJsZS5cXG4gICAgICovXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgbGVmdDogLTk5OTllbTtcXG4gICAgdG9wOiAtOTk5OWVtO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICB6LWluZGV4OiAtMTA7XFxuICAgIC8qKiBQcmV2ZW50IHdyYXBwaW5nIHNvIHRoZSBJTUUgYXBwZWFycyBhZ2FpbnN0IHRoZSB0ZXh0YXJlYSBhdCB0aGUgY29ycmVjdCBwb3NpdGlvbiAqL1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICByZXNpemU6IG5vbmU7XFxufVxcblxcbi50ZXJtaW5hbCAudGVybWluYWwtY3Vyc29yIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgY29sb3I6ICMwMDA7XFxufVxcblxcbi50ZXJtaW5hbDpub3QoLmZvY3VzKSAudGVybWluYWwtY3Vyc29yIHtcXG4gICAgb3V0bGluZTogMXB4IHNvbGlkICNmZmY7XFxuICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLnRlcm1pbmFsLmZvY3VzIC50ZXJtaW5hbC1jdXJzb3IuYmxpbmtpbmcge1xcbiAgICBhbmltYXRpb246IGJsaW5rLWN1cnNvciAxLjJzIGluZmluaXRlIHN0ZXAtZW5kO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWN1cnNvciB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgICBjb2xvcjogIzAwMDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICBjb2xvcjogI0ZGRjtcXG4gICAgfVxcbn1cXG5cXG4udGVybWluYWwgLmNvbXBvc2l0aW9uLXZpZXcge1xcbiAgICBiYWNrZ3JvdW5kOiAjMDAwO1xcbiAgICBjb2xvcjogI0ZGRjtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4udGVybWluYWwgLmNvbXBvc2l0aW9uLXZpZXcuYWN0aXZlIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tdmlld3BvcnQge1xcbiAgICAvKiBPbiBPUyBYIHRoaXMgaXMgcmVxdWlyZWQgaW4gb3JkZXIgZm9yIHRoZSBzY3JvbGwgYmFyIHRvIGFwcGVhciBmdWxseSBvcGFxdWUgKi9cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLXJvd3Mge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1yb3dzID4gZGl2IHtcXG4gICAgLyogTGluZXMgY29udGFpbmluZyBzcGFucyBhbmQgdGV4dCBub2RlcyBvY2Fzc2lvbmFsbHkgd3JhcCBkZXNwaXRlIGJlaW5nIHRoZSBzYW1lIHdpZHRoICgjMzI3KSAqL1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLXNjcm9sbC1hcmVhIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNoYXItbWVhc3VyZS1lbGVtZW50IHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogLTk5OTllbTtcXG59XFxuXFxuLypcXG4gKiAgRGV0ZXJtaW5lIGRlZmF1bHQgY29sb3JzIGZvciB4dGVybS5qc1xcbiAqL1xcbi50ZXJtaW5hbCAueHRlcm0tYm9sZCB7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLXVuZGVybGluZSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJsaW5rIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBibGluaztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1oaWRkZW4ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMCB7XFxuICAgIGNvbG9yOiAjMmUzNDM2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmUzNDM2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEge1xcbiAgICBjb2xvcjogI2NjMDAwMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjMDAwMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yIHtcXG4gICAgY29sb3I6ICM0ZTlhMDY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0ZTlhMDY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMyB7XFxuICAgIGNvbG9yOiAjYzRhMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzRhMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQge1xcbiAgICBjb2xvcjogIzM0NjVhNDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci00IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM0NjVhNDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci01IHtcXG4gICAgY29sb3I6ICM3NTUwN2I7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3NTUwN2I7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItNiB7XFxuICAgIGNvbG9yOiAjMDY5ODlhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDY5ODlhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcge1xcbiAgICBjb2xvcjogI2QzZDdjZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci03IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QzZDdjZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci04IHtcXG4gICAgY29sb3I6ICM1NTU3NTM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NTU3NTM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItOSB7XFxuICAgIGNvbG9yOiAjZWYyOTI5O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWYyOTI5O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwIHtcXG4gICAgY29sb3I6ICM4YWUyMzQ7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGFlMjM0O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExIHtcXG4gICAgY29sb3I6ICNmY2U5NGY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNlOTRmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyIHtcXG4gICAgY29sb3I6ICM3MjlmY2Y7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzI5ZmNmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzIHtcXG4gICAgY29sb3I6ICNhZDdmYTg7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWQ3ZmE4O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0IHtcXG4gICAgY29sb3I6ICMzNGUyZTI7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzRlMmUyO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1IHtcXG4gICAgY29sb3I6ICNlZWVlZWM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVjO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2IHtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3IHtcXG4gICAgY29sb3I6ICMwMDAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4IHtcXG4gICAgY29sb3I6ICMwMDAwODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5IHtcXG4gICAgY29sb3I6ICMwMDAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwIHtcXG4gICAgY29sb3I6ICMwMDAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMGQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxIHtcXG4gICAgY29sb3I6ICMwMDAwZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyIHtcXG4gICAgY29sb3I6ICMwMDVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzIHtcXG4gICAgY29sb3I6ICMwMDVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0IHtcXG4gICAgY29sb3I6ICMwMDVmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI1IHtcXG4gICAgY29sb3I6ICMwMDVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI2IHtcXG4gICAgY29sb3I6ICMwMDVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI3IHtcXG4gICAgY29sb3I6ICMwMDVmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI4IHtcXG4gICAgY29sb3I6ICMwMDg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI5IHtcXG4gICAgY29sb3I6ICMwMDg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4NzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMwIHtcXG4gICAgY29sb3I6ICMwMDg3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMxIHtcXG4gICAgY29sb3I6ICMwMDg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMyIHtcXG4gICAgY29sb3I6ICMwMDg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4N2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMzIHtcXG4gICAgY29sb3I6ICMwMDg3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM0IHtcXG4gICAgY29sb3I6ICMwMGFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM1IHtcXG4gICAgY29sb3I6ICMwMGFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM2IHtcXG4gICAgY29sb3I6ICMwMGFmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM3IHtcXG4gICAgY29sb3I6ICMwMGFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM4IHtcXG4gICAgY29sb3I6ICMwMGFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM5IHtcXG4gICAgY29sb3I6ICMwMGFmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQwIHtcXG4gICAgY29sb3I6ICMwMGQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQxIHtcXG4gICAgY29sb3I6ICMwMGQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkNzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQyIHtcXG4gICAgY29sb3I6ICMwMGQ3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQzIHtcXG4gICAgY29sb3I6ICMwMGQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ0IHtcXG4gICAgY29sb3I6ICMwMGQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkN2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ1IHtcXG4gICAgY29sb3I6ICMwMGQ3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ2IHtcXG4gICAgY29sb3I6ICMwMGZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ3IHtcXG4gICAgY29sb3I6ICMwMGZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ4IHtcXG4gICAgY29sb3I6ICMwMGZmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ5IHtcXG4gICAgY29sb3I6ICMwMGZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUwIHtcXG4gICAgY29sb3I6ICMwMGZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUxIHtcXG4gICAgY29sb3I6ICMwMGZmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUyIHtcXG4gICAgY29sb3I6ICM1ZjAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUzIHtcXG4gICAgY29sb3I6ICM1ZjAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMDVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU0IHtcXG4gICAgY29sb3I6ICM1ZjAwODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU1IHtcXG4gICAgY29sb3I6ICM1ZjAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU2IHtcXG4gICAgY29sb3I6ICM1ZjAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMGQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU3IHtcXG4gICAgY29sb3I6ICM1ZjAwZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU4IHtcXG4gICAgY29sb3I6ICM1ZjVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU5IHtcXG4gICAgY29sb3I6ICM1ZjVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYwIHtcXG4gICAgY29sb3I6ICM1ZjVmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYxIHtcXG4gICAgY29sb3I6ICM1ZjVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYyIHtcXG4gICAgY29sb3I6ICM1ZjVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYzIHtcXG4gICAgY29sb3I6ICM1ZjVmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY0IHtcXG4gICAgY29sb3I6ICM1Zjg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY1IHtcXG4gICAgY29sb3I6ICM1Zjg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4NzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY2IHtcXG4gICAgY29sb3I6ICM1Zjg3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY3IHtcXG4gICAgY29sb3I6ICM1Zjg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY4IHtcXG4gICAgY29sb3I6ICM1Zjg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4N2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY5IHtcXG4gICAgY29sb3I6ICM1Zjg3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcwIHtcXG4gICAgY29sb3I6ICM1ZmFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcxIHtcXG4gICAgY29sb3I6ICM1ZmFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcyIHtcXG4gICAgY29sb3I6ICM1ZmFmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTczIHtcXG4gICAgY29sb3I6ICM1ZmFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc0IHtcXG4gICAgY29sb3I6ICM1ZmFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc1IHtcXG4gICAgY29sb3I6ICM1ZmFmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc2IHtcXG4gICAgY29sb3I6ICM1ZmQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc3IHtcXG4gICAgY29sb3I6ICM1ZmQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkNzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc4IHtcXG4gICAgY29sb3I6ICM1ZmQ3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc5IHtcXG4gICAgY29sb3I6ICM1ZmQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgwIHtcXG4gICAgY29sb3I6ICM1ZmQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkN2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgxIHtcXG4gICAgY29sb3I6ICM1ZmQ3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgyIHtcXG4gICAgY29sb3I6ICM1ZmZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgzIHtcXG4gICAgY29sb3I6ICM1ZmZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg0IHtcXG4gICAgY29sb3I6ICM1ZmZmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg1IHtcXG4gICAgY29sb3I6ICM1ZmZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg2IHtcXG4gICAgY29sb3I6ICM1ZmZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg3IHtcXG4gICAgY29sb3I6ICM1ZmZmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg4IHtcXG4gICAgY29sb3I6ICM4NzAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg5IHtcXG4gICAgY29sb3I6ICM4NzAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMDVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkwIHtcXG4gICAgY29sb3I6ICM4NzAwODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkxIHtcXG4gICAgY29sb3I6ICM4NzAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkyIHtcXG4gICAgY29sb3I6ICM4NzAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMGQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkzIHtcXG4gICAgY29sb3I6ICM4NzAwZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk0IHtcXG4gICAgY29sb3I6ICM4NzVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk1IHtcXG4gICAgY29sb3I6ICM4NzVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk2IHtcXG4gICAgY29sb3I6ICM4NzVmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk3IHtcXG4gICAgY29sb3I6ICM4NzVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk4IHtcXG4gICAgY29sb3I6ICM4NzVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk5IHtcXG4gICAgY29sb3I6ICM4NzVmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwMCB7XFxuICAgIGNvbG9yOiAjODc4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwMCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4Nzg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTAxIHtcXG4gICAgY29sb3I6ICM4Nzg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTAxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMDIge1xcbiAgICBjb2xvcjogIzg3ODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMDIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwMyB7XFxuICAgIGNvbG9yOiAjODc4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwMyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4Nzg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTA0IHtcXG4gICAgY29sb3I6ICM4Nzg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTA0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMDUge1xcbiAgICBjb2xvcjogIzg3ODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMDUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwNiB7XFxuICAgIGNvbG9yOiAjODdhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwNiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2FmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTA3IHtcXG4gICAgY29sb3I6ICM4N2FmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTA3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3YWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMDgge1xcbiAgICBjb2xvcjogIzg3YWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMDgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwOSB7XFxuICAgIGNvbG9yOiAjODdhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwOSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2FmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTEwIHtcXG4gICAgY29sb3I6ICM4N2FmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTEwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3YWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMTEge1xcbiAgICBjb2xvcjogIzg3YWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExMiB7XFxuICAgIGNvbG9yOiAjODdkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTExMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2Q3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTEzIHtcXG4gICAgY29sb3I6ICM4N2Q3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTEzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMTQge1xcbiAgICBjb2xvcjogIzg3ZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExNSB7XFxuICAgIGNvbG9yOiAjODdkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTExNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2Q3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTE2IHtcXG4gICAgY29sb3I6ICM4N2Q3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTE2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMTcge1xcbiAgICBjb2xvcjogIzg3ZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExOCB7XFxuICAgIGNvbG9yOiAjODdmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTExOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2ZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTE5IHtcXG4gICAgY29sb3I6ICM4N2ZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTE5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjAge1xcbiAgICBjb2xvcjogIzg3ZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyMSB7XFxuICAgIGNvbG9yOiAjODdmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEyMSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2ZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTIyIHtcXG4gICAgY29sb3I6ICM4N2ZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTIyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjMge1xcbiAgICBjb2xvcjogIzg3ZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyNCB7XFxuICAgIGNvbG9yOiAjYWYwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEyNCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTI1IHtcXG4gICAgY29sb3I6ICNhZjAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTI1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmMDA1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjYge1xcbiAgICBjb2xvcjogI2FmMDA4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWYwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyNyB7XFxuICAgIGNvbG9yOiAjYWYwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEyNyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTI4IHtcXG4gICAgY29sb3I6ICNhZjAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTI4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmMDBkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjkge1xcbiAgICBjb2xvcjogI2FmMDBmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWYwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzMCB7XFxuICAgIGNvbG9yOiAjYWY1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzMCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTMxIHtcXG4gICAgY29sb3I6ICNhZjVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTMxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmNWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMzIge1xcbiAgICBjb2xvcjogI2FmNWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMzIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzMyB7XFxuICAgIGNvbG9yOiAjYWY1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzMyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTM0IHtcXG4gICAgY29sb3I6ICNhZjVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTM0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmNWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMzUge1xcbiAgICBjb2xvcjogI2FmNWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMzUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzNiB7XFxuICAgIGNvbG9yOiAjYWY4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzNiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTM3IHtcXG4gICAgY29sb3I6ICNhZjg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTM3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMzgge1xcbiAgICBjb2xvcjogI2FmODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMzgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzOSB7XFxuICAgIGNvbG9yOiAjYWY4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzOSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQwIHtcXG4gICAgY29sb3I6ICNhZjg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNDEge1xcbiAgICBjb2xvcjogI2FmODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNDEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0MiB7XFxuICAgIGNvbG9yOiAjYWZhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE0MiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQzIHtcXG4gICAgY29sb3I6ICNhZmFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmYWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNDQge1xcbiAgICBjb2xvcjogI2FmYWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNDQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0NSB7XFxuICAgIGNvbG9yOiAjYWZhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE0NSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQ2IHtcXG4gICAgY29sb3I6ICNhZmFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQ2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmYWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNDcge1xcbiAgICBjb2xvcjogI2FmYWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNDcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0OCB7XFxuICAgIGNvbG9yOiAjYWZkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE0OCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQ5IHtcXG4gICAgY29sb3I6ICNhZmQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQ5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTAge1xcbiAgICBjb2xvcjogI2FmZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1MSB7XFxuICAgIGNvbG9yOiAjYWZkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE1MSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTUyIHtcXG4gICAgY29sb3I6ICNhZmQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTUyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTMge1xcbiAgICBjb2xvcjogI2FmZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1NCB7XFxuICAgIGNvbG9yOiAjYWZmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE1NCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTU1IHtcXG4gICAgY29sb3I6ICNhZmZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTU1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTYge1xcbiAgICBjb2xvcjogI2FmZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1NyB7XFxuICAgIGNvbG9yOiAjYWZmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE1NyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTU4IHtcXG4gICAgY29sb3I6ICNhZmZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTU4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTkge1xcbiAgICBjb2xvcjogI2FmZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2MCB7XFxuICAgIGNvbG9yOiAjZDcwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2MCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTYxIHtcXG4gICAgY29sb3I6ICNkNzAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTYxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3MDA1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNjIge1xcbiAgICBjb2xvcjogI2Q3MDA4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDcwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2MyB7XFxuICAgIGNvbG9yOiAjZDcwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2MyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTY0IHtcXG4gICAgY29sb3I6ICNkNzAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTY0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3MDBkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNjUge1xcbiAgICBjb2xvcjogI2Q3MDBmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDcwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2NiB7XFxuICAgIGNvbG9yOiAjZDc1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2NiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTY3IHtcXG4gICAgY29sb3I6ICNkNzVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTY3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3NWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNjgge1xcbiAgICBjb2xvcjogI2Q3NWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2OSB7XFxuICAgIGNvbG9yOiAjZDc1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2OSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTcwIHtcXG4gICAgY29sb3I6ICNkNzVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTcwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3NWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNzEge1xcbiAgICBjb2xvcjogI2Q3NWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3MiB7XFxuICAgIGNvbG9yOiAjZDc4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE3MiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTczIHtcXG4gICAgY29sb3I6ICNkNzg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTczIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNzQge1xcbiAgICBjb2xvcjogI2Q3ODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3NSB7XFxuICAgIGNvbG9yOiAjZDc4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE3NSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTc2IHtcXG4gICAgY29sb3I6ICNkNzg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTc2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNzcge1xcbiAgICBjb2xvcjogI2Q3ODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3OCB7XFxuICAgIGNvbG9yOiAjZDdhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE3OCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2FmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTc5IHtcXG4gICAgY29sb3I6ICNkN2FmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTc5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3YWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODAge1xcbiAgICBjb2xvcjogI2Q3YWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4MSB7XFxuICAgIGNvbG9yOiAjZDdhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE4MSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2FmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTgyIHtcXG4gICAgY29sb3I6ICNkN2FmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTgyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3YWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODMge1xcbiAgICBjb2xvcjogI2Q3YWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4NCB7XFxuICAgIGNvbG9yOiAjZDdkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE4NCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2Q3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTg1IHtcXG4gICAgY29sb3I6ICNkN2Q3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTg1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODYge1xcbiAgICBjb2xvcjogI2Q3ZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4NyB7XFxuICAgIGNvbG9yOiAjZDdkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE4NyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2Q3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTg4IHtcXG4gICAgY29sb3I6ICNkN2Q3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTg4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODkge1xcbiAgICBjb2xvcjogI2Q3ZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5MCB7XFxuICAgIGNvbG9yOiAjZDdmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5MCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2ZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTkxIHtcXG4gICAgY29sb3I6ICNkN2ZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTkxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xOTIge1xcbiAgICBjb2xvcjogI2Q3ZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xOTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5MyB7XFxuICAgIGNvbG9yOiAjZDdmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5MyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2ZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTk0IHtcXG4gICAgY29sb3I6ICNkN2ZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTk0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xOTUge1xcbiAgICBjb2xvcjogI2Q3ZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xOTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5NiB7XFxuICAgIGNvbG9yOiAjZmYwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5NiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTk3IHtcXG4gICAgY29sb3I6ICNmZjAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTk3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDA1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xOTgge1xcbiAgICBjb2xvcjogI2ZmMDA4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xOTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5OSB7XFxuICAgIGNvbG9yOiAjZmYwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5OSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjAwIHtcXG4gICAgY29sb3I6ICNmZjAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjAwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDBkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMDEge1xcbiAgICBjb2xvcjogI2ZmMDBmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMDEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwMiB7XFxuICAgIGNvbG9yOiAjZmY1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIwMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjAzIHtcXG4gICAgY29sb3I6ICNmZjVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjAzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMDQge1xcbiAgICBjb2xvcjogI2ZmNWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMDQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwNSB7XFxuICAgIGNvbG9yOiAjZmY1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIwNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjA2IHtcXG4gICAgY29sb3I6ICNmZjVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjA2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMDcge1xcbiAgICBjb2xvcjogI2ZmNWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMDcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwOCB7XFxuICAgIGNvbG9yOiAjZmY4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIwOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjA5IHtcXG4gICAgY29sb3I6ICNmZjg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjA5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTAge1xcbiAgICBjb2xvcjogI2ZmODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxMSB7XFxuICAgIGNvbG9yOiAjZmY4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIxMSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjEyIHtcXG4gICAgY29sb3I6ICNmZjg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjEyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTMge1xcbiAgICBjb2xvcjogI2ZmODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxNCB7XFxuICAgIGNvbG9yOiAjZmZhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIxNCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjE1IHtcXG4gICAgY29sb3I6ICNmZmFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjE1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTYge1xcbiAgICBjb2xvcjogI2ZmYWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxNyB7XFxuICAgIGNvbG9yOiAjZmZhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIxNyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjE4IHtcXG4gICAgY29sb3I6ICNmZmFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjE4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTkge1xcbiAgICBjb2xvcjogI2ZmYWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyMCB7XFxuICAgIGNvbG9yOiAjZmZkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyMCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjIxIHtcXG4gICAgY29sb3I6ICNmZmQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjIxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMjIge1xcbiAgICBjb2xvcjogI2ZmZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyMyB7XFxuICAgIGNvbG9yOiAjZmZkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyMyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjI0IHtcXG4gICAgY29sb3I6ICNmZmQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjI0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMjUge1xcbiAgICBjb2xvcjogI2ZmZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyNiB7XFxuICAgIGNvbG9yOiAjZmZmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyNiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjI3IHtcXG4gICAgY29sb3I6ICNmZmZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjI3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMjgge1xcbiAgICBjb2xvcjogI2ZmZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyOSB7XFxuICAgIGNvbG9yOiAjZmZmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyOSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjMwIHtcXG4gICAgY29sb3I6ICNmZmZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjMwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMzEge1xcbiAgICBjb2xvcjogI2ZmZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzMiB7XFxuICAgIGNvbG9yOiAjMDgwODA4O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIzMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwODA4MDg7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjMzIHtcXG4gICAgY29sb3I6ICMxMjEyMTI7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjMzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMzQge1xcbiAgICBjb2xvcjogIzFjMWMxYztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWMxYzFjO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzNSB7XFxuICAgIGNvbG9yOiAjMjYyNjI2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIzNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNjI2MjY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjM2IHtcXG4gICAgY29sb3I6ICMzMDMwMzA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjM2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMwMzAzMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMzcge1xcbiAgICBjb2xvcjogIzNhM2EzYTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2EzYTNhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzOCB7XFxuICAgIGNvbG9yOiAjNDQ0NDQ0O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIzOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NDQ0NDQ7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjM5IHtcXG4gICAgY29sb3I6ICM0ZTRlNGU7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjM5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRlNGU0ZTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDAge1xcbiAgICBjb2xvcjogIzU4NTg1ODtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTg1ODU4O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0MSB7XFxuICAgIGNvbG9yOiAjNjI2MjYyO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI0MSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2MjYyNjI7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjQyIHtcXG4gICAgY29sb3I6ICM2YzZjNmM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzZjNmM2YztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDMge1xcbiAgICBjb2xvcjogIzc2NzY3NjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzY3Njc2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0NCB7XFxuICAgIGNvbG9yOiAjODA4MDgwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI0NCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MDgwODA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjQ1IHtcXG4gICAgY29sb3I6ICM4YThhOGE7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQ1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhhOGE4YTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDYge1xcbiAgICBjb2xvcjogIzk0OTQ5NDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTQ5NDk0O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0NyB7XFxuICAgIGNvbG9yOiAjOWU5ZTllO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI0NyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ZTllOWU7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjQ4IHtcXG4gICAgY29sb3I6ICNhOGE4YTg7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQ4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2E4YThhODtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDkge1xcbiAgICBjb2xvcjogI2IyYjJiMjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjJiMmIyO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI1MCB7XFxuICAgIGNvbG9yOiAjYmNiY2JjO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI1MCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNiY2JjYmM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjUxIHtcXG4gICAgY29sb3I6ICNjNmM2YzY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjUxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2M2YzZjNjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNTIge1xcbiAgICBjb2xvcjogI2QwZDBkMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBkMGQwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI1MyB7XFxuICAgIGNvbG9yOiAjZGFkYWRhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI1MyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkYWRhZGE7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjU0IHtcXG4gICAgY29sb3I6ICNlNGU0ZTQ7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjU0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U0ZTRlNDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNTUge1xcbiAgICBjb2xvcjogI2VlZWVlZTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34veHRlcm0vc3JjL3h0ZXJtLmNzc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udGVzdC1pbmZvIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLnRlc3QtaW5mbyA+ICoge1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcbi50ZXN0LWluZm86bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tcmlnaHQ6IDBweDtcXG59XFxuLnRlc3QtaW5mbzpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tbGVmdDogMHB4O1xcbn1cXG4udGVzdC1pbmZvID4gc2VsZWN0IHtcXG4gIGZsZXg6IDEgMTtcXG59XFxuLnRlc3QtcHJvZ3Jlc3Mge1xcbiAgYm9yZGVyLXJhZGl1czogMTNweDsgLyogKGhlaWdodCBvZiBpbm5lciBkaXYpIC8gMiArIHBhZGRpbmcgKi9cXG4gIHBhZGRpbmc6IDNweDtcXG4gIGZsZXg6IDMgMztcXG59XFxuLnRlc3QtcHJvZ3Jlc3MgPiBkaXYge1xcbiAgIGhlaWdodDogMjBweDtcXG4gICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgIHdpZHRoOiAwJTtcXG59XFxuXFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi8uL2xpYi9jb21wb25lbnRzL3Rlc3QtaW5mby52dWU/MWMzMzg5NDBcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQTBFQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7Q0FDQTtBQUVBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtDQUNBO0FBRUE7RUFDQSxrQkFBQTtDQUNBO0FBRUE7RUFDQSxpQkFBQTtDQUNBO0FBRUE7RUFDQSxVQUFBO0NBQ0E7QUFFQTtFQUNBLG9CQUFBLENBQUEseUNBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtDQUNBO0FBRUE7R0FDQSxhQUFBO0dBQ0Esb0JBQUE7R0FDQSxVQUFBO0NBQ0FcIixcImZpbGVcIjpcInRlc3QtaW5mby52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbjxkaXYgY2xhc3M9XFxcInRlc3QtaW5mb1xcXCI+XFxuICA8c2VsZWN0IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIHYtbW9kZWw9XFxcInNlbGVjdGVkVGVzdENvbmZpZ0luZGV4XFxcIj5cXG4gICAgPG9wdGlvbiB2LWZvcj1cXFwidGVzdENvbmZpZywgaW5kZXggaW4gdGVzdENvbmZpZ3NcXFwiIHYtYmluZDp2YWx1ZT1cXFwiaW5kZXhcXFwiPlxcbiAgICAgIHt7dGVzdENvbmZpZy5kaXNwbGF5TmFtZX19XFxuICAgIDwvb3B0aW9uPlxcbiAgPC9zZWxlY3Q+XFxuICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHQgZmEgZmEtcGxheVxcXCIgdi1vbjpjbGljaz1cXFwicnVuQ3VycmVudFRlc3RDb25maWdcXFwiIHJlZj1cXFwicnVuQnV0dG9uXFxcIj48L2J1dHRvbj5cXG4gIDxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBmYSBmYS10aW1lcyB0ZXh0LWVycm9yXFxcIiB2LW9uOmNsaWNrPVxcXCJydW5GYWlsZWRUZXN0c1xcXCIgcmVmPVxcXCJydW5CdXR0b25cXFwiIC8+XFxuICA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHQgZmEgZmEtc2VhcmNoXFxcIiB2LW9uOmNsaWNrPVxcXCJsb2FkVGVzdENvbmZpZ3NcXFwiIHJlZj1cXFwic2VhcmNoQnV0dG9uXFxcIj48L2J1dHRvbj5cXG5cXG4gIDxzcGFuPlJ1bnM6IHt7dGVzdFJlc3VsdHMudGVzdHNTdGFydGVkfX0ve3t0ZXN0UmVzdWx0cy50ZXN0c1RvdGFsfX08L3NwYW4+XFxuICA8c3Bhbj5FcnJvcnM6IHt7dGVzdFJlc3VsdHMudGVzdHNFcnJvcn19PC9zcGFuPlxcbiAgPHNwYW4+RmFpbHVyZXM6IHt7dGVzdFJlc3VsdHMudGVzdHNGYWlsZWR9fTwvc3Bhbj5cXG4gIDxkaXYgY2xhc3M9XFxcInRlc3QtcHJvZ3Jlc3NcXFwiID5cXG4gICAgPGRpdlxcbiAgICAgIHYtYmluZDpzdHlsZT1cXFwie3dpZHRoOiBwcm9ncmVzcyArICclJyB9XFxcIlxcbiAgICAgIHYtYmluZDpjbGFzcz1cXFwicHJvZ3Jlc3NDbGFzc1xcXCJcXG4gICAgLz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5pbXBvcnQge21hcFN0YXRlLCBtYXBBY3Rpb25zfSBmcm9tIFxcXCJ2dWV4XFxcIlxcblxcbm1vZHVsZS5leHBvcnRzID0ge1xcbiAgbmFtZTogXFxcIlRlc3RJbmZvXFxcIixcXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uKCkge1xcbiAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLiRyZWZzLnJ1bkJ1dHRvbix7XFxuICAgICAgdGl0bGU6IFxcXCJSdW4gVGVzdCBDb25maWdcXFwiLFxcbiAgICAgIHBsYWNlbWVudDogXFxcImJvdHRvbVxcXCJcXG4gICAgfSlcXG4gICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy4kcmVmcy5zZWFyY2hCdXR0b24se1xcbiAgICAgIHRpdGxlOiBcXFwiRGlzY292ZXIgVGVzdCBDb25maWdzXFxcIixcXG4gICAgICBwbGFjZW1lbnQ6IFxcXCJib3R0b21cXFwiXFxuICAgIH0pXFxuICB9LFxcbiAgbWV0aG9kczoge1xcbiAgICAuLi5tYXBBY3Rpb25zKFtcXG4gICAgICAnbG9hZFRlc3RDb25maWdzJyxcXG4gICAgICAncnVuQ3VycmVudFRlc3RDb25maWcnLFxcbiAgICAgICdydW5GYWlsZWRUZXN0cydcXG4gICAgXSlcXG4gIH0sXFxuICBjb21wdXRlZDoge1xcbiAgICAncHJvZ3Jlc3NDbGFzcyc6IGZ1bmN0aW9uICgpIHtcXG4gICAgICByZXR1cm4ge1xcbiAgICAgICAgJ3Byb2dyZXNzLXN1Y2Nlc3NmdWwnOiAhdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0Vycm9yICYmICF0aGlzLnRlc3RSZXN1bHRzLnRlc3RzRmFpbGVkLFxcbiAgICAgICAgJ3Byb2dyZXNzLWVycm9yJzogdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0Vycm9yIHx8IHRoaXMudGVzdFJlc3VsdHMudGVzdHNGYWlsZWRcXG4gICAgICB9XFxuICAgIH0sXFxuICAgIHByb2dyZXNzOiBmdW5jdGlvbigpIHtcXG4gICAgICBpZiAodGhpcy50ZXN0UmVzdWx0cy50ZXN0c1RvdGFsID09IDApXFxuICAgICAgICByZXR1cm4gMFxcbiAgICAgIHJldHVybiAodGhpcy50ZXN0UmVzdWx0cy50ZXN0c0ZpbmlzaGVkIC8gdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1RvdGFsKSoxMDBcXG4gICAgfSxcXG4gICAgJ3NlbGVjdGVkVGVzdENvbmZpZ0luZGV4Jzoge1xcbiAgICAgIGdldCgpIHtcXG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5zZWxlY3RlZFRlc3RDb25maWdJbmRleFxcbiAgICAgIH0sXFxuICAgICAgc2V0KHZhbHVlKSB7XFxuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NlbGVjdFRlc3RDb25maWdCeUluZGV4Jyx2YWx1ZSlcXG4gICAgICB9XFxuICAgIH0sXFxuICAgIC4uLm1hcFN0YXRlKFtcXG4gICAgICAndGVzdENvbmZpZ3MnLFxcbiAgICAgICd0ZXN0UmVzdWx0cydcXG4gICAgXSlcXG4gIH1cXG59XFxuPC9zY3JpcHQ+XFxuXFxuPHN0eWxlPlxcbi50ZXN0LWluZm8ge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4udGVzdC1pbmZvID4gKiB7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuLnRlc3QtaW5mbzpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi1yaWdodDogMHB4O1xcbn1cXG5cXG4udGVzdC1pbmZvOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi1sZWZ0OiAwcHg7XFxufVxcblxcbi50ZXN0LWluZm8gPiBzZWxlY3Qge1xcbiAgZmxleDogMSAxO1xcbn1cXG5cXG4udGVzdC1wcm9ncmVzcyB7XFxuICBib3JkZXItcmFkaXVzOiAxM3B4OyAvKiAoaGVpZ2h0IG9mIGlubmVyIGRpdikgLyAyICsgcGFkZGluZyAqL1xcbiAgcGFkZGluZzogM3B4O1xcbiAgZmxleDogMyAzO1xcbn1cXG5cXG4udGVzdC1wcm9ncmVzcyA+IGRpdiB7XFxuICAgaGVpZ2h0OiAyMHB4O1xcbiAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgd2lkdGg6IDAlO1xcbn1cXG5cXG48L3N0eWxlPlxcblwiXSxcInNvdXJjZVJvb3RcIjpcIndlYnBhY2s6Ly9cIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMTA3YzlkN2QhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi50ZXN0LXJ1bm5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnRlc3QtcnVubmVyIC50ZXN0LXJ1bm5lci1yb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcbi50ZXN0LXJ1bm5lci1yb3c6bGFzdC1jaGlsZCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvLi9saWIvY29tcG9uZW50cy90ZXN0LXJ1bm5lci52dWU/NzdkN2MyMmJcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQStEQTtFQUNBLGNBQUE7RUFDQSx1QkFBQTtDQUNBO0FBQ0E7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7Q0FDQTtBQUNBO0VBQ0EsYUFBQTtDQUNBXCIsXCJmaWxlXCI6XCJ0ZXN0LXJ1bm5lci52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiPHRlbXBsYXRlPlxcbjxkaXYgY2xhc3M9XFxcInRlc3QtcnVubmVyXFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcInRlc3QtcnVubmVyLXJvd1xcXCI+XFxuICAgIDxUZXN0SW5mbyAvPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJ0ZXN0LXJ1bm5lci1yb3dcXFwiPlxcbiAgICA8VGVzdFRyZWUgLz5cXG4gICAgPFRlc3RMb2cgLz5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjwvdGVtcGxhdGU+XFxuXFxuPHNjcmlwdD5cXG5pbXBvcnQge21hcFN0YXRlLCBtYXBBY3Rpb25zfSBmcm9tICd2dWV4J1xcblxcbmltcG9ydCBUZXN0SW5mbyBmcm9tICcuL3Rlc3QtaW5mby52dWUnXFxuaW1wb3J0IFRlc3RUcmVlIGZyb20gJy4vdGVzdC10cmVlLnZ1ZSdcXG5pbXBvcnQgVGVzdExvZyBmcm9tICcuL3Rlc3QtbG9nLnZ1ZSdcXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vc3RvcmUnXFxuXFxubW9kdWxlLmV4cG9ydHMgPXtcXG4gIG5hbWU6IFxcXCJUZXN0UnVubmVyXFxcIixcXG4gIHN0b3JlLFxcbiAgY29tcG9uZW50czoge1xcbiAgICBUZXN0SW5mbyxcXG4gICAgVGVzdFRyZWUsXFxuICAgIFRlc3RMb2dcXG4gIH0sXFxuICBkYXRhOiBmdW5jdGlvbiAoKSB7XFxuICAgIHJldHVybiB7XFxuICAgICAgJ2lzVmlzaWJsZSc6IGZhbHNlXFxuICAgIH1cXG4gIH0sXFxuICBtZXRob2RzOiB7XFxuICAgIHRvZ2dsZTogZnVuY3Rpb24oKSB7XFxuICAgICAgdGhpcy5pc1Zpc2libGUgPSAhdGhpcy5pc1Zpc2libGVcXG4gICAgfSxcXG4gICAgLi4ubWFwQWN0aW9ucyhbXFxuICAgICAgJ3J1bkFsbFRlc3RzJyxcXG4gICAgICAncnVuRmFpbGVkVGVzdHMnLFxcbiAgICBdKVxcbiAgfSxcXG4gIHdhdGNoOiB7XFxuICAgICdpc1Zpc2libGUnOiBmdW5jdGlvbigpIHtcXG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcXG4gICAgICAgIHRoaXMucGFuZWwuc2hvdygpXFxuICAgICAgfSBlbHNlIHtcXG4gICAgICAgIHRoaXMucGFuZWwuaGlkZSgpXFxuICAgICAgfVxcbiAgICB9XFxuICB9LFxcbiAgY3JlYXRlZDogZnVuY3Rpb24gKCkge1xcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXFxuICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRCb3R0b21QYW5lbCh7XFxuICAgICAgaXRlbTogZWxlbWVudCxcXG4gICAgICB2aXNpYmxlOiB0aGlzLmlzVmlzaWJsZVxcbiAgICB9KVxcbiAgICB0aGlzLiRtb3VudChlbGVtZW50KVxcbiAgfVxcbn1cXG48L3NjcmlwdD5cXG5cXG48c3R5bGU+XFxuLnRlc3QtcnVubmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4udGVzdC1ydW5uZXIgLnRlc3QtcnVubmVyLXJvdyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuLnRlc3QtcnVubmVyLXJvdzpsYXN0LWNoaWxkIHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuPC9zdHlsZT5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJ3ZWJwYWNrOi8vXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTIwMzZkNTgyIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbGliL2NvbXBvbmVudHMvdGVzdC1ydW5uZXIudnVlXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi50ZXN0LWxvZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleDogMTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtaW4td2lkdGg6IDQwMHB4O1xcbiAgbWluLWhlaWdodDogMTAwcHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvLi9saWIvY29tcG9uZW50cy90ZXN0LWxvZy52dWU/ZmYxZmJlNjRcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQWtDQTtFQUNBLGNBQUE7RUFDQSxRQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0NBQ0FcIixcImZpbGVcIjpcInRlc3QtbG9nLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuPGRpdiBjbGFzcz1cXFwidGVzdC1sb2dcXFwiPlxcbiAgPGRpdiByZWY9XFxcInRlcm1pbmFsXFxcIiBzdHlsZT1cXFwid2lkdGg6MTAwJTtoZWlnaHQ6IDEwMCU7XFxcIj48L2Rpdj5cXG48L2Rpdj5cXG48L3RlbXBsYXRlPlxcblxcbjxzY3JpcHQ+XFxuaW1wb3J0ICd4dGVybS9zcmMveHRlcm0uY3NzJ1xcbmltcG9ydCBUZXJtIGZyb20gJ3h0ZXJtJ1xcbmltcG9ydCB7IG1hcFN0YXRlIH0gZnJvbSAndnVleCdcXG5cXG5tb2R1bGUuZXhwb3J0cyA9IHtcXG4gIG5hbWU6ICdUZXN0TG9nJyxcXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uKCkge1xcbiAgICBUZXJtLmxvYWRBZGRvbihcXFwiZml0XFxcIilcXG4gICAgdGhpcy50ZXJtID0gbmV3IFRlcm0oKVxcbiAgICB0aGlzLnRlcm0ub3Blbih0aGlzLiRyZWZzLnRlcm1pbmFsKVxcbiAgfSxcXG4gIGNvbXB1dGVkOiB7XFxuICAgIC4uLm1hcFN0YXRlKFtcXG4gICAgICAgICdzZWxlY3RlZFRlc3QnXFxuICAgICAgXSksXFxuICB9LFxcbiAgd2F0Y2g6IHtcXG4gICAgJ3NlbGVjdGVkVGVzdCc6IGZ1bmN0aW9uKCkge1xcbiAgICAgIHRoaXMudGVybS5maXQoKVxcbiAgICAgIHRoaXMudGVybS5jbGVhcigpXFxuICAgICAgdGhpcy50ZXJtLndyaXRlKHRoaXMuc2VsZWN0ZWRUZXN0LmxvZy5qb2luKHJlcXVpcmUoJ29zJykuRU9MKSlcXG4gICAgfVxcbiAgfVxcbn1cXG48L3NjcmlwdD5cXG5cXG48c3R5bGU+XFxuLnRlc3QtbG9nIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4OiAxO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1pbi13aWR0aDogNDAwcHg7XFxuICBtaW4taGVpZ2h0OiAxMDBweDtcXG59XFxuPC9zdHlsZT5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJ3ZWJwYWNrOi8vXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTNkYzg4M2M1IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbGliL2NvbXBvbmVudHMvdGVzdC1sb2cudnVlXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi50ZXN0LXJ1bm5lciAudGVzdC10cmVlIHtcXG4gIHdpZHRoOiAzMDBweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi8uL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS52dWU/NjQ0OTcyZjBcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQXNEQTtFQUNBLGFBQUE7Q0FDQVwiLFwiZmlsZVwiOlwidGVzdC10cmVlLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuPGRpdiBjbGFzcz1cXFwidGVzdC10cmVlIHRyZWUtdmlldy1yZXNpemVyIHRvb2wtcGFuZWxcXFwiIHJlZj1cXFwiY29udGVudFxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJ0cmVlLXZpZXctc2Nyb2xsZXIgb3JkZXItLWNlbnRlclxcXCI+XFxuICAgIDxvbCBjbGFzcz1cXFwidHJlZS12aWV3IGZ1bGwtbWVudSBsaXN0LXRyZWUgaGFzLWNvbGxhcHNhYmxlLWNoaWxkcmVuIGZvY3VzYWJsZS1wYW5lbFxcXCI+XFxuICAgICAgPFRlc3RUcmVlTm9kZSB2LWZvcj1cXFwiaXRlbSBpbiB0ZXN0VHJlZS5jaGlsZEl0ZW1zXFxcIiB2LWJpbmQ6aXRlbT1cXFwiaXRlbVxcXCIvPlxcbiAgICA8L29sPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJ0cmVlLXZpZXctcmVzaXplLWhhbmRsZVxcXCIgcmVmPVxcXCJoYW5kbGVcXFwiIHYtb246bW91c2Vkb3duPVxcXCJzdGFydFJlc2l6ZVxcXCIgc3R5bGU9XFxcInJpZ2h0Oi01cHg7XFxcIj48L2Rpdj5cXG48L2Rpdj5cXG48L3RlbXBsYXRlPlxcbjxzY3JpcHQ+XFxuaW1wb3J0ICQgZnJvbSBcXFwianF1ZXJ5XFxcIlxcbmltcG9ydCB7bWFwU3RhdGV9IGZyb20gXFxcInZ1ZXhcXFwiXFxuXFxuaW1wb3J0IFRlc3RUcmVlTm9kZSBmcm9tIFxcXCIuL3Rlc3QtdHJlZS1ub2RlLnZ1ZVxcXCJcXG5cXG5tb2R1bGUuZXhwb3J0cyA9IHtcXG4gIG5hbWU6IFxcXCJUZXN0VHJlZVxcXCIsXFxuICBjb21wb25lbnRzOiB7XFxuICAgIFRlc3RUcmVlTm9kZVxcbiAgfSxcXG4gIGRhdGEoKSB7XFxuICAgIHJldHVybiB7XFxuICAgIH1cXG4gIH0sXFxuICBjb21wdXRlZDoge1xcbiAgICAuLi5tYXBTdGF0ZShbXFxuICAgICAgXFxcInRlc3RUcmVlXFxcIlxcbiAgICBdKVxcbiAgfSxcXG4gIG1ldGhvZHM6IHtcXG4gICAgc3RhcnRSZXNpemU6IGZ1bmN0aW9uIChldmVudCkge1xcbiAgICAgIHRoaXMuaXNSZXNpemluZyA9IHRydWU7XFxuICAgICAgdGhpcy54T2xkID0gZXZlbnQuc2NyZWVuWDtcXG4gICAgICAkKFxcXCJib2R5XFxcIikub24oXFxcIm1vdXNlbW92ZVxcXCIsdGhpcy5oYW5kbGVSZXNpemUpO1xcbiAgICAgICQoXFxcImJvZHlcXFwiKS5vbihcXFwibW91c2V1cFxcXCIsdGhpcy5zdG9wUmVzaXplKTtcXG4gICAgfSxcXG4gICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoZXZlbnQpIHtcXG4gICAgICB2YXIgb2JqID0gJCh0aGlzLiRyZWZzLmNvbnRlbnQpXFxuICAgICAgaWYgKHRoaXMuaXNSZXNpemluZykge1xcbiAgICAgICAgb2JqLndpZHRoKG9iai53aWR0aCgpIC0gKHRoaXMueE9sZCAtIGV2ZW50LnNjcmVlblgpKTtcXG4gICAgICAgIHRoaXMueE9sZCA9IGV2ZW50LnNjcmVlblg7XFxuICAgICAgfVxcbiAgICB9LFxcbiAgICBzdG9wUmVzaXplOiBmdW5jdGlvbiAoZXZlbnQpIHtcXG4gICAgICB0aGlzLmlzUmVzaXppbmcgPSBmYWxzZTtcXG4gICAgICAkKFxcXCJib2R5XFxcIikub2ZmKFxcXCJtb3NldXBcXFwiLHRoaXMuc3RvcFJlc2l6ZSlcXG4gICAgICAkKFxcXCJib2R5XFxcIikub2ZmKFxcXCJtb3VzZW1vdmVcXFwiLHRoaXMuaGFuZGxlUmVzaXplKVxcbiAgICB9XFxuICB9XFxufVxcbjwvc2NyaXB0PlxcblxcbjxzdHlsZT5cXG4udGVzdC1ydW5uZXIgLnRlc3QtdHJlZSB7XFxuICB3aWR0aDogMzAwcHg7XFxufVxcbjwvc3R5bGU+XFxuXCJdLFwic291cmNlUm9vdFwiOlwid2VicGFjazovL1wifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi01ODgwYjQ2ZCEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS52dWVcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi94dGVybS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3h0ZXJtLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4veHRlcm0uY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34veHRlcm0vc3JjL3h0ZXJtLmNzc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9fdnVlX2V4cG9ydHNfXywgX192dWVfb3B0aW9uc19fXG52YXIgX192dWVfc3R5bGVzX18gPSB7fVxuXG4vKiBzdHlsZXMgKi9cbnJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXI/aWQ9ZGF0YS12LTEwN2M5ZDdkIXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LWluZm8udnVlXCIpXG5cbi8qIHNjcmlwdCAqL1xuX192dWVfZXhwb3J0c19fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyIXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi90ZXN0LWluZm8udnVlXCIpXG5cbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIXZ1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP2lkPWRhdGEtdi0xMDdjOWQ3ZCF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi90ZXN0LWluZm8udnVlXCIpXG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18gfHwge31cbmlmIChcbiAgdHlwZW9mIF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0ID09PSBcIm9iamVjdFwiIHx8XG4gIHR5cGVvZiBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiXG4pIHtcbmlmIChPYmplY3Qua2V5cyhfX3Z1ZV9leHBvcnRzX18pLnNvbWUoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkgIT09IFwiX19lc01vZHVsZVwiIH0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuX192dWVfb3B0aW9uc19fID0gX192dWVfZXhwb3J0c19fID0gX192dWVfZXhwb3J0c19fLmRlZmF1bHRcbn1cbmlmICh0eXBlb2YgX192dWVfb3B0aW9uc19fID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgX192dWVfb3B0aW9uc19fID0gX192dWVfb3B0aW9uc19fLm9wdGlvbnNcbn1cbl9fdnVlX29wdGlvbnNfXy5fX2ZpbGUgPSBcIkM6XFxcXFVzZXJzXFxcXGNzZWl0elxcXFxnaXRodWJcXFxcdGVzdC1ydW5uZXJcXFxcbGliXFxcXGNvbXBvbmVudHNcXFxcdGVzdC1pbmZvLnZ1ZVwiXG5fX3Z1ZV9vcHRpb25zX18ucmVuZGVyID0gX192dWVfdGVtcGxhdGVfXy5yZW5kZXJcbl9fdnVlX29wdGlvbnNfXy5zdGF0aWNSZW5kZXJGbnMgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnN0YXRpY1JlbmRlckZuc1xuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMTA3YzlkN2RcIiwgX192dWVfb3B0aW9uc19fKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMTA3YzlkN2RcIiwgX192dWVfb3B0aW9uc19fKVxuICB9XG59KSgpfVxuaWYgKF9fdnVlX29wdGlvbnNfXy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSB0ZXN0LWluZm8udnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHNob3VsZCBiZSBkZWZpbmVkIGluIHBsYWluIGpzIGZpbGVzIHVzaW5nIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9fdnVlX2V4cG9ydHNfX1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX192dWVfZXhwb3J0c19fLCBfX3Z1ZV9vcHRpb25zX19cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IHt9XG5cbi8qIHN0eWxlcyAqL1xucmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCF2dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlcj9pZD1kYXRhLXYtM2RjODgzYzUhdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtbG9nLnZ1ZVwiKVxuXG4vKiBzY3JpcHQgKi9cbl9fdnVlX2V4cG9ydHNfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlciF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vdGVzdC1sb2cudnVlXCIpXG5cbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIXZ1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP2lkPWRhdGEtdi0zZGM4ODNjNSF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi90ZXN0LWxvZy52dWVcIilcbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXyB8fCB7fVxuaWYgKFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwib2JqZWN0XCIgfHxcbiAgdHlwZW9mIF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCJcbikge1xuaWYgKE9iamVjdC5rZXlzKF9fdnVlX2V4cG9ydHNfXykuc29tZShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleSAhPT0gXCJfX2VzTW9kdWxlXCIgfSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdFxufVxuaWYgKHR5cGVvZiBfX3Z1ZV9vcHRpb25zX18gPT09IFwiZnVuY3Rpb25cIikge1xuICBfX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9vcHRpb25zX18ub3B0aW9uc1xufVxuX192dWVfb3B0aW9uc19fLl9fZmlsZSA9IFwiQzpcXFxcVXNlcnNcXFxcY3NlaXR6XFxcXGdpdGh1YlxcXFx0ZXN0LXJ1bm5lclxcXFxsaWJcXFxcY29tcG9uZW50c1xcXFx0ZXN0LWxvZy52dWVcIlxuX192dWVfb3B0aW9uc19fLnJlbmRlciA9IF9fdnVlX3RlbXBsYXRlX18ucmVuZGVyXG5fX3Z1ZV9vcHRpb25zX18uc3RhdGljUmVuZGVyRm5zID0gX192dWVfdGVtcGxhdGVfXy5zdGF0aWNSZW5kZXJGbnNcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTNkYzg4M2M1XCIsIF9fdnVlX29wdGlvbnNfXylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTNkYzg4M2M1XCIsIF9fdnVlX29wdGlvbnNfXylcbiAgfVxufSkoKX1cbmlmIChfX3Z1ZV9vcHRpb25zX18uZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gdGVzdC1sb2cudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHNob3VsZCBiZSBkZWZpbmVkIGluIHBsYWluIGpzIGZpbGVzIHVzaW5nIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9fdnVlX2V4cG9ydHNfX1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvY29tcG9uZW50cy90ZXN0LWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfX3Z1ZV9leHBvcnRzX18sIF9fdnVlX29wdGlvbnNfX1xudmFyIF9fdnVlX3N0eWxlc19fID0ge31cblxuLyogc3R5bGVzICovXG5yZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIXZ1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyP2lkPWRhdGEtdi0yMDM2ZDU4MiF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1ydW5uZXIudnVlXCIpXG5cbi8qIHNjcmlwdCAqL1xuX192dWVfZXhwb3J0c19fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyIXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi90ZXN0LXJ1bm5lci52dWVcIilcblxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/aWQ9ZGF0YS12LTIwMzZkNTgyIXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Rlc3QtcnVubmVyLnZ1ZVwiKVxuX192dWVfb3B0aW9uc19fID0gX192dWVfZXhwb3J0c19fID0gX192dWVfZXhwb3J0c19fIHx8IHt9XG5pZiAoXG4gIHR5cGVvZiBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdCA9PT0gXCJvYmplY3RcIiB8fFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIlxuKSB7XG5pZiAoT2JqZWN0LmtleXMoX192dWVfZXhwb3J0c19fKS5zb21lKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5ICE9PSBcIl9fZXNNb2R1bGVcIiB9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0XG59XG5pZiAodHlwZW9mIF9fdnVlX29wdGlvbnNfXyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIF9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX29wdGlvbnNfXy5vcHRpb25zXG59XG5fX3Z1ZV9vcHRpb25zX18uX19maWxlID0gXCJDOlxcXFxVc2Vyc1xcXFxjc2VpdHpcXFxcZ2l0aHViXFxcXHRlc3QtcnVubmVyXFxcXGxpYlxcXFxjb21wb25lbnRzXFxcXHRlc3QtcnVubmVyLnZ1ZVwiXG5fX3Z1ZV9vcHRpb25zX18ucmVuZGVyID0gX192dWVfdGVtcGxhdGVfXy5yZW5kZXJcbl9fdnVlX29wdGlvbnNfXy5zdGF0aWNSZW5kZXJGbnMgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnN0YXRpY1JlbmRlckZuc1xuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjAzNmQ1ODJcIiwgX192dWVfb3B0aW9uc19fKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjAzNmQ1ODJcIiwgX192dWVfb3B0aW9uc19fKVxuICB9XG59KSgpfVxuaWYgKF9fdnVlX29wdGlvbnNfXy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSB0ZXN0LXJ1bm5lci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCBhbmQgc2hvdWxkIGJlIGRlZmluZWQgaW4gcGxhaW4ganMgZmlsZXMgdXNpbmcgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbm1vZHVsZS5leHBvcnRzID0gX192dWVfZXhwb3J0c19fXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9fdnVlX2V4cG9ydHNfXywgX192dWVfb3B0aW9uc19fXG52YXIgX192dWVfc3R5bGVzX18gPSB7fVxuXG4vKiBzY3JpcHQgKi9cbl9fdnVlX2V4cG9ydHNfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlciF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vdGVzdC10cmVlLW5vZGUudnVlXCIpXG5cbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIXZ1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP2lkPWRhdGEtdi02NWU0MjNkYyF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi90ZXN0LXRyZWUtbm9kZS52dWVcIilcbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXyB8fCB7fVxuaWYgKFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwib2JqZWN0XCIgfHxcbiAgdHlwZW9mIF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCJcbikge1xuaWYgKE9iamVjdC5rZXlzKF9fdnVlX2V4cG9ydHNfXykuc29tZShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleSAhPT0gXCJfX2VzTW9kdWxlXCIgfSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdFxufVxuaWYgKHR5cGVvZiBfX3Z1ZV9vcHRpb25zX18gPT09IFwiZnVuY3Rpb25cIikge1xuICBfX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9vcHRpb25zX18ub3B0aW9uc1xufVxuX192dWVfb3B0aW9uc19fLl9fZmlsZSA9IFwiQzpcXFxcVXNlcnNcXFxcY3NlaXR6XFxcXGdpdGh1YlxcXFx0ZXN0LXJ1bm5lclxcXFxsaWJcXFxcY29tcG9uZW50c1xcXFx0ZXN0LXRyZWUtbm9kZS52dWVcIlxuX192dWVfb3B0aW9uc19fLnJlbmRlciA9IF9fdnVlX3RlbXBsYXRlX18ucmVuZGVyXG5fX3Z1ZV9vcHRpb25zX18uc3RhdGljUmVuZGVyRm5zID0gX192dWVfdGVtcGxhdGVfXy5zdGF0aWNSZW5kZXJGbnNcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTY1ZTQyM2RjXCIsIF9fdnVlX29wdGlvbnNfXylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTY1ZTQyM2RjXCIsIF9fdnVlX29wdGlvbnNfXylcbiAgfVxufSkoKX1cbmlmIChfX3Z1ZV9vcHRpb25zX18uZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gdGVzdC10cmVlLW5vZGUudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHNob3VsZCBiZSBkZWZpbmVkIGluIHBsYWluIGpzIGZpbGVzIHVzaW5nIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9fdnVlX2V4cG9ydHNfX1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvY29tcG9uZW50cy90ZXN0LXRyZWUtbm9kZS52dWVcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfX3Z1ZV9leHBvcnRzX18sIF9fdnVlX29wdGlvbnNfX1xudmFyIF9fdnVlX3N0eWxlc19fID0ge31cblxuLyogc3R5bGVzICovXG5yZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIXZ1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyP2lkPWRhdGEtdi01ODgwYjQ2ZCF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC10cmVlLnZ1ZVwiKVxuXG4vKiBzY3JpcHQgKi9cbl9fdnVlX2V4cG9ydHNfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlciF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vdGVzdC10cmVlLnZ1ZVwiKVxuXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISF2dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtNTg4MGI0NmQhdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdGVzdC10cmVlLnZ1ZVwiKVxuX192dWVfb3B0aW9uc19fID0gX192dWVfZXhwb3J0c19fID0gX192dWVfZXhwb3J0c19fIHx8IHt9XG5pZiAoXG4gIHR5cGVvZiBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdCA9PT0gXCJvYmplY3RcIiB8fFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIlxuKSB7XG5pZiAoT2JqZWN0LmtleXMoX192dWVfZXhwb3J0c19fKS5zb21lKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5ICE9PSBcIl9fZXNNb2R1bGVcIiB9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0XG59XG5pZiAodHlwZW9mIF9fdnVlX29wdGlvbnNfXyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIF9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX29wdGlvbnNfXy5vcHRpb25zXG59XG5fX3Z1ZV9vcHRpb25zX18uX19maWxlID0gXCJDOlxcXFxVc2Vyc1xcXFxjc2VpdHpcXFxcZ2l0aHViXFxcXHRlc3QtcnVubmVyXFxcXGxpYlxcXFxjb21wb25lbnRzXFxcXHRlc3QtdHJlZS52dWVcIlxuX192dWVfb3B0aW9uc19fLnJlbmRlciA9IF9fdnVlX3RlbXBsYXRlX18ucmVuZGVyXG5fX3Z1ZV9vcHRpb25zX18uc3RhdGljUmVuZGVyRm5zID0gX192dWVfdGVtcGxhdGVfXy5zdGF0aWNSZW5kZXJGbnNcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTU4ODBiNDZkXCIsIF9fdnVlX29wdGlvbnNfXylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTU4ODBiNDZkXCIsIF9fdnVlX29wdGlvbnNfXylcbiAgfVxufSkoKX1cbmlmIChfX3Z1ZV9vcHRpb25zX18uZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gdGVzdC10cmVlLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIGFuZCBzaG91bGQgYmUgZGVmaW5lZCBpbiBwbGFpbiBqcyBmaWxlcyB1c2luZyByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxubW9kdWxlLmV4cG9ydHMgPSBfX3Z1ZV9leHBvcnRzX19cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDtcbiAgcmV0dXJuIF9oKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGVzdC1pbmZvXCJcbiAgfSwgW19oKCdzZWxlY3QnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgdmFsdWU6IChfdm0uc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXgpLFxuICAgICAgZXhwcmVzc2lvbjogXCJzZWxlY3RlZFRlc3RDb25maWdJbmRleFwiXG4gICAgfV0sXG4gICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgb246IHtcbiAgICAgIFwiY2hhbmdlXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0uc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXggPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoJGV2ZW50LnRhcmdldC5vcHRpb25zLCBmdW5jdGlvbihvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uc2VsZWN0ZWRcbiAgICAgICAgfSkubWFwKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICB2YXIgdmFsID0gXCJfdmFsdWVcIiBpbiBvID8gby5fdmFsdWUgOiBvLnZhbHVlO1xuICAgICAgICAgIHJldHVybiB2YWxcbiAgICAgICAgfSlbMF1cbiAgICAgIH1cbiAgICB9XG4gIH0sIFtfdm0uX2woKF92bS50ZXN0Q29uZmlncyksIGZ1bmN0aW9uKHRlc3RDb25maWcsIGluZGV4KSB7XG4gICAgcmV0dXJuIF9oKCdvcHRpb24nLCB7XG4gICAgICBkb21Qcm9wczoge1xuICAgICAgICBcInZhbHVlXCI6IGluZGV4XG4gICAgICB9XG4gICAgfSwgW1wiXFxuICAgICAgXCIgKyBfdm0uX3ModGVzdENvbmZpZy5kaXNwbGF5TmFtZSkgKyBcIlxcbiAgICBcIl0pXG4gIH0pXSksIFwiIFwiLCBfaCgnYnV0dG9uJywge1xuICAgIHJlZjogXCJydW5CdXR0b25cIixcbiAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLWRlZmF1bHQgZmEgZmEtcGxheVwiLFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5ydW5DdXJyZW50VGVzdENvbmZpZ1xuICAgIH1cbiAgfSksIFwiIFwiLCBfaCgnYnV0dG9uJywge1xuICAgIHJlZjogXCJydW5CdXR0b25cIixcbiAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLWRlZmF1bHQgZmEgZmEtdGltZXMgdGV4dC1lcnJvclwiLFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5ydW5GYWlsZWRUZXN0c1xuICAgIH1cbiAgfSksIFwiIFwiLCBfaCgnYnV0dG9uJywge1xuICAgIHJlZjogXCJzZWFyY2hCdXR0b25cIixcbiAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLWRlZmF1bHQgZmEgZmEtc2VhcmNoXCIsXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLmxvYWRUZXN0Q29uZmlnc1xuICAgIH1cbiAgfSksIFwiIFwiLCBfaCgnc3BhbicsIFtcIlJ1bnM6IFwiICsgX3ZtLl9zKF92bS50ZXN0UmVzdWx0cy50ZXN0c1N0YXJ0ZWQpICsgXCIvXCIgKyBfdm0uX3MoX3ZtLnRlc3RSZXN1bHRzLnRlc3RzVG90YWwpXSksIFwiIFwiLCBfaCgnc3BhbicsIFtcIkVycm9yczogXCIgKyBfdm0uX3MoX3ZtLnRlc3RSZXN1bHRzLnRlc3RzRXJyb3IpXSksIFwiIFwiLCBfaCgnc3BhbicsIFtcIkZhaWx1cmVzOiBcIiArIF92bS5fcyhfdm0udGVzdFJlc3VsdHMudGVzdHNGYWlsZWQpXSksIFwiIFwiLCBfaCgnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRlc3QtcHJvZ3Jlc3NcIlxuICB9LCBbX2goJ2RpdicsIHtcbiAgICBjbGFzczogX3ZtLnByb2dyZXNzQ2xhc3MsXG4gICAgc3R5bGU6ICh7XG4gICAgICB3aWR0aDogX3ZtLnByb2dyZXNzICsgJyUnXG4gICAgfSlcbiAgfSldKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTEwN2M5ZDdkXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyLmpzP2lkPWRhdGEtdi0xMDdjOWQ3ZCEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbGliL2NvbXBvbmVudHMvdGVzdC1pbmZvLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDtcbiAgcmV0dXJuIF9oKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGVzdC1ydW5uZXJcIlxuICB9LCBbX2goJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXN0LXJ1bm5lci1yb3dcIlxuICB9LCBbX2goJ1Rlc3RJbmZvJyldKSwgXCIgXCIsIF9oKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGVzdC1ydW5uZXItcm93XCJcbiAgfSwgW19oKCdUZXN0VHJlZScpLCBcIiBcIiwgX2goJ1Rlc3RMb2cnKV0pXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMjAzNmQ1ODJcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIuanM/aWQ9ZGF0YS12LTIwMzZkNTgyIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LXJ1bm5lci52dWVcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7XG4gIHJldHVybiBfaCgnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRlc3QtbG9nXCJcbiAgfSwgW19oKCdkaXYnLCB7XG4gICAgcmVmOiBcInRlcm1pbmFsXCIsXG4gICAgc3RhdGljU3R5bGU6IHtcbiAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICBcImhlaWdodFwiOiBcIjEwMCVcIlxuICAgIH1cbiAgfSldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0zZGM4ODNjNVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtM2RjODgzYzUhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtbG9nLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDtcbiAgcmV0dXJuIF9oKCdkaXYnLCB7XG4gICAgcmVmOiBcImNvbnRlbnRcIixcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXN0LXRyZWUgdHJlZS12aWV3LXJlc2l6ZXIgdG9vbC1wYW5lbFwiXG4gIH0sIFtfaCgnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRyZWUtdmlldy1zY3JvbGxlciBvcmRlci0tY2VudGVyXCJcbiAgfSwgW19oKCdvbCcsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0cmVlLXZpZXcgZnVsbC1tZW51IGxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4gZm9jdXNhYmxlLXBhbmVsXCJcbiAgfSwgW192bS5fbCgoX3ZtLnRlc3RUcmVlLmNoaWxkSXRlbXMpLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuIF9oKCdUZXN0VHJlZU5vZGUnLCB7XG4gICAgICBhdHRyczoge1xuICAgICAgICBcIml0ZW1cIjogaXRlbVxuICAgICAgfVxuICAgIH0pXG4gIH0pXSldKSwgXCIgXCIsIF9oKCdkaXYnLCB7XG4gICAgcmVmOiBcImhhbmRsZVwiLFxuICAgIHN0YXRpY0NsYXNzOiBcInRyZWUtdmlldy1yZXNpemUtaGFuZGxlXCIsXG4gICAgc3RhdGljU3R5bGU6IHtcbiAgICAgIFwicmlnaHRcIjogXCItNXB4XCJcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcIm1vdXNlZG93blwiOiBfdm0uc3RhcnRSZXNpemVcbiAgICB9XG4gIH0pXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNTg4MGI0NmRcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIuanM/aWQ9ZGF0YS12LTU4ODBiNDZkIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LXRyZWUudnVlXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O1xuICByZXR1cm4gX2goJ2xpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImVudHJ5XCIsXG4gICAgY2xhc3M6IF92bS5jbGFzc09iamVjdCxcbiAgICBvbjoge1xuICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBfdm0ub25DbGljaygkZXZlbnQpXG4gICAgICB9LFxuICAgICAgXCJkYmxjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBfdm0ub25EYmxDbGljaygkZXZlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX2goJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJoZWFkZXIgbGlzdC1pdGVtXCIsXG4gICAgY2xhc3M6IHtcbiAgICAgICd0ZXN0LWZhaWxlZCc6IF92bS5pdGVtLmhhc0ZhaWxlZFxuICAgIH1cbiAgfSwgW19oKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcIm5hbWUgaWNvblwiLFxuICAgIGNsYXNzOiBfdm0uaWNvbkNsYXNzXG4gIH0pLCBcIiBcIiwgX2goJ3NwYW4nLCBbX3ZtLl9zKF92bS5pdGVtLm5hbWUpXSksIFwiIFwiLCAoX3ZtLml0ZW0uZHVyYXRpb24gPiAwLjApID8gX2goJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGVzdC10aW1lXCJcbiAgfSwgW1wiwqAoXCIgKyBfdm0uX3MoX3ZtLml0ZW0uZHVyYXRpb24udG9GaXhlZCgzKSkgKyBcInMpXCJdKSA6IF92bS5fZSgpXSksIFwiIFwiLCBfaCgnb2wnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiZW50cmllcyBsaXN0LXRyZWVcIlxuICB9LCBbX3ZtLl9sKChfdm0uaXRlbS5jaGlsZEl0ZW1zKSwgZnVuY3Rpb24oY2hpbGQpIHtcbiAgICByZXR1cm4gX2goJ1Rlc3RUcmVlTm9kZScsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwiaXRlbVwiOiBjaGlsZFxuICAgICAgfVxuICAgIH0pXG4gIH0pXSldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi02NWU0MjNkY1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtNjVlNDIzZGMhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS1ub2RlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0xMDdjOWQ3ZCEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1pbmZvLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMTA3YzlkN2QhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtaW5mby52dWVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0xMDdjOWQ3ZCEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1pbmZvLnZ1ZVwiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIhLi9+L2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMTA3YzlkN2QhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTIwMzZkNTgyIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LXJ1bm5lci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTIwMzZkNTgyIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LXJ1bm5lci52dWVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0yMDM2ZDU4MiEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1ydW5uZXIudnVlXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlciEuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0yMDM2ZDU4MiEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0zZGM4ODNjNSEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1sb2cudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0zZGM4ODNjNSEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1sb2cudnVlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtM2RjODgzYzUhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtbG9nLnZ1ZVwiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIhLi9+L2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtM2RjODgzYzUhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtNTg4MGI0NmQhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtdHJlZS52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTU4ODBiNDZkIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LXRyZWUudnVlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtNTg4MGI0NmQhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtdHJlZS52dWVcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyIS4vfi9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTU4ODBiNDZkIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqcXVlcnlcIlxuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianMteWFtbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpzLXlhbWxcIlxuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4dGVybVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInh0ZXJtXCJcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=