import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  CompleteSearchTitle: {
    type: String
  },
  VimeoId: {
    type: String,
    required: [true, 'Please provide a VimeoID for this movie.'],
    maxlength: [10, 'VimeoId cannot be more than 10 characters']
  },
  original_title: {
    type: String
  },
  title: {
    type: String
  },
  release_date: {
    $date: {
      type: Date
    }
  },
  genre_ids: {
    type: [String]
  },
  id: {
    type: String
  },
  original_language: {
    type: String
  },
  overview: {
    type: String
  },
  poster_path: {
    type: String
  },
  vote_average: {
    type: Number
  },
  vote_count: {
    type: Number
  }
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
