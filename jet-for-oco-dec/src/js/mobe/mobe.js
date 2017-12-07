define(['jquery', 'mcs'], function ($, mcs) {
  
    var mcs_config = {
    "logLevel": mcs.LOG_LEVEL.INFO,
    "logHTTP": true,
    "mobileBackends": {
        "OCO_DEC2017_MB": {
            "default": true,
            "baseUrl": "https://epromcs-nleproseedtrialmcs1117.mobileenv.us2.oraclecloud.com:443",
            "applicationKey": "4285b548-29df-4c34-bbd7-8578cecf030f",
            "authorization": {
                "basicAuth": {
                    "backendId": "c6ba078f-b8e4-431f-af4e-07523d114c83",
                    "anonymousToken": "TkxFUFJPU0VFRFRSSUFMTUNTMTExN19FUFJPTUNTX01PQklMRV9BTk9OWU1PVVNfQVBQSUQ6Y01yem5zcWFfOWIwZ2s="
                }
            }
        }
    }
};


    function MobileBackend() {
        var self = this;
        self.mobileBackend;
        //Here we declare our COLLECTION_NAME
        var COLLECTION_NAME = "OCO_IMAGES";

        function init() {
            mcs.MobileBackendManager.setConfig(mcs_config);
            //MCS backend name for example is JETSample.
            self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('OCO_DEC2017_MB');
            self.mobileBackend.setAuthenticationType("basicAuth");
        }



        //This handles success and failure callbacks using parameters (unlike the authAnonymous example)
        self.authenticate = function (username, password, successCallback, failureCallback) {
            self.mobileBackend.Authorization.authenticate(username, password, successCallback, failureCallback);
        };

        //this handles success and failure callbacks using parameters
        self.logout = function (successCallback, failureCallback) {
            self.mobileBackend.Authorization.logout();
        };



        function uploadTextFile(filename, payload, mimetype) {

            return getCollection()
                    .then(success);

            function success(collection) {
                var obj = new mcs.StorageObject(collection);
                obj.setDisplayName(filename);
                obj.loadPayload(payload, mimetype);

                return postObject(collection, obj).then(function (object) {
                    return readObject(collection, object.id);
                });
            }
        }

        function getCollection() {
            //return a storage collection with the name assigned to the collection_id variable.
            return self.mobileBackend
                    .storage
                    .getCollection(COLLECTION_NAME, null)
                    .then(onGetCollectionSuccess)
                    .catch(onGetCollectionFailed);

            function onGetCollectionSuccess(collection) {
                console.log('onGetCollectionSuccess:', collection);
                return collection;
            }

            function onGetCollectionFailed(response) {
                console.log('onGetCollectionFailed:', response);
                return response.statusCode;
            }
        }

        function postObject(collection, obj) {
            return collection
                    .postObject(obj)
                    .then(onPostObjectSuccess)
                    .catch(onPostObjectFailed);

            function onPostObjectSuccess(object) {
                console.log('onPostObjectSuccess:', object);
                return object;
            }

            function onPostObjectFailed(response) {
                console.log('onPostObjectFailed:', response);
                return response.statusCode;
            }
        }

        self.uploadFile = function (filename, payload, mimetype, callback) {
            uploadTextFile(filename, payload, mimetype);

        };

        init();
    }

    return new MobileBackend();
});