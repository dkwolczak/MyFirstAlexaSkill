/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hi this is Dominiks test skill for innovation day at staffordshire university';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const UserPickHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'UserPickIntent';
    },
    handle(handlerInput) {
        let userChoice = Alexa.getSlotValue(handlerInput.requestEnvelope, 'userChoice');
            let answers = ["rock", "paper", "scissors", "cat"];
    let catState = -1; // Indicates not cat selected
    let speech="";
    if (! answers.includes(userChoice)) {
        speech = `You picked ${userChoice}, this is not a valid choice, please try again`;
    } else {
        let computerChoice = answers[Math.floor(Math.random() * 4)];
        if (userChoice === computerChoice) {
            speech = "it's a draw!"
        } else if ((userChoice === "cat") || (computerChoice ==="cat")) {

            catState = Math.floor(Math.random() * 2);

            if (userChoice === "cat") {
                if (catState === 0) {
                    speech = "The cat is angry! <say-as interpret-as='interjection'>well well</say-as>, alexa wins!";
                } else {
                    speech = "The cat is happy! <say-as interpret-as='interjection'>uh oh</say-as>, you win!";
                }
            } else {
                if (catState === 0) {
                    speech = "The cat is angry! <say-as interpret-as='interjection'>uh oh</say-as>, you win!";
                } else {
                    speech = "The cat is happy! <say-as interpret-as='interjection'>well well</say-as>, alexa wins!";
                }
            }
        } else if (userChoice === "rock") {
            if (computerChoice === "scissors") {
               speech ="<say-as interpret-as='interjection'>uh oh</say-as>, you win, as rock blunts scissors!";
            } else {
                speech = "<say-as interpret-as='interjection'>well well</say-as>, alexa wins, as paper wraps rock!";
            }
        } else if (userChoice === "paper") {
            if (computerChoice === "rock") {
              speech = "<say-as interpret-as='interjection'>uh oh</say-as>, you win, as paper wraps rock!!";
            } else {
                speech = "<say-as interpret-as='interjection'>well well</say-as>, alexa wins, as scissors cuts paper!";
            }
        } else if (userChoice === "scissors") {
            if (computerChoice === "paper") {
              speech = "<say-as interpret-as='interjection'>uh oh</say-as>, you win, as scissors cuts paper!!";
            } else {
              speech = "<say-as interpret-as='interjection'>well well</say-as>, alexa wins, as rock blunts scissors!!";
            }
        }
        speech = `You picked ${userChoice} , alexa picked ${computerChoice}. ${speech}`;
    }

    let catSound = "";
    if (catState !== -1) {

       if (catState === 0) {
            catSound = "<audio src='soundbank://soundlibrary/animals/amzn_sfx_cat_angry_meow_1x_01'/>";
        } else {
            catSound = "<audio src='soundbank://soundlibrary/animals/amzn_sfx_cat_meow_1x_01'/><audio src='soundbank://soundlibrary/animals/amzn_sfx_cat_meow_1x_02'/>";
        }
    }
    let speakOutput = `${catSound} ${speech}`;


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Test some other things')
            .getResponse();
    }
};


const RandomFruitIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RandomFruitIntent';
    },
    handle(handlerInput) {
        let fruits = ['Apple', 'Banana','Orange','Melon','Strawberry'];
        let myRandom = Math.floor(Math.random() * 5);
        let myfruit = fruits[myRandom];
        const speakOutput = `The fruit you should have is a ${myfruit}`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('say something like give me a random fruit')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        UserPickHandler,
        RandomFruitIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
