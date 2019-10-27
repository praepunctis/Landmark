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
        // process.exit(0);
    })
    .catch(function (err) {
      console.error('error: ' + err.message);
      // process.exit(1);
    });
  },

  pull_landmarks: function (res) {
    Landmark.sync({
      force: false
    })
    .then(function () {
          // Retrieve landmarks.

      return Landmark.findAll(
        {
        //   where: {
        //     // SQL FILTERS HERE
        //   }
         }
      );
      console.log("First_then")
    })
    .then(function (landmarks) {
      // console.log(landmarks)
      res.send(landmarks)
      return landmarks || []
    })
    .catch(function (err) {
      console.error('error: ' + err.message);
      process.exit(1);
    });
  }

  // pull_landmarks: function() {
  //   return [
  //     {
  //       latitude: 37.870970,
  //       longitude: -122.247760,
  //       name: "California Memorial Stadium",
  //       description: "California Memorial Stadium is an outdoor football stadium on the campus of the University of California, Berkeley in Berkeley, California. Commonly known as Memorial Stadium, it is the home field for the University of California Golden Bears of the Pac-12 Conference. The venue opened in 1923 and currently seats around 63,000 fans for football. The playing field runs NW-SE, at an elevation of 410 feet (125 m) above sea level. It has been named one of the top college football stadiums by various publications, and it was listed on the U.S. National Register of Historic Places on November 27, 2006.",
  //       image: null,
  //       n_ratings: 3000,
  //       rating: 3.73,
  //       type: 1
  //     },
  //     {
  //       latitude: 37.872250,
  //       longitude: -122.251360,
  //       name: "Witter Rugby Field",
  //       description: "Not as cool as the big stadium lmao it's like having an older sibling who's always going to be more successful than you in life ;-;",
  //       image: null,
  //       n_ratings: 5,
  //       rating: .7,
  //       type: 1
  //     },
  //     {
  //       latitude: 37.871860,
  //       longitude: -122.254520,
  //       name:"Cal Performances",
  //       description: "hey this is a cool place where they play music maybe?",
  //       image: null,
  //       n_ratings: 2,
  //       rating: 7,
  //       type:1
  //     },
  //     {        
  //       latitude: 37.791010,
  //       longitude: -122.402100,
  //       name: "Union Square, SF",
  //       description: "the teeming commercial hub of San Francisco, tourists cannot miss",
  //       image: null,
  //       n_ratings: 23,
  //       rating: 4.17,
  //       type: 1
  //     },
  //     {
  //       latitude: 37.427475,
  //       longitude: -122.169716,
  //       name: "Stanford University",
  //       description: "one of the top universities in California",
  //       image: null,
  //       n_ratings: 8,
  //       rating: 3.98,
  //       type: 1
  //     }, 
  //     {
  //       latitude: 37.808674,
  //       longitude: -122.409821,
  //       name: "Pier 39",
  //       description: "great place for dinning and shopping",
  //       image: null,
  //       n_ratings: 26,
  //       rating: 4.7,
  //       type: 1
  //     },
  //     {
  //       latitude: 38.502468,
  //       longitude: -122.265388,
  //       name: "Napa Valley",
  //       description: "a renowned Californian wine-producing region north of San Francisco, with hundred’s of vineyards",
  //       image: null,
  //       n_ratings: 12,
  //       rating: 3.4,
  //       type: 1
  //     },   
  //     {   
  //       latitude: 37.875170,
  //       longitude: -122.247980,
  //       name: "Lawrence Berkeley National Laboratory, CA",
  //       description: "books yo, read em for a free lamborghanoff",
  //       image: null,
  //       n_ratings: 4,
  //       rating: 3.3,
  //       type: 1
  //   }
  //   ]
  // }
}