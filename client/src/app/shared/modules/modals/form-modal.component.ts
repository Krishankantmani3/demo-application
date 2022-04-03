import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UtilityService } from "../../service/utility.service";

declare var jQuery: any;

@Component({
    selector: 'form-modal',
    templateUrl: 'form-modal.component.html'
})
export class FormModalComponent {
    @Input() headerTitle: string;
    @Input() title: string;
    @Input() bodyTitle: string;
    @Input() modalId: string;
    @Input() hideCancelInHeader: string;
    @Input() modalOptions: any;
    @Input() checkBoxTexts: any;
    @Input() showSpinner: boolean;
    @ViewChild('modal', { static: true }) modal: ElementRef;
    @Output() modalAction: EventEmitter<any> = new EventEmitter();
    @Output('alertCheckboxAction') checkboxAction: EventEmitter<any> = new EventEmitter();
    isFormDirty: boolean;
    modalForm: any;
    @Input() set showModal(value) {
        if (value) {
            this.utilityService.showModal('#' + this.modalId);
            this.modal.nativeElement.focus();
        } else {
            this.utilityService.hideModal('#' + this.modalId);
        }
    }

    constructor(private utilityService: UtilityService) { 
        this.createFormGroup();
    }

    private createFormGroup() {
        this.modalForm = new FormGroup({
            headerContent: new FormControl('',Validators.compose([Validators.maxLength(25)])),
            bodyContent: new FormControl('', Validators.compose([Validators.maxLength(60)]))
        });
        this.modalForm.valueChanges.subscribe(data => {
            if (this.modalForm.dirty) {
                this.isFormDirty = true;
            }
        });
    }

    ok() {
        let formDetail = {
            headerContent: this.modalForm.value.headerContent,
            bodyContent: this.modalForm.value.bodyContent
        };
        this.modalAction.emit(formDetail);
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
