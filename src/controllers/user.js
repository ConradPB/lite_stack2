class User {
    async fetchUsers (req,res) {
        const users = await req.context.models.User.find()

        return res.status(200).json(users)

    }

    async fetchUser (req,res) {
        const user = await req.context.models.User.findById(req.params.userId)

        return res.status(200).json(user)

    }
}

export default User