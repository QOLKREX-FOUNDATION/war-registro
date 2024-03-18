export const validateFileSize = (maxSizeInBytes) => (file) => {
  console.log("validateFileSize", file);
  if (file && file[0]) {
    const fileSize = file[0].size;
    return (
      // fileSize <= maxSizeInBytes || "File size exceeds the maximum allowed size"
      fileSize <= maxSizeInBytes ||
      `El archivo excede el tamaño máximo permitido, tamaño (${(
        maxSizeInBytes /
        (1024 * 1024)
      ).toFixed(2)} MB)`
    );
  }
  return true; // Return true if no file is provided
};
