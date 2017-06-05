var mongoose=require('mongoose');
var dbURI='mongodb://localhost/tv_db';
var Schema  = mongoose.Schema;
mongoose.connect(dbURI);
process.on('SIGINT', function() {
mongoose.connection.close(function () {
console.log('Application terminated ,Database connection shutting down');
process.exit(0);
});
});
mongoose.connection.on('connected', function () {
console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});
var Userdata=new mongoose.Schema({
  email:{type:String,unique:true},
  username:{type:String,unique:true},
  password:{type:String,unique:true},
  createdOn:{type:Date,default:Date.now},
  modifiedOn:Date,
  lastLogin:Date,
  likeTv:[{
    tvTitle:{type:String},
    tvImage:{type:String},
    tvOverview:{type:String}
  }],
  likeMovie:[
    {

      movieImage:{type:String},
      movieOverview:{type:String}
    }
  ],
  watchlistTv:[
    {

      tvImage:{type:String},
      tvOverview:{type:String}
    }
  ],
  watchlistMovie:[
    {

      movieImage:{type:String},
      movieOverview:{type:String}
    }
  ],
  wishlistTv:[{

    tvImage:{type:String},
    tvOverview:{type:String}
  }],
  wishlistMovie:[{
  
    movieImage:{type:String},
    movieOverview:{type:String}
  }]
});
mongoose.model('User',Userdata);
