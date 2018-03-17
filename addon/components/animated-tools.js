import Component from '@ember/component';
import layout from '../templates/components/animated-tools';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: 'animated-tools',
  classNameBindings: ['isOpen'],
  isOpen: computed(function() {
    return typeof FastBoot === 'undefined' &&
      !!localStorage.getItem('animated-tools-open');
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
