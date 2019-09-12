import { clearAllBodyScrollLocks, enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import dayjs from 'dayjs';

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) { return arr; }
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) { break; }
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) { _i["return"](); }
    } finally {
      if (_d) { throw _e; }
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

function isCssColor(color) {
  return Boolean(color) && Boolean(color.match(/^(#|(rgb|hsl)a?\()/));
}

var colorable = {
  props: {
    color: {
      type: String
    }
  },
  methods: {
    setBackgroundColor: function setBackgroundColor(color) {
      if (!isCssColor(color)) { return; }
      return {
        'background-color': "".concat(color),
        'border-color': "".concat(color)
      };
    },
    setTextColor: function setTextColor(color) {
      if (!isCssColor(color)) { return; }
      return {
        'color': "".concat(color)
      };
    }
  }
};

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
var script = {
  name: 'DatePickerCalendarIcon',
  props: {
    id: {
      type: String,
      default: String
    },
    color: {
      type: String,
      default: String
    }
  }
};

/* script */
            var __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{attrs:{"for":_vm.id}},[_c('svg',{attrs:{"aria-hidden":"true","focusable":"false","data-prefix":"fal","data-icon":"calendar-alt","role":"img","xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 448 512"}},[_c('path',{attrs:{"fill":_vm.color,"d":"M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"}})])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-5a5d4481_0", { source: "label[data-v-5a5d4481]{cursor:inherit}svg[data-v-5a5d4481]{display:flex;font-size:1em;height:1em;width:.875em;overflow:visible;vertical-align:-.125em;margin-bottom:2px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-5a5d4481";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerCalendarIcon.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerCalendarIcon = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); }
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) { descriptor.writable = true; }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
  if (staticProps) { _defineProperties(Constructor, staticProps); }
  return Constructor;
}

var createClass = _createClass;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var weekday = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t){t.prototype.weekday=function(e){var t=this.$locale().weekStart||0,n=this.$W,i=(n<t?n+7:n)-t;return this.$utils().u(e)?i:this.subtract(i,"day").add(e,"day")};}});
});

var weekOfYear = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){var e="year";return function(t,i,n){var r=i.prototype;r.week=function(t){if(void 0===t&&(t=null),null!==t){ return this.add(7*(t-this.week()),"day"); }var i=n(this).endOf(e);if(6!==i.day()&&11===this.month()&&31-this.date()<=i.day()){ return 1; }var r=n(this).startOf(e),d=r.subtract(r.day(),"day").subtract(1,"millisecond"),u=this.diff(d,"week",!0);return Math.ceil(u)},r.weeks=function(e){return void 0===e&&(e=null),this.week(e)};}});
});

var quarterOfYear = createCommonjsModule(function (module, exports) {
!function(t,n){module.exports=n();}(commonjsGlobal,function(){var t="month",n="quarter";return function(r,i){var e=i.prototype;e.quarter=function(t){return this.$utils().u(t)?Math.ceil((this.month()+1)/3):this.month(this.month()%3+3*(t-1))};var u=e.add;e.add=function(r,i){return r=Number(r),this.$utils().p(i)===n?this.add(3*r,t):u.bind(this)(r,i)};var s=e.startOf;e.startOf=function(r,i){var e=this.$utils(),u=!!e.u(i)||i;if(e.p(r)===n){var a=this.quarter()-1;return u?this.month(3*a).startOf(t).startOf("day"):this.month(3*a+2).endOf(t).endOf("day")}return s.bind(this)(r,i)};}});
});

var advancedFormat = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t,r){var n=t.prototype,o=n.format;r.en.ordinal=function(e){var t=["th","st","nd","rd"],r=e%100;return "["+e+(t[(r-20)%10]||t[r]||t[0])+"]"},n.format=function(e){var t=this,r=this.$locale(),n=this.$utils(),i=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|gggg|Do|X|x|k{1,2}|S/g,function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"wo":return r.ordinal(t.week(),"W");case"k":case"kk":return n.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();default:return e}});return o.bind(this)(i)};}});
});

var isSameOrAfter = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)};}});
});

var isSameOrBefore = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e,t){t.prototype.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)};}});
});

var localeObject = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekStart: 0,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[".concat(n).concat(s[(v - 20) % 10] || s[v] || s[0], "]");
  }
};

var localeObject$1 = {
  name: 'fr',
  weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
  months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
  monthsShort: 'Janv_Févr_Mars_Avr_Mai_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split('_'),
  weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
};

var localeObject$2 = {
  name: 'es',
  monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
  },
  ordinal: function ordinal(n) {
    return "".concat(n, "\xBA");
  }
};

var localeObject$3 = {
  name: 'de',
  weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
  weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
  months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
  ordinal: function ordinal(n) {
    return "".concat(n, ".");
  },
  weekStart: 1,
  formats: {
    LTS: 'HH:mm:ss',
    LT: 'HH:mm',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd, D. MMMM YYYY HH:mm'
  }
};

var localeObject$4 = {
  name: 'he',
  weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
  weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
  weekdaysMin: 'א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳'.split('_'),
  months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
  monthsShort: 'ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  format: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  }
};



var locales = /*#__PURE__*/Object.freeze({
  fr: localeObject$1,
  en: localeObject,
  es: localeObject$2,
  de: localeObject$3,
  he: localeObject$4
});

var DEFAULT_LOCALE_PROPERTIES = ['name', 'weekdays', 'weekdaysShort', 'weekdaysMin', 'weekStart', 'months', 'monthsShort', 'ordinal', 'formats'];
var DEFAULT_INPUT_DATE_FORMAT = {
  date: 'DD MMMM YYYY',
  month: 'MMMM YYYY',
  quarter: 'YYYY-[Q]Q',
  range: 'DD MMMM YYYY'
};
var DEFAULT_OUTPUT_DATE_FORMAT = {
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  quarter: 'YYYY-Q',
  range: 'YYYY-MM-DD'
};
var DEFAULT_HEADER_DATE_FORMAT = {
  date: 'dddd DD MMMM',
  month: 'MMMM',
  quarter: '[Q]Q',
  range: 'DD MMMM YYYY'
};
var yearMonthSelectorTypes = ['month', 'quarter', 'year'];
var MAX_PRESETS_NUMBER = 6;

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

var PickerDate =
/*#__PURE__*/
function () {
  function PickerDate(month, year) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$lang = _ref.lang,
        lang = _ref$lang === void 0 ? getDefaultLocale() : _ref$lang;

    classCallCheck(this, PickerDate);

    var locale = getLocale(lang);
    dayjs.locale(locale);
    this.start = dayjs().year(year).month(month).startOf('month');
    this.end = this.start.endOf('month');
    this.month = month;
    this.year = year;
  }

  createClass(PickerDate, [{
    key: "getWeekStart",
    value: function getWeekStart() {
      return this.start.weekday();
    }
  }, {
    key: "getDays",
    value: function getDays() {
      return Array.from(generateDateRange(this.start, this.end));
    }
  }, {
    key: "getMonths",
    value: function getMonths() {
      return Array.apply(0, Array(12)).map(function (_, i) {
        return dayjs().month(i).format('MMM');
      });
    }
  }, {
    key: "getQuarters",
    value: function getQuarters() {
      return Array.apply(0, Array(4)).map(function (_, i) {
        var quarterMonthStart = dayjs().quarter(i + 1).startOf('quarter').format('MMMM');
        var quarterMonthEnd = dayjs().quarter(i + 1).endOf('quarter').format('MMMM');
        return "".concat(quarterMonthStart, " - ").concat(quarterMonthEnd);
      });
    }
  }, {
    key: "getMonthFormatted",
    value: function getMonthFormatted() {
      return this.start.format('MMMM');
    }
  }, {
    key: "getYearFormatted",
    value: function getYearFormatted() {
      return this.start.format('YYYY');
    }
  }, {
    key: "generateYearsRange",
    value: function generateYearsRange(currentYear, range) {
      var start = currentYear - range;
      var end = currentYear + range;
      return toConsumableArray(Array(end - start + 1).keys()).map(function (i) {
        return start + i;
      });
    }
  }]);

  return PickerDate;
}(); // -----------------------------------------

function isValidLocale() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var properties = Object.keys(lang);
  return properties.length > 0 && properties.every(function (property) {
    return DEFAULT_LOCALE_PROPERTIES.includes(property);
  });
}

function getLocale(lang) {
  return isValidLocale(lang) ? lang : locales[lang] || localeObject;
}

function getDefaultLocale() {
  return (window.navigator.userLanguage || window.navigator.language || 'en').substr(0, 2);
}
function setLocaleLang(_ref2) {
  var lang = _ref2.lang;
  var locale = getLocale(lang);
  dayjs.locale(locale);
}
function getWeekDays(_ref3) {
  var lang = _ref3.lang,
      weekDays = _ref3.weekDays;
  var locale = getLocale(lang);

  var weekDaysShort = toConsumableArray(locale.weekdaysShort); // If weekStart at 1, should move first index at the end


  if (locale.weekStart && locale.weekStart === 1) {
    weekDaysShort.push(weekDaysShort.shift());
  }

  return weekDays || weekDaysShort;
} // -----------------------------------------
// Format
// - getDefaultInputFormat : Return format string for input
// - getDefaultHeaderFormat : Return format string for header (in agenda)
// - getDefaultOutputFormat : Return format string when date selected
// - formatDateWithLocale : Return date formatted with lang
// - formatDate : Return date with lang
// - getRangeDatesFormatted : Return dates formatted for range
// -----------------------------------------

function getDefaultInputFormat() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'date';
  return DEFAULT_INPUT_DATE_FORMAT[type];
}
function getDefaultHeaderFormat() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'date';
  return DEFAULT_HEADER_DATE_FORMAT[type];
}
function getDefaultOutputFormat() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'date';
  return DEFAULT_OUTPUT_DATE_FORMAT[type];
}
function formatDateWithLocale(date, _ref4, format) {
  var lang = _ref4.lang;
  var locale = getLocale(lang);
  return dayjs(date).locale(locale).format(format);
}
function formatDate(date, _ref5) {
  var lang = _ref5.lang;
  var locale = getLocale(lang);
  return dayjs(date).locale(locale);
}
function formatDateWithYearAndMonth(year, month) {
  return dayjs().year(year).month(month).startOf('month');
}
function getRangeDatesFormatted() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      start = _ref6.start,
      end = _ref6.end;

  var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
      lang = _ref7.lang;

  var format = arguments.length > 2 ? arguments[2] : undefined;
  var locale = getLocale(lang);

  if (!start && !end) {
    return "".concat(format, " ~ ").concat(format);
  }

  if (!start && end) {
    return "".concat(format, " ~ ").concat(dayjs(end).locale(locale).startOf('day').format(format));
  }

  if (start && !end) {
    return "".concat(dayjs(start).locale(locale).startOf('day').format(format), " ~ ").concat(format);
  }

  return "".concat(dayjs(start).locale(locale).startOf('day').format(format), " ~ ").concat(dayjs(end).locale(locale).startOf('day').format(format));
}
function formatDateToSend(date, format, range) {
  if (range) {
    return {
      start: date.start.format(format),
      end: date.end && date.end.format(format)
    };
  }

  return date.format(format);
} // -----------------------------------------
// Compare Dates
// - isDateToday : Return Boolean if date is today
// - areSameDates : Return Boolean if dates are the same
// - isBeforeDate : Return Boolean if date is before minDate (from props)
// - isAfterDate : Return Boolean if date is after maxDate (from props)
// - isDateAfter : Return Boolean if date are after a specific date
// -----------------------------------------

function isDateToday(date) {
  return dayjs(date.format('YYYY-MM-DD')).isSame(dayjs().format('YYYY-MM-DD'));
}
function areSameDates(date, dateSelected) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'date';
  return dayjs(date, DEFAULT_OUTPUT_DATE_FORMAT[type]).isSame(dayjs(dateSelected, DEFAULT_OUTPUT_DATE_FORMAT[type]));
}
function isBeforeDate(date, beforeDate) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';

  if (type === 'year') {
    return Boolean(beforeDate) && date < dayjs(beforeDate, 'YYYY-MM-DD').get(type);
  }

  var selectedDate = dayjs.isDayjs(date) ? date : dayjs(date).startOf('day');
  return Boolean(beforeDate) && selectedDate.isBefore(dayjs(beforeDate).startOf('day'), type);
}
function isAfterDate(date, afterDate) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';

  if (type === 'year') {
    return Boolean(afterDate) && date > dayjs(afterDate, 'YYYY-MM-DD').get(type);
  }

  var selectedDate = dayjs.isDayjs(date) ? date : dayjs(date).startOf('day');
  return Boolean(afterDate) && selectedDate.isAfter(dayjs(afterDate).startOf('day'), type);
}
function isBetweenDates(date, startDate, maxDate) {
  return isAfterDate(date, startDate) && isBeforeDate(date, maxDate);
}
function isDateAfter(newDate, oldDate) {
  return dayjs(newDate).isAfter(dayjs(oldDate));
}
function generateDateRangeWithoutDisabled(_ref8, minDate, maxDate) {
  var start = _ref8.start,
      end = _ref8.end;
  return generateDateRange(start, end).filter(function (date) {
    return date.isSameOrAfter(minDate, 'day') && date.isSameOrBefore(dayjs(maxDate, 'day'));
  });
} // -----------------------------------------
// Generate Dates
// - generateDateRange : Return an array of dates
// - generateMonthAndYear : Return month & year for modes (date, month, quarter)
// - convertQuarterToMonth : Transform quarter to a month number
// -----------------------------------------

