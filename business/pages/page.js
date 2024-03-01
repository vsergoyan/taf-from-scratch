export default class Page {
    async open (path, page) {
        await page.goto(path);
    }
}
  