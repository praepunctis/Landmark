var Sequelize = require('sequelize-cockroachdb');
var fs = require('fs');

// Connect to CockroachDB through Sequelize.
var sequelize = new Sequelize('master', 'pointmanager', 'jasonjason', {
    dialect: 'postgres',
    port: 26257,
    logging: false,
    host: 'gcp-us-west2.cruz-cluster.crdb.io',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync('db/certs/ca.crt')
                .toString()
        }
    }
});

// Define the Account model for the "landmarks" table.
var Landmark = sequelize.define('landmarks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.BLOB
  },
  n_ratings: {
    type: Sequelize.INTEGER
  },
  rating: {
    type: Sequelize.FLOAT
  },
  type: {
    type: Sequelize.INTEGER
  }
});

// // Create the "landmarks" table.
// Landmark.sync({
//       force: false
//   })
//   .then(function () {
//       // Insert two rows into the "landmarks" table.
//       return Landmark.bulkCreate([
//         data_to_json(1,1,'1stadium','d',null,10, 3.5, 1),
//       ]);
//   })
//   .then(function () {
//       // Retrieve landmarks.
//       return Landmark.findAll();
//   })
//   .then(function (landmarks) {
//       // Print out values.
//       landmarks.forEach(function (landmark) {
//           console.log(llandmark);
//       });
//       process.exit(0);
//   })
//   .catch(function (err) {
//       console.error('error: ' + err.message);
//       process.exit(1);
//   });

module.exports = {
  push_landmark: function(latitude, longitude, name, description, image, n_ratings, rating, type) {
    Landmark.sync({
        force: false
    })
    .then(function () {
        // Insert two rows into the "landmarks" table.
        return Landmark.bulkCreate([
          {
            latitude: latitude,
            longitude: longitude,
            name: name,
            description: description,
            image: image,
            n_ratings: n_ratings,
            rating: rating,
            type: type
          }
        ]);
    })
    .then(function () {
      // Retrieve landmarks.
      return Landmark.findAll();
    })
    .then(function () {
        process.exit(0);
    })
    .catch(function (err) {
      console.error('error: ' + err.message);
      process.exit(1);
    });
  },

  // pull_landmarks: function () {
  //   Landmark.sync({
  //     force: false
  //   })
  //   .then(function () {
  //         // Retrieve landmarks.

  //     return Landmark.findAll(
  //       {
  //         where: {
  //           // SQL FILTERS HERE
  //         }
  //       }
  //     );
  //   })
  //   .then(function (landmarks) {
  //     return landmarks || []
  //   })
  //   .catch(function (err) {
  //     console.error('error: ' + err.message);
  //     process.exit(1);
  //   });
  // }

  pull_landmarks: function() {
    return [
      {
        latitude: 37.870970,
        longitude: -122.247760,
        name: "California Memorial Stadium",
        description: "California Memorial Stadium is an outdoor football stadium on the campus of the University of California, Berkeley in Berkeley, California. Commonly known as Memorial Stadium, it is the home field for the University of California Golden Bears of the Pac-12 Conference. The venue opened in 1923 and currently seats around 63,000 fans for football. The playing field runs NW-SE, at an elevation of 410 feet (125 m) above sea level. It has been named one of the top college football stadiums by various publications, and it was listed on the U.S. National Register of Historic Places on November 27, 2006.",
        image: null,
        n_ratings: 3000,
        rating: 3.73,
        type: 1
      },
      {
        latitude: 37.872250,
        longitude: -122.251360,
        name: "Witter Rugby Field",
        description: "Not as cool as the big stadium lmao it's like having an older sibling who's always going to be more successful than you in life ;-;",
        image: null,
        n_ratings: 5,
        rating: .7,
        type: 1
      }
    ]
  }
}