const fetchEvents = require('./github');

const main = async () => {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: github-activity <username>\n\nPlease provide a GitHub username as an argument.');
    process.exit(1);
  }
  
  const username = args[0];
  if (!username || typeof username !== 'string' || username.trim() === '') {
    console.error('Error: Invalid username provided.');
    process.exit(1);
  }
  
  try {
    const events = await fetchEvents(username);
    if (events.length === 0) {
      console.log(`No recent activity found for ${username}`);
      process.exit(0);
    }
    console.log(`Successfully fetched ${events.length} events for ${username}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}