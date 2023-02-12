import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ISpinnerState {
    show: boolean;
}

@Injectable()
export class SpinnerService{
    spinner$: BehaviorSubject<ISpinnerState> = new BehaviorSubject<ISpinnerState>({ show: false });
    moduleSpinner$: BehaviorSubject<ISpinnerState> = new BehaviorSubject<ISpinnerState>({ show: false });
    
    show(): void{
        this.spinner$.next({ show:true} as ISpinnerState);
    }

    hide():void{
        this.spinner$.next({ show:false} as ISpinnerState);
    }

    moduleLoadShow():void{
        this.moduleSpinner$.next({ show: true } as ISpinnerState);
    }

    moduleLoadHide(): void{
        this.moduleSpinner$.next({ show: false} as ISpinnerState);
    }
}