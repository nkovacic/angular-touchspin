import * as angular from 'angular';

export interface IDirectiveES6 {
    controller: string | ng.Injectable<ng.IControllerConstructor>;
}

export interface IAngularES6Module {
    name: string;
    constant(name: string, value: any): IAngularES6Module;
    config(configFn: Function): IAngularES6Module;
    directive(name: string, constructorFn: any): IAngularES6Module;
    controller(name: string, constructorFn: any): IAngularES6Module;
    filter(name: string, filterConstructorFn: any): IAngularES6Module;
    service(name: string, constructorFn: any): IAngularES6Module;
    provider(name: string, constructorFn: any): IAngularES6Module;
    run(initializationFunction: Function): IAngularES6Module;
    factory(name: string, constructorFn: any): IAngularES6Module;
    //createFactory(name: string, constructorFn: any): any;
}

export class AngularES6 implements IAngularES6Module {
    private angularModule: angular.IModule
    public name: string

    constructor(moduleName: string, dependancies?: Array<string>) {
        dependancies = dependancies || [];

        this.name = moduleName;
        this.angularModule = angular.module(moduleName, dependancies);
    }

    static module(moduleName: string, dependancies?: Array<string>) {
        dependancies = dependancies || [];

        return new AngularES6(moduleName, dependancies);
    }

    constant(name: string, value: any) {
        this.angularModule.constant(name, value);

        return this;
    }
    config(configFn: Function) {
        this.angularModule.config(configFn);

        return this;
    }
    controller(name: string, constructorFn: any) {
        this.angularModule.controller(name, constructorFn);

        return this;
    }
    directive(name: string, constructorFn: any) {
        let normalizedConstructorFn = this.normalizeConstructor(constructorFn);

        if (!normalizedConstructorFn.prototype.compile) {
            // create an empty compile function if none was defined.
            normalizedConstructorFn.prototype.compile = () => { };
        }

        var originalCompileFn = this.cloneFunction(normalizedConstructorFn.prototype.compile);

        // Decorate the compile method to automatically return the link method (if it exists)
        // and bind it to the context of the constructor (so `this` works correctly).
        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
        // returns `this.link` from within the compile function.
        this.override(normalizedConstructorFn.prototype, 'compile', function () {
            return function () {
                originalCompileFn.apply(this, arguments);

                if (normalizedConstructorFn.prototype.link) {
                    return normalizedConstructorFn.prototype.link.bind(this);
                }
            };
        });

        var factoryArray = this.createFactoryArray(constructorFn);

        this.angularModule.directive(name, factoryArray);

        return this;
    }
    factory(name: string, constructorFn: any) {
        constructorFn = this.normalizeConstructor(constructorFn);

        let factoryArray = this.createFactoryArray(constructorFn);

        this.angularModule.factory(name, factoryArray);

        return this;
    }
    filter(name: string, constructorFn: any) {
        //filterConstructorFn = this.normalizeConstructor(filterConstructorFn);

        let filterArray = this.createFilterArray(constructorFn);

        this.angularModule.filter(name, filterArray);

        return this;
    }
    service(name: string, constructorFn: any) {
        this.angularModule.service(name, constructorFn);

        return this;
    }
    provider(name: string, constructorFn: any) {
        this.angularModule.provider(name, constructorFn);

        return this;
    }
    run(initializationFunction: Function) {
        this.angularModule.run(initializationFunction);

        return this;
    }

    private normalizeConstructor(inputConstructorFn: any): any {
        let constructorFn;

        if (angular.isArray(inputConstructorFn.constructor)) {
            let injected = inputConstructorFn.slice(0, inputConstructorFn.length - 1);

            constructorFn = inputConstructorFn[inputConstructorFn.length - 1];
            constructorFn.$inject = injected;
        } else {
            constructorFn = inputConstructorFn;
        }

        return constructorFn;
    }

    /**
     * Convert a constructor function into a factory function which returns a new instance of that
     * constructor, with the correct dependencies automatically injected as arguments.
     *
     * In order to inject the dependencies, they must be attached to the constructor function with the
     * `$inject` property annotation.
     *
     * @param constructorFn
     * @returns {Array.<T>}
     * @private
     */
    private createFactoryArray(constructorFn: any): any {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        let args = constructorFn.$inject || [],
            factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push((...args) => {
            //return new constructorFn(...args);
            let instance = new constructorFn(...args);

            /*
            for (var key in instance) {
                instance[key] = instance[key];
            }*/

            return instance;
        });

        return factoryArray;
    }

    private createFilterArray(constructorFn: any): any {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        let args = constructorFn.$inject || [],
            filterArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        filterArray.push((...args) => {
            //return new constructorFn(...args);
            let instance = new constructorFn(...args);

            return instance.filter;
        });

        return filterArray;
    }

    /**
     * Clone a function
     * @param original
     * @returns {Function}
     */
    private cloneFunction(original: any): any {
        return function () {
            return original.apply(this, arguments);
        };
    }

    /**
     * Override an object's method with a new one specified by `callback`.
     * @param object
     * @param methodName
     * @param callback
     */
    private override(object: Object, methodName: string, callback: Function) {
        object[methodName] = callback(object[methodName])
    }

}