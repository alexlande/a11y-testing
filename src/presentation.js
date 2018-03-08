import React, { Component, Fragment } from 'react';
import {
  Deck,
  Heading,
  Slide,
  Text,
  List as BaseList,
  ListItem,
  Code as BaseCode,
  CodePane,
  Appear,
  Link,
  BlockQuote,
  Quote as BaseQuote,
  Cite as BaseCite
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import styled, { css } from 'react-emotion';

import ExampleApp from './example-app';
import FormidableLogo from './formidable-logo';

import spaceImg from './images/space.jpg';
import preferencesImg from './images/preferences.png';

import axeCliExample from './examples/axe-cli.js';

import './overrides.css';

require('normalize.css');

const sansFont = 'Avenir Next';
const serifFont = 'Iowan Old Style';

const white = '#fff';
const black = '#1F2022';
const green = '#19A974';
const darkTextColor = 'rgba(0,0,0,0.65)';
const codeSlideBg = '#2a2734';

const FullPageSlide = styled(Slide)`
  transform: none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  margin: 0;
  max-width: none;
  max-height: none;
`;

const SansHeading = styled(Heading)`
  line-height: 1;
  letter-spacing: ${props => (props.fit ? '0.01em' : '0.075em')};
  text-rendering: optimizeLegibility;
  text-transform: uppercase;
  font-family: ${sansFont};
`;

const SerifHeading = styled(Heading)`
  font-family: ${serifFont};
  font-weight: 400;
`;

const LargeCodePane = styled(CodePane)`
  font-size: 2em;
`;

const Quote = styled(BaseQuote)`
  line-height: 1.1;
  font-weight: 400;
  border-left-width: 2px;
`;

const Cite = styled(BaseCite)`
  font-family: ${serifFont};
  font-size: 3em;
`;

const Code = styled(BaseCode)`
  color: ${white};
`;

const List = styled(BaseList)`
  color: ${darkTextColor};
  font-family: ${serifFont};
  line-height: 1.6;
`;

const AppearListItem = props => (
  <Appear transitionDuration={0}>
    <ListItem {...props} />
  </Appear>
);

const TextHighlight = styled('span')`
  color: ${darkTextColor};
  font-weight: 700;
  font-family: ${sansFont};
`;

const LinksList = ({ links, topMargin }) => (
  <Fragment>
    {links.map((link, i) => (
      <Link href={link.href}>
        <SansHeading
          size={5}
          textColor="primary"
          margin={i > 0 || topMargin ? '2em 0 0' : null}
        >
          {link.title}
        </SansHeading>

        <Text textColor={darkTextColor} textFont="secondary">
          {link.href}
        </Text>
      </Link>
    ))}
  </Fragment>
);

const ContactInfo = ({ textAlign }) => (
  <Text
    textAlign={textAlign}
    margin="60px 0 0"
    textColor="primary"
    textFont="secondary"
  >
    <Link textColor={white} href="https://www.alexlande.com">
      alexlande.com
    </Link>{' '}
    •{' '}
    <Link textColor={white} href="https://www.twitter.com/alexlande">
      @alexlande
    </Link>
  </Text>
);

const DemoTime = ({ children }) => (
  <Fragment>
    <SerifHeading size={3} textColor={white} margin="0 0 0.5em">
      Demo Time
    </SerifHeading>

    <SansHeading size={4} textColor={darkTextColor}>
      {children}
    </SansHeading>
  </Fragment>
);

const CitedQuote = ({ children, source }) => (
  <BlockQuote>
    <Quote textFont="secondary" margin="0 0 0.3em">
      {children}
    </Quote>
    <Cite textAlign="right" textColor={darkTextColor}>
      {source}
    </Cite>
  </BlockQuote>
);

const GoogleText = () => (
  <Fragment>
    <span style={{ color: 'rgb(66, 133, 244)' }}>G</span>
    <span style={{ color: 'rgb(234, 67, 53)' }}>o</span>
    <span style={{ color: 'rgb(251, 188, 5)' }}>o</span>
    <span style={{ color: 'rgb(66, 133, 244)' }}>g</span>
    <span style={{ color: 'rgb(52, 168, 83)' }}>l</span>
    <span style={{ color: 'rgb(234, 67, 53)' }}>e</span>
  </Fragment>
);

const HeadingList = ({ title, children }) => (
  <Fragment>
    <SansHeading size={4} margin="0 0 0.3em" textColor={white}>
      {title}
    </SansHeading>

    <List>{children}</List>
  </Fragment>
);

class AnimatedSearch extends Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(this.updateValue);
  }

  updateValue() {
    if (this.state.value === this.props.value) {
      return;
    }

    this.setState(
      (prevState, props) => ({
        value: props.value.slice(0, prevState.value.length + 1)
      }),
      () => {
        // You may not like it, but this is what peak performance looks like
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(this.updateValue);
            });
          });
        });
      }
    );
  }

  render() {
    return (
      <input
        className={css`
          padding: 14px 20px;
          font-size: 21px;
          width: 100%;
          max-width: 600px;
          border-radius: 2px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        `}
        value={this.state.value}
      />
    );
  }
}

