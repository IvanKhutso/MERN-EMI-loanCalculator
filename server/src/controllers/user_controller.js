import User from "../models/auth_model.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}