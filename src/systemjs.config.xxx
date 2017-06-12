/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',   
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      
      // other libraries
      'angular-calendar': 'npm:angular-calendar/dist/umd/angular-calendar.js',
      'calendar-utils': 'npm:calendar-utils/dist/umd/calendarUtils.js',
      'angular-resizable-element': 'npm:angular-resizable-element/dist/umd/angular-resizable-element.js',
      'angular-draggable-droppable': 'npm:angular-draggable-droppable/dist/umd/angular-draggable-droppable.js',
      'date-fns': 'npm:date-fns',

      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
      //'ngx-contextmenu': 'npm:ngx-contextmenu@1.1.0',
      'rxjs': 'npm:rxjs',
      'rrule': 'npm:rrule@2.2.0',

      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      
      'ng2-adal': 'npm:ng2-adal',
      'adal': 'npm:adal-angular/lib',
      'adal-angular': 'npm:adal-angular/lib'
    },

    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      'ng2-adal': { main: 'core.js', defaultExtension: 'js' },
      'adal-angular': {main: 'adal-angular', defaultExtension: 'js'},
      'adal': { main: 'adal.js', defaultExtension: 'js' },
      rxjs: {
        defaultExtension: 'js'
      },
      'date-fns': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
