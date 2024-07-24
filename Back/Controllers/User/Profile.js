require("dotenv").config()
const { Users } = require("../../Models/Users");

const EditeProfile = async (req, res) => {
    const { username, email, phone, profileImage } = req.body;
    try {
      let user = await Users.findOne({email: req.user.email});
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.username = username || user.username;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      if (profileImage) {
        user.image = profileImage;
      }
  
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

const getProfile = async(req,res) =>{
    try {
        const user = await Users.findOne({email:req.user.email}).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}



module.exports = {EditeProfile,getProfile }







