export interface NotificationTarget {
  name?: string;
  email: string;
}

export interface BodyRequestNotificationHTML {
  key: string;
  info: NameValue[];
}

export interface BodyRequestNotification {
  /**
   * @description
   * KEY de la notificacion a enviar
   */
  key: string;
  /**
   * @description
   * Array de mails que recibiran la notificacion
   */
  target: NotificationTarget[];
  /**
   * @description
   * Array de informacion que debe considerarse para enviar en el mail
   */
  info: NameValue[];

  entity?: {
    type: string;
    id: string;
  };
  priority?: string;

  rawHTML?: string;
  includeLogoInFooter?: boolean;
}

export interface NameValue {
  name: string;
  value: any;
}

export interface BodyQueue {
  email: string;
  content: string;
  title?: string;
  channelId?: string;
}
