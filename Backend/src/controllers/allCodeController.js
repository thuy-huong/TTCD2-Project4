import allCodeService from '../services/allCodeService'

let handleGetAllCode = async (req, res) => {
    try {
        let type = req.query.type
        if (!type) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing required parameted',
                allCodes: []
            })
        }
        let allCodes = await allCodeService.getAllCode(type);
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            data: allCodes
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

module.exports = {
    handleGetAllCode: handleGetAllCode,
}