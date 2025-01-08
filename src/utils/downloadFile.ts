export const downloadFile = (
  fileContent: string,
  fileName: string,
  fileType = "json",
) => {
  const blob = new Blob([fileContent], { type: fileType });
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
