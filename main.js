// Create nav bar and iframe
const navBar = document.createElement('div');
navBar.style.position = 'fixed';
navBar.style.top = '0';
navBar.style.left = '0';
navBar.style.right = '0';
navBar.style.padding = '8px';
navBar.style.background = '#eee';
navBar.style.zIndex = '9999';
navBar.style.display = 'flex';

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter URL...';
input.style.flex = '1';
input.style.fontSize = '16px';
input.style.padding = '6px';

const button = document.createElement('button');
button.textContent = 'Go';
button.style.marginLeft = '8px';
button.style.padding = '6px 12px';
button.style.fontSize = '16px';

const frame = document.createElement('iframe');
frame.style.position = 'fixed';
frame.style.top = '48px';
frame.style.left = '0';
frame.style.width = '100%';
frame.style.height = 'calc(100% - 48px)';
frame.style.border = 'none';
frame.style.zIndex = '9998';

// Helper function to validate URL and fix missing protocol
function fixUrl(url) {
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
}

button.onclick = () => {
  let url = fixUrl(input.value);
  if (url.startsWith('chrome://') || url.startsWith('file://') || url.startsWith('javascript:')) {
    alert('Blocked unsafe URL scheme.');
    return;
  }

  // Try to load URL in iframe
  frame.src = url;

  // Set a timeout to detect if iframe load fails (blocked)
  let timeout = setTimeout(() => {
    // Open in new tab as fallback
    window.open(url, '_blank');
    alert('Iframe blocked by site, opening in new tab instead.');
  }, 3000);

  // Clear timeout if iframe loads successfully
  frame.onload = () => {
    clearTimeout(timeout);
  };
};

navBar.appendChild(input);
navBar.appendChild(button);
document.body.appendChild(navBar);
document.body.appendChild(frame);
