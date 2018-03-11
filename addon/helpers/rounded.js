import { helper } from '@ember/component/helper';

export function rounded([value]) {
  if (value != null) {
    return Math.round(value);
  }
}

export default helper(rounded);
