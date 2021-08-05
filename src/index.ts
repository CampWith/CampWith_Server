import express from 'express';
import connectDB from './Logger/db';

const app = express();

// Connect Database
connectDB();
app.use(express.urlencoded());
app.use(express.json());

app.use('/api/users', require('./api/user'));
app.use('/api/campsites', require('./api/campsite'));
app.use('/api/campingcar', require('./api/campingcar'));
app.use('/api/campingtool', require('./api/campingtool'));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
