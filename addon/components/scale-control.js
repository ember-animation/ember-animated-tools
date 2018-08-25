import Component from '@ember/component';
import layout from '../templates/components/scale-control';

export default Component.extend({
  layout,
  classNames: ['eat-scale-control'],
  scale: 100,

  actions: {
    changeScale(scale) {
      this.set('scale', scale);

      let el = document.getElementsByClassName('ember-view')[0];
      el.style['transform-origin'] = '0px 0px';
      el.style.transform = `scale(${scale/100})`;
    }
  }
});
