const url = `https://api.cloudinary.com/v1_1/kamuni-hrk/image/upload`;
const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'mern-E-Commerce');
  const res = await fetch(url, {
    method: 'post',
    body: formData,
  });

  return await res.json();
};
export default uploadImage;
