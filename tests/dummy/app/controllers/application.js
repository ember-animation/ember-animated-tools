import Controller from '@ember/controller';
import { action } from '@ember/object';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';

export default Controller.extend({
  showLeft: true,
  rules,
  toggle: action(function () {
    this.set('showLeft', !this.showLeft);
  })
});

function rules({ firstTime, oldItems, newItems }) {
  if (firstTime) { return; }
  if (oldItems[0] < newItems[0]) {
    return toRight;
  } else {
    return toLeft;
  }
}
