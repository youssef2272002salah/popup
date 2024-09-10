const express = require('express');
const dbConnect = require('./dbConnect');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const errorControllers = require('./controllers/errorControllers');

// hi 

const userRoutes = require('./routes/userRoutes');
const pictureRoutes = require('./routes/pictureRoutes');
const likeRoutes = require('./routes/likeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');



dbConnect();
const app = express();

app.use(express.json());
app.use(cookieParser());

// api routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pictures', pictureRoutes);
app.use('/api/v1/likes', likeRoutes);
app.use('/api/v1/categories', categoryRoutes);




app.use(errorControllers)
module.exports = app