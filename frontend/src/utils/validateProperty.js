export default function validateProperty(property) {
  const errors = {};
  if (!property.title || property.title.trim() === "") {
    errors.title = "Title is required";
  }
  if (!property.price || isNaN(property.price)) {
    errors.price = "Valid price is required";
  }
  // add more validations as needed
  return errors;
}
