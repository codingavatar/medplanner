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

// get conditions of given apptId
exports.getConditions = (req, res) => {
  let apptId = req.params.apptId;
  Condition.find({ appts: apptId })
    .exec()
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

// deletes appt with given apptId
exports.deleteAppt = (req, res) => {
  let apptId = req.params.apptId;
  Appt.findByIdAndDelete(apptId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error deleting appt: ', err);
      res.status(400).send(err);
    });
}

// updates questions of given apptId
exports.updateQuestions = (req, res) => {
  let apptId = req.params.apptId;
  let questions = req.body;
  let options = {
    new: true
  };
  Appt.findByIdAndUpdate(apptId, questions, options)
    .then((questions) => {
      res.status(201).send(questions);
    })
    .catch((err) => {
      console.log('Error updating questions: ', err);
      res.status(400).send(err);
    });
};

// updates condition or creates new one with given conditionId
exports.updateCondition = (req, res) => {
  let conditionId = Number(req.params.conditionId);
  let condition = req.body;
  condition.conditionId = conditionId;

  let filter = {
    'conditionId': conditionId
  };
  let options = {
    new: true,
    upsert: true
  };
  Condition.findOneAndUpdate(filter, condition, options)
    .then((condition) => {
      res.status(201).send(condition);
    })
    .catch((err) => {
      console.log('Error updating condition: ', err);
      res.status(400).send(err);
    });
};