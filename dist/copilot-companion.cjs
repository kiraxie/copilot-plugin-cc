#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/vscode-jsonrpc/lib/common/is.js
var require_is = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/is.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.stringArray = exports2.array = exports2.func = exports2.error = exports2.number = exports2.string = exports2.boolean = void 0;
    function boolean(value) {
      return value === true || value === false;
    }
    exports2.boolean = boolean;
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports2.string = string;
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports2.number = number;
    function error(value) {
      return value instanceof Error;
    }
    exports2.error = error;
    function func(value) {
      return typeof value === "function";
    }
    exports2.func = func;
    function array(value) {
      return Array.isArray(value);
    }
    exports2.array = array;
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    exports2.stringArray = stringArray;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messages.js
var require_messages = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messages.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Message = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType = exports2.RequestType0 = exports2.AbstractMessageSignature = exports2.ParameterStructures = exports2.ResponseError = exports2.ErrorCodes = void 0;
    var is = require_is();
    var ErrorCodes;
    (function(ErrorCodes2) {
      ErrorCodes2.ParseError = -32700;
      ErrorCodes2.InvalidRequest = -32600;
      ErrorCodes2.MethodNotFound = -32601;
      ErrorCodes2.InvalidParams = -32602;
      ErrorCodes2.InternalError = -32603;
      ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
      ErrorCodes2.serverErrorStart = -32099;
      ErrorCodes2.MessageWriteError = -32099;
      ErrorCodes2.MessageReadError = -32098;
      ErrorCodes2.PendingResponseRejected = -32097;
      ErrorCodes2.ConnectionInactive = -32096;
      ErrorCodes2.ServerNotInitialized = -32002;
      ErrorCodes2.UnknownErrorCode = -32001;
      ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32e3;
      ErrorCodes2.serverErrorEnd = -32e3;
    })(ErrorCodes || (exports2.ErrorCodes = ErrorCodes = {}));
    var ResponseError2 = class _ResponseError extends Error {
      constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, _ResponseError.prototype);
      }
      toJson() {
        const result = {
          code: this.code,
          message: this.message
        };
        if (this.data !== void 0) {
          result.data = this.data;
        }
        return result;
      }
    };
    exports2.ResponseError = ResponseError2;
    var ParameterStructures = class _ParameterStructures {
      constructor(kind) {
        this.kind = kind;
      }
      static is(value) {
        return value === _ParameterStructures.auto || value === _ParameterStructures.byName || value === _ParameterStructures.byPosition;
      }
      toString() {
        return this.kind;
      }
    };
    exports2.ParameterStructures = ParameterStructures;
    ParameterStructures.auto = new ParameterStructures("auto");
    ParameterStructures.byPosition = new ParameterStructures("byPosition");
    ParameterStructures.byName = new ParameterStructures("byName");
    var AbstractMessageSignature = class {
      constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
      }
      get parameterStructures() {
        return ParameterStructures.auto;
      }
    };
    exports2.AbstractMessageSignature = AbstractMessageSignature;
    var RequestType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.RequestType0 = RequestType0;
    var RequestType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType = RequestType;
    var RequestType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.RequestType1 = RequestType1;
    var RequestType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.RequestType2 = RequestType2;
    var RequestType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.RequestType3 = RequestType3;
    var RequestType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.RequestType4 = RequestType4;
    var RequestType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.RequestType5 = RequestType5;
    var RequestType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.RequestType6 = RequestType6;
    var RequestType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.RequestType7 = RequestType7;
    var RequestType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.RequestType8 = RequestType8;
    var RequestType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.RequestType9 = RequestType9;
    var NotificationType = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType = NotificationType;
    var NotificationType0 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 0);
      }
    };
    exports2.NotificationType0 = NotificationType0;
    var NotificationType1 = class extends AbstractMessageSignature {
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports2.NotificationType1 = NotificationType1;
    var NotificationType2 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 2);
      }
    };
    exports2.NotificationType2 = NotificationType2;
    var NotificationType3 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 3);
      }
    };
    exports2.NotificationType3 = NotificationType3;
    var NotificationType4 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 4);
      }
    };
    exports2.NotificationType4 = NotificationType4;
    var NotificationType5 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 5);
      }
    };
    exports2.NotificationType5 = NotificationType5;
    var NotificationType6 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 6);
      }
    };
    exports2.NotificationType6 = NotificationType6;
    var NotificationType7 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 7);
      }
    };
    exports2.NotificationType7 = NotificationType7;
    var NotificationType8 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 8);
      }
    };
    exports2.NotificationType8 = NotificationType8;
    var NotificationType9 = class extends AbstractMessageSignature {
      constructor(method) {
        super(method, 9);
      }
    };
    exports2.NotificationType9 = NotificationType9;
    var Message;
    (function(Message2) {
      function isRequest(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
      }
      Message2.isRequest = isRequest;
      function isNotification(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && message.id === void 0;
      }
      Message2.isNotification = isNotification;
      function isResponse(message) {
        const candidate = message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
      }
      Message2.isResponse = isResponse;
    })(Message || (exports2.Message = Message = {}));
  }
});

// node_modules/vscode-jsonrpc/lib/common/linkedMap.js
var require_linkedMap = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LRUCache = exports2.LinkedMap = exports2.Touch = void 0;
    var Touch;
    (function(Touch2) {
      Touch2.None = 0;
      Touch2.First = 1;
      Touch2.AsOld = Touch2.First;
      Touch2.Last = 2;
      Touch2.AsNew = Touch2.Last;
    })(Touch || (exports2.Touch = Touch = {}));
    var LinkedMap = class {
      constructor() {
        this[_a] = "LinkedMap";
        this._map = /* @__PURE__ */ new Map();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state = 0;
      }
      clear() {
        this._map.clear();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state++;
      }
      isEmpty() {
        return !this._head && !this._tail;
      }
      get size() {
        return this._size;
      }
      get first() {
        return this._head?.value;
      }
      get last() {
        return this._tail?.value;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        if (touch !== Touch.None) {
          this.touch(item, touch);
        }
        return item.value;
      }
      set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
          item.value = value;
          if (touch !== Touch.None) {
            this.touch(item, touch);
          }
        } else {
          item = { key, value, next: void 0, previous: void 0 };
          switch (touch) {
            case Touch.None:
              this.addItemLast(item);
              break;
            case Touch.First:
              this.addItemFirst(item);
              break;
            case Touch.Last:
              this.addItemLast(item);
              break;
            default:
              this.addItemLast(item);
              break;
          }
          this._map.set(key, item);
          this._size++;
        }
        return this;
      }
      delete(key) {
        return !!this.remove(key);
      }
      remove(key) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      shift() {
        if (!this._head && !this._tail) {
          return void 0;
        }
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
          if (thisArg) {
            callbackfn.bind(thisArg)(current.value, current.key, this);
          } else {
            callbackfn(current.value, current.key, this);
          }
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          current = current.next;
        }
      }
      keys() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.key, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      values() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.value, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      entries() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: [current.key, current.value], done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      [(_a = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
      }
      trimOld(newSize) {
        if (newSize >= this.size) {
          return;
        }
        if (newSize === 0) {
          this.clear();
          return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
          this._map.delete(current.key);
          current = current.next;
          currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
          current.previous = void 0;
        }
        this._state++;
      }
      addItemFirst(item) {
        if (!this._head && !this._tail) {
          this._tail = item;
        } else if (!this._head) {
          throw new Error("Invalid list");
        } else {
          item.next = this._head;
          this._head.previous = item;
        }
        this._head = item;
        this._state++;
      }
      addItemLast(item) {
        if (!this._head && !this._tail) {
          this._head = item;
        } else if (!this._tail) {
          throw new Error("Invalid list");
        } else {
          item.previous = this._tail;
          this._tail.next = item;
        }
        this._tail = item;
        this._state++;
      }
      removeItem(item) {
        if (item === this._head && item === this._tail) {
          this._head = void 0;
          this._tail = void 0;
        } else if (item === this._head) {
          if (!item.next) {
            throw new Error("Invalid list");
          }
          item.next.previous = void 0;
          this._head = item.next;
        } else if (item === this._tail) {
          if (!item.previous) {
            throw new Error("Invalid list");
          }
          item.previous.next = void 0;
          this._tail = item.previous;
        } else {
          const next = item.next;
          const previous = item.previous;
          if (!next || !previous) {
            throw new Error("Invalid list");
          }
          next.previous = previous;
          previous.next = next;
        }
        item.next = void 0;
        item.previous = void 0;
        this._state++;
      }
      touch(item, touch) {
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        if (touch !== Touch.First && touch !== Touch.Last) {
          return;
        }
        if (touch === Touch.First) {
          if (item === this._head) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._tail) {
            previous.next = void 0;
            this._tail = previous;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.previous = void 0;
          item.next = this._head;
          this._head.previous = item;
          this._head = item;
          this._state++;
        } else if (touch === Touch.Last) {
          if (item === this._tail) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._head) {
            next.previous = void 0;
            this._head = next;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.next = void 0;
          item.previous = this._tail;
          this._tail.next = item;
          this._tail = item;
          this._state++;
        }
      }
      toJSON() {
        const data = [];
        this.forEach((value, key) => {
          data.push([key, value]);
        });
        return data;
      }
      fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
          this.set(key, value);
        }
      }
    };
    exports2.LinkedMap = LinkedMap;
    var LRUCache = class extends LinkedMap {
      constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
      }
      get limit() {
        return this._limit;
      }
      set limit(limit) {
        this._limit = limit;
        this.checkTrim();
      }
      get ratio() {
        return this._ratio;
      }
      set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
      }
      get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
      }
      peek(key) {
        return super.get(key, Touch.None);
      }
      set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
      }
      checkTrim() {
        if (this.size > this._limit) {
          this.trimOld(Math.round(this._limit * this._ratio));
        }
      }
    };
    exports2.LRUCache = LRUCache;
  }
});

// node_modules/vscode-jsonrpc/lib/common/disposable.js
var require_disposable = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/disposable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Disposable = void 0;
    var Disposable;
    (function(Disposable2) {
      function create(func) {
        return {
          dispose: func
        };
      }
      Disposable2.create = create;
    })(Disposable || (exports2.Disposable = Disposable = {}));
  }
});

// node_modules/vscode-jsonrpc/lib/common/ral.js
var require_ral = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/ral.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var _ral;
    function RAL() {
      if (_ral === void 0) {
        throw new Error(`No runtime abstraction layer installed`);
      }
      return _ral;
    }
    (function(RAL2) {
      function install(ral) {
        if (ral === void 0) {
          throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
      }
      RAL2.install = install;
    })(RAL || (RAL = {}));
    exports2.default = RAL;
  }
});

// node_modules/vscode-jsonrpc/lib/common/events.js
var require_events = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Emitter = exports2.Event = void 0;
    var ral_1 = require_ral();
    var Event;
    (function(Event2) {
      const _disposable = { dispose() {
      } };
      Event2.None = function() {
        return _disposable;
      };
    })(Event || (exports2.Event = Event = {}));
    var CallbackList = class {
      add(callback, context = null, bucket) {
        if (!this._callbacks) {
          this._callbacks = [];
          this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
          bucket.push({ dispose: () => this.remove(callback, context) });
        }
      }
      remove(callback, context = null) {
        if (!this._callbacks) {
          return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
          if (this._callbacks[i] === callback) {
            if (this._contexts[i] === context) {
              this._callbacks.splice(i, 1);
              this._contexts.splice(i, 1);
              return;
            } else {
              foundCallbackWithDifferentContext = true;
            }
          }
        }
        if (foundCallbackWithDifferentContext) {
          throw new Error("When adding a listener with a context, you should remove it with the same context");
        }
      }
      invoke(...args) {
        if (!this._callbacks) {
          return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
          try {
            ret.push(callbacks[i].apply(contexts[i], args));
          } catch (e) {
            (0, ral_1.default)().console.error(e);
          }
        }
        return ret;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        this._callbacks = void 0;
        this._contexts = void 0;
      }
    };
    var Emitter = class _Emitter {
      constructor(_options) {
        this._options = _options;
      }
      /**
       * For the public to allow to subscribe
       * to events from this Emitter
       */
      get event() {
        if (!this._event) {
          this._event = (listener, thisArgs, disposables) => {
            if (!this._callbacks) {
              this._callbacks = new CallbackList();
            }
            if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
              this._options.onFirstListenerAdd(this);
            }
            this._callbacks.add(listener, thisArgs);
            const result = {
              dispose: () => {
                if (!this._callbacks) {
                  return;
                }
                this._callbacks.remove(listener, thisArgs);
                result.dispose = _Emitter._noop;
                if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                  this._options.onLastListenerRemove(this);
                }
              }
            };
            if (Array.isArray(disposables)) {
              disposables.push(result);
            }
            return result;
          };
        }
        return this._event;
      }
      /**
       * To be kept private to fire an event to
       * subscribers
       */
      fire(event) {
        if (this._callbacks) {
          this._callbacks.invoke.call(this._callbacks, event);
        }
      }
      dispose() {
        if (this._callbacks) {
          this._callbacks.dispose();
          this._callbacks = void 0;
        }
      }
    };
    exports2.Emitter = Emitter;
    Emitter._noop = function() {
    };
  }
});

// node_modules/vscode-jsonrpc/lib/common/cancellation.js
var require_cancellation = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/cancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CancellationTokenSource = exports2.CancellationToken = void 0;
    var ral_1 = require_ral();
    var Is = require_is();
    var events_1 = require_events();
    var CancellationToken;
    (function(CancellationToken2) {
      CancellationToken2.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
      });
      CancellationToken2.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
      });
      function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken2.None || candidate === CancellationToken2.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
      }
      CancellationToken2.is = is;
    })(CancellationToken || (exports2.CancellationToken = CancellationToken = {}));
    var shortcutEvent = Object.freeze(function(callback, context) {
      const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
      return { dispose() {
        handle.dispose();
      } };
    });
    var MutableToken = class {
      constructor() {
        this._isCancelled = false;
      }
      cancel() {
        if (!this._isCancelled) {
          this._isCancelled = true;
          if (this._emitter) {
            this._emitter.fire(void 0);
            this.dispose();
          }
        }
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        if (this._isCancelled) {
          return shortcutEvent;
        }
        if (!this._emitter) {
          this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
      }
      dispose() {
        if (this._emitter) {
          this._emitter.dispose();
          this._emitter = void 0;
        }
      }
    };
    var CancellationTokenSource = class {
      get token() {
        if (!this._token) {
          this._token = new MutableToken();
        }
        return this._token;
      }
      cancel() {
        if (!this._token) {
          this._token = CancellationToken.Cancelled;
        } else {
          this._token.cancel();
        }
      }
      dispose() {
        if (!this._token) {
          this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      }
    };
    exports2.CancellationTokenSource = CancellationTokenSource;
  }
});

// node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js
var require_sharedArrayCancellation = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SharedArrayReceiverStrategy = exports2.SharedArraySenderStrategy = void 0;
    var cancellation_1 = require_cancellation();
    var CancellationState;
    (function(CancellationState2) {
      CancellationState2.Continue = 0;
      CancellationState2.Cancelled = 1;
    })(CancellationState || (CancellationState = {}));
    var SharedArraySenderStrategy = class {
      constructor() {
        this.buffers = /* @__PURE__ */ new Map();
      }
      enableCancellation(request) {
        if (request.id === null) {
          return;
        }
        const buffer = new SharedArrayBuffer(4);
        const data = new Int32Array(buffer, 0, 1);
        data[0] = CancellationState.Continue;
        this.buffers.set(request.id, buffer);
        request.$cancellationData = buffer;
      }
      async sendCancellation(_conn, id) {
        const buffer = this.buffers.get(id);
        if (buffer === void 0) {
          return;
        }
        const data = new Int32Array(buffer, 0, 1);
        Atomics.store(data, 0, CancellationState.Cancelled);
      }
      cleanup(id) {
        this.buffers.delete(id);
      }
      dispose() {
        this.buffers.clear();
      }
    };
    exports2.SharedArraySenderStrategy = SharedArraySenderStrategy;
    var SharedArrayBufferCancellationToken = class {
      constructor(buffer) {
        this.data = new Int32Array(buffer, 0, 1);
      }
      get isCancellationRequested() {
        return Atomics.load(this.data, 0) === CancellationState.Cancelled;
      }
      get onCancellationRequested() {
        throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
      }
    };
    var SharedArrayBufferCancellationTokenSource = class {
      constructor(buffer) {
        this.token = new SharedArrayBufferCancellationToken(buffer);
      }
      cancel() {
      }
      dispose() {
      }
    };
    var SharedArrayReceiverStrategy = class {
      constructor() {
        this.kind = "request";
      }
      createCancellationTokenSource(request) {
        const buffer = request.$cancellationData;
        if (buffer === void 0) {
          return new cancellation_1.CancellationTokenSource();
        }
        return new SharedArrayBufferCancellationTokenSource(buffer);
      }
    };
    exports2.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
  }
});

