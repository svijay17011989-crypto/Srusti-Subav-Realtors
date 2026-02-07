export default function validateImages(files) {
  const errors = [];
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  files.forEach((file) => {
    if (!allowedTypes.includes(file.type)) {
      errors.push(`${file.name} is not a valid image`);
    }
  });
  return errors;
}
