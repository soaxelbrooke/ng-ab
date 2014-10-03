/**
 * Created by Stuart on 10/2/14.
 */

angular.module('ngAB', [])
    .value('spec', {})
    .factory('ABInterceptor', [
                'spec',
        function(spec) {
            return {
                response: function(response) {
                    var fileSpec = spec[response.config.url];
                    if (!fileSpec) {
                        // No test spec for this path
                        return response;
                    }

                    function applyChange(data, change) {
                        if (!change.find) {
                            return data + change.replace;
                        } else {
                            return data.replace(new RegExp(change.find,
                                change.flags), change.replace);
                        }
                    }

                    response.data = Object.keys(fileSpec).reduce(function(data, key) {
                        return fileSpec[key].changes.reduce(applyChange, data);
                    }, response.data);

                    return response;
                }
            }
        }
    ]).config([
        '$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push('ABInterceptor');
        }
    ]);