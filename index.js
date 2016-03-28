/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Kanye Knowledge for a Kanye fact"
 *  Alexa: "Here's your Kanye fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Kanye facts.
 */
var KANYE_FACTS = [
  "The name Kanye means 'the only one' in Swahilli.",
  "Kanye Omari West was born June 8, 1977 in Atlanta",
  "His father Ray West was a black panther in the 60s and 70s ",
  "Kanye moved to Chicago at the age of three",
  "His mother Donda was English professor at Clark Atlanta University",
  "Kanye lived in China for more than a year with his mother when he was in the fifth grade",
  "He sold his first beat to local Chicago rapper Gravity for $8,800",
  "Kanye attended Chicago State University/Columbia College in Chicago. He dropped out to pursue music which is why he named his 2004 debut album, The College Dropout.",
  "Unbelievably, Rock-A-Fella were initially reluctant to sign West, with Jay Z revealing down the line that they were unsure due to West's formidable reputation and work as a producer.",
  "West's late mother Donda-a professor of English at Clark Atlanta University and later Chicago State University-retired from teaching to become her son's manager for the early part of his career.",
  "He got his first big break through No I.D. (born Dion Ernest Wilson) is a veteran hip hop producer and current VP at Def Jam. He taught Kanye how to produce beats and gave him his start in the music business-all because their moms forced the two to hang out.",
  "No I.D.'s mother convinced him to meet this  energetic  kid, and the lessons paid off:  At first it was just like, 'Alright man take this, learn this, go, git git git.' But eventually he started getting good and then I started managing him. West's subsequent success only bolstered No I.D.'s reputation outside of Chicago-a powerful lesson in why you should probably listen to your mother.",
  "He initially rose to fame as a producer for Roc-A-Fella Records. He is was influential on Jay-Z's 2001 album, 'The Blueprint', producing 5 of the 13 tracks and two bonus tracks, more than any of the other producers on the album.",
  "He dropped out of college and had a slew of random jobs. He worked as a telemarketer and sold insurance to Montgomery Ward credit card holders.",
  "Kanye was in a near fatal car accident while he was driving home from the studio in October 2002. The injuries were bad and he had to have a metal plate put into his chin.",
  "While he was recovering in hospital, he didn't want to stop recording music so he asked for an electronic drum machine which he used to continue composing new music.",
  "He admits that the idea of becoming a male porn star crossed his mind once or twice before.",
  "His single debut is Through the Wire because he recorded it while he was still wearing the metal brace in his mouth.",
  "He is a huge fan of Fiona Apple and her music.",
  "'College Dropout' was album of the year by almost every publication (New York Times, Time Magazine, GQ, Spin, XXL, Rolling Stone). NME voted Franz Ferdinand's debut number one and Kanye's album number seven.",
  "West was the most nominated artist at the 47th Annual Grammy Awards with 10 nods, and he took home three trophies - Best Rap Album, Best Rap Song for Jesus Walks and Best R&B Song for producing Alicia Keys' You Don't Know My Name.",
  "Following the success of his The College Dropout album, he treated himself by purchasing an 18th century aquarium with about 30 koi fish in it.",
  "With the headline Hip-Hop's Class Act, West becomes one of the rare entertainers to appear on the cover of Time. The lengthy article details the contradictions of The College Dropout and of West himself, who admits that when starting out in hip-hop, It was a strike against me that I didn't wear baggy jeans and jerseys and that I never hustled, never sold drugs.",
  "He used the money from the Diamonds from Sierra Leone music video to raise awareness about blood diamonds and the abuse of human rights that happen in the mining process.",
  "He caused controversy when he strayed from his scripted monologue at the live televised Concert for Hurricane Relief when he said George Bush doesn't care about black people. With a shocked looking Mike Myers at his side, West's comments air live on NBC on the East Coast but are edited out of the West Coast version later that night. People have lost their lives, lost their families, he says a week later on The Ellen DeGeneres Show. It's the least I could do to go up there and say something from my heart.",
  "His nicknames include Ye, The Louis Vuitton Don, Yeezy or konman.",
  "Even after being named Best Hip-Hop Artist at the MTV Europe Music Awards in Copenhagen, a fuming West storms on stage as the award for Best Video is being given to Parisian duo Justice vs. Simian. In a profanity-laced tirade, West says he should have won the prize for Touch the Sky, because his video cost a million dollars, Pamela Anderson was in it.",
  "Kanye was named International Man of the Year by GQ in 2007 at a ceremony at Covent Garden's Opera House in London.",
  "Kanye broke down at a concert in Paris, a week after the passing of his mother, Dr. Donda West, as he tried to sing the verses of Hey Mama, a song he had written earlier on in his career in dedication to her.",
  "He launched an online travel company called Kanye Travel Ventures (KTV) through his official website in 2008.",
  "After the infamous Taylor Swift Gate VMAs incident in 2009, he decided to leave the country for a while. He went to Japan, then Rome, before finally moving to Hawaii for 6 months to start working on music again.",
  "In addition to avoiding the VMAs backlash, 'Ye was able to slow down and spend time reflecting. It was the first time I got to stop, since my mom had passed, because I never stopped and never tried to even soak in what all had happened, he later told Ellen Degeneres. Plus he got to do fun stuff like intern at Fendi.",
  "The Eternal Sunshine of the Spotless Mind director visited the studio on the same the day West was recording Diamonds From Sierra Leone, producer Jon Brion told MTV . In addition to playing drums on the Grammy-winning song, Gondry's more famous Late Registration contribution is the video for Heard 'Em Say featuring Adam Levine.",
  "He said once in an interview that he prefers finalizing a song in post production more than having sex.",
  "One of his favorite bands is Scottish rock group Franz Ferdinand.",
  "The song, 'Stronger', famously used a sample of Daft Punk's 'Harder, Better, Faster, Stronger'. But Kanye has also created some unreleased songs that contain samples from Broadway hit music, 'Wicked'.",
  "Kanye was engaged to designer Alexis Phifer for 18 months before he began a relationship Amber Rose. The couple makes a fashionable pair, wearing attention-grabbing ensembles around the world. He'll pick out something and he'll be like 'Babe, just ... no.,'",
  "For Kanye, being famous has always been an unbearable drain. In his new track 'New Slaves', he compares being a celebrity to, erm, being a slave. Ironically, he is currently engaged to reality TV star Kim Kardashian who is known for loving the media.",
  "Kanye and Royce have a long-standing feud stemming from a 2003 song that West produced for the Detroit rhymer titled Heartbeat. West alleges that Nickel Nine never paid for the beat, but recorded to it and released it on Build And Destroy: The Lost Sessions regardless. He has since stated that he will never work with Royce again.",
  "Although 'Ye has a penchant for left field collaborations-most notably Chris Martin of Coldplay, Daft Punk, Bon Iver and Katy Perry-one of his most unexpected collabs came with rock group 30 Seconds To Mars.",
  "He is a budding fashion designer and he and he collaborated with French brand A.P.C. He garnered attention for selling a plain white t-shirt for $120.",
  "Kanye opened up a burger chain in Chicago called Fatburger in 2008. When he opened it, he said he had plans to open 10 stores. He opened two before running into some financial problems and so he closed them down in 2011.",
  "In 2009, Kanye recorded a song titled Hurricane with the group-which features actor Jared Leto on the lead vocals-but the song was only ever released as a bonus cut due to label issues.",
  "Kanye West's stylist is Cassius Clay, a Yale student he met at a department store. Ye was shopping at Barney's when he spotted how nicely dressed Clay was and Kanye offered him the job.",
  "Classical singer Josh Groban sang a compilation of Kanye West's tweets as a joke while appearing as a guest on Jimmy Kimmel Live.",
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * KanyeKnowledge is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var KanyeKnowledge = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
KanyeKnowledge.prototype = Object.create(AlexaSkill.prototype);
KanyeKnowledge.prototype.constructor = KanyeKnowledge;

KanyeKnowledge.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("KanyeKnowledge onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

KanyeKnowledge.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("KanyeKnowledge onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
KanyeKnowledge.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("KanyeKnowledge onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

KanyeKnowledge.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask the Oracle tell me a Kanye fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Kanye fact from the Kanye facts list
    var factIndex = Math.floor(Math.random() * KANYE_FACTS.length);
    var fact = KANYE_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Kanye fact: " + fact;

    response.tellWithCard(speechOutput, "KanyeKnowledge", speechOutput);
}

// Create the handler that responds to the Alexa Request.
function lambdafunc1(event, context) {
    // Create an instance of the KanyeKnowledge skill.
    var kanyeKnowledge = new KanyeKnowledge();
    kanyeKnowledge.execute(event, context);
};

exports.handler = lambdafunc1