// node_modules/vscode-jsonrpc/lib/common/semaphore.js
var require_semaphore = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/semaphore.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Semaphore = void 0;
    var ral_1 = require_ral();
    var Semaphore = class {
      constructor(capacity = 1) {
        if (capacity <= 0) {
          throw new Error("Capacity must be greater than 0");
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
      }
      lock(thunk) {
        return new Promise((resolve4, reject) => {
          this._waiting.push({ thunk, resolve: resolve4, reject });
          this.runNext();
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
          throw new Error(`To many thunks active`);
        }
        try {
          const result = next.thunk();
          if (result instanceof Promise) {
            result.then((value) => {
              this._active--;
              next.resolve(value);
              this.runNext();
            }, (err) => {
              this._active--;
              next.reject(err);
              this.runNext();
            });
          } else {
            this._active--;
            next.resolve(result);
            this.runNext();
          }
        } catch (err) {
          this._active--;
          next.reject(err);
          this.runNext();
        }
      }
    };
    exports2.Semaphore = Semaphore;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageReader.js
var require_messageReader = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageReader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = void 0;
    var ral_1 = require_ral();
    var Is = require_is();
    var events_1 = require_events();
    var semaphore_1 = require_semaphore();
    var MessageReader;
    (function(MessageReader2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) && Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
      }
      MessageReader2.is = is;
    })(MessageReader || (exports2.MessageReader = MessageReader = {}));
    var AbstractMessageReader = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error) {
        this.errorEmitter.fire(this.asError(error));
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      get onPartialMessage() {
        return this.partialMessageEmitter.event;
      }
      firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageReader = AbstractMessageReader;
    var ResolvedMessageReaderOptions;
    (function(ResolvedMessageReaderOptions2) {
      function fromOptions(options) {
        let charset;
        let result;
        let contentDecoder;
        const contentDecoders = /* @__PURE__ */ new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = /* @__PURE__ */ new Map();
        if (options === void 0 || typeof options === "string") {
          charset = options ?? "utf-8";
        } else {
          charset = options.charset ?? "utf-8";
          if (options.contentDecoder !== void 0) {
            contentDecoder = options.contentDecoder;
            contentDecoders.set(contentDecoder.name, contentDecoder);
          }
          if (options.contentDecoders !== void 0) {
            for (const decoder of options.contentDecoders) {
              contentDecoders.set(decoder.name, decoder);
            }
          }
          if (options.contentTypeDecoder !== void 0) {
            contentTypeDecoder = options.contentTypeDecoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
          }
          if (options.contentTypeDecoders !== void 0) {
            for (const decoder of options.contentTypeDecoders) {
              contentTypeDecoders.set(decoder.name, decoder);
            }
          }
        }
        if (contentTypeDecoder === void 0) {
          contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
          contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
      }
      ResolvedMessageReaderOptions2.fromOptions = fromOptions;
    })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
    var ReadableStreamMessageReader = class extends AbstractMessageReader {
      constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 1e4;
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.readSemaphore = new semaphore_1.Semaphore(1);
      }
      set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
      }
      get partialMessageTimeout() {
        return this._partialMessageTimeout;
      }
      listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = void 0;
        this.callback = callback;
        const result = this.readable.onData((data) => {
          this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
      }
      onData(data) {
        try {
          this.buffer.append(data);
          while (true) {
            if (this.nextMessageLength === -1) {
              const headers = this.buffer.tryReadHeaders(true);
              if (!headers) {
                return;
              }
              const contentLength = headers.get("content-length");
              if (!contentLength) {
                this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(headers))}`));
                return;
              }
              const length = parseInt(contentLength);
              if (isNaN(length)) {
                this.fireError(new Error(`Content-Length value must be a number. Got ${contentLength}`));
                return;
              }
              this.nextMessageLength = length;
            }
            const body = this.buffer.tryReadBody(this.nextMessageLength);
            if (body === void 0) {
              this.setPartialMessageTimer();
              return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            this.readSemaphore.lock(async () => {
              const bytes = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(body) : body;
              const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
              this.callback(message);
            }).catch((error) => {
              this.fireError(error);
            });
          }
        } catch (error) {
          this.fireError(error);
        }
      }
      clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
          this.partialMessageTimer.dispose();
          this.partialMessageTimer = void 0;
        }
      }
      setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
          return;
        }
        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
          this.partialMessageTimer = void 0;
          if (token === this.messageToken) {
            this.firePartialMessage({ messageToken: token, waitingTime: timeout });
            this.setPartialMessageTimer();
          }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
      }
    };
    exports2.ReadableStreamMessageReader = ReadableStreamMessageReader;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageWriter.js
var require_messageWriter = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = void 0;
    var ral_1 = require_ral();
    var Is = require_is();
    var semaphore_1 = require_semaphore();
    var events_1 = require_events();
    var ContentLength = "Content-Length: ";
    var CRLF = "\r\n";
    var MessageWriter;
    (function(MessageWriter2) {
      function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) && Is.func(candidate.onError) && Is.func(candidate.write);
      }
      MessageWriter2.is = is;
    })(MessageWriter || (exports2.MessageWriter = MessageWriter = {}));
    var AbstractMessageWriter = class {
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports2.AbstractMessageWriter = AbstractMessageWriter;
    var ResolvedMessageWriterOptions;
    (function(ResolvedMessageWriterOptions2) {
      function fromOptions(options) {
        if (options === void 0 || typeof options === "string") {
          return { charset: options ?? "utf-8", contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
        } else {
          return { charset: options.charset ?? "utf-8", contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
        }
      }
      ResolvedMessageWriterOptions2.fromOptions = fromOptions;
    })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
    var WriteableStreamMessageWriter = class extends AbstractMessageWriter {
      constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore_1.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
      }
      async write(msg) {
        return this.writeSemaphore.lock(async () => {
          const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
            if (this.options.contentEncoder !== void 0) {
              return this.options.contentEncoder.encode(buffer);
            } else {
              return buffer;
            }
          });
          return payload.then((buffer) => {
            const headers = [];
            headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
            headers.push(CRLF);
            return this.doWrite(msg, headers, buffer);
          }, (error) => {
            this.fireError(error);
            throw error;
          });
        });
      }
      async doWrite(msg, headers, data) {
        try {
          await this.writable.write(headers.join(""), "ascii");
          return this.writable.write(data);
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
        this.writable.end();
      }
    };
    exports2.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageBuffer.js
var require_messageBuffer = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AbstractMessageBuffer = void 0;
    var CR = 13;
    var LF = 10;
    var CRLF = "\r\n";
    var AbstractMessageBuffer = class {
      constructor(encoding = "utf-8") {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
      }
      get encoding() {
        return this._encoding;
      }
      append(chunk) {
        const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
      }
      tryReadHeaders(lowerCaseKeys = false) {
        if (this._chunks.length === 0) {
          return void 0;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
          const chunk = this._chunks[chunkIndex];
          offset = 0;
          column: while (offset < chunk.length) {
            const value = chunk[offset];
            switch (value) {
              case CR:
                switch (state) {
                  case 0:
                    state = 1;
                    break;
                  case 2:
                    state = 3;
                    break;
                  default:
                    state = 0;
                }
                break;
              case LF:
                switch (state) {
                  case 1:
                    state = 2;
                    break;
                  case 3:
                    state = 4;
                    offset++;
                    break row;
                  default:
                    state = 0;
                }
                break;
              default:
                state = 0;
            }
            offset++;
          }
          chunkBytesRead += chunk.byteLength;
          chunkIndex++;
        }
        if (state !== 4) {
          return void 0;
        }
        const buffer = this._read(chunkBytesRead + offset);
        const result = /* @__PURE__ */ new Map();
        const headers = this.toString(buffer, "ascii").split(CRLF);
        if (headers.length < 2) {
          return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
          const header = headers[i];
          const index = header.indexOf(":");
          if (index === -1) {
            throw new Error(`Message header must separate key and value using ':'
${header}`);
          }
          const key = header.substr(0, index);
          const value = header.substr(index + 1).trim();
          result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
        }
        return result;
      }
      tryReadBody(length) {
        if (this._totalLength < length) {
          return void 0;
        }
        return this._read(length);
      }
      get numberOfBytes() {
        return this._totalLength;
      }
      _read(byteCount) {
        if (byteCount === 0) {
          return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
          throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
          const chunk = this._chunks[0];
          this._chunks.shift();
          this._totalLength -= byteCount;
          return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
          const chunk = this._chunks[0];
          const result2 = this.asNative(chunk, byteCount);
          this._chunks[0] = chunk.slice(byteCount);
          this._totalLength -= byteCount;
          return result2;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        let chunkIndex = 0;
        while (byteCount > 0) {
          const chunk = this._chunks[chunkIndex];
          if (chunk.byteLength > byteCount) {
            const chunkPart = chunk.slice(0, byteCount);
            result.set(chunkPart, resultOffset);
            resultOffset += byteCount;
            this._chunks[chunkIndex] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            byteCount -= byteCount;
          } else {
            result.set(chunk, resultOffset);
            resultOffset += chunk.byteLength;
            this._chunks.shift();
            this._totalLength -= chunk.byteLength;
            byteCount -= chunk.byteLength;
          }
        }
        return result;
      }
    };
    exports2.AbstractMessageBuffer = AbstractMessageBuffer;
  }
});

// node_modules/vscode-jsonrpc/lib/common/connection.js
var require_connection = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/connection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.ConnectionOptions = exports2.MessageStrategy = exports2.CancellationStrategy = exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.RequestCancellationReceiverStrategy = exports2.IdCancellationReceiverStrategy = exports2.ConnectionStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.TraceValues = exports2.Trace = exports2.NullLogger = exports2.ProgressType = exports2.ProgressToken = void 0;
    var ral_1 = require_ral();
    var Is = require_is();
    var messages_1 = require_messages();
    var linkedMap_1 = require_linkedMap();
    var events_1 = require_events();
    var cancellation_1 = require_cancellation();
    var CancelNotification;
    (function(CancelNotification2) {
      CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
    })(CancelNotification || (CancelNotification = {}));
    var ProgressToken;
    (function(ProgressToken2) {
      function is(value) {
        return typeof value === "string" || typeof value === "number";
      }
      ProgressToken2.is = is;
    })(ProgressToken || (exports2.ProgressToken = ProgressToken = {}));
    var ProgressNotification;
    (function(ProgressNotification2) {
      ProgressNotification2.type = new messages_1.NotificationType("$/progress");
    })(ProgressNotification || (ProgressNotification = {}));
    var ProgressType = class {
      constructor() {
      }
    };
    exports2.ProgressType = ProgressType;
    var StarRequestHandler;
    (function(StarRequestHandler2) {
      function is(value) {
        return Is.func(value);
      }
      StarRequestHandler2.is = is;
    })(StarRequestHandler || (StarRequestHandler = {}));
    exports2.NullLogger = Object.freeze({
      error: () => {
      },
      warn: () => {
      },
      info: () => {
      },
      log: () => {
      }
    });
    var Trace;
    (function(Trace2) {
      Trace2[Trace2["Off"] = 0] = "Off";
      Trace2[Trace2["Messages"] = 1] = "Messages";
      Trace2[Trace2["Compact"] = 2] = "Compact";
      Trace2[Trace2["Verbose"] = 3] = "Verbose";
    })(Trace || (exports2.Trace = Trace = {}));
    var TraceValues;
    (function(TraceValues2) {
      TraceValues2.Off = "off";
      TraceValues2.Messages = "messages";
      TraceValues2.Compact = "compact";
      TraceValues2.Verbose = "verbose";
    })(TraceValues || (exports2.TraceValues = TraceValues = {}));
    (function(Trace2) {
      function fromString(value) {
        if (!Is.string(value)) {
          return Trace2.Off;
        }
        value = value.toLowerCase();
        switch (value) {
          case "off":
            return Trace2.Off;
          case "messages":
            return Trace2.Messages;
          case "compact":
            return Trace2.Compact;
          case "verbose":
            return Trace2.Verbose;
          default:
            return Trace2.Off;
        }
      }
      Trace2.fromString = fromString;
      function toString(value) {
        switch (value) {
          case Trace2.Off:
            return "off";
          case Trace2.Messages:
            return "messages";
          case Trace2.Compact:
            return "compact";
          case Trace2.Verbose:
            return "verbose";
          default:
            return "off";
        }
      }
      Trace2.toString = toString;
    })(Trace || (exports2.Trace = Trace = {}));
    var TraceFormat;
    (function(TraceFormat2) {
      TraceFormat2["Text"] = "text";
      TraceFormat2["JSON"] = "json";
    })(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
    (function(TraceFormat2) {
      function fromString(value) {
        if (!Is.string(value)) {
          return TraceFormat2.Text;
        }
        value = value.toLowerCase();
        if (value === "json") {
          return TraceFormat2.JSON;
        } else {
          return TraceFormat2.Text;
        }
      }
      TraceFormat2.fromString = fromString;
    })(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
    var SetTraceNotification;
    (function(SetTraceNotification2) {
      SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
    })(SetTraceNotification || (exports2.SetTraceNotification = SetTraceNotification = {}));
    var LogTraceNotification;
    (function(LogTraceNotification2) {
      LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
    })(LogTraceNotification || (exports2.LogTraceNotification = LogTraceNotification = {}));
    var ConnectionErrors;
    (function(ConnectionErrors2) {
      ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
      ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
      ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
    })(ConnectionErrors || (exports2.ConnectionErrors = ConnectionErrors = {}));
    var ConnectionError2 = class _ConnectionError extends Error {
      constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, _ConnectionError.prototype);
      }
    };
    exports2.ConnectionError = ConnectionError2;
    var ConnectionStrategy;
    (function(ConnectionStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
      }
      ConnectionStrategy2.is = is;
    })(ConnectionStrategy || (exports2.ConnectionStrategy = ConnectionStrategy = {}));
    var IdCancellationReceiverStrategy;
    (function(IdCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
      }
      IdCancellationReceiverStrategy2.is = is;
    })(IdCancellationReceiverStrategy || (exports2.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
    var RequestCancellationReceiverStrategy;
    (function(RequestCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && candidate.kind === "request" && Is.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is.func(candidate.dispose));
      }
      RequestCancellationReceiverStrategy2.is = is;
    })(RequestCancellationReceiverStrategy || (exports2.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
    var CancellationReceiverStrategy;
    (function(CancellationReceiverStrategy2) {
      CancellationReceiverStrategy2.Message = Object.freeze({
        createCancellationTokenSource(_) {
          return new cancellation_1.CancellationTokenSource();
        }
      });
      function is(value) {
        return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
      }
      CancellationReceiverStrategy2.is = is;
    })(CancellationReceiverStrategy || (exports2.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
    var CancellationSenderStrategy;
    (function(CancellationSenderStrategy2) {
      CancellationSenderStrategy2.Message = Object.freeze({
        sendCancellation(conn, id) {
          return conn.sendNotification(CancelNotification.type, { id });
        },
        cleanup(_) {
        }
      });
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
      }
      CancellationSenderStrategy2.is = is;
    })(CancellationSenderStrategy || (exports2.CancellationSenderStrategy = CancellationSenderStrategy = {}));
    var CancellationStrategy;
    (function(CancellationStrategy2) {
      CancellationStrategy2.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
      });
      function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
      }
      CancellationStrategy2.is = is;
    })(CancellationStrategy || (exports2.CancellationStrategy = CancellationStrategy = {}));
    var MessageStrategy;
    (function(MessageStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.handleMessage);
      }
      MessageStrategy2.is = is;
    })(MessageStrategy || (exports2.MessageStrategy = MessageStrategy = {}));
    var ConnectionOptions;
    (function(ConnectionOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy));
      }
      ConnectionOptions2.is = is;
    })(ConnectionOptions || (exports2.ConnectionOptions = ConnectionOptions = {}));
    var ConnectionState;
    (function(ConnectionState2) {
      ConnectionState2[ConnectionState2["New"] = 1] = "New";
      ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
      ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
      ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
    })(ConnectionState || (ConnectionState = {}));
    function createMessageConnection2(messageReader, messageWriter, _logger, options) {
      const logger = _logger !== void 0 ? _logger : exports2.NullLogger;
      let sequenceNumber = 0;
      let notificationSequenceNumber = 0;
      let unknownResponseSequenceNumber = 0;
      const version = "2.0";
      let starRequestHandler = void 0;
      const requestHandlers = /* @__PURE__ */ new Map();
      let starNotificationHandler = void 0;
      const notificationHandlers = /* @__PURE__ */ new Map();
      const progressHandlers = /* @__PURE__ */ new Map();
      let timer;
      let messageQueue = new linkedMap_1.LinkedMap();
      let responsePromises = /* @__PURE__ */ new Map();
      let knownCanceledRequests = /* @__PURE__ */ new Set();
      let requestTokens = /* @__PURE__ */ new Map();
      let trace = Trace.Off;
      let traceFormat = TraceFormat.Text;
      let tracer;
      let state = ConnectionState.New;
      const errorEmitter = new events_1.Emitter();
      const closeEmitter = new events_1.Emitter();
      const unhandledNotificationEmitter = new events_1.Emitter();
      const unhandledProgressEmitter = new events_1.Emitter();
      const disposeEmitter = new events_1.Emitter();
      const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
      function createRequestQueueKey(id) {
        if (id === null) {
          throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return "req-" + id.toString();
      }
      function createResponseQueueKey(id) {
        if (id === null) {
          return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
        } else {
          return "res-" + id.toString();
        }
      }
      function createNotificationQueueKey() {
        return "not-" + (++notificationSequenceNumber).toString();
      }
      function addMessageToQueue(queue, message) {
        if (messages_1.Message.isRequest(message)) {
          queue.set(createRequestQueueKey(message.id), message);
        } else if (messages_1.Message.isResponse(message)) {
          queue.set(createResponseQueueKey(message.id), message);
        } else {
          queue.set(createNotificationQueueKey(), message);
        }
      }
      function cancelUndispatched(_message) {
        return void 0;
      }
      function isListening() {
        return state === ConnectionState.Listening;
      }
      function isClosed() {
        return state === ConnectionState.Closed;
      }
      function isDisposed() {
        return state === ConnectionState.Disposed;
      }
      function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
          state = ConnectionState.Closed;
          closeEmitter.fire(void 0);
        }
      }
      function readErrorHandler(error) {
        errorEmitter.fire([error, void 0, void 0]);
      }
      function writeErrorHandler(data) {
        errorEmitter.fire(data);
      }
      messageReader.onClose(closeHandler);
      messageReader.onError(readErrorHandler);
      messageWriter.onClose(closeHandler);
      messageWriter.onError(writeErrorHandler);
      function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
          return;
        }
        timer = (0, ral_1.default)().timer.setImmediate(() => {
          timer = void 0;
          processMessageQueue();
        });
      }
      function handleMessage(message) {
        if (messages_1.Message.isRequest(message)) {
          handleRequest(message);
        } else if (messages_1.Message.isNotification(message)) {
          handleNotification(message);
        } else if (messages_1.Message.isResponse(message)) {
          handleResponse(message);
        } else {
          handleInvalidMessage(message);
        }
      }
      function processMessageQueue() {
        if (messageQueue.size === 0) {
          return;
        }
        const message = messageQueue.shift();
        try {
          const messageStrategy = options?.messageStrategy;
          if (MessageStrategy.is(messageStrategy)) {
            messageStrategy.handleMessage(message, handleMessage);
          } else {
            handleMessage(message);
          }
        } finally {
          triggerMessageQueue();
        }
      }
      const callback = (message) => {
        try {
          if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
            const cancelId = message.params.id;
            const key = createRequestQueueKey(cancelId);
            const toCancel = messageQueue.get(key);
            if (messages_1.Message.isRequest(toCancel)) {
              const strategy = options?.connectionStrategy;
              const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
              if (response && (response.error !== void 0 || response.result !== void 0)) {
                messageQueue.delete(key);
                requestTokens.delete(cancelId);
                response.id = toCancel.id;
                traceSendingResponse(response, message.method, Date.now());
                messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
                return;
              }
            }
            const cancellationToken = requestTokens.get(cancelId);
            if (cancellationToken !== void 0) {
              cancellationToken.cancel();
              traceReceivedNotification(message);
              return;
            } else {
              knownCanceledRequests.add(cancelId);
            }
          }
          addMessageToQueue(messageQueue, message);
        } finally {
          triggerMessageQueue();
        }
      };
      function handleRequest(requestMessage) {
        if (isDisposed()) {
          return;
        }
        function reply(resultOrError, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id
          };
          if (resultOrError instanceof messages_1.ResponseError) {
            message.error = resultOrError.toJson();
          } else {
            message.result = resultOrError === void 0 ? null : resultOrError;
          }
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replyError(error, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            error: error.toJson()
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replySuccess(result, method, startTime2) {
          if (result === void 0) {
            result = null;
          }
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            result
          };
          traceSendingResponse(message, method, startTime2);
          messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers.get(requestMessage.method);
        let type;
        let requestHandler;
        if (element) {
          type = element.type;
          requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
          const tokenKey = requestMessage.id ?? String(Date.now());
          const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
          if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
            cancellationSource.cancel();
          }
          if (requestMessage.id !== null) {
            requestTokens.set(tokenKey, cancellationSource);
          }
          try {
            let handlerResult;
            if (requestHandler) {
              if (requestMessage.params === void 0) {
                if (type !== void 0 && type.numberOfParams !== 0) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(cancellationSource.token);
              } else if (Array.isArray(requestMessage.params)) {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byName) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                  return;
                }
                handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
              }
            } else if (starRequestHandler) {
              handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
            }
            const promise = handlerResult;
            if (!handlerResult) {
              requestTokens.delete(tokenKey);
              replySuccess(handlerResult, requestMessage.method, startTime);
            } else if (promise.then) {
              promise.then((resultOrError) => {
                requestTokens.delete(tokenKey);
                reply(resultOrError, requestMessage.method, startTime);
              }, (error) => {
                requestTokens.delete(tokenKey);
                if (error instanceof messages_1.ResponseError) {
                  replyError(error, requestMessage.method, startTime);
                } else if (error && Is.string(error.message)) {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                } else {
                  replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
              });
            } else {
              requestTokens.delete(tokenKey);
              reply(handlerResult, requestMessage.method, startTime);
            }
          } catch (error) {
            requestTokens.delete(tokenKey);
            if (error instanceof messages_1.ResponseError) {
              reply(error, requestMessage.method, startTime);
            } else if (error && Is.string(error.message)) {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
            } else {
              replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
            }
          }
        } else {
          replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
      }
      function handleResponse(responseMessage) {
        if (isDisposed()) {
          return;
        }
        if (responseMessage.id === null) {
          if (responseMessage.error) {
            logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
          } else {
            logger.error(`Received response message without id. No further error information provided.`);
          }
        } else {
          const key = responseMessage.id;
          const responsePromise = responsePromises.get(key);
          traceReceivedResponse(responseMessage, responsePromise);
          if (responsePromise !== void 0) {
            responsePromises.delete(key);
            try {
              if (responseMessage.error) {
                const error = responseMessage.error;
                responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
              } else if (responseMessage.result !== void 0) {
                responsePromise.resolve(responseMessage.result);
              } else {
                throw new Error("Should never happen.");
              }
            } catch (error) {
              if (error.message) {
                logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
              } else {
                logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
              }
            }
          }
        }
      }
      function handleNotification(message) {
        if (isDisposed()) {
          return;
        }
        let type = void 0;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
          const cancelId = message.params.id;
          knownCanceledRequests.delete(cancelId);
          traceReceivedNotification(message);
          return;
        } else {
          const element = notificationHandlers.get(message.method);
          if (element) {
            notificationHandler = element.handler;
            type = element.type;
          }
        }
        if (notificationHandler || starNotificationHandler) {
          try {
            traceReceivedNotification(message);
            if (notificationHandler) {
              if (message.params === void 0) {
                if (type !== void 0) {
                  if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                  }
                }
                notificationHandler();
              } else if (Array.isArray(message.params)) {
                const params = message.params;
                if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                  notificationHandler({ token: params[0], value: params[1] });
                } else {
                  if (type !== void 0) {
                    if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                      logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                    }
                    if (type.numberOfParams !== message.params.length) {
                      logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                    }
                  }
                  notificationHandler(...params);
                }
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                }
                notificationHandler(message.params);
              }
            } else if (starNotificationHandler) {
              starNotificationHandler(message.method, message.params);
            }
          } catch (error) {
            if (error.message) {
              logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
            } else {
              logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
            }
          }
        } else {
          unhandledNotificationEmitter.fire(message);
        }
      }
      function handleInvalidMessage(message) {
        if (!message) {
          logger.error("Received empty message.");
          return;
        }
        logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
        const responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
          const key = responseMessage.id;
          const responseHandler = responsePromises.get(key);
          if (responseHandler) {
            responseHandler.reject(new Error("The received response has neither a result nor an error property."));
          }
        }
      }
      function stringifyTrace(params) {
        if (params === void 0 || params === null) {
          return void 0;
        }
        switch (trace) {
          case Trace.Verbose:
            return JSON.stringify(params, null, 4);
          case Trace.Compact:
            return JSON.stringify(params);
          default:
            return void 0;
        }
      }
      function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          }
          tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("send-request", message);
        }
      }
      function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Sending notification '${message.method}'.`, data);
        } else {
          logLSPMessage("send-notification", message);
        }
      }
      function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}

`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        } else {
          logLSPMessage("send-response", message);
        }
      }
      function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}

`;
          }
          tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("receive-request", message);
        }
      }
      function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}

`;
            } else {
              data = "No parameters provided.\n\n";
            }
          }
          tracer.log(`Received notification '${message.method}'.`, data);
        } else {
          logLSPMessage("receive-notification", message);
        }
      }
      function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}

`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}

