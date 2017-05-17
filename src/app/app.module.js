"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var angular_calendar_1 = require("angular-calendar");
var module_1 = require("./modules/module");
var app_component_1 = require("./app.component");
var logger_service_1 = require("./services/logger.service");
var dashboard_container_1 = require("./containers/dashboard.container");
var timecard_container_1 = require("./containers/timecard.container");
var store_1 = require("./shared/store");
var api_service_1 = require("./services/api.service");
var inmemory_api_service_1 = require("./services/inmemory-api.service");
var store_helper_service_1 = require("./services/store-helper.service");
var timecard_service_1 = require("./services/timecard.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(inmemory_api_service_1.InMemoryApiService),
            angular_calendar_1.CalendarModule.forRoot(),
            module_1.StrathDemoModule,
            router_1.RouterModule.forRoot([
                {
                    path: '',
                    component: dashboard_container_1.DashboardContainer,
                },
                { path: '**', redirectTo: '' }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_container_1.DashboardContainer,
            timecard_container_1.TimecardContainer
        ],
        providers: [
            logger_service_1.Logger,
            api_service_1.ApiService,
            store_helper_service_1.StoreHelperService,
            timecard_service_1.TimecardService,
            store_1.Store
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map