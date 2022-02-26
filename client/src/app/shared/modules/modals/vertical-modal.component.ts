import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from "@angular/core";
import { UtilityService } from "../../service/utility.service";

declare var jQuery: any;

@Component({
    selector: 'vertical-modal',
    templateUrl: 'vertical-modal.component.html'
})
export class VerticalModalComponent {
    @Input() headerContent: string;
    @Input() bodyContent: string;
    @Input() modalId: string;
    @Input() hideCancelInHeader: string;
    @Input() modalOptions: any;
    @Input() checkBoxTexts: any;
    @Input() showSpinner: boolean;
    @ViewChild('modal', { static: true }) modal: ElementRef;
    @Output() modalAction: EventEmitter<any> = new EventEmitter();
    @Output('alertCheckboxAction') checkboxAction: EventEmitter<any> = new EventEmitter();
    @Input() set showModal(value) {
        if (value) {
            this.utilityService.showModal('#' + this.modalId);
            this.modal.nativeElement.focus();
        } else {
            this.utilityService.hideModal('#' + this.modalId);
        }
    }

    constructor(private utilityService: UtilityService) { }

    ok() {
        this.modalAction.emit(true);
    }
    cancel() {
        this.modalAction.emit(false);
    }

    checkboxClick(value) {
        this.checkboxAction.emit(value);
    }

    ngOnDestroy() {
        this.utilityService.unbindEventFromElement('#' + this.modalId);
        this.utilityService.removeTemplate('#' + this.modalId);
    }
}
