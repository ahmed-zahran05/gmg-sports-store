export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? ""
};

export function getCloudinaryImage(publicId: string, width = 1200, height = 900) {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  return `${baseUrl}/f_auto,q_auto,w_${width},h_${height},c_fill/${publicId}`;
}
