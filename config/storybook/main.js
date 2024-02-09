module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],

    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
              backgrounds: false, // 👈 disable the backgrounds addon
            },
          },
        '@storybook/addon-interactions',
        'storybook-addon-mock',
        'storybook-addon-themes'
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    docs: {
        autodocs: true
    }
};
