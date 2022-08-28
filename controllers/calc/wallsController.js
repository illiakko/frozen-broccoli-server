// Register user
const wallsController = async (req, res) => {

    try {
        const { A, B } = req.body
        const result = A + B
        return res.status(200).send({ result, message: 'Good job!' })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    wallsController,
}