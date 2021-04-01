
function authenticateAdmin(req,res,next){
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

module.exports = authenticateAdmin