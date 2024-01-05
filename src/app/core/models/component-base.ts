import { FormGroup } from '@angular/forms';
import { ModalComponent } from 'lib-vox-ui';

export abstract class ComponentBase {
    public modalOpened: ModalComponent;

    constructor() {}

    /**
     * ModalRef é para chamar estando o modal no mesmo component
     * modalName é para chamar estando o modal noutro component
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

    public isFieldValid(form: FormGroup, field: string): boolean {
        return !form.get(field).valid && form.get(field).dirty;
    }
}
