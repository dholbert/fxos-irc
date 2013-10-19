/* http://mozilla.github.io/brick/download.html?byob=x-tag-deck,x-tag-flipbox,x-tag-layout,x-tag-tabbar */
window.Platform = {};
var logFlags = {};
(function() {
  function e(e) {
    if (this._element = e, e.className != this._classCache) {
      if (this._classCache = e.className, !this._classCache) return;
      var t, n = this._classCache.replace(/^\s+|\s+$/g, "").split(/\s+/);
      for (t = 0; n.length > t; t++) a.call(this, n[t])
    }
  }

  function t(e, t) {
    e.className = t.join(" ")
  }

  function n(e, t, n) {
    Object.defineProperty ? Object.defineProperty(e, t, {
      get: n
    }) : e.__defineGetter__(t, n)
  }
  if (!(window.Element === void 0 || "classList" in document.documentElement)) {
    var r = Array.prototype,
      o = r.indexOf,
      i = r.slice,
      a = r.push,
      s = r.splice,
      c = r.join;
    e.prototype = {
      add: function(e) {
        this.contains(e) || (a.call(this, e), t(this._element, i.call(this, 0)))
      },
      contains: function(e) {
        return -1 !== o.call(this, e)
      },
      item: function(e) {
        return this[e] || null
      },
      remove: function(e) {
        var n = o.call(this, e); - 1 !== n && (s.call(this, n, 1), t(this._element, i.call(this, 0)))
      },
      toString: function() {
        return c.call(this, " ")
      },
      toggle: function(e) {
        -1 === o.call(this, e) ? this.add(e) : this.remove(e)
      }
    }, window.DOMTokenList = e, n(Element.prototype, "classList", function() {
      return new e(this)
    })
  }
})();
var SideTable;
if ("undefined" != typeof WeakMap && 0 > navigator.userAgent.indexOf("Firefox/") ? SideTable = WeakMap : function() {
  var e = Object.defineProperty,
    t = Date.now() % 1e9;
  SideTable = function() {
    this.name = "__st" + (1e9 * Math.random() >>> 0) + (t+++"__")
  }, SideTable.prototype = {
    set: function(t, n) {
      var r = t[this.name];
      r && r[0] === t ? r[1] = n : e(t, this.name, {
        value: [t, n],
        writable: !0
      })
    },
    get: function(e) {
      var t;
      return (t = e[this.name]) && t[0] === e ? t[1] : void 0
    },
    "delete": function(e) {
      this.set(e, void 0)
    }
  }
}(), function(e) {
  function t(e) {
    y.push(e), b || (b = !0, m(r))
  }

  function n(e) {
    return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e
  }

  function r() {
    b = !1;
    var e = y;
    y = [], e.sort(function(e, t) {
      return e.uid_ - t.uid_
    });
    var t = !1;
    e.forEach(function(e) {
      var n = e.takeRecords();
      o(e), n.length && (e.callback_(n, e), t = !0)
    }), t && r()
  }

  function o(e) {
    e.nodes_.forEach(function(t) {
      var n = h.get(t);
      n && n.forEach(function(t) {
        t.observer === e && t.removeTransientObservers()
      })
    })
  }

  function i(e, t) {
    for (var n = e; n; n = n.parentNode) {
      var r = h.get(n);
      if (r)
        for (var o = 0; r.length > o; o++) {
          var i = r[o],
            a = i.options;
          if (n === e || a.subtree) {
            var s = t(a);
            s && i.enqueue(s)
          }
        }
    }
  }

  function a(e) {
    this.callback_ = e, this.nodes_ = [], this.records_ = [], this.uid_ = ++w
  }

  function s(e, t) {
    this.type = e, this.target = t, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, this.oldValue = null
  }

  function c(e) {
    var t = new s(e.type, e.target);
    return t.addedNodes = e.addedNodes.slice(), t.removedNodes = e.removedNodes.slice(), t.previousSibling = e.previousSibling, t.nextSibling = e.nextSibling, t.attributeName = e.attributeName, t.attributeNamespace = e.attributeNamespace, t.oldValue = e.oldValue, t
  }

  function u(e, t) {
    return E = new s(e, t)
  }

  function l(e) {
    return L ? L : (L = c(E), L.oldValue = e, L)
  }

  function d() {
    E = L = void 0
  }

  function f(e) {
    return e === L || e === E
  }

  function p(e, t) {
    return e === t ? e : L && f(e) ? L : null
  }

  function v(e, t, n) {
    this.observer = e, this.target = t, this.options = n, this.transientObservedNodes = []
  }
  var h = new SideTable,
    m = window.msSetImmediate;
  if (!m) {
    var _ = [],
      g = Math.random() + "";
    window.addEventListener("message", function(e) {
      if (e.data === g) {
        var t = _;
        _ = [], t.forEach(function(e) {
          e()
        })
      }
    }), m = function(e) {
      _.push(e), window.postMessage(g, "*")
    }
  }
  var b = !1,
    y = [],
    w = 0;
  a.prototype = {
    observe: function(e, t) {
      if (e = n(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData) throw new SyntaxError;
      var r = h.get(e);
      r || h.set(e, r = []);
      for (var o, i = 0; r.length > i; i++)
        if (r[i].observer === this) {
          o = r[i], o.removeListeners(), o.options = t;
          break
        }
      o || (o = new v(this, e, t), r.push(o), this.nodes_.push(e)), o.addListeners()
    },
    disconnect: function() {
      this.nodes_.forEach(function(e) {
        for (var t = h.get(e), n = 0; t.length > n; n++) {
          var r = t[n];
          if (r.observer === this) {
            r.removeListeners(), t.splice(n, 1);
            break
          }
        }
      }, this), this.records_ = []
    },
    takeRecords: function() {
      var e = this.records_;
      return this.records_ = [], e
    }
  };
  var E, L;
  v.prototype = {
    enqueue: function(e) {
      var n = this.observer.records_,
        r = n.length;
      if (n.length > 0) {
        var o = n[r - 1],
          i = p(o, e);
        if (i) return n[r - 1] = i, void 0
      } else t(this.observer);
      n[r] = e
    },
    addListeners: function() {
      this.addListeners_(this.target)
    },
    addListeners_: function(e) {
      var t = this.options;
      t.attributes && e.addEventListener("DOMAttrModified", this, !0), t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0), t.childList && e.addEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0)
    },
    removeListeners: function() {
      this.removeListeners_(this.target)
    },
    removeListeners_: function(e) {
      var t = this.options;
      t.attributes && e.removeEventListener("DOMAttrModified", this, !0), t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0), t.childList && e.removeEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0)
    },
    addTransientObserver: function(e) {
      if (e !== this.target) {
        this.addListeners_(e), this.transientObservedNodes.push(e);
        var t = h.get(e);
        t || h.set(e, t = []), t.push(this)
      }
    },
    removeTransientObservers: function() {
      var e = this.transientObservedNodes;
      this.transientObservedNodes = [], e.forEach(function(e) {
        this.removeListeners_(e);
        for (var t = h.get(e), n = 0; t.length > n; n++)
          if (t[n] === this) {
            t.splice(n, 1);
            break
          }
      }, this)
    },
    handleEvent: function(e) {
      switch (e.stopImmediatePropagation(), e.type) {
        case "DOMAttrModified":
          var t = e.attrName,
            n = e.relatedNode.namespaceURI,
            r = e.target,
            o = new u("attributes", r);
          o.attributeName = t, o.attributeNamespace = n;
          var a = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
          i(r, function(e) {
            return !e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? l(a) : o
          });
          break;
        case "DOMCharacterDataModified":
          var r = e.target,
            o = u("characterData", r),
            a = e.prevValue;
          i(r, function(e) {
            return e.characterData ? e.characterDataOldValue ? l(a) : o : void 0
          });
          break;
        case "DOMNodeRemoved":
          this.addTransientObserver(e.target);
        case "DOMNodeInserted":
          var s, c, r = e.relatedNode,
            f = e.target;
          "DOMNodeInserted" === e.type ? (s = [f], c = []) : (s = [], c = [f]);
          var p = f.previousSibling,
            v = f.nextSibling,
            o = u("childList", r);
          o.addedNodes = s, o.removedNodes = c, o.previousSibling = p, o.nextSibling = v, i(r, function(e) {
            return e.childList ? o : void 0
          })
      }
      d()
    }
  }, e.JsMutationObserver = a
}(this), !window.MutationObserver && (window.MutationObserver = window.WebKitMutationObserver || window.JsMutationObserver, !MutationObserver)) throw Error("no mutation observer support");
(function(e) {
  function t(t, i) {
    var a = i || {};
    if (!t) throw Error("document.register: first argument `name` must not be empty");
    if (0 > t.indexOf("-")) throw Error("document.register: first argument ('name') must contain a dash ('-'). Argument provided was '" + (t + "") + "'.");
    if (a.name = t, !a.prototype) throw Error("Options missing required prototype property");
    return a.lifecycle = a.lifecycle || {}, a.ancestry = n(a.extends), r(a), o(a), l(a.prototype), f(t, a), a.ctor = p(a), a.ctor.prototype = a.prototype, a.prototype.constructor = a.ctor, e.ready && e.upgradeAll(document), a.ctor
  }

  function n(e) {
    var t = w[e];
    return t ? n(t.extends).concat([t]) : []
  }

  function r(e) {
    for (var t, n = e.extends, r = 0; t = e.ancestry[r]; r++) n = t.is && t.tag;
    e.tag = n || e.name, n && (e.is = e.name)
  }

  function o(e) {
    if (!Object.__proto__) {
      var t = HTMLElement.prototype;
      if (e.is) {
        var n = document.createElement(e.tag);
        t = Object.getPrototypeOf(n)
      }
      for (var r, o = e.prototype; o && o !== t;) {
        var r = Object.getPrototypeOf(o);
        o.__proto__ = r, o = r
      }
    }
    e.native = t
  }

  function i(e) {
    return a(E(e.tag), e)
  }

  function a(t, n) {
    return n.is && t.setAttribute("is", n.is), s(t, n), t.__upgraded__ = !0, e.upgradeSubtree(t), u(t), t
  }

  function s(e, t) {
    Object.__proto__ ? e.__proto__ = t.prototype : (c(e, t.prototype, t.native), e.__proto__ = t.prototype)
  }

  function c(e, t, n) {
    for (var r = {}, o = t; o !== n && o !== HTMLUnknownElement.prototype;) {
      for (var i, a = Object.getOwnPropertyNames(o), s = 0; i = a[s]; s++) r[i] || (Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(o, i)), r[i] = 1);
      o = Object.getPrototypeOf(o)
    }
  }

  function u(e) {
    e.createdCallback && e.createdCallback()
  }

  function l(e) {
    var t = e.setAttribute;
    e.setAttribute = function(e, n) {
      d.call(this, e, n, t)
    };
    var n = e.removeAttribute;
    e.removeAttribute = function(e, t) {
      d.call(this, e, t, n)
    }
  }

  function d(e, t, n) {
    var r = this.getAttribute(e);
    n.apply(this, arguments), this.attributeChangedCallback && this.getAttribute(e) !== r && this.attributeChangedCallback(e, r)
  }

  function f(e, t) {
    w[e] = t
  }

  function p(e) {
    return function() {
      return i(e)
    }
  }

  function v(e, t) {
    var n = w[t || e];
    return n ? new n.ctor : E(e)
  }

  function h(e) {
    if (!e.__upgraded__ && e.nodeType === Node.ELEMENT_NODE) {
      var t = e.getAttribute("is") || e.localName,
        n = w[t];
      return n && a(e, n)
    }
  }

  function m(t) {
    var n = L.call(this, t);
    return e.upgradeAll(n), n
  }
  e || (e = window.CustomElements = {
    flags: {}
  });
  var _ = e.flags,
    g = Boolean(document.register),
    b = !_.register && g;
  if (b) {
    var y = function() {};
    e.registry = {}, e.upgradeElement = y, e.watchShadow = y, e.upgrade = y, e.upgradeAll = y, e.upgradeSubtree = y, e.observeDocument = y, e.upgradeDocument = y, e.takeRecords = y
  } else {
    var w = {}, E = document.createElement.bind(document),
      L = Node.prototype.cloneNode;
    document.register = t, document.createElement = v, Node.prototype.cloneNode = m, e.registry = w, e.upgrade = h
  }
  e.hasNative = g, e.useNative = b
})(window.CustomElements),
function(e) {
  function t(e, n, r) {
    var o = e.firstElementChild;
    if (!o)
      for (o = e.firstChild; o && o.nodeType !== Node.ELEMENT_NODE;) o = o.nextSibling;
    for (; o;) n(o, r) !== !0 && t(o, n, r), o = o.nextElementSibling;
    return null
  }

  function n(e, t) {
    for (var n = e.shadowRoot; n;) r(n, t), n = n.olderShadowRoot
  }

  function r(e, r) {
    t(e, function(e) {
      return r(e) ? !0 : (n(e, r), void 0)
    }), n(e, r)
  }

  function o(e) {
    return s(e) ? (c(e), !0) : (d(e), void 0)
  }

  function i(e) {
    r(e, function(e) {
      return o(e) ? !0 : void 0
    })
  }

  function a(e) {
    return o(e) || i(e)
  }

  function s(t) {
    if (!t.__upgraded__ && t.nodeType === Node.ELEMENT_NODE) {
      var n = t.getAttribute("is") || t.localName,
        r = e.registry[n];
      if (r) return O.dom && console.group("upgrade:", t.localName), e.upgrade(t), O.dom && console.groupEnd(), !0
    }
  }

  function c(e) {
    d(e), h(e) && r(e, function(e) {
      d(e)
    })
  }

  function u(e) {
    if (A.push(e), !k) {
      k = !0;
      var t = window.Platform && window.Platform.endOfMicrotask || setTimeout;
      t(l)
    }
  }

  function l() {
    k = !1;
    for (var e, t = A, n = 0, r = t.length; r > n && (e = t[n]); n++) e();
    A = []
  }

  function d(e) {
    N ? u(function() {
      f(e)
    }) : f(e)
  }

  function f(e) {
    (e.enteredViewCallback || e.__upgraded__ && O.dom) && (O.dom && console.group("inserted:", e.localName), h(e) && (e.__inserted = (e.__inserted || 0) + 1, 1 > e.__inserted && (e.__inserted = 1), e.__inserted > 1 ? O.dom && console.warn("inserted:", e.localName, "insert/remove count:", e.__inserted) : e.enteredViewCallback && (O.dom && console.log("inserted:", e.localName), e.enteredViewCallback())), O.dom && console.groupEnd())
  }

  function p(e) {
    v(e), r(e, function(e) {
      v(e)
    })
  }

  function v(e) {
    N ? u(function() {
      _removed(e)
    }) : _removed(e)
  }

  function v(e) {
    (e.leftViewCallback || e.__upgraded__ && O.dom) && (O.dom && console.log("removed:", e.localName), h(e) || (e.__inserted = (e.__inserted || 0) - 1, e.__inserted > 0 && (e.__inserted = 0), 0 > e.__inserted ? O.dom && console.warn("removed:", e.localName, "insert/remove count:", e.__inserted) : e.leftViewCallback && e.leftViewCallback()))
  }

  function h(e) {
    for (var t = e, n = window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(document) || document; t;) {
      if (t == n) return !0;
      t = t.parentNode || t.host
    }
  }

  function m(e) {
    if (e.shadowRoot && !e.shadowRoot.__watched) {
      O.dom && console.log("watching shadow-root for: ", e.localName);
      for (var t = e.shadowRoot; t;) _(t), t = t.olderShadowRoot
    }
  }

  function _(e) {
    e.__watched || (w(e), e.__watched = !0)
  }

  function g(e) {
    switch (e.localName) {
      case "style":
      case "script":
      case "template":
      case void 0:
        return !0
    }
  }

  function b(e) {
    if (O.dom) {
      var t = e[0];
      if (t && "childList" === t.type && t.addedNodes && t.addedNodes) {
        for (var n = t.addedNodes[0]; n && n !== document && !n.host;) n = n.parentNode;
        var r = n && (n.URL || n._URL || n.host && n.host.localName) || "";
        r = r.split("/?").shift().split("/").pop()
      }
      console.group("mutations (%d) [%s]", e.length, r || "")
    }
    e.forEach(function(e) {
      "childList" === e.type && (T(e.addedNodes, function(e) {
        g(e) || a(e)
      }), T(e.removedNodes, function(e) {
        g(e) || p(e)
      }))
    }), O.dom && console.groupEnd()
  }

  function y() {
    b(M.takeRecords()), l()
  }

  function w(e) {
    M.observe(e, {
      childList: !0,
      subtree: !0
    })
  }

  function E(e) {
    w(e)
  }

  function L(e) {
    O.dom && console.group("upgradeDocument: ", (e.URL || e._URL || "").split("/").pop()), a(e), O.dom && console.groupEnd()
  }
  var O = window.logFlags || {}, N = !window.MutationObserver || window.MutationObserver === window.JsMutationObserver;
  e.hasPolyfillMutations = N;
  var k = !1,
    A = [],
    M = new MutationObserver(b),
    T = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  e.watchShadow = m, e.upgradeAll = a, e.upgradeSubtree = i, e.observeDocument = E, e.upgradeDocument = L, e.takeRecords = y
}(window.CustomElements),
function(e) {
  function t(e) {
    return r(e, c)
  }

  function n(e) {
    return r(e, u)
  }

  function r(e, t) {
    return "link" === e.localName && e.getAttribute("rel") === t
  }

  function o(e) {
    return "script" === e.localName
  }

  function i(e, t) {
    var n = e;
    n instanceof Document || (n = document.implementation.createHTMLDocument(c), n.body.innerHTML = e), n._URL = t;
    var r = n.createElement("base");
    return r.setAttribute("href", document.baseURI || document.URL), n.head.appendChild(r), window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(n), n
  }
  e || (e = window.HTMLImports = {
    flags: {}
  });
  var a, s = e.xhr,
    c = "import",
    u = "stylesheet",
    l = {
      documents: {},
      cache: {},
      preloadSelectors: ["link[rel=" + c + "]", "element link[rel=" + u + "]", "template", "script[src]:not([type])", 'script[src][type="text/javascript"]'].join(","),
      loader: function(e) {
        return a = new d(l.loaded, e), a.cache = l.cache, a
      },
      load: function(e, t) {
        a = l.loader(t), l.preload(e)
      },
      preload: function(e) {
        var t = e.querySelectorAll(l.preloadSelectors);
        t = this.filterMainDocumentNodes(e, t), t = this.extractTemplateNodes(t), a.addNodes(t)
      },
      filterMainDocumentNodes: function(e, t) {
        return e === document && (t = Array.prototype.filter.call(t, function(e) {
          return !o(e)
        })), t
      },
      extractTemplateNodes: function(e) {
        var t = [];
        return e = Array.prototype.filter.call(e, function(e) {
          if ("template" === e.localName) {
            if (e.content) {
              var n = e.content.querySelectorAll("link[rel=" + u + "]");
              n.length && (t = t.concat(Array.prototype.slice.call(n, 0)))
            }
            return !1
          }
          return !0
        }), t.length && (e = e.concat(t)), e
      },
      loaded: function(e, r, o) {
        if (t(r)) {
          var a = l.documents[e];
          a || (a = i(o, e), h.resolvePathsInHTML(a), l.documents[e] = a, l.preload(a)), r.import = {
            href: e,
            ownerNode: r,
            content: a
          }, r.content = o = a
        }
        r.__resource = o, n(r) && h.resolvePathsInStylesheet(r)
      }
    }, d = function(e, t) {
      this.onload = e, this.oncomplete = t, this.inflight = 0, this.pending = {}, this.cache = {}
    };
  d.prototype = {
    addNodes: function(e) {
      this.inflight += e.length, m(e, this.require, this), this.checkDone()
    },
    require: function(e) {
      var t = h.nodeUrl(e);
      e.__nodeUrl = t, this.dedupe(t, e) || this.fetch(t, e)
    },
    dedupe: function(e, t) {
      return this.pending[e] ? (this.pending[e].push(t), !0) : this.cache[e] ? (this.onload(e, t, a.cache[e]), this.tail(), !0) : (this.pending[e] = [t], !1)
    },
    fetch: function(e, t) {
      var n = function(n, r) {
        this.receive(e, t, n, r)
      }.bind(this);
      s.load(e, n)
    },
    receive: function(e, t, n, r) {
      n || (a.cache[e] = r), a.pending[e].forEach(function(t) {
        n || this.onload(e, t, r), this.tail()
      }, this), a.pending[e] = null
    },
    tail: function() {
      --this.inflight, this.checkDone()
    },
    checkDone: function() {
      this.inflight || this.oncomplete()
    }
  };
  var f = ["href", "src", "action"],
    p = "[" + f.join("],[") + "]",
    v = "{{.*}}",
    h = {
      nodeUrl: function(e) {
        return h.resolveUrl(h.documentURL, h.hrefOrSrc(e))
      },
      hrefOrSrc: function(e) {
        return e.getAttribute("href") || e.getAttribute("src")
      },
      documentUrlFromNode: function(e) {
        return h.getDocumentUrl(e.ownerDocument || e)
      },
      getDocumentUrl: function(e) {
        var t = e && (e._URL || e.impl && e.impl._URL || e.baseURI || e.URL) || "";
        return t.split("#")[0]
      },
      resolveUrl: function(e, t) {
        return this.isAbsUrl(t) ? t : this.compressUrl(this.urlToPath(e) + t)
      },
      resolveRelativeUrl: function(e, t) {
        return this.isAbsUrl(t) ? t : this.makeDocumentRelPath(this.resolveUrl(e, t))
      },
      isAbsUrl: function(e) {
        return /(^data:)|(^http[s]?:)|(^\/)/.test(e)
      },
      urlToPath: function(e) {
        var t = e.split("/");
        return t.pop(), t.push(""), t.join("/")
      },
      compressUrl: function(e) {
        var t = "",
          n = e.indexOf("?");
        n > -1 && (t = e.substring(n), e = e.substring(n, 0));
        for (var r, o = e.split("/"), i = 0; o.length > i; i++) r = o[i], ".." === r && (o.splice(i - 1, 2), i -= 2);
        return o.join("/") + t
      },
      makeDocumentRelPath: function(e) {
        return h.urlElt.href = e, !h.urlElt.host || h.urlElt.host === window.location.host && h.urlElt.protocol === window.location.protocol ? this.makeRelPath(h.documentURL, h.urlElt.href) : e
      },
      makeRelPath: function(e, t) {
        for (var n = e.split("/"), r = t.split("/"); n.length && n[0] === r[0];) n.shift(), r.shift();
        for (var o = 0, i = n.length - 1; i > o; o++) r.unshift("..");
        var a = r.join("/");
        return a
      },
      resolvePathsInHTML: function(e, t) {
        t = t || h.documentUrlFromNode(e), h.resolveAttributes(e, t), h.resolveStyleElts(e, t);
        var n = e.querySelectorAll("template");
        n && m(n, function(e) {
          e.content && h.resolvePathsInHTML(e.content, t)
        })
      },
      resolvePathsInStylesheet: function(e) {
        var t = h.nodeUrl(e);
        e.__resource = h.resolveCssText(e.__resource, t)
      },
      resolveStyleElts: function(e, t) {
        var n = e.querySelectorAll("style");
        n && m(n, function(e) {
          e.textContent = h.resolveCssText(e.textContent, t)
        })
      },
      resolveCssText: function(e, t) {
        return e.replace(/url\([^)]*\)/g, function(e) {
          var n = e.replace(/["']/g, "").slice(4, -1);
          return n = h.resolveRelativeUrl(t, n), "url(" + n + ")"
        })
      },
      resolveAttributes: function(e, t) {
        var n = e && e.querySelectorAll(p);
        n && m(n, function(e) {
          this.resolveNodeAttributes(e, t)
        }, this)
      },
      resolveNodeAttributes: function(e, t) {
        f.forEach(function(n) {
          var r = e.attributes[n];
          if (r && r.value && 0 > r.value.search(v)) {
            var o = h.resolveRelativeUrl(t, r.value);
            r.value = o
          }
        })
      }
    };
  h.documentURL = h.getDocumentUrl(document), h.urlElt = document.createElement("a"), s = s || {
    async: !0,
    ok: function(e) {
      return e.status >= 200 && 300 > e.status || 304 === e.status || 0 === e.status
    },
    load: function(t, n, r) {
      var o = new XMLHttpRequest;
      return (e.flags.debug || e.flags.bust) && (t += "?" + Math.random()), o.open("GET", t, s.async), o.addEventListener("readystatechange", function() {
        4 === o.readyState && n.call(r, !s.ok(o) && o, o.response, t)
      }), o.send(), o
    },
    loadDocument: function(e, t, n) {
      this.load(e, t, n).responseType = "document"
    }
  };
  var m = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  e.path = h, e.xhr = s, e.importer = l, e.getDocumentUrl = h.getDocumentUrl, e.IMPORT_LINK_TYPE = c
}(window.HTMLImports),
function(e) {
  function t(e) {
    return "link" === e.localName && e.getAttribute("rel") === i
  }

  function n(e) {
    return e.parentNode && !r(e) && !o(e)
  }

  function r(e) {
    return e.ownerDocument === document || e.ownerDocument.impl === document
  }

  function o(e) {
    return e.parentNode && "element" === e.parentNode.localName
  }
  var i = "import",
    a = {
      selectors: ["link[rel=" + i + "]", "link[rel=stylesheet]", "style", "script:not([type])", 'script[type="text/javascript"]'],
      map: {
        link: "parseLink",
        script: "parseScript",
        style: "parseGeneric"
      },
      parse: function(e) {
        if (!e.__importParsed) {
          e.__importParsed = !0;
          var t = e.querySelectorAll(a.selectors);
          s(t, function(e) {
            a[a.map[e.localName]](e)
          })
        }
      },
      parseLink: function(e) {
        t(e) ? e.content && a.parse(e.content) : this.parseGeneric(e)
      },
      parseGeneric: function(e) {
        n(e) && document.head.appendChild(e)
      },
      parseScript: function(t) {
        if (n(t)) {
          var r = (t.__resource || t.textContent).trim();
          if (r) {
            var o = t.__nodeUrl;
            if (!o) {
              var o = e.path.documentUrlFromNode(t),
                i = "[" + Math.floor(1e3 * (Math.random() + 1)) + "]",
                a = r.match(/Polymer\(['"]([^'"]*)/);
              i = a && a[1] || i, o += "/" + i + ".js"
            }
            //r += "\n//# sourceURL=" + o + "\n", eval.call(window, r)
          }
        }
      }
    }, s = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  e.parser = a
}(HTMLImports),
function() {
  function e() {
    HTMLImports.importer.load(document, function() {
      HTMLImports.parser.parse(document), HTMLImports.readyTime = (new Date).getTime(), document.dispatchEvent(new CustomEvent("HTMLImportsLoaded", {
        bubbles: !0
      }))
    })
  }
  "function" != typeof window.CustomEvent && (window.CustomEvent = function(e) {
    var t = document.createEvent("HTMLEvents");
    return t.initEvent(e, !0, !0), t
  }), "complete" === document.readyState ? e() : window.addEventListener("DOMContentLoaded", e)
}(),
function() {
  function e(e) {
    return "link" === e.localName && e.getAttribute("rel") === t
  }
  var t = window.HTMLImports ? HTMLImports.IMPORT_LINK_TYPE : "none",
    n = {
      selectors: ["link[rel=" + t + "]"],
      map: {
        link: "parseLink"
      },
      parse: function(e) {
        if (!e.__parsed) {
          e.__parsed = !0;
          var t = e.querySelectorAll(n.selectors);
          r(t, function(e) {
            n[n.map[e.localName]](e)
          }), CustomElements.upgradeDocument(e), CustomElements.observeDocument(e)
        }
      },
      parseLink: function(t) {
        e(t) && this.parseImport(t)
      },
      parseImport: function(e) {
        e.content && n.parse(e.content)
      }
    }, r = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  CustomElements.parser = n
}(),
function() {
  function e() {
    CustomElements.parser.parse(document), CustomElements.upgradeDocument(document);
    var e = window.Platform && Platform.endOfMicrotask ? Platform.endOfMicrotask : setTimeout;
    e(function() {
      CustomElements.ready = !0, CustomElements.readyTime = Date.now(), window.HTMLImports && (CustomElements.elapsed = CustomElements.readyTime - HTMLImports.readyTime), document.body.dispatchEvent(new CustomEvent("WebComponentsReady", {
        bubbles: !0
      }))
    })
  }
  if ("function" != typeof window.CustomEvent && (window.CustomEvent = function(e) {
    var t = document.createEvent("HTMLEvents");
    return t.initEvent(e, !0, !0), t
  }), "complete" === document.readyState) e();
  else {
    var t = window.HTMLImports ? "HTMLImportsLoaded" : "DOMContentLoaded";
    window.addEventListener(t, e)
  }
}(),
function() {
  function e(e) {
    var t = P.call(e);
    return S[t] || (S[t] = t.match(R)[1].toLowerCase())
  }

  function t(n, r) {
    var o = t[r || e(n)];
    return o ? o(n) : n
  }

  function n(t) {
    return -1 == U.indexOf(e(t)) ? Array.prototype.slice.call(t, 0) : [t]
  }

  function r(e, t) {
    return (t || I).length ? n(e.querySelectorAll(t)) : []
  }

  function o(e, t) {
    var n = {
      added: [],
      removed: []
    };
    t.forEach(function(t) {
      t._mutation = !0;
      for (var r in n)
        for (var o = e._records["added" == r ? "inserted" : "removed"], i = t[r + "Nodes"], a = i.length, s = 0; a > s && -1 == n[r].indexOf(i[s]); s++) n[r].push(i[s]), o.forEach(function(e) {
          e(i[s], t)
        })
    })
  }

  function i(n, r, o) {
    var i = e(o);
    return "object" == i && "object" == e(n[r]) ? q.merge(n[r], o) : n[r] = t(o, i), n
  }

  function a(e, t, n) {
    var r = {};
    for (var o in n) r[o.split(":")[0]] = !0;
    for (var i in t) r[i.split(":")[0]] || (n[i] = t[i])
  }

  function s(e) {
    return e.mixins.forEach(function(t) {
      var n = q.mixins[t];
      for (var r in n) switch (r) {
        case "lifecycle":
        case "methods":
          a(r, n[r], e[r]);
          break;
        case "accessors":
        case "prototype":
          for (var o in n[r]) a(o, n[r], e.accessors);
          break;
        case "events":
      }
    }), e
  }

  function c(e, t) {
    var n = r(this, e.value).filter(function(e) {
      return e == t.target || e.contains ? e.contains(t.target) : null
    })[0];
    return n ? e.listener = e.listener.bind(n) : null
  }

  function u(e) {
    if (e.type.match("touch")) e.target.__touched__ = !0;
    else if (e.target.__touched__ && e.type.match("mouse")) return delete e.target.__touched__, void 0;
    return !0
  }

  function l(e) {
    var t = "over" == e;
    return {
      attach: "OverflowEvent" in E ? "overflowchanged" : [],
      condition: function(n) {
        return n.flow = e, n.type == e + "flow" || 0 === n.orient && n.horizontalOverflow == t || 1 == n.orient && n.verticalOverflow == t || 2 == n.orient && n.horizontalOverflow == t && n.verticalOverflow == t
      }
    }
  }

  function d(e, t, n, r) {
    r ? t[e] = n[e] : Object.defineProperty(t, e, {
      writable: !0,
      enumerable: !0,
      value: n[e]
    })
  }

  function f(e, t) {
    var n = Object.getOwnPropertyDescriptor(e, "target");
    for (var r in t) j[r] || d(r, e, t, n);
    e.baseEvent = t
  }

  function p(e, t) {
    return {
      value: e.boolean ? "" : t,
      method: e.boolean && !t ? "removeAttribute" : "setAttribute"
    }
  }

  function v(e, t, n, r) {
    var o = p(t, r);
    e[o.method](n, o.value)
  }

  function h(e, t, n, r, o) {
    for (var i = t.property ? [e.xtag[t.property]] : t.selector ? q.query(e, t.selector) : [], a = i.length; a--;) i[a][o](n, r)
  }

  function m(e, t, n) {
    e.__view__ && e.__view__.updateBindingValue(e, t, n)
  }

  function _(e, t, n, r, o, i) {
    var a = n.split(":"),
      s = a[0];
    if ("get" == s) a[0] = t, e.prototype[t].get = q.applyPseudos(a.join(":"), r[n], e.pseudos);
    else if ("set" == s) {
      a[0] = t;
      var c = e.prototype[t].set = q.applyPseudos(a.join(":"), o ? function(e) {
        this.xtag._skipSet = !0, this.xtag._skipAttr || v(this, o, i, e), this.xtag._skipAttr && o.skip && delete this.xtag._skipAttr, r[n].call(this, o.boolean ? !! e : e), m(this, i, e), delete this.xtag._skipSet
      } : r[n] ? function(e) {
        r[n].call(this, e), m(this, i, e)
      } : null, e.pseudos);
      o && (o.setter = c)
    } else e.prototype[t][n] = r[n]
  }

  function g(e, t) {
    e.prototype[t] = {};
    var n = e.accessors[t],
      r = n.attribute,
      o = r && r.name ? r.name.toLowerCase() : t;
    r && (r.key = t, e.attributes[o] = r);
    for (var i in n) _(e, t, i, n, r, o);
    if (r) {
      if (!e.prototype[t].get) {
        var a = (r.boolean ? "has" : "get") + "Attribute";
        e.prototype[t].get = function() {
          return this[a](o)
        }
      }
      e.prototype[t].set || (e.prototype[t].set = function(e) {
        v(this, r, o, e), m(this, o, e)
      })
    }
  }

  function b(e, t, n) {
    e.__tap__ || (e.__tap__ = {
      click: "mousedown" == n.type
    }, e.__tap__.click ? e.addEventListener("click", t.observer) : (e.__tap__.scroll = t.observer.bind(e), window.addEventListener("scroll", e.__tap__.scroll, !0), e.addEventListener("touchmove", t.observer), e.addEventListener("touchcancel", t.observer), e.addEventListener("touchend", t.observer))), e.__tap__.click || (e.__tap__.x = n.touches[0].pageX, e.__tap__.y = n.touches[0].pageY)
  }

  function y(e, t) {
    e.__tap__ && (e.__tap__.click ? e.removeEventListener("click", t.observer) : (window.removeEventListener("scroll", e.__tap__.scroll, !0), e.removeEventListener("touchmove", t.observer), e.removeEventListener("touchcancel", t.observer), e.removeEventListener("touchend", t.observer)), delete e.__tap__)
  }

  function w(e, t, n) {
    var r = n.changedTouches[0];
    return r.pageX < e.__tap__.x + t.gesture.tolerance && r.pageX > e.__tap__.x - t.gesture.tolerance && r.pageY < e.__tap__.y + t.gesture.tolerance && r.pageY > e.__tap__.y - t.gesture.tolerance ? !0 : void 0
  }
  var E = window,
    L = document,
    O = function() {}, N = function() {
      return !0
    }, k = /([\w-]+(?:\([^\)]+\))?)/g,
    A = /(\w*)(?:\(([^\)]*)\))?/,
    M = /(\d+)/g,
    T = {
      action: function(e, t) {
        return e.value.match(M).indexOf(t.keyCode + "") > -1 == ("keypass" == e.name) || null
      }
    }, C = function() {
      var e = E.getComputedStyle(L.documentElement, ""),
        t = (Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/) || "" === e.OLink && ["", "o"])[1];
      return {
        dom: "ms" == t ? "MS" : t,
        lowercase: t,
        css: "-" + t + "-",
        js: "ms" == t ? t : t[0].toUpperCase() + t.substr(1)
      }
    }(),
    D = Element.prototype.matchesSelector || Element.prototype[C.lowercase + "MatchesSelector"],
    x = E.MutationObserver || E[C.js + "MutationObserver"],
    S = {}, P = S.toString,
    R = /\s([a-zA-Z]+)/;
  t.object = function(e) {
    var n = {};
    for (var r in e) n[r] = t(e[r]);
    return n
  }, t.array = function(e) {
    for (var n = e.length, r = Array(n); n--;) r[n] = t(e[n]);
    return r
  };
  var U = ["undefined", "null", "number", "boolean", "string", "function"],
    I = "",
    j = {};
  for (var H in document.createEvent("CustomEvent")) j[H] = 1;
  var q = {
    tags: {},
    defaultOptions: {
      pseudos: [],
      mixins: [],
      events: {},
      methods: {},
      accessors: {},
      lifecycle: {},
      attributes: {},
      prototype: {
        xtag: {
          get: function() {
            return this.__xtag__ ? this.__xtag__ : this.__xtag__ = {
              data: {}
            }
          }
        }
      }
    },
    register: function(e, t) {
      var r;
      if ("string" == typeof e) {
        r = e.toLowerCase();
        var o = t.prototype;
        delete t.prototype;
        var i = q.tags[r] = s(q.merge({}, q.defaultOptions, t));
        for (var a in i.events) i.events[a] = q.parseEvent(a, i.events[a]);
        for (a in i.lifecycle) i.lifecycle[a.split(":")[0]] = q.applyPseudos(a, i.lifecycle[a], i.pseudos);
        for (a in i.methods) i.prototype[a.split(":")[0]] = {
          value: q.applyPseudos(a, i.methods[a], i.pseudos),
          enumerable: !0
        };
        for (a in i.accessors) g(i, a);
        var c = i.lifecycle.created || i.lifecycle.ready;
        i.prototype.createdCallback = {
          enumerable: !0,
          value: function() {
            var e = this;
            q.addEvents(this, i.events), i.mixins.forEach(function(t) {
              q.mixins[t].events && q.addEvents(e, q.mixins[t].events)
            });
            var t = c ? c.apply(this, n(arguments)) : null;
            for (var r in i.attributes) {
              var o = i.attributes[r],
                a = this.hasAttribute(r);
              (a || o.boolean) && (this[o.key] = o.boolean ? a : this.getAttribute(r))
            }
            return i.pseudos.forEach(function(t) {
              t.onAdd.call(e, t)
            }), t
          }
        }, i.lifecycle.inserted && (i.prototype.enteredViewCallback = {
          value: i.lifecycle.inserted,
          enumerable: !0
        }), i.lifecycle.removed && (i.prototype.leftDocumentCallback = {
          value: i.lifecycle.removed,
          enumerable: !0
        }), i.lifecycle.attributeChanged && (i.prototype.attributeChangedCallback = {
          value: i.lifecycle.attributeChanged,
          enumerable: !0
        });
        var u = i.prototype.setAttribute || HTMLElement.prototype.setAttribute;
        i.prototype.setAttribute = {
          writable: !0,
          enumberable: !0,
          value: function(e, t) {
            var n = i.attributes[e.toLowerCase()];
            this.xtag._skipAttr || u.call(this, e, n && n.boolean ? "" : t), n && (n.setter && !this.xtag._skipSet && (this.xtag._skipAttr = !0, n.setter.call(this, n.boolean ? !0 : t)), t = n.skip ? n.boolean ? this.hasAttribute(e) : this.getAttribute(e) : t, h(this, n, e, n.boolean ? "" : t, "setAttribute")), delete this.xtag._skipAttr
          }
        };
        var l = i.prototype.removeAttribute || HTMLElement.prototype.removeAttribute;
        i.prototype.removeAttribute = {
          writable: !0,
          enumberable: !0,
          value: function(e) {
            var t = i.attributes[e.toLowerCase()];
            this.xtag._skipAttr || l.call(this, e), t && (t.setter && !this.xtag._skipSet && (this.xtag._skipAttr = !0, t.setter.call(this, t.boolean ? !1 : void 0)), h(this, t, e, void 0, "removeAttribute")), delete this.xtag._skipAttr
          }
        };
        var d = o ? o : t["extends"] ? Object.create(L.createElement(t["extends"]).constructor).prototype : E.HTMLElement.prototype;
        return L.register(r, {
          "extends": t["extends"],
          prototype: Object.create(d, i.prototype)
        })
      }
    },
    mixins: {},
    prefix: C,
    touches: {
      active: [],
      changed: []
    },
    captureEvents: ["focus", "blur", "scroll", "underflow", "overflow", "overflowchanged"],
    customEvents: {
      overflow: l("over"),
      underflow: l("under"),
      animationstart: {
        attach: [C.dom + "AnimationStart"]
      },
      animationend: {
        attach: [C.dom + "AnimationEnd"]
      },
      transitionend: {
        attach: [C.dom + "TransitionEnd"]
      },
      move: {
        attach: ["mousemove", "touchmove"],
        condition: u
      },
      enter: {
        attach: ["mouseover", "touchenter"],
        condition: u
      },
      leave: {
        attach: ["mouseout", "touchleave"],
        condition: u
      },
      tapstart: {
        observe: {
          mousedown: L,
          touchstart: L
        },
        condition: u
      },
      tapend: {
        observe: {
          mouseup: L,
          touchend: L
        },
        condition: u
      },
      tapmove: {
        attach: ["tapstart", "dragend", "touchcancel"],
        condition: function(e, t) {
          switch (e.type) {
            case "move":
              return !0;
            case "dragover":
              var n = t.lastDrag || {};
              return t.lastDrag = e, n.pageX != e.pageX && n.pageY != e.pageY || null;
            case "tapstart":
              t.touches = t.touches || 1, t.move || (t.current = this, t.move = q.addEvents(this, {
                move: t.listener,
                dragover: t.listener
              }), t.tapend = q.addEvent(L, "tapend", t.listener));
              break;
            case "tapend":
            case "dragend":
            case "touchcancel":
              t.touches--, t.touches || (q.removeEvents(t.current, t.move || {}), q.removeEvent(L, t.tapend || {}), delete t.lastDrag, delete t.current, delete t.tapend, delete t.move)
          }
        }
      }
    },
    pseudos: {
      keypass: T,
      keyfail: T,
      delegate: {
        action: c
      },
      within: {
        action: c,
        onAdd: function(e) {
          var t = e.source.condition;
          t && (e.source.condition = function(n, r) {
            return q.query(this, e.value).filter(function(e) {
              return e == n.target || e.contains ? e.contains(n.target) : null
            })[0] ? t.call(this, n, r) : null
          })
        }
      },
      preventable: {
        action: function(e, t) {
          return !t.defaultPrevented
        }
      }
    },
    clone: t,
    typeOf: e,
    toArray: n,
    wrap: function(e, t) {
      return function() {
        var r = n(arguments),
          o = e.apply(this, r);
        return o === !1 ? !1 : t.apply(this, o !== void 0 ? n(o) : r)
      }
    },
    merge: function(t, n, r) {
      if ("string" == e(n)) return i(t, n, r);
      for (var o = 1, a = arguments.length; a > o; o++) {
        var s = arguments[o];
        for (var c in s) i(t, c, s[c])
      }
      return t
    },
    uid: function() {
      return Math.random().toString(36).substr(2, 10)
    },
    query: r,
    skipTransition: function(e, t, n) {
      var r = C.js + "TransitionProperty";
      e.style[r] = e.style.transitionProperty = "none", q.requestFrame(function() {
        var o;
        t && (o = t.call(n)), q.requestFrame(function() {
          e.style[r] = e.style.transitionProperty = "", o && q.requestFrame(o)
        })
      })
    },
    requestFrame: function() {
      var e = E.requestAnimationFrame || E[C.lowercase + "RequestAnimationFrame"] || function(e) {
          return E.setTimeout(e, 20)
        };
      return function(t) {
        return e.call(E, t)
      }
    }(),
    matchSelector: function(e, t) {
      return D.call(e, t)
    },
    set: function(e, t, n) {
      e[t] = n, window.CustomElements && CustomElements.upgradeAll(e)
    },
    innerHTML: function(e, t) {
      q.set(e, "innerHTML", t)
    },
    hasClass: function(e, t) {
      return e.className.split(" ").indexOf(t.trim()) > -1
    },
    addClass: function(e, t) {
      var n = e.className.trim().split(" ");
      return t.trim().split(" ").forEach(function(e) {~
        n.indexOf(e) || n.push(e)
      }), e.className = n.join(" ").trim(), e
    },
    removeClass: function(e, t) {
      var n = t.trim().split(" ");
      return e.className = e.className.trim().split(" ").filter(function(e) {
        return e && !~n.indexOf(e)
      }).join(" "), e
    },
    toggleClass: function(e, t) {
      return q[q.hasClass(e, t) ? "removeClass" : "addClass"].call(null, e, t)
    },
    queryChildren: function(e, t) {
      var r = e.id,
        o = e.id = r || "x_" + q.uid(),
        i = "#" + o + " > ";
      t = i + (t + "").replace(",", "," + i, "g");
      var a = e.parentNode.querySelectorAll(t);
      return r || e.removeAttribute("id"), n(a)
    },
    createFragment: function(e) {
      var t = L.createDocumentFragment();
      if (e) {
        for (var r = t.appendChild(L.createElement("div")), o = n(e.nodeName ? arguments : !(r.innerHTML = e) || r.children), i = o.length, a = 0; i > a;) t.insertBefore(o[a++], r);
        t.removeChild(r)
      }
      return t
    },
    manipulate: function(e, t) {
      var n = e.nextSibling,
        r = e.parentNode,
        o = L.createDocumentFragment(),
        i = t.call(o.appendChild(e), o) || e;
      n ? r.insertBefore(i, n) : r.appendChild(i)
    },
    applyPseudos: function(e, t, r, o) {
      var i = t,
        a = {};
      if (e.match(":"))
        for (var s = e.match(k), c = s.length; --c;) s[c].replace(A, function(t, u, l) {
          if (!q.pseudos[u]) throw "pseudo not found: " + u + " " + s;
          var d = a[c] = Object.create(q.pseudos[u]);
          d.key = e, d.name = u, d.value = l, d.arguments = (l || "").split(","), d.action = d.action || N, d.source = o;
          var f = i;
          i = function() {
            var t = n(arguments),
              r = {
                key: e,
                name: u,
                value: l,
                source: o,
                listener: f
              }, i = d.action.apply(this, [r].concat(t));
            return null === i || i === !1 ? i : r.listener.apply(this, t)
          }, r && d.onAdd && (r.getAttribute ? d.onAdd.call(r, d) : r.push(d))
        });
      for (var u in a) a[u].onCompiled && (i = a[u].onCompiled(i, a[u]) || i);
      return i
    },
    removePseudos: function(e, t) {
      t._pseudos.forEach(function(t) {
        t.onRemove && t.onRemove.call(e, t)
      })
    },
    parseEvent: function(e, t) {
      var r = e.split(":"),
        o = r.shift(),
        i = q.customEvents[o],
        a = q.merge({
          type: o,
          stack: O,
          condition: N,
          attach: [],
          _attach: [],
          pseudos: "",
          _pseudos: [],
          onAdd: O,
          onRemove: O
        }, i || {});
      a.attach = n(a.base || a.attach), a.chain = o + (a.pseudos.length ? ":" + a.pseudos : "") + (r.length ? ":" + r.join(":") : "");
      var s = a.condition;
      a.condition = function(e) {
        return e.touches, e.targetTouches, s.apply(this, n(arguments))
      };
      var c = q.applyPseudos(a.chain, t, a._pseudos, a);
      if (a.stack = function(e) {
        e.touches, e.targetTouches;
        var t = e.detail || {};
        return t.__stack__ ? t.__stack__ == c ? (e.stopPropagation(), e.cancelBubble = !0, c.apply(this, n(arguments))) : void 0 : c.apply(this, n(arguments))
      }, a.listener = function(e) {
        var t = n(arguments),
          r = a.condition.apply(this, t.concat([a]));
        return r ? e.type == o ? a.stack.apply(this, t) : (q.fireEvent(e.target, o, {
          baseEvent: e,
          detail: {
            __stack__: c
          }
        }), void 0) : r
      }, a.attach.forEach(function(e) {
        a._attach.push(q.parseEvent(e, a.listener))
      }), i && i.observe && !i.__observing__) {
        i.observer = function(e) {
          var t = a.condition.apply(this, n(arguments).concat([i]));
          return t ? (q.fireEvent(e.target, o, {
            baseEvent: e
          }), void 0) : t
        };
        for (var u in i.observe) q.addEvent(i.observe[u] || document, u, i.observer, !0);
        i.__observing__ = !0
      }
      return a
    },
    addEvent: function(e, t, n, r) {
      var o = "function" == typeof n ? q.parseEvent(t, n) : n;
      return o._pseudos.forEach(function(t) {
        t.onAdd.call(e, t)
      }), o._attach.forEach(function(t) {
        q.addEvent(e, t.type, t)
      }), o.onAdd.call(e, o, o.listener), e.addEventListener(o.type, o.stack, r || q.captureEvents.indexOf(o.type) > -1), o
    },
    addEvents: function(e, t) {
      var n = {};
      for (var r in t) n[r] = q.addEvent(e, r, t[r]);
      return n
    },
    removeEvent: function(e, t, n) {
      n = n || t, n.onRemove.call(e, n, n.listener), q.removePseudos(e, n), n._attach.forEach(function(t) {
        q.removeEvent(e, t)
      }), e.removeEventListener(n.type, n.stack)
    },
    removeEvents: function(e, t) {
      for (var n in t) q.removeEvent(e, t[n])
    },
    fireEvent: function(e, t, n, r) {
      var o = L.createEvent("CustomEvent");
      n = n || {}, r && console.warn("fireEvent has been modified, more info here: "), o.initCustomEvent(t, n.bubbles !== !1, n.cancelable !== !1, n.detail), n.baseEvent && f(o, n.baseEvent);
      try {
        e.dispatchEvent(o)
      } catch (i) {
        console.warn("This error may have been caused by a change in the fireEvent method, more info here: ", i)
      }
    },
    addObserver: function(e, t, n) {
      e._records || (e._records = {
        inserted: [],
        removed: []
      }, x ? (e._observer = new x(function(t) {
        o(e, t)
      }), e._observer.observe(e, {
        subtree: !0,
        childList: !0,
        attributes: !! 0,
        characterData: !1
      })) : ["Inserted", "Removed"].forEach(function(t) {
        e.addEventListener("DOMNode" + t, function(n) {
          n._mutation = !0, e._records[t.toLowerCase()].forEach(function(e) {
            e(n.target, n)
          })
        }, !1)
      })), -1 == e._records[t].indexOf(n) && e._records[t].push(n)
    },
    removeObserver: function(e, t, n) {
      var r = e._records;
      r && n ? r[t].splice(r[t].indexOf(n), 1) : r[t] = []
    }
  }, F = 0,
    V = null;
  L.addEventListener("mousedown", function(e) {
    F++, V = e.target
  }, !0), L.addEventListener("mouseup", function() {
    F--, V = null
  }, !1);
  var Y = {
    touches: {
      configurable: !0,
      get: function() {
        return this.__touches__ || (this.identifier = 0) || (this.__touches__ = F ? [this] : [])
      }
    },
    targetTouches: {
      configurable: !0,
      get: function() {
        return this.__targetTouches__ || (this.__targetTouches__ = F && this.currentTarget && (this.currentTarget == V || this.currentTarget.contains && this.currentTarget.contains(V)) ? [this] : [])
      }
    },
    changedTouches: {
      configurable: !0,
      get: function() {
        return this.touches
      }
    }
  };
  for (H in Y) UIEvent.prototype[H] = Y[H], Object.defineProperty(UIEvent.prototype, H, Y[H]);
  var X = {
    value: null,
    writable: !0,
    configurable: !0
  }, B = {
      touches: X,
      targetTouches: X,
      changedTouches: X
    };
  if (E.TouchEvent)
    for (H in B) E.TouchEvent.prototype[H] = B[H];
  q.customEvents.tap = {
    observe: {
      mousedown: document,
      touchstart: document
    },
    gesture: {
      tolerance: 8
    },
    condition: function(e, t) {
      var n = e.target;
      switch (e.type) {
        case "touchstart":
          return n.__tap__ && n.__tap__.click && y(n, t), b(n, t, e), void 0;
        case "mousedown":
          return n.__tap__ || b(n, t, e), void 0;
        case "scroll":
        case "touchcancel":
          return y(this, t), void 0;
        case "touchmove":
        case "touchend":
          return this.__tap__ && !w(this, t, e) ? (y(this, t), void 0) : "touchend" == e.type || null;
        case "click":
          return y(this, t), !0
      }
    }
  }, E.xtag = q, "function" == typeof define && define.amd && define(q), L.addEventListener("WebComponentsReady", function() {
    q.fireEvent(L.body, "DOMComponentsLoaded")
  })
}();
! function() {
  function a(a, b) {
    this._historyStack = [], this.currIndex = -1, this._itemCap = void 0, this.itemCap = b, this._validatorFn = a ? a : function() {
      return !0
    }
  }

  function b(a) {
    var b = window.getComputedStyle(a),
      c = xtag.prefix.js + "TransitionDuration";
    return b.transitionDuration ? b.transitionDuration : b[c]
  }

  function c(a) {
    if ("string" != typeof a) return 0;
    var b = /^(\d*\.?\d+)(m?s)$/,
      c = a.toLowerCase().match(b);
    if (c) {
      var d = c[1],
        e = c[2],
        f = parseFloat(d);
      if (isNaN(f)) throw "value error";
      if ("s" === e) return 1e3 * f;
      if ("ms" === e) return f;
      throw "unit error"
    }
    return 0
  }

  function d(a, b) {
    return (a % b + b) % b
  }

  function e(a) {
    return xtag.queryChildren(a, "x-card")
  }

  function f(a, b) {
    var c = e(a);
    return isNaN(parseInt(b, 10)) || 0 > b || b >= c.length ? null : c[b]
  }

  function g(a, b) {
    var c = e(a);
    return c.indexOf(b)
  }

  function h(a, d, f, h, i) {
    a.xtag._selectedCard = f;
    var j = new Date;
    a.xtag._lastAnimTimestamp = j;
    var m = function() {
      j === a.xtag._lastAnimTimestamp && (k(a), xtag.fireEvent(a, "shuffleend", {
        detail: {
          oldCard: d,
          newCard: f
        }
      }))
    };
    if (f === d) return m(), void 0;
    var n = !1,
      o = !1,
      p = !1,
      q = function() {
        n && o && (e(a).forEach(function(a) {
          a.removeAttribute("selected"), a.removeAttribute("leaving")
        }), d.setAttribute("leaving", !0), f.setAttribute("selected", !0), a.xtag._selectedCard = f, a.selectedIndex = g(a, f), i && (d.setAttribute("reverse", !0), f.setAttribute("reverse", !0)), xtag.fireEvent(a, "shufflestart", {
          detail: {
            oldCard: d,
            newCard: f
          }
        }))
      }, r = function() {
        p || n && o && s()
      }, s = function() {
        p = !0;
        var a = !1,
          e = !1,
          g = !1,
          i = function(b) {
            g || (b.target === d ? (a = !0, d.removeEventListener("transitionend", i)) : b.target === f && (e = !0, f.removeEventListener("transitionend", i)), a && e && (g = !0, m()))
          };
        d.addEventListener("transitionend", i), f.addEventListener("transitionend", i);
        var j = c(b(d)),
          k = c(b(f)),
          n = Math.max(j, k),
          o = 1.15,
          q = "none" === h.toLowerCase() ? 0 : Math.ceil(n * o);
        0 === q ? (g = !0, d.removeEventListener("transitionend", i), f.removeEventListener("transitionend", i), d.removeAttribute(l), f.removeAttribute(l), m()) : (d.removeAttribute(l), f.removeAttribute(l), window.setTimeout(function() {
          g || (g = !0, d.removeEventListener("transitionend", i), f.removeEventListener("transitionend", i), m())
        }, q))
      };
    xtag.skipTransition(d, function() {
      return d.setAttribute("card-anim-type", h), d.setAttribute(l, !0), n = !0, q(), r
    }, this), xtag.skipTransition(f, function() {
      return f.setAttribute("card-anim-type", h), f.setAttribute(l, !0), o = !0, q(), r
    }, this)
  }

  function i(a, b, c, d, f) {
    var g = a.xtag._selectedCard;
    if (g === b) {
      var i = {
        detail: {
          oldCard: g,
          newCard: b
        }
      };
      return xtag.fireEvent(a, "shufflestart", i), xtag.fireEvent(a, "shuffleend", i), void 0
    }
    k(a), void 0 === c && (console.log("defaulting to none transition"), c = "none");
    var j;
    switch (d) {
      case "forward":
        j = !1;
        break;
      case "reverse":
        j = !0;
        break;
      default:
        g || (j = !1);
        var l = e(a);
        j = l.indexOf(b) < l.indexOf(g) ? !0 : !1
    }
    b.hasAttribute("transition-override") && (c = b.getAttribute("transition-override")), f || a.xtag.history.pushState(b), h(a, g, b, c, j)
  }

  function j(a, b, c, d) {
    var e = f(a, b);
    if (!e) throw "no card at index " + b;
    i(a, e, c, d)
  }

  function k(a) {
    if (a.xtag._initialized) {
      var b = e(a),
        c = a.xtag._selectedCard;
      c && c.parentNode === a || (c = b.length > 0 ? a.xtag.history && a.xtag.history.numStates > 0 ? a.xtag.history.currState : b[0] : null), b.forEach(function(a) {
        a.removeAttribute("leaving"), a.removeAttribute(l), a.removeAttribute("card-anim-type"), a.removeAttribute("reverse"), a !== c ? a.removeAttribute("selected") : a.setAttribute("selected", !0)
      }), a.xtag._selectedCard = c, a.selectedIndex = g(a, c)
    }
  }
  var l = "_before-animation",
    m = a.prototype;
  m.pushState = function(a) {
    if (this.canRedo && this._historyStack.splice(this.currIndex + 1, this._historyStack.length - (this.currIndex + 1)), this._historyStack.push(a), this.currIndex = this._historyStack.length - 1, this.sanitizeStack(), "none" !== this._itemCap && this._historyStack.length > this._itemCap) {
      var b = this._historyStack.length;
      this._historyStack.splice(0, b - this._itemCap), this.currIndex = this._historyStack.length - 1
    }
  }, m.sanitizeStack = function() {
    for (var a, b = this._validatorFn, c = 0; c < this._historyStack.length;) {
      var d = this._historyStack[c];
      d !== a && b(d) ? (a = d, c++) : (this._historyStack.splice(c, 1), c <= this.currIndex && this.currIndex--)
    }
  }, m.forwards = function() {
    this.canRedo && this.currIndex++, this.sanitizeStack()
  }, m.backwards = function() {
    this.canUndo && this.currIndex--, this.sanitizeStack()
  }, Object.defineProperties(m, {
    DEFAULT_CAP: {
      value: 10
    },
    itemCap: {
      get: function() {
        return this._itemCap
      },
      set: function(a) {
        if (void 0 === a) this._itemCap = this.DEFAULT_CAP;
        else if ("none" === a) this._itemCap = "none";
        else {
          var b = parseInt(a, 10);
          if (isNaN(a) || 0 >= a) throw "attempted to set invalid item cap: " + a;
          this._itemCap = b
        }
      }
    },
    canUndo: {
      get: function() {
        return this.currIndex > 0
      }
    },
    canRedo: {
      get: function() {
        return this.currIndex < this._historyStack.length - 1
      }
    },
    numStates: {
      get: function() {
        return this._historyStack.length
      }
    },
    currState: {
      get: function() {
        var a = this.currIndex;
        return a >= 0 && a < this._historyStack.length ? this._historyStack[a] : null
      }
    }
  }), xtag.register("x-deck", {
    lifecycle: {
      created: function() {
        var b = this;
        b.xtag._initialized = !0;
        var c = function(a) {
          return a.parentNode === b
        };
        b.xtag.history = new a(c, a.DEFAULT_CAP), b.xtag._selectedCard = b.xtag._selectedCard ? b.xtag._selectedCard : null, b.xtag._lastAnimTimestamp = null, b.xtag.transitionType = "scrollLeft";
        var d = b.getCardAt(b.getAttribute("selected-index"));
        d && (b.xtag._selectedCard = d), k(b);
        var e = b.xtag._selectedCard;
        e && b.xtag.history.pushState(e)
      }
    },
    events: {
      "show:delegate(x-card)": function() {
        var a = this;
        a.show()
      }
    },
    accessors: {
      transitionType: {
        attribute: {
          name: "transition-type"
        },
        get: function() {
          return this.xtag.transitionType
        },
        set: function(a) {
          this.xtag.transitionType = a
        }
      },
      selectedIndex: {
        attribute: {
          skip: !0,
          name: "selected-index"
        },
        get: function() {
          return g(this, this.xtag._selectedCard)
        },
        set: function(a) {
          this.selectedIndex !== a && j(this, a, "none"), this.setAttribute("selected-index", a)
        }
      },
      historyCap: {
        attribute: {
          name: "history-cap"
        },
        get: function() {
          return this.xtag.history.itemCap
        },
        set: function(a) {
          this.xtag.history.itemCap = a
        }
      },
      numCards: {
        get: function() {
          return this.getAllCards().length
        }
      },
      currHistorySize: {
        get: function() {
          return this.xtag.history.numStates
        }
      },
      currHistoryIndex: {
        get: function() {
          return this.xtag.history.currIndex
        }
      },
      cards: {
        get: function() {
          return this.getAllCards()
        }
      },
      selectedCard: {
        get: function() {
          return this.getSelectedCard()
        }
      }
    },
    methods: {
      shuffleTo: function(a, b) {
        var c = f(this, a);
        if (!c) throw "invalid shuffleTo index " + a;
        var d = this.xtag.transitionType;
        j(this, a, d, b)
      },
      shuffleNext: function(a) {
        a = a ? a : "auto";
        var b = e(this),
          c = this.xtag._selectedCard,
          f = b.indexOf(c);
        f > -1 && this.shuffleTo(d(f + 1, b.length), a)
      },
      shufflePrev: function(a) {
        a = a ? a : "auto";
        var b = e(this),
          c = this.xtag._selectedCard,
          f = b.indexOf(c);
        f > -1 && this.shuffleTo(d(f - 1, b.length), a)
      },
      getAllCards: function() {
        return e(this)
      },
      getSelectedCard: function() {
        return this.xtag._selectedCard
      },
      getCardIndex: function(a) {
        return g(this, a)
      },
      getCardAt: function(a) {
        return f(this, a)
      },
      historyBack: function(a) {
        var b = this.xtag.history;
        if (b.canUndo) {
          b.backwards();
          var c = b.currState;
          c && i(this, c, this.transitionType, a, !0)
        }
      },
      historyForward: function(a) {
        var b = this.xtag.history;
        if (b.canRedo) {
          b.forwards();
          var c = b.currState;
          c && i(this, c, this.transitionType, a, !0)
        }
      }
    }
  }), xtag.register("x-card", {
    lifecycle: {
      inserted: function() {
        var a = this,
          b = a.parentNode;
        b && "x-deck" === b.tagName.toLowerCase() && (k(b), a.xtag.parentDeck = b, xtag.fireEvent(b, "cardadd", {
          detail: {
            card: a
          }
        }))
      },
      created: function() {
        var a = this.parentNode;
        a && "x-deck" === a.tagName.toLowerCase() && (this.xtag.parentDeck = a)
      },
      removed: function() {
        var a = this;
        if (a.xtag.parentDeck) {
          var b = a.xtag.parentDeck;
          b.xtag.history.sanitizeStack(), k(b), xtag.fireEvent(b, "cardremove", {
            detail: {
              card: a
            }
          })
        }
      }
    },
    accessors: {
      transitionOverride: {
        attribute: {
          name: "transition-override"
        }
      }
    },
    methods: {
      show: function() {
        var a = this.parentNode;
        a === this.xtag.parentDeck && a.shuffleTo(a.getCardIndex(this))
      }
    }
  })
}();
! function() {
  xtag.register("x-flipbox", {
    lifecycle: {
      created: function() {
        this.firstElementChild && xtag.skipTransition(this.firstElementChild, function() {}), this.lastElementChild && xtag.skipTransition(this.lastElementChild, function() {}), this.hasAttribute("direction") || (this.xtag._direction = "right")
      }
    },
    events: {
      "transitionend:delegate(*:first-child)": function(a) {
        var b = a.target,
          c = b.parentNode;
        "x-flipbox" === c.nodeName.toLowerCase() && xtag.fireEvent(c, "flipend")
      },
      "show:delegate(*:first-child)": function(a) {
        var b = a.target,
          c = b.parentNode;
        "x-flipbox" === c.nodeName.toLowerCase() && (c.flipped = !1)
      },
      "show:delegate(*:last-child)": function(a) {
        var b = a.target,
          c = b.parentNode;
        "x-flipbox" === c.nodeName.toLowerCase() && (c.flipped = !0)
      }
    },
    accessors: {
      direction: {
        attribute: {},
        get: function() {
          return this.xtag._direction
        },
        set: function(a) {
          xtag.skipTransition(this.firstElementChild, function() {
            this.setAttribute("_anim-direction", a)
          }, this), xtag.skipTransition(this.lastElementChild, function() {
            this.setAttribute("_anim-direction", a)
          }, this), this.xtag._direction = a
        }
      },
      flipped: {
        attribute: {
          "boolean": !0
        }
      }
    },
    methods: {
      toggle: function() {
        this.flipped = !this.flipped
      },
      showFront: function() {
        this.flipped = !1
      },
      showBack: function() {
        this.flipped = !0
      }
    }
  })
}();
! function() {
  function a(a) {
    var b = a.firstElementChild;
    if (!b) return {
      header: null,
      section: null,
      footer: null
    };
    var c = b.nextElementSibling;
    return {
      header: "HEADER" == b.nodeName ? b : null,
      section: "SECTION" == b.nodeName ? b : c && "SECTION" == c.nodeName ? c : null,
      footer: "FOOTER" == a.lastElementChild.nodeName ? a.lastElementChild : null
    }
  }

  function b(a, b) {
    var c = b.__layoutScroll__ = b.__layoutScroll__ || Object.defineProperty(b, "__layoutScroll__", {
      value: {
        last: b.scrollTop
      }
    }).__layoutScroll__,
      d = b.scrollTop,
      e = a.scrollBuffer;
    return c.max = c.max || Math.max(d + e, e), c.min = c.min || Math.max(d - e, e), c
  }

  function c(a, b) {
    a.setAttribute("content-maximizing", null), b.section && (b.header && (b.section.style.marginTop = "-" + b.header.getBoundingClientRect().height + "px"), b.footer && (b.section.style.marginBottom = "-" + b.footer.getBoundingClientRect().height + "px"))
  }

  function d(a, b) {
    a.removeAttribute("content-maximized"), a.removeAttribute("content-maximizing"), b.section && (b.section.style.marginTop = "", b.section.style.marginBottom = "")
  }

  function e(e) {
    if (!e.currentTarget.hasAttribute("content-maximizing")) {
      var f = e.target,
        g = e.currentTarget;
      if (this.scrollhide && (f.parentNode == g || xtag.matchSelector(f, g.scrollTarget))) {
        var h = f.scrollTop,
          i = g.scrollBuffer,
          j = a(g),
          k = b(g, f);
        h > k.last ? k.min = Math.max(h - i, i) : h < k.last && (k.max = Math.max(h + i, i)), g.maxcontent || (h > k.max && !g.hasAttribute("content-maximized") ? c(g, j) : h < k.min && d(g, j)), k.last = h
      }
    }
  }
  xtag.register("x-layout", {
    lifecycle: {
      created: function() {}
    },
    events: {
      scroll: e,
      transitionend: function(b) {
        var c = a(this);
        !this.hasAttribute("content-maximizing") || b.target != c.header && b.target != c.section && b.target != c.footer || (this.setAttribute("content-maximized", null), this.removeAttribute("content-maximizing"))
      },
      "tap:delegate(section)": function(b) {
        var e = b.currentTarget;
        if (e.taphide && this.parentNode == e) {
          var f = a(e);
          e.hasAttribute("content-maximizing") || e.hasAttribute("content-maximized") ? e.maxcontent || d(e, f) : c(e, f)
        }
      },
      "mouseover:delegate(section)": function(b) {
        var d = b.currentTarget;
        !d.hoverhide || this.parentNode != d || d.hasAttribute("content-maximized") || d.hasAttribute("content-maximizing") || b.relatedTarget && !this.contains(b.target) || c(d, a(d))
      },
      "mouseout:delegate(section)": function(b) {
        var c = b.currentTarget;
        !c.hoverhide || this.parentNode != c || !c.hasAttribute("content-maximized") && !c.hasAttribute("content-maximizing") || c != b.relatedTarget && c.contains(b.relatedTarget) || d(c, a(c))
      }
    },
    accessors: {
      scrollTarget: {
        attribute: {
          name: "scroll-target"
        }
      },
      scrollBuffer: {
        attribute: {
          name: "scroll-buffer"
        },
        get: function() {
          return Number(this.getAttribute("scroll-buffer")) || 30
        }
      },
      taphide: {
        attribute: {
          "boolean": !0
        }
      },
      hoverhide: {
        attribute: {
          "boolean": !0
        }
      },
      scrollhide: {
        attribute: {
          "boolean": !0
        }
      },
      maxcontent: {
        attribute: {
          "boolean": !0
        },
        set: function(b) {
          var e = a(this);
          b ? c(this, e) : this.hasAttribute("content-maximizing") || d(this, e)
        }
      }
    }
  })
}();
! function() {
  function a() {
    var a = document.documentElement,
      b = {
        left: a.scrollLeft || document.body.scrollLeft || 0,
        top: a.scrollTop || document.body.scrollTop || 0,
        width: a.clientWidth,
        height: a.clientHeight
      };
    return b.right = b.left + b.width, b.bottom = b.top + b.height, b
  }

  function b(b) {
    var c = b.getBoundingClientRect(),
      d = a(),
      e = d.left,
      f = d.top;
    return {
      left: c.left + e,
      right: c.right + e,
      top: c.top + f,
      bottom: c.bottom + f,
      width: c.width,
      height: c.height
    }
  }

  function c(a, b, c) {
    return c.left <= a && a <= c.right && c.top <= b && b <= c.bottom
  }

  function d(a) {
    if ("x-tabbar" === a.parentNode.nodeName.toLowerCase()) {
      var b = a.targetEvent,
        c = a.targetSelector ? xtag.query(document, a.targetSelector) : a.targetElems;
      c.forEach(function(a) {
        xtag.fireEvent(a, b)
      })
    }
  }
  xtag.register("x-tabbar", {
    lifecycle: {
      created: function() {
        this.xtag.overallEventToFire = "show"
      }
    },
    events: {
      "tap:delegate(x-tabbar-tab)": function() {
        var a = xtag.query(this.parentNode, "x-tabbar-tab[selected]");
        a.length && a.forEach(function(a) {
          a.removeAttribute("selected")
        }), this.setAttribute("selected", !0)
      }
    },
    accessors: {
      tabs: {
        get: function() {
          return xtag.queryChildren(this, "x-tabbar-tab")
        }
      },
      targetEvent: {
        attribute: {
          name: "target-event"
        },
        get: function() {
          return this.xtag.overallEventToFire
        },
        set: function(a) {
          this.xtag.overallEventToFire = a
        }
      }
    },
    methods: {}
  }), xtag.register("x-tabbar-tab", {
    lifecycle: {
      created: function() {
        this.xtag.targetSelector = null, this.xtag.overrideTargetElems = null, this.xtag.targetEvent = null
      }
    },
    events: {
      tap: function(a) {
        var e = a.currentTarget;
        if (a.changedTouches && a.changedTouches.length > 0) {
          var f = a.changedTouches[0],
            g = b(e);
          c(f.pageX, f.pageY, g) && d(e)
        } else d(e)
      }
    },
    accessors: {
      targetSelector: {
        attribute: {
          name: "target-selector"
        },
        get: function() {
          return this.xtag.targetSelector
        },
        set: function(a) {
          this.xtag.targetSelector = a, a && (this.xtag.overrideTargetElems = null)
        }
      },
      targetElems: {
        get: function() {
          return this.targetSelector ? xtag.query(document, this.targetSelector) : null !== this.xtag.overrideTargetElems ? this.xtag.overrideTargetElems : []
        },
        set: function(a) {
          this.removeAttribute("target-selector"), this.xtag.overrideTargetElems = a
        }
      },
      targetEvent: {
        attribute: {
          name: "target-event"
        },
        get: function() {
          if (this.xtag.targetEvent) return this.xtag.targetEvent;
          if ("x-tabbar" === this.parentNode.nodeName.toLowerCase()) return this.parentNode.targetEvent;
          throw "tabbar-tab is missing event to fire"
        },
        set: function(a) {
          this.xtag.targetEvent = a
        }
      }
    },
    methods: {}
  })
}();