function initDate(date, _ref9) {
  var isRange = _ref9.isRange,
      locale = _ref9.locale,
      format = _ref9.format;

  if (isRange) {
    return {
      start: date && date.start && formatDate(date.start, locale),
      end: date && date.end && formatDate(date.end, locale)
    };
  }

  return date && dayjs(date, format);
}
function generateDateRange(startDate, maxDate) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
  var start = dayjs.isDayjs(startDate) ? startDate : dayjs(startDate);
  var end = dayjs.isDayjs(maxDate) ? maxDate : dayjs(maxDate);
  var diffBetweenDates = end.diff(start, interval);
  return toConsumableArray(Array(diffBetweenDates + 1).keys()).map(function (i) {
    return start.add(i, interval);
  });
}
function generateMonthAndYear(value, currentDate, mode) {
  if (mode === 'year') {
    return {
      year: value,
      month: currentDate.month
    };
  }

  if (mode === 'quarter') {
    return {
      year: currentDate.year,
      month: convertQuarterToMonth(value)
    };
  }

  return {
    year: currentDate.year,
    month: value
  };
}
function convertQuarterToMonth(month) {
  return month * 3;
}

var script$1 = {
  name: 'DatePickerCustomInput',
  mixins: [colorable],
  components: {
    DatePickerCalendarIcon: DatePickerCalendarIcon
  },
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    date: {
      type: [Object, Date, String]
    },
    format: {
      type: String
    },
    type: {
      type: String
    },
    range: {
      type: Boolean
    },
    rangeInputText: {
      type: String
    },
    locale: {
      type: Object
    },
    placeholder: {
      type: String
    },
    color: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    tabindex: {
      type: [String, Number]
    },
    noInput: {
      type: Boolean
    }
  },
  computed: {
    classes: function classes() {
      return {
        'datepicker-input--disabled': this.disabled,
        'datepicker-input--range': this.range
      };
    },
    isDateDefined: function isDateDefined() {
      var isDateDefined = !this.range && this.date;
      var isDateRangeDefined = this.range && this.date && this.date.start && this.date.end;
      return Boolean(isDateDefined) || Boolean(isDateRangeDefined);
    },
    // Displayed Date
    dateFormatted: function dateFormatted() {
      if (!this.isDateDefined) { return; }

      if (this.range && this.rangeInputText) {
        var _this$rangeInputText$ = this.rangeInputText.split('%d'),
            _this$rangeInputText$2 = slicedToArray(_this$rangeInputText$, 2),
            startText = _this$rangeInputText$2[0],
            endText = _this$rangeInputText$2[1];

        var _getRangeDatesFormatt = getRangeDatesFormatted(this.date, this.locale, this.format).split(' ~ '),
            _getRangeDatesFormatt2 = slicedToArray(_getRangeDatesFormatt, 2),
            startDate = _getRangeDatesFormatt2[0],
            maxDate = _getRangeDatesFormatt2[1];

        return "".concat(startText.trim(), " ").concat(startDate, " ").concat(endText.trim(), " ").concat(maxDate).trim();
      } // If type is quarter,
      // We need to convert this quarter date, to a monthly date
      // because dayjs will transform a monthly date to quarter date only
      // Exemple => '2019-2' => should be converted to date : 2019-06-01


      var currentMonth = this.date.month();
      var newMonth = this.type === 'quarter' ? convertQuarterToMonth(currentMonth) : currentMonth;
      return formatDateWithLocale(this.date.month(newMonth), this.locale, this.format);
    }
  }
};

/* script */
            var __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker-input",class:_vm.classes,on:{"mousedown":function($event){return _vm.$emit('toggleDatepicker')}}},[_c('DatePickerCalendarIcon',{attrs:{"id":_vm.id,"color":_vm.isDateDefined && !_vm.disabled ? _vm.color : 'rgba(93, 106, 137, 0.5)',"disabled":_vm.disabled}}),_vm._v(" "),(!_vm.noInput)?_c('input',{style:(_vm.setTextColor(!_vm.disabled ? _vm.color : 'rgba(93, 106, 137, 0.5)')),attrs:{"id":_vm.id,"name":_vm.name,"disabled":_vm.disabled,"placeholder":_vm.placeholder,"tabindex":_vm.tabindex,"type":"text","readonly":""},domProps:{"value":_vm.dateFormatted},on:{"focus":function($event){return _vm.$emit('focus')}}}):_c('button',{style:(_vm.setTextColor(!_vm.disabled && _vm.isDateDefined ? _vm.color : 'rgba(93, 106, 137, 0.5)')),attrs:{"type":"button","disabled":_vm.disabled}},[_vm._v("\n    "+_vm._s(_vm.isDateDefined ? _vm.dateFormatted : _vm.placeholder)+"\n  ")])],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-cf9438b0_0", { source: "button[data-v-cf9438b0]{border:none;margin:0;padding:0;width:auto;overflow:visible;background:0 0;color:inherit;font:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none}button[data-v-cf9438b0]:active,button[data-v-cf9438b0]:focus{outline:0;box-shadow:0}button[role=button][data-v-cf9438b0],button[type=button][data-v-cf9438b0],button[type=reset][data-v-cf9438b0],button[type=submit][data-v-cf9438b0]{cursor:pointer}.datepicker-input[data-v-cf9438b0]{position:relative;display:flex;flex-direction:row;justify-content:flex-start;align-items:center}.datepicker-input--disabled[data-v-cf9438b0]{cursor:not-allowed}input[type=hidden][data-v-cf9438b0]{position:absolute;bottom:0;left:50%;height:1px;width:1px;border:0;clip:rect(0 0 0 0);margin:-1px;padding:0;outline:0;-webkit-appearance:none;overflow:hidden}input[type=text][data-v-cf9438b0]{cursor:pointer;border:none;box-shadow:none;outline:0;font-size:16px;line-height:19px;margin-left:8px;font-family:inherit;background:0 0}input[type=text][data-v-cf9438b0]:active,input[type=text][data-v-cf9438b0]:focus{outline:0;box-shadow:none}input[type=text][data-v-cf9438b0]:disabled,input[type=text][disabled][data-v-cf9438b0]{cursor:not-allowed}input[type=text].placeholder[data-v-cf9438b0]{color:rgba(0,0,0,.4)}input[type=text][data-v-cf9438b0]::placeholder{color:rgba(0,0,0,.4)}input[type=text][data-v-cf9438b0]:-moz-placeholder{color:rgba(0,0,0,.4)}input[type=text][data-v-cf9438b0]::-moz-placeholder{color:rgba(0,0,0,.4)}input[type=text][data-v-cf9438b0]:-ms-input-placeholder{color:rgba(0,0,0,.4)}input[type=text][data-v-cf9438b0]::-webkit-input-placeholder{color:rgba(0,0,0,.4)}.datepicker-input--range input[type=text][data-v-cf9438b0]{min-width:310px}button[data-v-cf9438b0]{font-size:16px;line-height:19px;margin-left:8px}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-cf9438b0";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerCustomInput.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerCustomInput = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__$1);

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) { continue; }
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function generateRandomId() {
  return "_".concat(Math.random().toString(36).substr(2, 9));
}

function validateAttachTarget(value) {
  var type = _typeof_1(value);

  if (type === 'string') { return true; }
  return value.nodeType === Node.ELEMENT_NODE;
}

var detachable = {
  props: {
    attachTo: {
      validator: validateAttachTarget,
      default: 'body'
    }
  },
  data: function data() {
    return {
      hasDetached: false
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$refs.content) {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    }
  },
  methods: {
    initDetach: function initDetach() {
      if (!this.$refs.content || this.hasDetached) { return; }
      var target;

      if (typeof this.attachTo === 'string') {
        target = document.querySelector(this.attachTo); // CSS selector
      } else {
        target = this.attachTo; // DOM Element
      }

      if (!target) {
        console.error("Unable to locate target '".concat(this.attachTo, "'"), this);
        return;
      }

      target.insertBefore(this.$refs.content, target.firstChild);
      this.hasDetached = true;
    }
  }
};

var script$2 = {
  name: 'DatePickerOverlay',
  mixins: [detachable],
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    fullscreenMobile: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number
    }
  },
  computed: {
    styles: function styles() {
      return {
        zIndex: this.zIndex
      };
    },
    shouldShowOverlay: function shouldShowOverlay() {
      return this.isVisible && this.fullscreenMobile;
    }
  },
  watch: {
    shouldShowOverlay: {
      handler: function () {
        var _handler = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee(shouldShow) {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (shouldShow) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  _context.next = 4;
                  return this.$nextTick();

                case 4:
                  this.initDetach(); // from @/mixins/detachable

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function handler(_x) {
          return _handler.apply(this, arguments);
        }

        return handler;
      }(),
      immediate: true
    }
  }
};

/* script */
            var __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"overlay-transition","appear":""}},[(_vm.shouldShowOverlay)?_c('div',{ref:"content",staticClass:"datepicker-overlay",style:(_vm.styles),on:{"click":function($event){return _vm.$emit('close')}}}):_vm._e()])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-181cb255_0", { source: ".datepicker-overlay[data-v-181cb255]{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5)}@media only screen and (min-width:480px){.datepicker-overlay[data-v-181cb255]{display:none}}.overlay-transition-enter-active[data-v-181cb255],.overlay-transition-leave-active[data-v-181cb255]{opacity:1;transition:opacity .3s}.overlay-transition-enter[data-v-181cb255],.overlay-transition-leave-to[data-v-181cb255]{opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-181cb255";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerOverlay.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerOverlay = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    __vue_create_injector__$2);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

// https://github.com/simplesmiler/vue-clickaway
// https://github.com/ndelvalle/v-click-outside/blob/master/lib/v-click-outside.js
// Mixed both :)
var HAS_WINDOWS = typeof window !== 'undefined';
var HAS_NAVIGATOR = typeof navigator !== 'undefined';
var IS_TOUCH = HAS_WINDOWS && ('ontouchstart' in window || HAS_NAVIGATOR && navigator.msMaxTouchPoints > 0);
var EVENTS = IS_TOUCH ? ['touchstart', 'click'] : ['click'];
var instances = [];
var ClickOutside = {
  instances: instances,
  bind: bind,
  update: function update(el, binding) {
    if (JSON.stringify(binding.value) === JSON.stringify(binding.oldValue)) { return; }
    bind(el, binding);
  },
  unbind: unbind
};

function bind(el, _ref) {
  var value = _ref.value;
  unbind(el);
  var bindingValue = value;
  var isFunction = typeof bindingValue === 'function';
  var isObject = _typeof_1(bindingValue) === 'object';
  if (!isFunction && !isObject) { return; }
  var isActive = !(bindingValue.isActive === false);
  if (!isActive) { return; }
  var handler = isFunction ? bindingValue : bindingValue.handler;
  var instance = createInstance({
    el: el,
    handler: handler
  });
  instance.eventHandlers.forEach(function (_ref2) {
    var event = _ref2.event,
        handler = _ref2.handler;
    return setTimeout(function () {
      return document.addEventListener(event, handler, false);
    }, 0);
  });
  instances.push(instance);
}

function unbind(el) {
  var instanceIndex = instances.findIndex(function (instance) {
    return instance.el === el;
  });
  if (instanceIndex === -1) { return; }
  var instance = instances[instanceIndex];
  instance.eventHandlers.forEach(function (_ref3) {
    var event = _ref3.event,
        handler = _ref3.handler;
    return document.removeEventListener(event, handler, false);
  });
  instances.splice(instanceIndex, 1);
} // --------------------
// Helpers
// --------------------


function createInstance(_ref4) {
  var el = _ref4.el,
      _handler = _ref4.handler;
  return {
    el: el,
    eventHandlers: EVENTS.map(function (eventName) {
      return {
        event: eventName,
        handler: function handler(event) {
          return onEvent({
            event: event,
            el: el,
            handler: _handler
          });
        }
      };
    })
  };
}

function onEvent(_ref5) {
  var event = _ref5.event,
      el = _ref5.el,
      handler = _ref5.handler;
  var path = event.path || (event.composedPath ? event.composedPath() : undefined);

  if (path ? path.indexOf(el) < 0 : !el.contains(event.target)) {
    return handler(event, el);
  }
}

function computeYearsScrollPosition(container, elementToShow) {
  return elementToShow.offsetTop - container.offsetHeight / 2 + elementToShow.offsetHeight / 2;
}

function computeAgendaHeight(agenda, classWeeks) {
  if (classWeeks === 'has-6-weeks') {
    return agenda.offsetHeight;
  }

  return agenda.offsetHeight + 36; // height of a day's row;
}

function getDynamicPosition(element, activator, target) {
  // -------------------------------
  // Select activator to get position
  // -------------------------------
  var isFixedActivator = checkActivatorFixed(activator);
  var activatorRect = activator.getBoundingClientRect();
  var activatorOffsets = getActivatorOffset(activatorRect, target, isFixedActivator);
  var spacesAroundParent = getSpacesAroundActivator(activatorRect, target); // -------------------------------
  // Detect space around element
  // -------------------------------

  var placesAvailable = detectPlacesAvailable(element, spacesAroundParent);
  var isThereEnoughSpaceBelow = placesAvailable.isThereEnoughSpaceBelow,
      isThereEnoughSpaceLeft = placesAvailable.isThereEnoughSpaceLeft,
      isThereEnoughSpaceRight = placesAvailable.isThereEnoughSpaceRight,
      isThereEnoughSpaceAbove = placesAvailable.isThereEnoughSpaceAbove; // -------------------------------
  // If there is not enought space above, below, left & right
  // placement => MIDDLE
  // -------------------------------

  if (!isThereEnoughSpaceBelow && !isThereEnoughSpaceLeft && !isThereEnoughSpaceAbove && !isThereEnoughSpaceRight) {
    return getElementCenteredPosition(element);
  }

  return getElementPosition(element, target, activatorRect, activatorOffsets, spacesAroundParent, placesAvailable);
} // -------------------------------
// HELPERS
// -------------------------------


function checkActivatorFixed(activator) {
  var POSITIONS = ['fixed', 'sticky'];
  var element = activator;
  var activatorFixed = false;

  while (element) {
    if (POSITIONS.includes(window.getComputedStyle(element).position)) {
      activatorFixed = true;
      return activatorFixed;
    }

    element = element.offsetParent;
  }

  activatorFixed = false;
  return activatorFixed;
}

function getActivatorOffset(activatorRect, target, isFixedActivator) {
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    activatorOffsetTop: activatorRect.top + (isFixedActivator ? target.scrollTop : scrollTop),
    activatorOffsetLeft: activatorRect.left + (isFixedActivator ? target.scrollLeft : scrollLeft)
  };
}

