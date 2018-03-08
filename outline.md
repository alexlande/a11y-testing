# Accessibility Testing for Web Developers

## Personal Intro

* Hi, I'm Alex, I'm a front-end developer
* I work at Formidable

## Story Time

* Change this section and tell it as a first person story
* I wonder if anyone has ever experienced this:
  * You've been building an app, and release is in a few weeks
  * It's fast, it has cool animations, you wrote a wacky state management abstraction that you don't really understand but think is cool, you're throwing in some easter eggs
  * You're feeling pretty good about yourself. You're still humble, obviously, you don't think you're the best web developer of all time or anything... But top 5, easy.
  * A project manager comes to you and says "Hey, we're scheduling an accessibility audit"
  * And you get this knot in your stomach

### So you turn to Google

* "How to make website accessible" screenshot

### And there's so much and you have to look away

* Raiders face melt
* There are approximately [current population of earth] accessibility articles on the internet
  * And they all contradict each other
* a lot of times we try to just learn a ton of factoids about a11y and keep them in our heads all the time
  * All of these ARIA attributes, and rules about tabindex, and you've got to use alt text on images

## Invisibility

* Here's the thing about accessibility-- if you don't need it, it's typically invisible to you
  * You can test your app every day and if you aren't looking to make sure it's accessible, you'll never see that you have problems

## Don't Worry

* Fact is, making accessible websites is so much easier if you know what you're looking for
* If you can make accessibility visible, and obvious, you don't have to be afraid.
* Today, I'm going to show you concrete steps that you can take to integrate accessibility testing into your development workflow so that you can work on a11y confidently.
* But first...

## Let's talk about frogs

* I've been working on a side project lately that I'm really excited about, and I'm going to be using it as a demo since I've been working on accessibility for this app.
* Before I got into web development, I was interested in researching animal behavior.
* I was fascinated by how animals perceived the world, and I wanted to understand what they were thinking.
* So I've created a new kind of social network to answer that very question.

### Ribbit Demo

* Ribbit: "A place for frogs"
* Ribbit lets frogs share their thoughts, keep in touch with their friends, and upload selfies
* There are members of the scientific community who have called Ribbit "absurd", and "nonsense" and said that "clearly I'm writing all of these frog tweets myself"
* These powerful frog biologist lobbyists have a lot of influence, but I'm confident that over time everyone will accept that yes, I've taught frogs how to tweet, and no, I'm not going to share how I did that because it's very complicated

## Let's Talk About Accessibility

* Today, I want to show you three accessibility testing methods that you can easily incorporate into your workflow
* Once we're done, you'll know how to evaluate the accessibility of projects you're working on, and that will make it so much easier to solve accessibility challenges

## Automated Testing

* The first type of testing is the easiest-- using automated accessibility testing tools.
* There are a bunch of good tools in this space, that let you run accessibility tests through browser plugins, or in your CI process, or even standalone monitoring services

### aXe

* My favorite of these, by far, is aXe
* aXe is a powerful, open source accessibility tester
* You can use it through browser plugins for Chrome or Firefox
* A version of it is bundled into Chrome devtools through the lighthouse audit feature
* And you can `npm install` it and run it as a build step or in a CI environment

### Detects

* Color contrast issues
* Missing alt text
* Missing labels
* Incorrect ARIA usage
* A whole bunch of other stuff

### This is what it looks like (Ribbit Demo)

* Browser extension
* Show a run with a bunch of errors
  * Show outline, inspect node
* Show a run with error fixed
  * Point out that errors don't have to be fixed **well**, which is a problem
    * Button with label that just says "Button"
    * This is an example of why automated tests aren't enough, but they're a great start

### CI Usage

* It's a great idea to integrate it into your CI setup
* When you run aXe in Node, it will give you an object back with all of the test data
* You can write integration tests around this:
  ```js
  it('passes a11y checks', () => {
    return axe
      .run(document)
      .then(data => expect(data.violations).toHaveLength(0));
  });
  ```

### Tips

* Run aXe all the time!
  * It takes seconds to run aXe in your browser, so it's totally worth running it regularly whenever you change your UI.
* aXe lets you catch a whole class of common accessibility bugs early and with virtually no effort. An easy win!

## Keyboard Behavior

* The next class of accessibility testing is where we start with manual testing, looking at keyboard behavior
* Getting started testing keyboard behavior is easy. Open your app, stop using your mouse or trackpad, and answer this question:

### "Can I reach everything by keyboard?"

#### Keyboard Navigation Primer

* `tab` key navigates to the next interactive element on the page
* `shift` + `tab` navigates backwards
* `space` scrolls down
* `shift` + `space` scrolls up
* `space` clicks a button or other form element (`select`, `checkbox`, `radio`)
* `enter` clicks a link or a button

#### A Note on macOS

* macOS has a system preference called "Full Keyboard Access"
  * By default this is set to "Text boxes and lists only"
  * Firefox and Safari respect this setting, so if it's set to the default the tab key won't cycle through links on your page, only buttons and form elements. To access links, you have to press `option` + `tab`.
  * Chrome ignores this setting so you don't have to worry about it.
  * Consider setting this to "All controls" so you never have to think about it again

#### Demo

##### Focus outline

* I have no evidence to support this, but I would be willing to bet that the single most pervasive accessibility problem on the web is missing or inadequate focus styles.
* Lots of times websites will have a CSS rule like `* { outline: none }`, which hides that charming blue outline that your browser displays around focused elements.
  * Usually, we do this because the focus outline displays after you've clicked on an element like a button, and it looks awkward.
  * My favorite solution for this is to use a JavaScript library to detect if the user is navigating the page with a mouse or keyboard, and only display focus outlines for keyboard users.
  * This is also nice because you can make focus outlines extremely clear and easy to see without disrupting mouse users at all.
  * `what-input` is a great library for this
  * And there's a proposal to add this behavior to CSS natively. The Selectors Level 4 proposal includes a `:focus-visible` pseudo-class which would apply to elements that are focused via keyboard. The WICG has a polyfill for this if you'd like to try it out and give them feedback.

