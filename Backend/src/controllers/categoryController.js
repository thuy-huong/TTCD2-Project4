import categoryService from '../services/categoryService'

let handleGetAllCategory = async (req, res) => {
    try {
        let id = req.query.id;

        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter",
            });
        }

        let category = await categoryService.getAllCategory(id);

        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: category
        });

    } catch (error) {
        console.error('Error in handleGetAllCategory:', error);

        return res.status(500).json({
            errCode: -1,
            message: 'Internal Server Error',
            details: error
        });
    }
};

let handleCreateNewCategory = async (req, res) => {
    try {
        let message = await categoryService.createNewCategory(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: 'Error creating company',
            details: error.message
        });
    }

}

let handleEditCategory = async (req, res) => {
    try {
        let data = req.body;

        if (!data || !data.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter: id'
            });
        }

        let message = await categoryService.updateCategoryData(data);
        return res.status(200).json(message);
    } catch (e) {
        console.error('Error in handleEditCategory:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
}
let handleDeleteCategory = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing required parameters!"
            });
        }
        let message = await categoryService.deleteCategory(req.body.id);
        return res.status(200).json(message);
    } catch (error) {
        console.error('❌ Error:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'Internal server error',
            details: error.message
        });
    }
}

let handleGetProfessionalPosition = async (req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter",
            });
        }

        let professionalPosition = await categoryService.getProfessionalPosition(id);

        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: professionalPosition
        });

    } catch (error) {
        console.error('Error in handleGetProfessionalPosition:', error);

        return res.status(500).json({
            errCode: -1,
            message: 'Internal Server Error',
            details: error
        });
    }
}

let handleCreateNewPosition = async (req, res) => {
    try {
        let data = await categoryService.createNewPosition(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: 'Error creating company',
            details: error.message
        });
    }
}

let handleEditPosition = async (req, res) => {
    try {
        let data = req.body;

        if (!data || !data.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter: id'
            });
        }

        let message = await categoryService.updatePositionData(data);
        return res.status(200).json(message);
    } catch (e) {
        console.error('Error in handleEditPosition:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
}

let handleDeletePosition = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing required parameters!"
            });
        }
        console.log('check id', req.body.id)
        let message = await categoryService.deletePosition(req.body.id);
        return res.status(200).json(message);
    } catch (error) {
        console.error('❌ Error:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'Internal server error',
            details: error.message
        });
    }
}

module.exports = {
    handleGetAllCategory: handleGetAllCategory,
    handleCreateNewCategory: handleCreateNewCategory,
    handleEditCategory: handleEditCategory,
    handleDeleteCategory: handleDeleteCategory,
    handleGetProfessionalPosition,
    handleCreateNewPosition,
    handleEditPosition,
    handleDeletePosition
}