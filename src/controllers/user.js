import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class User {
    async fetchUsers (req,res) {
        const users = await req.context.models.User.find()

        return res.status(200).json(users)

    }

    async fetchUser (req,res) {
        const user = await req.context.models.User.findById(req.params.userId)

        return res.status(200).json(user)

    }

    async registerUser (req, res) {
      try {
        // Get user input
        const { first_name, last_name, username, email, password } = await req.body
        
        // Validate user input
        if (!(email && password && username && first_name && last_name)) {
          res.status(400).send('All input is required')
        }
        
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await req.context.models.User.findOne({ email })
        if (oldUser) {
          return res.status(409).send('User Already Exists. Please Login');
        }
        
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10)
        // Create user in our database
        const user = await req.context.models.User.create({
          first_name,
          last_name,
          username,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        })
        
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET ,
          {
            expiresIn: '30d',
          }
          )
          
          // save user token
          user.token = token
          
          // return new user
          
          res.status(201).json(user)
        } catch (err) {
          console.log(err)
        }
      }  

    async loginUser (req, res) {
          try {
            // Get user input
        const { email, password } = await req.body
        
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required")
        }
        // Validate if user exist in our database
        const user = await req.context.models.User.findOne({ email })
        
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET,
            {
              expiresIn: '25d',
            }
          )
          
          // save user token
          user.token = token

          // user
          res.status(200).json(user)
        } else{

        res.status(400).send('Invalid Credentials')
        
        }
      } catch (error) {
        console.log(error)
      }
    
      }

  async welcomeUser (req,res) {
    res.status(200).send('Welcome 🙌 ')                                                                                                               
  
      }



        


          
}

export default User