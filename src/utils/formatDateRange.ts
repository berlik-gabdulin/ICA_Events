// Функция для преобразования даты в желаемый формат
export function formatDateRange(event: any): string {
  let beginDate: any = '',
    endDate: any = '';
  if (event.beginDate.includes('-')) {
    beginDate = new Date(event.beginDate.split(' ')[0]);
    endDate = new Date(event.endDate);
  } else if (event.beginDate.includes('.')) {
    const splitBeginDate = event.beginDate.split('.');
    beginDate = new Date(`${splitBeginDate[2]}-${splitBeginDate[1]}-${splitBeginDate[0]}`);

    const splitEndDate = event.endDate.split('.');
    endDate = new Date(`${splitEndDate[2]}-${splitEndDate[1]}-${splitEndDate[0]}`);
  }
  if (
    beginDate.toLocaleString('en', { month: 'long' }) ===
    endDate.toLocaleString('en', { month: 'long' })
  ) {
    if (
      beginDate.toLocaleString('en', {
        day: 'numeric',
      }) !==
      endDate.toLocaleString('en', {
        day: 'numeric',
      })
    ) {
      event.textDate = `${beginDate.toLocaleString('en', {
        day: 'numeric',
      })} - ${endDate.toLocaleString('en', {
        day: 'numeric',
      })} ${endDate.toLocaleString('en', {
        month: 'long',
      })} ${endDate.toLocaleString('en', {
        year: 'numeric',
      })}`;
    } else {
      event.textDate = `${beginDate.toLocaleString('en', {
        day: 'numeric',
      })} ${endDate.toLocaleString('en', {
        month: 'long',
      })} ${endDate.toLocaleString('en', {
        year: 'numeric',
      })}`;
    }
  } else {
    event.textDate = `${beginDate.toLocaleString('en', {
      day: 'numeric',
    })} ${beginDate.toLocaleString('en', {
      month: 'long',
    })} - ${endDate.toLocaleString('en', {
      day: 'numeric',
    })} ${endDate.toLocaleString('en', {
      month: 'long',
    })} ${endDate.toLocaleString('en', { year: 'numeric' })}`;
  }

  return event.textDate;
}
