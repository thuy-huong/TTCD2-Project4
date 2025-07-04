
import db from '../models/index';

let getAllCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category;

            if (id === 'ALL') {
                category = await db.Category.findAll({
                    include: [
                        {
                            model: db.ProfessionalPosition,
                            as: 'ProfessionalPositions'
                        }
                    ]
                });
            } else if (id) {
                category = await db.Category.findOne({
                    where: { id: id },
                    include: [
                        {
                            model: db.ProfessionalPosition,
                            as: 'ProfessionalPositions'
                        }
                    ]
                });
            } else {
                return resolve([]);
            }

            resolve(category || null);
        } catch (error) {
            console.error('getAllCategory error:', error);

            reject({
                errCode: 1,
                message: 'Category information not found',
                details: error
            });
        }
    });
}

let checkNameCategory = async (categoryNameEn, categoryNameVi) => {

    try {
        let existingCategory = await db.Category.findOne({
            where: {
                categoryNameEn: categoryNameEn,
                categoryNameVi: categoryNameVi
            }
        });

        return existingCategory !== null;
    } catch (error) {
        console.error('Error checking category name:', error);
        throw error;
    }
};

let createNewCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkNameCategory(data.categoryNameEn, data.categoryNameVi);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Category already exists. Please try again.'
                })
            }
            else {
                await db.Category.create({
                    categoryNameEn: data.categoryNameEn,
                    categoryNameVi: data.categoryNameVi,
                    description: data.description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                resolve({
                    errCode: 0,
                    message: 'ok'
                })
            }
        } catch (error) {
            console.error('Error creating category:', error);
            reject({
                errCode: 2,
                message: 'An error occurred while creating the category.',
                details: error.message
            })
        }
    });
};

let updateCategoryData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.categoryNameEn || !data.categoryNameVi) {
                return resolve({
                    errCode: 1,
                    message: 'Missing required parameters!'
                });
            }

            // Kiểm tra tên bị trùng (trừ chính bản thân nó)
            let existingCategory = await db.Category.findOne({
                where: {
                    categoryNameEn: data.categoryNameEn,
                    categoryNameVi: data.categoryNameVi
                }
            });

            if (existingCategory && existingCategory.id !== +data.id) {
                return resolve({
                    errCode: 2,
                    message: 'Category name already exists. Please choose another name.'
                });
            }

            // Tìm category cần cập nhật
            let category = await db.Category.findOne({
                where: { id: data.id }
            });

            if (!category) {
                return resolve({
                    errCode: 3,
                    message: 'Category not found!'
                });
            }

            // Cập nhật dữ liệu
            category.categoryNameEn = data.categoryNameEn;
            category.categoryNameVi = data.categoryNameVi;
            category.description = data.description || '';
            category.updatedAt = new Date()
            await category.save();

            return resolve({
                errCode: 0,
                message: 'Update successful!'
            });

        } catch (error) {

        }
    })
}

let deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({ where: { id } });
            if (!category) {
                return resolve({
                    errCode: 2,
                    message: `The category doesn't exist!`
                });
            }
            await db.Category.destroy({ where: { id } });
            return resolve({
                errCode: 0,
                message: `The category has been deleted.`
            });
        } catch (error) {
            console.error('❌ Error in deleteCategory:', error);
            return reject(error);
        }
    })
}

let getProfessionalPosition = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let professionalPosition;

            if (id === 'ALL') {
                professionalPosition = await db.ProfessionalPosition.findAll({
                    include: [
                        {
                            model: db.Category,
                            as: 'categoryData',
                            attributes: ['categoryNameEn', 'categoryNameVi']
                        }
                    ]
                });

            } else if (id) {
                professionalPosition = await db.ProfessionalPosition.findOne({
                    where: { id: id },
                    include: [
                        {
                            model: db.Category,
                            as: 'categoryData',
                            attributes: ['categoryNameEn', 'categoryNameVi']
                        }
                    ]
                });
            } else {
                return resolve([]);
            }

            resolve(professionalPosition || null);
        } catch (error) {
            console.error('getAllCategory error:', error);

            reject({
                errCode: 1,
                message: 'Professional Position information not found',
                details: error
            });
        }
    });
}

let createNewPosition = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.categoryId || !data.PositionNameEn || !data.PositionNameVi) {
                return resolve({
                    errCode: 1,
                    message: 'Missing required fields!'
                });
            }

            let existingPosition = await db.ProfessionalPosition.findOne({
                where: {
                    PositionNameEn: data.PositionNameEn,
                    PositionNameVi: data.PositionNameVi
                }
            });

            if (existingPosition) {
                return resolve({
                    errCode: 2,
                    message: 'Position already exists. Please choose another name.'
                });
            }

            await db.ProfessionalPosition.create({
                categoryId: data.categoryId,
                PositionNameEn: data.PositionNameEn,
                PositionNameVi: data.PositionNameVi,
                description: data.description || '',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return resolve({
                errCode: 0,
                message: 'New position created successfully!'
            });
        } catch (error) {
            console.error('Error creating position:', error);
            return reject({
                errCode: 3,
                message: 'Internal server error',
                details: error.message
            });
        }
    });
}

let updatePositionData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.categoryId || !data.PositionNameEn || !data.PositionNameVi) {
                return resolve({
                    errCode: 1,
                    message: 'Missing required fields!'
                });
            }

            let duplicate = await db.ProfessionalPosition.findOne({
                where: {
                    PositionNameEn: data.PositionNameEn,
                    PositionNameVi: data.PositionNameVi,
                    id: { [db.Sequelize.Op.ne]: data.id } // ID khác ID hiện tại
                }
            });

            if (duplicate) {
                return resolve({
                    errCode: 2,
                    message: 'Another position with the same name already exists.'
                });
            }

            let position = await db.ProfessionalPosition.findOne({
                where: { id: data.id }
            });

            if (!position) {
                return resolve({
                    errCode: 3,
                    message: 'Position not found!'
                });
            }

            position.categoryId = data.categoryId;
            position.PositionNameEn = data.PositionNameEn;
            position.PositionNameVi = data.PositionNameVi;
            position.description = data.description || '';
            position.updatedAt = new Date();

            await position.save();

            return resolve({
                errCode: 0,
                message: 'Position updated successfully!'
            });

        } catch (error) {
            console.error('Error updating position:', error);
            return reject({
                errCode: 500,
                message: 'Internal server error',
                details: error.message
            });
        }
    });
}
let deletePosition = async (positionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let position = await db.ProfessionalPosition.findOne({
                where: { id: positionId }
            });

            if (!position) {
                return resolve({
                    errCode: 2,
                    message: 'Position not found'
                });
            }

            await db.ProfessionalPosition.destroy({
                where: { id: positionId }
            });

            return resolve({
                errCode: 0,
                message: 'Delete position successfully'
            });
        } catch (error) {
            console.error('Error deleting position:', error);
            return reject({
                errCode: 3,
                message: 'Internal server error',
                details: error.message
            });
        }
    });
};

module.exports = {
    getAllCategory: getAllCategory,
    createNewCategory: createNewCategory,
    updateCategoryData: updateCategoryData,
    deleteCategory, getProfessionalPosition, createNewPosition,
    updatePositionData, deletePosition
}