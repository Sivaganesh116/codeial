module.exports.home = function(req, res){
    return res.render('home', {
        title: 'Home'
    });
}

module.exports.createPost = function(req, res){
    return res.end('<h1> Create Post </h1>');
}