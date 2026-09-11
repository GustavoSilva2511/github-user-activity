const https = require('https');

/**
 * Fetches GitHub events for a user with proper headers and error handling
 * Implements TASK-2.1 (HTTP client), TASK-2.2 (headers), TASK-2.3 (endpoint)
 */
const fetchGitHubEvents = (username) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${username}/events`,
      headers: {
        'User-Agent': 'GitHub-Activity-CLI',
        'Accept': 'application/vnd.github.v3+json'
      },
      timeout: 10000
    };

    const req = https.get(options, (res) => {
      if (res.statusCode === 404) {
        return reject(new Error(`User '${username}' not found`));
      }
      if (res.statusCode === 403 || res.statusCode === 429) {
        return reject(new Error('API rate limit exceeded'));
      }
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          // TASK-2.4: Parse JSON
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse API response'));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Network error: ${err.message}`));
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
};

module.exports = fetchGitHubEvents;