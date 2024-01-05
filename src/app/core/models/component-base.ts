import { ModalComponent } from 'lib-vox-ui';
import { ActionsTableInterface } from 'lib-vox-ui/lib/core';

export abstract class ComponentBase {
    public modalOpened: ModalComponent;

    constructor() {}

    /**
     * ModalRef é para chamar estando o modal no mesmo component (ts -> html / html -> html)
     * modalName é para chamar estando o modal vindo de outro component (ts -> ts)
     */
    public openModal = ({ modalRef, modalName }: { modalRef?: ModalComponent; modalName?: string }): void => {
        const modal = this[modalName] as ModalComponent;
        if (modalName && modal) {
            modal.openModal();
            return;
        }

        modalRef?.openModal();
    };

    public closeModal = (): void => {
        this.modalOpened.close();
    };

    /**
     * Para ações em tabela da lib-vox-ui
     * @param event
     */
    public actionsOnTable = (event: ActionsTableInterface): void => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this[event.action](event.value);
    };
}