##### Unreachable elements

* A lot of times I see UIs built with click handlers on non-interactive elements, things like `li` or `div`. The problem with this is that keyboard and screen reader users can't access those elements, so your UI isn't functional.
* Except in very rare cases, you should use a `button` for an interactive element, or an `a` if it's a link that takes the user to a URL (if it has an `href`, it's a link!)
* For those very rare cases, you can set `tabindex="0"` to make a non-interactive element reachable by the keyboard. If you do that, you'll still need to add `click` handlers to the element, as well as keyboard handlers to respond to `space` and `enter` keys appropriately, and you'll also need to add an ARIA role so that screen reader users know that the element is interactive. Like I said, usually you'll want to use a button.

##### Radio Buttons

* One other quirky behavior that people are often confused by is how keyboard controls for radio buttons work.
* If you press `tab`, your browser will focus on the first (or the active) radio button in a group, but you can't press tab to access the others.
* Instead, you change radio buttons by pressing the arrow keys to cycle through the currently active one.

### But Wait, There's More

* Beyond basic keyboard controls, there's also the question of whether your app handles more advanced use cases.
* If your app is simple, you may not encounter these things, but if you're building complex pieces of UI you'll probably need to add additional keyboard behavior yourself

#### Demo

##### Dropdowns

* For an autocomplete widget and similar interfaces, you'll typically want to handle some non-standard keyboard behaviors:
  * The `up` and `down` keys should cycle through options in the dropdown
  * The `enter` key should select the highlighted option
  * The `esc` key should close the dropdown

##### Modals

* For modals, you'll need to manage the browsers focus actively.
* When you open the modal, you should trigger focus on the first interactive element in it or the heading of the modal, so that keyboard users will be in the right place in the document.
* Then, you should implement a focus trap so that a user can't focus _outside_ of the modal. The modal should behave like a standalone webpage-- when you navigate past the last interactive element in it, your focus should loop back to the start of the modal, and the same in the opposite direction.
* The `esc` key should typically close your modal as well.

## Screen Reader Behavior

* The last type of accessibility testing I'm going to cover is screen reader usage.
* I think a lot of people find screen readers really imposing, so they never try them.
* That's a natural feeling-- a screen reader is a totally different way of interacting with the web than you're used to.
* But it's not as scary as it seems, and it's pretty easy to get started.

### VoiceOver

* If you use a Mac, you've got a screen reader available right now.
* Press `cmd` + `f5` to open VoiceOver and it will start talking to you immediately
* Press the same keys to close it

### VoiceOver Basics

* All VoiceOver commands are prepended by "the VoiceOver keys", `option` + `control` by default.
* Hold those keys and then press other keys to interact with the screen reader
* `VO` + `right` reads the next element
* `VO` + `left` reads the previous element
* `VO` + `shift` + `down` drills down into a content area (like a page, or a landmark area like navigation)
* `VO` + `shift` + `up` exits a content area
  * Hint: If you're stuck in a page somewhere, you probably need to enter or exit the content area you're currently in.
* `VO` + `space` clicks an element

### Demo

#### Basic Reading

* Show normal page navigation
* Show `alt` attributes
* Show `button` with inadequate label

### Ways of Seeing

* Beyond the default behavior, VoiceOver includes a feature called the rotor that lets you navigate pages in different ways
* Using the rotor you can browse the page by heading, by form element, or by landmark
* To open the rotor, press `VO` + `U`
* To close the rotor, press `esc` (or select an option in it)

### Rotor Demo

* Show landmark navigation
* Show heading navigation
* Browse through the other modes

### ARIA and Interactivity

* A lot of screen reader behavior will be covered by the other testing steps we've talked about
* If you're passing aXe and your keyboard behavior is good, that's a great start
* For some complex behavior, you'll need to use ARIA attributes to describe relationships between page elements and how they behave.
* Demo search combobox
* I'm not going to go into detail on ARIA usage because that's a talk in itself, but I highly recommend reading the entire WAI-ARIA Authoring Practices guide to learn about what's possible
* Also Inclusive Design

### Other Screen Readers

* There are a lot of screen readers out there, VoiceOver isn't even close to the most popular one-- it's just the one that I find most convenient for web developers!
* Which screen reader someone will use depends on their platform:
* On iOS, it's VoiceOver
* Android has TalkBack
* For Windows, there are several choices:
  * Narrator is built in to Windows, and I believe Microsoft has been improving it lately, but it's not commonly used.
  * JAWS is historically the most commonly used screen reader, but it's not free (even for testing!) and the high price point can be a large burden. See if your company can buy a license!
  * NVDA is also popular and is free and open source. It's commonly used with Firefox and Internet Explorer
* To dig in to how screen readers are used and which screen reader and browser combinations are common, check out the WebAIM screen reader user survey. They've done a lot of them over the years and they're the best source of information on the subject. I believe there's a new one in progress, so keep an eye out for that.

## We Did It!

* That was a lot, but we did it!
* To learn more:
  * These slides are online at [link], so you can check them out (with notes) and use free mode in the demo (next slide) to enable and disable different accessibility features in the app to see how different types of testing handle them.
  * A few resources:
    * Inclusive Components
    * WebAIM
    * ARIA Spec
    * A11y Slack

## Thank you!
