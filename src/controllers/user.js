class User {
    fetchUsers (req,res) {
        return res.status(200).json(Object.values(req.context.models.users))
            }

    fetchUser (req,res) {
        return res.status(200).json(req.context.models.users[req.params.userId])
            
            }
}

export default User