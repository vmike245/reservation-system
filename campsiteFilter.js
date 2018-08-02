const moment = require('moment');
const { MAX_GAP, DATE_FORMAT } = require('./constants');

module.exports = (search, inventory, reservations) => {
  const { startDate, endDate } = search;
  return inventory.filter((campsite) => {
    const conflictingReservations = reservations.filter((reservation) => {
      if (campsite.id !== reservation.campsiteId) {
        return false;
      }

      if (moment(endDate, DATE_FORMAT).add(1, 'days').isSame(moment(reservation.startDate, DATE_FORMAT))) {
        return false;
      }

      if (moment(startDate, DATE_FORMAT).subtract(1, 'days').isSame(moment(reservation.endDate, DATE_FORMAT))) {
        return false;
      }

      if(moment(endDate, DATE_FORMAT).add(1, 'days').isBefore(moment(reservation.startDate, DATE_FORMAT).subtract(MAX_GAP, 'days'))) {
        return false;
      }

      if(moment(startDate, DATE_FORMAT).subtract(1, 'days').isAfter(moment(reservation.endDate, DATE_FORMAT).add(MAX_GAP, 'days'))) {
        return false;
      }

      return true;

    })
    return conflictingReservations.length === 0;
  })
}