

declare var jQuery: any;

export class UtilityService{

    showModal(modalId: string) {
        return jQuery(modalId).modal('show');
    }

    hideModal(modalId: string) {
        return jQuery(modalId).modal('hide');
    }
    
    unbindEventFromElement(elementId: string) {
        if (jQuery(elementId)) {
            jQuery(elementId).off();
        }
    }
    
    removeAllTemplates(templateIds: Array<string>) {
        for(let id of templateIds) {
            if (jQuery(id)) {
                jQuery(id).remove();
            }
        }
    }

    removeTemplate(templateSelector: string) {
        return jQuery(templateSelector).remove();
    }
}


