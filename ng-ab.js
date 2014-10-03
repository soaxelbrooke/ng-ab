/**
 * Created by Stuart on 10/2/14.
 */

angular.module('ngAB', [])
    .value('ABSpec', {})
    .factory('ABInterceptor', [
        'ABSpec',
        function(ABSpec) {
            return {
                response: function(response) {
                    var spec = ABSpec[response.config.url];
                    if (!spec) {
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

                    response.data = Object.keys(spec).reduce(function(data, key) {
                        return spec[key].changes.reduce(applyChange, data);
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