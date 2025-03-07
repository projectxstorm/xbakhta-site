const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;

// Enable gzip compression for faster loading
app.use(compression());

// Serve static files from the 'out' directory
app.use(express.static(path.join(__dirname, 'out')));

// Route all requests to the relevant files in 'out'
app.get('*', (req, res) => {
  // Check if the path exists in the 'out' directory
  const filePath = path.join(__dirname, 'out', req.path);
  
  // Try to serve the exact path first
  res.sendFile(filePath, (err) => {
    if (err) {
      // If file not found, serve index.html for client-side routing
      res.sendFile(path.join(__dirname, 'out', 'index.html'));
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`BlinkBox server running on port ${port}`);
}); 