function getSpacesAroundActivator(activatorRect, target) {
  var targetRect = target.getBoundingClientRect();
  return {
    spaceBelow: window.innerHeight - activatorRect.bottom - (window.innerHeight - targetRect.bottom),
    spaceAbove: activatorRect.top - target.offsetTop,
    spaceLeft: activatorRect.left - target.offsetLeft,
    spaceRight: window.innerWidth - activatorRect.left - activatorRect.width - (window.innerWidth - targetRect.left - targetRect.width)
  };
}

function detectPlacesAvailable(element, _ref) {
  var spaceBelow = _ref.spaceBelow,
      spaceAbove = _ref.spaceAbove,
      spaceLeft = _ref.spaceLeft,
      spaceRight = _ref.spaceRight;
  return {
    isThereEnoughSpaceBelow: spaceBelow - element.offsetHeight > 0,
    isThereEnoughSpaceLeft: spaceLeft - element.offsetWidth > 0,
    isThereEnoughSpaceRight: spaceRight - element.offsetWidth > 0,
    isThereEnoughSpaceAbove: spaceAbove - element.offsetHeight > 0
  };
}

function getElementCenteredPosition(_ref2) {
  var offsetHeight = _ref2.offsetHeight,
      offsetWidth = _ref2.offsetWidth;
  return {
    top: window.pageYOffset + (window.innerHeight - offsetHeight) / 2,
    left: window.pageXOffset + (window.innerWidth - offsetWidth) / 2,
    origin: 'center center' // for animation only

  };
}

function getElementPosition(element, target, activatorRect, activatorOffsets, spacesAroundParent, placesAvailable) {
  var elementHeight = element.offsetHeight;
  var elementWidth = element.offsetWidth;
  var activatorOffsetTop = activatorOffsets.activatorOffsetTop,
      activatorOffsetLeft = activatorOffsets.activatorOffsetLeft;
  var spaceAbove = spacesAroundParent.spaceAbove;
  var isThereEnoughSpaceBelow = placesAvailable.isThereEnoughSpaceBelow,
      isThereEnoughSpaceLeft = placesAvailable.isThereEnoughSpaceLeft,
      isThereEnoughSpaceRight = placesAvailable.isThereEnoughSpaceRight,
      isThereEnoughSpaceAbove = placesAvailable.isThereEnoughSpaceAbove;
  var missingSpaceToShowAbove = Math.abs(spaceAbove - elementHeight);
  var couldBeShowBelowOrAbove = isThereEnoughSpaceBelow || isThereEnoughSpaceAbove;

  if (!couldBeShowBelowOrAbove && isThereEnoughSpaceRight) {
    return {
      top: activatorOffsetTop + (missingSpaceToShowAbove + activatorRect.height) - elementHeight,
      left: activatorOffsetLeft + activatorRect.width,
      origin: 'left center'
    };
  }

  if (!couldBeShowBelowOrAbove && isThereEnoughSpaceLeft) {
    return {
      top: activatorOffsetTop + (missingSpaceToShowAbove + activatorRect.height) - elementHeight,
      left: activatorOffsetLeft - elementWidth,
      origin: 'right center'
    };
  }

  if (couldBeShowBelowOrAbove && isThereEnoughSpaceLeft && !isThereEnoughSpaceRight) {
    return {
      top: activatorOffsetTop + (isThereEnoughSpaceBelow ? activatorRect.height : -elementHeight),
      left: activatorOffsetLeft + activatorRect.width - elementWidth,
      origin: isThereEnoughSpaceBelow ? 'top right' : 'bottom right'
    };
  }

  if (couldBeShowBelowOrAbove && !isThereEnoughSpaceLeft && !isThereEnoughSpaceRight) {
    return {
      top: activatorOffsetTop + (isThereEnoughSpaceBelow ? activatorRect.height : -elementHeight),
      left: activatorOffsetLeft - target.offsetLeft,
      origin: isThereEnoughSpaceBelow ? 'top left' : 'bottom left'
    };
  }

  return {
    top: activatorOffsetTop + (isThereEnoughSpaceBelow ? activatorRect.height : -elementHeight),
    left: activatorOffsetLeft - target.offsetLeft,
    origin: isThereEnoughSpaceBelow ? 'top left' : 'bottom left'
  };
}

var dynamicPosition = {
  data: function data() {
    return {
      left: 0,
      top: 0,
      origin: 'top center',
      innerWidth: window.innerWidth
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.inline) { return; } // We're using a `requestAnimationFrame()` for optimal performance.

    this.eventHandler = function () {
      return requestAnimationFrame(_this.updatePosition);
    };
  },
  methods: {
    initResizeListener: function initResizeListener() {
      window.addEventListener('resize', this.eventHandler);
    },
    removeResizeListener: function removeResizeListener() {
      window.removeEventListener('resize', this.eventHandler);
    },
    updatePosition: function updatePosition() {
      this.innerWidth = window.innerWidth;
      var target;

      if (typeof this.attachTo === 'string') {
        target = document.querySelector(this.attachTo); // CSS selector
      } else {
        target = this.attachTo; // DOM Element
      }

      if (!target) {
        console.error("Unable to locate target '".concat(this.attachTo, "'"), this);
        return;
      }

      var _getDynamicPosition = getDynamicPosition(this.$refs.content, // element to show
      document.querySelector('.datepicker-container--active'), // datepicker container
      target // where datepicker will be shown
      ),
          top = _getDynamicPosition.top,
          left = _getDynamicPosition.left,
          origin = _getDynamicPosition.origin;

      this.top = top;
      this.left = left;
      this.origin = origin;
    }
  }
};

var script$3 = {
  name: 'DatePickerHeader',
  mixins: [colorable],
  props: {
    mutableDate: {
      type: [String, Object]
    },
    transitionName: {
      type: String
    },
    color: {
      type: String
    },
    locale: {
      type: Object
    },
    formatHeader: {
      type: String
    },
    mode: {
      type: String
    },
    range: {
      type: Boolean
    },
    rangeHeaderText: {
      type: String
    }
  },
  computed: {
    classes: function classes() {
      return {
        'datepicker-header--range': this.range
      };
    },
    year: function year() {
      if (!this.mutableDate) { return '-'; }
      return formatDateWithLocale(this.mutableDate, this.locale, 'YYYY');
    },
    dateFormatted: function dateFormatted() {
      if (this.range && this.rangeHeaderText) {
        var _this$rangeHeaderText = this.rangeHeaderText.split('%d'),
            _this$rangeHeaderText2 = slicedToArray(_this$rangeHeaderText, 2),
            startText = _this$rangeHeaderText2[0],
            endText = _this$rangeHeaderText2[1];

        var _getRangeDatesFormatt = getRangeDatesFormatted(this.mutableDate, this.locale, this.formatHeader).split(' ~ '),
            _getRangeDatesFormatt2 = slicedToArray(_getRangeDatesFormatt, 2),
            startDate = _getRangeDatesFormatt2[0],
            maxDate = _getRangeDatesFormatt2[1];

        return ["".concat(startText.trim(), " ").concat(startDate), "".concat(endText.trim(), " ").concat(maxDate).trim()];
      }

      if (!this.mutableDate) { return '--'; }
      return formatDateWithLocale(this.mutableDate, this.locale, this.formatHeader);
    }
  }
};

/* script */
            var __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker-header",class:_vm.classes,style:(_vm.setBackgroundColor(_vm.color))},[(!_vm.range)?_c('div',{staticClass:"datepicker-header__year",class:{ 'datepicker-header__year--active' : _vm.mode === 'year' }},[_c('span',{on:{"click":function($event){return _vm.$emit('showYearMonthSelector', 'year')}}},[_vm._v("\n      "+_vm._s(_vm.year)+"\n    ")])]):_vm._e(),_vm._v(" "),(!_vm.range)?_c('div',{staticClass:"datepicker-header__wrap"},[_c('TransitionGroup',{staticClass:"datepicker-header__date",class:{ 'datepicker-header__date--active' : _vm.mode !== 'year' },attrs:{"tag":"div","name":_vm.transitionName}},_vm._l(([_vm.dateFormatted]),function(dateFormatted){return _c('span',{key:dateFormatted,on:{"click":function($event){return _vm.$emit('hideYearMonthSelector')}}},[_vm._v("\n        "+_vm._s(dateFormatted)+"\n      ")])}),0)],1):_c('div',{staticClass:"datepicker-header__wrap"},[_c('TransitionGroup',{staticClass:"datepicker-header__date",class:{ 'datepicker-header__date--active' : _vm.mutableDate.start },attrs:{"tag":"div","name":_vm.transitionName}},_vm._l(([_vm.dateFormatted[0]]),function(dateFormatted){return _c('span',{key:dateFormatted},[_vm._v("\n        "+_vm._s(dateFormatted)+"\n      ")])}),0),_vm._v(" "),_c('TransitionGroup',{staticClass:"datepicker-header__date",class:{ 'datepicker-header__date--active' : _vm.mutableDate.end },attrs:{"tag":"div","name":_vm.transitionName}},_vm._l(([_vm.dateFormatted[1]]),function(dateFormatted){return _c('span',{key:dateFormatted},[_vm._v("\n        "+_vm._s(dateFormatted)+"\n      ")])}),0)],1)])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-6cca859e_0", { source: ".slide-h-next-enter-active[data-v-6cca859e],.slide-h-next-leave-active[data-v-6cca859e],.slide-h-prev-enter-active[data-v-6cca859e],.slide-h-prev-leave-active[data-v-6cca859e]{position:absolute;transition:transform .3s,opacity .3s}.slide-h-next-enter[data-v-6cca859e],.slide-h-prev-leave-to[data-v-6cca859e]{transform:translateX(100%);opacity:0}.slide-h-next-leave-to[data-v-6cca859e],.slide-h-prev-enter[data-v-6cca859e]{transform:translateX(-100%);opacity:0}.datepicker--rtl .slide-h-next-enter[data-v-6cca859e],.datepicker--rtl .slide-h-prev-leave-to[data-v-6cca859e]{transform:translateX(-100%)}.datepicker--rtl .slide-h-next-leave-to[data-v-6cca859e],.datepicker--rtl .slide-h-prev-enter[data-v-6cca859e]{transform:translateX(100%)}.slide-v-next-enter-active[data-v-6cca859e],.slide-v-next-leave-active[data-v-6cca859e],.slide-v-prev-enter-active[data-v-6cca859e],.slide-v-prev-leave-active[data-v-6cca859e]{position:absolute;transition:transform .3s,opacity .3s}.slide-v-next-enter[data-v-6cca859e],.slide-v-prev-leave-to[data-v-6cca859e]{transform:translateY(100%);opacity:0}.slide-v-next-leave-to[data-v-6cca859e],.slide-v-prev-enter[data-v-6cca859e]{transform:translateY(-100%);opacity:0}.yearMonth-enter-active[data-v-6cca859e],.yearMonth-leave-active[data-v-6cca859e]{position:absolute;transition:opacity .3s}.yearMonth-enter[data-v-6cca859e],.yearMonth-leave-to[data-v-6cca859e]{opacity:0}.datepicker-header[data-v-6cca859e]{color:#fff;padding:16px;display:flex;justify-content:space-between;flex-direction:column;flex-wrap:wrap;line-height:1;min-height:80px;max-height:80px;border-radius:6px 6px 0 0}.datepicker--rtl .datepicker-header[data-v-6cca859e]{direction:rtl}@media only screen and (min-width:768px){.datepicker-header[data-v-6cca859e]{min-height:85px;max-height:85px}}.datepicker-header--range .datepicker-header__wrap[data-v-6cca859e]{flex:1 1 auto;flex-direction:column;justify-content:space-between}.datepicker-header--range .datepicker-header__date[data-v-6cca859e]{font-size:18px;height:calc(18px + 8px)}@media only screen and (min-width:768px){.datepicker-header--range .datepicker-header__date[data-v-6cca859e]{font-size:22px;height:calc(22px + 8px)}}.datepicker-header__year[data-v-6cca859e]{align-items:center;display:inline-flex;font-size:14px;margin-bottom:8px;opacity:.6;transition:opacity .3s}.datepicker-header__year[data-v-6cca859e]:focus:not(.datepicker-header__year--active),.datepicker-header__year[data-v-6cca859e]:hover:not(.datepicker-header__year--active){cursor:pointer;opacity:1}.datepicker-header__year--active[data-v-6cca859e]{opacity:1;cursor:default}.datepicker-header__wrap[data-v-6cca859e]{position:relative;display:flex;width:100%}.datepicker-header__date[data-v-6cca859e]{position:relative;display:flex;width:100%;font-size:22px;height:calc(22px + 8px);text-align:left;overflow:hidden;padding-bottom:8px;margin-bottom:-8px;opacity:.6;transition:opacity .3s}.datepicker-header__date[data-v-6cca859e]:focus:not(.datepicker-header__date--active),.datepicker-header__date[data-v-6cca859e]:hover:not(.datepicker-header__date--active){cursor:pointer;opacity:1}.datepicker-header__date--active[data-v-6cca859e]{opacity:1;cursor:default}@media only screen and (min-width:768px){.datepicker-header__date[data-v-6cca859e]{font-size:24px;height:calc(24px + 8px)}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-6cca859e";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$3() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerHeader = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    __vue_create_injector__$3);

