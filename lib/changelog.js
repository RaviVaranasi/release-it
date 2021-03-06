const _ = require('lodash');
const Shell = require('./shell');

const noop = Promise.resolve();

class Changelog {
  constructor(options = {}) {
    this.shell = options.shell || new Shell();
    this.create = _.memoize(this.create);
  }
  create(command, latestTag) {
    if (command) {
      if (/^git log/.test(command)) {
        const cmd = command.replace(/\[REV_RANGE\]/, latestTag ? `${latestTag}...HEAD` : '');
        return this.shell.run(cmd);
      } else {
        return this.shell.runTemplateCommand(command);
      }
    }
    return noop;
  }
}

module.exports = Changelog;
