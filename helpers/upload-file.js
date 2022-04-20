const path = require('path');

const uploadFile = (files,extensionsAvailable = ['png', 'jpg', 'gif','pdf'], folder='') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutFilename = file.name.split('.');
        const ext = cutFilename[cutFilename.length - 1];
    
        if (!extensionsAvailable.includes(ext)) {
            return reject(`La extencion no es valida ${ext} - ${extensionsAvailable}`);
        };
    
        const uploadPath = path.join(__dirname, '../uploads/', folder,file.name);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
    
            resolve(uploadPath)
        });
    });
   

}

module.exports = {
    uploadFile
}
