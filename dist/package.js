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
	exports.push([module.id, "\n.test-info {\n  padding: 10px;\n  padding-left: 20px;\n  padding-right: 20px;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  align-items: center;\n  width: 100%;\n}\n.test-info > * {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.test-info:last-child {\n  margin-right: 0px;\n}\n.test-info:first-child {\n  margin-left: 0px;\n}\n.test-info > select {\n  flex: 1 1;\n}\n.test-progress {\n  border-radius: 13px; /* (height of inner div) / 2 + padding */\n  padding: 3px;\n  flex: 3 3;\n}\n.test-progress > div {\n   height: 20px;\n   border-radius: 10px;\n   width: 0%;\n}\n\n", ""]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.test-runner {\n  display: flex;\n  flex-direction: column;\n}\n.test-runner .test-runner-row {\n  display: flex;\n  flex-direction: row;\n}\n.test-runner-row:last-child {\n  height: 100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.test-log {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-width: 400px;\n  min-height: 100px;\n}\n", ""]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.test-runner .test-tree {\n  width: 300px;\n}\n", ""]);
	
	// exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * xterm.js: xterm, in the browser\n * Copyright (c) 2014-2016, SourceLair Private Company (www.sourcelair.com (MIT License)\n * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)\n * https://github.com/chjj/term.js\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n *\n * Originally forked from (with the author's permission):\n *   Fabrice Bellard's javascript vt100 for jslinux:\n *   http://bellard.org/jslinux/\n *   Copyright (c) 2011 Fabrice Bellard\n *   The original design remains. The terminal itself\n *   has been extended to include xterm CSI codes, among\n *   other features.\n */\n\n/*\n *  Default style for xterm.js\n */\n\n.terminal {\n    background-color: #000;\n    color: #fff;\n    font-family: courier-new, courier, monospace;\n    font-feature-settings: \"liga\" 0;\n    position: relative;\n}\n\n.terminal.focus,\n.terminal:focus {\n    outline: none;\n}\n\n.terminal .xterm-helpers {\n    position: absolute;\n    top: 0;\n}\n\n.terminal .xterm-helper-textarea {\n    /*\n     * HACK: to fix IE's blinking cursor\n     * Move textarea out of the screen to the far left, so that the cursor is not visible.\n     */\n    position: absolute;\n    opacity: 0;\n    left: -9999em;\n    top: 0;\n    width: 0;\n    height: 0;\n    z-index: -10;\n    /** Prevent wrapping so the IME appears against the textarea at the correct position */\n    white-space: nowrap;\n    overflow: hidden;\n    resize: none;\n}\n\n.terminal .terminal-cursor {\n    background-color: #fff;\n    color: #000;\n}\n\n.terminal:not(.focus) .terminal-cursor {\n    outline: 1px solid #fff;\n    outline-offset: -1px;\n    background-color: transparent;\n}\n\n.terminal.focus .terminal-cursor.blinking {\n    animation: blink-cursor 1.2s infinite step-end;\n}\n\n@keyframes blink-cursor {\n    0% {\n        background-color: #fff;\n        color: #000;\n    }\n    50% {\n        background-color: transparent;\n        color: #FFF;\n    }\n}\n\n.terminal .composition-view {\n    background: #000;\n    color: #FFF;\n    display: none;\n    position: absolute;\n    white-space: nowrap;\n    z-index: 1;\n}\n\n.terminal .composition-view.active {\n    display: block;\n}\n\n.terminal .xterm-viewport {\n    /* On OS X this is required in order for the scroll bar to appear fully opaque */\n    background-color: #000;\n    overflow-y: scroll;\n}\n\n.terminal .xterm-rows {\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.terminal .xterm-rows > div {\n    /* Lines containing spans and text nodes ocassionally wrap despite being the same width (#327) */\n    white-space: nowrap;\n}\n\n.terminal .xterm-scroll-area {\n    visibility: hidden;\n}\n\n.terminal .xterm-char-measure-element {\n    display: inline-block;\n    visibility: hidden;\n    position: absolute;\n    left: -9999em;\n}\n\n/*\n *  Determine default colors for xterm.js\n */\n.terminal .xterm-bold {\n    font-weight: bold;\n}\n\n.terminal .xterm-underline {\n    text-decoration: underline;\n}\n\n.terminal .xterm-blink {\n    text-decoration: blink;\n}\n\n.terminal .xterm-hidden {\n    visibility: hidden;\n}\n\n.terminal .xterm-color-0 {\n    color: #2e3436;\n}\n\n.terminal .xterm-bg-color-0 {\n    background-color: #2e3436;\n}\n\n.terminal .xterm-color-1 {\n    color: #cc0000;\n}\n\n.terminal .xterm-bg-color-1 {\n    background-color: #cc0000;\n}\n\n.terminal .xterm-color-2 {\n    color: #4e9a06;\n}\n\n.terminal .xterm-bg-color-2 {\n    background-color: #4e9a06;\n}\n\n.terminal .xterm-color-3 {\n    color: #c4a000;\n}\n\n.terminal .xterm-bg-color-3 {\n    background-color: #c4a000;\n}\n\n.terminal .xterm-color-4 {\n    color: #3465a4;\n}\n\n.terminal .xterm-bg-color-4 {\n    background-color: #3465a4;\n}\n\n.terminal .xterm-color-5 {\n    color: #75507b;\n}\n\n.terminal .xterm-bg-color-5 {\n    background-color: #75507b;\n}\n\n.terminal .xterm-color-6 {\n    color: #06989a;\n}\n\n.terminal .xterm-bg-color-6 {\n    background-color: #06989a;\n}\n\n.terminal .xterm-color-7 {\n    color: #d3d7cf;\n}\n\n.terminal .xterm-bg-color-7 {\n    background-color: #d3d7cf;\n}\n\n.terminal .xterm-color-8 {\n    color: #555753;\n}\n\n.terminal .xterm-bg-color-8 {\n    background-color: #555753;\n}\n\n.terminal .xterm-color-9 {\n    color: #ef2929;\n}\n\n.terminal .xterm-bg-color-9 {\n    background-color: #ef2929;\n}\n\n.terminal .xterm-color-10 {\n    color: #8ae234;\n}\n\n.terminal .xterm-bg-color-10 {\n    background-color: #8ae234;\n}\n\n.terminal .xterm-color-11 {\n    color: #fce94f;\n}\n\n.terminal .xterm-bg-color-11 {\n    background-color: #fce94f;\n}\n\n.terminal .xterm-color-12 {\n    color: #729fcf;\n}\n\n.terminal .xterm-bg-color-12 {\n    background-color: #729fcf;\n}\n\n.terminal .xterm-color-13 {\n    color: #ad7fa8;\n}\n\n.terminal .xterm-bg-color-13 {\n    background-color: #ad7fa8;\n}\n\n.terminal .xterm-color-14 {\n    color: #34e2e2;\n}\n\n.terminal .xterm-bg-color-14 {\n    background-color: #34e2e2;\n}\n\n.terminal .xterm-color-15 {\n    color: #eeeeec;\n}\n\n.terminal .xterm-bg-color-15 {\n    background-color: #eeeeec;\n}\n\n.terminal .xterm-color-16 {\n    color: #000000;\n}\n\n.terminal .xterm-bg-color-16 {\n    background-color: #000000;\n}\n\n.terminal .xterm-color-17 {\n    color: #00005f;\n}\n\n.terminal .xterm-bg-color-17 {\n    background-color: #00005f;\n}\n\n.terminal .xterm-color-18 {\n    color: #000087;\n}\n\n.terminal .xterm-bg-color-18 {\n    background-color: #000087;\n}\n\n.terminal .xterm-color-19 {\n    color: #0000af;\n}\n\n.terminal .xterm-bg-color-19 {\n    background-color: #0000af;\n}\n\n.terminal .xterm-color-20 {\n    color: #0000d7;\n}\n\n.terminal .xterm-bg-color-20 {\n    background-color: #0000d7;\n}\n\n.terminal .xterm-color-21 {\n    color: #0000ff;\n}\n\n.terminal .xterm-bg-color-21 {\n    background-color: #0000ff;\n}\n\n.terminal .xterm-color-22 {\n    color: #005f00;\n}\n\n.terminal .xterm-bg-color-22 {\n    background-color: #005f00;\n}\n\n.terminal .xterm-color-23 {\n    color: #005f5f;\n}\n\n.terminal .xterm-bg-color-23 {\n    background-color: #005f5f;\n}\n\n.terminal .xterm-color-24 {\n    color: #005f87;\n}\n\n.terminal .xterm-bg-color-24 {\n    background-color: #005f87;\n}\n\n.terminal .xterm-color-25 {\n    color: #005faf;\n}\n\n.terminal .xterm-bg-color-25 {\n    background-color: #005faf;\n}\n\n.terminal .xterm-color-26 {\n    color: #005fd7;\n}\n\n.terminal .xterm-bg-color-26 {\n    background-color: #005fd7;\n}\n\n.terminal .xterm-color-27 {\n    color: #005fff;\n}\n\n.terminal .xterm-bg-color-27 {\n    background-color: #005fff;\n}\n\n.terminal .xterm-color-28 {\n    color: #008700;\n}\n\n.terminal .xterm-bg-color-28 {\n    background-color: #008700;\n}\n\n.terminal .xterm-color-29 {\n    color: #00875f;\n}\n\n.terminal .xterm-bg-color-29 {\n    background-color: #00875f;\n}\n\n.terminal .xterm-color-30 {\n    color: #008787;\n}\n\n.terminal .xterm-bg-color-30 {\n    background-color: #008787;\n}\n\n.terminal .xterm-color-31 {\n    color: #0087af;\n}\n\n.terminal .xterm-bg-color-31 {\n    background-color: #0087af;\n}\n\n.terminal .xterm-color-32 {\n    color: #0087d7;\n}\n\n.terminal .xterm-bg-color-32 {\n    background-color: #0087d7;\n}\n\n.terminal .xterm-color-33 {\n    color: #0087ff;\n}\n\n.terminal .xterm-bg-color-33 {\n    background-color: #0087ff;\n}\n\n.terminal .xterm-color-34 {\n    color: #00af00;\n}\n\n.terminal .xterm-bg-color-34 {\n    background-color: #00af00;\n}\n\n.terminal .xterm-color-35 {\n    color: #00af5f;\n}\n\n.terminal .xterm-bg-color-35 {\n    background-color: #00af5f;\n}\n\n.terminal .xterm-color-36 {\n    color: #00af87;\n}\n\n.terminal .xterm-bg-color-36 {\n    background-color: #00af87;\n}\n\n.terminal .xterm-color-37 {\n    color: #00afaf;\n}\n\n.terminal .xterm-bg-color-37 {\n    background-color: #00afaf;\n}\n\n.terminal .xterm-color-38 {\n    color: #00afd7;\n}\n\n.terminal .xterm-bg-color-38 {\n    background-color: #00afd7;\n}\n\n.terminal .xterm-color-39 {\n    color: #00afff;\n}\n\n.terminal .xterm-bg-color-39 {\n    background-color: #00afff;\n}\n\n.terminal .xterm-color-40 {\n    color: #00d700;\n}\n\n.terminal .xterm-bg-color-40 {\n    background-color: #00d700;\n}\n\n.terminal .xterm-color-41 {\n    color: #00d75f;\n}\n\n.terminal .xterm-bg-color-41 {\n    background-color: #00d75f;\n}\n\n.terminal .xterm-color-42 {\n    color: #00d787;\n}\n\n.terminal .xterm-bg-color-42 {\n    background-color: #00d787;\n}\n\n.terminal .xterm-color-43 {\n    color: #00d7af;\n}\n\n.terminal .xterm-bg-color-43 {\n    background-color: #00d7af;\n}\n\n.terminal .xterm-color-44 {\n    color: #00d7d7;\n}\n\n.terminal .xterm-bg-color-44 {\n    background-color: #00d7d7;\n}\n\n.terminal .xterm-color-45 {\n    color: #00d7ff;\n}\n\n.terminal .xterm-bg-color-45 {\n    background-color: #00d7ff;\n}\n\n.terminal .xterm-color-46 {\n    color: #00ff00;\n}\n\n.terminal .xterm-bg-color-46 {\n    background-color: #00ff00;\n}\n\n.terminal .xterm-color-47 {\n    color: #00ff5f;\n}\n\n.terminal .xterm-bg-color-47 {\n    background-color: #00ff5f;\n}\n\n.terminal .xterm-color-48 {\n    color: #00ff87;\n}\n\n.terminal .xterm-bg-color-48 {\n    background-color: #00ff87;\n}\n\n.terminal .xterm-color-49 {\n    color: #00ffaf;\n}\n\n.terminal .xterm-bg-color-49 {\n    background-color: #00ffaf;\n}\n\n.terminal .xterm-color-50 {\n    color: #00ffd7;\n}\n\n.terminal .xterm-bg-color-50 {\n    background-color: #00ffd7;\n}\n\n.terminal .xterm-color-51 {\n    color: #00ffff;\n}\n\n.terminal .xterm-bg-color-51 {\n    background-color: #00ffff;\n}\n\n.terminal .xterm-color-52 {\n    color: #5f0000;\n}\n\n.terminal .xterm-bg-color-52 {\n    background-color: #5f0000;\n}\n\n.terminal .xterm-color-53 {\n    color: #5f005f;\n}\n\n.terminal .xterm-bg-color-53 {\n    background-color: #5f005f;\n}\n\n.terminal .xterm-color-54 {\n    color: #5f0087;\n}\n\n.terminal .xterm-bg-color-54 {\n    background-color: #5f0087;\n}\n\n.terminal .xterm-color-55 {\n    color: #5f00af;\n}\n\n.terminal .xterm-bg-color-55 {\n    background-color: #5f00af;\n}\n\n.terminal .xterm-color-56 {\n    color: #5f00d7;\n}\n\n.terminal .xterm-bg-color-56 {\n    background-color: #5f00d7;\n}\n\n.terminal .xterm-color-57 {\n    color: #5f00ff;\n}\n\n.terminal .xterm-bg-color-57 {\n    background-color: #5f00ff;\n}\n\n.terminal .xterm-color-58 {\n    color: #5f5f00;\n}\n\n.terminal .xterm-bg-color-58 {\n    background-color: #5f5f00;\n}\n\n.terminal .xterm-color-59 {\n    color: #5f5f5f;\n}\n\n.terminal .xterm-bg-color-59 {\n    background-color: #5f5f5f;\n}\n\n.terminal .xterm-color-60 {\n    color: #5f5f87;\n}\n\n.terminal .xterm-bg-color-60 {\n    background-color: #5f5f87;\n}\n\n.terminal .xterm-color-61 {\n    color: #5f5faf;\n}\n\n.terminal .xterm-bg-color-61 {\n    background-color: #5f5faf;\n}\n\n.terminal .xterm-color-62 {\n    color: #5f5fd7;\n}\n\n.terminal .xterm-bg-color-62 {\n    background-color: #5f5fd7;\n}\n\n.terminal .xterm-color-63 {\n    color: #5f5fff;\n}\n\n.terminal .xterm-bg-color-63 {\n    background-color: #5f5fff;\n}\n\n.terminal .xterm-color-64 {\n    color: #5f8700;\n}\n\n.terminal .xterm-bg-color-64 {\n    background-color: #5f8700;\n}\n\n.terminal .xterm-color-65 {\n    color: #5f875f;\n}\n\n.terminal .xterm-bg-color-65 {\n    background-color: #5f875f;\n}\n\n.terminal .xterm-color-66 {\n    color: #5f8787;\n}\n\n.terminal .xterm-bg-color-66 {\n    background-color: #5f8787;\n}\n\n.terminal .xterm-color-67 {\n    color: #5f87af;\n}\n\n.terminal .xterm-bg-color-67 {\n    background-color: #5f87af;\n}\n\n.terminal .xterm-color-68 {\n    color: #5f87d7;\n}\n\n.terminal .xterm-bg-color-68 {\n    background-color: #5f87d7;\n}\n\n.terminal .xterm-color-69 {\n    color: #5f87ff;\n}\n\n.terminal .xterm-bg-color-69 {\n    background-color: #5f87ff;\n}\n\n.terminal .xterm-color-70 {\n    color: #5faf00;\n}\n\n.terminal .xterm-bg-color-70 {\n    background-color: #5faf00;\n}\n\n.terminal .xterm-color-71 {\n    color: #5faf5f;\n}\n\n.terminal .xterm-bg-color-71 {\n    background-color: #5faf5f;\n}\n\n.terminal .xterm-color-72 {\n    color: #5faf87;\n}\n\n.terminal .xterm-bg-color-72 {\n    background-color: #5faf87;\n}\n\n.terminal .xterm-color-73 {\n    color: #5fafaf;\n}\n\n.terminal .xterm-bg-color-73 {\n    background-color: #5fafaf;\n}\n\n.terminal .xterm-color-74 {\n    color: #5fafd7;\n}\n\n.terminal .xterm-bg-color-74 {\n    background-color: #5fafd7;\n}\n\n.terminal .xterm-color-75 {\n    color: #5fafff;\n}\n\n.terminal .xterm-bg-color-75 {\n    background-color: #5fafff;\n}\n\n.terminal .xterm-color-76 {\n    color: #5fd700;\n}\n\n.terminal .xterm-bg-color-76 {\n    background-color: #5fd700;\n}\n\n.terminal .xterm-color-77 {\n    color: #5fd75f;\n}\n\n.terminal .xterm-bg-color-77 {\n    background-color: #5fd75f;\n}\n\n.terminal .xterm-color-78 {\n    color: #5fd787;\n}\n\n.terminal .xterm-bg-color-78 {\n    background-color: #5fd787;\n}\n\n.terminal .xterm-color-79 {\n    color: #5fd7af;\n}\n\n.terminal .xterm-bg-color-79 {\n    background-color: #5fd7af;\n}\n\n.terminal .xterm-color-80 {\n    color: #5fd7d7;\n}\n\n.terminal .xterm-bg-color-80 {\n    background-color: #5fd7d7;\n}\n\n.terminal .xterm-color-81 {\n    color: #5fd7ff;\n}\n\n.terminal .xterm-bg-color-81 {\n    background-color: #5fd7ff;\n}\n\n.terminal .xterm-color-82 {\n    color: #5fff00;\n}\n\n.terminal .xterm-bg-color-82 {\n    background-color: #5fff00;\n}\n\n.terminal .xterm-color-83 {\n    color: #5fff5f;\n}\n\n.terminal .xterm-bg-color-83 {\n    background-color: #5fff5f;\n}\n\n.terminal .xterm-color-84 {\n    color: #5fff87;\n}\n\n.terminal .xterm-bg-color-84 {\n    background-color: #5fff87;\n}\n\n.terminal .xterm-color-85 {\n    color: #5fffaf;\n}\n\n.terminal .xterm-bg-color-85 {\n    background-color: #5fffaf;\n}\n\n.terminal .xterm-color-86 {\n    color: #5fffd7;\n}\n\n.terminal .xterm-bg-color-86 {\n    background-color: #5fffd7;\n}\n\n.terminal .xterm-color-87 {\n    color: #5fffff;\n}\n\n.terminal .xterm-bg-color-87 {\n    background-color: #5fffff;\n}\n\n.terminal .xterm-color-88 {\n    color: #870000;\n}\n\n.terminal .xterm-bg-color-88 {\n    background-color: #870000;\n}\n\n.terminal .xterm-color-89 {\n    color: #87005f;\n}\n\n.terminal .xterm-bg-color-89 {\n    background-color: #87005f;\n}\n\n.terminal .xterm-color-90 {\n    color: #870087;\n}\n\n.terminal .xterm-bg-color-90 {\n    background-color: #870087;\n}\n\n.terminal .xterm-color-91 {\n    color: #8700af;\n}\n\n.terminal .xterm-bg-color-91 {\n    background-color: #8700af;\n}\n\n.terminal .xterm-color-92 {\n    color: #8700d7;\n}\n\n.terminal .xterm-bg-color-92 {\n    background-color: #8700d7;\n}\n\n.terminal .xterm-color-93 {\n    color: #8700ff;\n}\n\n.terminal .xterm-bg-color-93 {\n    background-color: #8700ff;\n}\n\n.terminal .xterm-color-94 {\n    color: #875f00;\n}\n\n.terminal .xterm-bg-color-94 {\n    background-color: #875f00;\n}\n\n.terminal .xterm-color-95 {\n    color: #875f5f;\n}\n\n.terminal .xterm-bg-color-95 {\n    background-color: #875f5f;\n}\n\n.terminal .xterm-color-96 {\n    color: #875f87;\n}\n\n.terminal .xterm-bg-color-96 {\n    background-color: #875f87;\n}\n\n.terminal .xterm-color-97 {\n    color: #875faf;\n}\n\n.terminal .xterm-bg-color-97 {\n    background-color: #875faf;\n}\n\n.terminal .xterm-color-98 {\n    color: #875fd7;\n}\n\n.terminal .xterm-bg-color-98 {\n    background-color: #875fd7;\n}\n\n.terminal .xterm-color-99 {\n    color: #875fff;\n}\n\n.terminal .xterm-bg-color-99 {\n    background-color: #875fff;\n}\n\n.terminal .xterm-color-100 {\n    color: #878700;\n}\n\n.terminal .xterm-bg-color-100 {\n    background-color: #878700;\n}\n\n.terminal .xterm-color-101 {\n    color: #87875f;\n}\n\n.terminal .xterm-bg-color-101 {\n    background-color: #87875f;\n}\n\n.terminal .xterm-color-102 {\n    color: #878787;\n}\n\n.terminal .xterm-bg-color-102 {\n    background-color: #878787;\n}\n\n.terminal .xterm-color-103 {\n    color: #8787af;\n}\n\n.terminal .xterm-bg-color-103 {\n    background-color: #8787af;\n}\n\n.terminal .xterm-color-104 {\n    color: #8787d7;\n}\n\n.terminal .xterm-bg-color-104 {\n    background-color: #8787d7;\n}\n\n.terminal .xterm-color-105 {\n    color: #8787ff;\n}\n\n.terminal .xterm-bg-color-105 {\n    background-color: #8787ff;\n}\n\n.terminal .xterm-color-106 {\n    color: #87af00;\n}\n\n.terminal .xterm-bg-color-106 {\n    background-color: #87af00;\n}\n\n.terminal .xterm-color-107 {\n    color: #87af5f;\n}\n\n.terminal .xterm-bg-color-107 {\n    background-color: #87af5f;\n}\n\n.terminal .xterm-color-108 {\n    color: #87af87;\n}\n\n.terminal .xterm-bg-color-108 {\n    background-color: #87af87;\n}\n\n.terminal .xterm-color-109 {\n    color: #87afaf;\n}\n\n.terminal .xterm-bg-color-109 {\n    background-color: #87afaf;\n}\n\n.terminal .xterm-color-110 {\n    color: #87afd7;\n}\n\n.terminal .xterm-bg-color-110 {\n    background-color: #87afd7;\n}\n\n.terminal .xterm-color-111 {\n    color: #87afff;\n}\n\n.terminal .xterm-bg-color-111 {\n    background-color: #87afff;\n}\n\n.terminal .xterm-color-112 {\n    color: #87d700;\n}\n\n.terminal .xterm-bg-color-112 {\n    background-color: #87d700;\n}\n\n.terminal .xterm-color-113 {\n    color: #87d75f;\n}\n\n.terminal .xterm-bg-color-113 {\n    background-color: #87d75f;\n}\n\n.terminal .xterm-color-114 {\n    color: #87d787;\n}\n\n.terminal .xterm-bg-color-114 {\n    background-color: #87d787;\n}\n\n.terminal .xterm-color-115 {\n    color: #87d7af;\n}\n\n.terminal .xterm-bg-color-115 {\n    background-color: #87d7af;\n}\n\n.terminal .xterm-color-116 {\n    color: #87d7d7;\n}\n\n.terminal .xterm-bg-color-116 {\n    background-color: #87d7d7;\n}\n\n.terminal .xterm-color-117 {\n    color: #87d7ff;\n}\n\n.terminal .xterm-bg-color-117 {\n    background-color: #87d7ff;\n}\n\n.terminal .xterm-color-118 {\n    color: #87ff00;\n}\n\n.terminal .xterm-bg-color-118 {\n    background-color: #87ff00;\n}\n\n.terminal .xterm-color-119 {\n    color: #87ff5f;\n}\n\n.terminal .xterm-bg-color-119 {\n    background-color: #87ff5f;\n}\n\n.terminal .xterm-color-120 {\n    color: #87ff87;\n}\n\n.terminal .xterm-bg-color-120 {\n    background-color: #87ff87;\n}\n\n.terminal .xterm-color-121 {\n    color: #87ffaf;\n}\n\n.terminal .xterm-bg-color-121 {\n    background-color: #87ffaf;\n}\n\n.terminal .xterm-color-122 {\n    color: #87ffd7;\n}\n\n.terminal .xterm-bg-color-122 {\n    background-color: #87ffd7;\n}\n\n.terminal .xterm-color-123 {\n    color: #87ffff;\n}\n\n.terminal .xterm-bg-color-123 {\n    background-color: #87ffff;\n}\n\n.terminal .xterm-color-124 {\n    color: #af0000;\n}\n\n.terminal .xterm-bg-color-124 {\n    background-color: #af0000;\n}\n\n.terminal .xterm-color-125 {\n    color: #af005f;\n}\n\n.terminal .xterm-bg-color-125 {\n    background-color: #af005f;\n}\n\n.terminal .xterm-color-126 {\n    color: #af0087;\n}\n\n.terminal .xterm-bg-color-126 {\n    background-color: #af0087;\n}\n\n.terminal .xterm-color-127 {\n    color: #af00af;\n}\n\n.terminal .xterm-bg-color-127 {\n    background-color: #af00af;\n}\n\n.terminal .xterm-color-128 {\n    color: #af00d7;\n}\n\n.terminal .xterm-bg-color-128 {\n    background-color: #af00d7;\n}\n\n.terminal .xterm-color-129 {\n    color: #af00ff;\n}\n\n.terminal .xterm-bg-color-129 {\n    background-color: #af00ff;\n}\n\n.terminal .xterm-color-130 {\n    color: #af5f00;\n}\n\n.terminal .xterm-bg-color-130 {\n    background-color: #af5f00;\n}\n\n.terminal .xterm-color-131 {\n    color: #af5f5f;\n}\n\n.terminal .xterm-bg-color-131 {\n    background-color: #af5f5f;\n}\n\n.terminal .xterm-color-132 {\n    color: #af5f87;\n}\n\n.terminal .xterm-bg-color-132 {\n    background-color: #af5f87;\n}\n\n.terminal .xterm-color-133 {\n    color: #af5faf;\n}\n\n.terminal .xterm-bg-color-133 {\n    background-color: #af5faf;\n}\n\n.terminal .xterm-color-134 {\n    color: #af5fd7;\n}\n\n.terminal .xterm-bg-color-134 {\n    background-color: #af5fd7;\n}\n\n.terminal .xterm-color-135 {\n    color: #af5fff;\n}\n\n.terminal .xterm-bg-color-135 {\n    background-color: #af5fff;\n}\n\n.terminal .xterm-color-136 {\n    color: #af8700;\n}\n\n.terminal .xterm-bg-color-136 {\n    background-color: #af8700;\n}\n\n.terminal .xterm-color-137 {\n    color: #af875f;\n}\n\n.terminal .xterm-bg-color-137 {\n    background-color: #af875f;\n}\n\n.terminal .xterm-color-138 {\n    color: #af8787;\n}\n\n.terminal .xterm-bg-color-138 {\n    background-color: #af8787;\n}\n\n.terminal .xterm-color-139 {\n    color: #af87af;\n}\n\n.terminal .xterm-bg-color-139 {\n    background-color: #af87af;\n}\n\n.terminal .xterm-color-140 {\n    color: #af87d7;\n}\n\n.terminal .xterm-bg-color-140 {\n    background-color: #af87d7;\n}\n\n.terminal .xterm-color-141 {\n    color: #af87ff;\n}\n\n.terminal .xterm-bg-color-141 {\n    background-color: #af87ff;\n}\n\n.terminal .xterm-color-142 {\n    color: #afaf00;\n}\n\n.terminal .xterm-bg-color-142 {\n    background-color: #afaf00;\n}\n\n.terminal .xterm-color-143 {\n    color: #afaf5f;\n}\n\n.terminal .xterm-bg-color-143 {\n    background-color: #afaf5f;\n}\n\n.terminal .xterm-color-144 {\n    color: #afaf87;\n}\n\n.terminal .xterm-bg-color-144 {\n    background-color: #afaf87;\n}\n\n.terminal .xterm-color-145 {\n    color: #afafaf;\n}\n\n.terminal .xterm-bg-color-145 {\n    background-color: #afafaf;\n}\n\n.terminal .xterm-color-146 {\n    color: #afafd7;\n}\n\n.terminal .xterm-bg-color-146 {\n    background-color: #afafd7;\n}\n\n.terminal .xterm-color-147 {\n    color: #afafff;\n}\n\n.terminal .xterm-bg-color-147 {\n    background-color: #afafff;\n}\n\n.terminal .xterm-color-148 {\n    color: #afd700;\n}\n\n.terminal .xterm-bg-color-148 {\n    background-color: #afd700;\n}\n\n.terminal .xterm-color-149 {\n    color: #afd75f;\n}\n\n.terminal .xterm-bg-color-149 {\n    background-color: #afd75f;\n}\n\n.terminal .xterm-color-150 {\n    color: #afd787;\n}\n\n.terminal .xterm-bg-color-150 {\n    background-color: #afd787;\n}\n\n.terminal .xterm-color-151 {\n    color: #afd7af;\n}\n\n.terminal .xterm-bg-color-151 {\n    background-color: #afd7af;\n}\n\n.terminal .xterm-color-152 {\n    color: #afd7d7;\n}\n\n.terminal .xterm-bg-color-152 {\n    background-color: #afd7d7;\n}\n\n.terminal .xterm-color-153 {\n    color: #afd7ff;\n}\n\n.terminal .xterm-bg-color-153 {\n    background-color: #afd7ff;\n}\n\n.terminal .xterm-color-154 {\n    color: #afff00;\n}\n\n.terminal .xterm-bg-color-154 {\n    background-color: #afff00;\n}\n\n.terminal .xterm-color-155 {\n    color: #afff5f;\n}\n\n.terminal .xterm-bg-color-155 {\n    background-color: #afff5f;\n}\n\n.terminal .xterm-color-156 {\n    color: #afff87;\n}\n\n.terminal .xterm-bg-color-156 {\n    background-color: #afff87;\n}\n\n.terminal .xterm-color-157 {\n    color: #afffaf;\n}\n\n.terminal .xterm-bg-color-157 {\n    background-color: #afffaf;\n}\n\n.terminal .xterm-color-158 {\n    color: #afffd7;\n}\n\n.terminal .xterm-bg-color-158 {\n    background-color: #afffd7;\n}\n\n.terminal .xterm-color-159 {\n    color: #afffff;\n}\n\n.terminal .xterm-bg-color-159 {\n    background-color: #afffff;\n}\n\n.terminal .xterm-color-160 {\n    color: #d70000;\n}\n\n.terminal .xterm-bg-color-160 {\n    background-color: #d70000;\n}\n\n.terminal .xterm-color-161 {\n    color: #d7005f;\n}\n\n.terminal .xterm-bg-color-161 {\n    background-color: #d7005f;\n}\n\n.terminal .xterm-color-162 {\n    color: #d70087;\n}\n\n.terminal .xterm-bg-color-162 {\n    background-color: #d70087;\n}\n\n.terminal .xterm-color-163 {\n    color: #d700af;\n}\n\n.terminal .xterm-bg-color-163 {\n    background-color: #d700af;\n}\n\n.terminal .xterm-color-164 {\n    color: #d700d7;\n}\n\n.terminal .xterm-bg-color-164 {\n    background-color: #d700d7;\n}\n\n.terminal .xterm-color-165 {\n    color: #d700ff;\n}\n\n.terminal .xterm-bg-color-165 {\n    background-color: #d700ff;\n}\n\n.terminal .xterm-color-166 {\n    color: #d75f00;\n}\n\n.terminal .xterm-bg-color-166 {\n    background-color: #d75f00;\n}\n\n.terminal .xterm-color-167 {\n    color: #d75f5f;\n}\n\n.terminal .xterm-bg-color-167 {\n    background-color: #d75f5f;\n}\n\n.terminal .xterm-color-168 {\n    color: #d75f87;\n}\n\n.terminal .xterm-bg-color-168 {\n    background-color: #d75f87;\n}\n\n.terminal .xterm-color-169 {\n    color: #d75faf;\n}\n\n.terminal .xterm-bg-color-169 {\n    background-color: #d75faf;\n}\n\n.terminal .xterm-color-170 {\n    color: #d75fd7;\n}\n\n.terminal .xterm-bg-color-170 {\n    background-color: #d75fd7;\n}\n\n.terminal .xterm-color-171 {\n    color: #d75fff;\n}\n\n.terminal .xterm-bg-color-171 {\n    background-color: #d75fff;\n}\n\n.terminal .xterm-color-172 {\n    color: #d78700;\n}\n\n.terminal .xterm-bg-color-172 {\n    background-color: #d78700;\n}\n\n.terminal .xterm-color-173 {\n    color: #d7875f;\n}\n\n.terminal .xterm-bg-color-173 {\n    background-color: #d7875f;\n}\n\n.terminal .xterm-color-174 {\n    color: #d78787;\n}\n\n.terminal .xterm-bg-color-174 {\n    background-color: #d78787;\n}\n\n.terminal .xterm-color-175 {\n    color: #d787af;\n}\n\n.terminal .xterm-bg-color-175 {\n    background-color: #d787af;\n}\n\n.terminal .xterm-color-176 {\n    color: #d787d7;\n}\n\n.terminal .xterm-bg-color-176 {\n    background-color: #d787d7;\n}\n\n.terminal .xterm-color-177 {\n    color: #d787ff;\n}\n\n.terminal .xterm-bg-color-177 {\n    background-color: #d787ff;\n}\n\n.terminal .xterm-color-178 {\n    color: #d7af00;\n}\n\n.terminal .xterm-bg-color-178 {\n    background-color: #d7af00;\n}\n\n.terminal .xterm-color-179 {\n    color: #d7af5f;\n}\n\n.terminal .xterm-bg-color-179 {\n    background-color: #d7af5f;\n}\n\n.terminal .xterm-color-180 {\n    color: #d7af87;\n}\n\n.terminal .xterm-bg-color-180 {\n    background-color: #d7af87;\n}\n\n.terminal .xterm-color-181 {\n    color: #d7afaf;\n}\n\n.terminal .xterm-bg-color-181 {\n    background-color: #d7afaf;\n}\n\n.terminal .xterm-color-182 {\n    color: #d7afd7;\n}\n\n.terminal .xterm-bg-color-182 {\n    background-color: #d7afd7;\n}\n\n.terminal .xterm-color-183 {\n    color: #d7afff;\n}\n\n.terminal .xterm-bg-color-183 {\n    background-color: #d7afff;\n}\n\n.terminal .xterm-color-184 {\n    color: #d7d700;\n}\n\n.terminal .xterm-bg-color-184 {\n    background-color: #d7d700;\n}\n\n.terminal .xterm-color-185 {\n    color: #d7d75f;\n}\n\n.terminal .xterm-bg-color-185 {\n    background-color: #d7d75f;\n}\n\n.terminal .xterm-color-186 {\n    color: #d7d787;\n}\n\n.terminal .xterm-bg-color-186 {\n    background-color: #d7d787;\n}\n\n.terminal .xterm-color-187 {\n    color: #d7d7af;\n}\n\n.terminal .xterm-bg-color-187 {\n    background-color: #d7d7af;\n}\n\n.terminal .xterm-color-188 {\n    color: #d7d7d7;\n}\n\n.terminal .xterm-bg-color-188 {\n    background-color: #d7d7d7;\n}\n\n.terminal .xterm-color-189 {\n    color: #d7d7ff;\n}\n\n.terminal .xterm-bg-color-189 {\n    background-color: #d7d7ff;\n}\n\n.terminal .xterm-color-190 {\n    color: #d7ff00;\n}\n\n.terminal .xterm-bg-color-190 {\n    background-color: #d7ff00;\n}\n\n.terminal .xterm-color-191 {\n    color: #d7ff5f;\n}\n\n.terminal .xterm-bg-color-191 {\n    background-color: #d7ff5f;\n}\n\n.terminal .xterm-color-192 {\n    color: #d7ff87;\n}\n\n.terminal .xterm-bg-color-192 {\n    background-color: #d7ff87;\n}\n\n.terminal .xterm-color-193 {\n    color: #d7ffaf;\n}\n\n.terminal .xterm-bg-color-193 {\n    background-color: #d7ffaf;\n}\n\n.terminal .xterm-color-194 {\n    color: #d7ffd7;\n}\n\n.terminal .xterm-bg-color-194 {\n    background-color: #d7ffd7;\n}\n\n.terminal .xterm-color-195 {\n    color: #d7ffff;\n}\n\n.terminal .xterm-bg-color-195 {\n    background-color: #d7ffff;\n}\n\n.terminal .xterm-color-196 {\n    color: #ff0000;\n}\n\n.terminal .xterm-bg-color-196 {\n    background-color: #ff0000;\n}\n\n.terminal .xterm-color-197 {\n    color: #ff005f;\n}\n\n.terminal .xterm-bg-color-197 {\n    background-color: #ff005f;\n}\n\n.terminal .xterm-color-198 {\n    color: #ff0087;\n}\n\n.terminal .xterm-bg-color-198 {\n    background-color: #ff0087;\n}\n\n.terminal .xterm-color-199 {\n    color: #ff00af;\n}\n\n.terminal .xterm-bg-color-199 {\n    background-color: #ff00af;\n}\n\n.terminal .xterm-color-200 {\n    color: #ff00d7;\n}\n\n.terminal .xterm-bg-color-200 {\n    background-color: #ff00d7;\n}\n\n.terminal .xterm-color-201 {\n    color: #ff00ff;\n}\n\n.terminal .xterm-bg-color-201 {\n    background-color: #ff00ff;\n}\n\n.terminal .xterm-color-202 {\n    color: #ff5f00;\n}\n\n.terminal .xterm-bg-color-202 {\n    background-color: #ff5f00;\n}\n\n.terminal .xterm-color-203 {\n    color: #ff5f5f;\n}\n\n.terminal .xterm-bg-color-203 {\n    background-color: #ff5f5f;\n}\n\n.terminal .xterm-color-204 {\n    color: #ff5f87;\n}\n\n.terminal .xterm-bg-color-204 {\n    background-color: #ff5f87;\n}\n\n.terminal .xterm-color-205 {\n    color: #ff5faf;\n}\n\n.terminal .xterm-bg-color-205 {\n    background-color: #ff5faf;\n}\n\n.terminal .xterm-color-206 {\n    color: #ff5fd7;\n}\n\n.terminal .xterm-bg-color-206 {\n    background-color: #ff5fd7;\n}\n\n.terminal .xterm-color-207 {\n    color: #ff5fff;\n}\n\n.terminal .xterm-bg-color-207 {\n    background-color: #ff5fff;\n}\n\n.terminal .xterm-color-208 {\n    color: #ff8700;\n}\n\n.terminal .xterm-bg-color-208 {\n    background-color: #ff8700;\n}\n\n.terminal .xterm-color-209 {\n    color: #ff875f;\n}\n\n.terminal .xterm-bg-color-209 {\n    background-color: #ff875f;\n}\n\n.terminal .xterm-color-210 {\n    color: #ff8787;\n}\n\n.terminal .xterm-bg-color-210 {\n    background-color: #ff8787;\n}\n\n.terminal .xterm-color-211 {\n    color: #ff87af;\n}\n\n.terminal .xterm-bg-color-211 {\n    background-color: #ff87af;\n}\n\n.terminal .xterm-color-212 {\n    color: #ff87d7;\n}\n\n.terminal .xterm-bg-color-212 {\n    background-color: #ff87d7;\n}\n\n.terminal .xterm-color-213 {\n    color: #ff87ff;\n}\n\n.terminal .xterm-bg-color-213 {\n    background-color: #ff87ff;\n}\n\n.terminal .xterm-color-214 {\n    color: #ffaf00;\n}\n\n.terminal .xterm-bg-color-214 {\n    background-color: #ffaf00;\n}\n\n.terminal .xterm-color-215 {\n    color: #ffaf5f;\n}\n\n.terminal .xterm-bg-color-215 {\n    background-color: #ffaf5f;\n}\n\n.terminal .xterm-color-216 {\n    color: #ffaf87;\n}\n\n.terminal .xterm-bg-color-216 {\n    background-color: #ffaf87;\n}\n\n.terminal .xterm-color-217 {\n    color: #ffafaf;\n}\n\n.terminal .xterm-bg-color-217 {\n    background-color: #ffafaf;\n}\n\n.terminal .xterm-color-218 {\n    color: #ffafd7;\n}\n\n.terminal .xterm-bg-color-218 {\n    background-color: #ffafd7;\n}\n\n.terminal .xterm-color-219 {\n    color: #ffafff;\n}\n\n.terminal .xterm-bg-color-219 {\n    background-color: #ffafff;\n}\n\n.terminal .xterm-color-220 {\n    color: #ffd700;\n}\n\n.terminal .xterm-bg-color-220 {\n    background-color: #ffd700;\n}\n\n.terminal .xterm-color-221 {\n    color: #ffd75f;\n}\n\n.terminal .xterm-bg-color-221 {\n    background-color: #ffd75f;\n}\n\n.terminal .xterm-color-222 {\n    color: #ffd787;\n}\n\n.terminal .xterm-bg-color-222 {\n    background-color: #ffd787;\n}\n\n.terminal .xterm-color-223 {\n    color: #ffd7af;\n}\n\n.terminal .xterm-bg-color-223 {\n    background-color: #ffd7af;\n}\n\n.terminal .xterm-color-224 {\n    color: #ffd7d7;\n}\n\n.terminal .xterm-bg-color-224 {\n    background-color: #ffd7d7;\n}\n\n.terminal .xterm-color-225 {\n    color: #ffd7ff;\n}\n\n.terminal .xterm-bg-color-225 {\n    background-color: #ffd7ff;\n}\n\n.terminal .xterm-color-226 {\n    color: #ffff00;\n}\n\n.terminal .xterm-bg-color-226 {\n    background-color: #ffff00;\n}\n\n.terminal .xterm-color-227 {\n    color: #ffff5f;\n}\n\n.terminal .xterm-bg-color-227 {\n    background-color: #ffff5f;\n}\n\n.terminal .xterm-color-228 {\n    color: #ffff87;\n}\n\n.terminal .xterm-bg-color-228 {\n    background-color: #ffff87;\n}\n\n.terminal .xterm-color-229 {\n    color: #ffffaf;\n}\n\n.terminal .xterm-bg-color-229 {\n    background-color: #ffffaf;\n}\n\n.terminal .xterm-color-230 {\n    color: #ffffd7;\n}\n\n.terminal .xterm-bg-color-230 {\n    background-color: #ffffd7;\n}\n\n.terminal .xterm-color-231 {\n    color: #ffffff;\n}\n\n.terminal .xterm-bg-color-231 {\n    background-color: #ffffff;\n}\n\n.terminal .xterm-color-232 {\n    color: #080808;\n}\n\n.terminal .xterm-bg-color-232 {\n    background-color: #080808;\n}\n\n.terminal .xterm-color-233 {\n    color: #121212;\n}\n\n.terminal .xterm-bg-color-233 {\n    background-color: #121212;\n}\n\n.terminal .xterm-color-234 {\n    color: #1c1c1c;\n}\n\n.terminal .xterm-bg-color-234 {\n    background-color: #1c1c1c;\n}\n\n.terminal .xterm-color-235 {\n    color: #262626;\n}\n\n.terminal .xterm-bg-color-235 {\n    background-color: #262626;\n}\n\n.terminal .xterm-color-236 {\n    color: #303030;\n}\n\n.terminal .xterm-bg-color-236 {\n    background-color: #303030;\n}\n\n.terminal .xterm-color-237 {\n    color: #3a3a3a;\n}\n\n.terminal .xterm-bg-color-237 {\n    background-color: #3a3a3a;\n}\n\n.terminal .xterm-color-238 {\n    color: #444444;\n}\n\n.terminal .xterm-bg-color-238 {\n    background-color: #444444;\n}\n\n.terminal .xterm-color-239 {\n    color: #4e4e4e;\n}\n\n.terminal .xterm-bg-color-239 {\n    background-color: #4e4e4e;\n}\n\n.terminal .xterm-color-240 {\n    color: #585858;\n}\n\n.terminal .xterm-bg-color-240 {\n    background-color: #585858;\n}\n\n.terminal .xterm-color-241 {\n    color: #626262;\n}\n\n.terminal .xterm-bg-color-241 {\n    background-color: #626262;\n}\n\n.terminal .xterm-color-242 {\n    color: #6c6c6c;\n}\n\n.terminal .xterm-bg-color-242 {\n    background-color: #6c6c6c;\n}\n\n.terminal .xterm-color-243 {\n    color: #767676;\n}\n\n.terminal .xterm-bg-color-243 {\n    background-color: #767676;\n}\n\n.terminal .xterm-color-244 {\n    color: #808080;\n}\n\n.terminal .xterm-bg-color-244 {\n    background-color: #808080;\n}\n\n.terminal .xterm-color-245 {\n    color: #8a8a8a;\n}\n\n.terminal .xterm-bg-color-245 {\n    background-color: #8a8a8a;\n}\n\n.terminal .xterm-color-246 {\n    color: #949494;\n}\n\n.terminal .xterm-bg-color-246 {\n    background-color: #949494;\n}\n\n.terminal .xterm-color-247 {\n    color: #9e9e9e;\n}\n\n.terminal .xterm-bg-color-247 {\n    background-color: #9e9e9e;\n}\n\n.terminal .xterm-color-248 {\n    color: #a8a8a8;\n}\n\n.terminal .xterm-bg-color-248 {\n    background-color: #a8a8a8;\n}\n\n.terminal .xterm-color-249 {\n    color: #b2b2b2;\n}\n\n.terminal .xterm-bg-color-249 {\n    background-color: #b2b2b2;\n}\n\n.terminal .xterm-color-250 {\n    color: #bcbcbc;\n}\n\n.terminal .xterm-bg-color-250 {\n    background-color: #bcbcbc;\n}\n\n.terminal .xterm-color-251 {\n    color: #c6c6c6;\n}\n\n.terminal .xterm-bg-color-251 {\n    background-color: #c6c6c6;\n}\n\n.terminal .xterm-color-252 {\n    color: #d0d0d0;\n}\n\n.terminal .xterm-bg-color-252 {\n    background-color: #d0d0d0;\n}\n\n.terminal .xterm-color-253 {\n    color: #dadada;\n}\n\n.terminal .xterm-bg-color-253 {\n    background-color: #dadada;\n}\n\n.terminal .xterm-color-254 {\n    color: #e4e4e4;\n}\n\n.terminal .xterm-bg-color-254 {\n    background-color: #e4e4e4;\n}\n\n.terminal .xterm-color-255 {\n    color: #eeeeee;\n}\n\n.terminal .xterm-bg-color-255 {\n    background-color: #eeeeee;\n}\n", ""]);
	
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
	var content = __webpack_require__(18);
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
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
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
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
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
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
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
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
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
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 26 */
/***/ function(module, exports) {

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

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "test-runner"
	  }, [_h('div', {
	    staticClass: "test-runner-row"
	  }, [_h('TestInfo')]), " ", _h('div', {
	    staticClass: "test-runner-row"
	  }, [_h('TestTree'), " ", _h('TestLog')])])
	},staticRenderFns: []}

