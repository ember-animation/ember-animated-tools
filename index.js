'use strict';
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const Funnel = require('broccoli-funnel');
const resolve = require('resolve');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return process.env.DEV_EMBER_ANIMATED;
  },

  _locateTimeControl() {
    let target = 'ember-animated/addon-test-support/time-control';
    if (this.project.pkg.name === 'ember-animated') {
      target = target.replace('ember-animated', '.');
    }
    let file = resolve.sync(target, { basedir: this.project.root });
    return file;
  },

  treeForAddon(tree) {
    let timeControl = new Funnel(path.dirname(this._locateTimeControl()), {
      destDir: 'reexported',
      include: ['time-control.js']
    });
    return this._super.call(this, mergeTrees([tree, timeControl]));
  }
};
