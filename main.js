<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mini Browser</title>
  <style>
    body { font-family: sans-serif; margin: 0; }
    #controls { padding: 10px; background: #f0f0f0; display: flex; gap: 10px; }
    iframe { width: 100%; height: calc(100vh - 50px); border: none; }
    input[type="text"] { flex-grow: 1; padding: 6px; font-size: 16px; }
    button { padding: 6px 12px; font-size: 16px; }
  </style>
</head>
<body>

  <div id="controls">
    <button onclick="goBack()">←</button>
    <button onclick="reload()">⟳</button>
    <input type="text" id="urlInput" placeholder="Enter URL..." />
    <button onclick="navigate()">Go</button>
  </div>

  <iframe id="browserFrame" src="about:blank"></iframe>

  <script>
    const iframe = document.getElementById('browserFrame');
    const urlInput = document.getElementById('urlInput');
    let historyStack = [];
    let historyIndex = -1;

    function navigate() {
      const url = normalizeURL(urlInput.value);
      if (!url) return;
      iframe.src = url;
      historyStack = historyStack.slice(0, historyIndex + 1);
      historyStack.push(url);
      historyIndex++;
    }

    function goBack() {
      if (historyIndex > 0) {
        historyIndex--;
        iframe.src = historyStack[historyIndex];
      }
    }

    function reload() {
      if (historyIndex >= 0) {
        iframe.src = historyStack[historyIndex];
      }
    }

    function normalizeURL(url) {
      if (!url) return null;
      try {
        const parsed = new URL(url, 'https://');
        return parsed.href;
      } catch {
        return null;
      }
    }
  </script>

</body>
</html>
