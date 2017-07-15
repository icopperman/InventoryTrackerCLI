import { InventoryTrackerCLIPage } from './app.po';

describe('inventory-tracker-cli App', () => {
  let page: InventoryTrackerCLIPage;

  beforeEach(() => {
    page = new InventoryTrackerCLIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
