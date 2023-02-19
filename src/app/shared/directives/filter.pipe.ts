import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'filter',
    pure:false       // default it is true it tells to reinstantiate Pipe when data changes
})
export class FilterPipe implements PipeTransform{
    transform(value: any, str:string) {
        if(value.length==0){
            return value;
        }
        let arr = [];
        for(let item of value){
            let matchName = item.name;
            if(matchName.includes(str) || (str=='' || str==undefined)){
                arr.push(item);
            }
        }
        return arr;
    }

}