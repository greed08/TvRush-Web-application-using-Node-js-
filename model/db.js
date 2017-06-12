var mongoose=require('mongoose');
var dbURI='mongodb://localhost/tv_db';
var Schema  = mongoose.Schema;
var ObjectId=Schema.ObjectId;
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
  likeTv:[],
  likeMovie:[],
  watchlistTv:[],
  watchlistMovie:[],
  wishlistTv:[],
  wishlistMovie:[]
});
mongoose.model('User',Userdata);
