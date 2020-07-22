import { CardPanelModule } from './card-panel.module';

describe('CardPanelModule', () => {
  let cardPanelModule: CardPanelModule;

  beforeEach(() => {
    cardPanelModule = new CardPanelModule();
  });

  it('should create an instance', () => {
    expect(cardPanelModule).toBeTruthy();
  });
});
