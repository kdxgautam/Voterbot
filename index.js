const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { Twilio } = require("twilio");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const accountSid = ""; // Your Account SID from www.twilio.com/console
const authToken = ""; // Your Auth Token from www.twilio.com/console
const client = new Twilio(accountSid, authToken);

async function sendMessage(contentSid, to) {
  return await client.messages.create({
    contentSid: contentSid,
    from: "whatsapp:+14155238886",
    messagingServiceSid: "MG3b125cb7d280e1d11b4baad5ea431057",
    to: to,
  });
}

const userState = {};

app.post("/whatsapp", async (req, res) => {
  const from = req.body.From;
  const receivedMessage = req.body.Body ? req.body.Body.toLowerCase() : "";
  const buttonPayload = req.body.ButtonPayload;
  const listId = req.body.ListId;
  let responseMessage;

  if (!userState[from]) {
    userState[from] = { stage: "initial" };
    // if(receivedMessage !== ""){
    //   await sendMessage("HX1085b4c468ed20f2293d4ff01d1590d4", from); // Greeting
    // }
  }

  try {
    switch (userState[from].stage) {
    //   case 'start':
    //       await sendMessage("HX1085b4c468ed20f2293d4ff01d1590d4", from);// Greeting
    //       userState[from].stage = "initial"
    //       break

      case "initial":
        if (
          receivedMessage.includes("hello") ||
          receivedMessage.includes("hi")
        ) {
          await sendMessage("HX1085b4c468ed20f2293d4ff01d1590d4", from); // Greeting
        }

        switch (buttonPayload) {
          case "eng":
            await sendMessage("HX7d21184c85ff6516f41f4a3a201fefc4", from); // Menu
            setTimeout(async () => {
              await sendMessage("HX6755453355cede4fb8625682234dbf9c", from); // Menu List
            }, 500);
            break;
          case "hin":
            await sendMessage("HX804983f2b9457cc60453085e1b27020a", from); // Hindi Menu
            setTimeout(async () => {
              await sendMessage("HX554acf5e75882e9c83c57afc310e5997", from); // Hindi Menu List
            }, 500);
            break;
          case "ch":
            await sendMessage("HX7d21184c85ff6516f41f4a3a201fefc4", from); // Menu
            setTimeout(async () => {
              await sendMessage("HX6755453355cede4fb8625682234dbf9c", from); // Menu List
            }, 500);
            break;
          case "hch":
            await sendMessage("HX804983f2b9457cc60453085e1b27020a", from); // Hindi Menu
            setTimeout(async () => {
              await sendMessage("HX554acf5e75882e9c83c57afc310e5997", from); // Hindi Menu List
            }, 500);
            break;
          case "ps":
            responseMessage = "Enter your EPIC No";
            userState[from].stage = "awaitingEpic";
            break;
          case "ecd":
            responseMessage = "Enter your EPIC No";
            userState[from].stage = "detailEpic";
            break;
            
          case "rv":
            responseMessage = `Click the below link to register:\n\nhttps://voters.eci.gov.in/form6`;
            setTimeout(async () => {
              await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu with 500ms delay
            }, 500);
            break;
          case "hps":
            responseMessage = "कृपया अपना EPIC नंबर दर्ज करें।";
            userState[from].stage = "awaitingEpic";
            break;
          case "hecd":
            responseMessage = "कृपया अपना EPIC नंबर दर्ज करें।";
            userState[from].stage = "detailEpic";
            break;
          case "hrv":
            responseMessage = `Click the below link to register:\n\nhttps://voters.eci.gov.in/form6`;
            setTimeout(async () => {
              await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); // Remenu with 500ms delay
            }, 500);
            break;
        }

        switch (listId) {
          case "epd":
            responseMessage = `Click the below link for deletion of name:\n\nhttps://voters.eci.gov.in/form7`;
            setTimeout(async () => {
              await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu with 500ms delay
            }, 500);
            break;
          case "epc":
            responseMessage = `Click the below link for correction:\n\nhttps://voters.eci.gov.in/form8`;
            setTimeout(async () => {
              await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu with 500ms delay
            }, 500);
            break;
          case "apps":
            responseMessage = `Click the below link to track application:\n\nhttps://voters.eci.gov.in/home/track`;
            setTimeout(async () => {
              await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu with 500ms delay
            }, 500);
            break;
          case "kyo":
            responseMessage = `Click the below link to know your officer:\n\nhttps://electoralsearch.eci.gov.in/pollingstation`;
            setTimeout(async () => {
              await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu with 500ms delay
            }, 500);
            break;
          case "svl":
            responseMessage = `Click the below link to search voter list:\n\nhttps://electoralsearch.eci.gov.in/`;
            setTimeout(async () => {
              await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu with 500ms delay
            }, 500);
            break;
          case "vh":
            responseMessage = `1950 (Toll-free Number)\ncomplaints@eci.gov.in\nElection Commission Of India,\nNirvachan Sadan, Ashoka Road,\nNew Delhi 110001`;
            setTimeout(async () => {
              await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu with 500ms delay
            }, 500);
            break;
          case "hepd":
            responseMessage = `नाम हटाने के लिए नीचे दिए गए लिंक पर क्लिक करें:\n\nhttps://voters.eci.gov.in/form7`;
            setTimeout(async () => {
              await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi Remenu with 500ms delay
            }, 500);
            break;
          case "hepc":
            responseMessage = `सुधार के लिए नीचे दिए गए लिंक पर क्लिक करें\n\nhttps://voters.eci.gov.in/form8`;
            setTimeout(async () => {
              await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi Remenu with 500ms delay
            }, 500);
            break;
          case "happs":
            responseMessage = `एप्लिकेशन को ट्रैक करने के लिए नीचे दिए गए लिंक पर क्लिक करें:\n\nhttps://voters.eci.gov.in/home/track`;
            setTimeout(async () => {
              await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi Remenu with 500ms delay
            }, 500);
            break;
          case "hkyo":
            responseMessage = `अपने अधिकारी को जानने के लिए नीचे दिए गए लिंक पर क्लिक करें:\n\nhttps://electoralsearch.eci.gov.in/pollingstation`;
            setTimeout(async () => {
              await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi Remenu with 500ms delay
            }, 500);
            break;
          case "hsvl":
            responseMessage = `मतदाता सूची के लिए नीचे दिए गए लिंक को दबाएं:\n\nhttps://electoralsearch.eci.gov.in/`;
            setTimeout(async () => {
              await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi Remenu with 500ms delay
            }, 500);
            break;
          case "hvh":
            responseMessage = `1950 (Toll-free Number)\ncomplaints@eci.gov.in\nElection Commission Of India,\nनिर्वाचन सदन, अशोक रोड,\n नई दिल्ली 110001`;
            setTimeout(async () => {
              await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi Remenu with 500ms delay
            }, 500);
            break;
        }

        break;

      case "awaitingEpic":
        userState[from].epicNumber = receivedMessage;

        try {
          responseMessage = "Processing your request, please wait...";

          const backendResponse = await axios.post(
            `http://localhost:${PORT}/data`,
            {
              epicNumber: userState[from].epicNumber,
            }
          );
          responseMessage = `You will vote here:\n ${backendResponse.data.pollingLocation}\n ${backendResponse.data.googleMapsLink}`;
        } catch (error) {
          responseMessage =
            "There was an error processing your request. Please try again.";
        }
        setTimeout(async () => {
          await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu
          await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi remenu
        }, 700);
        userState[from].stage = "initial";
        break;

      case "detailEpic":
        userState[from].epicNumber = receivedMessage;

        try {
          responseMessage = "Processing your request, please wait...";

          const backendResponse = await axios.post(
            `http://localhost:${PORT}/data`,
            {
              epicNumber: userState[from].epicNumber,
            }
          );
          responseMessage = `Fullname:\n ${backendResponse.data.Fname}/${backendResponse.data.FnameH}\n Age :  ${backendResponse.data.age}\n Relation: ${backendResponse.data.relation}\n State:${backendResponse.data.state}\n Assembly: ${backendResponse.data.assemblyC} \nPart:${backendResponse.data.Part}\n Part NO: ${backendResponse.data.partNo}`;
        } catch (error) {
          responseMessage =
            "There was an error processing your request. Please try again.";
        }
        setTimeout(async () => {
          await sendMessage("HXe60e0c1ea470efdaf3a1d58a088072cf", from); // Remenu
          await sendMessage("HXfed6619c437e427b0d891835cadf69c4", from); //hindi remenu
        }, 700);
        userState[from].stage = "initial";
        break;

      default:
        responseMessage =
          'Something went wrong. Please send "Hi" to start the conversation again.';
        userState[from].stage = "initial";
        break;
    }

    res.set("Content-Type", "text/xml");

    if (responseMessage) {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: from,
        body: responseMessage,
      });
      res.status(200).send("");
    } else {
      res.status(200).send("");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("");
  }
});

