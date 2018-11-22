import alt from "../altInstance";

var normalize = (notification, level) => {
    if(typeof notification == "string")
        notification = {message: notification};
    if(level)
        notification.level = level;
    return notification;
};

class NotificationActions {
    addNotification(notification) {
        notification = normalize(notification);
        return notification;
    }
    success(notification) {
        notification = normalize(notification, "success");
        return notification;
    }
    error(notification) {
        notification = normalize(notification, "error");
        return notification;
    }
    warning(notification) {
        notification = normalize(notification, "warning");
        return notification;
    }
    info(notification) {
        notification = normalize(notification, "info");
        return notification;
    }
}

export default alt.createActions(NotificationActions);