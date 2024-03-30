export default class Page {
    page;
    constructor (page) {
        this.page = page;
    }
    async open (path) {
        await this.page.goto(path);
    }
}
  