`;
              } else if (message.error === void 0) {
                data = "No result returned.\n\n";
              }
            }
          }
          if (responsePromise) {
            const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
            tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
          } else {
            tracer.log(`Received response ${message.id} without active response promise.`, data);
          }
        } else {
          logLSPMessage("receive-response", message);
        }
      }
      function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
          return;
        }
        const lspMessage = {
          isLSPMessage: true,
          type,
          message,
          timestamp: Date.now()
        };
        tracer.log(lspMessage);
      }
      function throwIfClosedOrDisposed() {
        if (isClosed()) {
          throw new ConnectionError2(ConnectionErrors.Closed, "Connection is closed.");
        }
        if (isDisposed()) {
          throw new ConnectionError2(ConnectionErrors.Disposed, "Connection is disposed.");
        }
      }
      function throwIfListening() {
        if (isListening()) {
          throw new ConnectionError2(ConnectionErrors.AlreadyListening, "Connection is already listening");
        }
      }
      function throwIfNotListening() {
        if (!isListening()) {
          throw new Error("Call listen() first.");
        }
      }
      function undefinedToNull(param) {
        if (param === void 0) {
          return null;
        } else {
          return param;
        }
      }
      function nullToUndefined(param) {
        if (param === null) {
          return void 0;
        } else {
          return param;
        }
      }
      function isNamedParam(param) {
        return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
      }
      function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
          case messages_1.ParameterStructures.auto:
            if (isNamedParam(param)) {
              return nullToUndefined(param);
            } else {
              return [undefinedToNull(param)];
            }
          case messages_1.ParameterStructures.byName:
            if (!isNamedParam(param)) {
              throw new Error(`Received parameters by name but param is not an object literal.`);
            }
            return nullToUndefined(param);
          case messages_1.ParameterStructures.byPosition:
            return [undefinedToNull(param)];
          default:
            throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
      }
      function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
          case 0:
            result = void 0;
            break;
          case 1:
            result = computeSingleParam(type.parameterStructures, params[0]);
            break;
          default:
            result = [];
            for (let i = 0; i < params.length && i < numberOfParams; i++) {
              result.push(undefinedToNull(params[i]));
            }
            if (params.length < numberOfParams) {
              for (let i = params.length; i < numberOfParams; i++) {
                result.push(null);
              }
            }
            break;
        }
        return result;
      }
      const connection = {
        sendNotification: (type, ...args) => {
          throwIfClosedOrDisposed();
          let method;
          let messageParams;
          if (Is.string(type)) {
            method = type;
            const first = args[0];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
          }
          const notificationMessage = {
            jsonrpc: version,
            method,
            params: messageParams
          };
          traceSendingNotification(notificationMessage);
          return messageWriter.write(notificationMessage).catch((error) => {
            logger.error(`Sending notification failed.`);
            throw error;
          });
        },
        onNotification: (type, handler) => {
          throwIfClosedOrDisposed();
          let method;
          if (Is.func(type)) {
            starNotificationHandler = type;
          } else if (handler) {
            if (Is.string(type)) {
              method = type;
              notificationHandlers.set(type, { type: void 0, handler });
            } else {
              method = type.method;
              notificationHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method !== void 0) {
                notificationHandlers.delete(method);
              } else {
                starNotificationHandler = void 0;
              }
            }
          };
        },
        onProgress: (_type, token, handler) => {
          if (progressHandlers.has(token)) {
            throw new Error(`Progress handler for token ${token} already registered`);
          }
          progressHandlers.set(token, handler);
          return {
            dispose: () => {
              progressHandlers.delete(token);
            }
          };
        },
        sendProgress: (_type, token, value) => {
          return connection.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
          throwIfClosedOrDisposed();
          throwIfNotListening();
          let method;
          let messageParams;
          let token = void 0;
          if (Is.string(type)) {
            method = type;
            const first = args[0];
            const last = args[args.length - 1];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            if (cancellation_1.CancellationToken.is(last)) {
              paramEnd = paramEnd - 1;
              token = last;
            }
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
            const numberOfParams = type.numberOfParams;
            token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
          }
          const id = sequenceNumber++;
          let disposable;
          if (token) {
            disposable = token.onCancellationRequested(() => {
              const p = cancellationStrategy.sender.sendCancellation(connection, id);
              if (p === void 0) {
                logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                return Promise.resolve();
              } else {
                return p.catch(() => {
                  logger.log(`Sending cancellation messages for id ${id} failed`);
                });
              }
            });
          }
          const requestMessage = {
            jsonrpc: version,
            id,
            method,
            params: messageParams
          };
          traceSendingRequest(requestMessage);
          if (typeof cancellationStrategy.sender.enableCancellation === "function") {
            cancellationStrategy.sender.enableCancellation(requestMessage);
          }
          return new Promise(async (resolve4, reject) => {
            const resolveWithCleanup = (r) => {
              resolve4(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const rejectWithCleanup = (r) => {
              reject(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const responsePromise = { method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
            try {
              responsePromises.set(id, responsePromise);
              await messageWriter.write(requestMessage);
            } catch (error) {
              responsePromises.delete(id);
              responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : "Unknown reason"));
              logger.error(`Sending request failed.`);
              throw error;
            }
          });
        },
        onRequest: (type, handler) => {
          throwIfClosedOrDisposed();
          let method = null;
          if (StarRequestHandler.is(type)) {
            method = void 0;
            starRequestHandler = type;
          } else if (Is.string(type)) {
            method = null;
            if (handler !== void 0) {
              method = type;
              requestHandlers.set(type, { handler, type: void 0 });
            }
          } else {
            if (handler !== void 0) {
              method = type.method;
              requestHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method === null) {
                return;
              }
              if (method !== void 0) {
                requestHandlers.delete(method);
              } else {
                starRequestHandler = void 0;
              }
            }
          };
        },
        hasPendingResponse: () => {
          return responsePromises.size > 0;
        },
        trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
          let _sendNotification = false;
          let _traceFormat = TraceFormat.Text;
          if (sendNotificationOrTraceOptions !== void 0) {
            if (Is.boolean(sendNotificationOrTraceOptions)) {
              _sendNotification = sendNotificationOrTraceOptions;
            } else {
              _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
              _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
            }
          }
          trace = _value;
          traceFormat = _traceFormat;
          if (trace === Trace.Off) {
            tracer = void 0;
          } else {
            tracer = _tracer;
          }
          if (_sendNotification && !isClosed() && !isDisposed()) {
            await connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
          }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
          messageWriter.end();
        },
        dispose: () => {
          if (isDisposed()) {
            return;
          }
          state = ConnectionState.Disposed;
          disposeEmitter.fire(void 0);
          const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
          for (const promise of responsePromises.values()) {
            promise.reject(error);
          }
          responsePromises = /* @__PURE__ */ new Map();
          requestTokens = /* @__PURE__ */ new Map();
          knownCanceledRequests = /* @__PURE__ */ new Set();
          messageQueue = new linkedMap_1.LinkedMap();
          if (Is.func(messageWriter.dispose)) {
            messageWriter.dispose();
          }
          if (Is.func(messageReader.dispose)) {
            messageReader.dispose();
          }
        },
        listen: () => {
          throwIfClosedOrDisposed();
          throwIfListening();
          state = ConnectionState.Listening;
          messageReader.listen(callback);
        },
        inspect: () => {
          (0, ral_1.default)().console.log("inspect");
        }
      };
      connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
        tracer.log(params.message, verbose ? params.verbose : void 0);
      });
      connection.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
          handler(params.value);
        } else {
          unhandledProgressEmitter.fire(params);
        }
      });
      return connection;
    }
    exports2.createMessageConnection = createMessageConnection2;
  }
});

// node_modules/vscode-jsonrpc/lib/common/api.js
var require_api = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProgressType = exports2.ProgressToken = exports2.createMessageConnection = exports2.NullLogger = exports2.ConnectionOptions = exports2.ConnectionStrategy = exports2.AbstractMessageBuffer = exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = exports2.SharedArrayReceiverStrategy = exports2.SharedArraySenderStrategy = exports2.CancellationToken = exports2.CancellationTokenSource = exports2.Emitter = exports2.Event = exports2.Disposable = exports2.LRUCache = exports2.Touch = exports2.LinkedMap = exports2.ParameterStructures = exports2.NotificationType9 = exports2.NotificationType8 = exports2.NotificationType7 = exports2.NotificationType6 = exports2.NotificationType5 = exports2.NotificationType4 = exports2.NotificationType3 = exports2.NotificationType2 = exports2.NotificationType1 = exports2.NotificationType0 = exports2.NotificationType = exports2.ErrorCodes = exports2.ResponseError = exports2.RequestType9 = exports2.RequestType8 = exports2.RequestType7 = exports2.RequestType6 = exports2.RequestType5 = exports2.RequestType4 = exports2.RequestType3 = exports2.RequestType2 = exports2.RequestType1 = exports2.RequestType0 = exports2.RequestType = exports2.Message = exports2.RAL = void 0;
    exports2.MessageStrategy = exports2.CancellationStrategy = exports2.CancellationSenderStrategy = exports2.CancellationReceiverStrategy = exports2.ConnectionError = exports2.ConnectionErrors = exports2.LogTraceNotification = exports2.SetTraceNotification = exports2.TraceFormat = exports2.TraceValues = exports2.Trace = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports2, "Message", { enumerable: true, get: function() {
      return messages_1.Message;
    } });
    Object.defineProperty(exports2, "RequestType", { enumerable: true, get: function() {
      return messages_1.RequestType;
    } });
    Object.defineProperty(exports2, "RequestType0", { enumerable: true, get: function() {
      return messages_1.RequestType0;
    } });
    Object.defineProperty(exports2, "RequestType1", { enumerable: true, get: function() {
      return messages_1.RequestType1;
    } });
    Object.defineProperty(exports2, "RequestType2", { enumerable: true, get: function() {
      return messages_1.RequestType2;
    } });
    Object.defineProperty(exports2, "RequestType3", { enumerable: true, get: function() {
      return messages_1.RequestType3;
    } });
    Object.defineProperty(exports2, "RequestType4", { enumerable: true, get: function() {
      return messages_1.RequestType4;
    } });
    Object.defineProperty(exports2, "RequestType5", { enumerable: true, get: function() {
      return messages_1.RequestType5;
    } });
    Object.defineProperty(exports2, "RequestType6", { enumerable: true, get: function() {
      return messages_1.RequestType6;
    } });
    Object.defineProperty(exports2, "RequestType7", { enumerable: true, get: function() {
      return messages_1.RequestType7;
    } });
    Object.defineProperty(exports2, "RequestType8", { enumerable: true, get: function() {
      return messages_1.RequestType8;
    } });
    Object.defineProperty(exports2, "RequestType9", { enumerable: true, get: function() {
      return messages_1.RequestType9;
    } });
    Object.defineProperty(exports2, "ResponseError", { enumerable: true, get: function() {
      return messages_1.ResponseError;
    } });
    Object.defineProperty(exports2, "ErrorCodes", { enumerable: true, get: function() {
      return messages_1.ErrorCodes;
    } });
    Object.defineProperty(exports2, "NotificationType", { enumerable: true, get: function() {
      return messages_1.NotificationType;
    } });
    Object.defineProperty(exports2, "NotificationType0", { enumerable: true, get: function() {
      return messages_1.NotificationType0;
    } });
    Object.defineProperty(exports2, "NotificationType1", { enumerable: true, get: function() {
      return messages_1.NotificationType1;
    } });
    Object.defineProperty(exports2, "NotificationType2", { enumerable: true, get: function() {
      return messages_1.NotificationType2;
    } });
    Object.defineProperty(exports2, "NotificationType3", { enumerable: true, get: function() {
      return messages_1.NotificationType3;
    } });
    Object.defineProperty(exports2, "NotificationType4", { enumerable: true, get: function() {
      return messages_1.NotificationType4;
    } });
    Object.defineProperty(exports2, "NotificationType5", { enumerable: true, get: function() {
      return messages_1.NotificationType5;
    } });
    Object.defineProperty(exports2, "NotificationType6", { enumerable: true, get: function() {
      return messages_1.NotificationType6;
    } });
    Object.defineProperty(exports2, "NotificationType7", { enumerable: true, get: function() {
      return messages_1.NotificationType7;
    } });
    Object.defineProperty(exports2, "NotificationType8", { enumerable: true, get: function() {
      return messages_1.NotificationType8;
    } });
    Object.defineProperty(exports2, "NotificationType9", { enumerable: true, get: function() {
      return messages_1.NotificationType9;
    } });
    Object.defineProperty(exports2, "ParameterStructures", { enumerable: true, get: function() {
      return messages_1.ParameterStructures;
    } });
    var linkedMap_1 = require_linkedMap();
    Object.defineProperty(exports2, "LinkedMap", { enumerable: true, get: function() {
      return linkedMap_1.LinkedMap;
    } });
    Object.defineProperty(exports2, "LRUCache", { enumerable: true, get: function() {
      return linkedMap_1.LRUCache;
    } });
    Object.defineProperty(exports2, "Touch", { enumerable: true, get: function() {
      return linkedMap_1.Touch;
    } });
    var disposable_1 = require_disposable();
    Object.defineProperty(exports2, "Disposable", { enumerable: true, get: function() {
      return disposable_1.Disposable;
    } });
    var events_1 = require_events();
    Object.defineProperty(exports2, "Event", { enumerable: true, get: function() {
      return events_1.Event;
    } });
    Object.defineProperty(exports2, "Emitter", { enumerable: true, get: function() {
      return events_1.Emitter;
    } });
    var cancellation_1 = require_cancellation();
    Object.defineProperty(exports2, "CancellationTokenSource", { enumerable: true, get: function() {
      return cancellation_1.CancellationTokenSource;
    } });
    Object.defineProperty(exports2, "CancellationToken", { enumerable: true, get: function() {
      return cancellation_1.CancellationToken;
    } });
    var sharedArrayCancellation_1 = require_sharedArrayCancellation();
    Object.defineProperty(exports2, "SharedArraySenderStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArraySenderStrategy;
    } });
    Object.defineProperty(exports2, "SharedArrayReceiverStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
    } });
    var messageReader_1 = require_messageReader();
    Object.defineProperty(exports2, "MessageReader", { enumerable: true, get: function() {
      return messageReader_1.MessageReader;
    } });
    Object.defineProperty(exports2, "AbstractMessageReader", { enumerable: true, get: function() {
      return messageReader_1.AbstractMessageReader;
    } });
    Object.defineProperty(exports2, "ReadableStreamMessageReader", { enumerable: true, get: function() {
      return messageReader_1.ReadableStreamMessageReader;
    } });
    var messageWriter_1 = require_messageWriter();
    Object.defineProperty(exports2, "MessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.MessageWriter;
    } });
    Object.defineProperty(exports2, "AbstractMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.AbstractMessageWriter;
    } });
    Object.defineProperty(exports2, "WriteableStreamMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.WriteableStreamMessageWriter;
    } });
    var messageBuffer_1 = require_messageBuffer();
    Object.defineProperty(exports2, "AbstractMessageBuffer", { enumerable: true, get: function() {
      return messageBuffer_1.AbstractMessageBuffer;
    } });
    var connection_1 = require_connection();
    Object.defineProperty(exports2, "ConnectionStrategy", { enumerable: true, get: function() {
      return connection_1.ConnectionStrategy;
    } });
    Object.defineProperty(exports2, "ConnectionOptions", { enumerable: true, get: function() {
      return connection_1.ConnectionOptions;
    } });
    Object.defineProperty(exports2, "NullLogger", { enumerable: true, get: function() {
      return connection_1.NullLogger;
    } });
    Object.defineProperty(exports2, "createMessageConnection", { enumerable: true, get: function() {
      return connection_1.createMessageConnection;
    } });
    Object.defineProperty(exports2, "ProgressToken", { enumerable: true, get: function() {
      return connection_1.ProgressToken;
    } });
    Object.defineProperty(exports2, "ProgressType", { enumerable: true, get: function() {
      return connection_1.ProgressType;
    } });
    Object.defineProperty(exports2, "Trace", { enumerable: true, get: function() {
      return connection_1.Trace;
    } });
    Object.defineProperty(exports2, "TraceValues", { enumerable: true, get: function() {
      return connection_1.TraceValues;
    } });
    Object.defineProperty(exports2, "TraceFormat", { enumerable: true, get: function() {
      return connection_1.TraceFormat;
    } });
    Object.defineProperty(exports2, "SetTraceNotification", { enumerable: true, get: function() {
      return connection_1.SetTraceNotification;
    } });
    Object.defineProperty(exports2, "LogTraceNotification", { enumerable: true, get: function() {
      return connection_1.LogTraceNotification;
    } });
    Object.defineProperty(exports2, "ConnectionErrors", { enumerable: true, get: function() {
      return connection_1.ConnectionErrors;
    } });
    Object.defineProperty(exports2, "ConnectionError", { enumerable: true, get: function() {
      return connection_1.ConnectionError;
    } });
    Object.defineProperty(exports2, "CancellationReceiverStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationReceiverStrategy;
    } });
    Object.defineProperty(exports2, "CancellationSenderStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationSenderStrategy;
    } });
    Object.defineProperty(exports2, "CancellationStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationStrategy;
    } });
    Object.defineProperty(exports2, "MessageStrategy", { enumerable: true, get: function() {
      return connection_1.MessageStrategy;
    } });
    var ral_1 = require_ral();
    exports2.RAL = ral_1.default;
  }
});

// node_modules/vscode-jsonrpc/lib/node/ril.js
var require_ril = __commonJS({
  "node_modules/vscode-jsonrpc/lib/node/ril.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require("util");
    var api_1 = require_api();
    var MessageBuffer = class _MessageBuffer extends api_1.AbstractMessageBuffer {
      constructor(encoding = "utf-8") {
        super(encoding);
      }
      emptyBuffer() {
        return _MessageBuffer.emptyBuffer;
      }
      fromString(value, encoding) {
        return Buffer.from(value, encoding);
      }
      toString(value, encoding) {
        if (value instanceof Buffer) {
          return value.toString(encoding);
        } else {
          return new util_1.TextDecoder(encoding).decode(value);
        }
      }
      asNative(buffer, length) {
        if (length === void 0) {
          return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
        } else {
          return buffer instanceof Buffer ? buffer.slice(0, length) : Buffer.from(buffer, 0, length);
        }
      }
      allocNative(length) {
        return Buffer.allocUnsafe(length);
      }
    };
    MessageBuffer.emptyBuffer = Buffer.allocUnsafe(0);
    var ReadableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return api_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return api_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return api_1.Disposable.create(() => this.stream.off("end", listener));
      }
      onData(listener) {
        this.stream.on("data", listener);
        return api_1.Disposable.create(() => this.stream.off("data", listener));
      }
    };
    var WritableStreamWrapper = class {
      constructor(stream) {
        this.stream = stream;
      }
      onClose(listener) {
        this.stream.on("close", listener);
        return api_1.Disposable.create(() => this.stream.off("close", listener));
      }
      onError(listener) {
        this.stream.on("error", listener);
        return api_1.Disposable.create(() => this.stream.off("error", listener));
      }
      onEnd(listener) {
        this.stream.on("end", listener);
        return api_1.Disposable.create(() => this.stream.off("end", listener));
      }
      write(data, encoding) {
        return new Promise((resolve4, reject) => {
          const callback = (error) => {
            if (error === void 0 || error === null) {
              resolve4();
            } else {
              reject(error);
            }
          };
          if (typeof data === "string") {
            this.stream.write(data, encoding, callback);
          } else {
            this.stream.write(data, callback);
          }
        });
      }
      end() {
        this.stream.end();
      }
    };
    var _ril = Object.freeze({
      messageBuffer: Object.freeze({
        create: (encoding) => new MessageBuffer(encoding)
      }),
      applicationJson: Object.freeze({
        encoder: Object.freeze({
          name: "application/json",
          encode: (msg, options) => {
            try {
              return Promise.resolve(Buffer.from(JSON.stringify(msg, void 0, 0), options.charset));
            } catch (err) {
              return Promise.reject(err);
            }
          }
        }),
        decoder: Object.freeze({
          name: "application/json",
          decode: (buffer, options) => {
            try {
              if (buffer instanceof Buffer) {
                return Promise.resolve(JSON.parse(buffer.toString(options.charset)));
              } else {
                return Promise.resolve(JSON.parse(new util_1.TextDecoder(options.charset).decode(buffer)));
              }
            } catch (err) {
              return Promise.reject(err);
            }
          }
        })
      }),
      stream: Object.freeze({
        asReadableStream: (stream) => new ReadableStreamWrapper(stream),
        asWritableStream: (stream) => new WritableStreamWrapper(stream)
      }),
      console,
      timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
          const handle = setTimeout(callback, ms, ...args);
          return { dispose: () => clearTimeout(handle) };
        },
        setImmediate(callback, ...args) {
          const handle = setImmediate(callback, ...args);
          return { dispose: () => clearImmediate(handle) };
        },
        setInterval(callback, ms, ...args) {
          const handle = setInterval(callback, ms, ...args);
          return { dispose: () => clearInterval(handle) };
        }
      })
    });
    function RIL() {
      return _ril;
    }
    (function(RIL2) {
      function install() {
        api_1.RAL.install(_ril);
      }
      RIL2.install = install;
    })(RIL || (RIL = {}));
    exports2.default = RIL;
  }
});

// node_modules/vscode-jsonrpc/lib/node/main.js
var require_main = __commonJS({
  "node_modules/vscode-jsonrpc/lib/node/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createMessageConnection = exports2.createServerSocketTransport = exports2.createClientSocketTransport = exports2.createServerPipeTransport = exports2.createClientPipeTransport = exports2.generateRandomPipeName = exports2.StreamMessageWriter = exports2.StreamMessageReader = exports2.SocketMessageWriter = exports2.SocketMessageReader = exports2.PortMessageWriter = exports2.PortMessageReader = exports2.IPCMessageWriter = exports2.IPCMessageReader = void 0;
    var ril_1 = require_ril();
    ril_1.default.install();
    var path = require("path");
    var os = require("os");
    var crypto_1 = require("crypto");
    var net_1 = require("net");
    var api_1 = require_api();
    __exportStar(require_api(), exports2);
    var IPCMessageReader = class extends api_1.AbstractMessageReader {
      constructor(process3) {
        super();
        this.process = process3;
        let eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose());
      }
      listen(callback) {
        this.process.on("message", callback);
        return api_1.Disposable.create(() => this.process.off("message", callback));
      }
    };
    exports2.IPCMessageReader = IPCMessageReader;
    var IPCMessageWriter = class extends api_1.AbstractMessageWriter {
      constructor(process3) {
        super();
        this.process = process3;
        this.errorCount = 0;
        const eventEmitter = this.process;
        eventEmitter.on("error", (error) => this.fireError(error));
        eventEmitter.on("close", () => this.fireClose);
      }
      write(msg) {
        try {
          if (typeof this.process.send === "function") {
            this.process.send(msg, void 0, void 0, (error) => {
              if (error) {
                this.errorCount++;
                this.handleError(error, msg);
              } else {
                this.errorCount = 0;
              }
            });
          }
          return Promise.resolve();
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
      }
    };
    exports2.IPCMessageWriter = IPCMessageWriter;
    var PortMessageReader = class extends api_1.AbstractMessageReader {
      constructor(port) {
        super();
        this.onData = new api_1.Emitter();
        port.on("close", () => this.fireClose);
        port.on("error", (error) => this.fireError(error));
        port.on("message", (message) => {
          this.onData.fire(message);
        });
      }
      listen(callback) {
        return this.onData.event(callback);
      }
    };
    exports2.PortMessageReader = PortMessageReader;
    var PortMessageWriter = class extends api_1.AbstractMessageWriter {
      constructor(port) {
        super();
        this.port = port;
        this.errorCount = 0;
        port.on("close", () => this.fireClose());
        port.on("error", (error) => this.fireError(error));
      }
      write(msg) {
        try {
          this.port.postMessage(msg);
          return Promise.resolve();
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
      }
    };
    exports2.PortMessageWriter = PortMessageWriter;
    var SocketMessageReader = class extends api_1.ReadableStreamMessageReader {
      constructor(socket, encoding = "utf-8") {
        super((0, ril_1.default)().stream.asReadableStream(socket), encoding);
      }
    };
    exports2.SocketMessageReader = SocketMessageReader;
    var SocketMessageWriter = class extends api_1.WriteableStreamMessageWriter {
      constructor(socket, options) {
        super((0, ril_1.default)().stream.asWritableStream(socket), options);
        this.socket = socket;
      }
      dispose() {
        super.dispose();
        this.socket.destroy();
      }
    };
    exports2.SocketMessageWriter = SocketMessageWriter;
    var StreamMessageReader2 = class extends api_1.ReadableStreamMessageReader {
      constructor(readable, encoding) {
        super((0, ril_1.default)().stream.asReadableStream(readable), encoding);
      }
    };
    exports2.StreamMessageReader = StreamMessageReader2;
    var StreamMessageWriter2 = class extends api_1.WriteableStreamMessageWriter {
      constructor(writable, options) {
        super((0, ril_1.default)().stream.asWritableStream(writable), options);
      }
    };
    exports2.StreamMessageWriter = StreamMessageWriter2;
    var XDG_RUNTIME_DIR = process.env["XDG_RUNTIME_DIR"];
    var safeIpcPathLengths = /* @__PURE__ */ new Map([
      ["linux", 107],
      ["darwin", 103]
    ]);
    function generateRandomPipeName() {
      const randomSuffix = (0, crypto_1.randomBytes)(21).toString("hex");
      if (process.platform === "win32") {
        return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
      }
      let result;
      if (XDG_RUNTIME_DIR) {
        result = path.join(XDG_RUNTIME_DIR, `vscode-ipc-${randomSuffix}.sock`);
      } else {
        result = path.join(os.tmpdir(), `vscode-${randomSuffix}.sock`);
      }
      const limit = safeIpcPathLengths.get(process.platform);
      if (limit !== void 0 && result.length > limit) {
        (0, ril_1.default)().console.warn(`WARNING: IPC handle "${result}" is longer than ${limit} characters.`);
      }
      return result;
    }
    exports2.generateRandomPipeName = generateRandomPipeName;
    function createClientPipeTransport(pipeName, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve4, _reject) => {
        connectResolve = resolve4;
      });
      return new Promise((resolve4, reject) => {
        let server = (0, net_1.createServer)((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(pipeName, () => {
          server.removeListener("error", reject);
          resolve4({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientPipeTransport = createClientPipeTransport;
    function createServerPipeTransport(pipeName, encoding = "utf-8") {
      const socket = (0, net_1.createConnection)(pipeName);
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerPipeTransport = createServerPipeTransport;
    function createClientSocketTransport(port, encoding = "utf-8") {
      let connectResolve;
      const connected = new Promise((resolve4, _reject) => {
        connectResolve = resolve4;
      });
      return new Promise((resolve4, reject) => {
        const server = (0, net_1.createServer)((socket) => {
          server.close();
          connectResolve([
            new SocketMessageReader(socket, encoding),
            new SocketMessageWriter(socket, encoding)
          ]);
        });
        server.on("error", reject);
        server.listen(port, "127.0.0.1", () => {
          server.removeListener("error", reject);
          resolve4({
            onConnected: () => {
              return connected;
            }
          });
        });
      });
    }
    exports2.createClientSocketTransport = createClientSocketTransport;
    function createServerSocketTransport(port, encoding = "utf-8") {
      const socket = (0, net_1.createConnection)(port, "127.0.0.1");
      return [
        new SocketMessageReader(socket, encoding),
        new SocketMessageWriter(socket, encoding)
      ];
    }
    exports2.createServerSocketTransport = createServerSocketTransport;
    function isReadableStream(value) {
      const candidate = value;
      return candidate.read !== void 0 && candidate.addListener !== void 0;
    }
    function isWritableStream(value) {
      const candidate = value;
      return candidate.write !== void 0 && candidate.addListener !== void 0;
    }
    function createMessageConnection2(input, output, logger, options) {
      if (!logger) {
        logger = api_1.NullLogger;
      }
      const reader = isReadableStream(input) ? new StreamMessageReader2(input) : input;
      const writer = isWritableStream(output) ? new StreamMessageWriter2(output) : output;
      if (api_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return (0, api_1.createMessageConnection)(reader, writer, logger, options);
    }
    exports2.createMessageConnection = createMessageConnection2;
  }
});

// node_modules/vscode-jsonrpc/node.js
var require_node = __commonJS({
  "node_modules/vscode-jsonrpc/node.js"(exports2, module2) {
    "use strict";
    module2.exports = require_main();
  }
});

// src/lib/state.ts
var state_exports = {};
__export(state_exports, {
  appendLog: () => appendLog,
  createJob: () => createJob,
  generateJobId: () => generateJobId,
  getSessionId: () => getSessionId,
  jobLogPath: () => jobLogPath,
  listJobs: () => listJobs,
  readJobFile: () => readJobFile,
  readLogTail: () => readLogTail,
  resolveStateDir: () => resolveStateDir,
  updateJob: () => updateJob,
  writeJobFile: () => writeJobFile
});
function resolveStateDir(cwd) {
  const workspaceRoot = (0, import_node_path4.resolve)(cwd);
  const slug = (0, import_node_path4.basename)(workspaceRoot).replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "workspace";
  const hash = (0, import_node_crypto2.createHash)("sha256").update(workspaceRoot).digest("hex").slice(0, 16);
  const pluginDataDir = process.env[PLUGIN_DATA_ENV];
  const stateRoot = pluginDataDir ? (0, import_node_path4.join)(pluginDataDir, "state") : FALLBACK_STATE_ROOT;
  return (0, import_node_path4.join)(stateRoot, `${slug}-${hash}`);
}
function ensureDir(dir) {
  (0, import_node_fs4.mkdirSync)(dir, { recursive: true });
}
function stateFilePath(stateDir) {
  return (0, import_node_path4.join)(stateDir, "state.json");
}
function loadState(stateDir) {
  const filePath = stateFilePath(stateDir);
  if (!(0, import_node_fs4.existsSync)(filePath)) {
    return { version: 1, jobs: [] };
  }
  try {
    return JSON.parse((0, import_node_fs4.readFileSync)(filePath, "utf-8"));
  } catch {
    return { version: 1, jobs: [] };
  }
}
function saveState(stateDir, state) {
  ensureDir(stateDir);
  if (state.jobs.length > MAX_JOBS) {
    state.jobs = state.jobs.slice(0, MAX_JOBS);
  }
  (0, import_node_fs4.writeFileSync)(stateFilePath(stateDir), JSON.stringify(state, null, 2), "utf-8");
}
function jobsDir(stateDir) {
  return (0, import_node_path4.join)(stateDir, "jobs");
}
function jobFilePath(stateDir, jobId) {
  return (0, import_node_path4.join)(jobsDir(stateDir), `${jobId}.json`);
}
function jobLogPath(stateDir, jobId) {
  return (0, import_node_path4.join)(jobsDir(stateDir), `${jobId}.log`);
}
function writeJobFile(stateDir, job) {
  const dir = jobsDir(stateDir);
  ensureDir(dir);
  (0, import_node_fs4.writeFileSync)(jobFilePath(stateDir, job.id), JSON.stringify(job, null, 2), "utf-8");
}
function readJobFile(stateDir, jobId) {
  const filePath = jobFilePath(stateDir, jobId);
  if (!(0, import_node_fs4.existsSync)(filePath)) return null;
  try {
    return JSON.parse((0, import_node_fs4.readFileSync)(filePath, "utf-8"));
  } catch {
    return null;
  }
}
function appendLog(stateDir, jobId, message) {
  const logFile = jobLogPath(stateDir, jobId);
  ensureDir(jobsDir(stateDir));
  const time = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false });
  (0, import_node_fs4.writeFileSync)(logFile, `[${time}] ${message}
