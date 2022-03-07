import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';

export default class extends Controller {
  @tracked showLeft = true;
  rules = rules;

  @action toggle() {
    this.showLeft = !this.showLeft;
  }
}

function rules({ firstTime, oldItems, newItems }) {
  if (firstTime) {
    return;
  }
  if (oldItems[0] < newItems[0]) {
    return toRight;
  } else {
    return toLeft;
  }
}
