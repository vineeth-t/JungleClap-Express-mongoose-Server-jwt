const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const { UserModel } = require('../Models/user.model');
const bcrypt=require('bcrypt')

const { jwtToken } = require('../middlewares/auth.jwt.handler')

router.use(bodyParser.json())

router.route('/')
  .post(async (req, res) => {
    try {
      const body = req.body;
      const { username } = req.body
      console.log(username)
      const findUserbyId = await UserModel.findOne({ username: username });
      console.log(findUserbyId)
      if (findUserbyId) {
        res.json({ response: false, message: 'UserId already Exists' })
      } else {
        let user = await UserModel(body);
        const saltRounds=10;
        user.password=await bcrypt.hash(user.password,saltRounds);
        user = await user.save();
        let token = jwtToken(user._id)
        res.json({ response: true, token: token })
      }

    } catch (error) {
      res.json({ response: false, message: `${error}` })
    }
  })

module.exports = router
