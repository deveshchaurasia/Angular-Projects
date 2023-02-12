import { Compiler, Component, ComponentRef, Inject, inject, Injector, NgModuleFactory, NgModuleRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddServerComponent } from './add-server/add-server.component';

@Component({
  selector: 'app-dynamic-components',
  templateUrl: './dynamic-components.component.html',
  styleUrls: ['./dynamic-components.component.css']
})
export class DynamicComponentsComponent implements OnInit {

  @ViewChild('dynamicComponent', { read: ViewContainerRef}) _container: ViewContainerRef;
  componentInstance: ComponentRef<any>;
  constructor(private compiler: Compiler, private injector: Injector,@Inject(MAT_DIALOG_DATA) public modalData: any,private modalRef: MatDialogRef<DynamicComponentsComponent>) { }

  ngOnInit(): void {
    this.lazyLoadModule();
  }

  loadModule(m: any): Promise<NgModuleRef<any>>{
    return m.then(elementModuleOrFactory => {
      if (elementModuleOrFactory instanceof NgModuleFactory){
        return elementModuleOrFactory;
      } else{
        return this.compiler.compileModuleAsync(elementModuleOrFactory);
      }
    }).then(modulefactory => modulefactory.create(this.injector))
  }

  async lazyLoadModule(){

    let loadModule;
    let dynamicModuleComponentFactory;
    switch( this.modalData?.componentId ){
      case 'add-server' : {
        loadModule = await this.loadModule(import('src/app/dynamic-components/add-server/add-server.module')
        .then(m => m.AddServerModule));
        dynamicModuleComponentFactory = loadModule.componentFactoryResolver.resolveComponentFactory(AddServerComponent);
        break;
      }
    }
    this.componentInstance = this._container.createComponent(dynamicModuleComponentFactory);
    this.componentInstance.instance.modalData = this.modalData;

    this.componentInstance.instance.closeEventOutput.subscribe((result) => {
      this.modalRef.close(result)
    })
  }

  ngOnDestroy(){
    this.componentInstance.destroy();
  }

}
