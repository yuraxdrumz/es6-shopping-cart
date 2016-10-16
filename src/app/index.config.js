export function config ($logProvider, toastrConfig) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 1000;
  toastrConfig.positionClass = 'toast-top-right';
  // toastrConfig.progressBar = true;



}
