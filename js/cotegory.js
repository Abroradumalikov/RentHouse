const resultsContainer = document.getElementById("results");
const btnNext = document.getElementById("btn-next");
const btnPrevious = document.getElementById("btn-prevouis");
const searchInput = document.getElementById("search");
const clickButton = document.getElementById("click");
const loading = document.querySelector(".loaderbox");
const buissnes = document.getElementById("buissnes__texts__head");

clickButton.addEventListener("click", () => {
  const searchValue = searchInput.value.trim();
  buissnes.textContent = searchValue || "Buissnes";
});
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "27e2515bc7msh810a4fa5d31a0bfp1a82dbjsnf97978b7718e",
    "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
  },
};

let resultData = [];
let resultDataSearch = [];
let currentIndex = 0;
let currentIndexSearch = 0;

// Fetch initial influencer posts
async function fetchPosts() {
  loading.classList.add("loaderbox-block");

  try {
    const url =
      "https://real-time-amazon-data.p.rapidapi.com/influencer-posts?influencer_name=tastemade&country=US&scope=ALL&limit=20";
    const response = await fetch(url, options);
    const result = await response.json();

    if (result?.data?.posts && Array.isArray(result.data.posts)) {
      resultData = result.data.posts;
      displayData(resultData.slice(0, 4));
    } else {
      console.error("Invalid data format:", result);
      resultsContainer.innerHTML = "<p>No posts found</p>";
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    resultsContainer.innerHTML = "<p>Error loading posts</p>";
  } finally {
    loading.classList.remove("loaderbox-block");
  }
}

function displayData(posts) {
  resultsContainer.innerHTML = "";
  posts.forEach((item) => {
    const card = createCard({
      imageUrl: item.post_thumbnail || "https://via.placeholder.com/150",
      title: item.post_title || "No Title",
    });
    resultsContainer.appendChild(card);
  });
}

async function searchFetch() {
  const search = searchInput.value.trim();
  if (!search) {
    alert("Please enter a product name.");
    return;
  }
  loading.classList.add("loaderbox-block");

  try {
    const searchUrl = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(
      search
    )}&page=1&country=US&sort_by=RELEVANCE`;
    const response = await fetch(searchUrl, options);
    const result = await response.json();

    if (result?.data?.products && Array.isArray(result.data.products)) {
      resultDataSearch = result.data.products;
      displaySearch(resultDataSearch.slice(0, 4));
    } else {
      console.error("Invalid search results:", result);
      resultsContainer.innerHTML = "<p>No products found</p>";
    }
  } catch (error) {
    console.error("Error searching products:", error);
    resultsContainer.innerHTML = "<p>Error searching products</p>";
  } finally {
    loading.classList.remove("loaderbox-block");
  }
}

function displaySearch(products) {
  resultsContainer.innerHTML = "";
  products.forEach((item) => {
    const card = createCard({
      imageUrl: item.product_photo || "https://via.placeholder.com/150",
      title: item.product_title || "No Title",
      price: item.product_price,
    });
    resultsContainer.appendChild(card);
  });
}

function createCard({ imageUrl, title, price }) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;

  const titleElement = document.createElement("p");
  titleElement.className = "title";
  titleElement.textContent = title;

  card.appendChild(img);
  card.appendChild(titleElement);

  if (price) {
    const priceElement = document.createElement("span");
    priceElement.className = "price";
    priceElement.textContent = price;
    card.appendChild(priceElement);
  }

  return card;
}

btnNext.addEventListener("click", () => {
  const currentData =
    resultDataSearch.length > 0 ? resultDataSearch : resultData;
  const currentPos =
    resultDataSearch.length > 0 ? currentIndexSearch : currentIndex;

  if (currentPos + 4 < currentData.length) {
    if (resultDataSearch.length > 0) {
      currentIndexSearch += 4;
      displaySearch(
        resultDataSearch.slice(currentIndexSearch, currentIndexSearch + 4)
      );
    } else {
      currentIndex += 4;
      displayData(resultData.slice(currentIndex, currentIndex + 4));
    }
  }
});

btnPrevious.addEventListener("click", () => {
  const currentPos =
    resultDataSearch.length > 0 ? currentIndexSearch : currentIndex;

  if (currentPos - 4 >= 0) {
    if (resultDataSearch.length > 0) {
      currentIndexSearch -= 4;
      displaySearch(
        resultDataSearch.slice(currentIndexSearch, currentIndexSearch + 4)
      );
    } else {
      currentIndex -= 4;
      displayData(resultData.slice(currentIndex, currentIndex + 4));
    }
  }
});

clickButton.addEventListener("click", searchFetch);

fetchPosts();