`, { flag: "a" });
}
function readLogTail(stateDir, jobId, maxLines = 10) {
  const logFile = jobLogPath(stateDir, jobId);
  if (!(0, import_node_fs4.existsSync)(logFile)) return [];
  try {
    const content = (0, import_node_fs4.readFileSync)(logFile, "utf-8");
    const lines = content.trim().split("\n");
    return lines.slice(-maxLines);
  } catch {
    return [];
  }
}
function generateJobId() {
  const ts = Date.now();
  const rand = (0, import_node_crypto2.randomUUID)().slice(0, 8);
  return `job-${ts}-${rand}`;
}
function getSessionId() {
  return process.env[SESSION_ID_ENV] || void 0;
}
function createJob(stateDir, job) {
  const state = loadState(stateDir);
  state.jobs.unshift(job);
  saveState(stateDir, state);
  writeJobFile(stateDir, job);
}
function updateJob(stateDir, jobId, updates) {
  const state = loadState(stateDir);
  const idx = state.jobs.findIndex((j) => j.id === jobId);
  if (idx >= 0) {
    state.jobs[idx] = { ...state.jobs[idx], ...updates };
    saveState(stateDir, state);
  }
  const full = readJobFile(stateDir, jobId);
  if (full) {
    writeJobFile(stateDir, { ...full, ...updates });
  }
}
function listJobs(stateDir, sessionId) {
  const state = loadState(stateDir);
  if (sessionId) {
    return state.jobs.filter((j) => j.sessionId === sessionId);
  }
  return state.jobs;
}
var import_node_crypto2, import_node_fs4, import_node_path4, import_node_os, MAX_JOBS, PLUGIN_DATA_ENV, SESSION_ID_ENV, FALLBACK_STATE_ROOT;
var init_state = __esm({
  "src/lib/state.ts"() {
    "use strict";
    import_node_crypto2 = require("node:crypto");
    import_node_fs4 = require("node:fs");
    import_node_path4 = require("node:path");
    import_node_os = require("node:os");
    MAX_JOBS = 50;
    PLUGIN_DATA_ENV = "CLAUDE_PLUGIN_DATA";
    SESSION_ID_ENV = "COPILOT_COMPANION_SESSION_ID";
    FALLBACK_STATE_ROOT = (0, import_node_path4.join)((0, import_node_os.tmpdir)(), "copilot-companion");
  }
});

// src/copilot-companion.ts
var import_node_process = __toESM(require("node:process"), 1);

// node_modules/@github/copilot-sdk/dist/client.js
var import_node_child_process = require("node:child_process");
var import_node_crypto = require("node:crypto");
var import_node_fs = require("node:fs");
var import_node_module = require("node:module");
var import_node_net = require("node:net");
var import_node_path = require("node:path");
var import_node_url = require("node:url");
var import_node2 = __toESM(require_node(), 1);

// node_modules/@github/copilot-sdk/dist/generated/rpc.js
function createServerRpc(connection) {
  return {
    ping: async (params) => connection.sendRequest("ping", params),
    models: {
      list: async () => connection.sendRequest("models.list", {})
    },
    tools: {
      list: async (params) => connection.sendRequest("tools.list", params)
    },
    account: {
      getQuota: async () => connection.sendRequest("account.getQuota", {})
    },
    mcp: {
      config: {
        list: async () => connection.sendRequest("mcp.config.list", {}),
        add: async (params) => connection.sendRequest("mcp.config.add", params),
        update: async (params) => connection.sendRequest("mcp.config.update", params),
        remove: async (params) => connection.sendRequest("mcp.config.remove", params)
      }
    },
    sessionFs: {
      setProvider: async (params) => connection.sendRequest("sessionFs.setProvider", params)
    },
    /** @experimental */
    sessions: {
      fork: async (params) => connection.sendRequest("sessions.fork", params)
    }
  };
}
function createSessionRpc(connection, sessionId) {
  return {
    model: {
      getCurrent: async () => connection.sendRequest("session.model.getCurrent", { sessionId }),
      switchTo: async (params) => connection.sendRequest("session.model.switchTo", { sessionId, ...params })
    },
    mode: {
      get: async () => connection.sendRequest("session.mode.get", { sessionId }),
      set: async (params) => connection.sendRequest("session.mode.set", { sessionId, ...params })
    },
    plan: {
      read: async () => connection.sendRequest("session.plan.read", { sessionId }),
      update: async (params) => connection.sendRequest("session.plan.update", { sessionId, ...params }),
      delete: async () => connection.sendRequest("session.plan.delete", { sessionId })
    },
    workspace: {
      listFiles: async () => connection.sendRequest("session.workspace.listFiles", { sessionId }),
      readFile: async (params) => connection.sendRequest("session.workspace.readFile", { sessionId, ...params }),
      createFile: async (params) => connection.sendRequest("session.workspace.createFile", { sessionId, ...params })
    },
    /** @experimental */
    fleet: {
      start: async (params) => connection.sendRequest("session.fleet.start", { sessionId, ...params })
    },
    /** @experimental */
    agent: {
      list: async () => connection.sendRequest("session.agent.list", { sessionId }),
      getCurrent: async () => connection.sendRequest("session.agent.getCurrent", { sessionId }),
      select: async (params) => connection.sendRequest("session.agent.select", { sessionId, ...params }),
      deselect: async () => connection.sendRequest("session.agent.deselect", { sessionId }),
      reload: async () => connection.sendRequest("session.agent.reload", { sessionId })
    },
    /** @experimental */
    skills: {
      list: async () => connection.sendRequest("session.skills.list", { sessionId }),
      enable: async (params) => connection.sendRequest("session.skills.enable", { sessionId, ...params }),
      disable: async (params) => connection.sendRequest("session.skills.disable", { sessionId, ...params }),
      reload: async () => connection.sendRequest("session.skills.reload", { sessionId })
    },
    /** @experimental */
    mcp: {
      list: async () => connection.sendRequest("session.mcp.list", { sessionId }),
      enable: async (params) => connection.sendRequest("session.mcp.enable", { sessionId, ...params }),
      disable: async (params) => connection.sendRequest("session.mcp.disable", { sessionId, ...params }),
      reload: async () => connection.sendRequest("session.mcp.reload", { sessionId })
    },
    /** @experimental */
    plugins: {
      list: async () => connection.sendRequest("session.plugins.list", { sessionId })
    },
    /** @experimental */
    extensions: {
      list: async () => connection.sendRequest("session.extensions.list", { sessionId }),
      enable: async (params) => connection.sendRequest("session.extensions.enable", { sessionId, ...params }),
      disable: async (params) => connection.sendRequest("session.extensions.disable", { sessionId, ...params }),
      reload: async () => connection.sendRequest("session.extensions.reload", { sessionId })
    },
    tools: {
      handlePendingToolCall: async (params) => connection.sendRequest("session.tools.handlePendingToolCall", { sessionId, ...params })
    },
    commands: {
      handlePendingCommand: async (params) => connection.sendRequest("session.commands.handlePendingCommand", { sessionId, ...params })
    },
    ui: {
      elicitation: async (params) => connection.sendRequest("session.ui.elicitation", { sessionId, ...params }),
      handlePendingElicitation: async (params) => connection.sendRequest("session.ui.handlePendingElicitation", { sessionId, ...params })
    },
    permissions: {
      handlePendingPermissionRequest: async (params) => connection.sendRequest("session.permissions.handlePendingPermissionRequest", { sessionId, ...params })
    },
    log: async (params) => connection.sendRequest("session.log", { sessionId, ...params }),
    shell: {
      exec: async (params) => connection.sendRequest("session.shell.exec", { sessionId, ...params }),
      kill: async (params) => connection.sendRequest("session.shell.kill", { sessionId, ...params })
    },
    /** @experimental */
    history: {
      compact: async () => connection.sendRequest("session.history.compact", { sessionId }),
      truncate: async (params) => connection.sendRequest("session.history.truncate", { sessionId, ...params })
    }
  };
}
function registerClientSessionApiHandlers(connection, getHandlers) {
  connection.onRequest("sessionFs.readFile", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.readFile(params);
  });
  connection.onRequest("sessionFs.writeFile", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.writeFile(params);
  });
  connection.onRequest("sessionFs.appendFile", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.appendFile(params);
  });
  connection.onRequest("sessionFs.exists", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.exists(params);
  });
  connection.onRequest("sessionFs.stat", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.stat(params);
  });
  connection.onRequest("sessionFs.mkdir", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.mkdir(params);
  });
  connection.onRequest("sessionFs.readdir", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.readdir(params);
  });
  connection.onRequest("sessionFs.readdirWithTypes", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.readdirWithTypes(params);
  });
  connection.onRequest("sessionFs.rm", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.rm(params);
  });
  connection.onRequest("sessionFs.rename", async (params) => {
    const handler = getHandlers(params.sessionId).sessionFs;
    if (!handler) throw new Error(`No sessionFs handler registered for session: ${params.sessionId}`);
    return handler.rename(params);
  });
}

// node_modules/@github/copilot-sdk/dist/sdkProtocolVersion.js
var SDK_PROTOCOL_VERSION = 3;
function getSdkProtocolVersion() {
  return SDK_PROTOCOL_VERSION;
}

// node_modules/@github/copilot-sdk/dist/session.js
var import_node = __toESM(require_node(), 1);

// node_modules/@github/copilot-sdk/dist/telemetry.js
async function getTraceContext(provider) {
  if (!provider) return {};
  try {
    return await provider() ?? {};
  } catch {
    return {};
  }
}

// node_modules/@github/copilot-sdk/dist/session.js
var NO_RESULT_PERMISSION_V2_ERROR = "Permission handlers cannot return 'no-result' when connected to a protocol v2 server.";
var CopilotSession = class {
  /**
   * Creates a new CopilotSession instance.
   *
   * @param sessionId - The unique identifier for this session
   * @param connection - The JSON-RPC message connection to the Copilot CLI
   * @param workspacePath - Path to the session workspace directory (when infinite sessions enabled)
   * @param traceContextProvider - Optional callback to get W3C Trace Context for outbound RPCs
   * @internal This constructor is internal. Use {@link CopilotClient.createSession} to create sessions.
   */
  constructor(sessionId, connection, _workspacePath, traceContextProvider) {
    this.sessionId = sessionId;
    this.connection = connection;
    this._workspacePath = _workspacePath;
    this.traceContextProvider = traceContextProvider;
  }
  eventHandlers = /* @__PURE__ */ new Set();
  typedEventHandlers = /* @__PURE__ */ new Map();
  toolHandlers = /* @__PURE__ */ new Map();
  commandHandlers = /* @__PURE__ */ new Map();
  permissionHandler;
  userInputHandler;
  elicitationHandler;
  hooks;
  transformCallbacks;
  _rpc = null;
  traceContextProvider;
  _capabilities = {};
  /** @internal Client session API handlers, populated by CopilotClient during create/resume. */
  clientSessionApis = {};
  /**
   * Typed session-scoped RPC methods.
   */
  get rpc() {
    if (!this._rpc) {
      this._rpc = createSessionRpc(this.connection, this.sessionId);
    }
    return this._rpc;
  }
  /**
   * Path to the session workspace directory when infinite sessions are enabled.
   * Contains checkpoints/, plan.md, and files/ subdirectories.
   * Undefined if infinite sessions are disabled.
   */
  get workspacePath() {
    return this._workspacePath;
  }
  /**
   * Host capabilities reported when the session was created or resumed.
   * Use this to check feature support before calling capability-gated APIs.
   */
  get capabilities() {
    return this._capabilities;
  }
  /**
   * Interactive UI methods for showing dialogs to the user.
   * Only available when the CLI host supports elicitation
   * (`session.capabilities.ui?.elicitation === true`).
   *
   * @example
   * ```typescript
   * if (session.capabilities.ui?.elicitation) {
   *   const ok = await session.ui.confirm("Deploy to production?");
   * }
   * ```
   */
  get ui() {
    return {
      elicitation: (params) => this._elicitation(params),
      confirm: (message) => this._confirm(message),
      select: (message, options) => this._select(message, options),
      input: (message, options) => this._input(message, options)
    };
  }
  /**
   * Sends a message to this session and waits for the response.
   *
   * The message is processed asynchronously. Subscribe to events via {@link on}
   * to receive streaming responses and other session events.
   *
   * @param options - The message options including the prompt and optional attachments
   * @returns A promise that resolves with the message ID of the response
   * @throws Error if the session has been disconnected or the connection fails
   *
   * @example
   * ```typescript
   * const messageId = await session.send({
   *   prompt: "Explain this code",
   *   attachments: [{ type: "file", path: "./src/index.ts" }]
   * });
   * ```
   */
  async send(options) {
    const response = await this.connection.sendRequest("session.send", {
      ...await getTraceContext(this.traceContextProvider),
      sessionId: this.sessionId,
      prompt: options.prompt,
      attachments: options.attachments,
      mode: options.mode
    });
    return response.messageId;
  }
  /**
   * Sends a message to this session and waits until the session becomes idle.
   *
   * This is a convenience method that combines {@link send} with waiting for
   * the `session.idle` event. Use this when you want to block until the
   * assistant has finished processing the message.
   *
   * Events are still delivered to handlers registered via {@link on} while waiting.
   *
   * @param options - The message options including the prompt and optional attachments
   * @param timeout - Timeout in milliseconds (default: 60000). Controls how long to wait; does not abort in-flight agent work.
   * @returns A promise that resolves with the final assistant message when the session becomes idle,
   *          or undefined if no assistant message was received
   * @throws Error if the timeout is reached before the session becomes idle
   * @throws Error if the session has been disconnected or the connection fails
   *
   * @example
   * ```typescript
   * // Send and wait for completion with default 60s timeout
   * const response = await session.sendAndWait({ prompt: "What is 2+2?" });
   * console.log(response?.data.content); // "4"
   * ```
   */
  async sendAndWait(options, timeout) {
    const effectiveTimeout = timeout ?? 6e4;
    let resolveIdle;
    let rejectWithError;
    const idlePromise = new Promise((resolve4, reject) => {
      resolveIdle = resolve4;
      rejectWithError = reject;
    });
    let lastAssistantMessage;
    const unsubscribe = this.on((event) => {
      if (event.type === "assistant.message") {
        lastAssistantMessage = event;
      } else if (event.type === "session.idle") {
        resolveIdle();
      } else if (event.type === "session.error") {
        const error = new Error(event.data.message);
        error.stack = event.data.stack;
        rejectWithError(error);
      }
    });
    let timeoutId;
    try {
      await this.send(options);
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(
          () => reject(
            new Error(
              `Timeout after ${effectiveTimeout}ms waiting for session.idle`
            )
          ),
          effectiveTimeout
        );
      });
      await Promise.race([idlePromise, timeoutPromise]);
      return lastAssistantMessage;
    } finally {
      if (timeoutId !== void 0) {
        clearTimeout(timeoutId);
      }
      unsubscribe();
    }
  }
  on(eventTypeOrHandler, handler) {
    if (typeof eventTypeOrHandler === "string" && handler) {
      const eventType = eventTypeOrHandler;
      if (!this.typedEventHandlers.has(eventType)) {
        this.typedEventHandlers.set(eventType, /* @__PURE__ */ new Set());
      }
      const storedHandler = handler;
      this.typedEventHandlers.get(eventType).add(storedHandler);
      return () => {
        const handlers = this.typedEventHandlers.get(eventType);
        if (handlers) {
          handlers.delete(storedHandler);
        }
      };
    }
    const wildcardHandler = eventTypeOrHandler;
    this.eventHandlers.add(wildcardHandler);
    return () => {
      this.eventHandlers.delete(wildcardHandler);
    };
  }
  /**
   * Dispatches an event to all registered handlers.
   * Also handles broadcast request events internally (external tool calls, permissions).
   *
   * @param event - The session event to dispatch
   * @internal This method is for internal use by the SDK.
   */
  _dispatchEvent(event) {
    this._handleBroadcastEvent(event);
    const typedHandlers = this.typedEventHandlers.get(event.type);
    if (typedHandlers) {
      for (const handler of typedHandlers) {
        try {
          handler(event);
        } catch (_error) {
        }
      }
    }
    for (const handler of this.eventHandlers) {
      try {
        handler(event);
      } catch (_error) {
      }
    }
  }
  /**
   * Handles broadcast request events by executing local handlers and responding via RPC.
   * Handlers are dispatched as fire-and-forget — rejections propagate as unhandled promise
   * rejections, consistent with standard EventEmitter / event handler semantics.
   * @internal
   */
  _handleBroadcastEvent(event) {
    if (event.type === "external_tool.requested") {
      const { requestId, toolName } = event.data;
      const args = event.data.arguments;
      const toolCallId = event.data.toolCallId;
      const traceparent = event.data.traceparent;
      const tracestate = event.data.tracestate;
      const handler = this.toolHandlers.get(toolName);
      if (handler) {
        void this._executeToolAndRespond(
          requestId,
          toolName,
          toolCallId,
          args,
          handler,
          traceparent,
          tracestate
        );
      }
    } else if (event.type === "permission.requested") {
      const { requestId, permissionRequest, resolvedByHook } = event.data;
      if (resolvedByHook) {
        return;
      }
      if (this.permissionHandler) {
        void this._executePermissionAndRespond(requestId, permissionRequest);
      }
    } else if (event.type === "command.execute") {
      const { requestId, commandName, command, args } = event.data;
      void this._executeCommandAndRespond(requestId, commandName, command, args);
    } else if (event.type === "elicitation.requested") {
      if (this.elicitationHandler) {
        const { message, requestedSchema, mode, elicitationSource, url, requestId } = event.data;
        void this._handleElicitationRequest(
          {
            sessionId: this.sessionId,
            message,
            requestedSchema,
            mode,
            elicitationSource,
            url
          },
          requestId
        );
      }
    } else if (event.type === "capabilities.changed") {
      this._capabilities = { ...this._capabilities, ...event.data };
    }
  }
  /**
   * Executes a tool handler and sends the result back via RPC.
   * @internal
   */
  async _executeToolAndRespond(requestId, toolName, toolCallId, args, handler, traceparent, tracestate) {
    try {
      const rawResult = await handler(args, {
        sessionId: this.sessionId,
        toolCallId,
        toolName,
        arguments: args,
        traceparent,
        tracestate
      });
      let result;
      if (rawResult == null) {
        result = "";
      } else if (typeof rawResult === "string") {
        result = rawResult;
      } else if (isToolResultObject(rawResult)) {
        result = rawResult;
      } else {
        result = JSON.stringify(rawResult);
      }
      await this.rpc.tools.handlePendingToolCall({ requestId, result });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      try {
        await this.rpc.tools.handlePendingToolCall({ requestId, error: message });
      } catch (rpcError) {
        if (!(rpcError instanceof import_node.ConnectionError || rpcError instanceof import_node.ResponseError)) {
          throw rpcError;
        }
      }
    }
  }
  /**
   * Executes a permission handler and sends the result back via RPC.
   * @internal
   */
  async _executePermissionAndRespond(requestId, permissionRequest) {
    try {
      const result = await this.permissionHandler(permissionRequest, {
        sessionId: this.sessionId
      });
      if (result.kind === "no-result") {
        return;
      }
      await this.rpc.permissions.handlePendingPermissionRequest({ requestId, result });
    } catch (_error) {
      try {
        await this.rpc.permissions.handlePendingPermissionRequest({
          requestId,
          result: {
            kind: "denied-no-approval-rule-and-could-not-request-from-user"
          }
        });
      } catch (rpcError) {
        if (!(rpcError instanceof import_node.ConnectionError || rpcError instanceof import_node.ResponseError)) {
          throw rpcError;
        }
      }
    }
  }
  /**
   * Executes a command handler and sends the result back via RPC.
   * @internal
   */
  async _executeCommandAndRespond(requestId, commandName, command, args) {
    const handler = this.commandHandlers.get(commandName);
    if (!handler) {
      try {
        await this.rpc.commands.handlePendingCommand({
          requestId,
          error: `Unknown command: ${commandName}`
        });
      } catch (rpcError) {
        if (!(rpcError instanceof import_node.ConnectionError || rpcError instanceof import_node.ResponseError)) {
          throw rpcError;
        }
      }
      return;
    }
    try {
      await handler({ sessionId: this.sessionId, command, commandName, args });
      await this.rpc.commands.handlePendingCommand({ requestId });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      try {
        await this.rpc.commands.handlePendingCommand({ requestId, error: message });
      } catch (rpcError) {
        if (!(rpcError instanceof import_node.ConnectionError || rpcError instanceof import_node.ResponseError)) {
          throw rpcError;
        }
      }
    }
  }
  /**
   * Registers custom tool handlers for this session.
   *
   * Tools allow the assistant to execute custom functions. When the assistant
   * invokes a tool, the corresponding handler is called with the tool arguments.
   *
   * @param tools - An array of tool definitions with their handlers, or undefined to clear all tools
   * @internal This method is typically called internally when creating a session with tools.
   */
  registerTools(tools) {
    this.toolHandlers.clear();
    if (!tools) {
      return;
    }
    for (const tool of tools) {
      this.toolHandlers.set(tool.name, tool.handler);
    }
  }
  /**
   * Retrieves a registered tool handler by name.
   *
   * @param name - The name of the tool to retrieve
   * @returns The tool handler if found, or undefined
   * @internal This method is for internal use by the SDK.
   */
  getToolHandler(name) {
    return this.toolHandlers.get(name);
  }
  /**
   * Registers command handlers for this session.
   *
   * @param commands - An array of command definitions with handlers, or undefined to clear
   * @internal This method is typically called internally when creating/resuming a session.
   */
  registerCommands(commands) {
    this.commandHandlers.clear();
    if (!commands) {
      return;
    }
    for (const cmd of commands) {
      this.commandHandlers.set(cmd.name, cmd.handler);
    }
  }
  /**
   * Registers the elicitation handler for this session.
   *
   * @param handler - The handler to invoke when the server dispatches an elicitation request
   * @internal This method is typically called internally when creating/resuming a session.
   */
  registerElicitationHandler(handler) {
    this.elicitationHandler = handler;
  }
  /**
   * Handles an elicitation.requested broadcast event.
   * Invokes the registered handler and responds via handlePendingElicitation RPC.
   * @internal
   */
  async _handleElicitationRequest(context, requestId) {
    if (!this.elicitationHandler) {
      return;
    }
    try {
      const result = await this.elicitationHandler(context);
      await this.rpc.ui.handlePendingElicitation({ requestId, result });
    } catch {
      try {
        await this.rpc.ui.handlePendingElicitation({
          requestId,
          result: { action: "cancel" }
        });
      } catch (rpcError) {
        if (!(rpcError instanceof import_node.ConnectionError || rpcError instanceof import_node.ResponseError)) {
          throw rpcError;
        }
      }
    }
  }
  /**
   * Sets the host capabilities for this session.
   *
   * @param capabilities - The capabilities object from the create/resume response
   * @internal This method is typically called internally when creating/resuming a session.
   */
  setCapabilities(capabilities) {
    this._capabilities = capabilities ?? {};
  }
  assertElicitation() {
    if (!this._capabilities.ui?.elicitation) {
      throw new Error(
        "Elicitation is not supported by the host. Check session.capabilities.ui?.elicitation before calling UI methods."
      );
    }
  }
  async _elicitation(params) {
    this.assertElicitation();
    return this.rpc.ui.elicitation({
      message: params.message,
      requestedSchema: params.requestedSchema
    });
  }
  async _confirm(message) {
    this.assertElicitation();
    const result = await this.rpc.ui.elicitation({
      message,
      requestedSchema: {
        type: "object",
        properties: {
          confirmed: { type: "boolean", default: true }
        },
        required: ["confirmed"]
      }
    });
    return result.action === "accept" && result.content?.confirmed === true;
  }
  async _select(message, options) {
    this.assertElicitation();
    const result = await this.rpc.ui.elicitation({
      message,
      requestedSchema: {
        type: "object",
        properties: {
          selection: { type: "string", enum: options }
        },
        required: ["selection"]
      }
    });
    if (result.action === "accept" && result.content?.selection != null) {
      return result.content.selection;
    }
    return null;
  }
  async _input(message, options) {
    this.assertElicitation();
    const field = { type: "string" };
    if (options?.title) field.title = options.title;
    if (options?.description) field.description = options.description;
    if (options?.minLength != null) field.minLength = options.minLength;
    if (options?.maxLength != null) field.maxLength = options.maxLength;
    if (options?.format) field.format = options.format;
    if (options?.default != null) field.default = options.default;
    const result = await this.rpc.ui.elicitation({
      message,
      requestedSchema: {
        type: "object",
        properties: {
          value: field
        },
        required: ["value"]
      }
    });
    if (result.action === "accept" && result.content?.value != null) {
      return result.content.value;
    }
    return null;
  }
  /**
   * Registers a handler for permission requests.
   *
   * When the assistant needs permission to perform certain actions (e.g., file operations),
   * this handler is called to approve or deny the request.
   *
   * @param handler - The permission handler function, or undefined to remove the handler
   * @internal This method is typically called internally when creating a session.
   */
  registerPermissionHandler(handler) {
    this.permissionHandler = handler;
  }
  /**
   * Registers a user input handler for ask_user requests.
   *
   * When the agent needs input from the user (via ask_user tool),
   * this handler is called to provide the response.
   *
   * @param handler - The user input handler function, or undefined to remove the handler
   * @internal This method is typically called internally when creating a session.
   */
  registerUserInputHandler(handler) {
    this.userInputHandler = handler;
  }
  /**
   * Registers hook handlers for session lifecycle events.
   *
   * Hooks allow custom logic to be executed at various points during
   * the session lifecycle (before/after tool use, session start/end, etc.).
   *
   * @param hooks - The hook handlers object, or undefined to remove all hooks
   * @internal This method is typically called internally when creating a session.
   */
  registerHooks(hooks) {
    this.hooks = hooks;
  }
  /**
   * Registers transform callbacks for system message sections.
   *
   * @param callbacks - Map of section ID to transform callback, or undefined to clear
   * @internal This method is typically called internally when creating a session.
   */
  registerTransformCallbacks(callbacks) {
    this.transformCallbacks = callbacks;
  }
  /**
   * Handles a systemMessage.transform request from the runtime.
   * Dispatches each section to its registered transform callback.
   *
   * @param sections - Map of section IDs to their current rendered content
   * @returns A promise that resolves with the transformed sections
   * @internal This method is for internal use by the SDK.
   */
  async _handleSystemMessageTransform(sections) {
    const result = {};
    for (const [sectionId, { content }] of Object.entries(sections)) {
      const callback = this.transformCallbacks?.get(sectionId);
      if (callback) {
        try {
          const transformed = await callback(content);
          result[sectionId] = { content: transformed };
        } catch (_error) {
          result[sectionId] = { content };
        }
      } else {
        result[sectionId] = { content };
      }
    }
    return { sections: result };
  }
  /**
   * Handles a permission request in the v2 protocol format (synchronous RPC).
   * Used as a back-compat adapter when connected to a v2 server.
   *
   * @param request - The permission request data from the CLI
   * @returns A promise that resolves with the permission decision
   * @internal This method is for internal use by the SDK.
   */
  async _handlePermissionRequestV2(request) {
    if (!this.permissionHandler) {
      return { kind: "denied-no-approval-rule-and-could-not-request-from-user" };
    }
    try {
      const result = await this.permissionHandler(request, {
        sessionId: this.sessionId
      });
      if (result.kind === "no-result") {
        throw new Error(NO_RESULT_PERMISSION_V2_ERROR);
      }
      return result;
    } catch (error) {
      if (error instanceof Error && error.message === NO_RESULT_PERMISSION_V2_ERROR) {
        throw error;
      }
      return { kind: "denied-no-approval-rule-and-could-not-request-from-user" };
    }
  }
  /**
   * Handles a user input request from the Copilot CLI.
   *
   * @param request - The user input request data from the CLI
   * @returns A promise that resolves with the user's response
   * @internal This method is for internal use by the SDK.
   */
  async _handleUserInputRequest(request) {
    if (!this.userInputHandler) {
      throw new Error("User input requested but no handler registered");
    }
    try {
      const result = await this.userInputHandler(request, {
        sessionId: this.sessionId
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Handles a hooks invocation from the Copilot CLI.
   *
   * @param hookType - The type of hook being invoked
   * @param input - The input data for the hook
   * @returns A promise that resolves with the hook output, or undefined
   * @internal This method is for internal use by the SDK.
   */
  async _handleHooksInvoke(hookType, input) {
    if (!this.hooks) {
      return void 0;
    }
    const handlerMap = {
      preToolUse: this.hooks.onPreToolUse,
      postToolUse: this.hooks.onPostToolUse,
      userPromptSubmitted: this.hooks.onUserPromptSubmitted,
      sessionStart: this.hooks.onSessionStart,
      sessionEnd: this.hooks.onSessionEnd,
      errorOccurred: this.hooks.onErrorOccurred
    };
    const handler = handlerMap[hookType];
    if (!handler) {
      return void 0;
    }
    try {
      const result = await handler(input, { sessionId: this.sessionId });
      return result;
    } catch (_error) {
      return void 0;
    }
  }
  /**
   * Retrieves all events and messages from this session's history.
   *
   * This returns the complete conversation history including user messages,
   * assistant responses, tool executions, and other session events.
   *
   * @returns A promise that resolves with an array of all session events
   * @throws Error if the session has been disconnected or the connection fails
   *
   * @example
   * ```typescript
   * const events = await session.getMessages();
   * for (const event of events) {
   *   if (event.type === "assistant.message") {
   *     console.log("Assistant:", event.data.content);
   *   }
   * }
   * ```
   */
  async getMessages() {
    const response = await this.connection.sendRequest("session.getMessages", {
      sessionId: this.sessionId
    });
    return response.events;
  }
  /**
   * Disconnects this session and releases all in-memory resources (event handlers,
   * tool handlers, permission handlers).
   *
   * Session state on disk (conversation history, planning state, artifacts) is
   * preserved, so the conversation can be resumed later by calling
   * {@link CopilotClient.resumeSession} with the session ID. To permanently
   * remove all session data including files on disk, use
   * {@link CopilotClient.deleteSession} instead.
   *
   * After calling this method, the session object can no longer be used.
   *
   * @returns A promise that resolves when the session is disconnected
   * @throws Error if the connection fails
   *
   * @example
   * ```typescript
   * // Clean up when done — session can still be resumed later
   * await session.disconnect();
   * ```
   */
  async disconnect() {
    await this.connection.sendRequest("session.destroy", {
      sessionId: this.sessionId
    });
    this.eventHandlers.clear();
    this.typedEventHandlers.clear();
    this.toolHandlers.clear();
    this.permissionHandler = void 0;
  }
  /**
   * @deprecated Use {@link disconnect} instead. This method will be removed in a future release.
   *
   * Disconnects this session and releases all in-memory resources.
   * Session data on disk is preserved for later resumption.
   *
   * @returns A promise that resolves when the session is disconnected
   * @throws Error if the connection fails
   */
  async destroy() {
    return this.disconnect();
  }
  /** Enables `await using session = ...` syntax for automatic cleanup. */
  async [Symbol.asyncDispose]() {
    return this.disconnect();
  }
  /**
   * Aborts the currently processing message in this session.
   *
   * Use this to cancel a long-running request. The session remains valid
   * and can continue to be used for new messages.
   *
   * @returns A promise that resolves when the abort request is acknowledged
   * @throws Error if the session has been disconnected or the connection fails
   *
   * @example
   * ```typescript
   * // Start a long-running request
   * const messagePromise = session.send({ prompt: "Write a very long story..." });
   *
   * // Abort after 5 seconds
   * setTimeout(async () => {
   *   await session.abort();
   * }, 5000);
   * ```
   */
  async abort() {
    await this.connection.sendRequest("session.abort", {
      sessionId: this.sessionId
    });
  }
  /**
   * Change the model for this session.
   * The new model takes effect for the next message. Conversation history is preserved.
   *
   * @param model - Model ID to switch to
   * @param options - Optional settings for the new model
   *
   * @example
   * ```typescript
   * await session.setModel("gpt-4.1");
   * await session.setModel("claude-sonnet-4.6", { reasoningEffort: "high" });
   * ```
   */
  async setModel(model, options) {
    await this.rpc.model.switchTo({ modelId: model, ...options });
  }
  /**
   * Log a message to the session timeline.
   * The message appears in the session event stream and is visible to SDK consumers
   * and (for non-ephemeral messages) persisted to the session event log on disk.
   *
   * @param message - Human-readable message text
   * @param options - Optional log level and ephemeral flag
   *
   * @example
   * ```typescript
   * await session.log("Processing started");
   * await session.log("Disk usage high", { level: "warning" });
   * await session.log("Connection failed", { level: "error" });
   * await session.log("Debug info", { ephemeral: true });
   * ```
   */
  async log(message, options) {
    await this.rpc.log({ message, ...options });
  }
};
function isToolResultObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (!("textResultForLlm" in value) || typeof value.textResultForLlm !== "string") {
    return false;
  }
  if (!("resultType" in value) || typeof value.resultType !== "string") {
    return false;
  }
  const allowedResultTypes = [
    "success",
    "failure",
    "rejected",
    "denied",
    "timeout"
  ];
  return allowedResultTypes.includes(value.resultType);
}

// node_modules/@github/copilot-sdk/dist/client.js
var import_meta = {};
var MIN_PROTOCOL_VERSION = 2;
function isZodSchema(value) {
  return value != null && typeof value === "object" && "toJSONSchema" in value && typeof value.toJSONSchema === "function";
}
function toJsonSchema(parameters) {
  if (!parameters) return void 0;
  if (isZodSchema(parameters)) {
    return parameters.toJSONSchema();
  }
  return parameters;
}
function extractTransformCallbacks(systemMessage) {
  if (!systemMessage || systemMessage.mode !== "customize" || !systemMessage.sections) {
    return { wirePayload: systemMessage, transformCallbacks: void 0 };
  }
  const transformCallbacks = /* @__PURE__ */ new Map();
  const wireSections = {};
  for (const [sectionId, override] of Object.entries(systemMessage.sections)) {
    if (!override) continue;
    if (typeof override.action === "function") {
      transformCallbacks.set(sectionId, override.action);
      wireSections[sectionId] = { action: "transform" };
    } else {
      wireSections[sectionId] = { action: override.action, content: override.content };
    }
  }
  if (transformCallbacks.size === 0) {
    return { wirePayload: systemMessage, transformCallbacks: void 0 };
  }
  const wirePayload = {
    ...systemMessage,
    sections: wireSections
  };
  return { wirePayload, transformCallbacks };
}
function getNodeExecPath() {
  if (process.versions.bun) {
    return "node";
  }
  return process.execPath;
}
function getBundledCliPath() {
  if (typeof import_meta.resolve === "function") {
    const sdkUrl = import_meta.resolve("@github/copilot/sdk");
    const sdkPath = (0, import_node_url.fileURLToPath)(sdkUrl);
    return (0, import_node_path.join)((0, import_node_path.dirname)((0, import_node_path.dirname)(sdkPath)), "index.js");
  }
  const req = (0, import_node_module.createRequire)(__filename);
  const searchPaths = req.resolve.paths("@github/copilot") ?? [];
  for (const base of searchPaths) {
    const candidate = (0, import_node_path.join)(base, "@github", "copilot", "index.js");
    if ((0, import_node_fs.existsSync)(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `Could not find @github/copilot package. Searched ${searchPaths.length} paths. Ensure it is installed, or pass cliPath/cliUrl to CopilotClient.`
  );
}
var CopilotClient = class _CopilotClient {
  cliProcess = null;
  connection = null;
  socket = null;
  actualPort = null;
  actualHost = "localhost";
  state = "disconnected";
  sessions = /* @__PURE__ */ new Map();
  stderrBuffer = "";
  // Captures CLI stderr for error messages
  options;
  isExternalServer = false;
  forceStopping = false;
  onListModels;
  onGetTraceContext;
  modelsCache = null;
  modelsCacheLock = Promise.resolve();
  sessionLifecycleHandlers = /* @__PURE__ */ new Set();
  typedLifecycleHandlers = /* @__PURE__ */ new Map();
  _rpc = null;
  processExitPromise = null;
  // Rejects when CLI process exits
  negotiatedProtocolVersion = null;
  /** Connection-level session filesystem config, set via constructor option. */
  sessionFsConfig = null;
  /**
   * Typed server-scoped RPC methods.
   * @throws Error if the client is not connected
   */
  get rpc() {
    if (!this.connection) {
      throw new Error("Client is not connected. Call start() first.");
    }
    if (!this._rpc) {
      this._rpc = createServerRpc(this.connection);
    }
    return this._rpc;
  }
  /**
   * Creates a new CopilotClient instance.
   *
   * @param options - Configuration options for the client
   * @throws Error if mutually exclusive options are provided (e.g., cliUrl with useStdio or cliPath)
   *
   * @example
   * ```typescript
   * // Default options - spawns CLI server using stdio
   * const client = new CopilotClient();
   *
   * // Connect to an existing server
   * const client = new CopilotClient({ cliUrl: "localhost:3000" });
   *
   * // Custom CLI path with specific log level
   * const client = new CopilotClient({
   *   cliPath: "/usr/local/bin/copilot",
   *   logLevel: "debug"
   * });
   * ```
   */
  constructor(options = {}) {
    if (options.cliUrl && (options.useStdio === true || options.cliPath)) {
      throw new Error("cliUrl is mutually exclusive with useStdio and cliPath");
    }
    if (options.isChildProcess && (options.cliUrl || options.useStdio === false)) {
      throw new Error(
        "isChildProcess must be used in conjunction with useStdio and not with cliUrl"
      );
    }
    if (options.cliUrl && (options.githubToken || options.useLoggedInUser !== void 0)) {
      throw new Error(
        "githubToken and useLoggedInUser cannot be used with cliUrl (external server manages its own auth)"
      );
    }
    if (options.sessionFs) {
      this.validateSessionFsConfig(options.sessionFs);
    }
    if (options.cliUrl) {
      const { host, port } = this.parseCliUrl(options.cliUrl);
      this.actualHost = host;
      this.actualPort = port;
      this.isExternalServer = true;
    }
    if (options.isChildProcess) {
      this.isExternalServer = true;
    }
    this.onListModels = options.onListModels;
    this.onGetTraceContext = options.onGetTraceContext;
    this.sessionFsConfig = options.sessionFs ?? null;
    const effectiveEnv = options.env ?? process.env;
    this.options = {
      cliPath: options.cliUrl ? void 0 : options.cliPath || effectiveEnv.COPILOT_CLI_PATH || getBundledCliPath(),
      cliArgs: options.cliArgs ?? [],
      cwd: options.cwd ?? process.cwd(),
      port: options.port || 0,
      useStdio: options.cliUrl ? false : options.useStdio ?? true,
      // Default to stdio unless cliUrl is provided
      isChildProcess: options.isChildProcess ?? false,
      cliUrl: options.cliUrl,
      logLevel: options.logLevel || "debug",
      autoStart: options.autoStart ?? true,
      autoRestart: false,
      env: effectiveEnv,
      githubToken: options.githubToken,
      // Default useLoggedInUser to false when githubToken is provided, otherwise true
      useLoggedInUser: options.useLoggedInUser ?? (options.githubToken ? false : true),
      telemetry: options.telemetry
    };
  }
  /**
   * Parse CLI URL into host and port
   * Supports formats: "host:port", "http://host:port", "https://host:port", or just "port"
   */
  parseCliUrl(url) {
    let cleanUrl = url.replace(/^https?:\/\//, "");
    if (/^\d+$/.test(cleanUrl)) {
      return { host: "localhost", port: parseInt(cleanUrl, 10) };
    }
    const parts = cleanUrl.split(":");
    if (parts.length !== 2) {
      throw new Error(
        `Invalid cliUrl format: ${url}. Expected "host:port", "http://host:port", or "port"`
      );
    }
    const host = parts[0] || "localhost";
    const port = parseInt(parts[1], 10);
    if (isNaN(port) || port <= 0 || port > 65535) {
      throw new Error(`Invalid port in cliUrl: ${url}`);
    }
    return { host, port };
  }
  validateSessionFsConfig(config) {
    if (!config.initialCwd) {
      throw new Error("sessionFs.initialCwd is required");
    }
    if (!config.sessionStatePath) {
      throw new Error("sessionFs.sessionStatePath is required");
    }
    if (config.conventions !== "windows" && config.conventions !== "posix") {
      throw new Error("sessionFs.conventions must be either 'windows' or 'posix'");
    }
  }
  /**
   * Starts the CLI server and establishes a connection.
   *
   * If connecting to an external server (via cliUrl), only establishes the connection.
   * Otherwise, spawns the CLI server process and then connects.
   *
   * This method is called automatically when creating a session if `autoStart` is true (default).
   *
   * @returns A promise that resolves when the connection is established
   * @throws Error if the server fails to start or the connection fails
   *
   * @example
   * ```typescript
   * const client = new CopilotClient({ autoStart: false });
   * await client.start();
   * // Now ready to create sessions
   * ```
   */
  async start() {
    if (this.state === "connected") {
      return;
    }
    this.state = "connecting";
    try {
      if (!this.isExternalServer) {
        await this.startCLIServer();
      }
      await this.connectToServer();
      await this.verifyProtocolVersion();
      if (this.sessionFsConfig) {
        await this.connection.sendRequest("sessionFs.setProvider", {
          initialCwd: this.sessionFsConfig.initialCwd,
          sessionStatePath: this.sessionFsConfig.sessionStatePath,
          conventions: this.sessionFsConfig.conventions
        });
      }
      this.state = "connected";
    } catch (error) {
      this.state = "error";
      throw error;
    }
  }
  /**
   * Stops the CLI server and closes all active sessions.
   *
   * This method performs graceful cleanup:
   * 1. Closes all active sessions (releases in-memory resources)
   * 2. Closes the JSON-RPC connection
   * 3. Terminates the CLI server process (if spawned by this client)
   *
   * Note: session data on disk is preserved, so sessions can be resumed later.
   * To permanently remove session data before stopping, call
   * {@link deleteSession} for each session first.
   *
   * @returns A promise that resolves with an array of errors encountered during cleanup.
   *          An empty array indicates all cleanup succeeded.
   *
   * @example
   * ```typescript
   * const errors = await client.stop();
   * if (errors.length > 0) {
   *   console.error("Cleanup errors:", errors);
   * }
   * ```
   */
  async stop() {
    const errors = [];
    for (const session of this.sessions.values()) {
      const sessionId = session.sessionId;
      let lastError = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await session.disconnect();
          lastError = null;
          break;
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          if (attempt < 3) {
            const delay = 100 * Math.pow(2, attempt - 1);
            await new Promise((resolve4) => setTimeout(resolve4, delay));
          }
        }
      }
      if (lastError) {
        errors.push(
          new Error(
            `Failed to disconnect session ${sessionId} after 3 attempts: ${lastError.message}`
          )
        );
      }
    }
    this.sessions.clear();
    if (this.connection) {
      try {
        this.connection.dispose();
      } catch (error) {
        errors.push(
          new Error(
            `Failed to dispose connection: ${error instanceof Error ? error.message : String(error)}`
          )
        );
      }
      this.connection = null;
      this._rpc = null;
    }
    this.modelsCache = null;
    if (this.socket) {
      try {
        this.socket.end();
      } catch (error) {
        errors.push(
          new Error(
            `Failed to close socket: ${error instanceof Error ? error.message : String(error)}`
          )
        );
      }
      this.socket = null;
    }
    if (this.cliProcess && !this.isExternalServer) {
      try {
        this.cliProcess.kill();
      } catch (error) {
        errors.push(
          new Error(
            `Failed to kill CLI process: ${error instanceof Error ? error.message : String(error)}`
          )
        );
      }
      this.cliProcess = null;
    }
    this.state = "disconnected";
    this.actualPort = null;
    this.stderrBuffer = "";
    this.processExitPromise = null;
    return errors;
  }
  /**
   * Forcefully stops the CLI server without graceful cleanup.
   *
   * Use this when {@link stop} fails or takes too long. This method:
   * - Clears all sessions immediately without destroying them
   * - Force closes the connection
   * - Sends SIGKILL to the CLI process (if spawned by this client)
   *
   * @returns A promise that resolves when the force stop is complete
   *
   * @example
   * ```typescript
   * // If normal stop hangs, force stop
   * const stopPromise = client.stop();
   * const timeout = new Promise((_, reject) =>
   *   setTimeout(() => reject(new Error("Timeout")), 5000)
   * );
   *
   * try {
   *   await Promise.race([stopPromise, timeout]);
   * } catch {
   *   await client.forceStop();
   * }
   * ```
   */
  async forceStop() {
    this.forceStopping = true;
    this.sessions.clear();
    if (this.connection) {
      try {
        this.connection.dispose();
      } catch {
      }
      this.connection = null;
      this._rpc = null;
    }
    this.modelsCache = null;
    if (this.socket) {
      try {
        this.socket.destroy();
      } catch {
      }
      this.socket = null;
    }
    if (this.cliProcess && !this.isExternalServer) {
      try {
        this.cliProcess.kill("SIGKILL");
      } catch {
      }
      this.cliProcess = null;
    }
    this.state = "disconnected";
    this.actualPort = null;
    this.stderrBuffer = "";
    this.processExitPromise = null;
  }
  /**
   * Creates a new conversation session with the Copilot CLI.
   *
   * Sessions maintain conversation state, handle events, and manage tool execution.
   * If the client is not connected and `autoStart` is enabled, this will automatically
   * start the connection.
   *
   * @param config - Optional configuration for the session
   * @returns A promise that resolves with the created session
   * @throws Error if the client is not connected and autoStart is disabled
   *
   * @example
   * ```typescript
   * // Basic session
   * const session = await client.createSession({ onPermissionRequest: approveAll });
   *
   * // Session with model and tools
   * const session = await client.createSession({
   *   onPermissionRequest: approveAll,
   *   model: "gpt-4",
   *   tools: [{
   *     name: "get_weather",
   *     description: "Get weather for a location",
   *     parameters: { type: "object", properties: { location: { type: "string" } } },
   *     handler: async (args) => ({ temperature: 72 })
   *   }]
   * });
   * ```
   */
  async createSession(config) {
    if (!config?.onPermissionRequest) {
      throw new Error(
        "An onPermissionRequest handler is required when creating a session. For example, to allow all permissions, use { onPermissionRequest: approveAll }."
      );
    }
    if (!this.connection) {
      if (this.options.autoStart) {
        await this.start();
      } else {
        throw new Error("Client not connected. Call start() first.");
      }
    }
    const sessionId = config.sessionId ?? (0, import_node_crypto.randomUUID)();
    const session = new CopilotSession(
      sessionId,
      this.connection,
      void 0,
      this.onGetTraceContext
    );
    session.registerTools(config.tools);
    session.registerCommands(config.commands);
    session.registerPermissionHandler(config.onPermissionRequest);
    if (config.onUserInputRequest) {
      session.registerUserInputHandler(config.onUserInputRequest);
    }
    if (config.onElicitationRequest) {
      session.registerElicitationHandler(config.onElicitationRequest);
    }
    if (config.hooks) {
      session.registerHooks(config.hooks);
    }
    const { wirePayload: wireSystemMessage, transformCallbacks } = extractTransformCallbacks(
      config.systemMessage
    );
    if (transformCallbacks) {
      session.registerTransformCallbacks(transformCallbacks);
    }
    if (config.onEvent) {
      session.on(config.onEvent);
    }
    this.sessions.set(sessionId, session);
    if (this.sessionFsConfig) {
      if (config.createSessionFsHandler) {
        session.clientSessionApis.sessionFs = config.createSessionFsHandler(session);
      } else {
        throw new Error(
          "createSessionFsHandler is required in session config when sessionFs is enabled in client options."
        );
      }
    }
    try {
      const response = await this.connection.sendRequest("session.create", {
        ...await getTraceContext(this.onGetTraceContext),
        model: config.model,
        sessionId,
        clientName: config.clientName,
        reasoningEffort: config.reasoningEffort,
        tools: config.tools?.map((tool) => ({
          name: tool.name,
          description: tool.description,
          parameters: toJsonSchema(tool.parameters),
          overridesBuiltInTool: tool.overridesBuiltInTool,
          skipPermission: tool.skipPermission
        })),
        commands: config.commands?.map((cmd) => ({
          name: cmd.name,
          description: cmd.description
        })),
        systemMessage: wireSystemMessage,
        availableTools: config.availableTools,
        excludedTools: config.excludedTools,
        provider: config.provider,
        modelCapabilities: config.modelCapabilities,
        requestPermission: true,
        requestUserInput: !!config.onUserInputRequest,
        requestElicitation: !!config.onElicitationRequest,
        hooks: !!(config.hooks && Object.values(config.hooks).some(Boolean)),
        workingDirectory: config.workingDirectory,
        streaming: config.streaming,
        mcpServers: config.mcpServers,
        envValueMode: "direct",
        customAgents: config.customAgents,
        agent: config.agent,
        configDir: config.configDir,
        enableConfigDiscovery: config.enableConfigDiscovery,
        skillDirectories: config.skillDirectories,
        disabledSkills: config.disabledSkills,
        infiniteSessions: config.infiniteSessions
      });
      const { workspacePath, capabilities } = response;
      session["_workspacePath"] = workspacePath;
      session.setCapabilities(capabilities);
    } catch (e) {
      this.sessions.delete(sessionId);
      throw e;
    }
    return session;
  }
  /**
   * Resumes an existing conversation session by its ID.
   *
   * This allows you to continue a previous conversation, maintaining all
   * conversation history. The session must have been previously created
   * and not deleted.
   *
   * @param sessionId - The ID of the session to resume
   * @param config - Optional configuration for the resumed session
   * @returns A promise that resolves with the resumed session
   * @throws Error if the session does not exist or the client is not connected
   *
   * @example
   * ```typescript
   * // Resume a previous session
   * const session = await client.resumeSession("session-123", { onPermissionRequest: approveAll });
   *
   * // Resume with new tools
   * const session = await client.resumeSession("session-123", {
   *   onPermissionRequest: approveAll,
   *   tools: [myNewTool]
   * });
   * ```
   */
  async resumeSession(sessionId, config) {
    if (!config?.onPermissionRequest) {
      throw new Error(
        "An onPermissionRequest handler is required when resuming a session. For example, to allow all permissions, use { onPermissionRequest: approveAll }."
      );
    }
    if (!this.connection) {
      if (this.options.autoStart) {
        await this.start();
      } else {
        throw new Error("Client not connected. Call start() first.");
      }
    }
    const session = new CopilotSession(
      sessionId,
      this.connection,
      void 0,
      this.onGetTraceContext
    );
    session.registerTools(config.tools);
    session.registerCommands(config.commands);
    session.registerPermissionHandler(config.onPermissionRequest);
    if (config.onUserInputRequest) {
      session.registerUserInputHandler(config.onUserInputRequest);
    }
    if (config.onElicitationRequest) {
      session.registerElicitationHandler(config.onElicitationRequest);
    }
    if (config.hooks) {
      session.registerHooks(config.hooks);
    }
    const { wirePayload: wireSystemMessage, transformCallbacks } = extractTransformCallbacks(
      config.systemMessage
    );
    if (transformCallbacks) {
      session.registerTransformCallbacks(transformCallbacks);
    }
    if (config.onEvent) {
      session.on(config.onEvent);
    }
    this.sessions.set(sessionId, session);
    if (this.sessionFsConfig) {
      if (config.createSessionFsHandler) {
        session.clientSessionApis.sessionFs = config.createSessionFsHandler(session);
      } else {
        throw new Error(
          "createSessionFsHandler is required in session config when sessionFs is enabled in client options."
        );
      }
    }
    try {
      const response = await this.connection.sendRequest("session.resume", {
        ...await getTraceContext(this.onGetTraceContext),
        sessionId,
        clientName: config.clientName,
        model: config.model,
        reasoningEffort: config.reasoningEffort,
        systemMessage: wireSystemMessage,
        availableTools: config.availableTools,
        excludedTools: config.excludedTools,
        tools: config.tools?.map((tool) => ({
          name: tool.name,
          description: tool.description,
          parameters: toJsonSchema(tool.parameters),
          overridesBuiltInTool: tool.overridesBuiltInTool,
          skipPermission: tool.skipPermission
        })),
        commands: config.commands?.map((cmd) => ({
          name: cmd.name,
          description: cmd.description
        })),
        provider: config.provider,
        modelCapabilities: config.modelCapabilities,
        requestPermission: true,
        requestUserInput: !!config.onUserInputRequest,
        requestElicitation: !!config.onElicitationRequest,
        hooks: !!(config.hooks && Object.values(config.hooks).some(Boolean)),
        workingDirectory: config.workingDirectory,
        configDir: config.configDir,
        enableConfigDiscovery: config.enableConfigDiscovery,
        streaming: config.streaming,
        mcpServers: config.mcpServers,
        envValueMode: "direct",
        customAgents: config.customAgents,
        agent: config.agent,
        skillDirectories: config.skillDirectories,
        disabledSkills: config.disabledSkills,
        infiniteSessions: config.infiniteSessions,
        disableResume: config.disableResume
      });
      const { workspacePath, capabilities } = response;
      session["_workspacePath"] = workspacePath;
      session.setCapabilities(capabilities);
    } catch (e) {
      this.sessions.delete(sessionId);
      throw e;
    }
    return session;
  }
  /**
   * Gets the current connection state of the client.
   *
   * @returns The current connection state: "disconnected", "connecting", "connected", or "error"
   *
   * @example
   * ```typescript
   * if (client.getState() === "connected") {
   *   const session = await client.createSession({ onPermissionRequest: approveAll });
   * }
   * ```
   */
  getState() {
    return this.state;
  }
  /**
   * Sends a ping request to the server to verify connectivity.
   *
   * @param message - Optional message to include in the ping
   * @returns A promise that resolves with the ping response containing the message and timestamp
   * @throws Error if the client is not connected
   *
   * @example
   * ```typescript
   * const response = await client.ping("health check");
   * console.log(`Server responded at ${new Date(response.timestamp)}`);
   * ```
   */
  async ping(message) {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const result = await this.connection.sendRequest("ping", { message });
    return result;
  }
  /**
   * Get CLI status including version and protocol information
   */
  async getStatus() {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const result = await this.connection.sendRequest("status.get", {});
    return result;
  }
  /**
   * Get current authentication status
   */
  async getAuthStatus() {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const result = await this.connection.sendRequest("auth.getStatus", {});
    return result;
  }
  /**
   * List available models with their metadata.
   *
   * If an `onListModels` handler was provided in the client options,
   * it is called instead of querying the CLI server.
   *
   * Results are cached after the first successful call to avoid rate limiting.
   * The cache is cleared when the client disconnects.
   *
   * @throws Error if not connected (when no custom handler is set)
   */
  async listModels() {
    await this.modelsCacheLock;
    let resolveLock;
    this.modelsCacheLock = new Promise((resolve4) => {
      resolveLock = resolve4;
    });
    try {
      if (this.modelsCache !== null) {
        return [...this.modelsCache];
      }
      let models;
      if (this.onListModels) {
        models = await this.onListModels();
      } else {
        if (!this.connection) {
          throw new Error("Client not connected");
        }
        const result = await this.connection.sendRequest("models.list", {});
        const response = result;
        models = response.models;
      }
      this.modelsCache = [...models];
      return [...models];
    } finally {
      resolveLock();
    }
  }
  /**
   * Verify that the server's protocol version is within the supported range
   * and store the negotiated version.
   */
  async verifyProtocolVersion() {
    const maxVersion = getSdkProtocolVersion();
    let pingResult;
    if (this.processExitPromise) {
      pingResult = await Promise.race([this.ping(), this.processExitPromise]);
    } else {
      pingResult = await this.ping();
    }
    const serverVersion = pingResult.protocolVersion;
    if (serverVersion === void 0) {
      throw new Error(
        `SDK protocol version mismatch: SDK supports versions ${MIN_PROTOCOL_VERSION}-${maxVersion}, but server does not report a protocol version. Please update your server to ensure compatibility.`
      );
    }
    if (serverVersion < MIN_PROTOCOL_VERSION || serverVersion > maxVersion) {
      throw new Error(
        `SDK protocol version mismatch: SDK supports versions ${MIN_PROTOCOL_VERSION}-${maxVersion}, but server reports version ${serverVersion}. Please update your SDK or server to ensure compatibility.`
      );
    }
    this.negotiatedProtocolVersion = serverVersion;
  }
  /**
   * Gets the ID of the most recently updated session.
   *
   * This is useful for resuming the last conversation when the session ID
   * was not stored.
   *
   * @returns A promise that resolves with the session ID, or undefined if no sessions exist
   * @throws Error if the client is not connected
   *
   * @example
   * ```typescript
   * const lastId = await client.getLastSessionId();
   * if (lastId) {
   *   const session = await client.resumeSession(lastId, { onPermissionRequest: approveAll });
   * }
   * ```
   */
  async getLastSessionId() {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const response = await this.connection.sendRequest("session.getLastId", {});
    return response.sessionId;
  }
  /**
   * Permanently deletes a session and all its data from disk, including
   * conversation history, planning state, and artifacts.
   *
   * Unlike {@link CopilotSession.disconnect}, which only releases in-memory
   * resources and preserves session data for later resumption, this method
   * is irreversible. The session cannot be resumed after deletion.
   *
   * @param sessionId - The ID of the session to delete
   * @returns A promise that resolves when the session is deleted
   * @throws Error if the session does not exist or deletion fails
   *
   * @example
   * ```typescript
   * await client.deleteSession("session-123");
   * ```
   */
  async deleteSession(sessionId) {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const response = await this.connection.sendRequest("session.delete", {
      sessionId
    });
    const { success, error } = response;
    if (!success) {
      throw new Error(`Failed to delete session ${sessionId}: ${error || "Unknown error"}`);
    }
    this.sessions.delete(sessionId);
  }
  /**
   * List all available sessions.
   *
   * @param filter - Optional filter to limit returned sessions by context fields
   *
   * @example
   * // List all sessions
   * const sessions = await client.listSessions();
   *
   * @example
   * // List sessions for a specific repository
   * const sessions = await client.listSessions({ repository: "owner/repo" });
   */
  async listSessions(filter) {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const response = await this.connection.sendRequest("session.list", {
      filter
    });
    const { sessions } = response;
    return sessions.map(_CopilotClient.toSessionMetadata);
  }
  /**
   * Gets metadata for a specific session by ID.
   *
   * This provides an efficient O(1) lookup of a single session's metadata
   * instead of listing all sessions. Returns undefined if the session is not found.
   *
   * @param sessionId - The ID of the session to look up
   * @returns A promise that resolves with the session metadata, or undefined if not found
   * @throws Error if the client is not connected
   *
   * @example
   * ```typescript
   * const metadata = await client.getSessionMetadata("session-123");
   * if (metadata) {
   *   console.log(`Session started at: ${metadata.startTime}`);
   * }
   * ```
   */
  async getSessionMetadata(sessionId) {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const response = await this.connection.sendRequest("session.getMetadata", { sessionId });
    const { session } = response;
    if (!session) {
      return void 0;
    }
    return _CopilotClient.toSessionMetadata(session);
  }
  static toSessionMetadata(raw) {
    return {
      sessionId: raw.sessionId,
      startTime: new Date(raw.startTime),
      modifiedTime: new Date(raw.modifiedTime),
      summary: raw.summary,
      isRemote: raw.isRemote,
      context: raw.context
    };
  }
  /**
   * Gets the foreground session ID in TUI+server mode.
   *
   * This returns the ID of the session currently displayed in the TUI.
   * Only available when connecting to a server running in TUI+server mode (--ui-server).
   *
   * @returns A promise that resolves with the foreground session ID, or undefined if none
   * @throws Error if the client is not connected
   *
   * @example
   * ```typescript
   * const sessionId = await client.getForegroundSessionId();
   * if (sessionId) {
   *   console.log(`TUI is displaying session: ${sessionId}`);
   * }
   * ```
   */
  async getForegroundSessionId() {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const response = await this.connection.sendRequest("session.getForeground", {});
    return response.sessionId;
  }
  /**
   * Sets the foreground session in TUI+server mode.
   *
   * This requests the TUI to switch to displaying the specified session.
   * Only available when connecting to a server running in TUI+server mode (--ui-server).
   *
   * @param sessionId - The ID of the session to display in the TUI
   * @returns A promise that resolves when the session is switched
   * @throws Error if the client is not connected or if the operation fails
   *
   * @example
   * ```typescript
   * // Switch the TUI to display a specific session
   * await client.setForegroundSessionId("session-123");
   * ```
   */
  async setForegroundSessionId(sessionId) {
    if (!this.connection) {
      throw new Error("Client not connected");
    }
    const response = await this.connection.sendRequest("session.setForeground", { sessionId });
    const result = response;
    if (!result.success) {
      throw new Error(result.error || "Failed to set foreground session");
    }
  }
  on(eventTypeOrHandler, handler) {
    if (typeof eventTypeOrHandler === "string" && handler) {
      const eventType = eventTypeOrHandler;
      if (!this.typedLifecycleHandlers.has(eventType)) {
        this.typedLifecycleHandlers.set(eventType, /* @__PURE__ */ new Set());
      }
      const storedHandler = handler;
      this.typedLifecycleHandlers.get(eventType).add(storedHandler);
      return () => {
        const handlers = this.typedLifecycleHandlers.get(eventType);
        if (handlers) {
          handlers.delete(storedHandler);
        }
      };
    }
    const wildcardHandler = eventTypeOrHandler;
    this.sessionLifecycleHandlers.add(wildcardHandler);
    return () => {
      this.sessionLifecycleHandlers.delete(wildcardHandler);
    };
  }
  /**
   * Start the CLI server process
   */
  async startCLIServer() {
    return new Promise((resolve4, reject) => {
      this.stderrBuffer = "";
      const args = [
        ...this.options.cliArgs,
        "--headless",
        "--no-auto-update",
        "--log-level",
        this.options.logLevel
      ];
      if (this.options.useStdio) {
        args.push("--stdio");
      } else if (this.options.port > 0) {
        args.push("--port", this.options.port.toString());
      }
      if (this.options.githubToken) {
        args.push("--auth-token-env", "COPILOT_SDK_AUTH_TOKEN");
      }
      if (!this.options.useLoggedInUser) {
        args.push("--no-auto-login");
      }
      const envWithoutNodeDebug = { ...this.options.env };
      delete envWithoutNodeDebug.NODE_DEBUG;
      if (this.options.githubToken) {
        envWithoutNodeDebug.COPILOT_SDK_AUTH_TOKEN = this.options.githubToken;
      }
      if (!this.options.cliPath) {
        throw new Error(
          "Path to Copilot CLI is required. Please provide it via the cliPath option, or use cliUrl to rely on a remote CLI."
        );
      }
      if (this.options.telemetry) {
        const t = this.options.telemetry;
        envWithoutNodeDebug.COPILOT_OTEL_ENABLED = "true";
        if (t.otlpEndpoint !== void 0)
          envWithoutNodeDebug.OTEL_EXPORTER_OTLP_ENDPOINT = t.otlpEndpoint;
        if (t.filePath !== void 0)
          envWithoutNodeDebug.COPILOT_OTEL_FILE_EXPORTER_PATH = t.filePath;
        if (t.exporterType !== void 0)
          envWithoutNodeDebug.COPILOT_OTEL_EXPORTER_TYPE = t.exporterType;
        if (t.sourceName !== void 0)
          envWithoutNodeDebug.COPILOT_OTEL_SOURCE_NAME = t.sourceName;
        if (t.captureContent !== void 0)
          envWithoutNodeDebug.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = String(
            t.captureContent
          );
      }
      if (!(0, import_node_fs.existsSync)(this.options.cliPath)) {
        throw new Error(
          `Copilot CLI not found at ${this.options.cliPath}. Ensure @github/copilot is installed.`
        );
      }
      const stdioConfig = this.options.useStdio ? ["pipe", "pipe", "pipe"] : ["ignore", "pipe", "pipe"];
      const isJsFile = this.options.cliPath.endsWith(".js");
      if (isJsFile) {
        this.cliProcess = (0, import_node_child_process.spawn)(getNodeExecPath(), [this.options.cliPath, ...args], {
          stdio: stdioConfig,
          cwd: this.options.cwd,
          env: envWithoutNodeDebug,
          windowsHide: true
        });
      } else {
        this.cliProcess = (0, import_node_child_process.spawn)(this.options.cliPath, args, {
          stdio: stdioConfig,
          cwd: this.options.cwd,
          env: envWithoutNodeDebug,
          windowsHide: true
        });
      }
      let stdout = "";
      let resolved = false;
      if (this.options.useStdio) {
        resolved = true;
        resolve4();
      } else {
        this.cliProcess.stdout?.on("data", (data) => {
          stdout += data.toString();
          const match = stdout.match(/listening on port (\d+)/i);
          if (match && !resolved) {
            this.actualPort = parseInt(match[1], 10);
            resolved = true;
            resolve4();
          }
        });
      }
      this.cliProcess.stderr?.on("data", (data) => {
        this.stderrBuffer += data.toString();
        const lines = data.toString().split("\n");
        for (const line of lines) {
          if (line.trim()) {
            process.stderr.write(`[CLI subprocess] ${line}
