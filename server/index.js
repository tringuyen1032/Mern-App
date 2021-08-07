import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routers/posts.js'


const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://trinm:Pucapro1032@cluster0.yqpdz.mongodb.net/second_project?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server listening on ${PORT}`);
      });
   })
.catch ((error) => {
   console.log(error.message);
})

mongoose.set('useFindAndModify', false);
