const htmlContentFunction = (content) => {
  let titleId = document.getElementsByClassName("title");
  let dateId = document.getElementsByClassName("date");
  let descriptionId = document.getElementsByClassName("description");
  let blogImageId = document.getElementsByClassName("image-blog");
  console.log(titleId);

  const { title, description, dateObject, blogImage } = content;
  titleId.textContent = title;
  dateId.textContent = dateObject;
  descriptionId.textContent = description;
  blogImageId.src = blogImage;
};

export default htmlContentFunction;