/***/ },
/* 28 */
/***/ function(module, exports) {

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

/***/ },
/* 29 */
/***/ function(module, exports) {

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

/***/ },
/* 30 */
/***/ function(module, exports) {

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

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-107c9d7d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-info.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-107c9d7d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-info.vue");
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
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2036d582!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-runner.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2036d582!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-runner.vue");
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
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3dc883c5!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-log.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3dc883c5!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-log.vue");
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
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5880b46d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-tree.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5880b46d!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./test-tree.vue");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzVhYmZmOWM1ZmZmY2Q0YTQ3ZTkiLCJ3ZWJwYWNrOi8vLy4vbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ2dWV4XCIiLCJ3ZWJwYWNrOi8vLy4vfi92dWUtc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ2dWVcIiIsIndlYnBhY2s6Ly8vdGVzdC1pbmZvLnZ1ZSIsIndlYnBhY2s6Ly8vdGVzdC1sb2cudnVlIiwid2VicGFjazovLy90ZXN0LXJ1bm5lci52dWUiLCJ3ZWJwYWNrOi8vL3Rlc3QtdHJlZS1ub2RlLnZ1ZSIsIndlYnBhY2s6Ly8vdGVzdC10cmVlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9saWIvc3RvcmUvYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3N0b3JlL211dGF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3RvcmUvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1pbmZvLnZ1ZT9hNWE0Iiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZT8yNmIyIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtbG9nLnZ1ZT82NjgyIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS52dWU/NjhjZiIsIndlYnBhY2s6Ly8vLi9+L3h0ZXJtL3NyYy94dGVybS5jc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34veHRlcm0vc3JjL3h0ZXJtLmNzcz81NzEwIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtaW5mby52dWUiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1sb2cudnVlIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LXRyZWUtbm9kZS52dWUiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlP2VkYTYiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1ydW5uZXIudnVlPzI2NTkiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC1sb2cudnVlP2YyNDkiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLnZ1ZT82OTlmIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS1ub2RlLnZ1ZT80Y2UyIiwid2VicGFjazovLy8uL2xpYi9jb21wb25lbnRzL3Rlc3QtaW5mby52dWU/ZDgxNyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LXJ1bm5lci52dWU/YmFlNyIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LWxvZy52dWU/M2NkOSIsIndlYnBhY2s6Ly8vLi9saWIvY29tcG9uZW50cy90ZXN0LXRyZWUudnVlPzU3NjQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqcXVlcnlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqcy15YW1sXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwieHRlcm1cIiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidGVzdFJ1bm5lclZpZXciLCJhY3RpdmF0ZSIsInN0YXRlIiwiJHN0b3JlIiwiZGlzcGF0Y2giLCJpc1Zpc2libGUiLCJjb21taXQiLCJ0ZXN0VHJlZSIsInRlc3RSZXN1bHRzIiwic2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXgiLCJhdG9tIiwiY29tbWFuZHMiLCJhZGQiLCJ0b2dnbGUiLCJkZWFjdGl2YXRlIiwiJGRlc3Ryb3kiLCJzZXJpYWxpemUiLCIkZGF0YSIsImNvbnN1bWVTZXJ2aWNlIiwic2VydmljZSIsImtleSIsInJ1bm5lciIsImFjdGlvbnMiLCJsb2FkVGVzdENvbmZpZ3MiLCJjb250ZXh0IiwidGVzdENvbmZpZ3MiLCJwcm9qZWN0IiwiZ2V0UGF0aHMiLCJwcm9qZWN0UGF0aCIsImNvbmZpZ0ZpbGUiLCJwYXRoIiwiam9pbiIsInN0YXQiLCJmcyIsInN0YXRTeW5jIiwiZSIsImNvbmZpZ3MiLCJ5YW1sIiwic2FmZUxvYWQiLCJyZWFkRmlsZVN5bmMiLCJub3RpZmljYXRpb25zIiwiYWRkRXJyb3IiLCJkZXRhaWwiLCJjb25maWciLCJuYW1lIiwiaW5kZXhPZiIsImFkZFdhcm5pbmciLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIl9ydW5uZXIiLCJydW5uZXJzIiwib25UZXN0U3RhcnQiLCJ0ZXN0Iiwib25UZXN0RW5kIiwidGVzdFJlc3VsdCIsInB1c2giLCJydW5DdXJyZW50VGVzdENvbmZpZyIsInRlc3RDb25maWciLCJnZXR0ZXJzIiwic2VsZWN0ZWRUZXN0Q29uZmlnIiwiZ2V0VGVzdHMiLCJ0aGVuIiwidGVzdHMiLCJydW5BbGxUZXN0cyIsImVyciIsInJ1bkZhaWxlZFRlc3RzIiwiZmFpbGVkVGVzdHMiLCJoYXNGYWlsZWQiLCJydW5UZXN0cyIsImFwcGVuZFJ1bm5lciIsIm9wdGlvbnMiLCJ1c2UiLCJsZW5ndGgiLCJTdG9yZSIsIm11dGF0aW9ucyIsInNlbGVjdFRlc3RDb25maWdCeUluZGV4IiwiaW5kZXgiLCJzZXRUZXN0VHJlZSIsInNldFNlbGVjdFRlc3QiLCJzZWxlY3RlZFRlc3QiLCJzZXRUZXN0UmVzdWx0cyIsImNsZWFyVGVzdFJlc3VsdHMiLCJ0ZXN0c1N0YXJ0ZWQiLCJ0ZXN0c0ZpbmlzaGVkIiwidGVzdHNUb3RhbCIsInRlc3RzUGFzc2VkIiwidGVzdHNGYWlsZWQiLCJ0ZXN0c0Vycm9yIiwiZHVyYXRpb24iLCJzZXRUZXN0Q29uZmlncyIsInNldFRlc3RzIiwiY2hpbGRJdGVtcyIsImVsZW1lbnQiLCJwYXJlbnQiLCJwYWNrYWdlTmFtZXMiLCJBcnJheSIsInBrZ05hbWUiLCJpc0NvbnRhaW5lciIsImlzUGFja2FnZSIsImNsYXNzbmFtZSIsImlzQ2xhc3MiLCJ0ZXN0bmFtZSIsImlzVGVzdCIsImZpbGVuYW1lIiwibGluZSIsImNvbHVtbiIsInRlc3RJZGVudGlmaWVyIiwiaGFzUnVuIiwiaGFzRXJyb3IiLCJsb2ciLCJ0cmFjZWJhY2siLCJhZGRUZXN0UmVzdWx0IiwicmVzdWx0IiwiZW50cnkiLCJpbmNyZW1lbnRUZXN0c1N0YXJ0ZWQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7OztBQUVBQSxRQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLG1CQUFnQixJQUREOztBQUdmQyxXQUhlLG9CQUdOQyxLQUhNLEVBR0M7QUFBQTs7QUFDZCxVQUFLRixjQUFMLEdBQXNCLHVDQUF0QjtBQUNBLFVBQUtBLGNBQUwsQ0FBb0JHLE1BQXBCLENBQTJCQyxRQUEzQixDQUFvQyxpQkFBcEM7QUFDQSxVQUFLSixjQUFMLENBQW9CSyxTQUFwQixHQUFnQ0gsTUFBTUcsU0FBdEM7QUFDQSxVQUFLTCxjQUFMLENBQW9CRyxNQUFwQixDQUEyQkcsTUFBM0IsQ0FBa0MsYUFBbEMsRUFBaURKLE1BQU1LLFFBQXZEO0FBQ0EsVUFBS1AsY0FBTCxDQUFvQkcs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LEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRywrQkFBK0IscUJBQXFCLEdBQUcsa0NBQWtDLGdDQUFnQyxHQUFHLCtCQUErQixxQkFBcUIsR0FBRyxrQ0FBa0MsZ0NBQWdDLEdBQUcsK0JBQStCLHFCQUFxQixHQUFHLGtDQUFrQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRyxnQ0FBZ0MscUJBQXFCLEdBQUcsbUNBQW1DLGdDQUFnQyxHQUFHLGdDQUFnQyxxQkFBcUIsR0FBRyxtQ0FBbUMsZ0NBQWdDLEdBQUcsZ0NBQWdDLHFCQUFxQixHQUFHLG1DQUFtQyxnQ0FBZ0MsR0FBRzs7QUFFbjNtQzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFD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Ozs7Ozs7QUNBQSxtQyIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzVhYmZmOWM1ZmZmY2Q0YTQ3ZTkiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIlxuaW1wb3J0IFRlc3RSdW5uZXJWaWV3IGZyb20gXCIuL2NvbXBvbmVudHMvdGVzdC1ydW5uZXIudnVlXCJcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlc3RSdW5uZXJWaWV3OiBudWxsLFxuXG4gIGFjdGl2YXRlKHN0YXRlKSB7XG4gICAgdGhpcy50ZXN0UnVubmVyVmlldyA9IG5ldyBWdWUoVGVzdFJ1bm5lclZpZXcpXG4gICAgdGhpcy50ZXN0UnVubmVyVmlldy4kc3RvcmUuZGlzcGF0Y2goXCJsb2FkVGVzdENvbmZpZ3NcIilcbiAgICB0aGlzLnRlc3RSdW5uZXJWaWV3LmlzVmlzaWJsZSA9IHN0YXRlLmlzVmlzaWJsZVxuICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmNvbW1pdChcInNldFRlc3RUcmVlXCIsIHN0YXRlLnRlc3RUcmVlKVxuICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmNvbW1pdChcInNldFRlc3RSZXN1bHRzXCIsIHN0YXRlLnRlc3RSZXN1bHRzKVxuICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmNvbW1pdChcInNlbGVjdFRlc3RDb25maWdCeUluZGV4XCIsc3RhdGUuc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXgpXG5cbiAgICBhdG9tLmNvbW1hbmRzLmFkZChcImF0b20td29ya3NwYWNlXCIsIHtcbiAgICAgIFwidGVzdC1ydW5uZXI6dG9nZ2xlLXZpZXdcIjogKCkgPT4ge1xuICAgICAgICB0aGlzLnRlc3RSdW5uZXJWaWV3LnRvZ2dsZSgpXG4gICAgICB9LFxuICAgICAgXCJ0ZXN0LXJ1bm5lcjpydW4tY3VycmVudC10ZXN0LWNvbmZpZ1wiOiAoKSA9PiB7XG4gICAgICAgIHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLmRpc3BhdGNoKFwicnVuQWxsVGVzdHNcIilcbiAgICAgIH0sXG4gICAgICBcInRlc3QtcnVubmVyOnNlbGVjdC10ZXN0LWNvbmZpZ1wiOiAoKSA9PiB7XG5cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy50ZXN0UnVubmVyVmlldy4kZGVzdHJveSgpXG4gIH0sXG5cbiAgc2VyaWFsaXplKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc1Zpc2libGU6IHRoaXMudGVzdFJ1bm5lclZpZXcuJGRhdGEuaXNWaXNpYmxlLFxuICAgICAgdGVzdFJlc3VsdHM6IHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLnN0YXRlLnRlc3RSZXN1bHRzLFxuICAgICAgdGVzdFRyZWU6IHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLnN0YXRlLnRlc3RUcmVlLFxuICAgICAgc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXg6IHRoaXMudGVzdFJ1bm5lclZpZXcuJHN0b3JlLnN0YXRlLnNlbGVjdGVkVGVzdENvbmZpZ0luZGV4XG4gICAgfVxuICB9LFxuXG4gIGNvbnN1bWVTZXJ2aWNlKHNlcnZpY2UpIHtcbiAgICB0aGlzLnRlc3RSdW5uZXJWaWV3LiRzdG9yZS5kaXNwYXRjaChcImFwcGVuZFJ1bm5lclwiLCB7a2V5OiBzZXJ2aWNlLmtleSwgcnVubmVyOiBzZXJ2aWNlLnJ1bm5lcn0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9tYWluLmpzIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ2dWV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidnVleFwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIG1lbW87XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gbWVtbztcblx0XHR9O1xuXHR9LFxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XG5cdH0pLFxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcblx0fSksXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZVxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cdFx0fVxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG5cdFx0aWYobmV3T2JqKSB7XG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlcztcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdGlmIChtZWRpYSkge1xuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG5cdFx0Ly8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuXHRcdGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJztcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInZ1ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInZ1ZVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJ0ZXN0LWluZm9cIj5cbiAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHYtbW9kZWw9XCJzZWxlY3RlZFRlc3RDb25maWdJbmRleFwiPlxuICAgIDxvcHRpb24gdi1mb3I9XCJ0ZXN0Q29uZmlnLCBpbmRleCBpbiB0ZXN0Q29uZmlnc1wiIHYtYmluZDp2YWx1ZT1cImluZGV4XCI+XG4gICAgICB7e3Rlc3RDb25maWcuZGlzcGxheU5hbWV9fVxuICAgIDwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBmYSBmYS1wbGF5XCIgdi1vbjpjbGljaz1cInJ1bkN1cnJlbnRUZXN0Q29uZmlnXCIgcmVmPVwicnVuQnV0dG9uXCI+PC9idXR0b24+XG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZmEgZmEtdGltZXMgdGV4dC1lcnJvclwiIHYtb246Y2xpY2s9XCJydW5GYWlsZWRUZXN0c1wiIHJlZj1cInJ1bkJ1dHRvblwiIC8+XG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZmEgZmEtc2VhcmNoXCIgdi1vbjpjbGljaz1cImxvYWRUZXN0Q29uZmlnc1wiIHJlZj1cInNlYXJjaEJ1dHRvblwiPjwvYnV0dG9uPlxuXG4gIDxzcGFuPlJ1bnM6IHt7dGVzdFJlc3VsdHMudGVzdHNTdGFydGVkfX0ve3t0ZXN0UmVzdWx0cy50ZXN0c1RvdGFsfX08L3NwYW4+XG4gIDxzcGFuPkVycm9yczoge3t0ZXN0UmVzdWx0cy50ZXN0c0Vycm9yfX08L3NwYW4+XG4gIDxzcGFuPkZhaWx1cmVzOiB7e3Rlc3RSZXN1bHRzLnRlc3RzRmFpbGVkfX08L3NwYW4+XG4gIDxkaXYgY2xhc3M9XCJ0ZXN0LXByb2dyZXNzXCIgPlxuICAgIDxkaXZcbiAgICAgIHYtYmluZDpzdHlsZT1cInt3aWR0aDogcHJvZ3Jlc3MgKyAnJScgfVwiXG4gICAgICB2LWJpbmQ6Y2xhc3M9XCJwcm9ncmVzc0NsYXNzXCJcbiAgICAvPlxuICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7bWFwU3RhdGUsIG1hcEFjdGlvbnN9IGZyb20gXCJ2dWV4XCJcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6IFwiVGVzdEluZm9cIixcbiAgbW91bnRlZDogZnVuY3Rpb24oKSB7XG4gICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy4kcmVmcy5ydW5CdXR0b24se1xuICAgICAgdGl0bGU6IFwiUnVuIFRlc3QgQ29uZmlnXCIsXG4gICAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCJcbiAgICB9KVxuICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuJHJlZnMuc2VhcmNoQnV0dG9uLHtcbiAgICAgIHRpdGxlOiBcIkRpc2NvdmVyIFRlc3QgQ29uZmlnc1wiLFxuICAgICAgcGxhY2VtZW50OiBcImJvdHRvbVwiXG4gICAgfSlcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIC4uLm1hcEFjdGlvbnMoW1xuICAgICAgJ2xvYWRUZXN0Q29uZmlncycsXG4gICAgICAncnVuQ3VycmVudFRlc3RDb25maWcnLFxuICAgICAgJ3J1bkZhaWxlZFRlc3RzJ1xuICAgIF0pXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgJ3Byb2dyZXNzQ2xhc3MnOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAncHJvZ3Jlc3Mtc3VjY2Vzc2Z1bCc6ICF0aGlzLnRlc3RSZXN1bHRzLnRlc3RzRXJyb3IgJiYgIXRoaXMudGVzdFJlc3VsdHMudGVzdHNGYWlsZWQsXG4gICAgICAgICdwcm9ncmVzcy1lcnJvcic6IHRoaXMudGVzdFJlc3VsdHMudGVzdHNFcnJvciB8fCB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzRmFpbGVkXG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9ncmVzczogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy50ZXN0UmVzdWx0cy50ZXN0c1RvdGFsID09IDApXG4gICAgICAgIHJldHVybiAwXG4gICAgICByZXR1cm4gKHRoaXMudGVzdFJlc3VsdHMudGVzdHNGaW5pc2hlZCAvIHRoaXMudGVzdFJlc3VsdHMudGVzdHNUb3RhbCkqMTAwXG4gICAgfSxcbiAgICAnc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXgnOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5zZWxlY3RlZFRlc3RDb25maWdJbmRleFxuICAgICAgfSxcbiAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NlbGVjdFRlc3RDb25maWdCeUluZGV4Jyx2YWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIC4uLm1hcFN0YXRlKFtcbiAgICAgICd0ZXN0Q29uZmlncycsXG4gICAgICAndGVzdFJlc3VsdHMnXG4gICAgXSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbi50ZXN0LWluZm8ge1xuICBwYWRkaW5nOiAxMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnRlc3QtaW5mbyA+ICoge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4udGVzdC1pbmZvOmxhc3QtY2hpbGQge1xuICBtYXJnaW4tcmlnaHQ6IDBweDtcbn1cblxuLnRlc3QtaW5mbzpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi1sZWZ0OiAwcHg7XG59XG5cbi50ZXN0LWluZm8gPiBzZWxlY3Qge1xuICBmbGV4OiAxIDE7XG59XG5cbi50ZXN0LXByb2dyZXNzIHtcbiAgYm9yZGVyLXJhZGl1czogMTNweDsgLyogKGhlaWdodCBvZiBpbm5lciBkaXYpIC8gMiArIHBhZGRpbmcgKi9cbiAgcGFkZGluZzogM3B4O1xuICBmbGV4OiAzIDM7XG59XG5cbi50ZXN0LXByb2dyZXNzID4gZGl2IHtcbiAgIGhlaWdodDogMjBweDtcbiAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICB3aWR0aDogMCU7XG59XG5cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdGVzdC1pbmZvLnZ1ZT8xYzMzODk0MCIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJ0ZXN0LWxvZ1wiPlxuICA8ZGl2IHJlZj1cInRlcm1pbmFsXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDogMTAwJTtcIj48L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCAneHRlcm0vc3JjL3h0ZXJtLmNzcydcbmltcG9ydCBUZXJtIGZyb20gJ3h0ZXJtJ1xuaW1wb3J0IHsgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogJ1Rlc3RMb2cnLFxuICBtb3VudGVkOiBmdW5jdGlvbigpIHtcbiAgICBUZXJtLmxvYWRBZGRvbihcImZpdFwiKVxuICAgIHRoaXMudGVybSA9IG5ldyBUZXJtKClcbiAgICB0aGlzLnRlcm0ub3Blbih0aGlzLiRyZWZzLnRlcm1pbmFsKVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcFN0YXRlKFtcbiAgICAgICAgJ3NlbGVjdGVkVGVzdCdcbiAgICAgIF0pLFxuICB9LFxuICB3YXRjaDoge1xuICAgICdzZWxlY3RlZFRlc3QnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudGVybS5maXQoKVxuICAgICAgdGhpcy50ZXJtLmNsZWFyKClcbiAgICAgIHRoaXMudGVybS53cml0ZSh0aGlzLnNlbGVjdGVkVGVzdC5sb2cuam9pbihyZXF1aXJlKCdvcycpLkVPTCkpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuLnRlc3QtbG9nIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleDogMTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWluLXdpZHRoOiA0MDBweDtcbiAgbWluLWhlaWdodDogMTAwcHg7XG59XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHRlc3QtbG9nLnZ1ZT9mZjFmYmU2NCIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJ0ZXN0LXJ1bm5lclwiPlxuICA8ZGl2IGNsYXNzPVwidGVzdC1ydW5uZXItcm93XCI+XG4gICAgPFRlc3RJbmZvIC8+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidGVzdC1ydW5uZXItcm93XCI+XG4gICAgPFRlc3RUcmVlIC8+XG4gICAgPFRlc3RMb2cgLz5cbiAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQge21hcFN0YXRlLCBtYXBBY3Rpb25zfSBmcm9tICd2dWV4J1xuXG5pbXBvcnQgVGVzdEluZm8gZnJvbSAnLi90ZXN0LWluZm8udnVlJ1xuaW1wb3J0IFRlc3RUcmVlIGZyb20gJy4vdGVzdC10cmVlLnZ1ZSdcbmltcG9ydCBUZXN0TG9nIGZyb20gJy4vdGVzdC1sb2cudnVlJ1xuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlJ1xuXG5tb2R1bGUuZXhwb3J0cyA9e1xuICBuYW1lOiBcIlRlc3RSdW5uZXJcIixcbiAgc3RvcmUsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBUZXN0SW5mbyxcbiAgICBUZXN0VHJlZSxcbiAgICBUZXN0TG9nXG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lzVmlzaWJsZSc6IGZhbHNlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlXG4gICAgfSxcbiAgICAuLi5tYXBBY3Rpb25zKFtcbiAgICAgICdydW5BbGxUZXN0cycsXG4gICAgICAncnVuRmFpbGVkVGVzdHMnLFxuICAgIF0pXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgJ2lzVmlzaWJsZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMucGFuZWwuc2hvdygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhbmVsLmhpZGUoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY3JlYXRlZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkQm90dG9tUGFuZWwoe1xuICAgICAgaXRlbTogZWxlbWVudCxcbiAgICAgIHZpc2libGU6IHRoaXMuaXNWaXNpYmxlXG4gICAgfSlcbiAgICB0aGlzLiRtb3VudChlbGVtZW50KVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuLnRlc3QtcnVubmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi50ZXN0LXJ1bm5lciAudGVzdC1ydW5uZXItcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cbi50ZXN0LXJ1bm5lci1yb3c6bGFzdC1jaGlsZCB7XG4gIGhlaWdodDogMTAwJTtcbn1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdGVzdC1ydW5uZXIudnVlPzc3ZDdjMjJiIiwiPHRlbXBsYXRlPlxuPGxpIGNsYXNzPVwiZW50cnlcIlxuICAgIHYtYmluZDpjbGFzcz1cImNsYXNzT2JqZWN0XCIgdi1vbjpjbGljay5zdG9wPVwib25DbGlja1wiIHYtb246ZGJsY2xpY2suc3RvcD1cIm9uRGJsQ2xpY2tcIj5cbiAgPGRpdiBjbGFzcz1cImhlYWRlciBsaXN0LWl0ZW1cIiB2LWJpbmQ6Y2xhc3M9XCJ7J3Rlc3QtZmFpbGVkJzogaXRlbS5oYXNGYWlsZWR9XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJuYW1lIGljb25cIiB2LWJpbmQ6Y2xhc3M9XCJpY29uQ2xhc3NcIiAvPlxuICAgIDxzcGFuPnt7IGl0ZW0ubmFtZSB9fTwvc3Bhbj5cbiAgICA8c3BhbiB2LWlmPVwiaXRlbS5kdXJhdGlvbiA+IDAuMFwiIGNsYXNzPVwidGVzdC10aW1lXCI+Jm5ic3A7KHt7IGl0ZW0uZHVyYXRpb24udG9GaXhlZCgzKSB9fXMpPC9zcGFuPlxuICA8L2Rpdj5cbiAgPG9sIGNsYXNzPVwiZW50cmllcyBsaXN0LXRyZWVcIj5cbiAgICA8VGVzdFRyZWVOb2RlIHYtZm9yPVwiY2hpbGQgaW4gaXRlbS5jaGlsZEl0ZW1zXCIgdi1iaW5kOml0ZW09XCJjaGlsZFwiIC8+XG4gIDwvb2w+XG48L2xpPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6IFwiVGVzdFRyZWVOb2RlXCIsXG4gIHByb3BzOiBbXG4gICAgJ2l0ZW0nXG4gIF0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRXhwYW5kZWQ6IGZhbHNlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25DbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB0aGlzLmlzRXhwYW5kZWQgPSAhdGhpcy5pc0V4cGFuZGVkO1xuICAgICAgaWYgKHRoaXMuaXRlbS5pc1Rlc3QpXG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0U2VsZWN0VGVzdCcsdGhpcy5pdGVtKVxuICAgIH0sXG4gICAgb25EYmxDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLml0ZW0uaXNUZXN0KSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW0uZmlsZW5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4odGhpcy5pdGVtLmZpbGVuYW1lLCB7XG4gICAgICAgICAgICBpbml0aWFsTGluZTogdGhpcy5pdGVtLmxpbmUtMSxcbiAgICAgICAgICAgIGluaXRpYWxDb2x1bW46IHRoaXMuaXRlbS5jb2x1bW4tMVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NPYmplY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpcmVjdG9yeTogdGhpcy5pdGVtLmlzQ29udGFpbmVyLFxuICAgICAgICAnbGlzdC1uZXN0ZWQtaXRlbSc6IHRoaXMuaXRlbS5pc0NvbnRhaW5lcixcbiAgICAgICAgZXhwYW5kZWQ6IHRoaXMuaXNFeHBhbmRlZCxcbiAgICAgICAgY29sbGFwc2VkOiAhdGhpcy5pc0V4cGFuZGVkLFxuICAgICAgICBmaWxlIDogIXRoaXMuaXRlbS5pc0NvbnRhaW5lcixcbiAgICAgICAgJ2xpc3QtaXRlbScgOiAhdGhpcy5pdGVtLmlzQ29udGFpbmVyLFxuICAgICAgICBzZWxlY3RlZDogdGhpcy5pdGVtID09PSB0aGlzLiRzdG9yZS5zdGF0ZS5zZWxlY3RlZFRlc3RcbiAgICAgIH1cbiAgICB9LFxuICAgIGljb25DbGFzczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2ZhIGZhLWN1YmVzJzogdGhpcy5pdGVtLmlzUGFja2FnZSxcbiAgICAgICAgJ2ZhIGZhLWZpbGUtY29kZS1vJyA6IHRoaXMuaXRlbS5pc0NsYXNzLFxuICAgICAgICAnZmEgZmEtbGlzdC11bCcgOiB0aGlzLml0ZW0uaXNUZXN0XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHRlc3QtdHJlZS1ub2RlLnZ1ZT82Y2E0MWIzMSIsIjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9XCJ0ZXN0LXRyZWUgdHJlZS12aWV3LXJlc2l6ZXIgdG9vbC1wYW5lbFwiIHJlZj1cImNvbnRlbnRcIj5cbiAgPGRpdiBjbGFzcz1cInRyZWUtdmlldy1zY3JvbGxlciBvcmRlci0tY2VudGVyXCI+XG4gICAgPG9sIGNsYXNzPVwidHJlZS12aWV3IGZ1bGwtbWVudSBsaXN0LXRyZWUgaGFzLWNvbGxhcHNhYmxlLWNoaWxkcmVuIGZvY3VzYWJsZS1wYW5lbFwiPlxuICAgICAgPFRlc3RUcmVlTm9kZSB2LWZvcj1cIml0ZW0gaW4gdGVzdFRyZWUuY2hpbGRJdGVtc1wiIHYtYmluZDppdGVtPVwiaXRlbVwiLz5cbiAgICA8L29sPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInRyZWUtdmlldy1yZXNpemUtaGFuZGxlXCIgcmVmPVwiaGFuZGxlXCIgdi1vbjptb3VzZWRvd249XCJzdGFydFJlc2l6ZVwiIHN0eWxlPVwicmlnaHQ6LTVweDtcIj48L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCJcbmltcG9ydCB7bWFwU3RhdGV9IGZyb20gXCJ2dWV4XCJcblxuaW1wb3J0IFRlc3RUcmVlTm9kZSBmcm9tIFwiLi90ZXN0LXRyZWUtbm9kZS52dWVcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogXCJUZXN0VHJlZVwiLFxuICBjb21wb25lbnRzOiB7XG4gICAgVGVzdFRyZWVOb2RlXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgLi4ubWFwU3RhdGUoW1xuICAgICAgXCJ0ZXN0VHJlZVwiXG4gICAgXSlcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHN0YXJ0UmVzaXplOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHRoaXMuaXNSZXNpemluZyA9IHRydWU7XG4gICAgICB0aGlzLnhPbGQgPSBldmVudC5zY3JlZW5YO1xuICAgICAgJChcImJvZHlcIikub24oXCJtb3VzZW1vdmVcIix0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgICAkKFwiYm9keVwiKS5vbihcIm1vdXNldXBcIix0aGlzLnN0b3BSZXNpemUpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBvYmogPSAkKHRoaXMuJHJlZnMuY29udGVudClcbiAgICAgIGlmICh0aGlzLmlzUmVzaXppbmcpIHtcbiAgICAgICAgb2JqLndpZHRoKG9iai53aWR0aCgpIC0gKHRoaXMueE9sZCAtIGV2ZW50LnNjcmVlblgpKTtcbiAgICAgICAgdGhpcy54T2xkID0gZXZlbnQuc2NyZWVuWDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0b3BSZXNpemU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG4gICAgICAkKFwiYm9keVwiKS5vZmYoXCJtb3NldXBcIix0aGlzLnN0b3BSZXNpemUpXG4gICAgICAkKFwiYm9keVwiKS5vZmYoXCJtb3VzZW1vdmVcIix0aGlzLmhhbmRsZVJlc2l6ZSlcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4udGVzdC1ydW5uZXIgLnRlc3QtdHJlZSB7XG4gIHdpZHRoOiAzMDBweDtcbn1cbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdGVzdC10cmVlLnZ1ZT82NDQ5NzJmMCIsImNvbnN0IGFjdGlvbnMgPSB7XG4gIGxvYWRUZXN0Q29uZmlncyhjb250ZXh0KSB7XG4gICAgdmFyIHRlc3RDb25maWdzID0gW11cbiAgICBmb3IgKHZhciBwcm9qZWN0UGF0aCBvZiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKSkge1xuICAgICAgdmFyIGNvbmZpZ0ZpbGUgPSBwYXRoLmpvaW4ocHJvamVjdFBhdGgsIFwiLnRycmNcIilcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBzdGF0ID0gZnMuc3RhdFN5bmMoY29uZmlnRmlsZSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHZhciBjb25maWdzXG4gICAgICB0cnkge1xuICAgICAgICBjb25maWdzID0geWFtbC5zYWZlTG9hZChmcy5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSwgXCJ1dGY4XCIpKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXCJDb3VsZCBub3QgbG9hZCB0ZXN0IHJ1bm5lciBjb25maWcgZmlsZS5cIiwge1xuICAgICAgICAgIGRldGFpbDogZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGNvbmZpZyBvZiBjb25maWdzKSB7XG4gICAgICAgIGNvbmZpZy5wcm9qZWN0UGF0aCA9IHByb2plY3RQYXRoXG4gICAgICAgIC8qIENoZWNrIGZvciBubyBuYW1lIGFuZCBnZW5lcmF0ZSBvbmUgKi9cbiAgICAgICAgaWYgKCEoXCJuYW1lXCIgaW4gY29uZmlnKSlcbiAgICAgICAgICBjb25maWcubmFtZSA9IFwiVGVzdCBDb25maWcgTnIuIFwiICsgKGNvbmZpZ3MuaW5kZXhPZihjb25maWcpKzEpXG4gICAgICAgIC8qIENoZWNrIGZvciBubyBydW5uZXIgKi9cbiAgICAgICAgaWYgKCEoXCJydW5uZXJcIiBpbiBjb25maWcpKSB7XG4gICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoXCJObyBydW5uZXIgZm9yIGRlZmluZWQgZm9yOiBcIiArIGNvbmZpZy5uYW1lKVxuICAgICAgICAgIGNvbmZpZy5ydW5uZXIgPSBcInVua25vd25cIlxuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25maWcsIFwiZGlzcGxheU5hbWVcIiwge1xuICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ydW5uZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIgKFwiICsgdGhpcy5fcnVubmVyLm5hbWUgKyBcIilcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb25maWcucnVubmVyIGluIGNvbnRleHQuc3RhdGUucnVubmVycykge1xuICAgICAgICAgIGNvbmZpZy5fcnVubmVyID0gbmV3IGNvbnRleHQuc3RhdGUucnVubmVyc1tjb25maWcucnVubmVyXShjb25maWcpXG4gICAgICAgICAgY29uZmlnLl9ydW5uZXIub25UZXN0U3RhcnQoKHRlc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnRleHQuY29tbWl0KFwiaW5jcmVtZW50VGVzdHNTdGFydGVkXCIpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25maWcuX3J1bm5lci5vblRlc3RFbmQoKHRlc3RSZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnRleHQuY29tbWl0KFwiYWRkVGVzdFJlc3VsdFwiLCB0ZXN0UmVzdWx0KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIGNvbmZpZy5fcnVubmVyID0gbnVsbFxuICAgICAgICB0ZXN0Q29uZmlncy5wdXNoKGNvbmZpZylcbiAgICAgIH1cbiAgICB9XG4gICAgY29udGV4dC5jb21taXQoXCJzZXRUZXN0Q29uZmlnc1wiLCB0ZXN0Q29uZmlncylcbiAgfSxcbiAgcnVuQ3VycmVudFRlc3RDb25maWc6IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICB2YXIgdGVzdENvbmZpZyA9IGNvbnRleHQuZ2V0dGVycy5zZWxlY3RlZFRlc3RDb25maWdcbiAgICBpZiAodGVzdENvbmZpZyA9PSBudWxsKSB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXCJObyB0ZXN0IGNvbmZpZyBzZWxlY3RlZC5cIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGVzdENvbmZpZy5fcnVubmVyID09IG51bGwpIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcih0ZXN0Q29uZmlnLm5hbWUgKyBcIiAgaGFzIG5vIHRlc3QgcnVubmVyLlwiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRlc3RDb25maWcuX3J1bm5lci5nZXRUZXN0cygpLnRoZW4oXG4gICAgICAodGVzdHMpID0+IHtcbiAgICAgICAgY29udGV4dC5jb21taXQoXCJjbGVhclRlc3RSZXN1bHRzXCIpXG4gICAgICAgIGNvbnRleHQuY29tbWl0KFwic2V0VGVzdHNcIiwgdGVzdHMpXG4gICAgICAgIHRlc3RDb25maWcuX3J1bm5lci5ydW5BbGxUZXN0cygpXG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcIkZhaWxlZCB0byBsb2FkIHRlc3RzIGZvcjogXCIgKyB0ZXN0Q29uZmlnLm5hbWUsIHtkZXRhaWw6IGVycn0pXG4gICAgICB9KVxuICB9LFxuICBydW5GYWlsZWRUZXN0czogZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciB0ZXN0Q29uZmlnID0gY29udGV4dC5nZXR0ZXJzLnNlbGVjdGVkVGVzdENvbmZpZ1xuICAgIGlmICh0ZXN0Q29uZmlnID09IG51bGwpIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcIk5vIHRlc3QgY29uZmlnIHNlbGVjdGVkLlwiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0ZXN0Q29uZmlnLl9ydW5uZXIgPT0gbnVsbCkge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKHRlc3RDb25maWcubmFtZSArIFwiICBoYXMgbm8gdGVzdCBydW5uZXIuXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIGZhaWxlZFRlc3RzID0gW11cbiAgICBmb3IgKHZhciB0ZXN0IG9mIGNvbnRleHQuc3RhdGUudGVzdHMpXG4gICAgICBpZiAodGVzdC5oYXNGYWlsZWQpXG4gICAgICAgIGZhaWxlZFRlc3RzLnB1c2godGVzdClcbiAgICBjb250ZXh0LmNvbW1pdChcImNsZWFyVGVzdFJlc3VsdHNcIilcbiAgICBjb250ZXh0LmNvbW1pdChcInNldFRlc3RzXCIsZmFpbGVkVGVzdHMpXG4gICAgdGVzdENvbmZpZy5fcnVubmVyLnJ1blRlc3RzKGZhaWxlZFRlc3RzKVxuICB9LFxuICBhcHBlbmRSdW5uZXIoY29udGV4dCwgb3B0aW9ucykge1xuICAgIGNvbnRleHQuY29tbWl0KFwiYXBwZW5kUnVubmVyXCIsIG9wdGlvbnMpXG4gICAgY29udGV4dC5kaXNwYXRjaChcImxvYWRUZXN0Q29uZmlnc1wiKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWN0aW9uc1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3N0b3JlL2FjdGlvbnMuanMiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIlxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIlxuaW1wb3J0IGZzIGZyb20gXCJmc1wiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeWFtbCBmcm9tIFwianMteWFtbFwiXG5cblZ1ZS51c2UoVnVleClcblxuY29uc3QgZ2V0dGVycyA9IHtcbiAgc2VsZWN0ZWRUZXN0Q29uZmlnKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLnNlbGVjdGVkVGVzdENvbmZpZ0luZGV4IDwgMCAmJiBzdGF0ZS5zZWxlY3RlZFRlc3RDb25maWdJbmRleCA+IHN0YXRlLnRlc3RDb25maWdzLmxlbmd0aClcbiAgICAgIHJldHVybiBudWxsXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHN0YXRlLnRlc3RDb25maWdzW3N0YXRlLnNlbGVjdGVkVGVzdENvbmZpZ0luZGV4XVxuICB9XG59XG5cbmltcG9ydCBzdGF0ZSBmcm9tIFwiLi9zdGF0ZS5qc1wiXG5pbXBvcnQgbXV0YXRpb25zIGZyb20gXCIuL211dGF0aW9ucy5qc1wiXG5pbXBvcnQgYWN0aW9ucyBmcm9tIFwiLi9hY3Rpb25zLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZXguU3RvcmUoe1xuICBzdGF0ZSxcbiAgbXV0YXRpb25zLFxuICBhY3Rpb25zLFxuICBnZXR0ZXJzXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3N0b3JlL2luZGV4LmpzIiwiY29uc3QgbXV0YXRpb25zID0ge1xuICBhcHBlbmRSdW5uZXIoc3RhdGUsIHtcbiAgICBrZXksXG4gICAgcnVubmVyXG4gIH0pIHtcbiAgICB2YXIgcnVubmVycyA9IHN0YXRlLnJ1bm5lcnNcbiAgICBydW5uZXJzW2tleV0gPSBydW5uZXJcbiAgICBzdGF0ZS5ydW5uZXJzID0gcnVubmVyc1xuICB9LFxuICBzZWxlY3RUZXN0Q29uZmlnQnlJbmRleChzdGF0ZSwgaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPCAwICYmIGluZGV4ID4gc3RhdGUudGVzdENvbmZpZ3MubGVuZ3RoKSByZXR1cm5cbiAgICBzdGF0ZS5zZWxlY3RlZFRlc3RDb25maWdJbmRleCA9IGluZGV4XG4gIH0sXG4gIHNldFRlc3RUcmVlKHN0YXRlLCB0ZXN0VHJlZSkge1xuICAgIHN0YXRlLnRlc3RUcmVlID0gdGVzdFRyZWVcbiAgfSxcbiAgc2V0U2VsZWN0VGVzdChzdGF0ZSwgdGVzdCkge1xuICAgIHN0YXRlLnNlbGVjdGVkVGVzdCA9IHRlc3RcbiAgfSxcbiAgc2V0VGVzdFJlc3VsdHMoc3RhdGUsIHRlc3RSZXN1bHRzKSB7XG4gICAgc3RhdGUudGVzdFJlc3VsdHMgPSB0ZXN0UmVzdWx0c1xuICB9LFxuICBjbGVhclRlc3RSZXN1bHRzKHN0YXRlKSB7XG4gICAgc3RhdGUudGVzdFJlc3VsdHMgPSB7XG4gICAgICB0ZXN0c1N0YXJ0ZWQ6IDAsXG4gICAgICB0ZXN0c0ZpbmlzaGVkOiAwLFxuICAgICAgdGVzdHNUb3RhbDogMCxcbiAgICAgIHRlc3RzUGFzc2VkOiAwLFxuICAgICAgdGVzdHNGYWlsZWQ6IDAsXG4gICAgICB0ZXN0c0Vycm9yOiAwLFxuICAgICAgZHVyYXRpb246IDBcbiAgICB9XG4gIH0sXG4gIHNldFRlc3RDb25maWdzKHN0YXRlLCB0ZXN0Q29uZmlncykge1xuICAgIHN0YXRlLnRlc3RDb25maWdzID0gdGVzdENvbmZpZ3NcbiAgfSxcbiAgc2V0VGVzdHMoc3RhdGUsIHRlc3RzKSB7XG4gICAgdmFyIHRlc3RUcmVlID0ge1xuICAgICAgY2hpbGRJdGVtczoge31cbiAgICB9XG4gICAgc3RhdGUudGVzdHMubGVuZ3RoID0gMFxuICAgIHZhciBlbGVtZW50ID0gdGVzdFRyZWVcbiAgICB2YXIgcGFyZW50ID0gbnVsbFxuICAgIGZvciAodmFyIHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgIGVsZW1lbnQgPSB0ZXN0VHJlZVxuICAgICAgaWYgKHRlc3QucGFja2FnZU5hbWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgcGtnTmFtZSBvZiB0ZXN0LnBhY2thZ2VOYW1lcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5jaGlsZEl0ZW1zW3BrZ05hbWVdICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNoaWxkSXRlbXNbcGtnTmFtZV0gPSB7XG4gICAgICAgICAgICAgIGlzQ29udGFpbmVyOiB0cnVlLFxuICAgICAgICAgICAgICBpc1BhY2thZ2U6IHRydWUsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICBuYW1lOiBwa2dOYW1lLFxuICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICAgICAgY2hpbGRJdGVtczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyZW50ID0gZWxlbWVudFxuICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmNoaWxkSXRlbXNbcGtnTmFtZV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0ZXN0LmNsYXNzbmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQuY2hpbGRJdGVtc1t0ZXN0LmNsYXNzbmFtZV0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICBlbGVtZW50LmNoaWxkSXRlbXNbdGVzdC5jbGFzc25hbWVdID0ge1xuICAgICAgICAgICAgaXNDb250YWluZXI6IHRydWUsXG4gICAgICAgICAgICBpc0NsYXNzOiB0cnVlLFxuICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICBuYW1lOiB0ZXN0LmNsYXNzbmFtZSxcbiAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgY2hpbGRJdGVtczoge31cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gZWxlbWVudFxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5jaGlsZEl0ZW1zW3Rlc3QuY2xhc3NuYW1lXVxuICAgICAgfVxuICAgICAgZWxlbWVudC5jaGlsZEl0ZW1zW3Rlc3QudGVzdG5hbWVdID0ge1xuICAgICAgICBpc0NvbnRhaW5lcjogZmFsc2UsXG4gICAgICAgIGlzVGVzdDogdHJ1ZSxcbiAgICAgICAgZmlsZW5hbWU6IHRlc3QuZmlsZW5hbWUsXG4gICAgICAgIGxpbmU6IHRlc3QubGluZSxcbiAgICAgICAgY29sdW1uOiB0ZXN0LmNvbHVtbixcbiAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgIG5hbWU6IHRlc3QudGVzdG5hbWUsXG4gICAgICAgIHRlc3RJZGVudGlmaWVyOiB0ZXN0LnRlc3RJZGVudGlmaWVyLFxuICAgICAgICB0ZXN0bmFtZTogdGVzdC50ZXN0bmFtZSxcbiAgICAgICAgY2xhc3NuYW1lOiB0ZXN0LmNsYXNzbmFtZSxcbiAgICAgICAgcGFja2FnZU5hbWVzOiB0ZXN0LnBhY2thZ2VOYW1lcyxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgIGNoaWxkSXRlbXM6IHt9LFxuICAgICAgICBoYXNSdW46IGZhbHNlLFxuICAgICAgICBoYXNGYWlsZWQ6IGZhbHNlLFxuICAgICAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgICAgIGxvZzogW10sXG4gICAgICAgIHRyYWNlYmFjazogW11cbiAgICAgIH1cbiAgICAgIHN0YXRlLnRlc3RzLnB1c2goZWxlbWVudC5jaGlsZEl0ZW1zW3Rlc3QudGVzdG5hbWVdKVxuICAgIH1cbiAgICBzdGF0ZS50ZXN0UmVzdWx0cy50ZXN0c1RvdGFsID0gdGVzdHMubGVuZ3RoXG4gICAgc3RhdGUudGVzdFRyZWUgPSB0ZXN0VHJlZVxuICB9LFxuICBhZGRUZXN0UmVzdWx0KHN0YXRlLCByZXN1bHQpIHtcbiAgICAvKiBEaXNjb3ZlciB0ZXN0VHJlZSBlbnRyeSAqL1xuICAgIHZhciB0ZXN0ID0gc3RhdGUudGVzdFRyZWUuY2hpbGRJdGVtc1xuICAgIGlmIChyZXN1bHQucGFja2FnZU5hbWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGZvciAodmFyIHBrZ05hbWUgb2YgcmVzdWx0LnBhY2thZ2VOYW1lcykge1xuICAgICAgICB0ZXN0ID0gdGVzdFtwa2dOYW1lXVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdC5jbGFzc25hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRlc3QgPSB0ZXN0LmNoaWxkSXRlbXNbcmVzdWx0LmNsYXNzbmFtZV1cbiAgICB9XG4gICAgaWYgKHJlc3VsdC50ZXN0bmFtZSBpbiB0ZXN0LmNoaWxkSXRlbXMpIHtcbiAgICAgIHRlc3QgPSB0ZXN0LmNoaWxkSXRlbXNbcmVzdWx0LnRlc3RuYW1lXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLyogU2V0IHJlc3VsdCAqL1xuICAgIHRlc3QuaGFzUnVuID0gdHJ1ZVxuICAgIHRlc3QuaGFzRmFpbGVkID0gcmVzdWx0Lmhhc0ZhaWxlZFxuICAgIHRlc3QuaGFzRXJyb3IgPSByZXN1bHQuaGFzRXJyb3JcbiAgICB0ZXN0LmxvZyA9IHJlc3VsdC5sb2dcbiAgICB0ZXN0LnRyYWNlYmFjayA9IHJlc3VsdC50cmFjZWJhY2tcbiAgICAvKiByZWN1cnNpdmUgZHVyYXRpb24gKi9cbiAgICB2YXIgZW50cnkgPSB0ZXN0XG4gICAgd2hpbGUgKGVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBlbnRyeS5kdXJhdGlvbiArPSByZXN1bHQuZHVyYXRpb25cbiAgICAgIGVudHJ5ID0gZW50cnkucGFyZW50XG4gICAgfVxuICAgIHN0YXRlLnRlc3RSZXN1bHRzLmR1cmF0aW9uICs9IHJlc3VsdC5kdXJhdGlvblxuICAgIHN0YXRlLnRlc3RSZXN1bHRzLnRlc3RzRmluaXNoZWQgKz0gMVxuICAgIGlmIChyZXN1bHQuaGFzRXJyb3IpIHN0YXRlLnRlc3RSZXN1bHRzLnRlc3RzRXJyb3IgKz0gMVxuICAgIGlmIChyZXN1bHQuaGFzRmFpbGVkKSBzdGF0ZS50ZXN0UmVzdWx0cy50ZXN0c0ZhaWxlZCArPSAxXG4gIH0sXG4gIGluY3JlbWVudFRlc3RzU3RhcnRlZChzdGF0ZSkge1xuICAgIHN0YXRlLnRlc3RSZXN1bHRzLnRlc3RzU3RhcnRlZCArPSAxXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtdXRhdGlvbnNcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9zdG9yZS9tdXRhdGlvbnMuanMiLCJjb25zdCBzdGF0ZSA9IHtcbiAgcnVubmVyczoge30sXG4gIHNlbGVjdGVkVGVzdDogbnVsbCxcbiAgc2VsZWN0ZWRUZXN0Q29uZmlnSW5kZXg6IC0xLFxuICB0ZXN0Q29uZmlnczogW10sXG4gIHRlc3RUcmVlOiB7fSxcbiAgdGVzdHM6IFtdLFxuICB0ZXN0UmVzdWx0czoge1xuICAgIHRlc3RzU3RhcnRlZDogMCxcbiAgICB0ZXN0c0ZpbmlzaGVkOiAwLFxuICAgIHRlc3RzVG90YWw6IDAsXG4gICAgdGVzdHNQYXNzZWQ6IDAsXG4gICAgdGVzdHNGYWlsZWQ6IDAsXG4gICAgdGVzdHNFcnJvcjogMCxcbiAgICBkdXJhdGlvbjogMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdGVcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9zdG9yZS9zdGF0ZS5qcyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnRlc3QtaW5mbyB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMjBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbi50ZXN0LWluZm8gPiAqIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG4udGVzdC1pbmZvOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxufVxcbi50ZXN0LWluZm86Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLWxlZnQ6IDBweDtcXG59XFxuLnRlc3QtaW5mbyA+IHNlbGVjdCB7XFxuICBmbGV4OiAxIDE7XFxufVxcbi50ZXN0LXByb2dyZXNzIHtcXG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7IC8qIChoZWlnaHQgb2YgaW5uZXIgZGl2KSAvIDIgKyBwYWRkaW5nICovXFxuICBwYWRkaW5nOiAzcHg7XFxuICBmbGV4OiAzIDM7XFxufVxcbi50ZXN0LXByb2dyZXNzID4gZGl2IHtcXG4gICBoZWlnaHQ6IDIwcHg7XFxuICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICB3aWR0aDogMCU7XFxufVxcblxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMTA3YzlkN2QhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi50ZXN0LXJ1bm5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnRlc3QtcnVubmVyIC50ZXN0LXJ1bm5lci1yb3cge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcbi50ZXN0LXJ1bm5lci1yb3c6bGFzdC1jaGlsZCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMjAzNmQ1ODIhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LXJ1bm5lci52dWVcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnRlc3QtbG9nIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4OiAxO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG1pbi13aWR0aDogNDAwcHg7XFxuICBtaW4taGVpZ2h0OiAxMDBweDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0zZGM4ODNjNSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtbG9nLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udGVzdC1ydW5uZXIgLnRlc3QtdHJlZSB7XFxuICB3aWR0aDogMzAwcHg7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtNTg4MGI0NmQhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LXRyZWUudnVlXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogeHRlcm0uanM6IHh0ZXJtLCBpbiB0aGUgYnJvd3NlclxcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE2LCBTb3VyY2VMYWlyIFByaXZhdGUgQ29tcGFueSAod3d3LnNvdXJjZWxhaXIuY29tIChNSVQgTGljZW5zZSlcXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxMywgQ2hyaXN0b3BoZXIgSmVmZnJleSAoTUlUIExpY2Vuc2UpXFxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoamovdGVybS5qc1xcbiAqXFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFxcXCJTb2Z0d2FyZVxcXCIpLCB0byBkZWFsXFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxcbiAqXFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cXG4gKlxcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcXFwiQVMgSVNcXFwiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXFxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXFxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxcbiAqIFRIRSBTT0ZUV0FSRS5cXG4gKlxcbiAqIE9yaWdpbmFsbHkgZm9ya2VkIGZyb20gKHdpdGggdGhlIGF1dGhvcidzIHBlcm1pc3Npb24pOlxcbiAqICAgRmFicmljZSBCZWxsYXJkJ3MgamF2YXNjcmlwdCB2dDEwMCBmb3IganNsaW51eDpcXG4gKiAgIGh0dHA6Ly9iZWxsYXJkLm9yZy9qc2xpbnV4L1xcbiAqICAgQ29weXJpZ2h0IChjKSAyMDExIEZhYnJpY2UgQmVsbGFyZFxcbiAqICAgVGhlIG9yaWdpbmFsIGRlc2lnbiByZW1haW5zLiBUaGUgdGVybWluYWwgaXRzZWxmXFxuICogICBoYXMgYmVlbiBleHRlbmRlZCB0byBpbmNsdWRlIHh0ZXJtIENTSSBjb2RlcywgYW1vbmdcXG4gKiAgIG90aGVyIGZlYXR1cmVzLlxcbiAqL1xcblxcbi8qXFxuICogIERlZmF1bHQgc3R5bGUgZm9yIHh0ZXJtLmpzXFxuICovXFxuXFxuLnRlcm1pbmFsIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtZmFtaWx5OiBjb3VyaWVyLW5ldywgY291cmllciwgbW9ub3NwYWNlO1xcbiAgICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFxcXCJsaWdhXFxcIiAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi50ZXJtaW5hbC5mb2N1cyxcXG4udGVybWluYWw6Zm9jdXMge1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWhlbHBlcnMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1oZWxwZXItdGV4dGFyZWEge1xcbiAgICAvKlxcbiAgICAgKiBIQUNLOiB0byBmaXggSUUncyBibGlua2luZyBjdXJzb3JcXG4gICAgICogTW92ZSB0ZXh0YXJlYSBvdXQgb2YgdGhlIHNjcmVlbiB0byB0aGUgZmFyIGxlZnQsIHNvIHRoYXQgdGhlIGN1cnNvciBpcyBub3QgdmlzaWJsZS5cXG4gICAgICovXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgbGVmdDogLTk5OTllbTtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICB6LWluZGV4OiAtMTA7XFxuICAgIC8qKiBQcmV2ZW50IHdyYXBwaW5nIHNvIHRoZSBJTUUgYXBwZWFycyBhZ2FpbnN0IHRoZSB0ZXh0YXJlYSBhdCB0aGUgY29ycmVjdCBwb3NpdGlvbiAqL1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICByZXNpemU6IG5vbmU7XFxufVxcblxcbi50ZXJtaW5hbCAudGVybWluYWwtY3Vyc29yIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgY29sb3I6ICMwMDA7XFxufVxcblxcbi50ZXJtaW5hbDpub3QoLmZvY3VzKSAudGVybWluYWwtY3Vyc29yIHtcXG4gICAgb3V0bGluZTogMXB4IHNvbGlkICNmZmY7XFxuICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLnRlcm1pbmFsLmZvY3VzIC50ZXJtaW5hbC1jdXJzb3IuYmxpbmtpbmcge1xcbiAgICBhbmltYXRpb246IGJsaW5rLWN1cnNvciAxLjJzIGluZmluaXRlIHN0ZXAtZW5kO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWN1cnNvciB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgICBjb2xvcjogIzAwMDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICBjb2xvcjogI0ZGRjtcXG4gICAgfVxcbn1cXG5cXG4udGVybWluYWwgLmNvbXBvc2l0aW9uLXZpZXcge1xcbiAgICBiYWNrZ3JvdW5kOiAjMDAwO1xcbiAgICBjb2xvcjogI0ZGRjtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4udGVybWluYWwgLmNvbXBvc2l0aW9uLXZpZXcuYWN0aXZlIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tdmlld3BvcnQge1xcbiAgICAvKiBPbiBPUyBYIHRoaXMgaXMgcmVxdWlyZWQgaW4gb3JkZXIgZm9yIHRoZSBzY3JvbGwgYmFyIHRvIGFwcGVhciBmdWxseSBvcGFxdWUgKi9cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLXJvd3Mge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1yb3dzID4gZGl2IHtcXG4gICAgLyogTGluZXMgY29udGFpbmluZyBzcGFucyBhbmQgdGV4dCBub2RlcyBvY2Fzc2lvbmFsbHkgd3JhcCBkZXNwaXRlIGJlaW5nIHRoZSBzYW1lIHdpZHRoICgjMzI3KSAqL1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLXNjcm9sbC1hcmVhIHtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNoYXItbWVhc3VyZS1lbGVtZW50IHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogLTk5OTllbTtcXG59XFxuXFxuLypcXG4gKiAgRGV0ZXJtaW5lIGRlZmF1bHQgY29sb3JzIGZvciB4dGVybS5qc1xcbiAqL1xcbi50ZXJtaW5hbCAueHRlcm0tYm9sZCB7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLXVuZGVybGluZSB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJsaW5rIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBibGluaztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1oaWRkZW4ge1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMCB7XFxuICAgIGNvbG9yOiAjMmUzNDM2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmUzNDM2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEge1xcbiAgICBjb2xvcjogI2NjMDAwMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjMDAwMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yIHtcXG4gICAgY29sb3I6ICM0ZTlhMDY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0ZTlhMDY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMyB7XFxuICAgIGNvbG9yOiAjYzRhMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzRhMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQge1xcbiAgICBjb2xvcjogIzM0NjVhNDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci00IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM0NjVhNDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci01IHtcXG4gICAgY29sb3I6ICM3NTUwN2I7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3NTUwN2I7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItNiB7XFxuICAgIGNvbG9yOiAjMDY5ODlhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDY5ODlhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcge1xcbiAgICBjb2xvcjogI2QzZDdjZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci03IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QzZDdjZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci04IHtcXG4gICAgY29sb3I6ICM1NTU3NTM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NTU3NTM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItOSB7XFxuICAgIGNvbG9yOiAjZWYyOTI5O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWYyOTI5O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwIHtcXG4gICAgY29sb3I6ICM4YWUyMzQ7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGFlMjM0O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExIHtcXG4gICAgY29sb3I6ICNmY2U5NGY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNlOTRmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyIHtcXG4gICAgY29sb3I6ICM3MjlmY2Y7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzI5ZmNmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzIHtcXG4gICAgY29sb3I6ICNhZDdmYTg7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWQ3ZmE4O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0IHtcXG4gICAgY29sb3I6ICMzNGUyZTI7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzRlMmUyO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1IHtcXG4gICAgY29sb3I6ICNlZWVlZWM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVjO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2IHtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3IHtcXG4gICAgY29sb3I6ICMwMDAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4IHtcXG4gICAgY29sb3I6ICMwMDAwODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5IHtcXG4gICAgY29sb3I6ICMwMDAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwIHtcXG4gICAgY29sb3I6ICMwMDAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMGQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxIHtcXG4gICAgY29sb3I6ICMwMDAwZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyIHtcXG4gICAgY29sb3I6ICMwMDVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzIHtcXG4gICAgY29sb3I6ICMwMDVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0IHtcXG4gICAgY29sb3I6ICMwMDVmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI1IHtcXG4gICAgY29sb3I6ICMwMDVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI2IHtcXG4gICAgY29sb3I6ICMwMDVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI3IHtcXG4gICAgY29sb3I6ICMwMDVmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI4IHtcXG4gICAgY29sb3I6ICMwMDg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI5IHtcXG4gICAgY29sb3I6ICMwMDg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4NzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMwIHtcXG4gICAgY29sb3I6ICMwMDg3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMxIHtcXG4gICAgY29sb3I6ICMwMDg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMyIHtcXG4gICAgY29sb3I6ICMwMDg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4N2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTMzIHtcXG4gICAgY29sb3I6ICMwMDg3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM0IHtcXG4gICAgY29sb3I6ICMwMGFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM1IHtcXG4gICAgY29sb3I6ICMwMGFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM2IHtcXG4gICAgY29sb3I6ICMwMGFmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM3IHtcXG4gICAgY29sb3I6ICMwMGFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM4IHtcXG4gICAgY29sb3I6ICMwMGFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTM5IHtcXG4gICAgY29sb3I6ICMwMGFmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMzkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQwIHtcXG4gICAgY29sb3I6ICMwMGQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQxIHtcXG4gICAgY29sb3I6ICMwMGQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkNzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQyIHtcXG4gICAgY29sb3I6ICMwMGQ3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQzIHtcXG4gICAgY29sb3I6ICMwMGQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ0IHtcXG4gICAgY29sb3I6ICMwMGQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkN2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ1IHtcXG4gICAgY29sb3I6ICMwMGQ3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ2IHtcXG4gICAgY29sb3I6ICMwMGZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ3IHtcXG4gICAgY29sb3I6ICMwMGZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ4IHtcXG4gICAgY29sb3I6ICMwMGZmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTQ5IHtcXG4gICAgY29sb3I6ICMwMGZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNDkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUwIHtcXG4gICAgY29sb3I6ICMwMGZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUxIHtcXG4gICAgY29sb3I6ICMwMGZmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUyIHtcXG4gICAgY29sb3I6ICM1ZjAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTUzIHtcXG4gICAgY29sb3I6ICM1ZjAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMDVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU0IHtcXG4gICAgY29sb3I6ICM1ZjAwODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU1IHtcXG4gICAgY29sb3I6ICM1ZjAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU2IHtcXG4gICAgY29sb3I6ICM1ZjAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMGQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU3IHtcXG4gICAgY29sb3I6ICM1ZjAwZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWYwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU4IHtcXG4gICAgY29sb3I6ICM1ZjVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTU5IHtcXG4gICAgY29sb3I6ICM1ZjVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYwIHtcXG4gICAgY29sb3I6ICM1ZjVmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYxIHtcXG4gICAgY29sb3I6ICM1ZjVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYyIHtcXG4gICAgY29sb3I6ICM1ZjVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTYzIHtcXG4gICAgY29sb3I6ICM1ZjVmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY0IHtcXG4gICAgY29sb3I6ICM1Zjg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY1IHtcXG4gICAgY29sb3I6ICM1Zjg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4NzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY2IHtcXG4gICAgY29sb3I6ICM1Zjg3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY3IHtcXG4gICAgY29sb3I6ICM1Zjg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY4IHtcXG4gICAgY29sb3I6ICM1Zjg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4N2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTY5IHtcXG4gICAgY29sb3I6ICM1Zjg3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNjkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWY4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcwIHtcXG4gICAgY29sb3I6ICM1ZmFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcxIHtcXG4gICAgY29sb3I6ICM1ZmFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTcyIHtcXG4gICAgY29sb3I6ICM1ZmFmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTczIHtcXG4gICAgY29sb3I6ICM1ZmFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc0IHtcXG4gICAgY29sb3I6ICM1ZmFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc1IHtcXG4gICAgY29sb3I6ICM1ZmFmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc2IHtcXG4gICAgY29sb3I6ICM1ZmQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc3IHtcXG4gICAgY29sb3I6ICM1ZmQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkNzVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc4IHtcXG4gICAgY29sb3I6ICM1ZmQ3ODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTc5IHtcXG4gICAgY29sb3I6ICM1ZmQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItNzkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgwIHtcXG4gICAgY29sb3I6ICM1ZmQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkN2Q3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgxIHtcXG4gICAgY29sb3I6ICM1ZmQ3ZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgyIHtcXG4gICAgY29sb3I6ICM1ZmZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTgzIHtcXG4gICAgY29sb3I6ICM1ZmZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg0IHtcXG4gICAgY29sb3I6ICM1ZmZmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg1IHtcXG4gICAgY29sb3I6ICM1ZmZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg2IHtcXG4gICAgY29sb3I6ICM1ZmZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg3IHtcXG4gICAgY29sb3I6ICM1ZmZmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg4IHtcXG4gICAgY29sb3I6ICM4NzAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTg5IHtcXG4gICAgY29sb3I6ICM4NzAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItODkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMDVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkwIHtcXG4gICAgY29sb3I6ICM4NzAwODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkxIHtcXG4gICAgY29sb3I6ICM4NzAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkyIHtcXG4gICAgY29sb3I6ICM4NzAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMGQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTkzIHtcXG4gICAgY29sb3I6ICM4NzAwZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODcwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk0IHtcXG4gICAgY29sb3I6ICM4NzVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk1IHtcXG4gICAgY29sb3I6ICM4NzVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZjVmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk2IHtcXG4gICAgY29sb3I6ICM4NzVmODc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk3IHtcXG4gICAgY29sb3I6ICM4NzVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk4IHtcXG4gICAgY29sb3I6ICM4NzVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZmQ3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTk5IHtcXG4gICAgY29sb3I6ICM4NzVmZmY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItOTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwMCB7XFxuICAgIGNvbG9yOiAjODc4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwMCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4Nzg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTAxIHtcXG4gICAgY29sb3I6ICM4Nzg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTAxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMDIge1xcbiAgICBjb2xvcjogIzg3ODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMDIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwMyB7XFxuICAgIGNvbG9yOiAjODc4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwMyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4Nzg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTA0IHtcXG4gICAgY29sb3I6ICM4Nzg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTA0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMDUge1xcbiAgICBjb2xvcjogIzg3ODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMDUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODc4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwNiB7XFxuICAgIGNvbG9yOiAjODdhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwNiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2FmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTA3IHtcXG4gICAgY29sb3I6ICM4N2FmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTA3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3YWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMDgge1xcbiAgICBjb2xvcjogIzg3YWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMDgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEwOSB7XFxuICAgIGNvbG9yOiAjODdhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEwOSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2FmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTEwIHtcXG4gICAgY29sb3I6ICM4N2FmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTEwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3YWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMTEge1xcbiAgICBjb2xvcjogIzg3YWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMTEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExMiB7XFxuICAgIGNvbG9yOiAjODdkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTExMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2Q3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTEzIHtcXG4gICAgY29sb3I6ICM4N2Q3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTEzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMTQge1xcbiAgICBjb2xvcjogIzg3ZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMTQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExNSB7XFxuICAgIGNvbG9yOiAjODdkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTExNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2Q3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTE2IHtcXG4gICAgY29sb3I6ICM4N2Q3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTE2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMTcge1xcbiAgICBjb2xvcjogIzg3ZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMTcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTExOCB7XFxuICAgIGNvbG9yOiAjODdmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTExOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2ZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTE5IHtcXG4gICAgY29sb3I6ICM4N2ZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTE5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjAge1xcbiAgICBjb2xvcjogIzg3ZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyMSB7XFxuICAgIGNvbG9yOiAjODdmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEyMSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4N2ZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTIyIHtcXG4gICAgY29sb3I6ICM4N2ZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTIyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzg3ZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjMge1xcbiAgICBjb2xvcjogIzg3ZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjODdmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyNCB7XFxuICAgIGNvbG9yOiAjYWYwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEyNCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTI1IHtcXG4gICAgY29sb3I6ICNhZjAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTI1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmMDA1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjYge1xcbiAgICBjb2xvcjogI2FmMDA4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWYwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEyNyB7XFxuICAgIGNvbG9yOiAjYWYwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEyNyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTI4IHtcXG4gICAgY29sb3I6ICNhZjAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTI4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmMDBkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMjkge1xcbiAgICBjb2xvcjogI2FmMDBmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMjkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWYwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzMCB7XFxuICAgIGNvbG9yOiAjYWY1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzMCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTMxIHtcXG4gICAgY29sb3I6ICNhZjVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTMxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmNWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMzIge1xcbiAgICBjb2xvcjogI2FmNWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMzIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzMyB7XFxuICAgIGNvbG9yOiAjYWY1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzMyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTM0IHtcXG4gICAgY29sb3I6ICNhZjVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTM0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmNWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMzUge1xcbiAgICBjb2xvcjogI2FmNWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMzUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzNiB7XFxuICAgIGNvbG9yOiAjYWY4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzNiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTM3IHtcXG4gICAgY29sb3I6ICNhZjg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTM3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xMzgge1xcbiAgICBjb2xvcjogI2FmODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xMzgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTEzOSB7XFxuICAgIGNvbG9yOiAjYWY4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTEzOSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZjg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQwIHtcXG4gICAgY29sb3I6ICNhZjg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNDEge1xcbiAgICBjb2xvcjogI2FmODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNDEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWY4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0MiB7XFxuICAgIGNvbG9yOiAjYWZhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE0MiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQzIHtcXG4gICAgY29sb3I6ICNhZmFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmYWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNDQge1xcbiAgICBjb2xvcjogI2FmYWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNDQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0NSB7XFxuICAgIGNvbG9yOiAjYWZhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE0NSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQ2IHtcXG4gICAgY29sb3I6ICNhZmFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQ2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmYWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNDcge1xcbiAgICBjb2xvcjogI2FmYWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNDcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE0OCB7XFxuICAgIGNvbG9yOiAjYWZkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE0OCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTQ5IHtcXG4gICAgY29sb3I6ICNhZmQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTQ5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTAge1xcbiAgICBjb2xvcjogI2FmZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1MSB7XFxuICAgIGNvbG9yOiAjYWZkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE1MSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTUyIHtcXG4gICAgY29sb3I6ICNhZmQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTUyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTMge1xcbiAgICBjb2xvcjogI2FmZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1NCB7XFxuICAgIGNvbG9yOiAjYWZmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE1NCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTU1IHtcXG4gICAgY29sb3I6ICNhZmZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTU1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTYge1xcbiAgICBjb2xvcjogI2FmZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE1NyB7XFxuICAgIGNvbG9yOiAjYWZmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE1NyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNhZmZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTU4IHtcXG4gICAgY29sb3I6ICNhZmZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTU4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2FmZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNTkge1xcbiAgICBjb2xvcjogI2FmZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2MCB7XFxuICAgIGNvbG9yOiAjZDcwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2MCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTYxIHtcXG4gICAgY29sb3I6ICNkNzAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTYxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3MDA1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNjIge1xcbiAgICBjb2xvcjogI2Q3MDA4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDcwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2MyB7XFxuICAgIGNvbG9yOiAjZDcwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2MyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTY0IHtcXG4gICAgY29sb3I6ICNkNzAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTY0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3MDBkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNjUge1xcbiAgICBjb2xvcjogI2Q3MDBmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDcwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2NiB7XFxuICAgIGNvbG9yOiAjZDc1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2NiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTY3IHtcXG4gICAgY29sb3I6ICNkNzVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTY3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3NWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNjgge1xcbiAgICBjb2xvcjogI2Q3NWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE2OSB7XFxuICAgIGNvbG9yOiAjZDc1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE2OSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTcwIHtcXG4gICAgY29sb3I6ICNkNzVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTcwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3NWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNzEge1xcbiAgICBjb2xvcjogI2Q3NWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3MiB7XFxuICAgIGNvbG9yOiAjZDc4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE3MiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTczIHtcXG4gICAgY29sb3I6ICNkNzg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTczIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNzQge1xcbiAgICBjb2xvcjogI2Q3ODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3NSB7XFxuICAgIGNvbG9yOiAjZDc4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE3NSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkNzg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTc2IHtcXG4gICAgY29sb3I6ICNkNzg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTc2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xNzcge1xcbiAgICBjb2xvcjogI2Q3ODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xNzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDc4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE3OCB7XFxuICAgIGNvbG9yOiAjZDdhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE3OCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2FmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTc5IHtcXG4gICAgY29sb3I6ICNkN2FmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTc5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3YWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODAge1xcbiAgICBjb2xvcjogI2Q3YWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4MSB7XFxuICAgIGNvbG9yOiAjZDdhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE4MSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2FmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTgyIHtcXG4gICAgY29sb3I6ICNkN2FmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTgyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3YWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODMge1xcbiAgICBjb2xvcjogI2Q3YWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4NCB7XFxuICAgIGNvbG9yOiAjZDdkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE4NCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2Q3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTg1IHtcXG4gICAgY29sb3I6ICNkN2Q3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTg1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODYge1xcbiAgICBjb2xvcjogI2Q3ZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE4NyB7XFxuICAgIGNvbG9yOiAjZDdkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE4NyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2Q3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTg4IHtcXG4gICAgY29sb3I6ICNkN2Q3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTg4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xODkge1xcbiAgICBjb2xvcjogI2Q3ZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xODkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5MCB7XFxuICAgIGNvbG9yOiAjZDdmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5MCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2ZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTkxIHtcXG4gICAgY29sb3I6ICNkN2ZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTkxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xOTIge1xcbiAgICBjb2xvcjogI2Q3ZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xOTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5MyB7XFxuICAgIGNvbG9yOiAjZDdmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5MyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkN2ZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTk0IHtcXG4gICAgY29sb3I6ICNkN2ZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTk0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q3ZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xOTUge1xcbiAgICBjb2xvcjogI2Q3ZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xOTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDdmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5NiB7XFxuICAgIGNvbG9yOiAjZmYwMDAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5NiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMTk3IHtcXG4gICAgY29sb3I6ICNmZjAwNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMTk3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDA1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0xOTgge1xcbiAgICBjb2xvcjogI2ZmMDA4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0xOTgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTE5OSB7XFxuICAgIGNvbG9yOiAjZmYwMGFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTE5OSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjAwIHtcXG4gICAgY29sb3I6ICNmZjAwZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjAwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDBkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMDEge1xcbiAgICBjb2xvcjogI2ZmMDBmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMDEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMGZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwMiB7XFxuICAgIGNvbG9yOiAjZmY1ZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIwMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjVmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjAzIHtcXG4gICAgY29sb3I6ICNmZjVmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjAzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMDQge1xcbiAgICBjb2xvcjogI2ZmNWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMDQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY1Zjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwNSB7XFxuICAgIGNvbG9yOiAjZmY1ZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIwNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjVmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjA2IHtcXG4gICAgY29sb3I6ICNmZjVmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjA2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMDcge1xcbiAgICBjb2xvcjogI2ZmNWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMDcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY1ZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIwOCB7XFxuICAgIGNvbG9yOiAjZmY4NzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIwOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjg3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjA5IHtcXG4gICAgY29sb3I6ICNmZjg3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjA5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmODc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTAge1xcbiAgICBjb2xvcjogI2ZmODc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY4Nzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxMSB7XFxuICAgIGNvbG9yOiAjZmY4N2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIxMSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjg3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjEyIHtcXG4gICAgY29sb3I6ICNmZjg3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjEyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmODdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTMge1xcbiAgICBjb2xvcjogI2ZmODdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY4N2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxNCB7XFxuICAgIGNvbG9yOiAjZmZhZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIxNCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmFmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjE1IHtcXG4gICAgY29sb3I6ICNmZmFmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjE1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTYge1xcbiAgICBjb2xvcjogI2ZmYWY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIxNyB7XFxuICAgIGNvbG9yOiAjZmZhZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIxNyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmFmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjE4IHtcXG4gICAgY29sb3I6ICNmZmFmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjE4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMTkge1xcbiAgICBjb2xvcjogI2ZmYWZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMTkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyMCB7XFxuICAgIGNvbG9yOiAjZmZkNzAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyMCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmQ3MDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjIxIHtcXG4gICAgY29sb3I6ICNmZmQ3NWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjIxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDc1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMjIge1xcbiAgICBjb2xvcjogI2ZmZDc4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMjIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkNzg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyMyB7XFxuICAgIGNvbG9yOiAjZmZkN2FmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyMyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmQ3YWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjI0IHtcXG4gICAgY29sb3I6ICNmZmQ3ZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjI0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDdkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMjUge1xcbiAgICBjb2xvcjogI2ZmZDdmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMjUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkN2ZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyNiB7XFxuICAgIGNvbG9yOiAjZmZmZjAwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyNiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmMDA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjI3IHtcXG4gICAgY29sb3I6ICNmZmZmNWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjI3IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmY1ZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMjgge1xcbiAgICBjb2xvcjogI2ZmZmY4NztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMjgge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZjg3O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIyOSB7XFxuICAgIGNvbG9yOiAjZmZmZmFmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIyOSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmYWY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjMwIHtcXG4gICAgY29sb3I6ICNmZmZmZDc7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjMwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZkNztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMzEge1xcbiAgICBjb2xvcjogI2ZmZmZmZjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMzEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzMiB7XFxuICAgIGNvbG9yOiAjMDgwODA4O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIzMiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwODA4MDg7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjMzIHtcXG4gICAgY29sb3I6ICMxMjEyMTI7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjMzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMzQge1xcbiAgICBjb2xvcjogIzFjMWMxYztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMzQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWMxYzFjO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzNSB7XFxuICAgIGNvbG9yOiAjMjYyNjI2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIzNSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNjI2MjY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjM2IHtcXG4gICAgY29sb3I6ICMzMDMwMzA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjM2IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMwMzAzMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yMzcge1xcbiAgICBjb2xvcjogIzNhM2EzYTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yMzcge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2EzYTNhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTIzOCB7XFxuICAgIGNvbG9yOiAjNDQ0NDQ0O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTIzOCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NDQ0NDQ7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjM5IHtcXG4gICAgY29sb3I6ICM0ZTRlNGU7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjM5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRlNGU0ZTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDAge1xcbiAgICBjb2xvcjogIzU4NTg1ODtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTg1ODU4O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0MSB7XFxuICAgIGNvbG9yOiAjNjI2MjYyO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI0MSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2MjYyNjI7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjQyIHtcXG4gICAgY29sb3I6ICM2YzZjNmM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzZjNmM2YztcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDMge1xcbiAgICBjb2xvcjogIzc2NzY3NjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzY3Njc2O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0NCB7XFxuICAgIGNvbG9yOiAjODA4MDgwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI0NCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MDgwODA7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjQ1IHtcXG4gICAgY29sb3I6ICM4YThhOGE7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQ1IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhhOGE4YTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDYge1xcbiAgICBjb2xvcjogIzk0OTQ5NDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTQ5NDk0O1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI0NyB7XFxuICAgIGNvbG9yOiAjOWU5ZTllO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI0NyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5ZTllOWU7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjQ4IHtcXG4gICAgY29sb3I6ICNhOGE4YTg7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjQ4IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2E4YThhODtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNDkge1xcbiAgICBjb2xvcjogI2IyYjJiMjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNDkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjJiMmIyO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI1MCB7XFxuICAgIGNvbG9yOiAjYmNiY2JjO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI1MCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNiY2JjYmM7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjUxIHtcXG4gICAgY29sb3I6ICNjNmM2YzY7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjUxIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2M2YzZjNjtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNTIge1xcbiAgICBjb2xvcjogI2QwZDBkMDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNTIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBkMGQwO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWNvbG9yLTI1MyB7XFxuICAgIGNvbG9yOiAjZGFkYWRhO1xcbn1cXG5cXG4udGVybWluYWwgLnh0ZXJtLWJnLWNvbG9yLTI1MyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkYWRhZGE7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tY29sb3ItMjU0IHtcXG4gICAgY29sb3I6ICNlNGU0ZTQ7XFxufVxcblxcbi50ZXJtaW5hbCAueHRlcm0tYmctY29sb3ItMjU0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U0ZTRlNDtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1jb2xvci0yNTUge1xcbiAgICBjb2xvcjogI2VlZWVlZTtcXG59XFxuXFxuLnRlcm1pbmFsIC54dGVybS1iZy1jb2xvci0yNTUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34veHRlcm0vc3JjL3h0ZXJtLmNzc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3h0ZXJtLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4veHRlcm0uY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi94dGVybS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi94dGVybS9zcmMveHRlcm0uY3NzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX192dWVfZXhwb3J0c19fLCBfX3Z1ZV9vcHRpb25zX19cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IHt9XG5cbi8qIHN0eWxlcyAqL1xucmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyIXZ1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyP2lkPWRhdGEtdi0xMDdjOWQ3ZCF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1pbmZvLnZ1ZVwiKVxuXG4vKiBzY3JpcHQgKi9cbl9fdnVlX2V4cG9ydHNfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlciF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vdGVzdC1pbmZvLnZ1ZVwiKVxuXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISF2dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtMTA3YzlkN2QhdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdGVzdC1pbmZvLnZ1ZVwiKVxuX192dWVfb3B0aW9uc19fID0gX192dWVfZXhwb3J0c19fID0gX192dWVfZXhwb3J0c19fIHx8IHt9XG5pZiAoXG4gIHR5cGVvZiBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdCA9PT0gXCJvYmplY3RcIiB8fFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIlxuKSB7XG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdFxufVxuaWYgKHR5cGVvZiBfX3Z1ZV9vcHRpb25zX18gPT09IFwiZnVuY3Rpb25cIikge1xuICBfX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9vcHRpb25zX18ub3B0aW9uc1xufVxuXG5fX3Z1ZV9vcHRpb25zX18ucmVuZGVyID0gX192dWVfdGVtcGxhdGVfXy5yZW5kZXJcbl9fdnVlX29wdGlvbnNfXy5zdGF0aWNSZW5kZXJGbnMgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnN0YXRpY1JlbmRlckZuc1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fdnVlX2V4cG9ydHNfX1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX192dWVfZXhwb3J0c19fLCBfX3Z1ZV9vcHRpb25zX19cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IHt9XG5cbi8qIHN0eWxlcyAqL1xucmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyIXZ1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyP2lkPWRhdGEtdi0zZGM4ODNjNSF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC1sb2cudnVlXCIpXG5cbi8qIHNjcmlwdCAqL1xuX192dWVfZXhwb3J0c19fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyIXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi90ZXN0LWxvZy52dWVcIilcblxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/aWQ9ZGF0YS12LTNkYzg4M2M1IXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Rlc3QtbG9nLnZ1ZVwiKVxuX192dWVfb3B0aW9uc19fID0gX192dWVfZXhwb3J0c19fID0gX192dWVfZXhwb3J0c19fIHx8IHt9XG5pZiAoXG4gIHR5cGVvZiBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdCA9PT0gXCJvYmplY3RcIiB8fFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIlxuKSB7XG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdFxufVxuaWYgKHR5cGVvZiBfX3Z1ZV9vcHRpb25zX18gPT09IFwiZnVuY3Rpb25cIikge1xuICBfX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9vcHRpb25zX18ub3B0aW9uc1xufVxuXG5fX3Z1ZV9vcHRpb25zX18ucmVuZGVyID0gX192dWVfdGVtcGxhdGVfXy5yZW5kZXJcbl9fdnVlX29wdGlvbnNfXy5zdGF0aWNSZW5kZXJGbnMgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnN0YXRpY1JlbmRlckZuc1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fdnVlX2V4cG9ydHNfX1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvY29tcG9uZW50cy90ZXN0LWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfX3Z1ZV9leHBvcnRzX18sIF9fdnVlX29wdGlvbnNfX1xudmFyIF9fdnVlX3N0eWxlc19fID0ge31cblxuLyogc3R5bGVzICovXG5yZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXIhdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXI/aWQ9ZGF0YS12LTIwMzZkNTgyIXZ1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LXJ1bm5lci52dWVcIilcblxuLyogc2NyaXB0ICovXG5fX3Z1ZV9leHBvcnRzX18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXIhdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3Rlc3QtcnVubmVyLnZ1ZVwiKVxuXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISF2dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtMjAzNmQ1ODIhdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdGVzdC1ydW5uZXIudnVlXCIpXG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18gfHwge31cbmlmIChcbiAgdHlwZW9mIF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0ID09PSBcIm9iamVjdFwiIHx8XG4gIHR5cGVvZiBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiXG4pIHtcbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0XG59XG5pZiAodHlwZW9mIF9fdnVlX29wdGlvbnNfXyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIF9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX29wdGlvbnNfXy5vcHRpb25zXG59XG5cbl9fdnVlX29wdGlvbnNfXy5yZW5kZXIgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnJlbmRlclxuX192dWVfb3B0aW9uc19fLnN0YXRpY1JlbmRlckZucyA9IF9fdnVlX3RlbXBsYXRlX18uc3RhdGljUmVuZGVyRm5zXG5cbm1vZHVsZS5leHBvcnRzID0gX192dWVfZXhwb3J0c19fXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9fdnVlX2V4cG9ydHNfXywgX192dWVfb3B0aW9uc19fXG52YXIgX192dWVfc3R5bGVzX18gPSB7fVxuXG4vKiBzY3JpcHQgKi9cbl9fdnVlX2V4cG9ydHNfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlciF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vdGVzdC10cmVlLW5vZGUudnVlXCIpXG5cbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIXZ1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP2lkPWRhdGEtdi02NWU0MjNkYyF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi90ZXN0LXRyZWUtbm9kZS52dWVcIilcbl9fdnVlX29wdGlvbnNfXyA9IF9fdnVlX2V4cG9ydHNfXyA9IF9fdnVlX2V4cG9ydHNfXyB8fCB7fVxuaWYgKFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwib2JqZWN0XCIgfHxcbiAgdHlwZW9mIF9fdnVlX2V4cG9ydHNfXy5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCJcbikge1xuX192dWVfb3B0aW9uc19fID0gX192dWVfZXhwb3J0c19fID0gX192dWVfZXhwb3J0c19fLmRlZmF1bHRcbn1cbmlmICh0eXBlb2YgX192dWVfb3B0aW9uc19fID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgX192dWVfb3B0aW9uc19fID0gX192dWVfb3B0aW9uc19fLm9wdGlvbnNcbn1cblxuX192dWVfb3B0aW9uc19fLnJlbmRlciA9IF9fdnVlX3RlbXBsYXRlX18ucmVuZGVyXG5fX3Z1ZV9vcHRpb25zX18uc3RhdGljUmVuZGVyRm5zID0gX192dWVfdGVtcGxhdGVfXy5zdGF0aWNSZW5kZXJGbnNcblxubW9kdWxlLmV4cG9ydHMgPSBfX3Z1ZV9leHBvcnRzX19cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLW5vZGUudnVlXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX192dWVfZXhwb3J0c19fLCBfX3Z1ZV9vcHRpb25zX19cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IHt9XG5cbi8qIHN0eWxlcyAqL1xucmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyIXZ1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyP2lkPWRhdGEtdi01ODgwYjQ2ZCF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC10cmVlLnZ1ZVwiKVxuXG4vKiBzY3JpcHQgKi9cbl9fdnVlX2V4cG9ydHNfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlciF2dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vdGVzdC10cmVlLnZ1ZVwiKVxuXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISF2dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtNTg4MGI0NmQhdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vdGVzdC10cmVlLnZ1ZVwiKVxuX192dWVfb3B0aW9uc19fID0gX192dWVfZXhwb3J0c19fID0gX192dWVfZXhwb3J0c19fIHx8IHt9XG5pZiAoXG4gIHR5cGVvZiBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdCA9PT0gXCJvYmplY3RcIiB8fFxuICB0eXBlb2YgX192dWVfZXhwb3J0c19fLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIlxuKSB7XG5fX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9leHBvcnRzX18gPSBfX3Z1ZV9leHBvcnRzX18uZGVmYXVsdFxufVxuaWYgKHR5cGVvZiBfX3Z1ZV9vcHRpb25zX18gPT09IFwiZnVuY3Rpb25cIikge1xuICBfX3Z1ZV9vcHRpb25zX18gPSBfX3Z1ZV9vcHRpb25zX18ub3B0aW9uc1xufVxuXG5fX3Z1ZV9vcHRpb25zX18ucmVuZGVyID0gX192dWVfdGVtcGxhdGVfXy5yZW5kZXJcbl9fdnVlX29wdGlvbnNfXy5zdGF0aWNSZW5kZXJGbnMgPSBfX3Z1ZV90ZW1wbGF0ZV9fLnN0YXRpY1JlbmRlckZuc1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fdnVlX2V4cG9ydHNfX1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvY29tcG9uZW50cy90ZXN0LXRyZWUudnVlXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O1xuICByZXR1cm4gX2goJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXN0LWluZm9cIlxuICB9LCBbX2goJ3NlbGVjdCcsIHtcbiAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICB2YWx1ZTogKF92bS5zZWxlY3RlZFRlc3RDb25maWdJbmRleCksXG4gICAgICBleHByZXNzaW9uOiBcInNlbGVjdGVkVGVzdENvbmZpZ0luZGV4XCJcbiAgICB9XSxcbiAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICBvbjoge1xuICAgICAgXCJjaGFuZ2VcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5zZWxlY3RlZFRlc3RDb25maWdJbmRleCA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbCgkZXZlbnQudGFyZ2V0Lm9wdGlvbnMsIGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5zZWxlY3RlZFxuICAgICAgICB9KS5tYXAoZnVuY3Rpb24obykge1xuICAgICAgICAgIHZhciB2YWwgPSBcIl92YWx1ZVwiIGluIG8gPyBvLl92YWx1ZSA6IG8udmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHZhbFxuICAgICAgICB9KVswXVxuICAgICAgfVxuICAgIH1cbiAgfSwgW192bS5fbCgoX3ZtLnRlc3RDb25maWdzKSwgZnVuY3Rpb24odGVzdENvbmZpZywgaW5kZXgpIHtcbiAgICByZXR1cm4gX2goJ29wdGlvbicsIHtcbiAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgIFwidmFsdWVcIjogaW5kZXhcbiAgICAgIH1cbiAgICB9LCBbXCJcXG4gICAgICBcIiArIF92bS5fcyh0ZXN0Q29uZmlnLmRpc3BsYXlOYW1lKSArIFwiXFxuICAgIFwiXSlcbiAgfSldKSwgXCIgXCIsIF9oKCdidXR0b24nLCB7XG4gICAgcmVmOiBcInJ1bkJ1dHRvblwiLFxuICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdCBmYSBmYS1wbGF5XCIsXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLnJ1bkN1cnJlbnRUZXN0Q29uZmlnXG4gICAgfVxuICB9KSwgXCIgXCIsIF9oKCdidXR0b24nLCB7XG4gICAgcmVmOiBcInJ1bkJ1dHRvblwiLFxuICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdCBmYSBmYS10aW1lcyB0ZXh0LWVycm9yXCIsXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLnJ1bkZhaWxlZFRlc3RzXG4gICAgfVxuICB9KSwgXCIgXCIsIF9oKCdidXR0b24nLCB7XG4gICAgcmVmOiBcInNlYXJjaEJ1dHRvblwiLFxuICAgIHN0YXRpY0NsYXNzOiBcImJ0biBidG4tZGVmYXVsdCBmYSBmYS1zZWFyY2hcIixcbiAgICBvbjoge1xuICAgICAgXCJjbGlja1wiOiBfdm0ubG9hZFRlc3RDb25maWdzXG4gICAgfVxuICB9KSwgXCIgXCIsIF9oKCdzcGFuJywgW1wiUnVuczogXCIgKyBfdm0uX3MoX3ZtLnRlc3RSZXN1bHRzLnRlc3RzU3RhcnRlZCkgKyBcIi9cIiArIF92bS5fcyhfdm0udGVzdFJlc3VsdHMudGVzdHNUb3RhbCldKSwgXCIgXCIsIF9oKCdzcGFuJywgW1wiRXJyb3JzOiBcIiArIF92bS5fcyhfdm0udGVzdFJlc3VsdHMudGVzdHNFcnJvcildKSwgXCIgXCIsIF9oKCdzcGFuJywgW1wiRmFpbHVyZXM6IFwiICsgX3ZtLl9zKF92bS50ZXN0UmVzdWx0cy50ZXN0c0ZhaWxlZCldKSwgXCIgXCIsIF9oKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGVzdC1wcm9ncmVzc1wiXG4gIH0sIFtfaCgnZGl2Jywge1xuICAgIGNsYXNzOiBfdm0ucHJvZ3Jlc3NDbGFzcyxcbiAgICBzdHlsZTogKHtcbiAgICAgIHdpZHRoOiBfdm0ucHJvZ3Jlc3MgKyAnJSdcbiAgICB9KVxuICB9KV0pXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIuanM/aWQ9ZGF0YS12LTEwN2M5ZDdkIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9saWIvY29tcG9uZW50cy90ZXN0LWluZm8udnVlXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O1xuICByZXR1cm4gX2goJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXN0LXJ1bm5lclwiXG4gIH0sIFtfaCgnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRlc3QtcnVubmVyLXJvd1wiXG4gIH0sIFtfaCgnVGVzdEluZm8nKV0pLCBcIiBcIiwgX2goJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXN0LXJ1bm5lci1yb3dcIlxuICB9LCBbX2goJ1Rlc3RUcmVlJyksIFwiIFwiLCBfaCgnVGVzdExvZycpXSldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtMjAzNmQ1ODIhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDtcbiAgcmV0dXJuIF9oKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGVzdC1sb2dcIlxuICB9LCBbX2goJ2RpdicsIHtcbiAgICByZWY6IFwidGVybWluYWxcIixcbiAgICBzdGF0aWNTdHlsZToge1xuICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiXG4gICAgfVxuICB9KV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyLmpzP2lkPWRhdGEtdi0zZGM4ODNjNSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbGliL2NvbXBvbmVudHMvdGVzdC1sb2cudnVlXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O1xuICByZXR1cm4gX2goJ2RpdicsIHtcbiAgICByZWY6IFwiY29udGVudFwiLFxuICAgIHN0YXRpY0NsYXNzOiBcInRlc3QtdHJlZSB0cmVlLXZpZXctcmVzaXplciB0b29sLXBhbmVsXCJcbiAgfSwgW19oKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidHJlZS12aWV3LXNjcm9sbGVyIG9yZGVyLS1jZW50ZXJcIlxuICB9LCBbX2goJ29sJywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRyZWUtdmlldyBmdWxsLW1lbnUgbGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlbiBmb2N1c2FibGUtcGFuZWxcIlxuICB9LCBbX3ZtLl9sKChfdm0udGVzdFRyZWUuY2hpbGRJdGVtcyksIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICByZXR1cm4gX2goJ1Rlc3RUcmVlTm9kZScsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwiaXRlbVwiOiBpdGVtXG4gICAgICB9XG4gICAgfSlcbiAgfSldKV0pLCBcIiBcIiwgX2goJ2RpdicsIHtcbiAgICByZWY6IFwiaGFuZGxlXCIsXG4gICAgc3RhdGljQ2xhc3M6IFwidHJlZS12aWV3LXJlc2l6ZS1oYW5kbGVcIixcbiAgICBzdGF0aWNTdHlsZToge1xuICAgICAgXCJyaWdodFwiOiBcIi01cHhcIlxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwibW91c2Vkb3duXCI6IF92bS5zdGFydFJlc2l6ZVxuICAgIH1cbiAgfSldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtNTg4MGI0NmQhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS52dWVcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7XG4gIHJldHVybiBfaCgnbGknLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiZW50cnlcIixcbiAgICBjbGFzczogX3ZtLmNsYXNzT2JqZWN0LFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIF92bS5vbkNsaWNrKCRldmVudClcbiAgICAgIH0sXG4gICAgICBcImRibGNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIF92bS5vbkRibENsaWNrKCRldmVudClcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtfaCgnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlciBsaXN0LWl0ZW1cIixcbiAgICBjbGFzczoge1xuICAgICAgJ3Rlc3QtZmFpbGVkJzogX3ZtLml0ZW0uaGFzRmFpbGVkXG4gICAgfVxuICB9LCBbX2goJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibmFtZSBpY29uXCIsXG4gICAgY2xhc3M6IF92bS5pY29uQ2xhc3NcbiAgfSksIFwiIFwiLCBfaCgnc3BhbicsIFtfdm0uX3MoX3ZtLml0ZW0ubmFtZSldKSwgXCIgXCIsIChfdm0uaXRlbS5kdXJhdGlvbiA+IDAuMCkgPyBfaCgnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXN0LXRpbWVcIlxuICB9LCBbXCLCoChcIiArIF92bS5fcyhfdm0uaXRlbS5kdXJhdGlvbi50b0ZpeGVkKDMpKSArIFwicylcIl0pIDogX3ZtLl9lKCldKSwgXCIgXCIsIF9oKCdvbCcsIHtcbiAgICBzdGF0aWNDbGFzczogXCJlbnRyaWVzIGxpc3QtdHJlZVwiXG4gIH0sIFtfdm0uX2woKF92bS5pdGVtLmNoaWxkSXRlbXMpLCBmdW5jdGlvbihjaGlsZCkge1xuICAgIHJldHVybiBfaCgnVGVzdFRyZWVOb2RlJywge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJpdGVtXCI6IGNoaWxkXG4gICAgICB9XG4gICAgfSlcbiAgfSldKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyLmpzP2lkPWRhdGEtdi02NWU0MjNkYyEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbGliL2NvbXBvbmVudHMvdGVzdC10cmVlLW5vZGUudnVlXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMTA3YzlkN2QhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtaW5mby52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMTA3YzlkN2QhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtaW5mby52dWVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTEwN2M5ZDdkIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LWluZm8udnVlXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlciEuL34vY3NzLWxvYWRlciEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTEwN2M5ZDdkIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbGliL2NvbXBvbmVudHMvdGVzdC1pbmZvLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTIwMzZkNTgyIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LXJ1bm5lci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMjAzNmQ1ODIhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtcnVubmVyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtMjAzNmQ1ODIhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtcnVubmVyLnZ1ZVwiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIhLi9+L2Nzcy1sb2FkZXIhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0yMDM2ZDU4MiEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtcnVubmVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTNkYzg4M2M1IS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LWxvZy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtM2RjODgzYzUhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtbG9nLnZ1ZVwiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtM2RjODgzYzUhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Rlc3QtbG9nLnZ1ZVwiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIhLi9+L2Nzcy1sb2FkZXIhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi0zZGM4ODNjNSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtbG9nLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTU4ODBiNDZkIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LXRyZWUudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTU4ODBiNDZkIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXN0LXRyZWUudnVlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi01ODgwYjQ2ZCEuLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGVzdC10cmVlLnZ1ZVwiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIhLi9+L2Nzcy1sb2FkZXIhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi01ODgwYjQ2ZCEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xpYi9jb21wb25lbnRzL3Rlc3QtdHJlZS52dWVcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwianF1ZXJ5XCJcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzLXlhbWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqcy15YW1sXCJcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwib3NcIlxuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieHRlcm1cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ4dGVybVwiXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9