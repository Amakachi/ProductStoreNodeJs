const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  name:{
    type: String,
    required: [true, 'Collection name is required']
  },
  description:{
    type: String,
    default: null
  },
  price:{
    type: String,
    required: [true, 'Collection price is required']
  },
  category:{
    type: String,
    required: [true, 'Collection category is required']
  },
  image:{
    type: String,
    default: null
  },
  color:{
    type: String,
    required: [true, 'Collection color is required']
  }
});

const Collection = mongoose.model('collection', CollectionSchema);

module.exports = Collection;
