const axios = require("axios");

const fetchRequest = async (page) => {
  try {
    const response = await axios.get("https://habr.com/ru/all/page" + page);
    const data = response.data;
    //console.log(typeof data); // string

    const cheerio = require("cheerio");
    const $ = cheerio.load(data);

    const result = $(".tm-articles-list__item");

    console.log("fetch " + page);

    const arr = [];

    for (let i = 0; i < result.length; i += 1) {
      const x = $(result[i]).find(".tm-article-snippet__title-link")[0],
        postTitle = $(x).text();
      if (typeof postTitle === "string") arr.push(postTitle);
    }
    return arr;
  } catch (err) {
    //console.log(err);
  }
};

// const fetchRequest2 = async () => {
//   try {
//     const response = await axios.get("https://blog.logrocket.com/");
//     const data = response.data;
//     //console.log(typeof data); // string

//     const cheerio = require("cheerio");
//     const $ = cheerio.load(data);

//     const featuredArticles = $(".listfeaturedtag .padlr10");

//     console.log("fetch 2 " + typeof featuredArticles);

//     for (let i = 0; i < featuredArticles.length; i++) {
//       let postTitleWrapper = $(featuredArticles[i]).find(".card-title")[0],
//         postTitle = $(postTitleWrapper).text();

//       let authorWrapper = $(featuredArticles[i]).find(".post-name a")[0],
//         author = $(authorWrapper).text();

//       let postDescWrapper = $(featuredArticles[i]).find(".card-text")[0],
//         postDesc = $(postDescWrapper).text();

//       let postLinkWrapper = $(featuredArticles[i]).find(".card-title > a")[0],
//         postLink = $(postLinkWrapper).attr("href");

//       // console.log("\n++++++");
//       console.log(`${postTitle} by [${author}]`);
//       console.log(`${postDesc}`);
//       console.log("\n" + `Read More - ${postLink}`);
//       console.log("\n----\n\n");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
const getTitles = async () => {
  let arr = [];

  for (let i = 1; i < 51; i += 1) {
    const temp = await fetchRequest(i);
    console.log(`type: ${typeof temp}, length: ${temp.length}`);
    arr = arr.concat(temp);
  }

  console.log(arr);
};

getTitles();

//fetchRequest2();
