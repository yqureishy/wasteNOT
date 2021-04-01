

function authenticate(req,res,next){
    if(req.session){
        if(req.session.user){
            res.locals.userId = req.session.user.userId
            next()
        }else{
            res.redirect('/login')
        }
    }else {
        res.redirect('/login')
    }
}

function authenticate(req,res,next){
    if(req.session){
        if(req.session.user){
            res.locals.adminId = req.session.admin.adminId
            next()
        }else{
            res.redirect('/admin-login')
        }
    }else {
        res.redirect('/admin-login')
    }
}

module.exports = authenticate