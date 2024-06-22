import * as moment from 'moment-timezone';

const formatDate = (date: string | Date, format: string) => {
  return moment.tz(date, '"Asia/Jakarta"').format(format);
};

export { formatDate };
