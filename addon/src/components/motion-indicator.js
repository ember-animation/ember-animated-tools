import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class MotionIndicator extends Component {
  @service('-ea-motion') motionService;
}
