// service.js
app.factory('UserService', function() {
    var userData = null;
    
    return {
        saveUser: function(user) {
            userData = user;
        },
        getUser: function() {
            return userData;
        }
    };
});
