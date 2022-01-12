let minimist = require("minimist");
let fs = require("fs");
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({blockTrackers: true}));

let args = minimist(process.argv);
let configJSON = fs.readFileSync(args.config, "utf-8");
let config = JSON.parse(configJSON);

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    executablePath:
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: false,
    args:[
        '--start-maximized',
        '--disable-notifications',
        '--use-fake-ui-for-media-stream',
    ],
    defaultViewPort: null,
  });

  let pages = await browser.pages();
  let page = pages[0];
  await page.goto('https://www.google.com/intl/en-GB/gmail/about/#');

  await Promise.all([
      page.waitForSelector("a[data-action='sign in']"),
      page.click("a[data-action='sign in']")
  ]);

  const email = 'input[type="email"]';
  const password = 'input[type="password"]';

  await page.waitForSelector(email); //Email Id
  await page.type(email, config.userid , { delay: 30 });
  await Promise.all([page.keyboard.press('Enter')]);

  

  await page.waitFor(5000);
  

  await page.waitForSelector(password); //password
  await page.type(password , config.password , {delay: 20});
  await Promise.all([page.keyboard.press('Enter')]);

  await page.waitFor(10000);

  await page.goto("https://meet.google.com/");
  await page.type("input#i3" , config.link , {delay: 20});
  await page.click("button[class='VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-dgl2Hf ksBjEc lKxP2d cjtUbb']");

  await page.waitFor(20000);
  
  await page.waitForSelector("div[data-icon-type='1']");
  await page.click("div[data-icon-type='1']");
  await page.waitFor(1000);
  await page.waitForSelector("div[data-icon-type='2']");
  await page.click("div[data-icon-type='2']");
  await page.waitFor(4000);
  await page.waitForSelector("span[class='NPEfkd RveJvd snByac']");
  await page.click("span[class='NPEfkd RveJvd snByac']");

  await page.waitForSelector("button[aria-label='Chat with everyone']");
  await page.click("button[aria-label='Chat with everyone']");

  await page.waitFor(3000);

  await page.waitForSelector("textarea[jsname='YPqjbf']");
  await page.type("textarea[jsname='YPqjbf']" , config.present , {delay:20});
  await page.waitFor(2000);
  await Promise.all([page.keyboard.press('Enter')]);

  await page.waitFor(3000);

  await page.waitForSelector("button[class='VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb']");
  await page.click("button[class='VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb']");
  
  await page.waitFor(10000);
 
  await page.waitForSelector("button[class='VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c jh0Tpd Gt6sbf QQrMi NKaD6']");
  await page.click("button[class='VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c jh0Tpd Gt6sbf QQrMi NKaD6']");

  
}

run();
