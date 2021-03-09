const spawn = require('cross-spawn');

let target = process.argv[2];
const alias = {
  doc: '@mathieustan/vue-datepicker-demo',
  datepicker: '@mathieustan/vue-datepicker',
};
target = alias[target] || target;

if (!target) {
  spawn('yarn', ['lerna', 'run', 'dev', '--scope', alias.datepicker, '--stream'], { stdio: 'inherit' });
} else {
  spawn('yarn', ['lerna', 'run', 'dev', '--scope', target, '--stream'], { stdio: 'inherit' });
}