app.post("/data", async (req, res) => {
  try {
    // console.log(req.body);
    const epicNumber = req.body.epicNumber;

    const captchaResponse = await axios({
      method: "get",
      url: "https://gateway-voters.eci.gov.in/api/v1/captcha-service/generateCaptcha",
      responseType: "json",
    });

    const { captcha } = captchaResponse.data;
    const captchaId = captchaResponse.data.id;

    const userAgent = "ElectionChatbot/1.0 (Node.js/14.x)";
    let cookieJar = "cookiesession1=678B2873F1DD2DD8137696AA02376010";

    if (captchaResponse.headers["set-cookie"]) {
      cookieJar = `${cookieJar}; ${
        captchaResponse.headers["set-cookie"][0].split(";")[0]
      }`;
    }

    const base64Data = captcha.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const imagePath = path.join(process.cwd(), "captcha.png");
    await fs.promises.writeFile(imagePath, buffer);

    const captchaSolution = await solveCaptcha(imagePath);

    const response2 = await axios({
      method: "post",
      url: "https://gateway.eci.gov.in/api/v1/elastic/search-by-epic-from-national-display",
      data: {
        captchaData: captchaSolution,
        captchaId: captchaId,
        epicNumber: epicNumber,
        isPortal: true,
        securityKey: "na",
        stateCd: "U05",
      },
      headers: {
        Cookie: cookieJar,
        "Content-Type": "application/json",
        "User-Agent": userAgent,
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      responseType: "json",
    });

    console.log(response2.data);
    Fname = response2.data[0].content.fullName;
    age = response2.data[0].content.age;
    relation = response2.data[0].content.relativeFullName;
    state = response2.data[0].content.stateName;
    district = response2.data[0].content.districtValue;
    assemblyC = response2.data[0].content.asmblyName;
    Part = response2.data[0].content.partName;
    partNo = response2.data[0].content.partSerialNumber;
    FnameH= response2.data[0].content.fullNameL1
    console.log(relation);
    // const name = extractEpic(response2.data)
    const pollingLocation = extractPollingLocation(response2.data).replace(
      /\s+/g,
      " "
    );
    const googleMapsLink = generateGoogleMapsLink(pollingLocation);

    res.json({
      Fname,
      FnameH,
      age,
      relation,
      state,
      district,
      assemblyC,
      Part,
      partNo,
      pollingLocation,
      googleMapsLink,
    });
    console.log("Success");
  } catch (error) {
    console.error("Error fetching or solving captcha:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    res.status(500).send("Error fetching or solving captcha");
  }
});

async function solveCaptcha(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["captcha_solver.py", imagePath]);

    let solution = "";

    pythonProcess.stdout.on("data", (data) => {
      solution += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python script error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}`));
      } else {
        resolve(solution.trim());
      }
    });
  });
}

function extractPollingLocation(data) {
  const result = data[0];
  const pollingStation = result.content.psbuildingName;
  const pollingAddress = result.content.buildingAddress;
  const pollingAssembly = result.content.asmblyName;
  const pollingParliament = result.content.prlmntName;
  return `${pollingStation}, ${pollingAddress}, ${pollingParliament}, ${pollingAssembly}`;
}

function extractEpic(data) {
  const result = data[0];
  const pollingStation = result.content.fullName;
  // const pollingAddress = result.content.buildingAddress;
  // const pollingAssembly = result.content.asmblyName;
  // const pollingParliament = result.content.prlmntName;
  return `${pollingStation}`;
}

function generateGoogleMapsLink(location) {
  const encodedLocation = encodeURIComponent(location);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
