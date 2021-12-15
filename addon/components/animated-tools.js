import Component from '@ember/component';
import layout from '../templates/components/animated-tools';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  tests: computed('hideUntilKeys', function() {
    if (!this.hideUntilKeys) {
      return null;
    }
    return this.hideUntilKeys.split('-').map(part => {
      if (part === 'Ctrl') {
        return (event) => event.ctrlKey;
      }
      if (part === 'Alt') {
        return (event) => event.altKey;
      }
      if (part === 'Shift') {
        return (event) => event.shiftKey;
      }
      return (event) => event.code === part;
    });
  }),

  didInsertElement() {
    if (this.hideUntilKeys) {
      this._keyListener = this._keyListener.bind(this);
      document.addEventListener('keydown', this._keyListener);
    }
  },

  willDestroyElement() {
    if (this.hideUntilKeys) {
      document.removeEventListener('keydown', this._keyListener);
    }
  },

  _keyListener(event) {
    if (this.tests.every(test => test(event))) {
      if (localStorage.getItem('animated-tools-activated')) {
        localStorage.removeItem('animated-tools-activated');
      } else {
        localStorage.setItem('animated-tools-activated', true);
        localStorage.setItem('animated-tools-open', true);
      }
      this.notifyPropertyChange('isHidden');
      this.notifyPropertyChange('isOpen');
    }
  },

  isOpen: computed(function() {
    return typeof FastBoot === 'undefined' &&
      !!localStorage.getItem('animated-tools-open');
  }),

  isHidden: computed('hideUntilKeys', function() {
    // always hidden in fastboot
    return typeof FastBoot !== 'undefined' ||

      // or hidden if we we're using hideUntilKeys and the keys haven't been
      // pressed yet
      (this.hideUntilKeys && !localStorage.getItem('animated-tools-activated'));
  }),

  actions: {
    toggle() {
      if (this.isOpen) {
        localStorage.removeItem('animated-tools-open');
      } else {
        localStorage.setItem('animated-tools-open', true);
      }
      this.notifyPropertyChange('isOpen');
    }
  }
});
