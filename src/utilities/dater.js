const moment = require('moment');

module.exports = {
  utcBr: function () {
    let date = new Date();
    date.setHours(date.getHours() - 3);

    return date;
  },
  getMonthName: function (mounthNumber) {
    mounths = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    return mounths[mounthNumber];
  },
  difference: function (past) {
    const now = moment(this.utcBr());
    const duration = moment.duration(now.diff(past));
    const days = (
      duration.days() > 0
      && duration.days() <= 3
      && duration.months() === 0
      && duration.years() === 0
    );
    const hours = (
      duration.hours() > 0 
      && duration.days() === 0
      && duration.months() === 0
      && duration.years() === 0
    ); 
    const minutes = (
      duration.minutes() > 0
      && duration.hours() === 0
      && duration.days() === 0
      && duration.months() === 0
      && duration.years() === 0
    );
    const seconds = (
      duration.seconds() > 0
      && duration.minutes() === 0
      && duration.hours() === 0
      && duration.days() === 0
      && duration.months() === 0
      && duration.years() === 0
    );

    if (seconds) {
      if (duration.seconds() === 1) return `${parseInt(duration.seconds())} segundo atrás`;
      if (duration.seconds() > 1) return `${parseInt(duration.seconds())} segundos atrás`;
    }

    if (minutes) {
      if (duration.minutes() === 1) return `${parseInt(duration.minutes())} minuto atrás`;
      if (duration.minutes() > 1) return `${parseInt(duration.minutes())} minutos atrás`;
    }

    if (hours) {
      if (duration.hours() === 1) return `${parseInt(duration.hours())} hora atrás`;
      if (duration.hours() > 1) return `${parseInt(duration.hours())} horas atrás`;
    }

    if (days) {
      if (duration.days() === 1) return `Há ${parseInt(duration.days())} dia`;
      if (duration.days() > 1) return `Há ${parseInt(duration.days())} dias`;
    }

    const pastDate = new Date(past);


    const finalPastDate = `${pastDate.getDate()} de ${this.getMonthName(pastDate.getMonth())} de ${pastDate.getFullYear()}`;

    return finalPastDate;
  },
  isWeek: function (past) {
    const now = moment(this.utcBr());
    const duration = moment.duration(now.diff(past));

    const isWeek = duration.weeks <= 1;

    return isWeek;
  },
}
