# nwHacks 2021 - Extension

## Getting Started

The recommended IDE is [Webstorm](https://www.jetbrains.com/webstorm/). It's available for free for students. Once you pull the repo,
run `yarn install` to install all dependencies. Webstorm should prompt you to do so anyway.

We are leveraging [this boilerplate](https://github.com/abhijithvijayan/web-extension-starter). Follow the setup instructions
there. We will use Chrome, so the command to start should be:
`yarn run dev:chrome`.

Once you load the extension (see the README from the boilerplate). You should see the new chrome extension icon in the toolbar.
Clicking on the icon, you should see two buttons:

1. Launch Reader

- This will try to parse the article on the *current page* and launch the reader view

2. Launch Reader Sandbox

- This will populate the reader view with a mock parsed object. See [source/data/mockCBCParsedArticle.ts](./source/data/mockCBCParsedArticle.ts)


## Installed Libraries & Their Functions
Here are some notable libraries you can use. They are already installed:

- [jQuery](https://jquery.com/) - Manipulate the DOM
- [Ant Design](https://ant.design/) - Component Library
