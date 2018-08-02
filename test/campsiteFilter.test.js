const campsiteFilter = require('../campsiteFilter');
const moment = require('moment');
const { expect } = require('chai');
const { DATE_FORMAT, MAX_GAP } = require('../constants');

let search;
let campsites;

describe('Campsite Filter', () => {
  beforeEach(() => {
    search = {
      startDate: '2018-06-04',
      endDate: '2018-06-06'
    },
    campsites = [
      {
        id: 1,
        name: 'Cozy Cabin'
      },
    ]
  })
  describe('should return the campsite', () => {
    it('when the campsite id is not in the list of reservations', () => {
      const reservations = [ {
        campsiteId: 2, startDate: '2018-06-01', endDate: '2018-06-03'
      }]
      expect(campsiteFilter(search, campsites, reservations)).to.deep.equal(campsites)
    })

    it(`when the start date is more than ${MAX_GAP + 1} days from the end date of a reservation`, () => {
      const endDate = moment(search.startDate).subtract(MAX_GAP + 2, 'days').format(DATE_FORMAT);
      const reservations = [ {
        campsiteId: 1, startDate: endDate, endDate
      }]
      expect(campsiteFilter(search, campsites, reservations)).to.deep.equal(campsites)
    })

    it(`when the end date is more than ${MAX_GAP + 1 } days from the start date of a reservation`, () => {
      const startDate = moment(search.endDate).add(MAX_GAP + 2, 'days').format(DATE_FORMAT);
      const reservations = [ {
        campsiteId: 1, startDate, endDate: startDate
      }]
      expect(campsiteFilter(search, campsites, reservations)).to.deep.equal(campsites)
    })

    it(`when the start date is the day after the end date of a reservation`, () => {
      const reservations = [ {
        campsiteId: 1, startDate: '2018-06-01', endDate: '2018-06-03'
      }]
      expect(campsiteFilter(search, campsites, reservations)).to.deep.equal(campsites)
    })

    it(`when the end date is the day before the start date of a reservation`, () => {
      const reservations = [ {
        campsiteId: 1, startDate: '2018-06-07', endDate: '2018-06-08'
      }]
      expect(campsiteFilter(search, campsites, reservations)).to.deep.equal(campsites)
    })
  })

  describe('should not return the campsite', () => {

    it(`when the start date is exactly ${MAX_GAP + 1} days from the end date of a reservation`, () => {
      const endDate = moment(search.startDate).subtract(MAX_GAP + 1, 'days').format(DATE_FORMAT);
      const reservations = [ {
        campsiteId: 1, startDate: endDate, endDate
      }]
      expect(campsiteFilter(search, campsites, reservations)).to.deep.equal([])
    })

    it(`when the end date is exactly ${MAX_GAP + 1 } days from the start date of a reservation`, () => {
      const startDate = moment(search.endDate).add(MAX_GAP + 1, 'days').format(DATE_FORMAT);
      const reservations = [ {
        campsiteId: 1, startDate, endDate: startDate
      }]
      expect(campsiteFilter(search, campsites, reservations)).to.deep.equal([])
    })

  })
})