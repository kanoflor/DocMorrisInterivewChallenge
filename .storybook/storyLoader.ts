// Load all stories
function loadStories() {
  // Require all story files
  const req = require.context('../src', true, /\.stories\.(js|jsx|ts|tsx)$/);
  req.keys().forEach(filename => req(filename));
}

loadStories();
