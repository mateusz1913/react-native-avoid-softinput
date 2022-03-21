// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: {
    'Guides': [
      'guides/installation',
      'guides/usage-module',
      'guides/usage-view',
    ],
    'Recipes': [
      'recipes/recipes-form',
      'recipes/recipes-modal',
      'recipes/recipes-bottom-sheet',
      'recipes/recipes-sticky-footer',
      'recipes/recipes-animations',
      'recipes/recipes-custom-config',
    ],
    'API Reference': [
      {
        type: 'category',
        label: 'AvoidSoftInput',
        items: [
          'api/module/set-enabled',
          'api/module/set-avoid-offset',
          'api/module/set-easing',
          'api/module/set-hide-animation-delay',
          'api/module/set-hide-animation-duration',
          'api/module/set-show-animation-delay',
          'api/module/set-show-animation-duration',
          'api/module/on-soft-input-shown',
          'api/module/on-soft-input-hidden',
          'api/module/on-soft-input-height-change',
          'api/module/on-soft-input-applied-offset-change',
          'api/module/set-adjust-nothing',
          'api/module/set-adjust-pan',
          'api/module/set-adjust-resize',
          'api/module/set-adjust-unspecified',
          'api/module/set-default-app-soft-input-mode',
        ],
      },
      'api/view/view',
      'api/hooks/use-soft-input-hidden',
      'api/hooks/use-soft-input-shown',
      'api/hooks/use-soft-input-height-changed',
      'api/hooks/use-soft-input-applied-offset-changed',
      'api/hooks/use-soft-input-state',
    ],
  },
};

module.exports = sidebars;
