// axios
import axios from 'axios';

// const
import Const from '../const/const';

export const triggerNotification = (title, message, token) => {
  axios
    .post(
      'https://fcm.googleapis.com/fcm/send',
      {
        data: {
          title: title,
          image: 'https://firebase.google.com/images/social.png',
          message: message,
          meta: {
            type: 'small',
            info: 'Search',
          },
        },
        to: token,
      },
      {
        headers: {
          Authorization: `key=${Const.SERVER_KEY}`,
        },
      },
    )
    .catch((err) => {
      console.log(err);
    });
};
