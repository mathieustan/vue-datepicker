import dayjs from 'dayjs';
import { clearAllBodyScrollLocks, enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

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
      if (!isCssColor(color)) return;
      return {
        'background-color': "".concat(color),
        'border-color': "".concat(color)
      };
    },
    setTextColor: function setTextColor(color) {
      if (!isCssColor(color)) return;
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
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { attrs: { for: _vm.id } }, [
    _c(
      "svg",
      {
        attrs: {
          "aria-hidden": "true",
          focusable: "false",
          "data-prefix": "fal",
          "data-icon": "calendar-alt",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 448 512"
        }
      },
      [
        _c("path", {
          attrs: {
            fill: _vm.color,
            d:
              "M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"
          }
        })
      ]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5a5d4481_0", { source: "label[data-v-5a5d4481] {\n  cursor: inherit;\n}\nsvg[data-v-5a5d4481] {\n  display: flex;\n  font-size: 1em;\n  height: 1em;\n  width: 0.875em;\n  overflow: visible;\n  vertical-align: -0.125em;\n  margin-bottom: 2px;\n}\n\n/*# sourceMappingURL=DatePickerCalendarIcon.vue.map */", map: {"version":3,"sources":["/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerCalendarIcon.vue","DatePickerCalendarIcon.vue"],"names":[],"mappings":"AA8BA;EACA,eAAA;AAAA;AAEA;EACA,aAAA;EACA,cAAA;EACA,WAAA;EACA,cAAA;EACA,iBAAA;EACA,wBAAA;EACA,kBAAA;AAAA;;AC5BA,qDAAqD","file":"DatePickerCalendarIcon.vue","sourcesContent":[null,"label {\n  cursor: inherit; }\n\nsvg {\n  display: flex;\n  font-size: 1em;\n  height: 1em;\n  width: 0.875em;\n  overflow: visible;\n  vertical-align: -0.125em;\n  margin-bottom: 2px; }\n\n/*# sourceMappingURL=DatePickerCalendarIcon.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5a5d4481";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerCalendarIcon.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
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
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
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
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
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
!function(e,t){module.exports=t();}(commonjsGlobal,function(){var e="year";return function(t,i,n){var r=i.prototype;r.week=function(t){if(void 0===t&&(t=null),null!==t)return this.add(7*(t-this.week()),"day");var i=n(this).endOf(e);if(6!==i.day()&&11===this.month()&&31-this.date()<=i.day())return 1;var r=n(this).startOf(e),d=r.subtract(r.day(),"day").subtract(1,"millisecond"),u=this.diff(d,"week",!0);return Math.ceil(u)},r.weeks=function(e){return void 0===e&&(e=null),this.week(e)};}});
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



var locales = /*#__PURE__*/Object.freeze({
  fr: localeObject$1,
  en: localeObject,
  es: localeObject$2,
  de: localeObject$3
});

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

    var locale = locales[lang] || localeObject;
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
function getDefaultLocale() {
  return (window.navigator.userLanguage || window.navigator.language || 'en').substr(0, 2);
}
function setLocaleLang(_ref2) {
  var lang = _ref2.lang;
  var locale = locales[lang] || localeObject;
  dayjs.locale(locale);
}
function getWeekDays(_ref3) {
  var lang = _ref3.lang,
      weekDays = _ref3.weekDays;
  var locale = locales[lang] || localeObject;

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
  var locale = locales[lang] || localeObject;
  return dayjs(date).locale(locale).format(format);
}
function formatDate(date, _ref5) {
  var lang = _ref5.lang;
  var locale = locales[lang] || localeObject;
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
  var locale = locales[lang] || localeObject;

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
// - isAfterDate : Return Boolean if date is after endDate (from props)
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
function isBetweenDates(date, startDate, endDate) {
  return isAfterDate(date, startDate) && isBeforeDate(date, endDate);
}
function isDateAfter(newDate, oldDate) {
  return dayjs(newDate).isAfter(dayjs(oldDate));
}
function generateDateRangeWithoutDisabled(_ref8, minDate, endDate) {
  var start = _ref8.start,
      end = _ref8.end;
  return generateDateRange(start, end).filter(function (date) {
    return date.isSameOrAfter(minDate, 'day') && date.isSameOrBefore(dayjs(endDate, 'day'));
  });
} // -----------------------------------------
// Generate Dates
// - generateDateRange : Return an array of dates
// - generateMonthAndYear : Return month & year for modes (date, month, quarter)
// - convertMonthToQuarter : Return a number for quarter
// -----------------------------------------

function generateDateRange(startDate, endDate) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
  var start = dayjs.isDayjs(startDate) ? startDate : dayjs(startDate);
  var end = dayjs.isDayjs(endDate) ? endDate : dayjs(endDate);
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
      month: convertMonthToQuarter(value)
    };
  }

  return {
    year: currentDate.year,
    month: value
  };
}
function convertMonthToQuarter(month) {
  return month * 3;
}

//
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
      type: Object
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
    }
  },
  computed: {
    classes: function classes() {
      return {
        'datepicker-input--disabled': this.disabled,
        'datepicker-input--range': this.range
      };
    },
    // Displayed Date
    dateFormatted: function dateFormatted() {
      if (!this.date) return;

      if (this.range) {
        return getRangeDatesFormatted(this.date, this.locale, this.format);
      }

      return formatDateWithLocale(this.date, this.locale, this.format);
    }
  }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "datepicker-input",
      class: _vm.classes,
      on: {
        mousedown: function($event) {
          return _vm.$emit("toggleDatepicker")
        }
      }
    },
    [
      _c("DatePickerCalendarIcon", {
        attrs: {
          id: _vm.id,
          color:
            _vm.date && !_vm.disabled ? _vm.color : "rgba(93, 106, 137, 0.5)",
          disabled: _vm.disabled
        }
      }),
      _vm._v(" "),
      _c("input", {
        style: _vm.setTextColor(
          !_vm.disabled ? _vm.color : "rgba(93, 106, 137, 0.5)"
        ),
        attrs: {
          id: _vm.id,
          name: _vm.id,
          disabled: _vm.disabled,
          placeholder: _vm.placeholder,
          tabindex: _vm.tabindex,
          type: "text",
          readonly: ""
        },
        domProps: { value: _vm.dateFormatted },
        on: {
          focus: function($event) {
            return _vm.$emit("focus")
          }
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-3f03a89f_0", { source: "/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.datepicker-input[data-v-3f03a89f] {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.datepicker-input--disabled[data-v-3f03a89f] {\n    cursor: not-allowed;\n}\ninput[type='hidden'][data-v-3f03a89f] {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  height: 1px;\n  width: 1px;\n  border: 0;\n  clip: rect(0 0 0 0);\n  margin: -1px;\n  padding: 0;\n  outline: 0;\n  -webkit-appearance: none;\n  overflow: hidden;\n}\ninput[type=\"text\"][data-v-3f03a89f] {\n  cursor: pointer;\n  border: none;\n  box-shadow: none;\n  outline: 0;\n  font-size: 16px;\n  line-height: 19px;\n  margin-left: 8px;\n}\ninput[type=\"text\"][data-v-3f03a89f]:focus, input[type=\"text\"][data-v-3f03a89f]:active {\n    outline: 0;\n    box-shadow: none;\n}\ninput[type=\"text\"][data-v-3f03a89f]:disabled, input[type=\"text\"][disabled][data-v-3f03a89f] {\n    cursor: not-allowed;\n}\ninput[type=\"text\"].placeholder[data-v-3f03a89f] {\n    color: rgba(0, 0, 0, 0.4);\n}\ninput[type=\"text\"][data-v-3f03a89f]::placeholder {\n    color: rgba(0, 0, 0, 0.4);\n}\ninput[type=\"text\"][data-v-3f03a89f]:-moz-placeholder {\n    color: rgba(0, 0, 0, 0.4);\n}\ninput[type=\"text\"][data-v-3f03a89f]::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.4);\n}\ninput[type=\"text\"][data-v-3f03a89f]:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.4);\n}\ninput[type=\"text\"][data-v-3f03a89f]::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.4);\n}\n.datepicker-input--range input[type=\"text\"][data-v-3f03a89f] {\n    min-width: 310px;\n}\n\n/*# sourceMappingURL=DatePickerCustomInput.vue.map */", map: {"version":3,"sources":["DatePickerCustomInput.vue","/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerCustomInput.vue"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;CAgBC;AC0DD;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,2BAAA;EACA,mBAAA;AAAA;AAEA;IACA,mBAAA;AAAA;AAIA;EACA,kBAAA;EACA,SAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;EACA,SAAA;EACA,mBAAA;EACA,YAAA;EACA,UAAA;EACA,UAAA;EACA,wBAAA;EACA,gBAAA;AAAA;AAGA;EACA,eAAA;EACA,YAAA;EACA,gBAAA;EACA,UAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;AAAA;AAPA;IAWA,UAAA;IACA,gBAAA;AAAA;AAZA;IAiBA,mBAAA;AAAA;AApCA;IAwCA,yBAAA;AAAA;AAvCA;IAuCA,yBAAA;AAAA;AAtCA;IAsCA,yBAAA;AAAA;AArBA;IAqBA,yBAAA;AAAA;AApCA;IAoCA,yBAAA;AAAA;AAnCA;IAmCA,yBAAA;AAAA;AAGA;IACA,gBAAA;AAAA;;AD1DA,oDAAoD","file":"DatePickerCustomInput.vue","sourcesContent":["/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.datepicker-input {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center; }\n  .datepicker-input--disabled {\n    cursor: not-allowed; }\n\ninput[type='hidden'] {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  height: 1px;\n  width: 1px;\n  border: 0;\n  clip: rect(0 0 0 0);\n  margin: -1px;\n  padding: 0;\n  outline: 0;\n  -webkit-appearance: none;\n  overflow: hidden; }\n\ninput[type=\"text\"] {\n  cursor: pointer;\n  border: none;\n  box-shadow: none;\n  outline: 0;\n  font-size: 16px;\n  line-height: 19px;\n  margin-left: 8px; }\n  input[type=\"text\"]:focus, input[type=\"text\"]:active {\n    outline: 0;\n    box-shadow: none; }\n  input[type=\"text\"]:disabled, input[type=\"text\"][disabled] {\n    cursor: not-allowed; }\n  input[type=\"text\"].placeholder {\n    color: rgba(0, 0, 0, 0.4); }\n  input[type=\"text\"]::placeholder {\n    color: rgba(0, 0, 0, 0.4); }\n  input[type=\"text\"]:-moz-placeholder {\n    color: rgba(0, 0, 0, 0.4); }\n  input[type=\"text\"]::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.4); }\n  input[type=\"text\"]:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.4); }\n  input[type=\"text\"]::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.4); }\n  .datepicker-input--range input[type=\"text\"] {\n    min-width: 310px; }\n\n/*# sourceMappingURL=DatePickerCustomInput.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-3f03a89f";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerCustomInput.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
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
            if (delegateResult === ContinueSentinel) continue;
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

var detachable = {
  props: {
    attachTo: {
      type: String,
      default: '#app'
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
      if (!this.$refs.content || this.hasDetached) return;
      var target = document.querySelector(this.attachTo);

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
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "transition",
    { attrs: { name: "overlay-transition", appear: "" } },
    [
      _vm.shouldShowOverlay
        ? _c("div", {
            ref: "content",
            staticClass: "datepicker-overlay",
            style: _vm.styles,
            on: {
              click: function($event) {
                return _vm.$emit("close")
              }
            }
          })
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-3fb95e6c_0", { source: "/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.datepicker-overlay[data-v-3fb95e6c] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n@media only screen and (min-width: 480px) {\n.datepicker-overlay[data-v-3fb95e6c] {\n      display: none;\n}\n}\n.overlay-transition-enter-active[data-v-3fb95e6c], .overlay-transition-leave-active[data-v-3fb95e6c] {\n  opacity: 1;\n  transition: opacity 300ms;\n}\n.overlay-transition-leave-to[data-v-3fb95e6c], .overlay-transition-enter[data-v-3fb95e6c] {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=DatePickerOverlay.vue.map */", map: {"version":3,"sources":["DatePickerOverlay.vue","/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerOverlay.vue"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;CAgBC;ACkCD;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,oCAAA;AAAA;AAiBA;AAvBA;MASA,aAAA;AAAA;AAEA;AAGA;EAEA,UAAA;EACA,yBAAA;AAAA;AAEA;EAEA,UAAA;AAAA;;ADpCA,gDAAgD","file":"DatePickerOverlay.vue","sourcesContent":["/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.datepicker-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5); }\n  @media only screen and (min-width: 480px) {\n    .datepicker-overlay {\n      display: none; } }\n\n.overlay-transition-enter-active, .overlay-transition-leave-active {\n  opacity: 1;\n  transition: opacity 300ms; }\n\n.overlay-transition-leave-to, .overlay-transition-enter {\n  opacity: 0; }\n\n/*# sourceMappingURL=DatePickerOverlay.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-3fb95e6c";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerOverlay.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

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
    if (JSON.stringify(binding.value) === JSON.stringify(binding.oldValue)) return;
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
  if (!isFunction && !isObject) return;
  var isActive = !(bindingValue.isActive === false);
  if (!isActive) return;
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
  if (instanceIndex === -1) return;
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

function getDynamicPosition(element, parent) {
  // -------------------------------
  // Select parent (datepicker container) to get position
  // -------------------------------
  var parentRect = parent.getBoundingClientRect();
  var parentOffsets = getParentOffset(parentRect);
  var spacesAroundParent = getSpacesAroundParent(parentRect); // -------------------------------
  // Detect space around element
  // -------------------------------

  var placesAvailable = detectPlacesAvailable(element, spacesAroundParent);
  var isThereEnoughSpaceBelow = placesAvailable.isThereEnoughSpaceBelow,
      isThereEnoughtSpaceLeft = placesAvailable.isThereEnoughtSpaceLeft,
      isThereEnoughtSpaceRight = placesAvailable.isThereEnoughtSpaceRight,
      isThereEnoughSpaceAbove = placesAvailable.isThereEnoughSpaceAbove; // -------------------------------
  // If there is not enought space above, below, left & right
  // placement => MIDDLE
  // -------------------------------

  if (!isThereEnoughSpaceBelow && !isThereEnoughtSpaceLeft && !isThereEnoughSpaceAbove && !isThereEnoughtSpaceRight) {
    return getElementCenteredPosition(element);
  }

  return getElementPosition(element, parentRect, parentOffsets, spacesAroundParent, placesAvailable);
} // -------------------------------
// HELPERS
// -------------------------------


function getParentOffset(parentRect) {
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    parentOffsetTop: parentRect.top + scrollTop,
    parentOffsetLeft: parentRect.left + scrollLeft
  };
}

function getSpacesAroundParent(parentRect) {
  return {
    spaceBelow: window.innerHeight - parentRect.bottom,
    spaceAbove: parentRect.top,
    spaceLeft: parentRect.left,
    spaceRight: window.innerWidth - parentRect.left - parentRect.width
  };
}

function detectPlacesAvailable(element, _ref) {
  var spaceBelow = _ref.spaceBelow,
      spaceAbove = _ref.spaceAbove,
      spaceLeft = _ref.spaceLeft,
      spaceRight = _ref.spaceRight;
  return {
    isThereEnoughSpaceBelow: spaceBelow - element.offsetHeight > 0,
    isThereEnoughtSpaceLeft: spaceLeft - element.offsetWidth > 0,
    isThereEnoughtSpaceRight: spaceRight - element.offsetWidth > 0,
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

function getElementPosition(element, parentRect, parentOffsets, spacesAroundParent, placesAvailable) {
  var elementHeight = element.offsetHeight;
  var elementWidth = element.offsetWidth;
  var parentOffsetTop = parentOffsets.parentOffsetTop,
      parentOffsetLeft = parentOffsets.parentOffsetLeft;
  var spaceAbove = spacesAroundParent.spaceAbove;
  var isThereEnoughSpaceBelow = placesAvailable.isThereEnoughSpaceBelow,
      isThereEnoughtSpaceLeft = placesAvailable.isThereEnoughtSpaceLeft,
      isThereEnoughtSpaceRight = placesAvailable.isThereEnoughtSpaceRight,
      isThereEnoughSpaceAbove = placesAvailable.isThereEnoughSpaceAbove;
  var missingSpaceToShowAbove = Math.abs(spaceAbove - elementHeight);
  var couldBeShowBelowOrAbove = isThereEnoughSpaceBelow || isThereEnoughSpaceAbove;

  if (!couldBeShowBelowOrAbove && isThereEnoughtSpaceRight) {
    return {
      top: parentOffsetTop + (missingSpaceToShowAbove + parentRect.height) - elementHeight,
      left: parentOffsetLeft + parentRect.width,
      origin: 'left center'
    };
  }

  if (!couldBeShowBelowOrAbove && isThereEnoughtSpaceLeft) {
    return {
      top: parentOffsetTop + (missingSpaceToShowAbove + parentRect.height) - elementHeight,
      left: parentOffsetLeft - elementWidth,
      origin: 'right center'
    };
  }

  if (couldBeShowBelowOrAbove && isThereEnoughtSpaceLeft && !isThereEnoughtSpaceRight) {
    return {
      top: parentOffsetTop + (isThereEnoughSpaceBelow ? parentRect.height : -elementHeight),
      left: parentOffsetLeft + parentRect.width - elementWidth,
      origin: isThereEnoughSpaceBelow ? 'top right' : 'bottom right'
    };
  }

  if (couldBeShowBelowOrAbove && !isThereEnoughtSpaceLeft && !isThereEnoughtSpaceRight) {
    return {
      top: parentOffsetTop + (isThereEnoughSpaceBelow ? parentRect.height : -elementHeight),
      left: window.pageXOffset + (window.innerWidth - element.offsetWidth) / 2,
      origin: isThereEnoughSpaceBelow ? 'top center' : 'bottom center'
    };
  }

  return {
    top: parentOffsetTop + (isThereEnoughSpaceBelow ? parentRect.height : -elementHeight),
    left: parentOffsetLeft,
    origin: isThereEnoughSpaceBelow ? 'top left' : 'bottom left'
  };
}

var dynamicPosition = {
  data: function data() {
    return {
      offset: 28,
      left: 0,
      top: 0,
      origin: 'top center',
      innerWidth: window.innerWidth
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.inline) return; // We're using a `requestAnimationFrame()` for optimal performance.

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

      var _getDynamicPosition = getDynamicPosition(this.$refs.content, document.querySelector('.datepicker-container--active'), this.offset),
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
      if (!this.mutableDate) return '-';
      return formatDateWithLocale(this.mutableDate, this.locale, 'YYYY');
    },
    dateFormatted: function dateFormatted() {
      if (this.range && this.rangeHeaderText) {
        var textSplitted = this.rangeHeaderText.split('%d').reduce(function (texts, text, index) {
          return objectSpread({}, texts, index === 0 && {
            start: text.trim()
          }, index === 1 && {
            end: text.trim()
          });
        }, {});
        var datesSplitted = getRangeDatesFormatted(this.mutableDate, this.locale, this.formatHeader).split(' ~ ');
        return ["".concat(textSplitted.start, " ").concat(datesSplitted[0]), "".concat(textSplitted.end, " ").concat(datesSplitted[1])];
      }

      if (!this.mutableDate) return '--';
      return formatDateWithLocale(this.mutableDate, this.locale, this.formatHeader);
    }
  }
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "datepicker-header",
      class: _vm.classes,
      style: _vm.setBackgroundColor(_vm.color)
    },
    [
      !_vm.range
        ? _c(
            "div",
            {
              staticClass: "datepicker-header__year",
              class: { "datepicker-header__year--active": _vm.mode === "year" }
            },
            [_vm._v("\n    " + _vm._s(_vm.year) + "\n  ")]
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.range
        ? _c(
            "div",
            { staticClass: "datepicker-header__wrap" },
            [
              _c(
                "TransitionGroup",
                {
                  staticClass: "datepicker-header__date",
                  class: {
                    "datepicker-header__date--active": _vm.mode !== "year"
                  },
                  attrs: { tag: "div", name: _vm.transitionName }
                },
                _vm._l([_vm.dateFormatted], function(dateFormatted) {
                  return _c("span", { key: dateFormatted }, [
                    _vm._v("\n        " + _vm._s(dateFormatted) + "\n      ")
                  ])
                }),
                0
              )
            ],
            1
          )
        : _c(
            "div",
            { staticClass: "datepicker-header__wrap" },
            [
              _c(
                "TransitionGroup",
                {
                  staticClass: "datepicker-header__date",
                  class: {
                    "datepicker-header__date--active": _vm.mutableDate.start
                  },
                  attrs: { tag: "div", name: _vm.transitionName }
                },
                _vm._l([_vm.dateFormatted[0]], function(dateFormatted) {
                  return _c("span", { key: dateFormatted }, [
                    _vm._v("\n        " + _vm._s(dateFormatted) + "\n      ")
                  ])
                }),
                0
              ),
              _vm._v(" "),
              _c(
                "TransitionGroup",
                {
                  staticClass: "datepicker-header__date",
                  class: {
                    "datepicker-header__date--active": _vm.mutableDate.end
                  },
                  attrs: { tag: "div", name: _vm.transitionName }
                },
                _vm._l([_vm.dateFormatted[1]], function(dateFormatted) {
                  return _c("span", { key: dateFormatted }, [
                    _vm._v("\n        " + _vm._s(dateFormatted) + "\n      ")
                  ])
                }),
                0
              )
            ],
            1
          )
    ]
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-2edfcdaf_0", { source: "/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active[data-v-2edfcdaf],\n.slide-h-next-enter-active[data-v-2edfcdaf],\n.slide-h-prev-leave-active[data-v-2edfcdaf],\n.slide-h-prev-enter-active[data-v-2edfcdaf] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-h-next-enter[data-v-2edfcdaf], .slide-h-prev-leave-to[data-v-2edfcdaf] {\n  transform: translateX(100%);\n  opacity: 0;\n}\n.slide-h-next-leave-to[data-v-2edfcdaf], .slide-h-prev-enter[data-v-2edfcdaf] {\n  transform: translateX(-100%);\n  opacity: 0;\n}\n.slide-v-next-leave-active[data-v-2edfcdaf],\n.slide-v-next-enter-active[data-v-2edfcdaf],\n.slide-v-prev-leave-active[data-v-2edfcdaf],\n.slide-v-prev-enter-active[data-v-2edfcdaf] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-v-next-enter[data-v-2edfcdaf], .slide-v-prev-leave-to[data-v-2edfcdaf] {\n  transform: translateY(100%);\n  opacity: 0;\n}\n.slide-v-next-leave-to[data-v-2edfcdaf], .slide-v-prev-enter[data-v-2edfcdaf] {\n  transform: translateY(-100%);\n  opacity: 0;\n}\n.yearMonth-leave-active[data-v-2edfcdaf], .yearMonth-enter-active[data-v-2edfcdaf] {\n  position: absolute;\n  transition: opacity .3s;\n}\n.yearMonth-enter[data-v-2edfcdaf], .yearMonth-leave-to[data-v-2edfcdaf] {\n  opacity: 0;\n}\n.datepicker-header[data-v-2edfcdaf] {\n  color: white;\n  padding: 16px;\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n  flex-wrap: wrap;\n  line-height: 1;\n  min-height: 80px;\n  max-height: 80px;\n  border-radius: 6px 6px 0 0;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-header[data-v-2edfcdaf] {\n      min-height: 85px;\n      max-height: 85px;\n}\n}\n.datepicker-header--range .datepicker-header__wrap[data-v-2edfcdaf] {\n    flex: 1 1 auto;\n    flex-direction: column;\n    justify-content: space-between;\n}\n.datepicker-header--range .datepicker-header__date[data-v-2edfcdaf] {\n    font-size: 18px;\n    height: calc(18px + 8px);\n}\n@media only screen and (min-width: 768px) {\n.datepicker-header--range .datepicker-header__date[data-v-2edfcdaf] {\n        font-size: 22px;\n        height: calc(22px + 8px);\n}\n}\n.datepicker-header__year[data-v-2edfcdaf] {\n    align-items: center;\n    display: inline-flex;\n    font-size: 14px;\n    margin-bottom: 8px;\n    opacity: 0.6;\n    transition: opacity .3s;\n}\n.datepicker-header__year.datepicker-header__year--active[data-v-2edfcdaf] {\n      opacity: 1;\n}\n.datepicker-header__wrap[data-v-2edfcdaf] {\n    position: relative;\n    display: flex;\n    width: 100%;\n}\n.datepicker-header__date[data-v-2edfcdaf] {\n    position: relative;\n    display: flex;\n    width: 100%;\n    font-size: 22px;\n    height: calc(22px + 8px);\n    text-align: left;\n    overflow: hidden;\n    padding-bottom: 8px;\n    margin-bottom: -8px;\n    opacity: 0.6;\n    transition: opacity .3s;\n}\n.datepicker-header__date[data-v-2edfcdaf]:hover, .datepicker-header__date.datepicker-header__date--active[data-v-2edfcdaf] {\n      opacity: 1;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-header__date[data-v-2edfcdaf] {\n        font-size: 28px;\n        height: calc(28px + 8px);\n}\n}\n\n/*# sourceMappingURL=DatePickerHeader.vue.map */", map: {"version":3,"sources":["DatePickerHeader.vue","/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerHeader.vue"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;CAgBC;AACD;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;EACE,kBAAkB;EAClB,uBAAuB;AAAE;AAE3B;EACE,UAAU;AAAE;ACyDd;EACA,YAAA;EACA,aAAA;EACA,aAAA;EACA,8BAAA;EACA,sBAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,gBAAA;EACA,0BAAA;AAAA;ADtDE;AC4CF;MAaA,gBAAA;MACA,gBAAA;AAAA;AA8DA;AA3DA;IAEA,cAAA;IACA,sBAAA;IACA,8BAAA;AAAA;AAJA;IAOA,eAAA;IACA,wBAAA;AAAA;AD1DI;ACkDJ;QAWA,eAAA;QACA,wBAAA;AAAA;AAEA;AAGA;IACA,mBAAA;IACA,oBAAA;IACA,eAAA;IACA,kBAAA;IACA,YAAA;IACA,uBAAA;AAAA;AANA;MASA,UAAA;AAAA;AAIA;IACA,kBAAA;IACA,aAAA;IACA,WAAA;AAAA;AAGA;IACA,kBAAA;IACA,aAAA;IACA,WAAA;IACA,eAAA;IACA,wBAAA;IACA,gBAAA;IACA,gBAAA;IACA,mBAAA;IACA,mBAAA;IACA,YAAA;IACA,uBAAA;AAAA;AAXA;MAeA,UAAA;AAAA;ADtEI;ACuDJ;QAmBA,eAAA;QACA,wBAAA;AAAA;AAEA;;ADxEA,+CAA+C","file":"DatePickerHeader.vue","sourcesContent":["/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active,\n.slide-h-next-enter-active,\n.slide-h-prev-leave-active,\n.slide-h-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-h-next-enter, .slide-h-prev-leave-to {\n  transform: translateX(100%);\n  opacity: 0; }\n\n.slide-h-next-leave-to, .slide-h-prev-enter {\n  transform: translateX(-100%);\n  opacity: 0; }\n\n.slide-v-next-leave-active,\n.slide-v-next-enter-active,\n.slide-v-prev-leave-active,\n.slide-v-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-v-next-enter, .slide-v-prev-leave-to {\n  transform: translateY(100%);\n  opacity: 0; }\n\n.slide-v-next-leave-to, .slide-v-prev-enter {\n  transform: translateY(-100%);\n  opacity: 0; }\n\n.yearMonth-leave-active, .yearMonth-enter-active {\n  position: absolute;\n  transition: opacity .3s; }\n\n.yearMonth-enter, .yearMonth-leave-to {\n  opacity: 0; }\n\n.datepicker-header {\n  color: white;\n  padding: 16px;\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n  flex-wrap: wrap;\n  line-height: 1;\n  min-height: 80px;\n  max-height: 80px;\n  border-radius: 6px 6px 0 0; }\n  @media only screen and (min-width: 768px) {\n    .datepicker-header {\n      min-height: 85px;\n      max-height: 85px; } }\n  .datepicker-header--range .datepicker-header__wrap {\n    flex: 1 1 auto;\n    flex-direction: column;\n    justify-content: space-between; }\n  .datepicker-header--range .datepicker-header__date {\n    font-size: 18px;\n    height: calc(18px + 8px); }\n    @media only screen and (min-width: 768px) {\n      .datepicker-header--range .datepicker-header__date {\n        font-size: 22px;\n        height: calc(22px + 8px); } }\n  .datepicker-header__year {\n    align-items: center;\n    display: inline-flex;\n    font-size: 14px;\n    margin-bottom: 8px;\n    opacity: 0.6;\n    transition: opacity .3s; }\n    .datepicker-header__year.datepicker-header__year--active {\n      opacity: 1; }\n  .datepicker-header__wrap {\n    position: relative;\n    display: flex;\n    width: 100%; }\n  .datepicker-header__date {\n    position: relative;\n    display: flex;\n    width: 100%;\n    font-size: 22px;\n    height: calc(22px + 8px);\n    text-align: left;\n    overflow: hidden;\n    padding-bottom: 8px;\n    margin-bottom: -8px;\n    opacity: 0.6;\n    transition: opacity .3s; }\n    .datepicker-header__date:hover, .datepicker-header__date.datepicker-header__date--active {\n      opacity: 1; }\n    @media only screen and (min-width: 768px) {\n      .datepicker-header__date {\n        font-size: 28px;\n        height: calc(28px + 8px); } }\n\n/*# sourceMappingURL=DatePickerHeader.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-2edfcdaf";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerHeader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$3() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
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
  props: {
    transitionName: {
      type: String
    },
    currentDate: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'month'
    },
    minDate: {
      type: [String, Number, Date]
    },
    endDate: {
      type: [String, Number, Date]
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
      return isBeforeDate(this.yearFormatted, this.minDate, 'year') || isAfterDate(this.yearFormatted, this.endDate, 'year');
    },
    isPreviousDateDisabled: function isPreviousDateDisabled() {
      if (this.mode !== 'year') return false;
      return isBeforeDate(Number(this.yearFormatted) - 1, this.minDate, 'year');
    },
    isNextDateDisabled: function isNextDateDisabled() {
      if (this.mode !== 'year') return false;
      return isAfterDate(Number(this.yearFormatted) + 1, this.endDate, 'year');
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
            const __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "datepicker-controls" }, [
    _c(
      "button",
      {
        staticClass: "datepicker-controls__prev",
        attrs: { disabled: _vm.isPreviousDateDisabled, type: "button" },
        on: {
          click: function($event) {
            return _vm.changeVisibleDate("prev")
          }
        }
      },
      [
        _c("svg", { attrs: { viewBox: "0 0 24 24" } }, [
          _c("path", {
            attrs: { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" }
          })
        ])
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "datepicker-controls__wrapper" },
      [
        _vm.mode === "month"
          ? _c(
              "TransitionGroup",
              {
                staticClass: "datepicker-controls__month",
                attrs: { name: _vm.transitionName, tag: "span" }
              },
              _vm._l([_vm.currentDate.month], function(month) {
                return _c(
                  "div",
                  { key: month, staticClass: "datepicker-controls__label" },
                  [
                    _c(
                      "button",
                      {
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.showYearMonthSelector("month")
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.monthFormatted) +
                            "\n        "
                        )
                      ]
                    )
                  ]
                )
              }),
              0
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "TransitionGroup",
          {
            staticClass: "datepicker-controls__year",
            class: { "datepicker-controls__year--center": _vm.mode === "year" },
            attrs: { name: _vm.transitionName, tag: "span" }
          },
          _vm._l([_vm.currentDate.year], function(year) {
            return _c(
              "div",
              { key: year, staticClass: "datepicker-controls__label" },
              [
                _c(
                  "button",
                  {
                    attrs: { disabled: _vm.isYearDisabled, type: "button" },
                    on: {
                      click: function($event) {
                        return _vm.showYearMonthSelector("year")
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.yearFormatted) +
                        "\n          "
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "datepicker-controls__next",
        attrs: { disabled: _vm.isNextDateDisabled, type: "button" },
        on: {
          click: function($event) {
            return _vm.changeVisibleDate("next")
          }
        }
      },
      [
        _c("svg", { attrs: { viewBox: "0 0 24 24" } }, [
          _c("path", {
            attrs: { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" }
          })
        ])
      ]
    )
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-3245de56_0", { source: "/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active[data-v-3245de56],\n.slide-h-next-enter-active[data-v-3245de56],\n.slide-h-prev-leave-active[data-v-3245de56],\n.slide-h-prev-enter-active[data-v-3245de56] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-h-next-enter[data-v-3245de56], .slide-h-prev-leave-to[data-v-3245de56] {\n  transform: translateX(100%);\n  opacity: 0;\n}\n.slide-h-next-leave-to[data-v-3245de56], .slide-h-prev-enter[data-v-3245de56] {\n  transform: translateX(-100%);\n  opacity: 0;\n}\n.slide-v-next-leave-active[data-v-3245de56],\n.slide-v-next-enter-active[data-v-3245de56],\n.slide-v-prev-leave-active[data-v-3245de56],\n.slide-v-prev-enter-active[data-v-3245de56] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-v-next-enter[data-v-3245de56], .slide-v-prev-leave-to[data-v-3245de56] {\n  transform: translateY(100%);\n  opacity: 0;\n}\n.slide-v-next-leave-to[data-v-3245de56], .slide-v-prev-enter[data-v-3245de56] {\n  transform: translateY(-100%);\n  opacity: 0;\n}\n.yearMonth-leave-active[data-v-3245de56], .yearMonth-enter-active[data-v-3245de56] {\n  position: absolute;\n  transition: opacity .3s;\n}\n.yearMonth-enter[data-v-3245de56], .yearMonth-leave-to[data-v-3245de56] {\n  opacity: 0;\n}\n.datepicker-controls[data-v-3245de56] {\n  position: relative;\n  display: flex;\n  height: 48px;\n  text-align: center;\n  position: relative;\n  width: 100%;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-controls[data-v-3245de56] {\n      height: 56px;\n}\n}\n.datepicker-controls__wrapper[data-v-3245de56] {\n    position: relative;\n    overflow: hidden;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex: 1;\n}\n.datepicker-controls__month[data-v-3245de56], .datepicker-controls__year[data-v-3245de56] {\n    position: relative;\n    display: flex;\n    flex: 1;\n    align-items: center;\n}\n.datepicker-controls__month[data-v-3245de56] {\n    justify-content: flex-end;\n}\n.datepicker-controls__year[data-v-3245de56] {\n    justify-content: flex-start;\n}\n.datepicker-controls__year.datepicker-controls__year--center[data-v-3245de56] {\n      justify-content: center;\n}\n.datepicker-controls__label[data-v-3245de56] {\n    padding: 8px 4px;\n}\n.datepicker-controls__label button[data-v-3245de56] {\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      /* inherit font & color from ancestor */\n      color: inherit;\n      font: inherit;\n      /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n      line-height: normal;\n      /* Corrects font smoothing for webkit */\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      /* Corrects inability to style clickable `input` types in iOS */\n      -webkit-appearance: none;\n      position: relative;\n      display: flex;\n      font-size: 15px;\n      font-weight: 500;\n      line-height: 15px;\n      padding: 0;\n      border: none;\n      outline: none;\n      cursor: pointer;\n}\n.datepicker-controls__label button[data-v-3245de56]:focus, .datepicker-controls__label button[data-v-3245de56]:active {\n        outline: 0;\n        box-shadow: 0;\n}\n.datepicker-controls__label button[data-v-3245de56]:disabled, .datepicker-controls__label button[disabled][data-v-3245de56] {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26);\n}\n.datepicker-controls button.datepicker-controls__prev[data-v-3245de56],\n  .datepicker-controls button.datepicker-controls__next[data-v-3245de56] {\n    position: relative;\n    flex: 0 0 40px;\n    height: 48px;\n    width: 48px;\n    padding: 0 8px 0 16px;\n    border: none;\n    outline: none;\n    background-color: transparent;\n    user-select: none;\n    cursor: pointer;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-controls button.datepicker-controls__prev[data-v-3245de56],\n      .datepicker-controls button.datepicker-controls__next[data-v-3245de56] {\n        height: 56px;\n        width: 56px;\n}\n}\n.datepicker-controls button.datepicker-controls__prev[data-v-3245de56]:disabled, .datepicker-controls button.datepicker-controls__prev[disabled][data-v-3245de56],\n    .datepicker-controls button.datepicker-controls__next[data-v-3245de56]:disabled,\n    .datepicker-controls button.datepicker-controls__next[disabled][data-v-3245de56] {\n      cursor: default;\n}\n.datepicker-controls button.datepicker-controls__prev:disabled svg[data-v-3245de56], .datepicker-controls button.datepicker-controls__prev[disabled] svg[data-v-3245de56],\n      .datepicker-controls button.datepicker-controls__next:disabled svg[data-v-3245de56],\n      .datepicker-controls button.datepicker-controls__next[disabled] svg[data-v-3245de56] {\n        fill: rgba(0, 0, 0, 0.26);\n}\n.datepicker-controls button.datepicker-controls__next[data-v-3245de56] {\n    padding: 0 16px 0 8px;\n}\n.datepicker-controls svg[data-v-3245de56] {\n    width: 24px;\n    height: 24px;\n    fill: rgba(0, 0, 0, 0.87);\n    vertical-align: middle;\n}\n\n/*# sourceMappingURL=DatePickerControls.vue.map */", map: {"version":3,"sources":["DatePickerControls.vue","/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerControls.vue"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;CAgBC;AACD;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;EACE,kBAAkB;EAClB,uBAAuB;AAAE;AAE3B;EACE,UAAU;AAAE;AC2Dd;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,WAAA;AAAA;ADxDE;ACkDF;MASA,YAAA;AAAA;AA4FA;AAzFA;IACA,kBAAA;IACA,gBAAA;IACA,aAAA;IACA,uBAAA;IACA,mBAAA;IACA,OAAA;AAAA;AAGA;IAEA,kBAAA;IACA,aAAA;IACA,OAAA;IACA,mBAAA;AAAA;AAGA;IACA,yBAAA;AAAA;AAGA;IACA,2BAAA;AAAA;AADA;MAIA,uBAAA;AAAA;AAIA;IACA,gBAAA;AAAA;AADA;MDnEM,YAAY;MACZ,SAAS;MACT,UAAU;MACV,WAAW;MACX,iBAAiB;MACjB,uBAAuB;MACvB,uCAAuC;MACvC,cAAc;MACd,aAAa;MACb,4EAA4E;MCYlF,mBAAA;MAEA,uCAAA;MACA,+BAAA;MDXM,gCAAgC;MCctC,+DAAA;MACA,wBAAA;MA4CA,kBAAA;MACA,aAAA;MACA,eAAA;MACA,gBAAA;MACA,iBAAA;MACA,UAAA;MACA,YAAA;MACA,aAAA;MACA,eAAA;AAAA;AAlDA;QAEA,UAAA;QDLQ,aAAa;AAAE;ACwCvB;QAiBA,eAAA;QACA,0BAAA;AAAA;AA3DA;;IAkEA,kBAAA;IACA,cAAA;IACA,YAAA;IACA,WAAA;IACA,qBAAA;IACA,YAAA;IACA,aAAA;IACA,6BAAA;IACA,iBAAA;IACA,eAAA;AAAA;AD1DI;ACjBJ;;QA8EA,YAAA;QACA,WAAA;AAAA;AAUA;AAzFA;;;MAuFA,eAAA;AAAA;AAvFA;;;QAqFA,yBAAA;AAAA;AArFA;IA4FA,qBAAA;AAAA;AA5FA;IAgGA,WAAA;IACA,YAAA;IACA,yBAAA;IACA,sBAAA;AAAA;;AD7DA,iDAAiD","file":"DatePickerControls.vue","sourcesContent":["/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active,\n.slide-h-next-enter-active,\n.slide-h-prev-leave-active,\n.slide-h-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-h-next-enter, .slide-h-prev-leave-to {\n  transform: translateX(100%);\n  opacity: 0; }\n\n.slide-h-next-leave-to, .slide-h-prev-enter {\n  transform: translateX(-100%);\n  opacity: 0; }\n\n.slide-v-next-leave-active,\n.slide-v-next-enter-active,\n.slide-v-prev-leave-active,\n.slide-v-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-v-next-enter, .slide-v-prev-leave-to {\n  transform: translateY(100%);\n  opacity: 0; }\n\n.slide-v-next-leave-to, .slide-v-prev-enter {\n  transform: translateY(-100%);\n  opacity: 0; }\n\n.yearMonth-leave-active, .yearMonth-enter-active {\n  position: absolute;\n  transition: opacity .3s; }\n\n.yearMonth-enter, .yearMonth-leave-to {\n  opacity: 0; }\n\n.datepicker-controls {\n  position: relative;\n  display: flex;\n  height: 48px;\n  text-align: center;\n  position: relative;\n  width: 100%; }\n  @media only screen and (min-width: 768px) {\n    .datepicker-controls {\n      height: 56px; } }\n  .datepicker-controls__wrapper {\n    position: relative;\n    overflow: hidden;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex: 1; }\n  .datepicker-controls__month, .datepicker-controls__year {\n    position: relative;\n    display: flex;\n    flex: 1;\n    align-items: center; }\n  .datepicker-controls__month {\n    justify-content: flex-end; }\n  .datepicker-controls__year {\n    justify-content: flex-start; }\n    .datepicker-controls__year.datepicker-controls__year--center {\n      justify-content: center; }\n  .datepicker-controls__label {\n    padding: 8px 4px; }\n    .datepicker-controls__label button {\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      /* inherit font & color from ancestor */\n      color: inherit;\n      font: inherit;\n      /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n      line-height: normal;\n      /* Corrects font smoothing for webkit */\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      /* Corrects inability to style clickable `input` types in iOS */\n      -webkit-appearance: none;\n      position: relative;\n      display: flex;\n      font-size: 15px;\n      font-weight: 500;\n      line-height: 15px;\n      padding: 0;\n      border: none;\n      outline: none;\n      cursor: pointer; }\n      .datepicker-controls__label button:focus, .datepicker-controls__label button:active {\n        outline: 0;\n        box-shadow: 0; }\n      .datepicker-controls__label button:disabled, .datepicker-controls__label button[disabled] {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26); }\n  .datepicker-controls button.datepicker-controls__prev,\n  .datepicker-controls button.datepicker-controls__next {\n    position: relative;\n    flex: 0 0 40px;\n    height: 48px;\n    width: 48px;\n    padding: 0 8px 0 16px;\n    border: none;\n    outline: none;\n    background-color: transparent;\n    user-select: none;\n    cursor: pointer; }\n    @media only screen and (min-width: 768px) {\n      .datepicker-controls button.datepicker-controls__prev,\n      .datepicker-controls button.datepicker-controls__next {\n        height: 56px;\n        width: 56px; } }\n    .datepicker-controls button.datepicker-controls__prev:disabled, .datepicker-controls button.datepicker-controls__prev[disabled],\n    .datepicker-controls button.datepicker-controls__next:disabled,\n    .datepicker-controls button.datepicker-controls__next[disabled] {\n      cursor: default; }\n      .datepicker-controls button.datepicker-controls__prev:disabled svg, .datepicker-controls button.datepicker-controls__prev[disabled] svg,\n      .datepicker-controls button.datepicker-controls__next:disabled svg,\n      .datepicker-controls button.datepicker-controls__next[disabled] svg {\n        fill: rgba(0, 0, 0, 0.26); }\n  .datepicker-controls button.datepicker-controls__next {\n    padding: 0 16px 0 8px; }\n  .datepicker-controls svg {\n    width: 24px;\n    height: 24px;\n    fill: rgba(0, 0, 0, 0.87);\n    vertical-align: middle; }\n\n/*# sourceMappingURL=DatePickerControls.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-3245de56";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerControls.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$4() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
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
    endDate: {
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
      if (this.range || !this.mutableDate) return false;
      var selectedDate = formatDateWithYearAndMonth(this.currentDate.year, monthIndex);
      return areSameDates(this.mutableDate.format('YYYY-MM'), selectedDate.format('YYYY-MM'), this.mode);
    },
    isYearDisabled: function isYearDisabled(year) {
      return isBeforeDate(year, this.minDate, this.mode) || isAfterDate(year, this.endDate, this.mode);
    },
    isMonthOrQuarterDisabled: function isMonthOrQuarterDisabled(monthIndex) {
      var date = formatDateWithYearAndMonth(this.yearFormatted, monthIndex);
      return isBeforeDate(date, this.minDate, 'month') || isAfterDate(date, this.endDate, 'month');
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
            const __vue_script__$5 = script$5;
            
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "yearMonth", appear: "" } }, [
    _c("div", { staticClass: "datepicker-year-month" }, [
      _vm.mode === "year"
        ? _c("div", { staticClass: "datepicker-years" }, [
            _c(
              "ul",
              { staticClass: "datepicker-years__list" },
              _vm._l(_vm.getYears, function(year) {
                return _c(
                  "li",
                  {
                    key: year,
                    class: {
                      active: _vm.isSelectedYear(year),
                      disabled: _vm.isYearDisabled(year)
                    }
                  },
                  [
                    _c(
                      "button",
                      {
                        attrs: {
                          disabled: _vm.isYearDisabled(year),
                          type: "button"
                        },
                        on: {
                          click: function($event) {
                            return _vm.onSelect(year)
                          }
                        }
                      },
                      [_vm._v("\n            " + _vm._s(year) + "\n          ")]
                    )
                  ]
                )
              }),
              0
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.mode === "month" || _vm.mode === "quarter"
        ? _c(
            "div",
            { staticClass: "datepicker-months" },
            [
              _c("DatePickerControls", {
                attrs: {
                  "current-date": _vm.currentDate,
                  "transition-name": _vm.transitionName,
                  "min-date": _vm.minDate,
                  "end-date": _vm.endDate,
                  mode: "year"
                },
                on: {
                  changeVisibleDate: _vm.changeYear,
                  showYearMonthSelector: _vm.showYearMonthSelector
                }
              }),
              _vm._v(" "),
              _vm.mode === "month"
                ? [
                    _c(
                      "TransitionGroup",
                      {
                        staticClass: "datepicker-months__wrapper",
                        attrs: { tag: "div", name: _vm.transitionName }
                      },
                      _vm._l([_vm.currentDate.year], function(year) {
                        return _c(
                          "div",
                          { key: year, staticClass: "datepicker-months__list" },
                          _vm._l(_vm.getMonths, function(month, index) {
                            return _c(
                              "button",
                              {
                                key: index,
                                style: Object.assign(
                                  {},
                                  _vm.isSelectedMonthOrQuarter(index) &&
                                    _vm.setTextColor("#fff"),
                                  _vm.isSelectedMonthOrQuarter(index) &&
                                    _vm.setBackgroundColor(_vm.color)
                                ),
                                attrs: {
                                  disabled: _vm.isMonthOrQuarterDisabled(index),
                                  type: "button"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.onSelect(index)
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n            " +
                                    _vm._s(month) +
                                    "\n            "
                                )
                              ]
                            )
                          }),
                          0
                        )
                      }),
                      0
                    )
                  ]
                : _vm._e(),
              _vm._v(" "),
              _vm.mode === "quarter"
                ? [
                    _c(
                      "TransitionGroup",
                      {
                        staticClass: "datepicker-months__wrapper",
                        attrs: { tag: "div", name: _vm.transitionName }
                      },
                      _vm._l([_vm.currentDate.year], function(year) {
                        return _c(
                          "div",
                          {
                            key: year,
                            staticClass: "datepicker-quarters__list"
                          },
                          _vm._l(_vm.getQuarters, function(quarter, index) {
                            return _c(
                              "button",
                              {
                                key: index,
                                style: Object.assign(
                                  {},
                                  _vm.isSelectedMonthOrQuarter(index * 3) &&
                                    _vm.setTextColor("#fff"),
                                  _vm.isSelectedMonthOrQuarter(index * 3) &&
                                    _vm.setBackgroundColor(_vm.color)
                                ),
                                attrs: {
                                  disabled: _vm.isMonthOrQuarterDisabled(index),
                                  type: "button"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.onSelect(index)
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n            " +
                                    _vm._s(quarter) +
                                    "\n            "
                                )
                              ]
                            )
                          }),
                          0
                        )
                      }),
                      0
                    )
                  ]
                : _vm._e()
            ],
            2
          )
        : _vm._e()
    ])
  ])
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-2a790886_0", { source: "/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active[data-v-2a790886],\n.slide-h-next-enter-active[data-v-2a790886],\n.slide-h-prev-leave-active[data-v-2a790886],\n.slide-h-prev-enter-active[data-v-2a790886] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-h-next-enter[data-v-2a790886], .slide-h-prev-leave-to[data-v-2a790886] {\n  transform: translateX(100%);\n  opacity: 0;\n}\n.slide-h-next-leave-to[data-v-2a790886], .slide-h-prev-enter[data-v-2a790886] {\n  transform: translateX(-100%);\n  opacity: 0;\n}\n.slide-v-next-leave-active[data-v-2a790886],\n.slide-v-next-enter-active[data-v-2a790886],\n.slide-v-prev-leave-active[data-v-2a790886],\n.slide-v-prev-enter-active[data-v-2a790886] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-v-next-enter[data-v-2a790886], .slide-v-prev-leave-to[data-v-2a790886] {\n  transform: translateY(100%);\n  opacity: 0;\n}\n.slide-v-next-leave-to[data-v-2a790886], .slide-v-prev-enter[data-v-2a790886] {\n  transform: translateY(-100%);\n  opacity: 0;\n}\n.yearMonth-leave-active[data-v-2a790886], .yearMonth-enter-active[data-v-2a790886] {\n  position: absolute;\n  transition: opacity .3s;\n}\n.yearMonth-enter[data-v-2a790886], .yearMonth-leave-to[data-v-2a790886] {\n  opacity: 0;\n}\n.datepicker-year-month[data-v-2a790886] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: white;\n}\n@supports (padding-bottom: constant(safe-area-inset-bottom)) {\n.datepicker-year-month[data-v-2a790886] {\n      --safe-area-inset-bottom: constant(safe-area-inset-bottom);\n      padding-bottom: var(--safe-area-inset-bottom);\n}\n}\n@supports (padding-bottom: env(safe-area-inset-bottom)) {\n.datepicker-year-month[data-v-2a790886] {\n      --safe-area-inset-bottom: env(safe-area-inset-bottom);\n      padding-bottom: var(--safe-area-inset-bottom);\n}\n}\n.datepicker-years[data-v-2a790886] {\n  height: auto;\n  position: relative;\n  z-index: 0;\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n}\n.datepicker-years ul[data-v-2a790886] {\n    width: 100%;\n    font-size: 16px;\n    font-weight: 400;\n    list-style-type: none;\n    overflow-y: scroll;\n    /* has to be scroll, not auto */\n    -webkit-overflow-scrolling: touch;\n    padding: 0;\n    margin: 0;\n    text-align: center;\n}\n.datepicker-years ul li[data-v-2a790886] {\n      cursor: pointer;\n      transition: none;\n}\n.datepicker-years ul li[data-v-2a790886]:hover, .datepicker-years ul li[data-v-2a790886]:focus {\n        background-color: #eef1f8;\n}\n.datepicker-years ul li button[data-v-2a790886] {\n        position: relative;\n        border: none;\n        margin: 0;\n        padding: 0;\n        width: auto;\n        overflow: visible;\n        background: transparent;\n        /* inherit font & color from ancestor */\n        color: inherit;\n        font: inherit;\n        /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n        line-height: normal;\n        /* Corrects font smoothing for webkit */\n        -webkit-font-smoothing: inherit;\n        -moz-osx-font-smoothing: inherit;\n        /* Corrects inability to style clickable `input` types in iOS */\n        -webkit-appearance: none;\n        width: 100%;\n        padding: 8px 0;\n        cursor: pointer;\n}\n.datepicker-years ul li button[data-v-2a790886]:focus, .datepicker-years ul li button[data-v-2a790886]:active {\n          outline: 0;\n          box-shadow: 0;\n}\n.datepicker-years ul li.active button[data-v-2a790886] {\n        font-size: 26px;\n        font-weight: 500;\n        padding: 8px 0;\n}\n.datepicker-years ul li.disabled button[data-v-2a790886] {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26);\n}\n.datepicker-months[data-v-2a790886] {\n  height: auto;\n  overflow: hidden;\n  position: relative;\n  z-index: 0;\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n}\n.datepicker-months .datepicker-months__wrapper[data-v-2a790886] {\n    position: relative;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    padding: 0 8px 8px;\n}\n.datepicker-months .datepicker-months__list[data-v-2a790886],\n  .datepicker-months .datepicker-quarters__list[data-v-2a790886] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: repeat(4, 1fr);\n    grid-gap: 8px;\n    width: 100%;\n    height: 100%;\n    justify-items: center;\n    align-items: center;\n}\n.datepicker-months .datepicker-months__list button[data-v-2a790886],\n    .datepicker-months .datepicker-quarters__list button[data-v-2a790886] {\n      position: relative;\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      /* inherit font & color from ancestor */\n      color: inherit;\n      font: inherit;\n      /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n      line-height: normal;\n      /* Corrects font smoothing for webkit */\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      /* Corrects inability to style clickable `input` types in iOS */\n      -webkit-appearance: none;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-size: 12px;\n      padding: 0 20px;\n      height: 30px;\n      font-size: 15px;\n      font-weight: 500;\n      border-radius: 2px;\n      outline: none;\n      cursor: pointer;\n      transition: background-color .3s;\n}\n.datepicker-months .datepicker-months__list button[data-v-2a790886]:focus, .datepicker-months .datepicker-months__list button[data-v-2a790886]:active,\n      .datepicker-months .datepicker-quarters__list button[data-v-2a790886]:focus,\n      .datepicker-months .datepicker-quarters__list button[data-v-2a790886]:active {\n        outline: 0;\n        box-shadow: 0;\n}\n.datepicker-months .datepicker-months__list button[data-v-2a790886]:hover,\n      .datepicker-months .datepicker-quarters__list button[data-v-2a790886]:hover {\n        background-color: #eef1f8;\n}\n.datepicker-months .datepicker-months__list button[data-v-2a790886]:disabled, .datepicker-months .datepicker-months__list button[disabled][data-v-2a790886],\n      .datepicker-months .datepicker-quarters__list button[data-v-2a790886]:disabled,\n      .datepicker-months .datepicker-quarters__list button[disabled][data-v-2a790886] {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26);\n}\n.datepicker-months .datepicker-months__list button .datepicker-month--current[data-v-2a790886],\n      .datepicker-months .datepicker-quarters__list button .datepicker-month--current[data-v-2a790886] {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        margin: auto;\n        width: 100%;\n        height: 30px;\n        background-color: currentColor;\n}\n.datepicker-months .datepicker-quarters__list[data-v-2a790886] {\n    grid-template-columns: 1fr;\n    grid-template-rows: repeat(4, 1fr);\n}\n.datepicker-months .datepicker-quarters__list button[data-v-2a790886] {\n      height: 100%;\n      width: 100%;\n}\n\n/*# sourceMappingURL=DatePickerYearMonth.vue.map */", map: {"version":3,"sources":["DatePickerYearMonth.vue","/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerYearMonth.vue"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;CAgBC;AACD;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;EACE,kBAAkB;EAClB,uBAAuB;AAAE;AAE3B;EACE,UAAU;AAAE;AC4Id;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,iBAAA;AAAA;AAGA;AATA;MAUA,0DAAA;MACA,6CAAA;AAAA;AAQA;AAJA;AAfA;MAgBA,qDAAA;MACA,6CAAA;AAAA;AAEA;AAEA;EACA,YAAA;EACA,kBAAA;EACA,UAAA;EACA,cAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;AAAA;AARA;IAWA,WAAA;IACA,eAAA;IACA,gBAAA;IACA,qBAAA;IACA,kBAAA;IAAA,+BAAA;IACA,iCAAA;IACA,UAAA;IACA,SAAA;IACA,kBAAA;AAAA;AAnBA;MAsBA,eAAA;MACA,gBAAA;AAAA;AAvBA;QA2BA,yBAAA;AAAA;AA3BA;QA+BA,kBAAA;QDnJQ,YAAY;QACZ,SAAS;QACT,UAAU;QACV,WAAW;QACX,iBAAiB;QACjB,uBAAuB;QACvB,uCAAuC;QACvC,cAAc;QACd,aAAa;QACb,4EAA4E;QAC5E,mBAAmB;QACnB,uCAAuC;QACvC,+BAA+B;QAC/B,gCAAgC;QAChC,+DAA+D;QAC/D,wBAAwB;QCsIhC,WAAA;QACA,cAAA;QACA,eAAA;AAAA;AAnCA;UDhGU,UAAU;UACV,aAAa;AAAE;AC+FzB;QAwCA,eAAA;QACA,gBAAA;QACA,cAAA;AAAA;AA1CA;QAgDA,eAAA;QACA,0BAAA;AAAA;AAOA;EACA,YAAA;EACA,gBAAA;EACA,kBAAA;EACA,UAAA;EACA,cAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;AAAA;AATA;IAYA,kBAAA;IACA,aAAA;IACA,WAAA;IACA,YAAA;IACA,kBAAA;AAAA;AAhBA;;IAqBA,kBAAA;IACA,MAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,aAAA;IACA,qCAAA;IACA,kCAAA;IACA,aAAA;IACA,WAAA;IACA,YAAA;IACA,qBAAA;IACA,mBAAA;AAAA;AAjCA;;MAoCA,kBAAA;MDhJM,YAAY;MACZ,SAAS;MACT,UAAU;MACV,WAAW;MACX,iBAAiB;MACjB,uBAAuB;MACvB,uCAAuC;MACvC,cAAc;MACd,aAAa;MACb,4EAA4E;MAC5E,mBAAmB;MACnB,uCAAuC;MACvC,+BAA+B;MAC/B,gCAAgC;MAChC,+DAA+D;MAC/D,wBAAwB;MCmI9B,aAAA;MACA,uBAAA;MACA,mBAAA;MACA,eAAA;MACA,eAAA;MACA,YAAA;MACA,eAAA;MACA,gBAAA;MACA,kBAAA;MACA,aAAA;MACA,eAAA;MACA,gCAAA;AAAA;AAjDA;;;QD7EQ,UAAU;QACV,aAAa;AAAE;AC4EvB;;QAoDA,yBAAA;AAAA;AApDA;;;QAyDA,eAAA;QACA,0BAAA;AAAA;AA1DA;;QA8DA,kBAAA;QACA,MAAA;QACA,SAAA;QACA,OAAA;QACA,QAAA;QACA,YAAA;QACA,WAAA;QACA,YAAA;QACA,8BAAA;AAAA;AAtEA;IA4EA,0BAAA;IACA,kCAAA;AAAA;AA7EA;MAgFA,YAAA;MACA,WAAA;AAAA;;ADlIA,kDAAkD","file":"DatePickerYearMonth.vue","sourcesContent":["/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active,\n.slide-h-next-enter-active,\n.slide-h-prev-leave-active,\n.slide-h-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-h-next-enter, .slide-h-prev-leave-to {\n  transform: translateX(100%);\n  opacity: 0; }\n\n.slide-h-next-leave-to, .slide-h-prev-enter {\n  transform: translateX(-100%);\n  opacity: 0; }\n\n.slide-v-next-leave-active,\n.slide-v-next-enter-active,\n.slide-v-prev-leave-active,\n.slide-v-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-v-next-enter, .slide-v-prev-leave-to {\n  transform: translateY(100%);\n  opacity: 0; }\n\n.slide-v-next-leave-to, .slide-v-prev-enter {\n  transform: translateY(-100%);\n  opacity: 0; }\n\n.yearMonth-leave-active, .yearMonth-enter-active {\n  position: absolute;\n  transition: opacity .3s; }\n\n.yearMonth-enter, .yearMonth-leave-to {\n  opacity: 0; }\n\n.datepicker-year-month {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: white; }\n  @supports (padding-bottom: constant(safe-area-inset-bottom)) {\n    .datepicker-year-month {\n      --safe-area-inset-bottom: constant(safe-area-inset-bottom);\n      padding-bottom: var(--safe-area-inset-bottom); } }\n  @supports (padding-bottom: env(safe-area-inset-bottom)) {\n    .datepicker-year-month {\n      --safe-area-inset-bottom: env(safe-area-inset-bottom);\n      padding-bottom: var(--safe-area-inset-bottom); } }\n\n.datepicker-years {\n  height: auto;\n  position: relative;\n  z-index: 0;\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%; }\n  .datepicker-years ul {\n    width: 100%;\n    font-size: 16px;\n    font-weight: 400;\n    list-style-type: none;\n    overflow-y: scroll;\n    /* has to be scroll, not auto */\n    -webkit-overflow-scrolling: touch;\n    padding: 0;\n    margin: 0;\n    text-align: center; }\n    .datepicker-years ul li {\n      cursor: pointer;\n      transition: none; }\n      .datepicker-years ul li:hover, .datepicker-years ul li:focus {\n        background-color: #eef1f8; }\n      .datepicker-years ul li button {\n        position: relative;\n        border: none;\n        margin: 0;\n        padding: 0;\n        width: auto;\n        overflow: visible;\n        background: transparent;\n        /* inherit font & color from ancestor */\n        color: inherit;\n        font: inherit;\n        /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n        line-height: normal;\n        /* Corrects font smoothing for webkit */\n        -webkit-font-smoothing: inherit;\n        -moz-osx-font-smoothing: inherit;\n        /* Corrects inability to style clickable `input` types in iOS */\n        -webkit-appearance: none;\n        width: 100%;\n        padding: 8px 0;\n        cursor: pointer; }\n        .datepicker-years ul li button:focus, .datepicker-years ul li button:active {\n          outline: 0;\n          box-shadow: 0; }\n      .datepicker-years ul li.active button {\n        font-size: 26px;\n        font-weight: 500;\n        padding: 8px 0; }\n      .datepicker-years ul li.disabled button {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26); }\n\n.datepicker-months {\n  height: auto;\n  overflow: hidden;\n  position: relative;\n  z-index: 0;\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%; }\n  .datepicker-months .datepicker-months__wrapper {\n    position: relative;\n    display: flex;\n    width: 100%;\n    height: 100%;\n    padding: 0 8px 8px; }\n  .datepicker-months .datepicker-months__list,\n  .datepicker-months .datepicker-quarters__list {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: repeat(4, 1fr);\n    grid-gap: 8px;\n    width: 100%;\n    height: 100%;\n    justify-items: center;\n    align-items: center; }\n    .datepicker-months .datepicker-months__list button,\n    .datepicker-months .datepicker-quarters__list button {\n      position: relative;\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      /* inherit font & color from ancestor */\n      color: inherit;\n      font: inherit;\n      /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n      line-height: normal;\n      /* Corrects font smoothing for webkit */\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      /* Corrects inability to style clickable `input` types in iOS */\n      -webkit-appearance: none;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-size: 12px;\n      padding: 0 20px;\n      height: 30px;\n      font-size: 15px;\n      font-weight: 500;\n      border-radius: 2px;\n      outline: none;\n      cursor: pointer;\n      transition: background-color .3s; }\n      .datepicker-months .datepicker-months__list button:focus, .datepicker-months .datepicker-months__list button:active,\n      .datepicker-months .datepicker-quarters__list button:focus,\n      .datepicker-months .datepicker-quarters__list button:active {\n        outline: 0;\n        box-shadow: 0; }\n      .datepicker-months .datepicker-months__list button:hover,\n      .datepicker-months .datepicker-quarters__list button:hover {\n        background-color: #eef1f8; }\n      .datepicker-months .datepicker-months__list button:disabled, .datepicker-months .datepicker-months__list button[disabled],\n      .datepicker-months .datepicker-quarters__list button:disabled,\n      .datepicker-months .datepicker-quarters__list button[disabled] {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26); }\n      .datepicker-months .datepicker-months__list button .datepicker-month--current,\n      .datepicker-months .datepicker-quarters__list button .datepicker-month--current {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        margin: auto;\n        width: 100%;\n        height: 30px;\n        background-color: currentColor; }\n  .datepicker-months .datepicker-quarters__list {\n    grid-template-columns: 1fr;\n    grid-template-rows: repeat(4, 1fr); }\n    .datepicker-months .datepicker-quarters__list button {\n      height: 100%;\n      width: 100%; }\n\n/*# sourceMappingURL=DatePickerYearMonth.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-2a790886";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerYearMonth.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$5() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$5.styles || (__vue_create_injector__$5.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
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
    endDate: {
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

      if (!this.rangePresets) return;
      return this.rangePresets.map(function (preset) {
        return objectSpread({}, preset, {
          availableDates: generateDateRangeWithoutDisabled(preset.dates, _this.minDate, _this.endDate)
        });
      }).splice(0, 6); // Max 6 presets
    }
  },
  methods: {
    isPresetSelected: function isPresetSelected() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$availableDates = _ref.availableDates,
          availableDates = _ref$availableDates === void 0 ? [] : _ref$availableDates;

      if (availableDates.length === 0 || !this.mutableDate) return false;
      return areSameDates(availableDates[0], this.mutableDate.start) && areSameDates(availableDates[availableDates.length - 1], this.mutableDate.end);
    },
    isPresetValid: function isPresetValid() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$availableDates = _ref2.availableDates,
          availableDates = _ref2$availableDates === void 0 ? [] : _ref2$availableDates;

      if (!this.mutableDate) return false;
      return availableDates.length > 0;
    },
    setPresetDates: function setPresetDates(_ref3) {
      var availableDates = _ref3.availableDates;
      this.$emit('updateRange', {
        start: availableDates[0],
        end: availableDates[availableDates.length - 1]
      });
    }
  }
};

/* script */
            const __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.rangePresets
    ? _c("div", { staticClass: "datepicker-presets" }, [
        _c(
          "div",
          { staticClass: "datepicker-presets__wrapper" },
          _vm._l(_vm.presetsFormatted, function(preset, index) {
            return _c(
              "button",
              {
                key: index,
                staticClass: "datepicker-preset",
                class: {
                  "datepicker-preset--selected": _vm.isPresetSelected(preset),
                  "datepicker-preset--disabled": !_vm.isPresetValid(preset)
                },
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.setPresetDates(preset)
                  }
                }
              },
              [
                _c("div", {
                  staticClass: "datepicker-preset__effect",
                  style: _vm.setBackgroundColor(_vm.color)
                }),
                _vm._v(" "),
                _c("div", { staticClass: "datepicker-preset__name" }, [
                  _vm._v(_vm._s(preset.name))
                ])
              ]
            )
          }),
          0
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-1e2291ba_0", { source: "/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.datepicker-presets[data-v-1e2291ba] {\n  position: relative;\n  display: flex;\n  padding: 16px 16px 8px;\n}\n.datepicker-presets__wrapper[data-v-1e2291ba] {\n    position: relative;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-auto-rows: 32px;\n    width: 100%;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-presets__wrapper[data-v-1e2291ba] {\n        grid-auto-rows: 32px;\n}\n}\n.datepicker-preset[data-v-1e2291ba] {\n  position: relative;\n  border: none;\n  margin: 0;\n  padding: 0;\n  width: auto;\n  overflow: visible;\n  background: transparent;\n  /* inherit font & color from ancestor */\n  color: inherit;\n  font: inherit;\n  /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n  line-height: normal;\n  /* Corrects font smoothing for webkit */\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n  /* Corrects inability to style clickable `input` types in iOS */\n  -webkit-appearance: none;\n  padding: 0 8px;\n  transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1);\n  font-size: 14px;\n  line-height: 14px;\n  cursor: pointer;\n  overflow: hidden;\n  border-color: #eef1f8;\n  border-style: solid;\n  border-width: 0;\n}\n.datepicker-preset[data-v-1e2291ba]:focus, .datepicker-preset[data-v-1e2291ba]:active {\n    outline: 0;\n    box-shadow: 0;\n}\n.datepicker-preset[data-v-1e2291ba]:nth-child(1) {\n    border-width: 1px;\n}\n.datepicker-preset[data-v-1e2291ba]:nth-child(2), .datepicker-preset[data-v-1e2291ba]:nth-child(3) {\n    border-width: 1px 1px 1px 0;\n}\n.datepicker-preset[data-v-1e2291ba]:nth-child(4) {\n    border-width: 0 1px 1px 1px;\n}\n.datepicker-preset[data-v-1e2291ba]:nth-child(5) {\n    border-width: 0 1px 1px 0;\n}\n.datepicker-preset__effect[data-v-1e2291ba] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    opacity: 0;\n    transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1);\n    z-index: -1;\n}\n.datepicker-preset[data-v-1e2291ba]:hover:not(.datepicker-preset--disabled) {\n    color: white;\n}\n.datepicker-preset:hover:not(.datepicker-preset--disabled) .datepicker-preset__effect[data-v-1e2291ba] {\n      opacity: 1;\n}\n.datepicker-preset--selected[data-v-1e2291ba] {\n    color: white;\n}\n.datepicker-preset--selected .datepicker-preset__effect[data-v-1e2291ba] {\n      opacity: 1;\n}\n.datepicker-preset--disabled[data-v-1e2291ba] {\n    color: rgba(93, 106, 137, 0.2);\n    cursor: not-allowed;\n    pointer-events: none;\n}\n\n/*# sourceMappingURL=DatePickerPresets.vue.map */", map: {"version":3,"sources":["DatePickerPresets.vue","/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerPresets.vue"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;CAgBC;ACgED;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;AAAA;AAEA;IACA,kBAAA;IACA,aAAA;IACA,qCAAA;IACA,oBAAA;IACA,WAAA;AAAA;AD/DI;AC0DJ;QAQA,oBAAA;AAAA;AAEA;AAGA;EACA,kBAAA;EANA,YAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;ED3DE,iBAAiB;EC8DnB,uBAAA;EAEA,uCAAA;EACA,cAAA;EACA,aAAA;EAEA,4EAAA;EACA,mBAAA;EAEA,uCAAA;EACA,+BAAA;ED/DE,gCAAgC;ECkElC,+DAAA;EACA,wBAAA;EAZA,cAAA;EACA,wDAAA;EACA,eAAA;EACA,iBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;EACA,eAAA;AAAA;AAXA;IAmBA,UAAA;IACA,aAAA;AAAA;AApBA;IAcA,iBAAA;AAAA;AAdA;IAkBA,2BAAA;AAAA;AAlBA;IAqBA,2BAAA;AAAA;AArBA;IAwBA,yBAAA;AAAA;AAGA;IACA,kBAAA;IACA,MAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,UAAA;IACA,wDAAA;IACA,WAAA;AAAA;AAnCA;IAuCA,YAAA;AAAA;AAvCA;MA0CA,UAAA;AAAA;AAIA;IACA,YAAA;AAAA;AADA;MAIA,UAAA;AAAA;AAIA;IACA,8BAAA;IACA,mBAAA;IACA,oBAAA;AAAA;;ADhEA,gDAAgD","file":"DatePickerPresets.vue","sourcesContent":["/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.datepicker-presets {\n  position: relative;\n  display: flex;\n  padding: 16px 16px 8px; }\n  .datepicker-presets__wrapper {\n    position: relative;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-auto-rows: 32px;\n    width: 100%; }\n    @media only screen and (min-width: 768px) {\n      .datepicker-presets__wrapper {\n        grid-auto-rows: 32px; } }\n\n.datepicker-preset {\n  position: relative;\n  border: none;\n  margin: 0;\n  padding: 0;\n  width: auto;\n  overflow: visible;\n  background: transparent;\n  /* inherit font & color from ancestor */\n  color: inherit;\n  font: inherit;\n  /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n  line-height: normal;\n  /* Corrects font smoothing for webkit */\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n  /* Corrects inability to style clickable `input` types in iOS */\n  -webkit-appearance: none;\n  padding: 0 8px;\n  transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1);\n  font-size: 14px;\n  line-height: 14px;\n  cursor: pointer;\n  overflow: hidden;\n  border-color: #eef1f8;\n  border-style: solid;\n  border-width: 0; }\n  .datepicker-preset:focus, .datepicker-preset:active {\n    outline: 0;\n    box-shadow: 0; }\n  .datepicker-preset:nth-child(1) {\n    border-width: 1px; }\n  .datepicker-preset:nth-child(2), .datepicker-preset:nth-child(3) {\n    border-width: 1px 1px 1px 0; }\n  .datepicker-preset:nth-child(4) {\n    border-width: 0 1px 1px 1px; }\n  .datepicker-preset:nth-child(5) {\n    border-width: 0 1px 1px 0; }\n  .datepicker-preset__effect {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    opacity: 0;\n    transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1);\n    z-index: -1; }\n  .datepicker-preset:hover:not(.datepicker-preset--disabled) {\n    color: white; }\n    .datepicker-preset:hover:not(.datepicker-preset--disabled) .datepicker-preset__effect {\n      opacity: 1; }\n  .datepicker-preset--selected {\n    color: white; }\n    .datepicker-preset--selected .datepicker-preset__effect {\n      opacity: 1; }\n  .datepicker-preset--disabled {\n    color: rgba(93, 106, 137, 0.2);\n    cursor: not-allowed;\n    pointer-events: none; }\n\n/*# sourceMappingURL=DatePickerPresets.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = "data-v-1e2291ba";
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerPresets.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$6() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$6.styles || (__vue_create_injector__$6.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
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

var script$7 = {
  name: 'DatepickerAgenda',
  mixins: [detachable, colorable, dynamicPosition],
  directives: {
    ClickOutside: ClickOutside
  },
  components: {
    DatePickerHeader: DatePickerHeader,
    DatePickerControls: DatePickerControls,
    DatePickerYearMonth: DatePickerYearMonth,
    DatePickerPresets: DatePickerPresets
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
    fullscreenMobile: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    close: {
      type: Function
    },
    minDate: {
      type: [String, Number, Date]
    },
    endDate: {
      type: [String, Number, Date]
    },
    zIndex: {
      type: Number
    }
  },
  data: function data() {
    return {
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
        // left, top, orign from @/mixins/dynamicPosition
        left: "".concat(this.left, "px"),
        top: "".concat(this.top, "px"),
        transformOrigin: this.origin,
        zIndex: this.inline ? null : this.zIndex
      };
    },
    classes: function classes() {
      return objectSpread({
        'datepicker--inline': this.inline,
        'datepicker--fullscreen-mobile': this.fullscreenMobile,
        'datepicker--no-header': this.noHeader,
        'datepicker--range': this.range,
        'datepicker--range-selecting': this.range && !this.isRangeSelected
      }, this.classPresets && defineProperty({}, this.classPresets, true));
    },
    weekDays: function weekDays() {
      return getWeekDays(this.locale);
    },
    spaceBeforeFirstDay: function spaceBeforeFirstDay() {
      return toConsumableArray(Array(this.currentDate.getWeekStart()).keys());
    },
    classWeeks: function classWeeks() {
      // if yearMonth selector is opened, stop changing class
      if (this.shouldShowYearMonthSelector) return;

      if (this.currentDate.getDays().length + this.currentDate.start.weekday() > 35) {
        return "has-6-weeks";
      }

      return "has-5-weeks";
    },
    classPresets: function classPresets() {
      if (!this.rangePresets) return;
      return "datepicker--presets-row-".concat(Math.ceil(this.rangePresets.length / 3));
    },
    shouldShowAgenda: function shouldShowAgenda() {
      return this.isVisible || this.inline;
    },
    shouldShowBottomSheet: function shouldShowBottomSheet() {
      return this.innerWidth < 480 && this.fullscreenMobile && this.isVisible;
    },
    isRangeSelected: function isRangeSelected() {
      if (!this.range) return false;
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
                    _context2.next = 5;
                    break;
                  }

                  disableBodyScroll(this.$el.querySelector('.datepicker-content'));
                  return _context2.abrupt("return");

                case 5:
                  enableBodyScroll();

                case 6:
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
      if (!this.mutableDate.start && !this.mutableDate.end) return false;
      return isBetweenDates(day, this.mutableDate.start, this.mutableDate.end);
    },
    isInRange: function isInRange(day) {
      if (!this.rangeCurrentHoveredDay) return;

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
      return isBeforeDate(day, this.minDate) || isAfterDate(day, this.endDate);
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


        this.emitSelectedDate(objectSpread({}, this.mutableDate, this.mutableDate.start && {
          end: day.clone()
        }, this.mutableDate.end && {
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
      this.$emit('selectDate', this.mutableDate);
      this.rangeCurrentHoveredDay = undefined;
      this.close();
    },
    updateDate: function updateDate(date) {
      var newDate = formatDate(this.range ? date.end || date.start : date, this.locale); // If today's date is after endDate, we should show endDate month

      if (isAfterDate(newDate, this.endDate)) {
        newDate = formatDate(this.endDate, this.locale);
      }

      if (this.range) {
        this.currentDate = new PickerDate(newDate.month(), newDate.year(), this.locale);
        this.mutableDate = date;
        return;
      }

      var month = this.type === 'quarter' ? convertMonthToQuarter(newDate.month()) : newDate.month();
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
      if (!this.range || this.isRangeSelected) return;
      var target = event.target; // Should handle mouse move only on those classes

      var CLASSES = ['datepicker-day', 'datepicker-day__effect'];
      if (typeof target.className === 'string' && !CLASSES.includes(target.className.split(' ')[0])) return; // If tagName is SPAN, it means we should select parent

      if (target.tagName === 'SPAN') {
        target = event.target.parentNode;
      } // Don't do anything if we are on the same day


      var isADate = target.dataset.date;
      var isCurrentHoveredDay = target.dataset.date === this.rangeCurrentHoveredDay;
      if (!isADate || isCurrentHoveredDay) return;
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
            const __vue_script__$7 = script$7;
            
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "transition",
    {
      attrs: { name: "datepicker-transition", appear: "" },
      on: { "after-enter": _vm.setActive }
    },
    [
      _vm.shouldShowAgenda
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "click-outside",
                  rawName: "v-click-outside",
                  value: {
                    handler: function() {
                      return _vm.$emit("hide")
                    },
                    isActive: !_vm.inline && _vm.isActive
                  },
                  expression:
                    "{ handler : () => $emit('hide'), isActive: !inline && isActive }"
                }
              ],
              ref: "content",
              staticClass: "datepicker",
              class: _vm.classes,
              style: _vm.styles,
              attrs: { name: "datepicker-slide" },
              on: {
                mousemove: _vm.handleMouseMove,
                click: function($event) {
                  $event.stopPropagation();
                }
              }
            },
            [
              _vm.fullscreenMobile
                ? _c("div", { staticClass: "datepicker-title" }, [
                    _c("p", [_vm._v(_vm._s(_vm.name))]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.$emit("close")
                          }
                        }
                      },
                      [
                        _c(
                          "svg",
                          {
                            attrs: {
                              "aria-hidden": "true",
                              focusable: "false",
                              "data-prefix": "fal",
                              "data-icon": "times",
                              role: "img",
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 320 512"
                            }
                          },
                          [
                            _c("path", {
                              attrs: {
                                fill: "currentColor",
                                d:
                                  "M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                              }
                            })
                          ]
                        )
                      ]
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              !_vm.noHeader
                ? _c("DatePickerHeader", {
                    attrs: {
                      "mutable-date": _vm.mutableDate,
                      "transition-name": _vm.transitionLabelName,
                      color: _vm.color,
                      locale: _vm.locale,
                      "format-header": _vm.formatHeader,
                      mode: _vm.yearMonthMode,
                      range: _vm.range,
                      "range-header-text": _vm.rangeHeaderText
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.range
                ? _c("DatePickerPresets", {
                    attrs: {
                      "range-presets": _vm.rangePresets,
                      "mutable-date": _vm.mutableDate,
                      "min-date": _vm.minDate,
                      "end-date": _vm.endDate,
                      color: _vm.color,
                      locale: _vm.locale
                    },
                    on: { updateRange: _vm.emitSelectedDate }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "datepicker-content" },
                [
                  _c("DatePickerControls", {
                    attrs: {
                      "current-date": _vm.currentDate,
                      "transition-name": _vm.transitionLabelName,
                      locale: _vm.locale,
                      mode: "month"
                    },
                    on: {
                      changeVisibleDate: _vm.changeMonth,
                      showYearMonthSelector: _vm.showYearMonthSelector
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "datepicker-week" },
                    _vm._l(_vm.weekDays, function(day, index) {
                      return _c(
                        "div",
                        { key: index, staticClass: "datepicker-weekday" },
                        [_vm._v("\n          " + _vm._s(day) + "\n        ")]
                      )
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _c(
                    "TransitionGroup",
                    {
                      staticClass: "datepicker-days__wrapper",
                      class: _vm.classWeeks,
                      attrs: { tag: "div", name: _vm.transitionDaysName }
                    },
                    _vm._l([_vm.currentDate], function(dates) {
                      return _c(
                        "div",
                        { key: dates.month, staticClass: "datepicker-days" },
                        [
                          _vm._l(_vm.spaceBeforeFirstDay, function(day) {
                            return _c("div", {
                              key: "space-" + day,
                              staticClass: "datepicker-day"
                            })
                          }),
                          _vm._v(" "),
                          _vm._l(_vm.currentDate.getDays(), function(
                            day,
                            index
                          ) {
                            return _c(
                              "button",
                              {
                                key: index,
                                staticClass: "datepicker-day",
                                class: {
                                  selected:
                                    _vm.isSelected(day) && !_vm.isDisabled(day),
                                  between: _vm.range && _vm.isBetween(day),
                                  "in-range": _vm.range && _vm.isInRange(day),
                                  first: _vm.range && _vm.firstInRange(day),
                                  last:
                                    _vm.range &&
                                    _vm.lastInRange(day) &&
                                    Boolean(_vm.mutableDate.end),
                                  "select-start":
                                    _vm.range && !_vm.mutableDate.start,
                                  "select-end":
                                    _vm.range &&
                                    _vm.mutableDate.start &&
                                    !_vm.mutableDate.end,
                                  disabled: _vm.isDisabled(day)
                                },
                                attrs: {
                                  disabled: _vm.isDisabled(day),
                                  "data-date": day.format("YYYY-MM-DD"),
                                  type: "button"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.selectDate(day)
                                  }
                                }
                              },
                              [
                                _vm.isToday(day)
                                  ? _c("span", {
                                      staticClass: "datepicker-day--current"
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("span", {
                                  staticClass: "datepicker-day__effect",
                                  style: _vm.setBackgroundColor(_vm.color)
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "datepicker-day__text" },
                                  [_vm._v(_vm._s(day.format("D")))]
                                )
                              ]
                            )
                          })
                        ],
                        2
                      )
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _vm.shouldShowYearMonthSelector
                    ? _c("DatePickerYearMonth", {
                        attrs: {
                          mode: _vm.yearMonthMode,
                          range: _vm.range,
                          "current-date": _vm.currentDate,
                          "mutable-date": _vm.mutableDate,
                          "transition-name": _vm.transitionDaysName,
                          "show-year-month-selector": _vm.showYearMonthSelector,
                          color: _vm.color,
                          "min-date": _vm.minDate,
                          "end-date": _vm.endDate
                        },
                        on: {
                          changeYear: _vm.changeYear,
                          selectedYearMonth: _vm.selectedYearMonth
                        }
                      })
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-9ed20d10_0", { source: "/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active[data-v-9ed20d10],\n.slide-h-next-enter-active[data-v-9ed20d10],\n.slide-h-prev-leave-active[data-v-9ed20d10],\n.slide-h-prev-enter-active[data-v-9ed20d10] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-h-next-enter[data-v-9ed20d10], .slide-h-prev-leave-to[data-v-9ed20d10] {\n  transform: translateX(100%);\n  opacity: 0;\n}\n.slide-h-next-leave-to[data-v-9ed20d10], .slide-h-prev-enter[data-v-9ed20d10] {\n  transform: translateX(-100%);\n  opacity: 0;\n}\n.slide-v-next-leave-active[data-v-9ed20d10],\n.slide-v-next-enter-active[data-v-9ed20d10],\n.slide-v-prev-leave-active[data-v-9ed20d10],\n.slide-v-prev-enter-active[data-v-9ed20d10] {\n  position: absolute;\n  transition: transform .3s, opacity .3s;\n}\n.slide-v-next-enter[data-v-9ed20d10], .slide-v-prev-leave-to[data-v-9ed20d10] {\n  transform: translateY(100%);\n  opacity: 0;\n}\n.slide-v-next-leave-to[data-v-9ed20d10], .slide-v-prev-enter[data-v-9ed20d10] {\n  transform: translateY(-100%);\n  opacity: 0;\n}\n.yearMonth-leave-active[data-v-9ed20d10], .yearMonth-enter-active[data-v-9ed20d10] {\n  position: absolute;\n  transition: opacity .3s;\n}\n.yearMonth-enter[data-v-9ed20d10], .yearMonth-leave-to[data-v-9ed20d10] {\n  opacity: 0;\n}\n.datepicker[data-v-9ed20d10] {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  width: 290px;\n  left: 0;\n  top: 100%;\n  will-change: transform;\n  background-color: white;\n  border-radius: 6px;\n  box-shadow: 0 2px 8px rgba(50, 50, 93, 0.2);\n  /* Title\n  ---------------------- */\n  /* Contsnt\n  ---------------------- */\n  /* Week\n  ---------------------- */\n  /* Days\n  ---------------------- */\n}\n.datepicker[data-v-9ed20d10]:focus, .datepicker[data-v-9ed20d10]:active {\n    outline: 0;\n}\n@media only screen and (min-width: 768px) {\n.datepicker[data-v-9ed20d10] {\n      width: 315px;\n}\n}\n.datepicker--inline[data-v-9ed20d10] {\n    position: relative;\n    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n@media only screen and (max-width: 479px) {\n.datepicker--fullscreen-mobile[data-v-9ed20d10] {\n      position: fixed;\n      top: auto !important;\n      bottom: 0 !important;\n      left: 0 !important;\n      right: 0 !important;\n      height: 422px;\n      width: 100%;\n      border-radius: 12px 12px 0 0;\n}\n@supports (padding-bottom: constant(safe-area-inset-bottom)) {\n.datepicker--fullscreen-mobile[data-v-9ed20d10] {\n          --safe-area-inset-bottom: constant(safe-area-inset-bottom);\n          height: calc(422px + var(--safe-area-inset-bottom));\n}\n}\n@supports (padding-bottom: env(safe-area-inset-bottom)) {\n.datepicker--fullscreen-mobile[data-v-9ed20d10] {\n          --safe-area-inset-bottom: env(safe-area-inset-bottom);\n          height: calc(422px + var(--safe-area-inset-bottom));\n}\n}\n.datepicker--fullscreen-mobile .datepicker-header[data-v-9ed20d10] {\n        border-radius: 0;\n}\n.datepicker--fullscreen-mobile.datepicker--no-header[data-v-9ed20d10] {\n        height: 342px;\n}\n.datepicker--fullscreen-mobile.datepicker--presets-row-1[data-v-9ed20d10] {\n        height: 454px;\n}\n.datepicker--fullscreen-mobile.datepicker--presets-row-1.datepicker--no-header[data-v-9ed20d10] {\n          height: 374px;\n}\n.datepicker--fullscreen-mobile.datepicker--presets-row-2[data-v-9ed20d10] {\n        height: 486px;\n}\n.datepicker--fullscreen-mobile.datepicker--presets-row-2.datepicker--no-header[data-v-9ed20d10] {\n          height: 406px;\n}\n}\n.datepicker-title[data-v-9ed20d10] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 0 0 16px;\n    border-radius: 12px 12px 0 0;\n}\n@media only screen and (min-width: 480px) {\n.datepicker-title[data-v-9ed20d10] {\n        display: none;\n}\n}\n.datepicker-title p[data-v-9ed20d10] {\n      margin: 0;\n}\n.datepicker-title button[data-v-9ed20d10] {\n      position: relative;\n      flex: 0 0 40px;\n      height: 48px;\n      width: 48px;\n      padding: 0 16px 0 8px;\n      border: none;\n      outline: none;\n      background-color: transparent;\n      user-select: none;\n      cursor: pointer;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-title button[data-v-9ed20d10] {\n          height: 56px;\n          width: 56px;\n}\n}\n.datepicker-title button svg[data-v-9ed20d10] {\n        width: 24px;\n        height: 24px;\n}\n.datepicker-content[data-v-9ed20d10] {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n.datepicker-week[data-v-9ed20d10] {\n    font-size: 12px;\n    line-height: 12px;\n    font-weight: 500;\n    padding: 8px 12px;\n    color: rgba(0, 0, 0, 0.38);\n}\n@media only screen and (min-width: 768px) {\n.datepicker-week[data-v-9ed20d10] {\n        padding: 8px 14px;\n}\n}\n.datepicker-week .datepicker-weekday[data-v-9ed20d10] {\n      float: left;\n      width: calc(100% / 7);\n      text-align: center;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-week .datepicker-weekday[data-v-9ed20d10] {\n          width: 40px;\n}\n}\n.datepicker-days__wrapper[data-v-9ed20d10] {\n    position: relative;\n    height: 180px;\n    margin: 0 12px 12px;\n    overflow: hidden;\n    transition: height 0.3s cubic-bezier(0.23, 1, 0.32, 1);\n}\n@media only screen and (min-width: 768px) {\n.datepicker-days__wrapper[data-v-9ed20d10] {\n        margin: 0 14px 14px;\n        height: 200px;\n}\n}\n.datepicker-days__wrapper.has-6-weeks[data-v-9ed20d10] {\n      height: 216px;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-days__wrapper.has-6-weeks[data-v-9ed20d10] {\n          height: 240px;\n}\n}\n.datepicker-days[data-v-9ed20d10] {\n    display: flex;\n    flex-wrap: wrap;\n    overflow: hidden;\n    width: 100%;\n}\n.datepicker-days .datepicker-day[data-v-9ed20d10] {\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      /* inherit font & color from ancestor */\n      color: inherit;\n      font: inherit;\n      /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n      line-height: normal;\n      /* Corrects font smoothing for webkit */\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      /* Corrects inability to style clickable `input` types in iOS */\n      -webkit-appearance: none;\n      position: relative;\n      width: calc(100% / 7);\n      height: 36px;\n      line-height: 1;\n      font-size: 12px;\n      float: left;\n      text-align: center;\n      color: rgba(0, 0, 0, 0.87);\n      font-weight: 500;\n      cursor: pointer;\n      transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);\n      overflow: hidden;\n}\n.datepicker-days .datepicker-day[data-v-9ed20d10]:focus, .datepicker-days .datepicker-day[data-v-9ed20d10]:active {\n        outline: 0;\n        box-shadow: 0;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-days .datepicker-day[data-v-9ed20d10] {\n          width: calc(100% / 7);\n          height: 40px;\n}\n}\n.datepicker-days .datepicker-day[data-v-9ed20d10]:hover:not(.disabled) {\n        color: white;\n}\n.datepicker-days .datepicker-day:hover:not(.disabled) .datepicker-day__effect[data-v-9ed20d10] {\n          transform: translateX(-50%) scale(1);\n          opacity: .5;\n}\n.datepicker-days .datepicker-day.in-range[data-v-9ed20d10]:not(.disabled), .datepicker-days .datepicker-day.between[data-v-9ed20d10]:not(.disabled) {\n        color: white;\n}\n.datepicker-days .datepicker-day.in-range:not(.disabled) .datepicker-day__effect[data-v-9ed20d10], .datepicker-days .datepicker-day.between:not(.disabled) .datepicker-day__effect[data-v-9ed20d10] {\n          transform: translateX(-50%) scale(1);\n          opacity: 1;\n          left: 0;\n          width: calc(100% + 1px);\n          border-radius: 0;\n          opacity: .5;\n}\n.datepicker-days .datepicker-day.in-range:not(.disabled) .datepicker-day__effect[data-v-9ed20d10]:before, .datepicker-days .datepicker-day.between:not(.disabled) .datepicker-day__effect[data-v-9ed20d10]:before {\n            opacity: 1;\n            left: 50%;\n}\n.datepicker-days .datepicker-day.selected[data-v-9ed20d10] {\n        color: white;\n}\n.datepicker-days .datepicker-day.selected:hover:not(.disabled) .datepicker-day__effect[data-v-9ed20d10] {\n          opacity: 1;\n}\n.datepicker-days .datepicker-day.selected .datepicker-day__effect[data-v-9ed20d10] {\n          transform: translateX(-50%) scale(1);\n          opacity: 1;\n}\n.datepicker-days .datepicker-day.first .datepicker-day__effect[data-v-9ed20d10], .datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect[data-v-9ed20d10] {\n        opacity: 1;\n}\n.datepicker-days .datepicker-day.first .datepicker-day__effect[data-v-9ed20d10]:before, .datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect[data-v-9ed20d10]:before {\n          opacity: .5;\n          left: 50%;\n}\n.datepicker-days .datepicker-day.last .datepicker-day__effect[data-v-9ed20d10], .datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect[data-v-9ed20d10] {\n        opacity: 1;\n}\n.datepicker-days .datepicker-day.last .datepicker-day__effect[data-v-9ed20d10]:before, .datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect[data-v-9ed20d10]:before {\n          opacity: .5;\n          left: -50%;\n}\n.datepicker-days .datepicker-day.first.last .datepicker-day__effect[data-v-9ed20d10]:before {\n        opacity: 0;\n}\n.datepicker-days .datepicker-day.disabled[data-v-9ed20d10] {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26);\n}\n.datepicker-days .datepicker-day.disabled:hover .datepicker-day__effect[data-v-9ed20d10],\n        .datepicker-days .datepicker-day.disabled:hover .datepicker-day__effect[data-v-9ed20d10]:before {\n          opacity: 0 !important;\n}\n.datepicker-days .datepicker-day--current[data-v-9ed20d10] {\n      position: absolute;\n      top: 1px;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 34px;\n      height: 34px;\n      border-radius: 50%;\n      border: 1px solid currentColor;\n}\n@media only screen and (min-width: 768px) {\n.datepicker-days .datepicker-day--current[data-v-9ed20d10] {\n          top: 4px;\n          width: 36px;\n          height: 36px;\n}\n}\n.datepicker-days .datepicker-day__effect[data-v-9ed20d10] {\n      position: absolute;\n      top: 1px;\n      left: 50%;\n      width: 34px;\n      height: 34px;\n      border-radius: 50%;\n      transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);\n      transition-property: transform, opacity;\n      transform: translateX(-50%) scale(0);\n}\n@media only screen and (min-width: 768px) {\n.datepicker-days .datepicker-day__effect[data-v-9ed20d10] {\n          top: 4px;\n          width: 36px;\n          height: 36px;\n}\n}\n.datepicker--range .datepicker-days .datepicker-day__effect[data-v-9ed20d10]:before {\n        content: \"\";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: inherit;\n        opacity: 0;\n}\n.datepicker--range-selecting .datepicker-days .datepicker-day__effect[data-v-9ed20d10] {\n        transform: translateX(-50%) scale(1);\n        opacity: 0;\n        transition: none;\n}\n.datepicker-days .datepicker-day__text[data-v-9ed20d10] {\n      position: relative;\n      vertical-align: sub;\n}\n.datepicker-transition-enter-active[data-v-9ed20d10], .datepicker-transition-leave-active[data-v-9ed20d10] {\n  opacity: 1;\n  transition: all 300ms;\n  transition-property: transform, opacity;\n  transform: scale(1);\n}\n@media only screen and (max-width: 479px) {\n.datepicker-transition-enter-active.datepicker--fullscreen-mobile[data-v-9ed20d10], .datepicker-transition-leave-active.datepicker--fullscreen-mobile[data-v-9ed20d10] {\n      transform: translateY(0);\n}\n}\n.datepicker-transition-leave-to[data-v-9ed20d10], .datepicker-transition-enter[data-v-9ed20d10] {\n  opacity: 0;\n  transform: scale(0);\n}\n@media only screen and (max-width: 479px) {\n.datepicker-transition-leave-to.datepicker--fullscreen-mobile[data-v-9ed20d10], .datepicker-transition-enter.datepicker--fullscreen-mobile[data-v-9ed20d10] {\n      transform: translateY(100%);\n}\n}\n\n/*# sourceMappingURL=DatePickerAgenda.vue.map */", map: {"version":3,"sources":["DatePickerAgenda.vue","/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerAgenda.vue"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;CAgBC;AACD;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;;;;EAIE,kBAAkB;EAClB,sCAAsC;AAAE;AAE1C;EACE,2BAA2B;EAC3B,UAAU;AAAE;AAEd;EACE,4BAA4B;EAC5B,UAAU;AAAE;AAEd;EACE,kBAAkB;EAClB,uBAAuB;AAAE;AAE3B;EACE,UAAU;AAAE;AC4bd;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;EACA,OAAA;EACA,SAAA;EACA,sBAAA;EACA,uBAAA;EACA,kBAAA;EACA,2CAAA;EA6FA;0BDrhB0B;ECgkB1B;0BD9jB0B;ECukB1B;0BDrkB0B;EC6lB1B;0BD3lB0B;AC4lB1B;AApLA;IAcA,UAAA;AAAA;ADnbE;ACqaF;MAkBA,YAAA;AAAA;AAgWA;AA7VA;IACA,kBAAA;IACA,yHAEA;AAAA;ADxbE;AC2bF;MAQA,eAAA;MACA,oBAAA;MACA,oBAAA;MACA,kBAAA;MACA,mBAAA;MACA,aARA;MASA,WAAA;MACA,4BAAA;AAAA;AAGA;AAlBA;UAmBA,0DAAA;UACA,mDAAA;AAAA;AAqDA;AAjDA;AAxBA;UAyBA,qDAAA;UACA,mDAAA;AAAA;AA+CA;AAzEA;QA8BA,gBAAA;AAAA;AA9BA;QAkCA,aAGA;AAAA;AArCA;QAyCA,aAKA;AAAA;AA9CA;UAiDA,aAIA;AAAA;AArDA;QAyDA,aAKA;AAAA;AA9DA;UAiEA,aAIA;AAAA;AACA;AAOA;IACA,kBAAA;IACA,aAAA;IACA,8BAAA;IACA,mBAAA;IACA,gBAAA;IACA,mBAAA;IACA,4BAAA;AAAA;ADzeI;ACkeJ;QAUA,aAAA;AAAA;AA6BA;AAvCA;MAcA,SAAA;AAAA;AAdA;MAkBA,kBAAA;MACA,cAAA;MACA,YAAA;MACA,WAAA;MACA,qBAAA;MACA,YAAA;MACA,aAAA;MACA,6BAAA;MACA,iBAAA;MACA,eAAA;AAAA;AD7eM;ACkdN;UA8BA,YAAA;UACA,WAAA;AAAA;AAOA;AAtCA;QAmCA,WAAA;QACA,YAAA;AAAA;AAOA;IACA,kBAAA;IACA,aAAA;IACA,sBAAA;IACA,YAAA;AAAA;AAKA;IACA,eAAA;IACA,iBAAA;IACA,gBAAA;IACA,iBAAA;IACA,0BAAA;AAAA;ADzfI;ACofJ;QAQA,iBAAA;AAAA;AAYA;AApBA;MAYA,WAAA;MACA,qBAAA;MACA,kBAAA;AAAA;AD3fM;AC6eN;UAiBA,WAAA;AAAA;AAEA;AAKA;IACA,kBAAA;IACA,aAAA;IACA,mBAAA;IACA,gBAAA;IACA,sDAAA;AAAA;ADjgBI;AC4fJ;QAQA,mBAAA;QACA,aAAA;AAAA;AAUA;AAnBA;MAaA,aAAA;AAAA;ADngBM;ACsfN;UAgBA,aAAA;AAAA;AAEA;AAGA;IACA,aAAA;IACA,eAAA;IACA,gBAAA;IACA,WAAA;AAAA;AAJA;MDlgBM,YAAY;MACZ,SAAS;MACT,UAAU;MACV,WAAW;MACX,iBAAiB;MACjB,uBAAuB;MACvB,uCAAuC;MACvC,cAAc;MACd,aAAa;MACb,4EAA4E;MAC5E,mBAAmB;MACnB,uCAAuC;MACvC,+BAA+B;MAC/B,gCAAgC;MAChC,+DAA+D;MAC/D,wBAAwB;MC2f9B,kBAAA;MACA,qBAAA;MACA,YAAA;MACA,cAAA;MACA,eAAA;MACA,WAAA;MACA,kBAAA;MACA,0BAAA;MACA,gBAAA;MACA,eAAA;MACA,sDAAA;MACA,gBAAA;AAAA;AAnBA;QDreQ,UAAU;QACV,aAAa;AAAE;AACjB;ACmeN;UAsBA,qBAAA;UACA,YAAA;AAAA;AAmFA;AA1GA;QA2BA,YAAA;AAAA;AA3BA;UA8BA,oCAAA;UACA,WAAA;AAAA;AA/BA;QAoCA,YAAA;AAAA;AApCA;UAuCA,oCAAA;UACA,UAAA;UACA,OAAA;UACA,uBAAA;UACA,gBAAA;UACA,WAAA;AAAA;AA5CA;YA+CA,UAAA;YACA,SAAA;AAAA;AAhDA;QAqDA,YAAA;AAAA;AArDA;UAyDA,UAAA;AAAA;AAzDA;UA8DA,oCAAA;UACA,UAAA;AAAA;AA/DA;QAqEA,UAAA;AAAA;AArEA;UAwEA,WAAA;UACA,SAAA;AAAA;AAzEA;QAgFA,UAAA;AAAA;AAhFA;UAmFA,WAAA;UACA,UAAA;AAAA;AApFA;QA2FA,UAAA;AAAA;AA3FA;QAgGA,eAAA;QACA,0BAAA;AAAA;AAjGA;;UAsGA,qBAAA;AAAA;AAtGA;MA6GA,kBAAA;MACA,QAAA;MACA,SAAA;MACA,2BAAA;MACA,WAAA;MACA,YAAA;MACA,kBAAA;MACA,8BAAA;AAAA;ADhiBM;AC4aN;UAuHA,QAAA;UACA,WAAA;UACA,YAAA;AAAA;AAEA;AA3HA;MA8HA,kBAAA;MACA,QAAA;MACA,SAAA;MACA,WAAA;MACA,YAAA;MACA,kBAAA;MACA,oDAAA;MACA,uCAAA;MACA,oCAAA;AAAA;ADniBM;AC6ZN;UAyIA,QAAA;UACA,WAAA;UACA,YAAA;AAAA;AAqBA;AAlBA;QAEA,WAAA;QACA,kBAAA;QACA,MAAA;QACA,OAAA;QACA,WAAA;QACA,YAAA;QACA,yBAAA;QACA,UAAA;AAAA;AAIA;QACA,oCAAA;QACA,UAAA;QACA,gBAAA;AAAA;AA9JA;MAmKA,kBAAA;MACA,mBAAA;AAAA;AASA;EAEA,UAAA;EACA,qBAAA;EACA,uCAAA;EACA,mBAAA;AAAA;ADpjBE;AC+iBF;MASA,wBAAA;AAAA;AACA;AAIA;EAEA,UAAA;EACA,mBAAA;AAAA;ADzjBE;ACsjBF;MAOA,2BAAA;AAAA;AACA;;AD1jBA,+CAA+C","file":"DatePickerAgenda.vue","sourcesContent":["/*\n  Media Query mixin\n  @example scss\n\n  @include mq($from: mobile) {\n    color: red;\n  }\n  @include mq($to: tablet) {\n    color: blue;\n  }\n  @include mq(mobile, tablet) {\n    color: green;\n  }\n  @include mq($from: tablet, $and: '(orientation: landscape)') {\n    color: teal;\n  }\n*/\n.slide-h-next-leave-active,\n.slide-h-next-enter-active,\n.slide-h-prev-leave-active,\n.slide-h-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-h-next-enter, .slide-h-prev-leave-to {\n  transform: translateX(100%);\n  opacity: 0; }\n\n.slide-h-next-leave-to, .slide-h-prev-enter {\n  transform: translateX(-100%);\n  opacity: 0; }\n\n.slide-v-next-leave-active,\n.slide-v-next-enter-active,\n.slide-v-prev-leave-active,\n.slide-v-prev-enter-active {\n  position: absolute;\n  transition: transform .3s, opacity .3s; }\n\n.slide-v-next-enter, .slide-v-prev-leave-to {\n  transform: translateY(100%);\n  opacity: 0; }\n\n.slide-v-next-leave-to, .slide-v-prev-enter {\n  transform: translateY(-100%);\n  opacity: 0; }\n\n.yearMonth-leave-active, .yearMonth-enter-active {\n  position: absolute;\n  transition: opacity .3s; }\n\n.yearMonth-enter, .yearMonth-leave-to {\n  opacity: 0; }\n\n.datepicker {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  width: 290px;\n  left: 0;\n  top: 100%;\n  will-change: transform;\n  background-color: white;\n  border-radius: 6px;\n  box-shadow: 0 2px 8px rgba(50, 50, 93, 0.2);\n  /* Title\n  ---------------------- */\n  /* Contsnt\n  ---------------------- */\n  /* Week\n  ---------------------- */\n  /* Days\n  ---------------------- */ }\n  .datepicker:focus, .datepicker:active {\n    outline: 0; }\n  @media only screen and (min-width: 768px) {\n    .datepicker {\n      width: 315px; } }\n  .datepicker--inline {\n    position: relative;\n    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n  @media only screen and (max-width: 479px) {\n    .datepicker--fullscreen-mobile {\n      position: fixed;\n      top: auto !important;\n      bottom: 0 !important;\n      left: 0 !important;\n      right: 0 !important;\n      height: 422px;\n      width: 100%;\n      border-radius: 12px 12px 0 0; }\n      @supports (padding-bottom: constant(safe-area-inset-bottom)) {\n        .datepicker--fullscreen-mobile {\n          --safe-area-inset-bottom: constant(safe-area-inset-bottom);\n          height: calc(422px + var(--safe-area-inset-bottom)); } }\n      @supports (padding-bottom: env(safe-area-inset-bottom)) {\n        .datepicker--fullscreen-mobile {\n          --safe-area-inset-bottom: env(safe-area-inset-bottom);\n          height: calc(422px + var(--safe-area-inset-bottom)); } }\n      .datepicker--fullscreen-mobile .datepicker-header {\n        border-radius: 0; }\n      .datepicker--fullscreen-mobile.datepicker--no-header {\n        height: 342px; }\n      .datepicker--fullscreen-mobile.datepicker--presets-row-1 {\n        height: 454px; }\n        .datepicker--fullscreen-mobile.datepicker--presets-row-1.datepicker--no-header {\n          height: 374px; }\n      .datepicker--fullscreen-mobile.datepicker--presets-row-2 {\n        height: 486px; }\n        .datepicker--fullscreen-mobile.datepicker--presets-row-2.datepicker--no-header {\n          height: 406px; } }\n  .datepicker-title {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 0 0 16px;\n    border-radius: 12px 12px 0 0; }\n    @media only screen and (min-width: 480px) {\n      .datepicker-title {\n        display: none; } }\n    .datepicker-title p {\n      margin: 0; }\n    .datepicker-title button {\n      position: relative;\n      flex: 0 0 40px;\n      height: 48px;\n      width: 48px;\n      padding: 0 16px 0 8px;\n      border: none;\n      outline: none;\n      background-color: transparent;\n      user-select: none;\n      cursor: pointer; }\n      @media only screen and (min-width: 768px) {\n        .datepicker-title button {\n          height: 56px;\n          width: 56px; } }\n      .datepicker-title button svg {\n        width: 24px;\n        height: 24px; }\n  .datepicker-content {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    height: 100%; }\n  .datepicker-week {\n    font-size: 12px;\n    line-height: 12px;\n    font-weight: 500;\n    padding: 8px 12px;\n    color: rgba(0, 0, 0, 0.38); }\n    @media only screen and (min-width: 768px) {\n      .datepicker-week {\n        padding: 8px 14px; } }\n    .datepicker-week .datepicker-weekday {\n      float: left;\n      width: calc(100% / 7);\n      text-align: center; }\n      @media only screen and (min-width: 768px) {\n        .datepicker-week .datepicker-weekday {\n          width: 40px; } }\n  .datepicker-days__wrapper {\n    position: relative;\n    height: 180px;\n    margin: 0 12px 12px;\n    overflow: hidden;\n    transition: height 0.3s cubic-bezier(0.23, 1, 0.32, 1); }\n    @media only screen and (min-width: 768px) {\n      .datepicker-days__wrapper {\n        margin: 0 14px 14px;\n        height: 200px; } }\n    .datepicker-days__wrapper.has-6-weeks {\n      height: 216px; }\n      @media only screen and (min-width: 768px) {\n        .datepicker-days__wrapper.has-6-weeks {\n          height: 240px; } }\n  .datepicker-days {\n    display: flex;\n    flex-wrap: wrap;\n    overflow: hidden;\n    width: 100%; }\n    .datepicker-days .datepicker-day {\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      /* inherit font & color from ancestor */\n      color: inherit;\n      font: inherit;\n      /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */\n      line-height: normal;\n      /* Corrects font smoothing for webkit */\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      /* Corrects inability to style clickable `input` types in iOS */\n      -webkit-appearance: none;\n      position: relative;\n      width: calc(100% / 7);\n      height: 36px;\n      line-height: 1;\n      font-size: 12px;\n      float: left;\n      text-align: center;\n      color: rgba(0, 0, 0, 0.87);\n      font-weight: 500;\n      cursor: pointer;\n      transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);\n      overflow: hidden; }\n      .datepicker-days .datepicker-day:focus, .datepicker-days .datepicker-day:active {\n        outline: 0;\n        box-shadow: 0; }\n      @media only screen and (min-width: 768px) {\n        .datepicker-days .datepicker-day {\n          width: calc(100% / 7);\n          height: 40px; } }\n      .datepicker-days .datepicker-day:hover:not(.disabled) {\n        color: white; }\n        .datepicker-days .datepicker-day:hover:not(.disabled) .datepicker-day__effect {\n          transform: translateX(-50%) scale(1);\n          opacity: .5; }\n      .datepicker-days .datepicker-day.in-range:not(.disabled), .datepicker-days .datepicker-day.between:not(.disabled) {\n        color: white; }\n        .datepicker-days .datepicker-day.in-range:not(.disabled) .datepicker-day__effect, .datepicker-days .datepicker-day.between:not(.disabled) .datepicker-day__effect {\n          transform: translateX(-50%) scale(1);\n          opacity: 1;\n          left: 0;\n          width: calc(100% + 1px);\n          border-radius: 0;\n          opacity: .5; }\n          .datepicker-days .datepicker-day.in-range:not(.disabled) .datepicker-day__effect:before, .datepicker-days .datepicker-day.between:not(.disabled) .datepicker-day__effect:before {\n            opacity: 1;\n            left: 50%; }\n      .datepicker-days .datepicker-day.selected {\n        color: white; }\n        .datepicker-days .datepicker-day.selected:hover:not(.disabled) .datepicker-day__effect {\n          opacity: 1; }\n        .datepicker-days .datepicker-day.selected .datepicker-day__effect {\n          transform: translateX(-50%) scale(1);\n          opacity: 1; }\n      .datepicker-days .datepicker-day.first .datepicker-day__effect, .datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect {\n        opacity: 1; }\n        .datepicker-days .datepicker-day.first .datepicker-day__effect:before, .datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect:before {\n          opacity: .5;\n          left: 50%; }\n      .datepicker-days .datepicker-day.last .datepicker-day__effect, .datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect {\n        opacity: 1; }\n        .datepicker-days .datepicker-day.last .datepicker-day__effect:before, .datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect:before {\n          opacity: .5;\n          left: -50%; }\n      .datepicker-days .datepicker-day.first.last .datepicker-day__effect:before {\n        opacity: 0; }\n      .datepicker-days .datepicker-day.disabled {\n        cursor: default;\n        color: rgba(0, 0, 0, 0.26); }\n        .datepicker-days .datepicker-day.disabled:hover .datepicker-day__effect,\n        .datepicker-days .datepicker-day.disabled:hover .datepicker-day__effect:before {\n          opacity: 0 !important; }\n    .datepicker-days .datepicker-day--current {\n      position: absolute;\n      top: 1px;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 34px;\n      height: 34px;\n      border-radius: 50%;\n      border: 1px solid currentColor; }\n      @media only screen and (min-width: 768px) {\n        .datepicker-days .datepicker-day--current {\n          top: 4px;\n          width: 36px;\n          height: 36px; } }\n    .datepicker-days .datepicker-day__effect {\n      position: absolute;\n      top: 1px;\n      left: 50%;\n      width: 34px;\n      height: 34px;\n      border-radius: 50%;\n      transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);\n      transition-property: transform, opacity;\n      transform: translateX(-50%) scale(0); }\n      @media only screen and (min-width: 768px) {\n        .datepicker-days .datepicker-day__effect {\n          top: 4px;\n          width: 36px;\n          height: 36px; } }\n      .datepicker--range .datepicker-days .datepicker-day__effect:before {\n        content: \"\";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: inherit;\n        opacity: 0; }\n      .datepicker--range-selecting .datepicker-days .datepicker-day__effect {\n        transform: translateX(-50%) scale(1);\n        opacity: 0;\n        transition: none; }\n    .datepicker-days .datepicker-day__text {\n      position: relative;\n      vertical-align: sub; }\n\n.datepicker-transition-enter-active, .datepicker-transition-leave-active {\n  opacity: 1;\n  transition: all 300ms;\n  transition-property: transform, opacity;\n  transform: scale(1); }\n  @media only screen and (max-width: 479px) {\n    .datepicker-transition-enter-active.datepicker--fullscreen-mobile, .datepicker-transition-leave-active.datepicker--fullscreen-mobile {\n      transform: translateY(0); } }\n\n.datepicker-transition-leave-to, .datepicker-transition-enter {\n  opacity: 0;\n  transform: scale(0); }\n  @media only screen and (max-width: 479px) {\n    .datepicker-transition-leave-to.datepicker--fullscreen-mobile, .datepicker-transition-enter.datepicker--fullscreen-mobile {\n      transform: translateY(100%); } }\n\n/*# sourceMappingURL=DatePickerAgenda.vue.map */",null]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$7 = "data-v-9ed20d10";
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePickerAgenda.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$7() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$7.styles || (__vue_create_injector__$7.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DatepickerAgenda = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    __vue_create_injector__$7);

function generateRandomId() {
  return "_".concat(Math.random().toString(36).substr(2, 9));
}

//
var script$8 = {
  name: 'DatePicker',
  components: {
    DatePickerCustomInput: DatePickerCustomInput,
    DatePickerOverlay: DatePickerOverlay,
    DatepickerAgenda: DatepickerAgenda
  },
  props: {
    id: {
      type: String,
      default: 'datepicker'
    },
    name: {
      type: String,
      default: 'datepicker'
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
    endDate: {
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
    // Set if header in agenda should be visible
    noHeader: {
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
      type: String,
      default: '#app'
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
      return "".concat(this.id).concat(generateRandomId());
    },
    // If format isnt specificed, select default format from type
    inputFormat: function inputFormat() {
      if (!this.format) return getDefaultInputFormat(this.range ? 'range' : this.type);
      return this.format;
    },
    headerFormat: function headerFormat() {
      if (!this.formatHeader) return getDefaultHeaderFormat(this.range ? 'range' : this.type);
      return this.formatHeader;
    },
    outputFormat: function outputFormat() {
      if (!this.formatOutput) return getDefaultOutputFormat(this.range ? 'range' : this.type);
      return this.formatOutput;
    }
  },
  watch: {
    value: {
      handler: function handler(newDate) {
        if (this.range) {
          this.date = {
            start: newDate && newDate.start && formatDate(newDate.start, this.locale),
            end: newDate && newDate.end && formatDate(newDate.end, this.locale)
          };
          return;
        }

        this.date = newDate && dayjs(newDate, this.outputFormat);
      },
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
      if (this.disabled) return;
      this.isVisible = true;
      this.$emit('onOpen');
    },
    hideDatePicker: function hideDatePicker() {
      if (!this.isVisible) return;
      this.isVisible = false;
      clearAllBodyScrollLocks();
      this.$emit('onClose');
    },
    changeDate: function changeDate(date) {
      this.date = date;
      this.$emit('input', formatDateToSend(date, this.outputFormat, this.range));
      this.$emit('onChange');
    }
  }
};

/* script */
            const __vue_script__$8 = script$8;
            
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "datepicker-container",
      class: { "datepicker-container--active": _vm.isVisible }
    },
    [
      !_vm.inline
        ? _c("DatePickerCustomInput", {
            attrs: {
              id: _vm.componentId,
              name: _vm.name,
              date: _vm.value ? _vm.date : _vm.value,
              type: _vm.type,
              range: _vm.range,
              format: _vm.inputFormat,
              locale: _vm.locale,
              placeholder: _vm.placeholder,
              color: _vm.color,
              disabled: _vm.disabled,
              tabindex: _vm.tabindex
            },
            on: {
              toggleDatepicker: _vm.toggleDatepicker,
              focus: _vm.showDatePicker
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("DatePickerOverlay", {
        attrs: {
          isVisible: _vm.isVisible,
          "fullscreen-mobile": _vm.fullscreenMobile,
          "attach-to": _vm.attachTo,
          "z-index": _vm.zIndex
        },
        on: { close: _vm.hideDatePicker }
      }),
      _vm._v(" "),
      _c("DatepickerAgenda", {
        attrs: {
          name: _vm.name,
          isVisible: _vm.isVisible,
          date: _vm.date,
          type: _vm.type,
          range: _vm.range,
          "range-header-text": _vm.rangeHeaderText,
          "range-presets": _vm.rangePresets,
          "format-header": _vm.headerFormat,
          locale: _vm.locale,
          "no-header": _vm.noHeader,
          inline: _vm.inline,
          "fullscreen-mobile": _vm.fullscreenMobile,
          color: _vm.color,
          close: _vm.hideDatePicker,
          "min-date": _vm.minDate,
          "end-date": _vm.endDate,
          "attach-to": _vm.attachTo,
          "z-index": _vm.zIndex + 1
        },
        on: {
          selectDate: _vm.changeDate,
          close: _vm.hideDatePicker,
          hide: _vm.hideDatePicker
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-14b47b62_0", { source: "\n*, ::before, ::after {\n  box-sizing: border-box;\n}\n", map: {"version":3,"sources":["/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePicker.vue"],"names":[],"mappings":";AAuMA;EACA,sBAAA;AACA","file":"DatePicker.vue","sourcesContent":["<template>\n  <div\n    :class=\"{ 'datepicker-container--active' : isVisible }\"\n    class=\"datepicker-container\">\n    <DatePickerCustomInput\n      v-if=\"!inline\"\n      :id=\"componentId\"\n      :name=\"name\"\n      :date=\"value ? date : value\"\n      :type=\"type\"\n      :range=\"range\"\n      :format=\"inputFormat\"\n      :locale=\"locale\"\n      :placeholder=\"placeholder\"\n      :color=\"color\"\n      :disabled=\"disabled\"\n      :tabindex=\"tabindex\"\n      @toggleDatepicker=\"toggleDatepicker\"\n      @focus=\"showDatePicker\"\n    />\n    <DatePickerOverlay\n      :isVisible=\"isVisible\"\n      :fullscreen-mobile=\"fullscreenMobile\"\n      :attach-to=\"attachTo\"\n      :z-index=\"zIndex\"\n      @close=\"hideDatePicker\"\n    />\n    <DatepickerAgenda\n      :name=\"name\"\n      :isVisible=\"isVisible\"\n      :date=\"date\"\n      :type=\"type\"\n      :range=\"range\"\n      :range-header-text=\"rangeHeaderText\"\n      :range-presets=\"rangePresets\"\n      :format-header=\"headerFormat\"\n      :locale=\"locale\"\n      :no-header=\"noHeader\"\n      :inline=\"inline\"\n      :fullscreen-mobile=\"fullscreenMobile\"\n      :color=\"color\"\n      :close=\"hideDatePicker\"\n      :min-date=\"minDate\"\n      :end-date=\"endDate\"\n      :attach-to=\"attachTo\"\n      :z-index=\"zIndex + 1\"\n      @selectDate=\"changeDate\"\n      @close=\"hideDatePicker\"\n      @hide=\"hideDatePicker\"\n    />\n  </div>\n</template>\n\n<script>\nimport dayjs from 'dayjs';\nimport { clearAllBodyScrollLocks } from 'body-scroll-lock';\nimport DatePickerCustomInput from './DatePickerCustomInput.vue';\nimport DatePickerOverlay from './DatePickerOverlay.vue';\nimport DatepickerAgenda from './DatePickerAgenda.vue';\nimport { generateRandomId } from '../../utils/helpers';\nimport {\n  getDefaultLocale,\n  setLocaleLang,\n  getDefaultInputFormat,\n  getDefaultHeaderFormat,\n  getDefaultOutputFormat,\n  formatDate,\n  formatDateToSend,\n} from '../../utils/Dates';\n\nexport default {\n  name: 'DatePicker',\n  components: { DatePickerCustomInput, DatePickerOverlay, DatepickerAgenda },\n  props: {\n    id: { type: String, default: 'datepicker' },\n    name: { type: String, default: 'datepicker' },\n    // type (date, month, quarter, year picker)\n    type: { type: String, default: 'date' },\n    // Range\n    range: { type: Boolean, default: false },\n    rangeHeaderText: { type: String, default: 'From %d To %d' },\n    rangePresets: { type: Array, default: undefined },\n    // Current Value from v-model\n    value: { type: [String, Object, Number, Date] },\n    // Format\n    format: { type: String, default: undefined },\n    formatHeader: { type: String, default: undefined },\n    formatOutput: { type: String, default: undefined },\n    // Show/hide datepicker\n    visible: { type: Boolean, default: false },\n    // Sets the locale.\n    locale: {\n      type: Object,\n      default: () => ({ lang: getDefaultLocale() }),\n    },\n    placeholder: { type: String, default: 'YYYY-MM-DD' },\n    // Applies specified color to the control\n    color: { type: String, default: '#4f88ff' },\n    // Allowed dates\n    minDate: { type: [String, Number, Date] },\n    endDate: { type: [String, Number, Date] },\n    // Disabled all datepicker\n    disabled: { type: Boolean, default: false },\n    // Inline\n    inline: { type: Boolean, default: false },\n    // Set if header in agenda should be visible\n    noHeader: { type: Boolean, default: false },\n    // Responsive bottom sheet\n    fullscreenMobile: { type: Boolean, default: false },\n    // tabindex\n    tabindex: { type: [String, Number], default: '0' },\n    // Specificy a z-index for agenda & overlay\n    zIndex: { type: Number, default: 1 },\n    // attachTo\n    attachTo: { type: String, default: '#app' },\n  },\n  data: () => ({\n    date: undefined,\n    isVisible: undefined,\n  }),\n  computed: {\n    // use a computed to have a dynamicId for each instance\n    componentId () {\n      return `${this.id}${generateRandomId()}`;\n    },\n    // If format isnt specificed, select default format from type\n    inputFormat () {\n      if (!this.format) return getDefaultInputFormat(this.range ? 'range' : this.type);\n      return this.format;\n    },\n    headerFormat () {\n      if (!this.formatHeader) return getDefaultHeaderFormat(this.range ? 'range' : this.type);\n      return this.formatHeader;\n    },\n    outputFormat () {\n      if (!this.formatOutput) return getDefaultOutputFormat(this.range ? 'range' : this.type);\n      return this.formatOutput;\n    },\n  },\n  watch: {\n    value: {\n      handler (newDate) {\n        if (this.range) {\n          this.date = {\n            start: newDate && newDate.start && formatDate(newDate.start, this.locale),\n            end: newDate && newDate.end && formatDate(newDate.end, this.locale),\n          };\n          return;\n        }\n        this.date = newDate && dayjs(newDate, this.outputFormat);\n      },\n      immediate: true,\n    },\n    visible: {\n      handler (isVisible) {\n        this.isVisible = isVisible;\n      },\n      immediate: true,\n    },\n    locale: {\n      handler (newLocale) {\n        setLocaleLang(newLocale);\n      },\n      immediate: true,\n    },\n  },\n  beforeDestroy () {\n    this.hideDatePicker();\n    this.$emit('onDestroy');\n  },\n  methods: {\n    toggleDatepicker () {\n      if (this.isVisible) {\n        this.hideDatePicker();\n        return;\n      }\n      this.showDatePicker();\n    },\n    showDatePicker () {\n      if (this.disabled) return;\n      this.isVisible = true;\n      this.$emit('onOpen');\n    },\n    hideDatePicker () {\n      if (!this.isVisible) return;\n      this.isVisible = false;\n      clearAllBodyScrollLocks();\n      this.$emit('onClose');\n    },\n    changeDate (date) {\n      this.date = date;\n      this.$emit('input', formatDateToSend(date, this.outputFormat, this.range));\n      this.$emit('onChange');\n    },\n  },\n};\n</script>\n\n<style>\n  *, ::before, ::after {\n    box-sizing: border-box;\n  }\n</style>\n\n<style lang=\"scss\" scoped>\n  .datepicker-container {\n    position: relative;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: auto;\n    cursor: pointer;\n\n    &:focus,\n    &:active {\n      outline: 0;\n    }\n  }\n</style>\n"]}, media: undefined })
,inject("data-v-14b47b62_1", { source: ".datepicker-container[data-v-14b47b62] {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  width: auto;\n  cursor: pointer;\n}\n.datepicker-container[data-v-14b47b62]:focus, .datepicker-container[data-v-14b47b62]:active {\n    outline: 0;\n}\n\n/*# sourceMappingURL=DatePicker.vue.map */", map: {"version":3,"sources":["/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePicker.vue","DatePicker.vue"],"names":[],"mappings":"AA6MA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,WAAA;EACA,eAAA;AAAA;AANA;IAUA,UAAA;AAAA;;AC7MA,yCAAyC","file":"DatePicker.vue","sourcesContent":[null,".datepicker-container {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  width: auto;\n  cursor: pointer; }\n  .datepicker-container:focus, .datepicker-container:active {\n    outline: 0; }\n\n/*# sourceMappingURL=DatePicker.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = "data-v-14b47b62";
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/stan/Web/Github/vue-datepicker/src/components/datepicker/DatePicker.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$8() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$8.styles || (__vue_create_injector__$8.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
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
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var VueDatePicker = __vue_normalize__$8(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    __vue_create_injector__$8);

var install = function install(Vue) {
  Vue.component('VueDatePicker', VueDatePicker);
  Vue.component('vue-datepicker', VueDatePicker);
}; // Plugin


var plugin = {
  // eslint-disable-next-line no-undef
  version: "0.1.5",
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
