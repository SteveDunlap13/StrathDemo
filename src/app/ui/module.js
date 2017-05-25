"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_calendar_1 = require("angular-calendar");
var calendar_header_component_1 = require("./calendar-header/calendar-header.component");
var header_component_1 = require("./header/header.component");
var StrathDemoModule = (function () {
    function StrathDemoModule() {
    }
    return StrathDemoModule;
}());
StrathDemoModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            angular_calendar_1.CalendarModule
        ],
        declarations: [
            calendar_header_component_1.CalendarHeaderComponent,
            header_component_1.HeaderComponent
        ],
        exports: [
            calendar_header_component_1.CalendarHeaderComponent,
            header_component_1.HeaderComponent
        ]
    })
], StrathDemoModule);
exports.StrathDemoModule = StrathDemoModule;
//# sourceMappingURL=module.js.map