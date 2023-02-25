const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

//const AudioFile = "../resources/i-just-want-to-get-out.wav"

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
speechConfig.speechRecognitionLanguage = "en-US";

// function saveFile(convertedFile) {
//     //const audioFile = convertedFile.request.body
//     console.log(convertedFile)
//     const wavUrl = audioFile
//     const buffer = Buffer.from(
//         wavUrl.split('base64,')[1],  // only use encoded data after "base64,"
//         'base64'
//     )
//     fs.writeFileSync('./audio.wav', buffer)
//     console.log(`wrote ${buffer.byteLength.toLocaleString()} bytes to file.`)
//     fromFile(audioFile)
// }

function fromFile(audioFile) {
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(audioFile));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case sdk.ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}

module.exports.fromFile =  fromFile
