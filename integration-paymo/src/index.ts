import * as functions from 'firebase-functions';
import axios from 'axios';
// import { PubSub } from "@google-cloud/pubsub";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ApprovedHoliday } from './approved-holiday.model';

const PUB_SUB_DATA_EXPORT_TOPIC = 'holidapp-updates';

// For testing locally
// export const generateMessage = functions.https.onRequest(
//   (request, response) => {
//     functions.logger.info("sending...!", { structuredData: true });
//     const topic = new PubSub().topic(PUB_SUB_DATA_EXPORT_TOPIC);
//     const approvedHoliday: ApprovedHoliday = {
//       email: "winand.vandenbergh@lab900.com",
//       dates: [
//         {
//           date: "2023-09-29",
//           duration: 28800,
//         },
//         {
//           date: "2023-09-28",
//           duration: 14400,
//         },
//       ],
//     };
//     topic.publishJSON(approvedHoliday);
//     response.send("Message sent!");
//   },
// );

export const integrationPaymo = functions
  .region('europe-west1')
  .pubsub.topic(PUB_SUB_DATA_EXPORT_TOPIC)
  .onPublish(async (message) => {
    if (message?.data === undefined) {
      functions.logger.error('No message from topic');
      return;
    }
    const approvedHoliday = JSON.parse(Buffer.from(message.data, 'base64').toString()) as ApprovedHoliday;

    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name: 'projects/265978120881/secrets/paymo-api-key/versions/latest',
    });
    if (version?.payload?.data == null) {
      functions.logger.error('No API key found');
      return;
    }

    const apiKey = version.payload.data.toString();
    const baseUrl = 'https://app.paymoapp.com/api/';
    const TASK_CODE = 'ABSENCES-1';

    const config = {
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa(apiKey + ':SOME_RANDOM_TEXT'),
      },
    };

    try {
      const tasks = (await axios.get(baseUrl + 'tasks?where=code=' + TASK_CODE, config))?.data?.tasks;
      const users = (await axios.get(baseUrl + 'users?where=email=' + approvedHoliday.email, config))?.data?.users;

      if (tasks.length > 0 && users.length > 0 && approvedHoliday.dates.length > 0) {
        approvedHoliday.dates.forEach((approvedHolidayDate) => {
          const postData = {
            task_id: tasks[0].id,
            user_id: users[0].id,
            date: approvedHolidayDate.date,
            description: 'Approved holiday request',
            duration: approvedHolidayDate.duration,
          };

          axios
            .post(baseUrl + 'entries', postData, config)
            .then((response) => console.log('New entry ID: ' + response?.data?.entries?.[0]?.id))
            .catch((error) => console.log(error));
        });
      } else {
        functions.logger.info('No tasks, users or dates present');
      }
    } catch (error) {
      functions.logger.error(error);
    }
  });
