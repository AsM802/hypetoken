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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _lib_models_WhaleTrade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/models/WhaleTrade */ \"(rsc)/./lib/models/WhaleTrade.ts\");\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.connectToDB)();\n        const trades = await _lib_models_WhaleTrade__WEBPACK_IMPORTED_MODULE_2__[\"default\"].find().sort({\n            timestamp: -1\n        }).limit(50);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(trades);\n    } catch (error) {\n        console.error('Error fetching whale trades:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch whale trades'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3doYWxlcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQzJDO0FBQ0M7QUFDSztBQUUxQyxlQUFlRztJQUNwQixJQUFJO1FBQ0YsTUFBTUYseURBQVdBO1FBQ2pCLE1BQU1HLFNBQVMsTUFBTSwrREFBb0JDLElBQUksR0FBR0MsSUFBSSxDQUFDO1lBQUVDLFdBQVcsQ0FBQztRQUFFLEdBQUdDLEtBQUssQ0FBQztRQUM5RSxPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDTDtJQUMzQixFQUFFLE9BQU9NLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGdDQUFnQ0E7UUFDOUMsT0FBT1YscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQStCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQ3BGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYWduaXZcXGh5cGV0b2tlblxcYXBwXFxhcGlcXHdoYWxlc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBjb25uZWN0VG9EQiB9IGZyb20gJ0AvbGliL21vbmdvZGInO1xuaW1wb3J0IFdoYWxlVHJhZGUgZnJvbSAnQC9saWIvbW9kZWxzL1doYWxlVHJhZGUnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGF3YWl0IGNvbm5lY3RUb0RCKCk7XG4gICAgY29uc3QgdHJhZGVzID0gYXdhaXQgKFdoYWxlVHJhZGUgYXMgYW55KS5maW5kKCkuc29ydCh7IHRpbWVzdGFtcDogLTEgfSkubGltaXQoNTApO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih0cmFkZXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHdoYWxlIHRyYWRlczonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggd2hhbGUgdHJhZGVzJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY29ubmVjdFRvREIiLCJXaGFsZVRyYWRlIiwiR0VUIiwidHJhZGVzIiwiZmluZCIsInNvcnQiLCJ0aW1lc3RhbXAiLCJsaW1pdCIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/whales/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/models/WhaleTrade.ts":
/*!**********************************!*\
  !*** ./lib/models/WhaleTrade.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst WhaleTradeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    walletAddress: {\n        type: String,\n        required: true,\n        index: true\n    },\n    transactionHash: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    tradeType: {\n        type: String,\n        enum: [\n            'buy',\n            'sell'\n        ],\n        required: true\n    },\n    hypeAmount: {\n        type: Number,\n        required: true\n    },\n    tradeValueUSD: {\n        type: Number,\n        required: true\n    },\n    timestamp: {\n        type: Date,\n        default: Date.now\n    },\n    topAssets: [\n        {\n            assetName: {\n                type: String,\n                required: true\n            },\n            valueUSD: {\n                type: Number,\n                required: true\n            }\n        }\n    ]\n});\nconst WhaleTrade = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.WhaleTrade || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('WhaleTrade', WhaleTradeSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WhaleTrade);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL1doYWxlVHJhZGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQzhEO0FBZTlELE1BQU1HLG1CQUEyQixJQUFJRiw0Q0FBTUEsQ0FBQztJQUMxQ0csZUFBZTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLE9BQU87SUFBSztJQUMzREMsaUJBQWlCO1FBQUVKLE1BQU1DO1FBQVFDLFVBQVU7UUFBTUcsUUFBUTtJQUFLO0lBQzlEQyxXQUFXO1FBQUVOLE1BQU1DO1FBQVFNLE1BQU07WUFBQztZQUFPO1NBQU87UUFBRUwsVUFBVTtJQUFLO0lBQ2pFTSxZQUFZO1FBQUVSLE1BQU1TO1FBQVFQLFVBQVU7SUFBSztJQUMzQ1EsZUFBZTtRQUFFVixNQUFNUztRQUFRUCxVQUFVO0lBQUs7SUFDOUNTLFdBQVc7UUFBRVgsTUFBTVk7UUFBTUMsU0FBU0QsS0FBS0UsR0FBRztJQUFDO0lBQzNDQyxXQUFXO1FBQUM7WUFDVkMsV0FBVztnQkFBRWhCLE1BQU1DO2dCQUFRQyxVQUFVO1lBQUs7WUFDMUNlLFVBQVU7Z0JBQUVqQixNQUFNUztnQkFBUVAsVUFBVTtZQUFLO1FBQzNDO0tBQUU7QUFDSjtBQUVBLE1BQU1nQixhQUFhckIsNENBQU1BLENBQUNxQixVQUFVLElBQUl2QixxREFBYyxDQUFjLGNBQWNHO0FBRWxGLGlFQUFlb0IsVUFBVUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhZ25pdlxcaHlwZXRva2VuXFxsaWJcXG1vZGVsc1xcV2hhbGVUcmFkZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBtb2RlbHMgfSBmcm9tICdtb25nb29zZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdoYWxlVHJhZGUgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIHdhbGxldEFkZHJlc3M6IHN0cmluZztcbiAgdHJhbnNhY3Rpb25IYXNoOiBzdHJpbmc7XG4gIHRyYWRlVHlwZTogJ2J1eScgfCAnc2VsbCc7XG4gIGh5cGVBbW91bnQ6IG51bWJlcjtcbiAgdHJhZGVWYWx1ZVVTRDogbnVtYmVyO1xuICB0aW1lc3RhbXA6IERhdGU7XG4gIHRvcEFzc2V0czoge1xuICAgIGFzc2V0TmFtZTogc3RyaW5nO1xuICAgIHZhbHVlVVNEOiBudW1iZXI7XG4gIH1bXTtcbn1cblxuY29uc3QgV2hhbGVUcmFkZVNjaGVtYTogU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIHdhbGxldEFkZHJlc3M6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgaW5kZXg6IHRydWUgfSxcbiAgdHJhbnNhY3Rpb25IYXNoOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxuICB0cmFkZVR5cGU6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ2J1eScsICdzZWxsJ10sIHJlcXVpcmVkOiB0cnVlIH0sXG4gIGh5cGVBbW91bnQ6IHsgdHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZSB9LFxuICB0cmFkZVZhbHVlVVNEOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdGltZXN0YW1wOiB7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IERhdGUubm93IH0sXG4gIHRvcEFzc2V0czogW3tcbiAgICBhc3NldE5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgIHZhbHVlVVNEOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgfV0sXG59KTtcblxuY29uc3QgV2hhbGVUcmFkZSA9IG1vZGVscy5XaGFsZVRyYWRlIHx8IG1vbmdvb3NlLm1vZGVsPElXaGFsZVRyYWRlPignV2hhbGVUcmFkZScsIFdoYWxlVHJhZGVTY2hlbWEpO1xuXG5leHBvcnQgZGVmYXVsdCBXaGFsZVRyYWRlO1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwibW9kZWxzIiwiV2hhbGVUcmFkZVNjaGVtYSIsIndhbGxldEFkZHJlc3MiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJpbmRleCIsInRyYW5zYWN0aW9uSGFzaCIsInVuaXF1ZSIsInRyYWRlVHlwZSIsImVudW0iLCJoeXBlQW1vdW50IiwiTnVtYmVyIiwidHJhZGVWYWx1ZVVTRCIsInRpbWVzdGFtcCIsIkRhdGUiLCJkZWZhdWx0Iiwibm93IiwidG9wQXNzZXRzIiwiYXNzZXROYW1lIiwidmFsdWVVU0QiLCJXaGFsZVRyYWRlIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/WhaleTrade.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDB: () => (/* binding */ connectToDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nconst connectToDB = async ()=>{\n    if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connections)[0].readyState) return;\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            dbName: 'hypetoken'\n        });\n        console.log('✅ MongoDB connected');\n    } catch (error) {\n        console.error('❌ MongoDB connection error:', error);\n        throw new Error('Database connection failed');\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRXBDLE1BQU1HLGNBQWM7SUFDekIsSUFBSUosNkRBQW9CLENBQUMsRUFBRSxDQUFDTSxVQUFVLEVBQUU7SUFFeEMsSUFBSTtRQUNGLE1BQU1OLHVEQUFnQixDQUFDQyxhQUFhO1lBQ2xDTyxRQUFRO1FBQ1Y7UUFDQUMsUUFBUUMsR0FBRyxDQUFDO0lBQ2QsRUFBRSxPQUFPQyxPQUFPO1FBQ2RGLFFBQVFFLEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYWduaXZcXGh5cGV0b2tlblxcbGliXFxtb25nb2RiLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJITtcclxuXHJcbmV4cG9ydCBjb25zdCBjb25uZWN0VG9EQiA9IGFzeW5jICgpID0+IHtcclxuICBpZiAobW9uZ29vc2UuY29ubmVjdGlvbnNbMF0ucmVhZHlTdGF0ZSkgcmV0dXJuO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwge1xyXG4gICAgICBkYk5hbWU6ICdoeXBldG9rZW4nLFxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZygn4pyFIE1vbmdvREIgY29ubmVjdGVkJyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBNb25nb0RCIGNvbm5lY3Rpb24gZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhYmFzZSBjb25uZWN0aW9uIGZhaWxlZCcpO1xyXG4gIH1cclxufTtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiY29ubmVjdFRvREIiLCJjb25uZWN0aW9ucyIsInJlYWR5U3RhdGUiLCJjb25uZWN0IiwiZGJOYW1lIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5Chypetoken%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5Chypetoken&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5Chypetoken%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5Chypetoken&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_agniv_hypetoken_app_api_whales_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/whales/route.ts */ \"(rsc)/./app/api/whales/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/whales/route\",\n        pathname: \"/api/whales\",\n        filename: \"route\",\n        bundlePath: \"app/api/whales/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\agniv\\\\hypetoken\\\\app\\\\api\\\\whales\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_agniv_hypetoken_app_api_whales_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ3aGFsZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRndoYWxlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRndoYWxlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhZ25pdiU1Q2h5cGV0b2tlbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYWduaXYlNUNoeXBldG9rZW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ087QUFDcEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFnbml2XFxcXGh5cGV0b2tlblxcXFxhcHBcXFxcYXBpXFxcXHdoYWxlc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvd2hhbGVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvd2hhbGVzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS93aGFsZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxhZ25pdlxcXFxoeXBldG9rZW5cXFxcYXBwXFxcXGFwaVxcXFx3aGFsZXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5Chypetoken%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5Chypetoken&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwhales%2Froute&page=%2Fapi%2Fwhales%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwhales%2Froute.ts&appDir=C%3A%5CUsers%5Cagniv%5Chypetoken%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cagniv%5Chypetoken&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();