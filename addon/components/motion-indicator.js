import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['eat-motion-indicator'],
  classNameBindings: ['motionService.isAnimating:active'],
  motionService: service('-ea-motion'),
});
