const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;



function SequenceGenerator() {
  Sequence.findOne()
    .then(sequence => {
      // console.log("Sequence Success");
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
      // console.log(sequenceId + ", " + maxDocumentId + ", " + maxMessageId + ", " + maxContactId);

      // res.status(200).json({
      //   sequenceId: sequence._id,
      //   maxDocumentId: sequence.maxDocuentId,
      //   maxMessageId: sequence.maxMessageId,
      //   maxContactId: sequence.maxContactId
      // });
    })
    .catch(error => {
      console.log("Sequence Error");
      console.log(error);
      // res.status(500).json({
      //   message: 'An error occurred',
      //   error: error
      // });
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {

  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.findOneAndReplace({ _id: sequenceId }, { updateObject }),
    function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result);
      }
    }

  return nextId;
}

module.exports = new SequenceGenerator();