`);
          }
        }
      });
      this.cliProcess.on("error", (error) => {
        if (!resolved) {
          resolved = true;
          const stderrOutput = this.stderrBuffer.trim();
          if (stderrOutput) {
            reject(
              new Error(
                `Failed to start CLI server: ${error.message}
stderr: ${stderrOutput}`
              )
            );
          } else {
            reject(new Error(`Failed to start CLI server: ${error.message}`));
          }
        }
      });
      this.processExitPromise = new Promise((_, rejectProcessExit) => {
        this.cliProcess.on("exit", (code) => {
          setTimeout(() => {
            const stderrOutput = this.stderrBuffer.trim();
            if (stderrOutput) {
              rejectProcessExit(
                new Error(
                  `CLI server exited with code ${code}
stderr: ${stderrOutput}`
                )
              );
            } else {
              rejectProcessExit(
                new Error(`CLI server exited unexpectedly with code ${code}`)
              );
            }
          }, 50);
        });
      });
      this.processExitPromise.catch(() => {
      });
      this.cliProcess.on("exit", (code) => {
        if (!resolved) {
          resolved = true;
          const stderrOutput = this.stderrBuffer.trim();
          if (stderrOutput) {
            reject(
              new Error(
                `CLI server exited with code ${code}
stderr: ${stderrOutput}`
              )
            );
          } else {
            reject(new Error(`CLI server exited with code ${code}`));
          }
        }
      });
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          reject(new Error("Timeout waiting for CLI server to start"));
        }
      }, 1e4);
    });
  }
  /**
   * Connect to the CLI server (via socket or stdio)
   */
  async connectToServer() {
    if (this.options.isChildProcess) {
      return this.connectToParentProcessViaStdio();
    } else if (this.options.useStdio) {
      return this.connectToChildProcessViaStdio();
    } else {
      return this.connectViaTcp();
    }
  }
  /**
   * Connect to child via stdio pipes
   */
  async connectToChildProcessViaStdio() {
    if (!this.cliProcess) {
      throw new Error("CLI process not started");
    }
    this.cliProcess.stdin?.on("error", (err) => {
      if (!this.forceStopping) {
        throw err;
      }
    });
    this.connection = (0, import_node2.createMessageConnection)(
      new import_node2.StreamMessageReader(this.cliProcess.stdout),
      new import_node2.StreamMessageWriter(this.cliProcess.stdin)
    );
    this.attachConnectionHandlers();
    this.connection.listen();
  }
  /**
   * Connect to parent via stdio pipes
   */
  async connectToParentProcessViaStdio() {
    if (this.cliProcess) {
      throw new Error("CLI child process was unexpectedly started in parent process mode");
    }
    this.connection = (0, import_node2.createMessageConnection)(
      new import_node2.StreamMessageReader(process.stdin),
      new import_node2.StreamMessageWriter(process.stdout)
    );
    this.attachConnectionHandlers();
    this.connection.listen();
  }
  /**
   * Connect to the CLI server via TCP socket
   */
  async connectViaTcp() {
    if (!this.actualPort) {
      throw new Error("Server port not available");
    }
    return new Promise((resolve4, reject) => {
      this.socket = new import_node_net.Socket();
      this.socket.connect(this.actualPort, this.actualHost, () => {
        this.connection = (0, import_node2.createMessageConnection)(
          new import_node2.StreamMessageReader(this.socket),
          new import_node2.StreamMessageWriter(this.socket)
        );
        this.attachConnectionHandlers();
        this.connection.listen();
        resolve4();
      });
      this.socket.on("error", (error) => {
        reject(new Error(`Failed to connect to CLI server: ${error.message}`));
      });
    });
  }
  attachConnectionHandlers() {
    if (!this.connection) {
      return;
    }
    this.connection.onNotification("session.event", (notification) => {
      this.handleSessionEventNotification(notification);
    });
    this.connection.onNotification("session.lifecycle", (notification) => {
      this.handleSessionLifecycleNotification(notification);
    });
    this.connection.onRequest(
      "tool.call",
      async (params) => await this.handleToolCallRequestV2(params)
    );
    this.connection.onRequest(
      "permission.request",
      async (params) => await this.handlePermissionRequestV2(params)
    );
    this.connection.onRequest(
      "userInput.request",
      async (params) => await this.handleUserInputRequest(params)
    );
    this.connection.onRequest(
      "hooks.invoke",
      async (params) => await this.handleHooksInvoke(params)
    );
    this.connection.onRequest(
      "systemMessage.transform",
      async (params) => await this.handleSystemMessageTransform(params)
    );
    const sessions = this.sessions;
    registerClientSessionApiHandlers(this.connection, (sessionId) => {
      const session = sessions.get(sessionId);
      if (!session) throw new Error(`No session found for sessionId: ${sessionId}`);
      return session.clientSessionApis;
    });
    this.connection.onClose(() => {
      this.state = "disconnected";
    });
    this.connection.onError((_error) => {
      this.state = "disconnected";
    });
  }
  handleSessionEventNotification(notification) {
    if (typeof notification !== "object" || !notification || !("sessionId" in notification) || typeof notification.sessionId !== "string" || !("event" in notification)) {
      return;
    }
    const session = this.sessions.get(notification.sessionId);
    if (session) {
      session._dispatchEvent(notification.event);
    }
  }
  handleSessionLifecycleNotification(notification) {
    if (typeof notification !== "object" || !notification || !("type" in notification) || typeof notification.type !== "string" || !("sessionId" in notification) || typeof notification.sessionId !== "string") {
      return;
    }
    const event = notification;
    const typedHandlers = this.typedLifecycleHandlers.get(event.type);
    if (typedHandlers) {
      for (const handler of typedHandlers) {
        try {
          handler(event);
        } catch {
        }
      }
    }
    for (const handler of this.sessionLifecycleHandlers) {
      try {
        handler(event);
      } catch {
      }
    }
  }
  async handleUserInputRequest(params) {
    if (!params || typeof params.sessionId !== "string" || typeof params.question !== "string") {
      throw new Error("Invalid user input request payload");
    }
    const session = this.sessions.get(params.sessionId);
    if (!session) {
      throw new Error(`Session not found: ${params.sessionId}`);
    }
    const result = await session._handleUserInputRequest({
      question: params.question,
      choices: params.choices,
      allowFreeform: params.allowFreeform
    });
    return result;
  }
  async handleHooksInvoke(params) {
    if (!params || typeof params.sessionId !== "string" || typeof params.hookType !== "string") {
      throw new Error("Invalid hooks invoke payload");
    }
    const session = this.sessions.get(params.sessionId);
    if (!session) {
      throw new Error(`Session not found: ${params.sessionId}`);
    }
    const output = await session._handleHooksInvoke(params.hookType, params.input);
    return { output };
  }
  async handleSystemMessageTransform(params) {
    if (!params || typeof params.sessionId !== "string" || !params.sections || typeof params.sections !== "object") {
      throw new Error("Invalid systemMessage.transform payload");
    }
    const session = this.sessions.get(params.sessionId);
    if (!session) {
      throw new Error(`Session not found: ${params.sessionId}`);
    }
    return await session._handleSystemMessageTransform(params.sections);
  }
  // ========================================================================
  // Protocol v2 backward-compatibility adapters
  // ========================================================================
  /**
   * Handles a v2-style tool.call RPC request from the server.
   * Looks up the session and tool handler, executes it, and returns the result
   * in the v2 response format.
   */
  async handleToolCallRequestV2(params) {
    if (!params || typeof params.sessionId !== "string" || typeof params.toolCallId !== "string" || typeof params.toolName !== "string") {
      throw new Error("Invalid tool call payload");
    }
    const session = this.sessions.get(params.sessionId);
    if (!session) {
      throw new Error(`Unknown session ${params.sessionId}`);
    }
    const handler = session.getToolHandler(params.toolName);
    if (!handler) {
      return {
        result: {
          textResultForLlm: `Tool '${params.toolName}' is not supported by this client instance.`,
          resultType: "failure",
          error: `tool '${params.toolName}' not supported`,
          toolTelemetry: {}
        }
      };
    }
    try {
      const traceparent = params.traceparent;
      const tracestate = params.tracestate;
      const invocation = {
        sessionId: params.sessionId,
        toolCallId: params.toolCallId,
        toolName: params.toolName,
        arguments: params.arguments,
        traceparent,
        tracestate
      };
      const result = await handler(params.arguments, invocation);
      return { result: this.normalizeToolResultV2(result) };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        result: {
          textResultForLlm: "Invoking this tool produced an error. Detailed information is not available.",
          resultType: "failure",
          error: message,
          toolTelemetry: {}
        }
      };
    }
  }
  /**
   * Handles a v2-style permission.request RPC request from the server.
   */
  async handlePermissionRequestV2(params) {
    if (!params || typeof params.sessionId !== "string" || !params.permissionRequest) {
      throw new Error("Invalid permission request payload");
    }
    const session = this.sessions.get(params.sessionId);
    if (!session) {
      throw new Error(`Session not found: ${params.sessionId}`);
    }
    try {
      const result = await session._handlePermissionRequestV2(params.permissionRequest);
      return { result };
    } catch (error) {
      if (error instanceof Error && error.message === NO_RESULT_PERMISSION_V2_ERROR) {
        throw error;
      }
      return {
        result: {
          kind: "denied-no-approval-rule-and-could-not-request-from-user"
        }
      };
    }
  }
  normalizeToolResultV2(result) {
    if (result === void 0 || result === null) {
      return {
        textResultForLlm: "Tool returned no result",
        resultType: "failure",
        error: "tool returned no result",
        toolTelemetry: {}
      };
    }
    if (this.isToolResultObject(result)) {
      return result;
    }
    const textResult = typeof result === "string" ? result : JSON.stringify(result);
    return {
      textResultForLlm: textResult,
      resultType: "success",
      toolTelemetry: {}
    };
  }
  isToolResultObject(value) {
    return typeof value === "object" && value !== null && "textResultForLlm" in value && typeof value.textResultForLlm === "string" && "resultType" in value;
  }
};

// src/lib/copilot-auth.ts
async function checkAuth(client) {
  let status;
  try {
    status = await client.getAuthStatus();
  } catch (err) {
    return {
      ok: false,
      message: `Failed to query auth status: ${err.message}`
    };
  }
  if (!status.isAuthenticated) {
    return {
      ok: false,
      authType: status.authType,
      host: status.host,
      message: status.statusMessage ?? "Not authenticated. Run `gh auth login` or set GH_TOKEN / COPILOT_GITHUB_TOKEN."
    };
  }
  return {
    ok: true,
    authType: status.authType,
    login: status.login,
    host: status.host,
    message: status.statusMessage ?? `Authenticated via ${status.authType ?? "unknown method"}`
  };
}

// src/lib/quota.ts
var import_node_fs2 = require("node:fs");
var import_node_path2 = require("node:path");
function snapshotPath(stateDir) {
  return (0, import_node_path2.join)(stateDir, "quota.json");
}
function readSnapshot(stateDir) {
  const path = snapshotPath(stateDir);
  if (!(0, import_node_fs2.existsSync)(path)) return null;
  try {
    return JSON.parse((0, import_node_fs2.readFileSync)(path, "utf-8"));
  } catch {
    return null;
  }
}
function recordSnapshot(stateDir, quotas) {
  const existing = readSnapshot(stateDir);
  const merged = {
    checkedAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotas: { ...existing?.quotas ?? {} }
  };
  for (const [id, entry] of Object.entries(quotas)) {
    if (!entry) continue;
    merged.quotas[id] = {
      entitlementRequests: entry.entitlementRequests ?? 0,
      usedRequests: entry.usedRequests ?? 0,
      remainingPercentage: entry.remainingPercentage ?? 100,
      resetDate: entry.resetDate ?? "",
      isUnlimitedEntitlement: entry.isUnlimitedEntitlement ?? false,
      usageAllowedWithExhaustedQuota: entry.usageAllowedWithExhaustedQuota ?? false
    };
  }
  (0, import_node_fs2.mkdirSync)((0, import_node_path2.dirname)(snapshotPath(stateDir)), { recursive: true });
  (0, import_node_fs2.writeFileSync)(snapshotPath(stateDir), JSON.stringify(merged, null, 2), "utf-8");
  return merged;
}
function evaluateGate(snapshot, opts) {
  if (!snapshot || Object.keys(snapshot.quotas).length === 0) {
    return { ok: true, reason: "no_cache" };
  }
  const entries = Object.values(snapshot.quotas);
  if (entries.some((q) => q.isUnlimitedEntitlement)) {
    return { ok: true, reason: "unlimited" };
  }
  if (entries.every((q) => q.remainingPercentage <= 0) && entries.some((q) => q.usageAllowedWithExhaustedQuota)) {
    return { ok: true, reason: "overage_allowed" };
  }
  let minRemainingAbs = Number.POSITIVE_INFINITY;
  let tightestReset = "";
  for (const q of entries) {
    const remaining = Math.max(0, q.entitlementRequests - q.usedRequests);
    if (remaining < minRemainingAbs) {
      minRemainingAbs = remaining;
      tightestReset = q.resetDate;
    }
  }
  if (minRemainingAbs <= opts.minRemaining) {
    return {
      ok: false,
      reason: "quota_exhausted",
      remaining: minRemainingAbs === Number.POSITIVE_INFINITY ? 0 : minRemainingAbs,
      resetAt: tightestReset
    };
  }
  const staleMs = opts.staleAfterMs ?? 2 * 60 * 1e3;
  const ageMs = Date.now() - new Date(snapshot.checkedAt).getTime();
  const warning = ageMs > staleMs ? `Quota snapshot is ${Math.round(ageMs / 1e3)}s old; may be out of date.` : void 0;
  return warning ? { ok: true, reason: "available", warning } : { ok: true, reason: "available" };
}
function summarize(snapshot) {
  if (!snapshot) return {};
  const entries = Object.values(snapshot.quotas);
  if (entries.length === 0) return {};
  if (entries.some((q) => q.isUnlimitedEntitlement)) return { unlimited: true };
  let minRemaining = Number.POSITIVE_INFINITY;
  let minPct = 100;
  let tightestReset = "";
  for (const q of entries) {
    const remaining = Math.max(0, q.entitlementRequests - q.usedRequests);
    if (remaining < minRemaining) {
      minRemaining = remaining;
      tightestReset = q.resetDate;
    }
    if (q.remainingPercentage < minPct) minPct = q.remainingPercentage;
  }
  return {
    premium: minRemaining === Number.POSITIVE_INFINITY ? void 0 : minRemaining,
    percentage: minPct,
    resetAt: tightestReset || void 0
  };
}

// src/lib/worktree.ts
var import_node_child_process2 = require("node:child_process");
var import_node_fs3 = require("node:fs");
var import_node_path3 = require("node:path");
function runGit(args, cwd) {
  return (0, import_node_child_process2.execFileSync)("git", args, {
    cwd,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}
function tryGit(args, cwd) {
  const res = (0, import_node_child_process2.spawnSync)("git", args, { cwd, encoding: "utf-8" });
  return {
    ok: res.status === 0,
    stdout: (res.stdout ?? "").trim(),
    stderr: (res.stderr ?? "").trim()
  };
}
function sameDevice(a, b) {
  try {
    let probe = a;
    while (!(0, import_node_fs3.existsSync)(probe) && (0, import_node_path3.dirname)(probe) !== probe) {
      probe = (0, import_node_path3.dirname)(probe);
    }
    return (0, import_node_fs3.statSync)(probe).dev === (0, import_node_fs3.statSync)(b).dev;
  } catch {
    return false;
  }
}
function resolveRepoRoot(cwd) {
  const res = tryGit(["rev-parse", "--show-toplevel"], cwd);
  if (!res.ok) {
    throw new Error(`Not a git repository: ${cwd}${res.stderr ? `
${res.stderr}` : ""}`);
  }
  return res.stdout;
}
function createWorktree(jobId, cwd, opts) {
  const repoRoot = resolveRepoRoot(cwd);
  const baseCommit = runGit(["rev-parse", "HEAD"], repoRoot);
  const branch = `copilot/${jobId}`;
  const dirty = tryGit(["status", "--porcelain"], repoRoot);
  if (dirty.ok && dirty.stdout.length > 0) {
    opts.onWarn?.(
      `Main working tree has uncommitted changes; Copilot worktree starts from HEAD (${baseCommit.slice(0, 8)}) \u2014 your changes are not visible to the Copilot session.`
    );
  }
  let worktreePath = opts.preferredPath;
  if (!sameDevice(worktreePath, repoRoot)) {
    worktreePath = (0, import_node_path3.join)(repoRoot, ".git", "copilot-worktrees", jobId);
    opts.onWarn?.(`State dir is on a different filesystem; using ${worktreePath} instead.`);
  }
  (0, import_node_fs3.mkdirSync)((0, import_node_path3.dirname)(worktreePath), { recursive: true });
  const add = tryGit(["worktree", "add", "-b", branch, worktreePath, baseCommit], repoRoot);
  if (!add.ok) {
    throw new Error(`git worktree add failed: ${add.stderr || add.stdout}`);
  }
  const gitmodulesPath = (0, import_node_path3.join)(repoRoot, ".gitmodules");
  if ((0, import_node_fs3.existsSync)(gitmodulesPath)) {
    const sub = tryGit(["submodule", "update", "--init", "--recursive"], worktreePath);
    if (!sub.ok) {
      opts.onWarn?.(`Submodule init failed in worktree (continuing anyway): ${sub.stderr}`);
    }
  }
  return { path: worktreePath, branch, baseCommit, repoRoot };
}
function cleanupWorktree(handle, opts) {
  if (opts.success) {
    tryGit(["clean", "-fdX"], handle.path);
    const rem = tryGit(["worktree", "remove", handle.path], handle.repoRoot);
    if (!rem.ok) {
      tryGit(["worktree", "remove", "--force", handle.path], handle.repoRoot);
    }
    return;
  }
  tryGit(["worktree", "remove", "--force", handle.path], handle.repoRoot);
  const tip = tryGit(["rev-parse", handle.branch], handle.repoRoot);
  if (tip.ok && tip.stdout === handle.baseCommit) {
    const del = tryGit(["branch", "-D", handle.branch], handle.repoRoot);
    if (!del.ok) opts.onWarn?.(`Could not delete branch ${handle.branch}: ${del.stderr}`);
  } else if (tip.ok) {
    opts.onWarn?.(
      `Branch ${handle.branch} has commits beyond baseline; retaining for inspection.`
    );
  }
}
function computeDiffStats(handle) {
  const names = tryGit(["diff", "--name-only", `${handle.baseCommit}..HEAD`], handle.path);
  const filesModified = names.ok && names.stdout ? names.stdout.split("\n").filter(Boolean) : [];
  let linesAdded = 0;
  let linesRemoved = 0;
  const numstat = tryGit(["diff", "--numstat", `${handle.baseCommit}..HEAD`], handle.path);
  if (numstat.ok && numstat.stdout) {
    for (const line of numstat.stdout.split("\n")) {
      const [addStr, delStr] = line.split("	");
      const add = Number.parseInt(addStr ?? "0", 10);
      const del = Number.parseInt(delStr ?? "0", 10);
      if (Number.isFinite(add)) linesAdded += add;
      if (Number.isFinite(del)) linesRemoved += del;
    }
  }
  return { filesModified, linesAdded, linesRemoved };
}
function pruneOrphans(cwd, maxAgeDays = 7) {
  let repoRoot;
  try {
    repoRoot = resolveRepoRoot(cwd);
  } catch {
    return { worktreesPruned: false, branchesRemoved: 0 };
  }
  const prune = tryGit(["worktree", "prune"], repoRoot);
  const worktreesPruned = prune.ok;
  const branches = tryGit(
    ["for-each-ref", "--format=%(refname:short) %(committerdate:unix) %(objectname)", "refs/heads/copilot/"],
    repoRoot
  );
  let branchesRemoved = 0;
  if (branches.ok && branches.stdout) {
    const now = Math.floor(Date.now() / 1e3);
    const cutoff = now - maxAgeDays * 86400;
    for (const line of branches.stdout.split("\n")) {
      const [branch, tsStr, tip] = line.split(" ");
      if (!branch || !tsStr || !tip) continue;
      const ts = Number.parseInt(tsStr, 10);
      if (!Number.isFinite(ts) || ts > cutoff) continue;
      const merged = tryGit(["merge-base", "--is-ancestor", tip, "HEAD"], repoRoot);
      if (merged.ok) {
        const del = tryGit(["branch", "-D", branch], repoRoot);
        if (del.ok) branchesRemoved++;
      }
    }
  }
  return { worktreesPruned, branchesRemoved };
}

// src/commands/setup.ts
init_state();

// src/lib/version.ts
var PLUGIN_VERSION = "0.1.0";
var CLIENT_NAME = "copilot-plugin-cc";

// src/commands/setup.ts
var DEFAULT_MODEL = "claude-opus-4.6";
async function runSetup(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const stateDir = resolveStateDir(cwd);
  const isCheck = options.check === true;
  const client = new CopilotClient({ cwd });
  try {
    await client.start();
  } catch (err) {
    const msg = `Failed to start Copilot CLI: ${err.message}`;
    if (isCheck) {
      console.error(`[copilot] ${msg} \u2014 run \`gh auth login\` and ensure @github/copilot is installed.`);
      return;
    }
    emit(options, {
      status: "error",
      defaultModel: DEFAULT_MODEL,
      defaultModelAvailable: false,
      models: [],
      claudeModels: [],
      message: msg
    });
    return;
  }
  const auth = await checkAuth(client);
  if (!auth.ok) {
    await client.stop().catch(() => {
    });
    if (isCheck) {
      console.error(`[copilot] ${auth.message}`);
      return;
    }
    emit(options, {
      status: "error",
      authType: auth.authType,
      defaultModel: DEFAULT_MODEL,
      defaultModelAvailable: false,
      models: [],
      claudeModels: [],
      message: auth.message
    });
    return;
  }
  let models = [];
  try {
    models = await client.listModels();
  } catch (err) {
    if (!isCheck) console.error(`[copilot] listModels failed: ${err.message}`);
  }
  const modelIds = models.map((m) => m.id);
  const claudeModels = modelIds.filter((id) => id.toLowerCase().includes("claude"));
  const defaultAvailable = modelIds.includes(DEFAULT_MODEL);
  const pruneReport = pruneOrphans(cwd);
  await client.stop().catch(() => {
  });
  if (isCheck) {
    return;
  }
  const report = {
    status: "ok",
    authType: auth.authType,
    login: auth.login,
    host: auth.host,
    defaultModel: DEFAULT_MODEL,
    defaultModelAvailable: defaultAvailable,
    models: modelIds,
    claudeModels,
    quota: summarize(readSnapshot(stateDir))
  };
  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  const lines = [];
  lines.push(`## Copilot Plugin Setup (${CLIENT_NAME} v${PLUGIN_VERSION})`);
  lines.push("");
  lines.push(`**Status:** Authenticated (${auth.authType}${auth.login ? ` as ${auth.login}` : ""})`);
  if (auth.host) lines.push(`**Host:** ${auth.host}`);
  lines.push(`**Default model:** \`${DEFAULT_MODEL}\` ${defaultAvailable ? "(available)" : "(NOT listed \u2014 pass --model to override)"}`);
  if (modelIds.length > 0) {
    lines.push("");
    lines.push("### Available models");
    for (const m of modelIds) lines.push(`- \`${m}\``);
  }
  if (!defaultAvailable && claudeModels.length > 0) {
    lines.push("");
    lines.push("### Claude models detected");
    for (const m of claudeModels) lines.push(`- \`${m}\``);
  }
  if (report.quota && (report.quota.premium !== void 0 || report.quota.unlimited)) {
    lines.push("");
    lines.push("### Quota");
    if (report.quota.unlimited) {
      lines.push("- Unlimited entitlement.");
    } else {
      const pct = typeof report.quota.percentage === "number" ? `${(report.quota.percentage * 100).toFixed(1)}%` : "?";
      lines.push(`- ${report.quota.premium ?? "?"} premium request(s) remaining (${pct})`);
      if (report.quota.resetAt) lines.push(`- Resets at ${report.quota.resetAt}`);
    }
  } else {
    lines.push("");
    lines.push("### Quota");
    lines.push("- No quota snapshot yet. One will be captured on the first `implement` run.");
  }
  lines.push("");
  lines.push("### Housekeeping");
  lines.push(`- Worktrees pruned: ${pruneReport.worktreesPruned ? "yes" : "skipped (not a git repo or prune failed)"}`);
  lines.push(`- Merged copilot/* branches removed: ${pruneReport.branchesRemoved}`);
  lines.push("");
  lines.push("### Next steps");
  lines.push('- `/copilot:implement "your task"` to delegate');
  lines.push("- `/copilot:status` to see quota + running jobs");
  console.log(lines.join("\n"));
}
function emit(options, report) {
  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  const lines = [];
  lines.push(`## Copilot Plugin Setup (${CLIENT_NAME} v${PLUGIN_VERSION})`);
  lines.push("");
  lines.push(`**Status:** ${report.status === "ok" ? "Authenticated" : "Not authenticated"}`);
  if (report.message) lines.push(`**Message:** ${report.message}`);
  console.log(lines.join("\n"));
}

