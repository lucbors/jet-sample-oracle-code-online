/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mobe'],
        function (oj, ko, $, app, mobe) {

            function IncidentsViewModel() {
                var self = this;
                self.picture = ko.observable(null);

                self.uploadPicture = function () {
                    //load file as blob, then once loaded add to MCS collection. Use callback for when complete.



                    getBlobFromFile(self.picture())
                            .then(function (arrayBuffer) {
                                mobe.uploadFile("picture.jpg", arrayBuffer, "image/jpeg", self.pictureUploadSuccess);
                            });
                };



                self.pictureUploadSuccess = function (objectid) {
                    console.log(objectid);
                    //showing alert to notify user that upload completed, MCS object id is shown.
                    alert("Picture uploaded to MCS, id is: " + objectid);
                };

                function getBlobFromFile(filepath) {
                    //Use Cordova file plugin API to get the file:
                    //On success, load the file as array buffer
                    var deferred = $.Deferred();
                    alert("get blob");

                    if (window.resolveLocalFileSystemURL && typeof window.resolveLocalFileSystemURL !== "undefined") {
                        window.resolveLocalFileSystemURL(filepath,
                                function (fileEntry) {
                                    //on success use fileEntry handle to read the file, then run callback when onloadend event occurs
                                    fileEntry.file(function (file) {
                                        var reader = new FileReader();
                                        reader.onloadend = function (e) {
                                            deferred.resolve(this.result);
                                        };
                                        reader.onerror = function (e) {
                                            deferred.reject(e);
                                        };
                                        reader.readAsArrayBuffer(file);
                                    });
                                },
                                function (error) {
                                    console.log("Error getting file. Message: ", error);
                                    deferred.reject(error);
                                }
                        );
                    } else {
                        var msg = "The object window.resolveLocalFileSystemURL does not exist. Cannot get file.";
                        console.log(msg);
                        alert(msg);
                        //reject immediately
                        deferred.reject(msg);
                    }
                    return deferred.promise();
                }


                // Header Config
                self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additional available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    document.addEventListener('deviceready', onDeviceReady);
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };


                function onDeviceReady() {
                    // Will execute when device is ready, or immediately if the device is already ready.
                    self.pics = ko.observableArray();
                    self.takePicture = function () {
                        navigator.camera.getPicture(
                                uploadPhoto,
                                function (err) {},
                                {
                                    quality: 50,
                                    destinationType: Camera.DestinationType.FILE_URL,
                                    encodingType: Camera.EncodingType.JPEG
                                }
                        );
                    };

                    function uploadPhoto(imageData) {
                        self.pics.push(imageData);
                        self.picture(imageData);
                        alert("imgdata" + imageData);


                    }
                }

                self.uploadPicture = function () {
                    alert("uploading");
                    //load file as blob, then once loaded add to MCS collection. Use callback for when complete.                    



                    getBlobFromFile(self.picture())
                            .then(function (arrayBuffer) {
                                alert("Really going to upload");
                                mobe.uploadFile("picture.jpg", arrayBuffer, "image/jpeg", self.pictureUploadSuccess);
                            });
                };



                self.pictureUploadSuccess = function (objectid) {
                    console.log(objectid);
                    //showing alert to notify user that upload completed, MCS object id is shown.
                    alert("Picture uploaded to MCS, id is: " + objectid);
                };

                function getBlobFromFile(filepath) {
                    //Use Cordova file plugin API to get the file:
                    //On success, load the file as array buffer
                    var deferred = $.Deferred();
                    alert("get blob");

                    if (window.resolveLocalFileSystemURL && typeof window.resolveLocalFileSystemURL !== "undefined") {
                        window.resolveLocalFileSystemURL(filepath,
                                function (fileEntry) {
                                    //on success use fileEntry handle to read the file, then run callback when onloadend event occurs 
                                    fileEntry.file(function (file) {
                                        var reader = new FileReader();
                                        reader.onloadend = function (e) {
                                            deferred.resolve(this.result);
                                        };
                                        reader.onerror = function (e) {
                                            deferred.reject(e);
                                        };
                                        reader.readAsArrayBuffer(file);
                                    });
                                },
                                function (error) {
                                    console.log("Error getting file. Message: ", error);
                                    alert("Error getting file. Message: ", error);

                                    deferred.reject(error);
                                }
                        );
                    } else {
                        var msg = "The object window.resolveLocalFileSystemURL does not exist. Cannot get file.";
                        console.log(msg);
                        alert(msg);
                        //reject immediately
                        deferred.reject(msg);
                    }
                    return deferred.promise();
                }
                // here -->  //
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new IncidentsViewModel();
        }
);
