export const renameImage = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileName = file.originalname;
  const randomFile = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  callback(null, `${name}-${randomFile}${fileName}`);
};

export const fileFilterImage = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {
    return callback(new Error('Formato inválido'));
  }
  callback(null, true);
};
