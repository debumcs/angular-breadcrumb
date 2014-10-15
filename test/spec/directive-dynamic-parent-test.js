/*jshint undef: false */

describe('Directive with dynamic parent conf', function() {

    var element, scope, controller, compile;

    beforeEach(function() {
        module('ncy-dynamic-parent-conf');
    });

    beforeEach(inject(function($rootScope, $compile, $controller) {
        element = angular.element('<div ncy-breadcrumb></div>');
        compile = $compile(element);
        scope = $rootScope.$new();
        controller = $controller;
    }));

    it('should use the custom breadcrumb\'s parent property referencing a variable of the scope', inject(function() {
        goToState('D.E.H');

        controller('ReturnCCtrl', {'$scope' : scope} );
        compile(scope);
        expect(scope.parentState).toBeDefined();

        scope.$emit('$viewContentLoaded');
        scope.$digest();

        console.info('Directive content : ' + element.text());

        expect(element.text()).toContain('State C');
        expect(element.text()).toContain('State H');
        expect(element.text()).not.toContain('State E');
    }));

    it('should ignore the custom breadcrumb\'s parent property if it is a function returning undefined', inject(function() {
        goToState('D.E.H');

        controller('UndefinedCtrl', {'$scope' : scope} );
        compile(scope);
        expect(scope.parentState).toBeUndefined();

        scope.$emit('$viewContentLoaded');
        scope.$digest();

        console.info('Directive content : ' + element.text());

        expect(element.text()).toContain('State D');
        expect(element.text()).toContain('State E');
        expect(element.text()).toContain('State H');

    }));

});