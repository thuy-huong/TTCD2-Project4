import db from '../models/index';

let createJobPostService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.category || !data.position || !data.level || !data.title || !data.jobType || !data.status) {
                return resolve({
                    errCode: 1,
                    message: 'Missing required fields!'
                });
            }

            await db.JobPost.create({

                category: data.category,
                position: data.position,
                level: data.level,
                title: data.title,
                description: data.description || '',
                requirements: data.requirements || '',
                benefits: data.benefits || '',
                jobType: data.jobType,
                experienceRequired: data.experienceRequired || '',
                salaryMin: data.salaryMin || 0,
                salaryMax: data.salaryMax || 0,
                location: data.location || '',
                deadline: data.deadline || null,
                status: data.status,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return resolve({
                errCode: 0,
                message: 'Job post created successfully!'
            });
        } catch (error) {
            console.error('Error creating job post:', error);
            return reject({
                errCode: -1,
                message: 'Internal server error',
                details: error.message
            });
        }
    });
};

let updateJobPost = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.id) {
                return resolve({
                    errCode: 1,
                    message: 'Missing required job post ID!'
                });
            }

            let job = await db.JobPost.findOne({
                where: { id: data.id }
            });

            if (!job) {
                return resolve({
                    errCode: 2,
                    message: 'Job post not found'
                });
            }

            // Update fields
            job.companyId = data.companyId || job.companyId;
            job.category = data.category || job.category;
            job.position = data.position || job.position;
            job.level = data.level || job.level;
            job.title = data.title || job.title;
            job.description = data.description || job.description;
            job.requirements = data.requirements || job.requirements;
            job.benefits = data.benefits || job.benefits;
            job.jobType = data.jobType || job.jobType;
            job.experienceRequired = data.experienceRequired || job.experienceRequired;
            job.salaryMin = data.salaryMin || job.salaryMin;
            job.salaryMax = data.salaryMax || job.salaryMax;
            job.location = data.location || job.location;
            job.deadline = data.deadline || job.deadline;
            job.status = data.status !== undefined ? data.status : job.status;

            job.updatedAt = new Date();

            await job.save();

            resolve({
                errCode: 0,
                message: 'Update job post successfully!'
            });
        } catch (e) {
            console.error("Error in updateJobPost:", e);
            reject({
                errCode: -1,
                message: 'Error from server',
                error: e.message
            });
        }
    });
};

let getJobPost = async (jobId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let includeOptions = [
                {
                    model: db.Company,
                    as: 'companyData',
                    attributes: ['companyName']
                },
                {
                    model: db.Category,
                    as: 'categoryData',
                    attributes: ['categoryNameEn', 'categoryNameVi']
                },
                {
                    model: db.ProfessionalPosition,
                    as: 'positionData',
                    attributes: ['PositionNameEn', 'PositionNameVi']
                },
                {
                    model: db.AllCode,
                    as: 'levelData',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.AllCode,
                    as: 'statusData',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.AllCode,
                    as: 'jobTypeData', // ⚠ Bạn cần sửa `as` của jobType thành `jobTypeData` trong associate để tránh trùng với statusData
                    attributes: ['valueEn', 'valueVi']
                }
            ];

            if (jobId === "ALL") {
                let jobs = await db.JobPost.findAll({
                    order: [['createdAt', 'DESC']],
                    include: includeOptions
                });

                resolve({
                    errCode: 0,
                    message: 'OK',
                    data: jobs
                });
            } else {
                let job = await db.JobPost.findOne({
                    where: { id: jobId },
                    include: includeOptions
                });

                if (!job) {
                    resolve({
                        errCode: 2,
                        message: 'Job post not found'
                    });
                } else {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        data: job
                    });
                }
            }
        } catch (error) {
            console.error("getJobPost error:", error);
            reject({
                errCode: -1,
                message: 'Error from server',
                details: error.message
            });
        }
    });
};
let createSaveJob = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.jobId) {
                return resolve({
                    errCode: 1,
                    message: 'Missing required parameters (userId or jobId)'
                });
            }
            const existing = await db.SaveJob.findOne({
                where: {
                    userId: data.userId,
                    jobId: data.jobId
                }
            });

            if (existing) {
                return resolve({
                    errCode: 2,
                    message: 'This job has already been saved by the user'
                });
            }

            await db.SaveJob.create({
                userId: data.userId,
                jobId: data.jobId,
                status: data.status || 1,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            resolve({
                errCode: 0,
                message: 'Job saved successfully!'
            });
        } catch (error) {
            console.error('Error in createSaveJob:', error);
            reject({
                errCode: -1,
                message: 'Error from server',
                details: error.message
            });
        }
    });
};

let deleteSaveJob = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return resolve({
                    errCode: 1,
                    message: 'Missing '
                });
            }

            const existing = await db.SaveJob.findOne({
                where: { id: id }
            });

            if (!existing) {
                return resolve({
                    errCode: 2,
                    message: 'Saved job not found'
                });
            }

            await db.SaveJob.destroy({
                where: { id: id }
            });

            return resolve({
                errCode: 0,
                message: 'Deleted saved job successfully!'
            });
        } catch (error) {
            console.error('deleteSaveJob error:', error);
            return reject({
                errCode: -1,
                message: 'Error from server',
                details: error.message
            });
        }
    });
};



module.exports = {
    createJobPostService, updateJobPost, getJobPost,
    createSaveJob, deleteSaveJob
}