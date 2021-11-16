import mongoose from 'mongoose';



export default function mongodbConnection() {

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }

  mongoose
    .connect(process.env.DATABASE_URL!, options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err.message));

}