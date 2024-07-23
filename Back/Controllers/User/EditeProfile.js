const { Users } = require("../../Models/Users");


const EditeProfile = async() =>{

    const { username, phone, address, country, profileImage } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
        return res.status(404).json({ msg: 'User not found' });
        }

        user.username = username || user.username;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.country = country || user.country;
        user.profileImage = profileImage || user.profileImage;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

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