const User = require("../models/user.model")

const getUsers = async (req, res) => {
    const allUsers = await User.find({})
    res.status(200).json(allUsers)
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
}

const createUser = async (req, res) => {
    const body = req.body
    await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    })
    res.status(201).json({ status: "record created successfully" })
}

const updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ status: "record updated succesfully" })
}

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ status: "record delete succesfully" })
}


module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }