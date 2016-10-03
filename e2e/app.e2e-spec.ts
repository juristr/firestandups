import { FirestandupsPage } from './app.po';

describe('firestandups App', function() {
  let page: FirestandupsPage;

  beforeEach(() => {
    page = new FirestandupsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
