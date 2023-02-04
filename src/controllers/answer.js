

class Answer {
    async fetchAnswers (req,res) {
        const answers = await req.context.models.Answer.find()

        return res.status(200).json(answers)

    }

    async fetchAnswer (req,res) {
        const answer = await req.context.models.Answer.find({ question: req.params.questionId })
        
        return res.status(200).json(answer)

    }

    async createAnswer (req,res,next) {
        
         const answer = await req.context.models.Answer.create({
            text: req.body.text,
            userId: req.context.me.id
        }).catch((error) => {
            error.statusCode = 400;
            next(error);
          })
  return res.status(200).json(answer)
}

    async updateAnswer (req,res) {
        
        const answer =  await req.context.models.Answer.findById(req.params.answerId)

        if (answer) {
            await answer.updateOne({
                text: req.body.text,
                userId: req.context.me.id

            })
            
            return res.status(200).json(answer)}
           else {
            return res.status(404).json({ message: 'Answer not found' })
          }

    }

    async deleteAnswer (req,res) {

        const answer =  await req.context.models.Answer.findById(req.params.answerId)
            
        if (answer) {
            await answer.remove()
        
          return res.status(200).json(answer)
    }
}

}

export default Answer
