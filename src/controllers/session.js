class Session {
    async getUser (req,res) {
      const user = await req.context.models.User.findById(req.context.me.id)

      return res.status(200).json(user)

          }
}

export default Session
