import { ModalComponent } from 'lib-vox-ui';

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
}
