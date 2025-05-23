<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Custom Bookmark Manager</title>
  <style>
    body {
      background-color: #000;
      color: #ADD8E6;
      font-family: 'Varela Round', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    input, button {
      font-size: 1em;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
    }
    #bookmarkList {
      margin-top: 20px;
      width: 100%;
      max-width: 600px;
    }
    .bookmark-item {
      display: flex;
      justify-content: space-between;
      background-color: #111;
      padding: 10px;
      margin: 5px 0;
      border-radius: 5px;
    }
    .bookmark-item img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
  </style>
</head>
<body>
  <h1>Custom Bookmark Manager</h1>
  <input type="text" id="bookmarkName" placeholder="Bookmark Name" />
  <input type="text" id="bookmarkURL" placeholder="Bookmark URL" />
  <button onclick="addBookmark()">Add Bookmark</button>
  <div id="bookmarkList"></div>

  <script>
    const bookmarkList = document.getElementById('bookmarkList');

    function getBookmarks() {
      return JSON.parse(localStorage.getItem('bookmarks')) || [];
    }

    function saveBookmarks(bookmarks) {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function renderBookmarks() {
      const bookmarks = getBookmarks();
      bookmarkList.innerHTML = '';
      bookmarks.forEach((bookmark, index) => {
        const div = document.createElement('div');
        div.className = 'bookmark-item';
        div.innerHTML = \`
          <div>
            <img src="https://www.google.com/s2/favicons?sz=64&domain=\${bookmark.url}" alt="Favicon" />
            <a href="\${bookmark.url}" target="_blank">\${bookmark.name}</a>
          </div>
          <button onclick="deleteBookmark(\${index})">Delete</button>
        \`;
        bookmarkList.appendChild(div);
      });
    }

    function addBookmark() {
      const name = document.getElementById('bookmarkName').value;
      const url = document.getElementById('bookmarkURL').value;
      if (name && url) {
        const bookmarks = getBookmarks();
        bookmarks.push({ name, url });
        saveBookmarks(bookmarks);
        renderBookmarks();
        document.getElementById('bookmarkName').value = '';
        document.getElementById('bookmarkURL').value = '';
      }
    }

    function deleteBookmark(index) {
      const bookmarks = getBookmarks();
      bookmarks.splice(index, 1);
      saveBookmarks(bookmarks);
      renderBookmarks();
    }

    // Initial render
    renderBookmarks();
  </script>
</body>
</html>
