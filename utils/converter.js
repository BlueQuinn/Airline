/**
 * Created by lequan on 10/20/2016.
 */

var converter = module.exports();
converter.copy = function (model, object) {
    for (var prop in object)
        model[prop] = object[prop];
    return model;
}
