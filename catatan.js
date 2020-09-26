router.get('/logout', function (req, res, next) {
    let token = req.header('token')
    let response = {
      logout: false
    }
  
    if (!token) {
      res.status(500).json(response);
    } else {
      const decode = jwt.verify(token, secret)
      console.log('decode', decode);
      User.findOneAndUpdate({ email: decode.email}, { token: ""}, { new: true})
        .then(result => {
  
          console.log(result)
  
          response.logout = true
          res.status(200).json(response)
        })
        .catch(err => {
          res.status(500).json(response)
        })
    }
  })