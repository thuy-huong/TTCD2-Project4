import jobPostService from "../services/jobpostService"

let handleCreateJobPost = async (req, res) => {
    try {
        let data = req.body;
        let result = await jobPostService.createJobPostService(data);

        return res.status(200).json(result);
    } catch (e) {
        console.error('Error in handleCreateJobPost:', e);
        return res.status(500).json({
            errCode: -1,
            message: 'Server error while creating job post'
        });
    }

}
let handleEditJobPost = async (req, res) => {
    try {
        let data = req.body;

        if (!data || !data.id) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing job post ID!'
            });
        }

        let response = await jobPostService.updateJobPost(data);
        return res.status(200).json(response);

    } catch (e) {
        console.error("Error in handleEditJobPost:", e);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server'
        });
    }
};

let handleGetJobPost = async (req, res) => {
    try {
        let jobId = req.query.id;

        if (!jobId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required parameter: id'
            });
        }

        let response = await jobPostService.getJobPost(jobId);
        return res.status(200).json(response);
    } catch (e) {
        console.error("handleGetJobPost error:", e);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server'
        });
    }
};

let handleCreateSaveJob = async (req, res) => {
    try {
        let result = await jobPostService.createSaveJob(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error("handleSaveJob error:", error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server',
            details: error.message
        });
    }
};


let handleDeleteSaveJob = async (req, res) => {
    try {
        let id = req.body.id;
        let result = await jobPostService.deleteSaveJob(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error("handleDeleteSaveJob error:", error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server',
            details: error.message
        });
    }
};

module.exports = {
    handleCreateJobPost, handleEditJobPost, handleGetJobPost,
    handleCreateSaveJob, handleDeleteSaveJob
}