// src/commands/implement.ts
var import_node_fs5 = require("node:fs");
var import_node_path6 = require("node:path");
init_state();

// src/lib/permission.ts
var import_node_path5 = require("node:path");
function approved() {
  return { kind: "approved" };
}
function denied(feedback) {
  return { kind: "denied-interactively-by-user", feedback };
}
function isPathInside(child, parent) {
  const c = (0, import_node_path5.resolve)(child);
  const p = (0, import_node_path5.resolve)(parent);
  return c === p || c.startsWith(p + "/");
}
function makePermissionHandler(opts) {
  return (request) => {
    const kind = request.kind;
    switch (kind) {
      case "read": {
        const path = request.path ?? "";
        opts.appendLog(`permission.read approved: ${path}`);
        return approved();
      }
      case "write": {
        const fileName = request.fileName ?? "";
        if (!fileName) {
          opts.appendLog("permission.write denied: no fileName provided");
          return denied("Permission request missing fileName.");
        }
        const absolute = fileName.startsWith("/") ? fileName : (0, import_node_path5.resolve)(opts.worktreePath, fileName);
        if (isPathInside(absolute, opts.worktreePath)) {
          opts.appendLog(`permission.write approved: ${fileName}`);
          return approved();
        }
        opts.appendLog(`permission.write denied (outside worktree): ${absolute}`);
        return denied(`Writes outside the worktree (${opts.worktreePath}) are not permitted by the Claude Code Copilot plugin.`);
      }
      case "mcp": {
        const { serverName, toolName, readOnly } = request;
        opts.appendLog(`permission.mcp approved: ${serverName}/${toolName} (readOnly=${readOnly ?? false})`);
        return approved();
      }
      case "shell": {
        const { fullCommandText, intention } = request;
        const preview = (fullCommandText ?? "").slice(0, 160);
        if (opts.allowShell) {
          opts.appendLog(`permission.shell approved: ${preview}${intention ? ` \u2014 ${intention}` : ""}`);
          return approved();
        }
        opts.appendLog(`permission.shell DENIED: ${preview}${intention ? ` \u2014 ${intention}` : ""}`);
        return denied("Shell execution is disabled for this Copilot session. Re-run the implement command with --allow-shell if you want to permit shell commands.");
      }
      case "url": {
        const { url } = request;
        if (opts.allowUrl) {
          opts.appendLog(`permission.url approved: ${url}`);
          return approved();
        }
        opts.appendLog(`permission.url DENIED: ${url}`);
        return denied("URL fetching is disabled for this Copilot session. Re-run with --allow-url to permit it.");
      }
      case "custom-tool": {
        const { toolName } = request;
        opts.appendLog(`permission.custom-tool DENIED: ${toolName}`);
        return denied(`Custom tool ${toolName} requires explicit user approval; not permitted in automated Copilot sessions.`);
      }
      default: {
        opts.appendLog(`permission.${kind} DENIED (unknown kind, conservative default)`);
        return denied(`Permission kind "${kind}" is not auto-approved by the Claude Code Copilot plugin.`);
      }
    }
  };
}

