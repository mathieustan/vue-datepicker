// Constants
import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
  DATE_HEADER_REGEX,
} from '../../../constants';

export {
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
  replaceRegexWithDates,
};

function getDefaultInputFormat (type = 'date') {
  return DEFAULT_INPUT_DATE_FORMAT[type];
}

function getDefaultHeaderFormat (type = 'date') {
  return DEFAULT_HEADER_DATE_FORMAT[type];
}

function getDefaultOutputFormat (type = 'date') {
  return DEFAULT_OUTPUT_DATE_FORMAT[type];
}

function replaceRegexWithDates ({ regexText, startDate, endDate }, split) {
  const text = regexText
    .replace(DATE_HEADER_REGEX, `${startDate}${split ? '|' : ''}`)
    .replace(DATE_HEADER_REGEX, `${endDate}${split ? '|' : ''}`);

  if (!split) return text;
  return text.split('|');
}
