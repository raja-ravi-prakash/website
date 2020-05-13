import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

export const namePlateWidth = trigger('plate', [
  state(
    'none',
    style({
      height: '0%',
    })
  ),
  state(
    'open',
    style({
      height: '45%',
    })
  ),
  transition('none => open', animate('300ms ease-in')),
  transition('open => none', animate('300ms ease-out')),
]);

export const namePlateElementsFade = trigger('elementsFade', [
  state(
    'none',
    style({
      display: 'none',
      opacity: 0,
      filter: 'blur(5px)',
    })
  ),
  state(
    'open',
    style({
      display: 'block',
      opacity: 1,
      filter: 'blur(0px)',
    })
  ),
  transition('none => open', animate('300ms ease-in')),
  transition('open => none', animate('300ms ease-out')),
  transition('any => open', animate('300ms ease-out')),
]);
