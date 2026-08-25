const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto('https://dev.shopelligence.com/', {
    waitUntil: 'networkidle'
  });

  // Зберігаємо HTML
  const html = await page.content();
  fs.writeFileSync('index.html', html);

  // Отримуємо всі CSS
  const stylesheets = await page.locator('link[rel="stylesheet"]').evaluateAll(
    links => links.map(link => link.href)
  );

  for (let i = 0; i < stylesheets.length; i++) {
    try {
      const response = await page.request.get(stylesheets[i]);

      if (response.ok()) {
        const css = await response.text();

        fs.writeFileSync(
          path.join('assets', `style-${i}.css`),
          css
        );
      }
    } catch (error) {
      console.log('CSS error:', error.message);
    }
  }

  console.log('HTML and CSS saved successfully!');

  await browser.close();
})();