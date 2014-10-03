# ngAB

AngularJS AB Testing and Multivariate Testing Module

ngAB is an AngularJS module that facilitates AB testing, split testing, and multivariate testing. ngAB intercepts AngularJS templates and edits them according to your specifications using regexp.  This allows you to replace HTML, add different styling, and even augment your scripts.

# Usage

This simple example watches for the `/templates/angular/home.html` file in $http requests.  Upon finding it, ngAB replaces all h1 tags with h4 tags.

```javascript
// Declare ngAB as a dependency
var myModule = angular.module('myModule', ['ngAB']);

// Assign the AB testing spec
module('ngAB').value('spec', {
    '/templates/angular/home.html': {
        'steps': {
            perm: 'vertical',
            changes: [{
                find: '<h1>',
                replace: '<h4>',
                flags: 'g'
            }, {
                find: '</h1>',
                replace: '</h4>',
                flags: 'g'
            }]
        }
    }
});

// That's it!
```

## Changing CSS

If the `find` value is left empty for any change element, the replace value is automatically appended to the template.  This makes it easy to change styling after the fact:

```javascript
module('ngAB').value('spec', {
    '/templates/angular/home.html': {
        'body-text-color': {
            perm: 'red',
            changes: [{
                find: '',
                replace: '<style>body {color: red;}</style>',
                flags: ''
            }]
        }
    }
}
```

## Changing JS

Just like changing CSS, but trickier in implementation. Good luck!  