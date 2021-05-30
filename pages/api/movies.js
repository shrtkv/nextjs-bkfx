import { dbConnect } from '../../utils/dbConnect';
export default async (req, res) => {
  const { db } = await dbConnect();
  const movies = await db
    .collection('movies')
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  res.json(movies);
};
