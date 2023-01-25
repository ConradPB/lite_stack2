class Session {
    getUser (req,res) {
      return res.status(200).json(req.context.models.users[req.context.me.id])

          }
}

export default Session