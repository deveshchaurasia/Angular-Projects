import { NgModule } from "@angular/core";
import { FilterPipe } from "./filter.pipe";
import { HighlighterDirective } from "./highlighter.directive";
import { ShortenPipe } from "./shortenText.pipe";

@NgModule({
    declarations:[
        FilterPipe,
        HighlighterDirective,
        ShortenPipe
    ],
    exports:[
        FilterPipe,
        HighlighterDirective,
        ShortenPipe
    ]
})
export class DirectiveModules{ }