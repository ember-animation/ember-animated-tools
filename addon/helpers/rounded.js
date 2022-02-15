import { helper } from '@ember/component/helper';

export function eatRounded([value]) {
  if (value != null) {
    return Math.round(value);
  }
}

export default helper(eatRounded);
