const bar = document.querySelector(".menu__bar");
const barImg = document.querySelector(".menu__bar__img");
const menuRight = document.querySelector(".menu__right");
const loading = document.querySelector(".loaderbox");

bar.addEventListener("click", () => {
  menuRight.classList.toggle("menu__right__open");
});

const boxs = document.getElementById("boxs");

const url = "https://blogsapi.p.rapidapi.com/?ordering=-date_published";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1e61192e28mshbe566ad7269a75dp125579jsn65df796cc180",
    "x-rapidapi-host": "blogsapi.p.rapidapi.com",
  },
};

async function fetchHeader() {
  loading.classList.add("loaderbox-block");
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    if (result.results) {
      displayBlog(result.results.slice(0, 3));
    } else {
      console.error("API javobi kutilgan tuzilishga ega emas!");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.classList.remove("loaderbox-block");
  }
}

function displayBlog(blogs) {
  boxs.innerHTML = "";
  blogs.forEach((blog) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.classList.add("blogs-img");
    img.src = blog.image;

    const title = document.createElement("h3");
    title.classList.add("blog-title");
    title.textContent = blog.title;

    const description = document.createElement("p");
    description.classList.add("blog-description");
    description.textContent = blog.excerpt;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);

    boxs.appendChild(card);
  });
}
fetchHeader();
