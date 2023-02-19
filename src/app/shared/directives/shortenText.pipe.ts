import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'shortenText'
})
export class ShortenPipe implements PipeTransform{
    name: string;
    pure?: boolean;
    standalone?: boolean;

    transform(value:any, limit:number){
        if(value.length > limit){
            return value.substring(0,limit)+' ...';
        }
        return value;
    }
}