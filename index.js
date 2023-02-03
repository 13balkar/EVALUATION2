const express = require('express');
const companyDetailRouter = require('./src/Routes/companyDetailRoutes');
const app = express();
const port = 3000;
app.use(express.json());
app.use('/api', companyDetailRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
