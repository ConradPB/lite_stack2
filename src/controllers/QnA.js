class QnA {
    async fetchqas (req,res) {
        const questions = await req.context.models.Question.find()
        const answers = await req.context.models.Answer.find()

        return res.status(200).json({ questions, answers })

    }

    async fetchqa (req,res) {
        const question = await req.context.models.Question.findById(req.params.questionId)
        const answer = await req.context.models.Answer.findById(req.params.answerId)

        return res.status(200).json({ question, answer })
    }
}

export default QnA
