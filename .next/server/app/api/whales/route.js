/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/whales/route";
exports.ids = ["app/api/whales/route"];
exports.modules = {

/***/ "(rsc)/./app/api/whales/route.ts":
/*!*********************************!*\
  !*** ./app/api/whales/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _lib_models_WhaleTrade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/models/WhaleTrade */ \"(rsc)/./lib/models/WhaleTrade.ts\");\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.connectToDB)();\n        const trades = await _lib_models_WhaleTrade__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find().sort({\n            timestamp: -1\n        }).limit(50);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(trades);\n    } catch (error) {\n        console.error('Error fetching whale trades:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch whale trades'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3doYWxlcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQzJDO0FBQ0M7QUFDSztBQUUxQyxlQUFlRztJQUNwQixJQUFJO1FBQ0YsTUFBTUYseURBQVdBO1FBQ2pCLE1BQU1HLFNBQVMsTUFBTSwrREFBb0JDLElBQUksR0FBR0MsSUFBSSxDQUFDO1lBQUVDLFdBQVcsQ0FBQztRQUFFLEdBQUdDLEtBQUssQ0FBQztRQUM5RSxPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDTDtJQUMzQixFQUFFLE9BQU9NLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGdDQUFnQ0E7UUFDOUMsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQStCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQ3BGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYWduaXZcXERvd25sb2Fkc1xcaHlwZXRva2VuLW1haW5cXGFwcFxcYXBpXFx3aGFsZXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgY29ubmVjdFRvREIgfSBmcm9tICdAL2xpYi9tb25nb2RiJztcbmltcG9ydCBXaGFsZVRyYWRlIGZyb20gJ0AvbGliL21vZGVscy9XaGFsZVRyYWRlJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBjb25uZWN0VG9EQigpO1xuICAgIGNvbnN0IHRyYWRlcyA9IGF3YWl0IChXaGFsZVRyYWRlIGFzIGFueSkuZmluZCgpLnNvcnQoeyB0aW1lc3RhbXA6IC0xIH0pLmxpbWl0KDUwKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odHJhZGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB3aGFsZSB0cmFkZXM6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHdoYWxlIHRyYWRlcycgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNvbm5lY3RUb0RCIiwiV2hhbGVUcmFkZSIsIkdFVCIsInRyYWRlcyIsImZpbmQiLCJzb3J0IiwidGltZXN0YW1wIiwibGltaXQiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/whales/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/models/WhaleTrade.ts":
/*!**********************************!*\
  !*** ./lib/models/WhaleTrade.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst WhaleTradeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    walletAddress: {\n        type: String,\n        required: true,\n        index: true\n    },\n    transactionHash: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    tradeType: {\n        type: String,\n        enum: [\n            'buy',\n            'sell'\n        ],\n        required: true\n    },\n    hypeAmount: {\n        type: Number,\n        required: true\n    },\n    tradeValueUSD: {\n        type: Number,\n        required: true\n    },\n    timestamp: {\n        type: Date,\n        default: Date.now\n    },\n    topAssets: [\n        {\n            assetName: {\n                type: String,\n                required: true\n            },\n            valueUSD: {\n                type: Number,\n                required: true\n            }\n        }\n    ]\n});\nconst WhaleTrade = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.WhaleTrade || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('WhaleTrade', WhaleTradeSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WhaleTrade);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL1doYWxlVHJhZGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQzhEO0FBZTlELE1BQU1HLG1CQUEyQixJQUFJRiw0Q0FBTUEsQ0FBQztJQUMxQ0csZUFBZTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLE9BQU87SUFBSztJQUMzREMsaUJBQWlCO1FBQUVKLE1BQU1DO1FBQVFDLFVBQVU7UUFBTUcsUUFBUTtJQUFLO0lBQzlEQyxXQUFXO1FBQUVOLE1BQU1DO1FBQVFNLE1BQU07WUFBQztZQUFPO1NBQU87UUFBRUwsVUFBVTtJQUFLO0lBQ2pFTSxZQUFZO1FBQUVSLE1BQU1TO1FBQVFQLFVBQVU7SUFBSztJQUMzQ1EsZUFBZTtRQUFFVixNQUFNUztRQUFRUCxVQUFVO0lBQUs7SUFDOUNTLFdBQVc7UUFBRVgsTUFBTVk7UUFBTUMsU0FBU0QsS0FBS0UsR0FBRztJQUFDO0lBQzNDQyxXQUFXO1FBQUM7WUFDVkMsV0FBVztnQkFBRWhCLE1BQU1DO2dCQUFRQyxVQUFVO1lBQUs7WUFDMUNlLFVBQVU7Z0JBQUVqQixNQUFNUztnQkFBUVAsVUFBVTtZQUFLO1FBQzNDO0tBQUU7QUFDSjtBQUVBLE1BQU1nQixhQUFhckIsNENBQU1BLENBQUNxQixVQUFVLElBQUl2QixxREFBYyxDQUFjLGNBQWNHO0FBRWxGLGlFQUFlb0IsVUFBVUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhZ25pdlxcRG93bmxvYWRzXFxoeXBldG9rZW4tbWFpblxcbGliXFxtb2RlbHNcXFdoYWxlVHJhZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgbW9kZWxzIH0gZnJvbSAnbW9uZ29vc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElXaGFsZVRyYWRlIGV4dGVuZHMgRG9jdW1lbnQge1xuICB3YWxsZXRBZGRyZXNzOiBzdHJpbmc7XG4gIHRyYW5zYWN0aW9uSGFzaDogc3RyaW5nO1xuICB0cmFkZVR5cGU6ICdidXknIHwgJ3NlbGwnO1xuICBoeXBlQW1vdW50OiBudW1iZXI7XG4gIHRyYWRlVmFsdWVVU0Q6IG51bWJlcjtcbiAgdGltZXN0YW1wOiBEYXRlO1xuICB0b3BBc3NldHM6IHtcbiAgICBhc3NldE5hbWU6IHN0cmluZztcbiAgICB2YWx1ZVVTRDogbnVtYmVyO1xuICB9W107XG59XG5cbmNvbnN0IFdoYWxlVHJhZGVTY2hlbWE6IFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICB3YWxsZXRBZGRyZXNzOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIGluZGV4OiB0cnVlIH0sXG4gIHRyYW5zYWN0aW9uSGFzaDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcbiAgdHJhZGVUeXBlOiB7IHR5cGU6IFN0cmluZywgZW51bTogWydidXknLCAnc2VsbCddLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBoeXBlQW1vdW50OiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdHJhZGVWYWx1ZVVTRDogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHRpbWVzdGFtcDogeyB0eXBlOiBEYXRlLCBkZWZhdWx0OiBEYXRlLm5vdyB9LFxuICB0b3BBc3NldHM6IFt7XG4gICAgYXNzZXROYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICB2YWx1ZVVTRDogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIH1dLFxufSk7XG5cbmNvbnN0IFdoYWxlVHJhZGUgPSBtb2RlbHMuV2hhbGVUcmFkZSB8fCBtb25nb29zZS5tb2RlbDxJV2hhbGVUcmFkZT4oJ1doYWxlVHJhZGUnLCBXaGFsZVRyYWRlU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgV2hhbGVUcmFkZTtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsIm1vZGVscyIsIldoYWxlVHJhZGVTY2hlbWEiLCJ3YWxsZXRBZGRyZXNzIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwiaW5kZXgiLCJ0cmFuc2FjdGlvbkhhc2giLCJ1bmlxdWUiLCJ0cmFkZVR5cGUiLCJlbnVtIiwiaHlwZUFtb3VudCIsIk51bWJlciIsInRyYWRlVmFsdWVVU0QiLCJ0aW1lc3RhbXAiLCJEYXRlIiwiZGVmYXVsdCIsIm5vdyIsInRvcEFzc2V0cyIsImFzc2V0TmFtZSIsInZhbHVlVVNEIiwiV2hhbGVUcmFkZSIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/WhaleTrade.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDB: () => (/* binding */ connectToDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nconst connectToDB = async ()=>{\n    if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections)[0].readyState) return;\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            dbName: 'hypetoken'\n        });\n        console.log('✅ MongoDB connected');\n    } catch (error) {\n        console.error('❌ MongoDB connection error:', error);\n        throw new Error('Database connection failed');\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRXBDLE1BQU1HLGNBQWM7SUFDekIsSUFBSUosNkRBQW9CLENBQUMsRUFBRSxDQUFDTSxVQUFVLEVBQUU7SUFFeEMsSUFBSTtRQUNGLE1BQU1OLHVEQUFnQixDQUFDQyxhQUFhO1lBQ2xDTyxRQUFRO1FBQ1Y7UUFDQUMsUUFBUUMsR0FBRyxDQUFDO0lBQ2QsRUFBRSxPQUFPQyxPQUFPO1FBQ2RGLFFBQVFFLEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYWduaXZcXERvd25sb2Fkc1xcaHlwZXRva2VuLW1haW5cXGxpYlxcbW9uZ29kYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJITtcblxuZXhwb3J0IGNvbnN0IGNvbm5lY3RUb0RCID0gYXN5bmMgKCkgPT4ge1xuICBpZiAobW9uZ29vc2UuY29ubmVjdGlvbnNbMF0ucmVhZHlTdGF0ZSkgcmV0dXJuO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwge1xuICAgICAgZGJOYW1lOiAnaHlwZXRva2VuJyxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZygn4pyFIE1vbmdvREIgY29ubmVjdGVkJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcign4p2MIE1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhYmFzZSBjb25uZWN0aW9uIGZhaWxlZCcpO1xuICB9XG59O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiY29ubmVjdFRvREIiLCJjb25uZWN0aW9ucyIsInJlYWR5U3RhdGUiLCJjb25uZWN0IiwiZGJOYW1lIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_agniv_Downloads_hypetoken_main_app_api_whales_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/whales/route.ts */ \"(rsc)/./app/api/whales/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/whales/route\",\n        pathname: \"/api/whales\",\n        filename: \"route\",\n        bundlePath: \"app/api/whales/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\agniv\\\\Downloads\\\\hypetoken-main\\\\app\\\\api\\\\whales\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_agniv_Downloads_hypetoken_main_app_api_whales_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ3aGFsZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRndoYWxlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRndoYWxlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhZ25pdiU1Q0Rvd25sb2FkcyU1Q2h5cGV0b2tlbi1tYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNhZ25pdiU1Q0Rvd25sb2FkcyU1Q2h5cGV0b2tlbi1tYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN1QjtBQUNwRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYWduaXZcXFxcRG93bmxvYWRzXFxcXGh5cGV0b2tlbi1tYWluXFxcXGFwcFxcXFxhcGlcXFxcd2hhbGVzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS93aGFsZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS93aGFsZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3doYWxlcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFnbml2XFxcXERvd25sb2Fkc1xcXFxoeXBldG9rZW4tbWFpblxcXFxhcHBcXFxcYXBpXFxcXHdoYWxlc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5CDownloads%5Chypetoken-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();