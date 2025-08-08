import mongoose from 'mongoose';

const hijabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
});

const Hijab = mongoose.model('Hijab', hijabSchema);

export default Hijab;
