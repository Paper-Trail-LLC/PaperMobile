# Paper Trail Mobile Client (React Native)

## Contributing to  this API

1. Clone this project.
2. Make sure you have [npm](https://www.npmjs.org/) installed globally and Node.js 12+ LTS installed.
3. Install [yarn](https://yarnpkg.com/en/docs/getting-started).
4. Install [Expo](https://docs.expo.io/get-started/installation/).
5. Have the Expo mobile app in the devices you'll test the application. *(Alternative)* Have a virtual device running in your machine.
    - 🤖 [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) - Android Lollipop (5) and greater.
    - 🍎 [iOS App Store](https://itunes.com/apps/exponent) - iOS 10 and greater.

This project was generated with [Ignite CLI](https://github.com/infinitered/ignite) using ["Infinite Red Bowser"](https://github.com/infinitered/ignite-bowser) boiler plate and the [experimental Expo functionality](https://shift.infinite.red/announcing-expo-support-in-ignite-bowser-ffeea3662e99)

## Development server with Expo
This project uses Expo to run its development environment. In the project directory run:
> ```yarn start``` 

like you would do with any other Expo project and it will start the development server. 

## Code scaffolding <- Generating new element
This project comes with its own generator for code scaffolding. Use the **[ignite generator](https://github.com/infinitered/ignite-bowser#component-generator)**!

## Repo Rules
**NEVER WORK ON MASTER!**
1. Each branch name must reflect the feature currently being implemented.
2. When trying to merge, do a pull request and wait for a review from other team member.
3. *When* tests are in place, your branch **MUST** pass all tests before being merged to master. 
### **Commit Messages:**
### 1. Type 
>
    [FEAT] - a new feature
    [FIX] - a bug fix
    [DOCS] - changes in documentation
    [STYLE] - everything related to styling
    [REFACTOR] - code changes that neither fixes a bug or adds a feature
    [TEST] - everything related to testing
    [CHORE] - updating build tasks, package manager configs, etc
### 2. Subject

This contains a short description of the changes made. It shouldn't be greater than 50 characters, should begin with a capital letter and written in the imperative eg. Add instead of Added or Adds.

### 3. Body

The body is used to explain what changes you made and why you made them. Not all commits are complex enough that they need a body, especially if you are working on a personal project alone, and as such writing a body is optional.

A blank line between the body and the subject is required and each line should have no more than 72 characters.
### 4. Footer

The footer is also optional and mainly used when you are using an issue tracker to reference the issue ID.

### Example: 
`git commit -m "[Type] Subject" -m "Body" -m "Footer"`

Or using a version control plugin, each new line in the commit message is equivalent to `-m` in the console.

# The Project Structure

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- And more!

## Quick Start

The Ignite Bowser boilerplate project's structure will look similar to this:

```
ignite-project
├── app
│   ├── components
│   ├── i18n
│   ├── utils
│   ├── models
│   ├── navigation
│   ├── screens
│   ├── services
│   ├── theme
│   ├── app.tsx
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── README.md
├── ignite
│   ├── ignite.json
│   └── plugins
├── App.js
├── .env
└── package.json

```

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
app
│── components
│── i18n
├── models
├── navigation
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigation**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application. This is also where you will specify whether you want to run the app in storybook mode.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find generators, plugins and examples to help you get started with React Native.

### ./storybook directory

This is where your stories will be registered and where the Storybook configs will live

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

## Running Storybook

From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server.

In `App.js`, change `SHOW_STORYBOOK` to `true` and reload the app.
For Visual Studio Code users, there is a handy extension that makes it easy to load Storybook use cases into a running emulator via tapping on items in the editor sidebar. Install the `React Native Storybook` extension by `Orta`, hit `cmd + shift + P` and select "Reconnect Storybook to VSCode". Expand the STORYBOOK section in the sidebar to see all use cases for components that have `.story.tsx` files in their directories.

## Previous Boilerplates

- [2017 aka Andross](https://github.com/infinitered/ignite-andross)
- [2016 aka Ignite 1.0](https://github.com/infinitered/ignite-ir-boilerplate-2016)

## Premium Support

[Ignite CLI](https://infinite.red/ignite), [Ignite Andross](https://github.com/infinitered/ignite-andross), and [Ignite Bowser](https://github.com/infinitered/ignite-bowser), as open source projects, are free to use and always will be. [Infinite Red](https://infinite.red/) offers premium Ignite support and general mobile app design/development services. Email us at [hello@infinite.red](mailto:hello@infinite.red) to get in touch with us for more details.
