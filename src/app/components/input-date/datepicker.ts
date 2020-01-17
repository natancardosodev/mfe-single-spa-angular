import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

export const locale = 'pt-br';

export const dateOutputFormat = 'DD/MM/YYYY';

export const config: Partial<BsDatepickerConfig> = {
  dateInputFormat: 'DD/MM/YYYY',
  containerClass: 'theme-default',
  showWeekNumbers: false
};
