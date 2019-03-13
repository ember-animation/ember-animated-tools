import Controller from '@ember/controller';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';

export default Controller.extend({
  showLeft: true,
  rules,
  actions: {
    toggle() {
      this.set('showLeft', !this.get('showLeft'));
    }
  }
});

function rules({ firstTime, oldItems, newItems }) {
  if (firstTime) { return; }
  if (oldItems[0] < newItems[0]) {
    return toRight;
  } else {
    return toLeft;
  }
}
