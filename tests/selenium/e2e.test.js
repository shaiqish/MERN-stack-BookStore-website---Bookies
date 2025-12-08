import assert from "assert";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import "chromedriver";

const BASE_URL = process.env.E2E_BASE_URL || "http://localhost:5173";
const TIMEOUT = 15000;

const buildDriver = async () => {
  const options = new chrome.Options();
  if (process.env.HEADFUL !== "true") {
    options.addArguments("--headless=new");
  }
  options.addArguments("--window-size=1280,800");
  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
};

describe("Bookies UI smoke tests", () => {
  let driver;

  const waitForVisible = async (locator) => {
    const el = await driver.wait(until.elementLocated(locator), TIMEOUT);
    await driver.wait(until.elementIsVisible(el), TIMEOUT);
    return el;
  };

  before(async () => {
    driver = await buildDriver();
    await driver.manage().setTimeouts({ implicit: 2000, pageLoad: TIMEOUT });
  });

  afterEach(async () => {
    await driver.manage().deleteAllCookies();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("renders the hero heading on home", async () => {
    await driver.get(BASE_URL);
    const heading = await waitForVisible(By.css("h1.title-font"));
    const text = await heading.getText();
    assert.match(text, /Where Every Book/i);
  });

  it("navigates to the Books page from navbar", async () => {
    await driver.get(BASE_URL);
    const booksLink = await waitForVisible(By.linkText("Books"));
    await booksLink.click();
    await driver.wait(until.urlContains("/books"), TIMEOUT);
    const current = await driver.getCurrentUrl();
    assert.ok(current.includes("/books"));
  });

  it("follows the View All Books call-to-action", async () => {
    await driver.get(BASE_URL);
    const cta = await waitForVisible(By.css("a[href='/books']"));
    await cta.click();
    await driver.wait(until.urlContains("/books"), TIMEOUT);
    const current = await driver.getCurrentUrl();
    assert.ok(current.includes("/books"));
  });

  it("toggles dark mode from the navbar switch", async () => {
    await driver.get(BASE_URL);
    const html = await waitForVisible(By.css("html"));
    const before = await html.getAttribute("class");
    const toggle = await waitForVisible(By.css("label.swap svg"));
    await toggle.click();
    await driver.wait(async () => {
      const nextClass = await html.getAttribute("class");
      return nextClass.includes("dark") !== before.includes("dark");
    }, TIMEOUT);
  });

  it("opens the login modal from navbar", async () => {
    await driver.get(BASE_URL);
    const loginBtn = await waitForVisible(
      By.xpath("//button[contains(., 'Login')]")
    );
    await loginBtn.click();
    const usernameInput = await waitForVisible(
      By.css("input[placeholder='username']")
    );
    assert.ok(await usernameInput.isDisplayed());
  });

  it("switches the login modal to Sign Up", async () => {
    await driver.get(BASE_URL);
    const loginBtn = await waitForVisible(
      By.xpath("//button[contains(., 'Login')]")
    );
    await loginBtn.click();
    const switchBtn = await waitForVisible(
      By.xpath("//button[contains(., 'Sign Up')]")
    );
    await switchBtn.click();
    const emailInput = await waitForVisible(
      By.css("input[placeholder='email']")
    );
    assert.ok(await emailInput.isDisplayed());
  });

  it("shows the admin login form from the modal toggle", async () => {
    await driver.get(BASE_URL);
    const loginBtn = await waitForVisible(
      By.xpath("//button[contains(., 'Login')]")
    );
    await loginBtn.click();
    const adminToggle = await waitForVisible(
      By.xpath("//button[contains(., 'Here')]")
    );
    await adminToggle.click();
    const secretInput = await waitForVisible(
      By.css("input[placeholder='Secret-key']")
    );
    assert.ok(await secretInput.isDisplayed());
  });

  it("opens and closes the Books filter dropdown", async () => {
    await driver.get(`${BASE_URL}/books`);
    const filterIcon = await waitForVisible(By.css(".filter-icon"));
    await filterIcon.click();
    const dropdown = await waitForVisible(By.css(".filter-dropdown"));
    assert.ok(await dropdown.isDisplayed());
    await filterIcon.click();
    await driver.wait(until.stalenessOf(dropdown), TIMEOUT);
  });

  it("renders the Add Book form fields", async () => {
    await driver.get(`${BASE_URL}/add-book`);
    await waitForVisible(By.css("select#category"));
    await waitForVisible(By.css("input#title"));
    await waitForVisible(By.css("textarea#description"));
    await waitForVisible(By.css("select#price"));
  });

  it("displays admin dashboard cards and chart", async () => {
    await driver.get(`${BASE_URL}/admin-dashboard`);
    const salesCard = await waitForVisible(
      By.xpath("//div[contains(., 'Book Sales') and contains(@class,'card')]")
    );
    const chartHeading = await waitForVisible(
      By.xpath("//h2[contains(., 'Sales Chart')]")
    );
    assert.ok(await salesCard.isDisplayed());
    assert.ok(await chartHeading.isDisplayed());
  });
});
