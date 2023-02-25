const audio = document.querySelector(".record");
const stop = document.querySelector(".stop");
const soundClips = document.querySelector(".sound-clips");
const transcribe = document.querySelector(".transcribe");

let recording;

const backend = "http://localhost:3000/";

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");
  navigator.mediaDevices
    .getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true,
      }
    )

    // Success callback
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");

      let chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      stop.onclick = () => {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
      };

      mediaRecorder.onstop = (e) => {
        console.log("recorder stopped");

        const clipName = prompt("Enter a name for your sound clip");

        const clipContainer = document.createElement("article");
        const clipLabel = document.createElement("p");
        const audio = document.createElement("audio");
        const deleteButton = document.createElement("button");

        clipContainer.classList.add("clip");
        audio.setAttribute("controls", "");
        deleteButton.innerHTML = "Delete";
        clipLabel.innerHTML = clipName;

        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        soundClips.appendChild(clipContainer);

        try {
          recording = new Blob(chunks, { type: "audio/wav; codecs=opus" });
        } catch (error) {
          recording = new Blob(chunks, { type: "audio/x-wav; codecs=opus" });
        }
        chunks = [];
        const audioURL = window.URL.createObjectURL(recording);
        audio.src = audioURL;

        deleteButton.onclick = (e) => {
          let evtTgt = e.target;
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);

          window.location.reload();
        };
      };
    })

    // Error callback
    .catch((err) => {
      console.error(`The following getUserMedia error occurred: ${err}`);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}

transcribe.onclick = () => {
  const req = new XMLHttpRequest();
  req.open("POST", backend, true);
  req.onload = (event) => {
    console.log(`event is: ${event}`);
    console.log(`response text is: ${event.responseText}`);
  };
  // send audio to backend and get response
  var transcription = "get response";
  document.getElementById("transcription").innerHTML = transcription;
};

// async function postAudio(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "no-cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }
