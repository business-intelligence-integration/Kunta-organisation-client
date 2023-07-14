// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrlApi: 'http://kunta-organisation-service.herokuapp.com/',
  // baseUrlApiActivity: 'http://kunta-activities-service.herokuapp.com/'

  //Ancien serveur
  // baseUrlApi: 'http://185.98.139.14:8080/kt-organisation/',
  // baseUrlApiActivity: 'http://185.98.139.14:8080/kt-activities/'

  //nouveau server (sur le quel on effectue le dev)
  // baseUrlApi: 'http://185.98.137.195:8080/kt-organisation/',
  // baseUrlApiActivity: 'http://185.98.137.195:8080/kt-activities/'

  //nouveau server (sur le quel on effectue le dev)
  baseUrlApi: 'http://localhost:8083/',
  baseUrlApiActivity: 'http://localhost:8084/'

  //serveur ngrok
  // baseUrlApi: 'https://df60-154-73-203-132.ngrok-free.app/',
  // baseUrlApiActivity: 'http://localhost:8084/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