//
var script$4 = {
  name: 'DatePickerControls',
  mixins: [colorable],
  props: {
    currentDate: {
      type: Object,
      required: true
    },
    transitionName: {
      type: String
    },
    color: {
      type: String
    },
    mode: {
      type: String,
      default: 'month'
    },
    minDate: {
      type: [String, Number, Date]
    },
    maxDate: {
      type: [String, Number, Date]
    },
    rtl: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    monthFormatted: function monthFormatted() {
      return this.currentDate.getMonthFormatted();
    },
    yearFormatted: function yearFormatted() {
      return this.currentDate.getYearFormatted();
    },
    isYearDisabled: function isYearDisabled() {
      return isBeforeDate(this.yearFormatted, this.minDate, 'year') || isAfterDate(this.yearFormatted, this.maxDate, 'year');
    },
    isPreviousDateDisabled: function isPreviousDateDisabled() {
      if (this.mode !== 'year') { return false; }
      return isBeforeDate(Number(this.yearFormatted) - 1, this.minDate, 'year');
    },
    isNextDateDisabled: function isNextDateDisabled() {
      if (this.mode !== 'year') { return false; }
      return isAfterDate(Number(this.yearFormatted) + 1, this.maxDate, 'year');
    }
  },
  methods: {
    changeVisibleDate: function changeVisibleDate(direction) {
      this.$emit('changeVisibleDate', direction);
    },
    showYearMonthSelector: function showYearMonthSelector(mode) {
      this.$emit('showYearMonthSelector', mode);
    }
  }
};

/* script */
            var __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker-controls"},[_c('button',{staticClass:"datepicker-controls__prev",attrs:{"disabled":_vm.isPreviousDateDisabled,"type":"button"},on:{"click":function($event){return _vm.changeVisibleDate(!_vm.rtl ? 'prev' : 'next')}}},[_c('svg',{attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}})])]),_vm._v(" "),_c('div',{staticClass:"datepicker-controls__wrapper"},[(_vm.mode === 'month')?_c('TransitionGroup',{staticClass:"datepicker-controls__month",attrs:{"name":_vm.transitionName,"tag":"span"}},_vm._l(([_vm.currentDate.month]),function(month){return _c('div',{key:month,staticClass:"datepicker-controls__label",style:(_vm.setTextColor(_vm.color))},[_c('button',{attrs:{"type":"button"},on:{"click":function($event){return _vm.showYearMonthSelector('month')}}},[_vm._v("\n          "+_vm._s(_vm.monthFormatted)+"\n        ")])])}),0):_vm._e(),_vm._v(" "),_c('TransitionGroup',{staticClass:"datepicker-controls__year",class:{ 'datepicker-controls__year--center' : _vm.mode === 'year' },attrs:{"name":_vm.transitionName,"tag":"span"}},_vm._l(([_vm.currentDate.year]),function(year){return _c('div',{key:year,staticClass:"datepicker-controls__label",style:(_vm.setTextColor(_vm.color))},[_c('button',{attrs:{"disabled":_vm.isYearDisabled,"type":"button"},on:{"click":function($event){return _vm.showYearMonthSelector('year')}}},[_vm._v("\n            "+_vm._s(_vm.yearFormatted)+"\n          ")])])}),0)],1),_vm._v(" "),_c('button',{staticClass:"datepicker-controls__next",attrs:{"disabled":_vm.isNextDateDisabled,"type":"button"},on:{"click":function($event){return _vm.changeVisibleDate(!_vm.rtl ? 'next' : 'prev')}}},[_c('svg',{attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}})])])])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-21f95147_0", { source: ".datepicker-controls__label button[data-v-21f95147]{border:none;margin:0;padding:0;width:auto;overflow:visible;background:0 0;color:inherit;font:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none}.datepicker-controls__label button[data-v-21f95147]:active,.datepicker-controls__label button[data-v-21f95147]:focus{outline:0;box-shadow:0}.datepicker-controls__label button[role=button][data-v-21f95147],.datepicker-controls__label button[type=button][data-v-21f95147],.datepicker-controls__label button[type=reset][data-v-21f95147],.datepicker-controls__label button[type=submit][data-v-21f95147]{cursor:pointer}.slide-h-next-enter-active[data-v-21f95147],.slide-h-next-leave-active[data-v-21f95147],.slide-h-prev-enter-active[data-v-21f95147],.slide-h-prev-leave-active[data-v-21f95147]{position:absolute;transition:transform .3s,opacity .3s}.slide-h-next-enter[data-v-21f95147],.slide-h-prev-leave-to[data-v-21f95147]{transform:translateX(100%);opacity:0}.slide-h-next-leave-to[data-v-21f95147],.slide-h-prev-enter[data-v-21f95147]{transform:translateX(-100%);opacity:0}.datepicker--rtl .slide-h-next-enter[data-v-21f95147],.datepicker--rtl .slide-h-prev-leave-to[data-v-21f95147]{transform:translateX(-100%)}.datepicker--rtl .slide-h-next-leave-to[data-v-21f95147],.datepicker--rtl .slide-h-prev-enter[data-v-21f95147]{transform:translateX(100%)}.slide-v-next-enter-active[data-v-21f95147],.slide-v-next-leave-active[data-v-21f95147],.slide-v-prev-enter-active[data-v-21f95147],.slide-v-prev-leave-active[data-v-21f95147]{position:absolute;transition:transform .3s,opacity .3s}.slide-v-next-enter[data-v-21f95147],.slide-v-prev-leave-to[data-v-21f95147]{transform:translateY(100%);opacity:0}.slide-v-next-leave-to[data-v-21f95147],.slide-v-prev-enter[data-v-21f95147]{transform:translateY(-100%);opacity:0}.yearMonth-enter-active[data-v-21f95147],.yearMonth-leave-active[data-v-21f95147]{position:absolute;transition:opacity .3s}.yearMonth-enter[data-v-21f95147],.yearMonth-leave-to[data-v-21f95147]{opacity:0}.datepicker-controls[data-v-21f95147]{position:relative;display:flex;height:48px;text-align:center;position:relative;width:100%}@media only screen and (min-width:768px){.datepicker-controls[data-v-21f95147]{height:56px}}.datepicker-controls__wrapper[data-v-21f95147]{position:relative;overflow:hidden;display:flex;justify-content:center;align-items:center;flex:1}.datepicker-controls__month[data-v-21f95147],.datepicker-controls__year[data-v-21f95147]{position:relative;display:flex;flex:1;align-items:center}.datepicker-controls__month[data-v-21f95147]{justify-content:flex-end}.datepicker-controls__year[data-v-21f95147]{justify-content:flex-start}.datepicker-controls__year.datepicker-controls__year--center[data-v-21f95147]{justify-content:center}.datepicker-controls__label[data-v-21f95147]{padding:8px 4px}.datepicker-controls__label button[data-v-21f95147]{position:relative;display:flex;font-size:15px;font-weight:500;line-height:15px;padding:0;border:none;outline:0;transition:color .3s}.datepicker-controls__label button[data-v-21f95147]:not(:hover):not(:focus){color:rgba(0,0,0,.87)}.datepicker-controls__label button[data-v-21f95147]:disabled,.datepicker-controls__label button[disabled][data-v-21f95147]{cursor:default;color:rgba(0,0,0,.26)}.datepicker-controls button.datepicker-controls__next[data-v-21f95147],.datepicker-controls button.datepicker-controls__prev[data-v-21f95147]{position:relative;flex:0 0 40px;height:48px;width:48px;padding:0 0 0 24px;border:none;outline:0;background-color:transparent;user-select:none;cursor:pointer}@media only screen and (min-width:768px){.datepicker-controls button.datepicker-controls__next[data-v-21f95147],.datepicker-controls button.datepicker-controls__prev[data-v-21f95147]{padding:0 8px 0 8px;height:56px;width:56px}}.datepicker-controls button.datepicker-controls__next[data-v-21f95147]:disabled,.datepicker-controls button.datepicker-controls__next[disabled][data-v-21f95147],.datepicker-controls button.datepicker-controls__prev[data-v-21f95147]:disabled,.datepicker-controls button.datepicker-controls__prev[disabled][data-v-21f95147]{cursor:default}.datepicker-controls button.datepicker-controls__next:disabled svg[data-v-21f95147],.datepicker-controls button.datepicker-controls__next[disabled] svg[data-v-21f95147],.datepicker-controls button.datepicker-controls__prev:disabled svg[data-v-21f95147],.datepicker-controls button.datepicker-controls__prev[disabled] svg[data-v-21f95147]{fill:rgba(0,0,0,.26)}.datepicker-controls button.datepicker-controls__next[data-v-21f95147]{padding:0 24px 0 0}@media only screen and (min-width:768px){.datepicker-controls button.datepicker-controls__next[data-v-21f95147]{padding:0 8px 0 8px}}.datepicker-controls svg[data-v-21f95147]{width:24px;height:24px;fill:rgba(0,0,0,.87);vertical-align:middle}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = "data-v-21f95147";
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerControls.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$4() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerControls = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    __vue_create_injector__$4);

