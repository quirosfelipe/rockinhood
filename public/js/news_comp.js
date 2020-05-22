import { handleErrors, backendUrl } from "./utils.js";

window.addEventListener("DOMContentLoaded", async (e) => {
  const newsRes = await fetch(`${backendUrl}/stocks/newslist`);
  const newsListData = await newsRes.json();

  // console.log(newsListData);

  const newsContainer_company = document.querySelector(".company__news-news");

  for (let i = 1; i < 3; i++) {
    const newsTitle = newsListData.data.items.result[i].title;
    const newsSummary = newsListData.data.items.result[i].summary;
    const newsLink = newsListData.data.items.result[i].link;
    // const newsImage = newsListData.data.items.result[i].main_image.resolutions[3].url;

    const newsList = document.createElement("div");
    newsList.className = "portfolio__news-article-container";
    newsList.innerHTML = `
            <img class="news__image" type="image/jpeg" src="/assets/images/${i}.jpg" width="160px" height="160px" href="${newsLink}">
            <div class="news__title"> ${newsTitle}</div>
            <div class="news__summary"> ${newsSummary}</div>
        `;

    newsContainer_company.appendChild(newsList);
  }
});
