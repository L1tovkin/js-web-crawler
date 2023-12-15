const { crawlPage } = require('./crawl.js');

function main() {
    if (process.argv.length < 3) {
        console.log('no webiste provided')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('too many args provided')
        process.exit(1)
    }
    const baseURL = process.argv[2];
    console.log(`starting crawl of ${baseURL}`);
    crawlPage(baseURL);
}

main();