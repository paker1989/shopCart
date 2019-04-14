export default function(type, baseClass) {
  // console.log(baseClass);
  return (type === baseClass) || (
    type !== null && type.prototype instanceof baseClass);
}