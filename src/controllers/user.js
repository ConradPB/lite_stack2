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
            const { first_name, last_name, username, email, password } = await req.body;
        
            // Validate user input
            if (!(email && password && username && first_name && last_name)) {
              res.status(400).send("All input is required");
            }
        
            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await req.context.models.User.findOne({ email });
        
            if (oldUser) {
              return res.status(409).send("User Already Exist. Please Login");
            }
        
            //Encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 10);
        
            // Create user in our database
            const user = await req.context.models.User.create({
              first_name,
              last_name,
              username,
              email: email.toLowerCase(), // sanitize: convert email to lowercase
              password: encryptedPassword,
            });
        
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.JWT_SECRET ,
              {
                expiresIn: "2h",
              }
            );
            // save user token
            user.token = token;
        
            // return new user
            res.status(201).json(user);
          } catch (err) {
            console.log(err);
          }
        }      

          
}

export default User