var script$5 = {
  name: 'DatePickerYearMonth',
  mixins: [colorable],
  components: {
    DatePickerControls: DatePickerControls
  },
  props: {
    mode: {
      type: String,
      default: String
    },
    range: {
      type: Boolean,
      default: false
    },
    currentDate: {
      type: Object,
      default: Object
    },
    mutableDate: {
      type: Object,
      default: undefined
    },
    transitionName: {
      type: String,
      default: String
    },
    showYearMonthSelector: {
      type: Function
    },
    color: {
      type: String,
      default: String
    },
    minDate: {
      type: [String, Date, Object]
    },
    maxDate: {
      type: [String, Date, Object]
    }
  },
  computed: {
    yearFormatted: function yearFormatted() {
      return this.currentDate.getYearFormatted();
    },
    getYears: function getYears() {
      var year = this.currentDate.year;
      return this.currentDate.generateYearsRange(year, 10, 'year');
    },
    getMonths: function getMonths() {
      return this.currentDate.getMonths();
    },
    getQuarters: function getQuarters() {
      return this.currentDate.getQuarters();
    }
  },
  watch: {
    mode: {
      handler: function () {
        var _handler = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee(currentMode) {
          var activeItem, containerToScroll;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.$nextTick();

                case 2:
                  activeItem = this.$el.querySelector('li.active');

                  if (!(!activeItem || currentMode !== 'year')) {
                    _context.next = 5;
                    break;
                  }

                  return _context.abrupt("return");

                case 5:
                  // should scroll to active year
                  containerToScroll = this.$el.querySelector('.datepicker-years__list');
                  containerToScroll.scrollTop = computeYearsScrollPosition(containerToScroll, activeItem);

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function handler(_x) {
          return _handler.apply(this, arguments);
        }

        return handler;
      }(),
      immediate: true
    }
  },
  methods: {
    isSelectedYear: function isSelectedYear(year) {
      return this.currentDate.year === year;
    },
    isSelectedMonthOrQuarter: function isSelectedMonthOrQuarter(monthIndex) {
      if (this.range || !this.mutableDate) { return false; }
      var selectedDate = formatDateWithYearAndMonth(this.currentDate.year, monthIndex);
      return areSameDates(this.mutableDate.format('YYYY-MM'), selectedDate.format('YYYY-MM'), this.mode);
    },
    isYearDisabled: function isYearDisabled(year) {
      return isBeforeDate(year, this.minDate, this.mode) || isAfterDate(year, this.maxDate, this.mode);
    },
    isMonthOrQuarterDisabled: function isMonthOrQuarterDisabled(monthIndex) {
      var date = formatDateWithYearAndMonth(this.yearFormatted, monthIndex);
      return isBeforeDate(date, this.minDate, 'month') || isAfterDate(date, this.maxDate, 'month');
    },
    changeYear: function changeYear(direction) {
      this.$emit('changeYear', direction);
    },
    onSelect: function onSelect(value) {
      this.$emit('selectedYearMonth', value, this.mode);
    }
  }
};

/* script */
            var __vue_script__$5 = script$5;
            
/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"yearMonth","appear":""}},[_c('div',{staticClass:"datepicker-year-month"},[(_vm.mode === 'year')?_c('div',{staticClass:"datepicker-years"},[_c('ul',{staticClass:"datepicker-years__list"},_vm._l((_vm.getYears),function(year){return _c('li',{key:year,class:{
            'active' : _vm.isSelectedYear(year),
            'disabled' : _vm.isYearDisabled(year)
          },style:(Object.assign({}, (_vm.isSelectedYear(year) && _vm.setTextColor(_vm.color))))},[_c('button',{attrs:{"disabled":_vm.isYearDisabled(year),"type":"button"},on:{"click":function($event){return _vm.onSelect(year)}}},[_vm._v("\n            "+_vm._s(year)+"\n          ")])])}),0)]):_vm._e(),_vm._v(" "),(_vm.mode === 'month' || _vm.mode === 'quarter')?_c('div',{staticClass:"datepicker-months"},[_c('DatePickerControls',{attrs:{"current-date":_vm.currentDate,"transition-name":_vm.transitionName,"min-date":_vm.minDate,"max-date":_vm.maxDate,"color":_vm.color,"mode":"year"},on:{"changeVisibleDate":_vm.changeYear,"showYearMonthSelector":_vm.showYearMonthSelector}}),_vm._v(" "),(_vm.mode === 'month')?[_c('TransitionGroup',{staticClass:"datepicker-months__wrapper",attrs:{"tag":"div","name":_vm.transitionName}},_vm._l(([_vm.currentDate.year]),function(year){return _c('div',{key:year,staticClass:"datepicker-months__list"},_vm._l((_vm.getMonths),function(month,index){return _c('button',{key:index,style:(Object.assign({}, (_vm.isSelectedMonthOrQuarter(index) && _vm.setTextColor('#fff')),
                (_vm.isSelectedMonthOrQuarter(index) && _vm.setBackgroundColor(_vm.color)))),attrs:{"disabled":_vm.isMonthOrQuarterDisabled(index),"type":"button"},on:{"click":function($event){return _vm.onSelect(index)}}},[_vm._v("\n            "+_vm._s(month)+"\n            ")])}),0)}),0)]:_vm._e(),_vm._v(" "),(_vm.mode === 'quarter')?[_c('TransitionGroup',{staticClass:"datepicker-months__wrapper",attrs:{"tag":"div","name":_vm.transitionName}},_vm._l(([_vm.currentDate.year]),function(year){return _c('div',{key:year,staticClass:"datepicker-quarters__list"},_vm._l((_vm.getQuarters),function(quarter,index){return _c('button',{key:index,style:(Object.assign({}, (_vm.isSelectedMonthOrQuarter(index*3) && _vm.setTextColor('#fff')),
                (_vm.isSelectedMonthOrQuarter(index*3) && _vm.setBackgroundColor(_vm.color)))),attrs:{"disabled":_vm.isMonthOrQuarterDisabled(index),"type":"button"},on:{"click":function($event){return _vm.onSelect(index)}}},[_vm._v("\n            "+_vm._s(quarter)+"\n            ")])}),0)}),0)]:_vm._e()],2):_vm._e()])])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-4325278c_0", { source: ".datepicker-months .datepicker-months__list button[data-v-4325278c],.datepicker-months .datepicker-quarters__list button[data-v-4325278c],.datepicker-years ul li button[data-v-4325278c]{border:none;margin:0;padding:0;width:auto;overflow:visible;background:0 0;color:inherit;font:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none}.datepicker-months .datepicker-months__list button[data-v-4325278c]:active,.datepicker-months .datepicker-months__list button[data-v-4325278c]:focus,.datepicker-months .datepicker-quarters__list button[data-v-4325278c]:active,.datepicker-months .datepicker-quarters__list button[data-v-4325278c]:focus,.datepicker-years ul li button[data-v-4325278c]:active,.datepicker-years ul li button[data-v-4325278c]:focus{outline:0;box-shadow:0}.datepicker-months .datepicker-months__list button[role=button][data-v-4325278c],.datepicker-months .datepicker-months__list button[type=button][data-v-4325278c],.datepicker-months .datepicker-months__list button[type=reset][data-v-4325278c],.datepicker-months .datepicker-months__list button[type=submit][data-v-4325278c],.datepicker-months .datepicker-quarters__list button[role=button][data-v-4325278c],.datepicker-months .datepicker-quarters__list button[type=button][data-v-4325278c],.datepicker-months .datepicker-quarters__list button[type=reset][data-v-4325278c],.datepicker-months .datepicker-quarters__list button[type=submit][data-v-4325278c],.datepicker-years ul li button[role=button][data-v-4325278c],.datepicker-years ul li button[type=button][data-v-4325278c],.datepicker-years ul li button[type=reset][data-v-4325278c],.datepicker-years ul li button[type=submit][data-v-4325278c]{cursor:pointer}.slide-h-next-enter-active[data-v-4325278c],.slide-h-next-leave-active[data-v-4325278c],.slide-h-prev-enter-active[data-v-4325278c],.slide-h-prev-leave-active[data-v-4325278c]{position:absolute;transition:transform .3s,opacity .3s}.slide-h-next-enter[data-v-4325278c],.slide-h-prev-leave-to[data-v-4325278c]{transform:translateX(100%);opacity:0}.slide-h-next-leave-to[data-v-4325278c],.slide-h-prev-enter[data-v-4325278c]{transform:translateX(-100%);opacity:0}.datepicker--rtl .slide-h-next-enter[data-v-4325278c],.datepicker--rtl .slide-h-prev-leave-to[data-v-4325278c]{transform:translateX(-100%)}.datepicker--rtl .slide-h-next-leave-to[data-v-4325278c],.datepicker--rtl .slide-h-prev-enter[data-v-4325278c]{transform:translateX(100%)}.slide-v-next-enter-active[data-v-4325278c],.slide-v-next-leave-active[data-v-4325278c],.slide-v-prev-enter-active[data-v-4325278c],.slide-v-prev-leave-active[data-v-4325278c]{position:absolute;transition:transform .3s,opacity .3s}.slide-v-next-enter[data-v-4325278c],.slide-v-prev-leave-to[data-v-4325278c]{transform:translateY(100%);opacity:0}.slide-v-next-leave-to[data-v-4325278c],.slide-v-prev-enter[data-v-4325278c]{transform:translateY(-100%);opacity:0}.yearMonth-enter-active[data-v-4325278c],.yearMonth-leave-active[data-v-4325278c]{position:absolute;transition:opacity .3s}.yearMonth-enter[data-v-4325278c],.yearMonth-leave-to[data-v-4325278c]{opacity:0}.datepicker-year-month[data-v-4325278c]{position:absolute;top:0;left:0;right:0;bottom:0;background:#fff}@supports (padding-bottom:constant(safe-area-inset-bottom)){.datepicker-year-month[data-v-4325278c]{--safe-area-inset-bottom:constant(safe-area-inset-bottom);padding-bottom:var(--safe-area-inset-bottom)}}@supports (padding-bottom:env(safe-area-inset-bottom)){.datepicker-year-month[data-v-4325278c]{--safe-area-inset-bottom:env(safe-area-inset-bottom);padding-bottom:var(--safe-area-inset-bottom)}}.datepicker-years[data-v-4325278c]{height:auto;position:relative;z-index:0;flex:1 0 auto;display:flex;flex-direction:column;align-items:center;height:100%}.datepicker-years ul[data-v-4325278c]{width:100%;font-size:16px;font-weight:400;list-style-type:none;overflow-y:scroll;-webkit-overflow-scrolling:touch;padding:0;margin:0;text-align:center}.datepicker-years ul li[data-v-4325278c]{cursor:pointer;transition:none}.datepicker-years ul li[data-v-4325278c]:focus,.datepicker-years ul li[data-v-4325278c]:hover{background-color:#eef1f8}.datepicker-years ul li button[data-v-4325278c]{position:relative;width:100%;padding:8px 0}.datepicker-years ul li.active button[data-v-4325278c]{font-size:26px;font-weight:500;padding:8px 0}.datepicker-years ul li.disabled button[data-v-4325278c]{cursor:default;color:rgba(0,0,0,.26)}.datepicker-months[data-v-4325278c]{height:auto;overflow:hidden;position:relative;z-index:0;flex:1 0 auto;display:flex;flex-direction:column;align-items:center;height:100%}.datepicker-months .datepicker-months__wrapper[data-v-4325278c]{position:relative;display:flex;width:100%;height:100%;padding:0 8px 8px}.datepicker-months .datepicker-months__list[data-v-4325278c],.datepicker-months .datepicker-quarters__list[data-v-4325278c]{position:absolute;top:0;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,1fr);grid-gap:8px;width:100%;height:100%;justify-items:center;align-items:center}.datepicker--rtl .datepicker-months .datepicker-months__list[data-v-4325278c],.datepicker--rtl .datepicker-months .datepicker-quarters__list[data-v-4325278c]{direction:rtl}.datepicker-months .datepicker-months__list button[data-v-4325278c],.datepicker-months .datepicker-quarters__list button[data-v-4325278c]{position:relative;display:flex;justify-content:center;align-items:center;font-size:12px;padding:0 20px;height:30px;font-size:15px;font-weight:500;border-radius:2px;outline:0;transition:background-color .3s}.datepicker-months .datepicker-months__list button[data-v-4325278c]:hover,.datepicker-months .datepicker-quarters__list button[data-v-4325278c]:hover{background-color:#eef1f8}.datepicker-months .datepicker-months__list button[data-v-4325278c]:disabled,.datepicker-months .datepicker-months__list button[disabled][data-v-4325278c],.datepicker-months .datepicker-quarters__list button[data-v-4325278c]:disabled,.datepicker-months .datepicker-quarters__list button[disabled][data-v-4325278c]{cursor:default;color:rgba(0,0,0,.26)}.datepicker-months .datepicker-months__list button .datepicker-month--current[data-v-4325278c],.datepicker-months .datepicker-quarters__list button .datepicker-month--current[data-v-4325278c]{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:100%;height:30px;background-color:currentColor}.datepicker-months .datepicker-quarters__list[data-v-4325278c]{grid-template-columns:1fr;grid-template-rows:repeat(4,1fr)}.datepicker-months .datepicker-quarters__list button[data-v-4325278c]{height:100%;width:100%}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-4325278c";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerYearMonth.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$5() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerYearMonth = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    __vue_create_injector__$5);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) { keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } return keys; }

function _objectSpread(target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i] != null ? arguments$1[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var script$6 = {
  name: 'DatePickerPresets',
  mixins: [colorable],
  props: {
    rangePresets: {
      type: Array
    },
    mutableDate: {
      type: Object
    },
    minDate: {
      type: [String, Number, Date]
    },
    maxDate: {
      type: [String, Number, Date]
    },
    color: {
      type: String
    },
    locale: {
      type: Object
    }
  },
  computed: {
    presetsFormatted: function presetsFormatted() {
      var _this = this;

      if (!this.rangePresets) { return; }
      return this.rangePresets.map(function (preset) {
        return _objectSpread({}, preset, {
          availableDates: generateDateRangeWithoutDisabled(preset.dates, _this.minDate, _this.maxDate)
        });
      }).splice(0, MAX_PRESETS_NUMBER); // Allow a number of presets
    }
  },
  methods: {
    isPresetSelected: function isPresetSelected() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$availableDates = _ref.availableDates,
          availableDates = _ref$availableDates === void 0 ? [] : _ref$availableDates;

      if (availableDates.length === 0 || !this.mutableDate) { return false; }
      return areSameDates(availableDates[0], this.mutableDate.start) && areSameDates(availableDates[availableDates.length - 1], this.mutableDate.end);
    },
    isPresetValid: function isPresetValid() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$availableDates = _ref2.availableDates,
          availableDates = _ref2$availableDates === void 0 ? [] : _ref2$availableDates;

      if (!this.mutableDate) { return false; }
      return availableDates.length > 0;
    },
    setPresetDates: function setPresetDates(_ref3) {
      var availableDates = _ref3.availableDates;
      if (this.isPresetSelected({
        availableDates: availableDates
      })) { return; }
      this.$emit('updateRange', {
        start: availableDates[0],
        end: availableDates[availableDates.length - 1]
      });
    }
  }
};

/* script */
            var __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.rangePresets)?_c('div',{staticClass:"datepicker-presets"},[_c('div',{staticClass:"datepicker-presets__wrapper"},_vm._l((_vm.presetsFormatted),function(preset,index){return _c('button',{key:index,staticClass:"datepicker-preset",class:{
        'datepicker-preset--selected': _vm.isPresetSelected(preset),
        'datepicker-preset--disabled': !_vm.isPresetValid(preset),
      },attrs:{"type":"button"},on:{"click":function($event){return _vm.setPresetDates(preset)}}},[_c('div',{staticClass:"datepicker-preset__effect",style:(_vm.setBackgroundColor(_vm.color))}),_vm._v(" "),_c('div',{staticClass:"datepicker-preset__name"},[_vm._v(_vm._s(preset.name))])])}),0)]):_vm._e()};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-75e32149_0", { source: ".datepicker-preset[data-v-75e32149]{border:none;margin:0;padding:0;width:auto;overflow:visible;background:0 0;color:inherit;font:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none}.datepicker-preset[data-v-75e32149]:active,.datepicker-preset[data-v-75e32149]:focus{outline:0;box-shadow:0}.datepicker-preset[role=button][data-v-75e32149],.datepicker-preset[type=button][data-v-75e32149],.datepicker-preset[type=reset][data-v-75e32149],.datepicker-preset[type=submit][data-v-75e32149]{cursor:pointer}.datepicker-presets[data-v-75e32149]{position:relative;display:flex;padding:16px 24px}@media only screen and (min-width:480px){.datepicker-presets[data-v-75e32149]{padding:16px 16px 8px}}.datepicker-presets__wrapper[data-v-75e32149]{position:relative;display:grid;grid-template-columns:repeat(2,1fr);grid-auto-rows:32px;width:100%}@media only screen and (min-width:768px){.datepicker-presets__wrapper[data-v-75e32149]{grid-auto-rows:32px}}.datepicker-preset[data-v-75e32149]{position:relative;padding:0 8px;transition:opacity 450ms cubic-bezier(.23,1,.32,1);font-size:14px;line-height:14px;overflow:hidden;border-color:#eef1f8;border-style:solid;border-width:0}.datepicker-preset[data-v-75e32149]:nth-child(odd){border-width:0 1px 1px 1px}.datepicker-preset[data-v-75e32149]:nth-child(odd):first-child{border-width:1px}.datepicker-preset[data-v-75e32149]:nth-child(even){border-width:0 1px 1px 0}.datepicker-preset[data-v-75e32149]:nth-child(even):nth-child(2){border-width:1px 1px 1px 0}.datepicker-preset__effect[data-v-75e32149]{position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;transition:opacity 450ms cubic-bezier(.23,1,.32,1);z-index:-1}.datepicker-preset[data-v-75e32149]:hover:not(.datepicker-preset--disabled){color:#fff}.datepicker-preset:hover:not(.datepicker-preset--disabled) .datepicker-preset__effect[data-v-75e32149]{opacity:1}.datepicker-preset--selected[data-v-75e32149]{color:#fff;pointer-events:none}.datepicker-preset--selected .datepicker-preset__effect[data-v-75e32149]{opacity:1}.datepicker-preset--disabled[data-v-75e32149]{color:rgba(93,106,137,.2);cursor:not-allowed;pointer-events:none}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = "data-v-75e32149";
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerPresets.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$6() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerPresets = __vue_normalize__$6(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    __vue_create_injector__$6);

//
var script$7 = {
  name: 'DatePickerValidate',
  mixins: [colorable],
  props: {
    buttonValidate: {
      type: String
    },
    buttonCancel: {
      type: String
    },
    color: {
      type: String
    }
  }
};

/* script */
            var __vue_script__$7 = script$7;
            
/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker-validate"},[_c('button',{staticClass:"datepicker-validate__button",attrs:{"type":"button"},on:{"click":function($event){return _vm.$emit('cancel')}}},[_c('div',{staticClass:"datepicker-validate__effect",style:(_vm.setBackgroundColor(_vm.color))}),_vm._v(" "),_c('div',{staticClass:"datepicker-validate__name"},[_vm._v(_vm._s(_vm.buttonCancel))])]),_vm._v(" "),_c('button',{staticClass:"datepicker-validate__button",style:(_vm.setTextColor(_vm.color)),attrs:{"type":"button"},on:{"click":function($event){return _vm.$emit('validate')}}},[_c('div',{staticClass:"datepicker-validate__effect",style:(_vm.setBackgroundColor(_vm.color))}),_vm._v(" "),_c('div',{staticClass:"datepicker-validate__name"},[_vm._v(_vm._s(_vm.buttonValidate))])])])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-f4cd0eba_0", { source: ".datepicker-validate__button[data-v-f4cd0eba]{border:none;margin:0;padding:0;width:auto;overflow:visible;background:0 0;color:inherit;font:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none}.datepicker-validate__button[data-v-f4cd0eba]:active,.datepicker-validate__button[data-v-f4cd0eba]:focus{outline:0;box-shadow:0}.datepicker-validate__button[role=button][data-v-f4cd0eba],.datepicker-validate__button[type=button][data-v-f4cd0eba],.datepicker-validate__button[type=reset][data-v-f4cd0eba],.datepicker-validate__button[type=submit][data-v-f4cd0eba]{cursor:pointer}.datepicker-validate[data-v-f4cd0eba]{position:relative;display:flex;align-items:center;justify-content:flex-end;padding:0 24px 8px 24px}@media only screen and (min-width:768px){.datepicker-validate[data-v-f4cd0eba]{padding:8px 16px}}.datepicker--rtl .datepicker-validate[data-v-f4cd0eba]{direction:rtl}.datepicker-validate__button[data-v-f4cd0eba]{position:relative;display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;height:36px;min-width:44px;font-size:14px;font-weight:500;border-radius:4px;padding:6px 8px;outline:0;text-transform:uppercase;text-decoration:none;overflow:hidden}.datepicker-validate__button+.datepicker-validate__button[data-v-f4cd0eba]{margin-left:8px}.datepicker-validate__button:hover .datepicker-validate__effect[data-v-f4cd0eba]{opacity:.1}.datepicker-validate__effect[data-v-f4cd0eba]{position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;transition:opacity 450ms cubic-bezier(.23,1,.32,1);z-index:-1}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = "data-v-f4cd0eba";
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerValidate.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$7() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatePickerValidate = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    __vue_create_injector__$7);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) { keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } return keys; }

