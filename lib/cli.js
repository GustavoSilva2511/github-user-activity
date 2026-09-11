const fetchEvents = require('./github');
const { formatEvents } = require('./formatter');

const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: github-activity <username>');
    process.exit(1);
  }

  const username = args[0];
  if (!username || typeof username !== 'string' || username.trim() === '') {
    console.error('Usage: github-activity <username>');
    process.exit(1);
  }

  try {
    const events = await fetchEvents(username.trim());

    // TASK-4.4: empty payload (user exists but no public activity)
    if (!events || events.length === 0) {
      console.log(`No recent activity found for ${username.trim()}.`);
      process.exit(0);
    }

    // TASK-3.5: print parsed logs sequentially to stdout
    const lines = formatEvents(events);
    if (lines.length === 0) {
      console.log(`No recent activity found for ${username.trim()}.`);
      process.exit(0);
    }
    lines.forEach((line) => console.log(`- ${line}`));
  } catch (error) {
    // EPIC 4: clean message, no traceback
    console.error(error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

module.exports = main;
