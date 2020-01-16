var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weather', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var snowReportSchema = mongoose.Schema({
  _id: Number,
  name: String,
  chanceOfSnow: Number,
  totalSnowfall: Number,
  latitude: Number,
  longitude: Number,
  snowReportUrl: String,
  webcamUrl: String
});

var SnowReport = mongoose.model('SnowReport', snowReportSchema);

module.exports = {
  selectAll: function(callback) {
    SnowReport.find({}, function(err, items) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, items);
      }
    }).sort({totalSnowfall: 'desc', chanceOfSnow: 'desc'});
  },
  insert: function(reportInfo) {
    var report = new SnowReport(reportInfo);
    report.save((err) => {
      if (err) {
        SnowReport.findByIdAndUpdate(reportInfo._id, { $set: reportInfo}, null, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Updated!');
          }
        })
      } else {
        console.log('Saved!', reportInfo)
      }
    })
  }
}


