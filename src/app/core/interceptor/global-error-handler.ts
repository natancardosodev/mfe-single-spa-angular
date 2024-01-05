import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        const scriptJSFailed =
            'Failed to load module script: Expected a JavaScript module script but the server responded with a ' +
            'MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.';

        if (chunkFailedMessage.test(error.message) || scriptJSFailed.includes(error.message)) {
            window.location.reload();
        }
    }
}
