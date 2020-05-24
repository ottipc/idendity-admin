import React from 'react';
import ReactDOM from 'react-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export const createNotification = (type, title, message) => {
    console.log("^^^^^^^^^^ CREATING NOTIFICATION TYPE ^^^^^^^^^^^^^^^^^^");
    console.log(type);
        switch (type) {
            case 'info':
                console.log("^^^^^^^^^^ SHOW INFO ^^^^^^^^^^^^^^^^^^");
                NotificationManager.info(message, title, 10000);
                break;
            case "success":
                console.log("^^^^^^^^^^ SHOW SUCCESS ^^^^^^^^^^^^^^^^^^");
                NotificationManager.success(message, title);
                break;
            case 'warning':
                console.log("^^^^^^^^^^ CSOW WARING ^^^^^^^^^^^^^^^^^^");
                NotificationManager.warning(message, title, 10000);
                break;
            case 'error':
                NotificationManager.error(message, title, 10000);
                break;
        }
}
