const main = () => {
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
  
  console.log(`Fetching activity for: ${username}`);
};