import Component from '@ember/component';
import layout from '../templates/components/animated-tools';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  tests: computed(function() {
    if (!this.get('hideUntilKeys')) {
      return null;
    }
    return this.get('hideUntilKeys').split('-').map(part => {
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
    if (this.get('hideUntilKeys')) {
      this._keyListener = this._keyListener.bind(this);
      document.addEventListener('keydown', this._keyListener);
    }
  },

  willDestroyElement() {
    if (this.get('hideUntilKeys')) {
      document.removeEventListener('keydown', this._keyListener);
    }
  },

  _keyListener(event) {
    if (this.get('tests').every(test => test(event))) {
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

  isHidden: computed(function() {
    // always hidden in fastboot
    return typeof FastBoot !== 'undefined' ||

      // or hidden if we we're using hideUntilKeys and the keys haven't been
      // pressed yet
      (this.get('hideUntilKeys') && !localStorage.getItem('animated-tools-activated'));
  }),

  actions: {
    toggle() {
      if (this.get('isOpen')) {
        localStorage.removeItem('animated-tools-open');
      } else {
        localStorage.setItem('animated-tools-open', true);
      }
      this.notifyPropertyChange('isOpen');
    }
  }
});
