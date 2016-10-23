export function config ($logProvider, toastrConfig) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 2000;
  toastrConfig.positionClass = 'toast-top-right';
  //toastrConfig.preventOpenDuplicates = true;
  toastrConfig.newestOnTop = true;
  // toastrConfig.progressBar = true;
}
