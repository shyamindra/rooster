import {Component,Pipe} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {RoostService} from '../services/roost.service';
import {Roost} from '../shared/roost';

import {SortDatePipe} from '../shared/sort.pipe';

@Component({
    selector: 'recent-activity',
    templateUrl: 'app/shared/rooster.component.html',
    directives: [RouterLink,CORE_DIRECTIVES],
    providers: [RoostService, HTTP_PROVIDERS],
    pipes: [SortDatePipe]
})
export class RecentActivityComponent {
    header = "Recent Activity Page";
    isLoading = true;
    roosts: Roost[];
    diff: number;

    constructor(private _roostService: RoostService, private _router: Router){
        console.log(this.roosts);
    }
    
    ngOnInit(){
        this._roostService.getFeeds()
            .subscribe(feeds => {
                this.isLoading = false;
                this.roosts = feeds;
            });
    }

    redirectToGMaps(latitude: number, longitude: number){
        window.open('http://maps.google.com/maps?q=' + latitude+',' + longitude);
    }
    
    extractDate(date: string) {
        this.diff = (new Date().getTime() - new Date(date).getTime())/1000;
        if(this.diff <= 60)
            return "Just Now";
        else if(this.diff < 3600)
            return Math.round(this.diff/60) + " minutes ago";
        else if(this.diff < 7200)
            return "1 hour ago";
        else if(this.diff <= 86400)
            return Math.round(this.diff/3600) + " hours ago";
        else if(this.diff <= 172800)
            return "1 day ago";
        else if(this.diff > 172800)
            return Math.round(this.diff/86400) + " days ago";
    }

    toggleShout(index: number){
        this._roostService.shout(this.roosts[index].id)
            .subscribe(roosts => {
                this.roosts[index].isShout = true;
                this.roosts[index].shouts = this.roosts[index].shouts + 1;
                if(this.roosts[index].isListened == true){
                    this.roosts[index].isListened = false;
                    this.roosts[index].listeners = this.roosts[index].listeners - 1;
                }
                });;
    }

    toggleListen(index: number){
        this._roostService.listen(this.roosts[index].id)
            .subscribe(roosts => {
                this.roosts[index].isListened = true;
                this.roosts[index].listeners = this.roosts[index].listeners + 1;
                if(this.roosts[index].isShout == true){
                    this.roosts[index].isShout = false;
                    this.roosts[index].shouts = this.roosts[index].shouts - 1;
                }
                });
    }
    
}