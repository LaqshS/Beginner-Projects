function fetchNews() {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml')
    .then(response => response.json())
    .then(data => {
      const newsList = document.getElementById('news-list');
      newsList.innerHTML = ''; // Clear previous news items

      if (data.items && data.items.length > 0) {
        data.items.forEach(item =>  {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = item.link;
          link.textContent = item.title.substring(0, 100); // Limit title to 60 characters

          const image = document.createElement('img');
          image.src = item.enclosure.link;

          listItem.appendChild(image);
          listItem.appendChild(link);
          newsList.appendChild(listItem);
        });
      } else {
        console.log('No news items found.');
      }
    })
    .catch(error => {
      console.log('Error fetching news:', error);
    });
}

// Fetch news initially
fetchNews();

// Refresh news every 10 minutes
setInterval(fetchNews, 3 * 60 * 1000);
