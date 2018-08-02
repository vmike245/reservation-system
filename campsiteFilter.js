const moment = require('moment');
const { MAX_GAP } = require('./constants');

module.exports = (search, inventory, reservations) => {
  const { startDate, endDate } = search;
  return inventory.filter((campsite) => {
    const conflictingReservations = reservations.filter((reservation) => {
      if (campsite.id !== reservation.campsiteId) {
        return false;
      }

      if (moment(endDate).add(1, 'days').isSame(moment(reservation.startDate))) {
        return false;
      }

      if (moment(startDate).subtract(1, 'days').isSame(moment(reservation.endDate))) {
        return false;
      }

      if(moment(endDate).add(1, 'days').isBefore(moment(reservation.startDate).subtract(MAX_GAP, 'days'))) {
        return false;
      }

      if(moment(startDate).subtract(1, 'days').isAfter(moment(reservation.endDate).add(MAX_GAP, 'days'))) {
        return false;
      }

      return true

    })
    return conflictingReservations.length === 0;
  })
}