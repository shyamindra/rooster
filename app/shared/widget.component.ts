

export class Widget{
    showWidget: boolean = false;
    showAddButtons: boolean = false;
    showPlus: boolean = true;
    navHeader: string;
    titleDescription: string;
    description: string;


    togglePlus(){
        this.showPlus = !this.showPlus;
        this.toggleAddButtons();
    }

    
    toggleAddButtons(){
        this.showAddButtons = !this.showAddButtons;
    }

    showPromotionDiv(){
        this.showPromotion();
        this.togglePlus();
        this.showWidgetDiv();
    }

    showPromotion(){
        this.navHeader = "Post Promotion";
        this.titleDescription = "Enter your Promotion title here";
        this.description = "Describe your Promotion in detail";
    }

    showComplaintDiv(){
        this.showComplaint();
        this.togglePlus();
        this.showWidgetDiv();
    }

    showComplaint(){
        this.navHeader = "Post Complaint";
        this.titleDescription = "Enter your Complaint title here";
        this.description = "Describe your Complaint in detail";
    }

    showWidgetDiv(){
        this.showWidget = true;
    }

    closeWidget(){
        this.showWidget = false;
    }
}