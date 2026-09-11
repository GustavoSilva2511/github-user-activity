/**
 * Event formatting for GitHub user activity.
 * Covers EPIC 3 parsers + used by EPIC 4 empty-payload handling.
 */

function formatEvent(event) {
  if (!event || !event.type || !event.repo || !event.repo.name) {
    return null;
  }

  const repo = event.repo.name;

  switch (event.type) {
    case 'PushEvent': {
      const p = event.payload || {};
      const count =
        typeof p.size === 'number'
          ? p.size
          : typeof p.distinct_size === 'number'
            ? p.distinct_size
            : Array.isArray(p.commits)
              ? p.commits.length
              : 0;
      return `Pushed ${count} commit${count === 1 ? '' : 's'} to ${repo}`;
    }
    case 'IssuesEvent': {
      const action = event.payload && event.payload.action
        ? capitalize(event.payload.action)
        : 'Updated';
      const issueNumber =
        event.payload && event.payload.issue && event.payload.issue.number
          ? ` #${event.payload.issue.number}`
          : '';
      return `${action} issue${issueNumber} in ${repo}`;
    }
    case 'WatchEvent':
      return `Starred ${repo}`;
    case 'PullRequestEvent': {
      const action = event.payload && event.payload.action
        ? capitalize(event.payload.action)
        : 'Opened';
      return `${action} pull request in ${repo}`;
    }
    default:
      // TASK-3.4: generic fallback to prevent failures on rare types
      return `${event.type} in ${repo}`;
  }
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatEvents(events) {
  if (!Array.isArray(events)) return [];
  return events.map(formatEvent).filter(Boolean);
}

module.exports = { formatEvent, formatEvents };
