const spawn = require('cross-spawn');

let target = process.argv[2];
const alias = {
  docs: '@mathieustan/vue-datepicker-docs',
};
target = alias[target] || target;

if (!target) {
  spawn('yarn', ['lerna', 'run', 'deploy', '--scope', alias.docs, '--stream'], { stdio: 'inherit' });
} else {
  spawn('yarn', ['lerna', 'run', 'deploy', '--scope', target, '--stream'], { stdio: 'inherit' });
}