function _objectSpread$1(target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i] != null ? arguments$1[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var script$8 = {
  name: 'DatepickerAgenda',
  mixins: [detachable, colorable, dynamicPosition],
  directives: {
    ClickOutside: ClickOutside
  },
  components: {
    DatePickerHeader: DatePickerHeader,
    DatePickerControls: DatePickerControls,
    DatePickerYearMonth: DatePickerYearMonth,
    DatePickerPresets: DatePickerPresets,
    DatePickerValidate: DatePickerValidate
  },
  props: {
    name: {
      type: String
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    date: {
      type: [Date, Object]
    },
    type: {
      type: String,
      default: 'date'
    },
    validate: {
      type: Boolean,
      default: false
    },
    buttonValidate: {
      type: String
    },
    buttonCancel: {
      type: String
    },
    range: {
      type: Boolean,
      default: false
    },
    rangePresets: {
      type: Array,
      default: undefined
    },
    rangeHeaderText: {
      type: String,
      default: String
    },
    formatHeader: {
      type: String
    },
    rtl: {
      type: Boolean,
      default: false
    },
    locale: {
      type: Object
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean
    },
    fullscreenMobile: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    minDate: {
      type: [String, Number, Date]
    },
    maxDate: {
      type: [String, Number, Date]
    },
    zIndex: {
      type: Number
    }
  },
  data: function data() {
    return {
      height: 'auto',
      isActive: false,
      currentDate: undefined,
      mutableDate: undefined,
      transitionDaysName: 'slide-h-next',
      transitionLabelName: 'slide-v-next',
      shouldShowYearMonthSelector: undefined,
      yearMonthMode: undefined,
      rangeCurrentHoveredDay: undefined
    };
  },
  computed: {
    styles: function styles() {
      return {
        height: this.height,
        // left, top, orign from @/mixins/dynamicPosition
        left: "".concat(this.left, "px"),
        top: "".concat(this.top, "px"),
        transformOrigin: this.origin,
        zIndex: this.inline ? null : this.zIndex
      };
    },
    classes: function classes() {
      return {
        'datepicker--rtl': this.rtl,
        'datepicker--inline': this.inline,
        'datepicker--fixed': this.fixed,
        'datepicker--fullscreen-mobile': this.fullscreenMobile,
        'datepicker--no-header': this.noHeader,
        'datepicker--validate': this.validate,
        'datepicker--range': this.range,
        'datepicker--range-selecting': this.range && !this.isRangeSelected
      };
    },
    weekDays: function weekDays() {
      return getWeekDays(this.locale);
    },
    spaceBeforeFirstDay: function spaceBeforeFirstDay() {
      return toConsumableArray(Array(this.currentDate.getWeekStart()).keys());
    },
    classWeeks: function classWeeks() {
      // if yearMonth selector is opened, stop changing class
      if (this.shouldShowYearMonthSelector) { return; }

      if (this.currentDate.getDays().length + this.currentDate.start.weekday() > 35) {
        return "has-6-weeks";
      }

      return "has-5-weeks";
    },
    shouldShowAgenda: function shouldShowAgenda() {
      return this.isVisible || this.inline;
    },
    shouldShowBottomSheet: function shouldShowBottomSheet() {
      return this.innerWidth < 480 && this.fullscreenMobile && this.isVisible;
    },
    isRangeSelected: function isRangeSelected() {
      if (!this.range) { return false; }
      return Object.values(this.mutableDate).every(function (date) {
        return Boolean(date);
      });
    }
  },
  destroyed: function destroyed() {
    clearAllBodyScrollLocks();
  },
  watch: {
    // When date change (after being visibled),
    // should update currentDate & mutableDate
    date: {
      handler: 'updateDate'
    },
    // When type change (after being visibled),
    // should update shouldShowYearMonthSelector
    type: function type(newType) {
      this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(newType);
      this.yearMonthMode = newType;
    },
    // When agenda should be visible => init currentDate & mutableDate
    // When agenda should be hidden => reset data
    shouldShowAgenda: {
      handler: function () {
        var _handler = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee(show) {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!show) {
                    _context.next = 12;
                    break;
                  }

                  // init data when datepicker is visible
                  this.updateDate(this.date);
                  this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(this.type);
                  this.yearMonthMode = this.type; // If inline, we don't need to update position

                  if (!this.inline) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt("return");

                case 6:
                  _context.next = 8;
                  return this.$nextTick();

                case 8:
                  this.initDetach(); // from @/mixins/detachable

                  this.initResizeListener(); // from @/mixins/dynamicPosition

                  this.updatePosition(); // from @/mixins/dynamicPosition

                  return _context.abrupt("return");

                case 12:

                  this.removeResizeListener();
                  Object.assign(this.$data, this.$options.data());

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function handler(_x) {
          return _handler.apply(this, arguments);
        }

        return handler;
      }(),
      immediate: true
    },
    // When bottomSheet is visibled => lock body scroll
    // When bottomSheet is hidden => unlock body scroll
    shouldShowBottomSheet: {
      handler: function () {
        var _handler2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee2(show) {
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.$nextTick();

                case 2:
                  if (!show) {
                    _context2.next = 6;
                    break;
                  }

                  this.height = "".concat(computeAgendaHeight(this.$refs.content, this.classWeeks), "px");
                  disableBodyScroll(this.$el.querySelector('.datepicker-content'));
                  return _context2.abrupt("return");

                case 6:
                  this.height = 'auto';
                  enableBodyScroll();

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function handler(_x2) {
          return _handler2.apply(this, arguments);
        }

        return handler;
      }(),
      immediate: true
    },
    // When bottomSheet is visibled and visibled mode is 'year'
    // => should keep scroll disabled, but should allow scroll into years list
    yearMonthMode: function yearMonthMode(mode) {
      if (mode === 'year' && this.shouldShowBottomSheet) {
        enableBodyScroll(this.$el.querySelector('.datepicker-content'));
        disableBodyScroll(this.$el.querySelector('.datepicker-year-month'));
      }
    }
  },
  methods: {
    setActive: function setActive() {
      this.isActive = true;
    },
    isSelected: function isSelected(day) {
      if (this.range) {
        var date = [].concat(toConsumableArray(this.mutableDate.start ? [this.mutableDate.start.startOf('day').unix()] : []), toConsumableArray(this.mutableDate.end ? [this.mutableDate.end.startOf('day').unix()] : []));
        return date.includes(day.unix());
      }

      return this.mutableDate && this.mutableDate.startOf('day').unix() === day.unix();
    },
    isBetween: function isBetween(day) {
      if (!this.mutableDate.start && !this.mutableDate.end) { return false; }
      return isBetweenDates(day, this.mutableDate.start, this.mutableDate.end);
    },
    isInRange: function isInRange(day) {
      if (!this.rangeCurrentHoveredDay) { return; }

      if (isBeforeDate(this.rangeCurrentHoveredDay, this.mutableDate.end)) {
        return isBetweenDates(day, this.rangeCurrentHoveredDay, this.mutableDate.end);
      }

      return isBetweenDates(day, this.mutableDate.start, this.rangeCurrentHoveredDay);
    },
    firstInRange: function firstInRange(day) {
      return this.mutableDate.start && this.mutableDate.start.startOf('day').unix() === day.unix();
    },
    lastInRange: function lastInRange(day) {
      return this.mutableDate.end && this.mutableDate.end.startOf('day').unix() === day.unix();
    },
    isDisabled: function isDisabled(day) {
      return isBeforeDate(day, this.minDate) || isAfterDate(day, this.maxDate);
    },
    isToday: function isToday(day) {
      return isDateToday(day);
    },
    selectDate: function selectDate(day) {
      if (this.range) {
        // If rangeIsSelected or no dates selected => should reset, and select start
        if (this.isRangeSelected || !this.mutableDate.start && !this.mutableDate.end) {
          this.mutableDate = {
            start: day.clone(),
            end: undefined
          };
          return;
        } // else, should update missing range (start or end)


        this.emitSelectedDate(_objectSpread$1({}, this.mutableDate, {}, this.mutableDate.start && {
          end: day.clone()
        }, {}, this.mutableDate.end && {
          start: day.clone()
        }));
        return;
      }

      var direction = isDateAfter(day, this.mutableDate) ? 'next' : 'prev';
      this.updateTransitions(direction);
      this.emitSelectedDate(day.clone());
    },
    emitSelectedDate: function emitSelectedDate(date) {
      this.mutableDate = date;
      this.rangeCurrentHoveredDay = undefined;
      this.$emit('selectDate', this.mutableDate);
    },
    updateDate: function updateDate(date) {
      var newDate = formatDate(this.range ? date.end || date.start : date, this.locale); // If today's date is after maxDate, we should show maxDate month

      if (isAfterDate(newDate, this.maxDate)) {
        newDate = formatDate(this.maxDate, this.locale);
      }

      if (this.range) {
        this.currentDate = new PickerDate(newDate.month(), newDate.year(), this.locale);
        this.mutableDate = date;
        return;
      }

      var month = this.type === 'quarter' ? convertQuarterToMonth(newDate.month()) : newDate.month();
      this.currentDate = new PickerDate(month, newDate.year(), this.locale);
      this.mutableDate = date && date.month(month).clone();
    },
    changeMonth: function changeMonth(direction) {
      var month = this.currentDate.month + (direction === 'prev' ? -1 : +1);
      var year = this.currentDate.year;

      if (month > 11 || month < 0) {
        year += direction === 'prev' ? -1 : +1;
        month = direction === 'prev' ? 11 : 0;
      }

      this.updateTransitions(direction);
      this.currentDate = new PickerDate(month, year, this.locale);
    },
    changeYear: function changeYear(direction) {
      var year = this.currentDate.year + (direction === 'prev' ? -1 : +1);
      var month = this.currentDate.month;
      this.updateTransitions(direction);
      this.currentDate = new PickerDate(month, year, this.locale);
    },
    updateTransitions: function updateTransitions(direction) {
      this.transitionDaysName = "slide-h-".concat(direction);
      this.transitionLabelName = "slide-v-".concat(direction);
    },
    showYearMonthSelector: function showYearMonthSelector(mode) {
      this.yearMonthMode = mode;
      this.shouldShowYearMonthSelector = true;
    },
    hideYearMonthSelector: function hideYearMonthSelector() {
      this.yearMonthMode = undefined;
      this.shouldShowYearMonthSelector = false;
    },
    selectedYearMonth: function selectedYearMonth(value, mode) {
      var _generateMonthAndYear = generateMonthAndYear(value, this.currentDate, mode),
          year = _generateMonthAndYear.year,
          month = _generateMonthAndYear.month;

      this.currentDate = new PickerDate(month, year, this.locale);

      if (mode === 'year') {
        this.yearMonthMode = this.type === 'date' ? 'month' : this.type;
        return;
      }

      if (this.type === 'month' || this.type === 'quarter') {
        var newDate = formatDateWithYearAndMonth(this.currentDate.year, this.currentDate.month);
        this.selectDate(newDate);
        return;
      }

      this.hideYearMonthSelector();
    },
    handleMouseMove: function handleMouseMove(event) {
      // Should handle mouse move if :
      // -> not a range mode
      // -> range already selected
      if (!this.range || this.isRangeSelected) { return; }
      var target = event.target; // Should handle mouse move only on those classes

      var CLASSES = ['datepicker-day', 'datepicker-day__effect'];
      if (typeof target.className === 'string' && !CLASSES.includes(target.className.split(' ')[0])) { return; } // If tagName is SPAN, it means we should select parent

      if (target.tagName === 'SPAN') {
        target = event.target.parentNode;
      } // Don't do anything if we are on the same day


      var isADate = target.dataset.date;
      var isCurrentHoveredDay = target.dataset.date === this.rangeCurrentHoveredDay;
      if (!isADate || isCurrentHoveredDay) { return; }
      this.rangeCurrentHoveredDay = target.dataset.date; // Should update mutableDate if
      // -> hovered day is before or after current selected date

      if (isBeforeDate(this.rangeCurrentHoveredDay, this.mutableDate.start)) {
        this.mutableDate = {
          start: undefined,
          end: this.mutableDate.start
        };
      } else if (isAfterDate(this.rangeCurrentHoveredDay, this.mutableDate.end)) {
        this.mutableDate = {
          start: this.mutableDate.end,
          end: undefined
        };
      }
    }
  }
};

/* script */
            var __vue_script__$8 = script$8;
            
/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"datepicker-transition","appear":""},on:{"after-enter":_vm.setActive}},[(_vm.shouldShowAgenda)?_c('div',{directives:[{name:"click-outside",rawName:"v-click-outside",value:({ handler : function () { return _vm.$emit('close'); }, isActive: !_vm.inline && _vm.isActive }),expression:"{ handler : () => $emit('close'), isActive: !inline && isActive }"}],ref:"content",staticClass:"datepicker",class:_vm.classes,style:(_vm.styles),attrs:{"name":"datepicker-slide"},on:{"mousemove":_vm.handleMouseMove,"click":function($event){$event.stopPropagation();}}},[(_vm.fullscreenMobile)?_c('div',{staticClass:"datepicker-title"},[_c('p',[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('button',{attrs:{"type":"button"},on:{"click":function($event){return _vm.$emit('close')}}},[_c('svg',{attrs:{"aria-hidden":"true","focusable":"false","data-prefix":"fal","data-icon":"times","role":"img","xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 320 512"}},[_c('path',{attrs:{"fill":"currentColor","d":"M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"}})])])]):_vm._e(),_vm._v(" "),(!_vm.noHeader)?_c('DatePickerHeader',{attrs:{"mutable-date":_vm.mutableDate,"transition-name":_vm.transitionLabelName,"color":_vm.color,"locale":_vm.locale,"format-header":_vm.formatHeader,"mode":_vm.yearMonthMode,"range":_vm.range,"range-header-text":_vm.rangeHeaderText},on:{"showYearMonthSelector":_vm.showYearMonthSelector,"hideYearMonthSelector":_vm.hideYearMonthSelector}}):_vm._e(),_vm._v(" "),(_vm.range)?_c('DatePickerPresets',{attrs:{"range-presets":_vm.rangePresets,"mutable-date":_vm.mutableDate,"min-date":_vm.minDate,"max-date":_vm.maxDate,"color":_vm.color,"locale":_vm.locale},on:{"updateRange":_vm.emitSelectedDate}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"datepicker-content"},[_c('DatePickerControls',{attrs:{"rtl":_vm.rtl,"current-date":_vm.currentDate,"transition-name":_vm.transitionLabelName,"color":_vm.color,"mode":"month"},on:{"changeVisibleDate":_vm.changeMonth,"showYearMonthSelector":_vm.showYearMonthSelector}}),_vm._v(" "),_c('div',{staticClass:"datepicker-week"},_vm._l((_vm.weekDays),function(day,index){return _c('div',{key:index,staticClass:"datepicker-weekday"},[_vm._v("\n          "+_vm._s(day)+"\n        ")])}),0),_vm._v(" "),_c('TransitionGroup',{staticClass:"datepicker-days__wrapper",class:_vm.classWeeks,attrs:{"tag":"div","name":_vm.transitionDaysName}},_vm._l(([_vm.currentDate]),function(dates){return _c('div',{key:dates.month,staticClass:"datepicker-days"},[_vm._l((_vm.spaceBeforeFirstDay),function(day){return _c('div',{key:("space-" + day),staticClass:"datepicker-day"})}),_vm._v(" "),_vm._l((_vm.currentDate.getDays()),function(day,index){return _c('button',{key:index,staticClass:"datepicker-day",class:{
              'selected' : _vm.isSelected(day) && !_vm.isDisabled(day),
              'between': _vm.range && _vm.isBetween(day),
              'in-range': _vm.range && _vm.isInRange(day),
              'first': _vm.range && _vm.firstInRange(day),
              'last': _vm.range && _vm.lastInRange(day) && Boolean(_vm.mutableDate.end),
              'select-start': _vm.range && !_vm.mutableDate.start,
              'select-end': _vm.range && _vm.mutableDate.start && !_vm.mutableDate.end,
              'disabled': _vm.isDisabled(day),
            },attrs:{"disabled":_vm.isDisabled(day),"data-date":day.format('YYYY-MM-DD'),"type":"button"},on:{"click":function($event){return _vm.selectDate(day)}}},[(_vm.isToday(day))?_c('span',{staticClass:"datepicker-day--current"}):_vm._e(),_vm._v(" "),_c('span',{staticClass:"datepicker-day__effect",style:(_vm.setBackgroundColor(_vm.color))}),_vm._v(" "),_c('span',{staticClass:"datepicker-day__text"},[_vm._v(_vm._s(day.format('D')))])])})],2)}),0),_vm._v(" "),(_vm.shouldShowYearMonthSelector)?_c('DatePickerYearMonth',{attrs:{"mode":_vm.yearMonthMode,"range":_vm.range,"current-date":_vm.currentDate,"mutable-date":_vm.mutableDate,"transition-name":_vm.transitionDaysName,"show-year-month-selector":_vm.showYearMonthSelector,"color":_vm.color,"min-date":_vm.minDate,"max-date":_vm.maxDate},on:{"changeYear":_vm.changeYear,"selectedYearMonth":_vm.selectedYearMonth}}):_vm._e()],1),_vm._v(" "),(_vm.validate)?_c('DatePickerValidate',{attrs:{"button-validate":_vm.buttonValidate,"button-cancel":_vm.buttonCancel,"color":_vm.color},on:{"cancel":function($event){return _vm.$emit('close')},"validate":function($event){return _vm.$emit('validateDate')}}}):_vm._e()],1):_vm._e()])};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$8 = function (inject) {
    if (!inject) { return }
    inject("data-v-3317b17c_0", { source: ".datepicker *,.datepicker ::after,.datepicker ::before{box-sizing:border-box}", map: undefined, media: undefined })
,inject("data-v-3317b17c_1", { source: ".datepicker-days .datepicker-day[data-v-3317b17c]{border:none;margin:0;padding:0;width:auto;overflow:visible;background:0 0;color:inherit;font:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none}.datepicker-days .datepicker-day[data-v-3317b17c]:active,.datepicker-days .datepicker-day[data-v-3317b17c]:focus{outline:0;box-shadow:0}.datepicker-days .datepicker-day[role=button][data-v-3317b17c],.datepicker-days .datepicker-day[type=button][data-v-3317b17c],.datepicker-days .datepicker-day[type=reset][data-v-3317b17c],.datepicker-days .datepicker-day[type=submit][data-v-3317b17c]{cursor:pointer}.slide-h-next-enter-active[data-v-3317b17c],.slide-h-next-leave-active[data-v-3317b17c],.slide-h-prev-enter-active[data-v-3317b17c],.slide-h-prev-leave-active[data-v-3317b17c]{position:absolute;transition:transform .3s,opacity .3s}.slide-h-next-enter[data-v-3317b17c],.slide-h-prev-leave-to[data-v-3317b17c]{transform:translateX(100%);opacity:0}.slide-h-next-leave-to[data-v-3317b17c],.slide-h-prev-enter[data-v-3317b17c]{transform:translateX(-100%);opacity:0}.datepicker--rtl .slide-h-next-enter[data-v-3317b17c],.datepicker--rtl .slide-h-prev-leave-to[data-v-3317b17c]{transform:translateX(-100%)}.datepicker--rtl .slide-h-next-leave-to[data-v-3317b17c],.datepicker--rtl .slide-h-prev-enter[data-v-3317b17c]{transform:translateX(100%)}.slide-v-next-enter-active[data-v-3317b17c],.slide-v-next-leave-active[data-v-3317b17c],.slide-v-prev-enter-active[data-v-3317b17c],.slide-v-prev-leave-active[data-v-3317b17c]{position:absolute;transition:transform .3s,opacity .3s}.slide-v-next-enter[data-v-3317b17c],.slide-v-prev-leave-to[data-v-3317b17c]{transform:translateY(100%);opacity:0}.slide-v-next-leave-to[data-v-3317b17c],.slide-v-prev-enter[data-v-3317b17c]{transform:translateY(-100%);opacity:0}.yearMonth-enter-active[data-v-3317b17c],.yearMonth-leave-active[data-v-3317b17c]{position:absolute;transition:opacity .3s}.yearMonth-enter[data-v-3317b17c],.yearMonth-leave-to[data-v-3317b17c]{opacity:0}.datepicker[data-v-3317b17c]{position:absolute;display:flex;flex-direction:column;width:290px;left:0;top:100%;will-change:transform;background-color:#fff;border-radius:6px;box-shadow:0 2px 8px rgba(50,50,93,.2);box-sizing:border-box}.datepicker[data-v-3317b17c]:active,.datepicker[data-v-3317b17c]:focus{outline:0}@media only screen and (min-width:768px){.datepicker[data-v-3317b17c]{width:315px}}.datepicker--inline[data-v-3317b17c]{position:relative;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.datepicker--fixed[data-v-3317b17c]{position:fixed}@media only screen and (max-width:479px){.datepicker--fullscreen-mobile[data-v-3317b17c]{position:fixed;top:auto!important;bottom:0!important;left:0!important;right:0!important;width:100%;border-radius:12px 12px 0 0}@supports (padding-bottom:constant(safe-area-inset-bottom)){.datepicker--fullscreen-mobile[data-v-3317b17c]{--safe-area-inset-bottom:constant(safe-area-inset-bottom);padding-bottom:var(--safe-area-inset-bottom)}}@supports (padding-bottom:env(safe-area-inset-bottom)){.datepicker--fullscreen-mobile[data-v-3317b17c]{--safe-area-inset-bottom:env(safe-area-inset-bottom);padding-bottom:var(--safe-area-inset-bottom)}}.datepicker--fullscreen-mobile .datepicker-header[data-v-3317b17c]{border-radius:0}}.datepicker-title[data-v-3317b17c]{position:relative;display:flex;justify-content:space-between;align-items:center;min-height:48px;padding:0 0 0 24px;border-radius:12px 12px 0 0}@media only screen and (min-width:480px){.datepicker-title[data-v-3317b17c]{display:none}}.datepicker-title p[data-v-3317b17c]{margin:0}.datepicker-title button[data-v-3317b17c]{position:relative;flex:0 0 40px;height:48px;width:48px;padding:0 16px 0 8px;border:none;outline:0;background-color:transparent;user-select:none}@media only screen and (min-width:768px){.datepicker-title button[data-v-3317b17c]{height:56px;width:56px}}.datepicker-title button svg[data-v-3317b17c]{width:24px;height:24px}.datepicker-content[data-v-3317b17c]{position:relative;display:flex;flex-direction:column;flex:1 1 auto}.datepicker-week[data-v-3317b17c]{display:flex;font-size:12px;line-height:12px;font-weight:500;margin:8px 24px;color:rgba(0,0,0,.38)}@media only screen and (min-width:768px){.datepicker-week[data-v-3317b17c]{margin:8px 16px}}.datepicker--rtl .datepicker-week[data-v-3317b17c]{direction:rtl}.datepicker-week .datepicker-weekday[data-v-3317b17c]{width:calc((100% / 7) - .1px);text-align:center}@media only screen and (min-width:768px){.datepicker-week .datepicker-weekday[data-v-3317b17c]{width:40px}}.datepicker-days__wrapper[data-v-3317b17c]{position:relative;height:180px;margin:0 24px 8px;overflow:hidden;transition:height .3s cubic-bezier(.23,1,.32,1)}@media only screen and (min-width:768px){.datepicker-days__wrapper[data-v-3317b17c]{margin:0 16px 8px;height:200px}}.datepicker-days__wrapper.has-6-weeks[data-v-3317b17c]{height:216px}@media only screen and (min-width:768px){.datepicker-days__wrapper.has-6-weeks[data-v-3317b17c]{height:240px}}.datepicker--validate .datepicker-days__wrapper[data-v-3317b17c]{margin:0 24px}@media only screen and (min-width:768px){.datepicker--validate .datepicker-days__wrapper[data-v-3317b17c]{margin:0 16px}}.datepicker-days[data-v-3317b17c]{display:flex;flex-wrap:wrap;overflow:hidden;width:100%}.datepicker--rtl .datepicker-days[data-v-3317b17c]{direction:rtl}.datepicker-days .datepicker-day[data-v-3317b17c]{position:relative;width:calc((100% / 7) - .1px);height:36px;line-height:1;font-size:12px;float:left;text-align:center;color:rgba(0,0,0,.87);font-weight:500;transition:color 450ms cubic-bezier(.23,1,.32,1);overflow:hidden}@media only screen and (min-width:768px){.datepicker-days .datepicker-day[data-v-3317b17c]{width:calc((100% / 7) - .1px);height:40px}}.datepicker-days .datepicker-day[data-v-3317b17c]:hover:not(.disabled){color:#fff}.datepicker-days .datepicker-day:hover:not(.disabled) .datepicker-day__effect[data-v-3317b17c]{transform:translateX(-50%) scale(1);opacity:.5}.datepicker-days .datepicker-day.between[data-v-3317b17c]:not(.disabled),.datepicker-days .datepicker-day.in-range[data-v-3317b17c]:not(.disabled){color:#fff}.datepicker-days .datepicker-day.between:not(.disabled) .datepicker-day__effect[data-v-3317b17c],.datepicker-days .datepicker-day.in-range:not(.disabled) .datepicker-day__effect[data-v-3317b17c]{transform:translateX(-50%);left:0;width:calc(100% + 1px);border-radius:0;opacity:.5}.datepicker-days .datepicker-day.between:not(.disabled) .datepicker-day__effect[data-v-3317b17c]:before,.datepicker-days .datepicker-day.in-range:not(.disabled) .datepicker-day__effect[data-v-3317b17c]:before{opacity:1;left:50%}.datepicker-days .datepicker-day.selected[data-v-3317b17c]{color:#fff}.datepicker-days .datepicker-day.selected:hover:not(.disabled) .datepicker-day__effect[data-v-3317b17c]{opacity:1}.datepicker-days .datepicker-day.selected .datepicker-day__effect[data-v-3317b17c]{transform:translateX(-50%);opacity:1}.datepicker-days .datepicker-day.first .datepicker-day__effect[data-v-3317b17c],.datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect[data-v-3317b17c]{opacity:1}.datepicker-days .datepicker-day.first .datepicker-day__effect[data-v-3317b17c]:before,.datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect[data-v-3317b17c]:before{opacity:.5;left:50%}.datepicker--rtl .datepicker-days .datepicker-day.first .datepicker-day__effect[data-v-3317b17c]:before,.datepicker--rtl .datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect[data-v-3317b17c]:before{left:-50%}.datepicker-days .datepicker-day.last .datepicker-day__effect[data-v-3317b17c],.datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect[data-v-3317b17c]{opacity:1}.datepicker-days .datepicker-day.last .datepicker-day__effect[data-v-3317b17c]:before,.datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect[data-v-3317b17c]:before{opacity:.5;left:-50%}.datepicker--rtl .datepicker-days .datepicker-day.last .datepicker-day__effect[data-v-3317b17c]:before,.datepicker--rtl .datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect[data-v-3317b17c]:before{left:50%}.datepicker-days .datepicker-day.first.last .datepicker-day__effect[data-v-3317b17c]:before{opacity:0}.datepicker-days .datepicker-day.disabled[data-v-3317b17c]{cursor:default;color:rgba(0,0,0,.26)}.datepicker-days .datepicker-day.disabled:hover .datepicker-day__effect[data-v-3317b17c],.datepicker-days .datepicker-day.disabled:hover .datepicker-day__effect[data-v-3317b17c]:before{opacity:0!important}.datepicker-days .datepicker-day--current[data-v-3317b17c]{position:absolute;top:1px;left:50%;transform:translateX(-50%);width:34px;height:34px;border-radius:50%;border:1px solid currentColor}@media only screen and (min-width:768px){.datepicker-days .datepicker-day--current[data-v-3317b17c]{top:4px;width:36px;height:36px}}.datepicker-days .datepicker-day__effect[data-v-3317b17c]{position:absolute;top:1px;left:50%;width:34px;height:34px;border-radius:50%;transition:all 450ms cubic-bezier(.23,1,.32,1);transition-property:transform,opacity;transform:translateX(-50%) scale(0)}@media only screen and (min-width:768px){.datepicker-days .datepicker-day__effect[data-v-3317b17c]{top:4px;width:36px;height:36px}}.datepicker--range .datepicker-days .datepicker-day__effect[data-v-3317b17c]:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background-color:inherit;opacity:0}.datepicker--range-selecting .datepicker-days .datepicker-day__effect[data-v-3317b17c]{transform:translateX(-50%) scale(0);opacity:0;transition:none}.datepicker-days .datepicker-day__text[data-v-3317b17c]{position:relative;vertical-align:sub}.datepicker-transition-enter-active[data-v-3317b17c]:not(.datepicker--inline),.datepicker-transition-leave-active[data-v-3317b17c]:not(.datepicker--inline){opacity:1;transition:all .3s;transition-property:transform,opacity;transform:scale(1)}@media only screen and (max-width:479px){.datepicker-transition-enter-active:not(.datepicker--inline).datepicker--fullscreen-mobile[data-v-3317b17c],.datepicker-transition-leave-active:not(.datepicker--inline).datepicker--fullscreen-mobile[data-v-3317b17c]{transform:translateY(0)}}.datepicker-transition-enter[data-v-3317b17c]:not(.datepicker--inline),.datepicker-transition-leave-to[data-v-3317b17c]:not(.datepicker--inline){opacity:0;transform:scale(0)}@media only screen and (max-width:479px){.datepicker-transition-enter:not(.datepicker--inline).datepicker--fullscreen-mobile[data-v-3317b17c],.datepicker-transition-leave-to:not(.datepicker--inline).datepicker--fullscreen-mobile[data-v-3317b17c]{transform:translateY(100%)}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$8 = "data-v-3317b17c";
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerAgenda.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$8() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$8.styles || (__vue_create_injector__$8.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatepickerAgenda = __vue_normalize__$8(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    __vue_create_injector__$8);

//
var script$9 = {
  name: 'DatePicker',
  components: {
    DatePickerCustomInput: DatePickerCustomInput,
    DatePickerOverlay: DatePickerOverlay,
    DatepickerAgenda: DatepickerAgenda
  },
  props: {
    id: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: 'datepicker'
    },
    // Validation Buttons
    validate: {
      type: Boolean,
      default: false
    },
    buttonValidate: {
      type: String,
      default: 'Ok'
    },
    buttonCancel: {
      type: String,
      default: 'Cancel'
    },
    // type (date, month, quarter, year picker)
    type: {
      type: String,
      default: 'date'
    },
    // Range
    range: {
      type: Boolean,
      default: false
    },
    rangeInputText: {
      type: String,
      default: '%d ~ %d'
    },
    rangeHeaderText: {
      type: String,
      default: 'From %d To %d'
    },
    rangePresets: {
      type: Array,
      default: undefined
    },
    // Current Value from v-model
    value: {
      type: [String, Object, Number, Date]
    },
    // Format
    format: {
      type: String,
      default: undefined
    },
    formatHeader: {
      type: String,
      default: undefined
    },
    formatOutput: {
      type: String,
      default: undefined
    },
    // Show/hide datepicker
    visible: {
      type: Boolean,
      default: false
    },
    // Right-to-Left
    rtl: {
      type: Boolean,
      default: false
    },
    // Sets the locale.
    locale: {
      type: Object,
      default: function _default() {
        return {
          lang: getDefaultLocale()
        };
      }
    },
    placeholder: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    // Applies specified color to the control
    color: {
      type: String,
      default: '#4f88ff'
    },
    // Allowed dates
    minDate: {
      type: [String, Number, Date]
    },
    maxDate: {
      type: [String, Number, Date]
    },
    // Disabled all datepicker
    disabled: {
      type: Boolean,
      default: false
    },
    // Inline
    inline: {
      type: Boolean,
      default: false
    },
    // fixed
    fixed: {
      type: Boolean,
      default: false
    },
    // Set if header in agenda should be visible
    noHeader: {
      type: Boolean,
      default: false
    },
    // Allow to hide input (to use a button instead)
    noInput: {
      type: Boolean,
      default: false
    },
    // Responsive bottom sheet
    fullscreenMobile: {
      type: Boolean,
      default: false
    },
    // tabindex
    tabindex: {
      type: [String, Number],
      default: '0'
    },
    // Specificy a z-index for agenda & overlay
    zIndex: {
      type: Number,
      default: 1
    },
    // attachTo
    attachTo: {
      validator: validateAttachTarget,
      default: 'body'
    }
  },
  data: function data() {
    return {
      date: undefined,
      isVisible: undefined
    };
  },
  computed: {
    // use a computed to have a dynamicId for each instance
    componentId: function componentId() {
      return this.id || "datepicker_".concat(generateRandomId());
    },
    // If format isnt specificed, select default format from type
    inputFormat: function inputFormat() {
      if (!this.format) { return getDefaultInputFormat(this.range ? 'range' : this.type); }
      return this.format;
    },
    headerFormat: function headerFormat() {
      if (!this.formatHeader) { return getDefaultHeaderFormat(this.range ? 'range' : this.type); }
      return this.formatHeader;
    },
    outputFormat: function outputFormat() {
      if (!this.formatOutput) { return getDefaultOutputFormat(this.range ? 'range' : this.type); }
      return this.formatOutput;
    },
    dateFormatted: function dateFormatted() {
      return initDate(this.value, {
        isRange: this.range,
        locale: this.locale,
        format: this.outPutFormat
      });
    }
  },
  watch: {
    value: {
      handler: 'initDate',
      immediate: true
    },
    visible: {
      handler: function handler(isVisible) {
        this.isVisible = isVisible;
      },
      immediate: true
    },
    locale: {
      handler: function handler(newLocale) {
        setLocaleLang(newLocale);
      },
      immediate: true
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.hideDatePicker();
    this.$emit('onDestroy');
  },
  methods: {
    toggleDatepicker: function toggleDatepicker() {
      if (this.isVisible) {
        this.hideDatePicker();
        return;
      }

      this.showDatePicker();
    },
    showDatePicker: function showDatePicker() {
      if (this.disabled) { return; }
      this.initDate(this.value);
      this.isVisible = true;
      this.$emit('onOpen');
    },
    hideDatePicker: function hideDatePicker() {
      if (!this.isVisible) { return; }
      this.isVisible = false;
      clearAllBodyScrollLocks();
      this.$emit('onClose');
    },
    initDate: function initDate$1(date) {
      this.date = initDate(date, {
        isRange: this.range,
        locale: this.locale,
        format: this.outPutFormat
      });
    },
    changeDate: function changeDate(date) {
      this.date = date;
      if (this.validate) { return; }
      this.validateDate(date);
    },
    validateDate: function validateDate() {
      this.$emit('input', formatDateToSend(this.date, this.outputFormat, this.range));
      this.$emit('onChange');
      this.hideDatePicker();
    }
  }
};

/* script */
            var __vue_script__$9 = script$9;
            
/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker-container",class:{ 'datepicker-container--active' : _vm.isVisible }},[(!_vm.inline)?_c('DatePickerCustomInput',{attrs:{"id":_vm.componentId,"name":_vm.name,"date":_vm.dateFormatted,"type":_vm.type,"format":_vm.inputFormat,"range":_vm.range,"range-input-text":_vm.rangeInputText,"locale":_vm.locale,"placeholder":_vm.placeholder,"color":_vm.color,"disabled":_vm.disabled,"tabindex":_vm.tabindex,"no-input":_vm.noInput},on:{"toggleDatepicker":_vm.toggleDatepicker,"focus":_vm.showDatePicker}}):_vm._e(),_vm._v(" "),_c('DatePickerOverlay',{attrs:{"isVisible":_vm.isVisible,"fullscreen-mobile":_vm.fullscreenMobile,"attach-to":_vm.attachTo,"z-index":_vm.zIndex},on:{"close":_vm.hideDatePicker}}),_vm._v(" "),_c('DatepickerAgenda',{attrs:{"name":_vm.name,"isVisible":_vm.isVisible,"date":_vm.date,"type":_vm.type,"validate":_vm.validate,"button-cancel":_vm.buttonCancel,"button-validate":_vm.buttonValidate,"range":_vm.range,"range-header-text":_vm.rangeHeaderText,"range-presets":_vm.rangePresets,"format-header":_vm.headerFormat,"rtl":_vm.rtl,"locale":_vm.locale,"no-header":_vm.noHeader,"inline":_vm.inline,"fixed":_vm.fixed,"fullscreen-mobile":_vm.fullscreenMobile,"color":_vm.color,"min-date":_vm.minDate,"max-date":_vm.maxDate,"attach-to":_vm.attachTo,"z-index":_vm.zIndex + 1},on:{"selectDate":_vm.changeDate,"validateDate":_vm.validateDate,"close":_vm.hideDatePicker}})],1)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-1a1013da_0", { source: ".datepicker-container *,.datepicker-container ::after,.datepicker-container ::before{box-sizing:border-box}", map: undefined, media: undefined })
,inject("data-v-1a1013da_1", { source: ".datepicker-container[data-v-1a1013da]{position:relative;display:flex;flex-direction:row;align-items:center;width:auto;cursor:pointer;box-sizing:border-box}.datepicker-container[data-v-1a1013da]:active,.datepicker-container[data-v-1a1013da]:focus{outline:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = "data-v-1a1013da";
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* component normalizer */
  function __vue_normalize__$9(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePicker.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$9() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__$9.styles || (__vue_create_injector__$9.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var VueDatePicker = __vue_normalize__$9(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    __vue_create_injector__$9);

var install = function install(Vue) {
  Vue.component('VueDatePicker', VueDatePicker);
  Vue.component('vue-datepicker', VueDatePicker);
}; // Plugin


var plugin = {
  // eslint-disable-next-line no-undef
  version: "0.1.8-rc.7",
  install: install
};

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export { VueDatePicker };
