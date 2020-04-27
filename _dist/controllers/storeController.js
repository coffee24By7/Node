var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var mongoose = require('mongoose');
require('../models/Store');
var Store = mongoose.model('Store');
var multer = require('multer');
var jimp = require('jimp');
var uuid = require('uuid');
var multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, next) {
        var isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        }
        else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
};
exports.homePage = function (req, res) {
    res.render('index');
};
exports.addStore = function (req, res) {
    res.render('editStore', { title: 'Add Store' });
};
exports.upload = multer(multerOptions).single('photo');
exports.resize = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var extension, photo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // check if there is no new file to resize
                if (!req.file) {
                    next(); // skip to the next middleware
                    return [2 /*return*/];
                }
                extension = req.file.mimetype.split('/')[1];
                req.body.photo = uuid.v4() + "." + extension;
                return [4 /*yield*/, jimp.read(req.file.buffer)];
            case 1:
                photo = _a.sent();
                return [4 /*yield*/, photo.resize(800, jimp.AUTO)];
            case 2:
                _a.sent();
                return [4 /*yield*/, photo.write("./public/uploads/" + req.body.photo)];
            case 3:
                _a.sent();
                // once we have written the photo to our filesystem, keep going!
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.createStore = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (new Store(req.body)).save()];
            case 1:
                store = _a.sent();
                req.flash('success', "Successfully Created " + store.name + ". Care to leave a review?");
                res.redirect("/store/" + store.slug);
                return [2 /*return*/];
        }
    });
}); };
exports.getStores = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var stores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Store.find()];
            case 1:
                stores = _a.sent();
                res.render('stores', { title: 'Stores', stores: stores });
                return [2 /*return*/];
        }
    });
}); };
exports.editStore = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Store.findOne({ _id: req.params.id })];
            case 1:
                store = _a.sent();
                // 2. confirm they are the owner of the store
                // TODO
                // 3. Render out the edit form so the user can update their store
                res.render('editStore', { title: "Edit " + store.name, store: store });
                return [2 /*return*/];
        }
    });
}); };
exports.updateStore = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // set the location data to be a point
                req.body.location.type = 'Point';
                return [4 /*yield*/, Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
                        new: true,
                        runValidators: true
                    }).exec()];
            case 1:
                store = _a.sent();
                req.flash('success', "Successfully updated <strong>" + store.name + "</strong>. <a href=\"/stores/" + store.slug + "\">View Store \u2192</a>");
                res.redirect("/stores/" + store._id + "/edit");
                return [2 /*return*/];
        }
    });
}); };
exports.getStoreBySlug = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Store.findOne({ slug: req.params.slug })];
            case 1:
                store = _a.sent();
                if (!store)
                    return [2 /*return*/, next()];
                res.render('store', { store: store, title: store.name });
                return [2 /*return*/];
        }
    });
}); };
exports.getStoresByTag = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var tags, tag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Store.getTagsList()];
            case 1:
                tags = _a.sent();
                tag = req.params.tag;
                res.render('tag', { tags: tags, title: 'Tags', tag: tag });
                return [2 /*return*/];
        }
    });
}); };
