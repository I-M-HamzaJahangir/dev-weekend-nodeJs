

const cloudinary =  require("../config/cloudinary")
const uploadImage = async (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "blogsBanners",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

const deleteImage = (publicId) => {
    return cloudinary.uploader.destroy(publicId);
}



module.exports = { uploadImage, deleteImage }