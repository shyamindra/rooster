"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var ng2_cache_1 = require('ng2-cache/ng2-cache');
var RoostService = (function () {
    function RoostService(_http, _cacheService) {
        this._http = _http;
        this._cacheService = _cacheService;
        this._url = "http://52.43.46.127:80/api/roost/";
        this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
    }
    RoostService.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', this.accessToken);
    };
    RoostService.prototype.getFeeds = function (page) {
        var url = this._url + "feeds/";
        if (null != page)
            url += "?page=" + page;
        return this._http.get(url)
            .map(function (res) { return res.json(); });
    };
    RoostService.prototype.search = function (key) {
        var myHeader = new http_1.Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "search/" + key + "/", { headers: myHeader })
            .map(function (res) { return res.json(); });
    };
    RoostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_cache_1.CacheService])
    ], RoostService);
    return RoostService;
}());
exports.RoostService = RoostService;
//# sourceMappingURL=roost.service.js.map