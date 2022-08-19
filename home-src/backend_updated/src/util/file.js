const fs = require('fs');

const filePaths = {
    DEFAULT_PRODUCT: '/assets/images/products/product_default.jpeg',
    PRODUCT: 'assets/images/products/'
}

const upload = (file, filename, filePath) => {
    try {
        file.mv(filePath + filename);
        return '/' + filePath + filename;
    } catch(err) {
        throw(err);
    }
}

const deleteFile = (path, filename) => {
    try {
        fs.unlinkSync(path + filename);
        return;
    } catch(err) {
        throw(err);
    }
}

const fileExists = (path, filename) => {
    try {
        if (fs.existsSync(path + filename)) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        throw(err);
    }
}

module.exports = {
    upload,
    deleteFile,
    fileExists,
    filePaths
}