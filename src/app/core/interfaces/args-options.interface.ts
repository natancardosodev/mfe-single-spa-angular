export interface ArgsOptions {
    show?: boolean;
    title?: string;
    message?: string | HTMLElement;
    messagesMultiple?: Array<MessagesMultipleInterface>;
    style?: string;
    callBack?: () => void;
    size?: string;
    backdrop?: string;
    isBtnClose?: boolean;
    timeOut?: number;
}

export interface MessagesMultipleInterface {
    style?: string;
    message: string;
}
