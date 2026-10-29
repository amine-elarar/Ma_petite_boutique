const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
require('dotenv').config();


const  register = async(request , response)=> 
{
    try 
    {
    const  {name , email , password,role} = request.body

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

   const user = await User.create({  name,email, passwordHash ,role});
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
        response.status(500).json({ error: { message: "Erreur serveur." } });
    }


}

const   login = async(request, response)=> 
{
    try{
    const { email, password } = request.body;

    if (!email || !password)
        return response.status(400).json({ error: { message: "Email et mot de passe sont obligatoires." } });

    const user = await User.findOne({ email });

        if (!user)
            return response.status(401).json({ error: { message: "Identifiants invalides." } }); 

        const is_match = await bcrypt.compare(password, user.passwordHash);
        if (!is_match)
            return response.status(401).json({ error: { message: "Identifiants invalides."}});

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,            
            { expiresIn: '24h'}             
        );
        response.status(200).json({ token });
    }
    catch(error)
    {
        console.error(error);
        response.status(500).json({ error: { message: "Erreur serveur." } });

    }



}
module.exports = { register, login };

