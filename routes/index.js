/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.room = function(req, res){
  res.render('room', { title: 'Room' });
};