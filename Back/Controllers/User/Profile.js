require("dotenv").config()
const { Users } = require("../../Models/Users");
const bcrypt = require('bcrypt');


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

const ChangePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await Users.findOne({ email: req.user.email });

    if (!user) {
      return res.json({ message: 'User not found', status: 'fail' });
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.json({ message: 'Incorrect old password', status: 'fail' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully', status: 'success' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).send('Server error');
  }
};



module.exports = {EditeProfile,getProfile,ChangePassword }