// src/lib/event-stream.ts
function truncate(text, max) {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max)}\u2026` : flat;
}
function attachStream(opts) {
  const { session, stateDir, appendLog: appendLog2, progress } = opts;
  let lastAssistantMessage;
  let resolveCompletion;
  let rejectCompletion;
  const completion = new Promise((res, rej) => {
    resolveCompletion = res;
    rejectCompletion = rej;
  });
  let resolveShutdown;
  const shutdown = new Promise((res) => {
    resolveShutdown = res;
  });
  const unsubscribers = [];
  const handler = (event) => {
    switch (event.type) {
      case "assistant.message": {
        const content = event.data.content ?? "";
        if (content) {
          lastAssistantMessage = content;
          progress(`[assistant] ${truncate(content, 160)}`);
          appendLog2(`assistant.message: ${truncate(content, 400)}`);
        }
        break;
      }
      case "assistant.usage": {
        const snapshots = event.data.quotaSnapshots;
        if (snapshots) {
          recordSnapshot(stateDir, snapshots);
          const keys = Object.keys(snapshots);
          for (const k of keys) {
            const q = snapshots[k];
            const remaining = Math.max(0, q.entitlementRequests - q.usedRequests);
            progress(`[quota:${k}] ${remaining}/${q.entitlementRequests} remaining (${(q.remainingPercentage * 100).toFixed(1)}%)`);
          }
        }
        const reqId = event.data.providerCallId ?? event.data.apiCallId;
        appendLog2(`assistant.usage model=${event.data.model}${reqId ? ` request=${reqId}` : ""}`);
        break;
      }
      case "session.task_complete": {
        appendLog2(`session.task_complete success=${event.data.success ?? "unknown"}`);
        progress(`[task_complete] ${event.data.success === false ? "failed" : "ok"}`);
        resolveCompletion({ summary: event.data.summary, success: event.data.success });
        break;
      }
      case "session.shutdown": {
        const d = event.data;
        appendLog2(
          `session.shutdown type=${d.shutdownType} premium=${d.totalPremiumRequests} files=${d.codeChanges.filesModified.length} +${d.codeChanges.linesAdded}/-${d.codeChanges.linesRemoved}`
        );
        resolveShutdown({
          shutdownType: d.shutdownType,
          errorReason: d.errorReason,
          totalPremiumRequests: d.totalPremiumRequests,
          codeChanges: {
            linesAdded: d.codeChanges.linesAdded,
            linesRemoved: d.codeChanges.linesRemoved,
            filesModified: [...d.codeChanges.filesModified]
          },
          currentModel: d.currentModel
        });
        break;
      }
      case "session.error": {
        const msg = event.data.message ?? "unknown session error";
        appendLog2(`session.error: ${msg}`);
        progress(`[error] ${msg}`);
        rejectCompletion(new Error(msg));
        break;
      }
      case "session.warning": {
        const msg = event.data.message ?? "";
        if (msg) {
          appendLog2(`session.warning: ${msg}`);
          progress(`[warning] ${truncate(msg, 160)}`);
        }
        break;
      }
      case "session.info": {
        const msg = event.data.message ?? "";
        if (msg) {
          appendLog2(`session.info: ${truncate(msg, 200)}`);
        }
        break;
      }
      case "session.compaction_start": {
        appendLog2("session.compaction_start");
        progress("[compaction] started");
        break;
      }
      case "session.compaction_complete": {
        appendLog2("session.compaction_complete");
        progress("[compaction] complete");
        break;
      }
      case "tool.execution_start": {
        const toolName = event.data.toolName ?? "unknown";
        appendLog2(`tool.execution_start ${toolName}`);
        progress(`[tool] ${toolName} \u2026`);
        break;
      }
      case "tool.execution_complete": {
        const toolName = event.data.toolName ?? "unknown";
        appendLog2(`tool.execution_complete ${toolName}`);
        break;
      }
      case "subagent.started": {
        const name = event.data.agentName ?? event.data.name ?? "subagent";
        appendLog2(`subagent.started ${name}`);
        progress(`[subagent:${name}] started`);
        break;
      }
      case "subagent.completed": {
        const name = event.data.agentName ?? event.data.name ?? "subagent";
        appendLog2(`subagent.completed ${name}`);
        break;
      }
      case "subagent.failed": {
        const name = event.data.agentName ?? event.data.name ?? "subagent";
        appendLog2(`subagent.failed ${name}`);
        progress(`[subagent:${name}] failed`);
        break;
      }
      case "permission.requested": {
        const req = event.data.permissionRequest;
        const kind = req.kind;
        if (kind === "shell") {
          appendLog2(`permission.requested shell: ${req.fullCommandText ?? ""}`);
        } else if (kind === "write") {
          appendLog2(`permission.requested write: ${req.fileName ?? ""}`);
        } else if (kind === "read") {
          appendLog2(`permission.requested read: ${req.path ?? ""}`);
        } else if (kind === "url") {
          appendLog2(`permission.requested url: ${req.url ?? ""}`);
        } else {
          appendLog2(`permission.requested ${kind}`);
        }
        break;
      }
      default:
        break;
    }
  };
  const unsub = session.on(handler);
  unsubscribers.push(unsub);
  return {
    getLastAssistantMessage: () => lastAssistantMessage,
    completion,
    shutdown,
    dispose: () => {
      for (const u of unsubscribers) u();
    }
  };
}

// src/commands/implement.ts
var DEFAULT_MODEL2 = "claude-opus-4.6";
var DEFAULT_TIMEOUT_MS = 30 * 60 * 1e3;
function progressFactory() {
  return (message) => {
    const time = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false });
    process.stderr.write(`[${time}] ${message}
