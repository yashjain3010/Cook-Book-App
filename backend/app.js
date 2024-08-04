const express = require('express');
const cors = require('cors');
const authRoute = require('./route/authRoute');
const recipeRoute = require('./route/recipeRoute');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth',authRoute);
app.use('/recipes',recipeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
