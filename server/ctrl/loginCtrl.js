module.exports = {
    initialAuthProfileInfo: (req, res) => {
        // console.log(req.user);
        if (!req.user) return res.redirect('/auth/')  
        res.status(200).send(req.user)
    },
    auth0CallBack: (req, res) => { 
        res.status(200).send(req.user); 
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('urltologoutauth0');
    },
    serialize: (userA, done) => {
        let userB = userA;
        done(null, userB); 
    },
    deserialize: (userB, done) => {
        let userC = userB;
        done(null, userC); 
    }
}