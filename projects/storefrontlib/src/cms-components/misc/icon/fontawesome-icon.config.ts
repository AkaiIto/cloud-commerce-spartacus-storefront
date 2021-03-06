import { IconConfig, IconResourceType } from './icon.model';

export const fontawesomeIconConfig: IconConfig = {
  icon: {
    symbols: {
      SEARCH: 'fas fa-search',
      CART: 'fas fa-shopping-cart',
      INFO: 'fas fa-info-circle',
      STAR: 'fas fa-star',
      GRID: 'fas fa-th-large',
      LIST: 'fas fa-bars',
      CARET_DOWN: 'fas fa-angle-down',
      ERROR: 'fas fa-exclamation-circle',
      WARNING: 'fas fa-exclamation-triangle',
      SUCCESS: 'fas fa-check-circle',
      TIMES: 'fas fa-times',
      VISA: 'fab fa-cc-visa',
      MINUS: 'fas fa-minus',
      PLUS: 'fas fa-plus',
    },
    resources: [
      {
        type: IconResourceType.LINK,
        url: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
      },
    ],
  },
};