const theme = createTheme(
  {
    primary: white
  },
  {
    primary: sansFont,
    secondary: serifFont
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck theme={theme} progress="none" controls={false}>
        <Slide bgColor={green}>
          <SansHeading fit>Accessibility Testing</SansHeading>
          <SansHeading fit textColor={darkTextColor}>
            For Web Developers
          </SansHeading>

          <ContactInfo textAlign="right" />
        </Slide>

        <Slide bgColor="#000" bgImage={spaceImg} textColor="#fff">
          <div
            className={css`
              max-width: 500px;
              margin: 0 auto;
              padding: 40px;
            `}
          >
            <FormidableLogo />
          </div>
        </Slide>

        <Slide bgColor={green}>
          <SansHeading fit>A True Story</SansHeading>
          <SansHeading fit textColor={darkTextColor}>
            (From Early in My Career)
          </SansHeading>
        </Slide>

        <Slide bgColor={green}>
          <CitedQuote source="My boss">
            The accessibility audit is next week. We’re ready, right?
          </CitedQuote>
        </Slide>

        <Slide bgColor={green}>
          <CitedQuote source="Me">Yeah, of course!</CitedQuote>
        </Slide>

        <Slide bgColor={white}>
          <SerifHeading textColor={black} size={4} margin="0 0 0.7em">
            So I <GoogleText /> it
          </SerifHeading>

          <AnimatedSearch value="how to make websites accessible fast" />
        </Slide>

        <Slide bgColor={green}>
          <SansHeading fit>There are approximately</SansHeading>

          <SansHeading fit textColor={darkTextColor}>
            7.4 billion
          </SansHeading>

          <SansHeading fit>accessibility articles on the internet</SansHeading>
        </Slide>

        <Slide bgColor={green}>
          <HeadingList title="And so many rules">
            <AppearListItem>Use real button elements!</AppearListItem>
            <AppearListItem>Don’t hide focus outlines!</AppearListItem>
            <AppearListItem>Provide alt text!</AppearListItem>
            <AppearListItem>
              Use… <Code>tabindex</Code>?
            </AppearListItem>
          </HeadingList>
        </Slide>

        <Slide bgColor={green}>
          <SansHeading fit>The audit went…</SansHeading>
          <SansHeading fit textColor={darkTextColor}>
            Not great
          </SansHeading>
        </Slide>

        <Slide bgColor={green}>
          <SerifHeading size={3} textColor={white}>
            Accessibility is <TextHighlight>invisible</TextHighlight>
          </SerifHeading>
        </Slide>

        <Slide bgColor={green}>
          <SerifHeading size={3} textColor={white}>
            Let’s talk about <TextHighlight>frogs</TextHighlight>
          </SerifHeading>
        </Slide>

        <FullPageSlide>
          <ExampleApp />
        </FullPageSlide>

        <Slide bgColor={green}>
          <SerifHeading size={3} textColor={white}>
            Let’s talk about <TextHighlight>a11y</TextHighlight>
          </SerifHeading>
        </Slide>

        <Slide bgColor={green}>
          <SansHeading fit>Automated</SansHeading>

          <SansHeading fit textColor={darkTextColor}>
            Testing
          </SansHeading>
        </Slide>

        <Slide bgColor={green}>
          <SansHeading size={1}>aXe</SansHeading>

          <SerifHeading size={4} textColor="primary" margin="0 0 1em">
            The Accessibility Engine
          </SerifHeading>

          <Text size={1} textFont="secondary">
            <Link textColor={darkTextColor} href="https://axe-core.org/">
              https://axe-core.org/
            </Link>
          </Text>
        </Slide>

        <Slide bgColor={green}>
          <HeadingList title="aXe can find">
            <AppearListItem>Color contrast issues</AppearListItem>
            <AppearListItem>Missing alt text</AppearListItem>
            <AppearListItem>Missing labels</AppearListItem>
            <AppearListItem>Incorrect ARIA usage</AppearListItem>
            <AppearListItem>A whole bunch of other stuff!</AppearListItem>
          </HeadingList>
        </Slide>

        <Slide bgColor={green}>
          <DemoTime>aXe Browser Plugin</DemoTime>
        </Slide>

        <FullPageSlide>
          <ExampleApp
            altText={false}
            buttonText={false}
            formLabels={false}
            goodAltText={false}
          />
        </FullPageSlide>

        <Slide bgColor={codeSlideBg}>
          <SansHeading size={4} margin="0 0 0.5em" textColor={white}>
            npm install axe-core
          </SansHeading>

          <LargeCodePane
            theme="dark"
            lang="javascript"
            source={axeCliExample}
          />
        </Slide>

        <Slide bgColor={green}>
          <SansHeading fit>Keyboard</SansHeading>

          <SansHeading fit textColor={darkTextColor}>
            Behavior
          </SansHeading>
        </Slide>

        <Slide bgColor={green}>
          <CitedQuote source="You (a thoughtful developer)">
            Can I reach everything by keyboard?
          </CitedQuote>
        </Slide>

        <Slide bgColor={green}>
          <HeadingList title="Keyboard Primer">
            <AppearListItem>
              <Code>tab</Code> key moves forward
            </AppearListItem>
            <AppearListItem>
              <Code>shift</Code> + <Code>tab</Code> moves backward
            </AppearListItem>
            <AppearListItem>
              <Code>space</Code> scrolls down
            </AppearListItem>
            <AppearListItem>
              <Code>shift</Code> + <Code>space</Code> scrolls up
            </AppearListItem>
            <AppearListItem>
              <Code>space</Code> clicks buttons and form elements
            </AppearListItem>
            <AppearListItem>
              <Code>enter</Code> clicks links
            </AppearListItem>
          </HeadingList>
        </Slide>

        <Slide bgColor={green}>
          <img
            style={{
              maxWidth: '90%',
              marginTop: -60
            }}
            src={preferencesImg}
            alt="macOS keyboard preferences"
          />
        </Slide>

        <Slide bgColor={green}>
          <DemoTime>Focus Outlines</DemoTime>
        </Slide>

        <FullPageSlide>
          <ExampleApp
            showKeys
            focusOutline={false}
            keyboardOnlyFocusOutline={false}
          />
        </FullPageSlide>

        <Slide bgColor={green}>
          <LinksList
            links={[
              {
                title: 'what-input',
                href: 'https://github.com/ten1seven/what-input'
              },
              {
                title: ':focus-visible',
                href: 'https://github.com/WICG/focus-visible'
              }
            ]}
          />
        </Slide>

        <Slide bgColor={green}>
          <DemoTime>Unreachable Elements</DemoTime>
        </Slide>

        <FullPageSlide>
          <ExampleApp showKeys keyboardElements={false} />
        </FullPageSlide>

        <Slide bgColor={green}>
          <DemoTime>Focus Management</DemoTime>
        </Slide>

        <FullPageSlide>
          <ExampleApp showKeys />
        </FullPageSlide>

        <Slide bgColor={green}>
          <SansHeading fit>Screen Reader</SansHeading>

          <SansHeading fit textColor={darkTextColor}>
            Behavior
          </SansHeading>
        </Slide>

        <Slide bgColor={green}>
          <SerifHeading size={3} textColor="primary">
            VoiceOver for Mac
          </SerifHeading>

          <Text
            size={3}
            textColor="primary"
            textFont="secondary"
            margin="1.3em 0 0"
          >
            <Code>cmd</Code> + <Code>f5</Code> to start
          </Text>
        </Slide>

        <Slide bgColor={green}>
          <HeadingList title="VoiceOver Basics">
            <AppearListItem>
              <Code>VO</Code> keys: <Code>option</Code> + <Code>control</Code>
            </AppearListItem>
            <AppearListItem>
              <Code>VO</Code> + <Code>right</Code> reads next
            </AppearListItem>
            <AppearListItem>
              <Code>VO</Code> + <Code>left</Code> reads previous
            </AppearListItem>
            <AppearListItem>
              <Code>VO</Code> + <Code>shift</Code> + <Code>down</Code> enters
              content area
            </AppearListItem>
            <AppearListItem>
              <Code>VO</Code> + <Code>shift</Code> + <Code>up</Code> exits
              content area
            </AppearListItem>
            <AppearListItem>
              <Code>VO</Code> + <Code>space</Code> clicks
            </AppearListItem>
          </HeadingList>
        </Slide>

        <FullPageSlide>
          <ExampleApp />
        </FullPageSlide>

        <Slide bgColor={green}>
          <SerifHeading size={3} textColor="primary" textFont="secondary">
            Ways of Seeing
          </SerifHeading>

          <Text textColor="primary" textFont="secondary" margin="1.3em 0 0">
            <Code>VO</Code> + <Code>u</Code> to open rotor
          </Text>
        </Slide>

        <FullPageSlide>
          <ExampleApp />
        </FullPageSlide>

        <Slide bgColor={green}>
          <LinksList
            links={[
              {
                title: 'Inclusive Components',
                href: 'https://inclusive-components.design'
              },
              {
                title: 'WAI-ARIA Authoring Practices',
                href: 'https://www.w3.org/TR/wai-aria-practices-1.1'
              }
            ]}
          />
        </Slide>

        <Slide bgColor={green}>
          <HeadingList title="Other Screen Readers">
            <AppearListItem>VoiceOver for iOS</AppearListItem>
            <AppearListItem>TalkBack for Android</AppearListItem>
            <AppearListItem>Narrator for Edge</AppearListItem>
            <AppearListItem>NVDA for IE and Firefox on Windows</AppearListItem>
            <AppearListItem>JAWS for IE</AppearListItem>
          </HeadingList>

          <Appear transitionDuration={0}>
            <Text textColor="primary" textFont="secondary">
              All of them are free except JAWS!
            </Text>
          </Appear>
        </Slide>

        <Slide bgColor={green}>
          <LinksList
            links={[
              {
                title: 'WebAIM Screen Reader User Survey',
                href: 'https://webaim.org/projects/screenreadersurvey7/'
              }
            ]}
          />
        </Slide>

        <Slide bgColor={green}>
          <SerifHeading>We did it!</SerifHeading>

          <LinksList
            topMargin
            links={[
              {
                title: 'A11y Slack',
                href: 'https://web-a11y.herokuapp.com'
              }
            ]}
          />
        </Slide>

        <Slide bgColor={green}>
          <SerifHeading>Thanks!</SerifHeading>

          <ContactInfo />
        </Slide>

        <FullPageSlide>
          <ExampleApp />
        </FullPageSlide>
      </Deck>
    );
  }
}
