# reservation-system
Returns available campsites while preventing a gap as configured in the constants file

# Getting Started
## Prerequisites
* NodeJS version 8.0.0 or later
* NPM version 5.6.0 or later
Run the following commands to get started
```bash
git clone https://github.com/vmike245/reservation-system.git
cd reservation-system
npm install
```

## Running the program
To parse a file run the following command, where **FILE PATH** is the path to the file you want to use
```bash
node ./index.js **FILE PATH**
```

# Further configuration
The project is currently configured with a 1 day gap and the input date format as 'YYYY-MM-DD'. These can be changed by altering the `constants.js` file

# Assumptions
This was made with the assumption that reservations go from 12:00am - 11:59pm. This means that a campsite can be reserved can have a start and end date that is the same. This means a couple of things, the first being that any reservation that is made reserves the campsite for the whole day, unlike a similar but different reservation system that could be used for hotels. The other assumption that I made was that a 1 night gap meant a 1 day gap. For instance, if there was a reservation that started on 2018-08-01, a new reservation could not be made for 2018-07-30 because that would leave a 1 day gap (the 31st).

# Reasoning
The goal of my method for solving this problem was to be able to figure out if a new reservation should be allowed by using a single reservation without needing to relate one reservation to others at a campsite. This makes the code significantly simpler since I don't need to look at any other reservation, or determine the relationship of reservations, to decide if the search does not fit into the open reservations for the campsite.
