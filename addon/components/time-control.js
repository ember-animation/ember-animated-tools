import Component from '@ember/component';
import layout from '../templates/components/time-control';
import TimeControl from '../reexported/time-control';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { task } from 'ember-animated';
import { inject } from '@ember/service';

function toLogSpeed(speedPercent) {
  let percent = speedPercent;
  if (percent <= 1) {
    // Log of zero is infinity. Log of 1% is as low as we go, which
    // counts as paused for us.
    percent = 1;
  }
  return (200 * Math.log(percent)) / Math.log(200);
}

function fromLogSpeed(logSpeed) {
  let percent = Math.exp((Math.log(200) * logSpeed) / 200);
  if (percent <= 1) {
    percent = 0;
  }
  return percent;
}

export default Component.extend({
  layout,
  classNames: ['eat-time-control'],
  speedPercent: 100,
  motionService: inject('-ea-motion'),

  logSpeed: computed('speedPercent', function () {
    return toLogSpeed(this.speedPercent);
  }),

  tickMarks: computed(function () {
    return [
      { value: 0, text: 'Paused' },
      { value: 5, text: '5%' },
      { value: 10, text: '10%' },
      { value: 25, text: '25%' },
      { value: 50, text: '50%' },
      { value: 100, text: '100%' },
    ].map((entry) => {
      entry.position = htmlSafe(`left: ${toLogSpeed(entry.value) / 2}%`);
      return entry;
    });
  }),

  didInsertElement() {
    // weirdly, ember is not initializing this for me correctly
    this.element.querySelector('input').value = this.logSpeed;
  },

  willDestroyElement() {
    if (this.time) {
      this.time.finished();
      this.time = null;
    }
  },

  actions: {
    updateLogSpeed(event) {
      this._setSpeed(fromLogSpeed(event.target.valueAsNumber));
    },

    tickMarkChosen(tickMark) {
      this._setSpeed(tickMark.value);
    },
  },

  _setSpeed(speed) {
    this._speedSetter.perform(speed);
  },

  _speedSetter: task(function* (speed) {
    if (speed === 100) {
      // at normal speed, we want to disable our time control
      // entirely. This means we won't intefere with things like
      // acceptance tests that may already want to take over the
      // timing.
      //
      // But if there's an animation in progress, we must wait until
      // it's done. Otherwise there will be a jarring jump from our
      // fake time to the real time.
      if (this.time) {
        this.time.runAtSpeed(1);
        this.set('speedPercent', speed);
        // eslint-disable-next-line ember/no-get
        yield this.get('motionService.waitUntilIdle').perform();
        this.time.finished();
        this.time = null;
      }
    } else {
      if (!this.time) {
        this.time = new TimeControl();
      }
      if (speed === 0) {
        this.time.pause();
      } else {
        this.time.runAtSpeed(speed / 100);
      }
      this.set('speedPercent', speed);
    }
  }).restartable(),
});
