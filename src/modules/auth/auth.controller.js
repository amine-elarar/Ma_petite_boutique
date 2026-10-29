const User = require('../users/user.model');
const bcrypt = require('bcrypt')

const  register = async(request , response)=> 
{

    try 
    {
    const  {name , email , password} = request.body

    // response.status(201).json(name);
    

    if (!name || !email || !password)
        return response.status(400).json({ error: { message: "Tous les champs sont obligatoires " } });
    if (password.length < 8)
            return response.status(400).json({ error: { message: "Le mot de passe doit contenir au moins 8 caractè" } });

    const existEmail = await User.findOne({ email });
    if (existEmail)
        return response.status(409).json({ error: { message: "cet email est déjà utilisé." } });
    
   const salt = await bcrypt.genSalt(10);
   const passwordHash = await bcrypt.hash(password, salt);

   const user = await User.create({  name,email, passwordHash});
   response.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role ,
            // pass:user.passwordHash
        });
   }catch(error)
    {
        console.error(error);
    }


}

module.exports = { register};
