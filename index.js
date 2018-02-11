/* eslint-env node */
'use strict';
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-animated-tools',
  treeForAddon(tree) {
    let timeControl = new Funnel(path.dirname(require.resolve('ember-animated/addon-test-support/time-control')), {
      destDir: 'reexported',
      include: ['time-control.js']
    });
    return this._super.call(this, mergeTrees([tree, timeControl]));
  }
};
