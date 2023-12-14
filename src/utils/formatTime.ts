import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy p');
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fDateSlash(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function formatDate(dateString: Date | string): string {
  const date = new Date(dateString);
  return [
    date.getDate().toString().padStart(2, '0'), // День
    (date.getMonth() + 1).toString().padStart(2, '0'), // Месяц (начиная с 0)
    date.getFullYear(), // Год
  ].join('/');
}
