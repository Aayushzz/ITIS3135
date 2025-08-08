"use strict";

const MAX_LENGTH = 50;
const PAGE_LIMIT = 12;
const BASE_URL = "http://localhost:3000/blogs";

const articlesWrapper = document.querySelector(".articles-wrapper");
const paginationContainer = document.querySelector(".pagination-container");
const searchInput = document.querySelector("input[type='search']");

let currentPage = 1;
let currentSearch = "";

window.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderBlogs(currentPage, currentSearch);
});

function fetchAndRenderBlogs(page = 1, searchTerm = "") {
  const url = BASE_URL;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    })
    .then(allBlogs => {
      let filtered = allBlogs;

      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        filtered = allBlogs.filter(blog =>
          blog.title.toLowerCase().includes(lower) ||
          blog.content.toLowerCase().includes(lower)
        );
      }

      const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

      const start = (page - 1) * PAGE_LIMIT;
      const end = start + PAGE_LIMIT;
      const paginated = sorted.slice(start, end);
      const totalPages = Math.ceil(sorted.length / PAGE_LIMIT);
      renderBlogs(paginated);
      renderPaginationButtons(totalPages, page);
    })
    .catch(err => showError(err.message));
}



function renderBlogs(blogs) {
  articlesWrapper.innerHTML = "";

  blogs.forEach((blog) => {
    const article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
      <div class="card-header">
        <img src="${blog.profile}" alt="${blog.author}" class="avatar" />
        <div>
          <p>${blog.author} · ${new Date(blog.date).toDateString()}</p>
        </div>
      </div>
      <div class="card-body">
        <h3>${blog.title}</h3>
        <p>${truncate(blog.content)}</p>
      </div>
    `;
    article.addEventListener("click", () => {
      window.location.href = `details.html?id=${blog.id}`;
    });
    articlesWrapper.appendChild(article);
  });
}

function renderPaginationButtons(totalPages, activePage) {
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === activePage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      // ✅ Update currentPage
      currentPage = i;
      fetchAndRenderBlogs(currentPage, currentSearch); // ✅ Use updated values
    });

    paginationContainer.appendChild(btn);
  }
}


searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    currentSearch = e.target.value.trim();
    currentPage = 1;
    fetchAndRenderBlogs(currentPage, currentSearch);
  }
});




function truncate(content) {
  if (content.length <= MAX_LENGTH) return content;
  return content.slice(0, MAX_LENGTH) + "...";
}

function showError(msg) {
  const notification = document.querySelector(".notification");
  const container = document.querySelector(".notification-container");
  if (!notification || !container) return;
  notification.textContent = msg;
  container.classList.remove("hidden");

  container.querySelector(".close")?.addEventListener("click", () => {
    container.classList.add("hidden");
  });
}
