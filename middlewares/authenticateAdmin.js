
function authenticateAdmin(req,res,next){
    if(req.session){
        if(req.session.admin){
            res.locals.adminId = req.session.admin.adminId
            next()
        } else{
            res.redirect('/admin-login')
        }
    }else {
        res.redirect('/admin-login')
    }
}

module.exports = authenticateAdmin