const https = require('https');

/**
 * Fetches GitHub events for a user with proper headers and error handling.
 * EPIC 2: HTTP client, headers, endpoint, JSON parsing.
 * EPIC 4: 404, rate-limit (403/429), network failures, unexpected statuses.
 */
const fetchGitHubEvents = (username) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${encodeURIComponent(username)}/events`,
      method: 'GET',
      headers: {
        'User-Agent': 'GitHub-Activity-CLI',
        'Accept': 'application/vnd.github.v3+json'
      },
      timeout: 10000
    };

    const req = https.get(options, (res) => {
      // TASK-4.1: 404 Not Found
      if (res.statusCode === 404) {
        res.resume();
        return reject(new Error(`Error: User '${username}' not found.`));
      }

      // TASK-4.2: rate limiting
      if (res.statusCode === 403 || res.statusCode === 429) {
        res.resume();
        return reject(
          new Error(
            'Error: API rate limit exceeded. Please wait a while and try again.'
          )
        );
      }

      // Any other non-200 status
      if (res.statusCode !== 200) {
        res.resume();
        return reject(
          new Error(`Error: GitHub API request failed with status ${res.statusCode}.`)
        );
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (!Array.isArray(parsed)) {
            return reject(new Error('Error: Unexpected API response format.'));
          }
          resolve(parsed);
        } catch (e) {
          reject(new Error('Error: Failed to parse API response.'));
        }
      });
    });

    // TASK-4.3: network-level failures (DNS, offline, refused, timeout)
    req.on('error', (err) => {
      if (err.code === 'ENOTFOUND' || err.code === 'EAI_AGAIN') {
        reject(new Error('Error: Unable to reach GitHub API. Check your network connection.'));
      } else if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
        reject(new Error('Error: Connection to GitHub API failed. Please try again.'));
      } else {
        reject(new Error(`Error: Network failure (${err.message}).`));
      }
    });

    req.on('timeout', () => {
      req.destroy(new Error('Request timed out'));
    });

    req.end();
  });
};

module.exports = fetchGitHubEvents;
