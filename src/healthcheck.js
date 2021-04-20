module.exports = {
  ping: (req, res) => {
    console.log('Made it here')
    res.status(200).json({ status: 'OK' })
  },
}