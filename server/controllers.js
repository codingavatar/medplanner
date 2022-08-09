const { Appt, Condition } = require('./db.js');

// get all appts
exports.getAppts = (req, res) => {
  Appt.find({})
    .sort('date')
    .exec()
    .then((appts) => {
      res.status(200).send(appts);
    })
    .catch((err) => {
      console.log('Error getting appts: ', err);
      res.status(400).send(err);
    });
};

// get one appt with conditions
exports.getOneApptAndConditions = (req, res) => {
  let apptId = req.params.apptId;
  Appt.findById(apptId).populate('conditions')
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log('Error getting conditions: ', err);
      res.status(400).send(err);
    });
};

// posts one appt and returns newly created appt
exports.postAppt = (req, res) => {
  let appt = req.body;
  Appt.create(appt)
    .then((appt) => {
      res.status(201).send(appt);
    })
    .catch((err) => {
      console.log('Error posting appt: ', err);
      res.status(400).send(err);
    });
};