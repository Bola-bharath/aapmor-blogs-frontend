const titleId = document.getElementById("titleId");
const dateId = document.getElementById("dateId");
const descriptionId = document.getElementById("dateId");
const blogImageId = document.getElementById("blogImageId");

const htmlContentFunction = (content) => {
  const { title, description, dateObject, blogImage } = content;
  titleId.textContent = title;
  dateId.textContent = dateObject;
  descriptionId.textContent = description;
  blogImageId.src = blogImage;
};

export default htmlContentFunction;