`);
  };
}
function buildPrompt(task) {
  return [
    "Implement the following task inside this repository.",
    "When you are done, produce a concise summary covering:",
    "  - what you changed (at a glance)",
    "  - any assumptions you made",
    "  - any TODOs or follow-up work you chose not to do",
    "",
    "TASK:",
    task
  ].join("\n");
}
function emit2(env) {
  const json = JSON.stringify(env);
  process.stdout.write(json + "\n");
  return json;
}
async function runImplement(task, cwd, options = {}) {
  const progress = progressFactory();
  if (!task.trim()) {
    emit2({ status: "failed", jobId: options.jobId ?? "unassigned", error: "Empty task; provide an implementation objective." });
    process.exit(1);
  }
  const stateDir = resolveStateDir(cwd);
  const jobId = options.jobId ?? generateJobId();
  const model = options.model ?? DEFAULT_MODEL2;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT_MS;
  const useWorktree = options.worktree !== false;
  const minQuota = options.minQuota ?? 1;
  const log = (msg) => appendLog(stateDir, jobId, msg);
  log(`implement start: model=${model} worktree=${useWorktree} allowShell=${options.allowShell ?? false} allowUrl=${options.allowUrl ?? false}`);
  const snapshot = readSnapshot(stateDir);
  const gate = evaluateGate(snapshot, { minRemaining: minQuota });
  if (!gate.ok) {
    log(`quota blocked: remaining=${gate.remaining} resetAt=${gate.resetAt}`);
    progress(`Quota exhausted \u2014 not opening a Copilot session. Resets at ${gate.resetAt || "unknown"}.`);
    const blocked = {
      status: "blocked",
      reason: gate.reason,
      resetAt: gate.resetAt,
      remaining: gate.remaining,
      message: `Copilot quota exhausted; handle this task directly. Resets at ${gate.resetAt || "unknown"}.`
    };
    emit2(blocked);
    return;
  }
  if (gate.ok && "warning" in gate && gate.warning) {
    progress(gate.warning);
  }
  let handle;
  let sessionCwd = cwd;
  if (useWorktree) {
    try {
      const repoRoot = resolveRepoRoot(cwd);
      const preferredPath = (0, import_node_path6.join)(stateDir, "worktrees", jobId);
      handle = createWorktree(jobId, repoRoot, {
        preferredPath,
        onWarn: (m) => {
          progress(m);
          log(`worktree warn: ${m}`);
        }
      });
      sessionCwd = handle.path;
      log(`worktree created: ${handle.branch} at ${handle.path} (base=${handle.baseCommit})`);
      progress(`Worktree: ${handle.branch} at ${handle.path}`);
    } catch (err) {
      const msg = err.message;
      log(`worktree creation failed: ${msg}`);
      emit2({ status: "failed", jobId, error: `Worktree creation failed: ${msg}` });
      process.exit(1);
    }
  }
  const client = new CopilotClient({
    cwd: sessionCwd,
    env: process.env
  });
  let sessionAborted = false;
  let cleanupDone = false;
  const finalizeFailure = async (error) => {
    if (cleanupDone) return;
    cleanupDone = true;
    if (handle) {
      try {
        cleanupWorktree(handle, { success: false, onWarn: (m) => log(`cleanup warn: ${m}`) });
      } catch (err) {
        log(`cleanup error: ${err.message}`);
      }
    }
    try {
      await client.forceStop();
    } catch {
    }
    emit2({ status: "failed", jobId, error, branch: handle?.branch });
  };
  const onSignal = async () => {
    if (sessionAborted) return;
    sessionAborted = true;
    progress("Received interrupt signal; aborting Copilot session.");
    log("interrupt signal received");
    await finalizeFailure("Interrupted by signal");
    process.exit(130);
  };
  process.on("SIGINT", () => void onSignal());
  process.on("SIGTERM", () => void onSignal());
  try {
    await client.start();
  } catch (err) {
    await finalizeFailure(`Failed to start Copilot CLI: ${err.message}`);
    process.exit(1);
  }
  const auth = await checkAuth(client);
  if (!auth.ok) {
    log(`auth failed: ${auth.message}`);
    await finalizeFailure(`Not authenticated: ${auth.message}`);
    await client.stop().catch(() => {
    });
    process.exit(1);
  }
  log(`auth ok: ${auth.authType}${auth.login ? ` as ${auth.login}` : ""}`);
  const permissionHandler = makePermissionHandler({
    allowShell: options.allowShell ?? false,
    allowUrl: options.allowUrl ?? false,
    worktreePath: sessionCwd,
    appendLog: log
  });
  const session = await client.createSession({
    clientName: `${CLIENT_NAME}/${PLUGIN_VERSION}`,
    model,
    reasoningEffort: options.reasoning,
    workingDirectory: sessionCwd,
    infiniteSessions: { enabled: false },
    onPermissionRequest: permissionHandler
  });
  const stream = attachStream({
    session,
    stateDir,
    appendLog: log,
    progress
  });
  progress(`Sending task to Copilot (model=${model})\u2026`);
  await session.send({ prompt: buildPrompt(task) });
  let completionResult = null;
  let timedOut = false;
  const timeoutHandle = setTimeout(() => {
    timedOut = true;
    progress(`Timeout after ${timeout}ms \u2014 aborting session.`);
    log(`timeout ${timeout}ms`);
    session.abort().catch((e) => log(`abort error: ${e.message}`));
  }, timeout);
  try {
    completionResult = await stream.completion;
  } catch (err) {
    clearTimeout(timeoutHandle);
    const msg = err.message;
    log(`completion error: ${msg}`);
    stream.dispose();
    await session.disconnect().catch(() => {
    });
    await client.stop().catch(() => {
    });
    await finalizeFailure(msg);
    process.exit(1);
  }
  clearTimeout(timeoutHandle);
  progress("Task complete; disconnecting session and collecting shutdown metrics.");
  await session.disconnect().catch((e) => log(`disconnect warn: ${e.message}`));
  const shutdownResult = await Promise.race([
    stream.shutdown,
    new Promise((res) => setTimeout(() => res(null), 5e3))
  ]);
  stream.dispose();
  await client.stop().catch(() => {
  });
  let filesModified = [];
  let linesAdded = 0;
  let linesRemoved = 0;
  if (handle) {
    try {
      const stats = computeDiffStats(handle);
      filesModified = stats.filesModified;
      linesAdded = stats.linesAdded;
      linesRemoved = stats.linesRemoved;
    } catch (err) {
      log(`diff stats failed: ${err.message}`);
    }
  }
  if (shutdownResult) {
    const selfFiles = new Set(shutdownResult.codeChanges.filesModified);
    const gitFiles = new Set(filesModified);
    const missing = [...selfFiles].filter((f) => !gitFiles.has(f));
    if (missing.length > 0) {
      log(`codeChanges drift: self-reported but not in git diff: ${missing.join(", ")}`);
    }
  }
  const success = completionResult?.success !== false && !timedOut;
  if (handle) {
    cleanupWorktree(handle, { success, onWarn: (m) => log(`cleanup warn: ${m}`) });
  }
  if (!success) {
    const error = timedOut ? `Timed out after ${timeout}ms` : "Task did not complete successfully.";
    emit2({ status: "failed", jobId, error, branch: handle?.branch });
    process.exit(0);
  }
  const summary = completionResult?.summary && completionResult.summary.trim() || stream.getLastAssistantMessage()?.trim() || "Copilot completed without providing a summary.";
  const quotaRemaining = summarize(readSnapshot(stateDir));
  const envelope = {
    status: "completed",
    jobId,
    branch: handle?.branch,
    summary,
    filesModified,
    linesAdded,
    linesRemoved,
    premiumRequests: shutdownResult?.totalPremiumRequests ?? 0,
    model: shutdownResult?.currentModel ?? model,
    quotaRemaining
  };
  const envelopeJson = emit2(envelope);
  if (options.writePath) {
    const outPath = (0, import_node_path6.resolve)(cwd, options.writePath);
    (0, import_node_fs5.mkdirSync)((0, import_node_path6.dirname)(outPath), { recursive: true });
    (0, import_node_fs5.writeFileSync)(outPath, envelopeJson + "\n", "utf-8");
    progress(`Report saved to ${outPath}`);
  }
  log(`implement done: branch=${envelope.branch ?? "none"} files=${envelope.filesModified.length} premium=${envelope.premiumRequests}`);
  progress(`Job log: ${jobLogPath(stateDir, jobId)}`);
}

// src/commands/status.ts
init_state();
async function runStatus(cwd, options = {}) {
  const stateDir = resolveStateDir(cwd);
  const sessionId = options.all ? void 0 : getSessionId();
  if (options.jobId) {
    const job = readJobFile(stateDir, options.jobId);
    if (!job) {
      console.error(`Job not found: ${options.jobId}`);
      process.exit(1);
    }
    if (options.json) {
      console.log(JSON.stringify(job, null, 2));
      return;
    }
    const logTail = readLogTail(stateDir, job.id, 15);
    console.log(renderJobDetail(job, logTail));
    return;
  }
  const jobs = listJobs(stateDir, sessionId);
  const snapshot = readSnapshot(stateDir);
  const quota = summarize(snapshot);
  if (options.json) {
    console.log(JSON.stringify({ quota, jobs }, null, 2));
    return;
  }
  const sections = [];
  sections.push(renderQuotaBlock(snapshot !== null, quota));
  const running = jobs.filter((j) => j.status === "queued" || j.status === "running");
  const finished = jobs.filter((j) => j.status === "completed" || j.status === "failed");
  if (running.length > 0) {
    const rows = ["## Running"];
    for (const job of running) {
      const logTail = readLogTail(stateDir, job.id, 3);
      const lastLine = logTail[logTail.length - 1] ?? "";
      rows.push(`- **${job.id}** \`${job.kind}\` \u2014 ${job.summary} [${job.status}] ${lastLine}`);
    }
    sections.push(rows.join("\n"));
  }
  if (finished.length > 0) {
    const rows = ["## Recent"];
    for (const job of finished.slice(0, 10)) {
      const icon = job.status === "completed" ? "\u2713" : "\u2717";
      rows.push(`- ${icon} **${job.id}** \`${job.kind}\` \u2014 ${job.summary} [${job.status}]`);
    }
    sections.push(rows.join("\n"));
  }
  if (running.length === 0 && finished.length === 0) {
    sections.push("_No background jobs._");
  }
  console.log(sections.join("\n\n"));
}
function renderQuotaBlock(haveSnapshot, q) {
  const lines = ["## Copilot Quota"];
  if (!haveSnapshot) {
    lines.push("- No snapshot yet. One will be captured on the next `implement` run.");
    return lines.join("\n");
  }
  if (q.unlimited) {
    lines.push("- Unlimited entitlement.");
    return lines.join("\n");
  }
  const pct = typeof q.percentage === "number" ? `${(q.percentage * 100).toFixed(1)}%` : "?";
  lines.push(`- ${q.premium ?? "?"} premium request(s) remaining (${pct})`);
  if (q.resetAt) lines.push(`- Resets at ${q.resetAt}`);
  return lines.join("\n");
}
function renderJobDetail(job, logTail) {
  const sections = [];
  sections.push(`## Job: ${job.id}`);
  sections.push(`**Kind:** ${job.kind}`);
  sections.push(`**Status:** ${job.status}`);
  sections.push(`**Phase:** ${job.phase}`);
  sections.push(`**Summary:** ${job.summary}`);
  sections.push(`**Created:** ${job.createdAt}`);
  if (job.startedAt) sections.push(`**Started:** ${job.startedAt}`);
  if (job.completedAt) sections.push(`**Completed:** ${job.completedAt}`);
  if (job.errorMessage) sections.push(`**Error:** ${job.errorMessage}`);
  if (logTail.length > 0) {
    sections.push("\n### Recent Log");
    sections.push("```");
    sections.push(logTail.join("\n"));
    sections.push("```");
  }
  return sections.join("\n");
}

// src/commands/result.ts
init_state();
async function runResult(cwd, options = {}) {
  const stateDir = resolveStateDir(cwd);
  let jobId = options.jobId;
  if (!jobId) {
    const sessionId = getSessionId();
    const jobs = listJobs(stateDir, sessionId);
    const finished = jobs.find((j) => j.status === "completed" || j.status === "failed");
    if (!finished) {
      console.error("No completed jobs found.");
      process.exit(1);
    }
    jobId = finished.id;
  }
  const job = readJobFile(stateDir, jobId);
  if (!job) {
    console.error(`Job not found: ${jobId}`);
    process.exit(1);
  }
  if (job.status === "queued" || job.status === "running") {
    console.error(`Job ${jobId} is still ${job.status}. Use /copilot:status to check progress.`);
    process.exit(1);
  }
  if (options.json) {
    console.log(JSON.stringify({
      id: job.id,
      kind: job.kind,
      status: job.status,
      result: job.result,
      errorMessage: job.errorMessage
    }, null, 2));
    return;
  }
  if (job.status === "failed") {
    console.log(`## Job Failed: ${job.id}

**Error:** ${job.errorMessage ?? "Unknown error"}`);
    return;
  }
  if (job.result) {
    console.log(job.result);
  } else {
    console.log("Job completed but produced no output.");
  }
}

// src/commands/background.ts
var import_node_child_process3 = require("node:child_process");
init_state();
function enqueueBackground(command, args, flags, cwd) {
  if (command !== "implement") {
    throw new Error(`Background execution is only supported for 'implement', got '${command}'.`);
  }
  const stateDir = resolveStateDir(cwd);
  const jobId = generateJobId();
  const summary = args.join(" ").slice(0, 80) || command;
  const job = {
    id: jobId,
    kind: command,
    title: `Copilot ${command}`,
    summary,
    status: "queued",
    phase: "queued",
    cwd,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    sessionId: getSessionId(),
    request: { command, args, flags, cwd }
  };
  createJob(stateDir, job);
  appendLog(stateDir, jobId, `Queued for background execution: ${command} "${summary}"`);
  const scriptPath = getScriptPath();
  const child = (0, import_node_child_process3.spawn)(process.execPath, [scriptPath, "_worker", "--job-id", jobId, "--cwd", cwd], {
    cwd,
    env: { ...process.env, COPILOT_COMPANION_SESSION_ID: getSessionId() ?? "" },
    detached: true,
    stdio: "ignore"
  });
  child.unref();
  updateJob(stateDir, jobId, { pid: child.pid ?? null });
  return jobId;
}
function getScriptPath() {
  if (typeof __filename === "undefined" || !__filename) {
    throw new Error("Unable to resolve script path: __filename is not defined. The companion must be run via the bundled CJS output.");
  }
  return __filename;
}
function flagString(flags, key) {
  const v = flags[key];
  return typeof v === "string" ? v : void 0;
}
function flagNumber(flags, key) {
  const v = flags[key];
  if (typeof v !== "string") return void 0;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : void 0;
}
async function runWorker(jobId, cwd) {
  const stateDir = resolveStateDir(cwd);
  const { readJobFile: readJobFile2 } = await Promise.resolve().then(() => (init_state(), state_exports));
  const job = readJobFile2(stateDir, jobId);
  if (!job) {
    console.error(`Worker: Job not found: ${jobId}`);
    process.exit(1);
  }
  const { args, flags } = job.request;
  updateJob(stateDir, jobId, {
    status: "running",
    phase: "starting",
    startedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  appendLog(stateDir, jobId, "Worker started.");
  const stdoutChunks = [];
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((chunk, ...rest) => {
    const text = typeof chunk === "string" ? chunk : chunk.toString();
    stdoutChunks.push(text);
    return originalStdoutWrite(chunk, ...rest);
  });
  const originalStderrWrite = process.stderr.write.bind(process.stderr);
  process.stderr.write = ((chunk, ...rest) => {
    const text = typeof chunk === "string" ? chunk : chunk.toString();
    if (text.trim()) appendLog(stateDir, jobId, text.trim());
    return originalStderrWrite(chunk, ...rest);
  });
  const reasoning = flagString(flags, "reasoning");
  const implementOpts = {
    model: flagString(flags, "model"),
    reasoning: reasoning === "low" || reasoning === "medium" || reasoning === "high" ? reasoning : void 0,
    timeout: flagNumber(flags, "timeout"),
    worktree: flags["no-worktree"] !== true,
    allowShell: flags["allow-shell"] === true,
    allowUrl: flags["allow-url"] === true,
    minQuota: flagNumber(flags, "min-quota"),
    writePath: flagString(flags, "write"),
    jobId
  };
  try {
    const task = args.join(" ");
    await runImplement(task, cwd, implementOpts);
    const captured = stdoutChunks.join("").trim();
    updateJob(stateDir, jobId, {
      status: "completed",
      phase: "done",
      completedAt: (/* @__PURE__ */ new Date()).toISOString(),
      result: captured
    });
    appendLog(stateDir, jobId, "Worker completed.");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    updateJob(stateDir, jobId, {
      status: "failed",
      phase: "failed",
      completedAt: (/* @__PURE__ */ new Date()).toISOString(),
      errorMessage: message
    });
    appendLog(stateDir, jobId, `Worker failed: ${message}`);
  } finally {
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
  }
}

// src/copilot-companion.ts
function printUsage() {
  console.log(
    [
      "Usage:",
      "  copilot-companion setup [--check] [--json]",
      '  copilot-companion implement "<task>" [--model <id>] [--reasoning <low|medium|high>]',
      "                               [--no-worktree] [--allow-shell] [--allow-url]",
      "                               [--timeout <ms>] [--min-quota <n>]",
      "                               [--background] [--write <path>]",
      "  copilot-companion status [job-id] [--all] [--json]",
      "  copilot-companion result [job-id] [--json]",
      "",
      "Commands:",
      "  setup       Check GitHub Copilot authentication, available models, quota",
      "  implement   Delegate an implementation task to GitHub Copilot",
      "  status      Show quota plus background job status",
      "  result      Retrieve a background job's output"
    ].join("\n")
  );
}
function parseArgs(argv) {
  const command = argv[0] ?? "help";
  const args = [];
  const flags = {};
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next !== void 0 && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      args.push(arg);
    }
  }
  return { command, args, flags };
}
function flagString2(flags, key) {
  const v = flags[key];
  return typeof v === "string" ? v : void 0;
}
function flagNumber2(flags, key) {
  const v = flags[key];
  if (typeof v !== "string") return void 0;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : void 0;
}
async function main() {
  const { command, args, flags } = parseArgs(import_node_process.default.argv.slice(2));
  switch (command) {
    case "setup":
      await runSetup({
        check: flags["check"] === true,
        json: flags["json"] === true
      });
      break;
    case "implement": {
      if (flags["background"] === true) {
        const jobId = enqueueBackground("implement", args, flags, import_node_process.default.cwd());
        console.log(JSON.stringify({ status: "queued", jobId }));
        break;
      }
      const task = args.join(" ") || flagString2(flags, "task") || "";
      const reasoning = flagString2(flags, "reasoning");
      await runImplement(task, import_node_process.default.cwd(), {
        model: flagString2(flags, "model"),
        reasoning: reasoning === "low" || reasoning === "medium" || reasoning === "high" ? reasoning : void 0,
        timeout: flagNumber2(flags, "timeout"),
        worktree: flags["no-worktree"] !== true,
        allowShell: flags["allow-shell"] === true,
        allowUrl: flags["allow-url"] === true,
        minQuota: flagNumber2(flags, "min-quota"),
        writePath: flagString2(flags, "write")
      });
      break;
    }
    case "status":
      await runStatus(import_node_process.default.cwd(), {
        jobId: args[0],
        all: flags["all"] === true,
        json: flags["json"] === true
      });
      break;
    case "result":
      await runResult(import_node_process.default.cwd(), {
        jobId: args[0],
        json: flags["json"] === true
      });
      break;
    // Internal: background worker entry point.
    case "_worker": {
      const jobId = flagString2(flags, "job-id");
      const workerCwd = flagString2(flags, "cwd") ?? import_node_process.default.cwd();
      if (!jobId) {
        console.error("Worker requires --job-id");
        import_node_process.default.exit(1);
      }
      await runWorker(jobId, workerCwd);
      break;
    }
    case "help":
    case "--help":
    case "-h":
      printUsage();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      import_node_process.default.exit(1);
  }
}
main().catch((err) => {
  console.error(`
Fatal error: ${err.message}`);
  if (import_node_process.default.env["DEBUG"]) console.error(err.stack);
  import_node_process.default.exit(1);
});
