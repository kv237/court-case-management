export const getFileIconColor = (type) => {
  if (type?.includes("pdf")) return "text-red-500";

  if (type?.includes("image"))
    return "text-blue-500";

  if (
    type?.includes("word") ||
    type?.includes("document")
  )
    return "text-indigo-500";

  return "text-gray-500";
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};