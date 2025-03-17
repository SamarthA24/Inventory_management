"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = exports.makeStore = void 0;
exports.default = StoreProvider;
const react_1 = require("react");
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
const state_1 = __importDefault(require("@/state"));
const api_1 = require("@/state/api");
const query_1 = require("@reduxjs/toolkit/query");
const redux_persist_1 = require("redux-persist");
const react_2 = require("redux-persist/integration/react");
const createWebStorage_1 = __importDefault(require("redux-persist/lib/storage/createWebStorage"));
/* REDUX PERSISTENCE */
const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};
const storage = typeof window === "undefined"
    ? createNoopStorage()
    : (0, createWebStorage_1.default)("local");
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["global"],
};
const rootReducer = (0, toolkit_1.combineReducers)({
    global: state_1.default,
    [api_1.api.reducerPath]: api_1.api.reducer,
});
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, rootReducer);
/* REDUX STORE */
const makeStore = () => {
    return (0, toolkit_1.configureStore)({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [redux_persist_1.FLUSH, redux_persist_1.REHYDRATE, redux_persist_1.PAUSE, redux_persist_1.PERSIST, redux_persist_1.PURGE, redux_persist_1.REGISTER],
            },
        }).concat(api_1.api.middleware),
    });
};
exports.makeStore = makeStore;
const useAppDispatch = () => (0, react_redux_1.useDispatch)();
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;
/* PROVIDER */
function StoreProvider({ children, }) {
    const storeRef = (0, react_1.useRef)();
    if (!storeRef.current) {
        storeRef.current = (0, exports.makeStore)();
        (0, query_1.setupListeners)(storeRef.current.dispatch);
    }
    const persistor = (0, redux_persist_1.persistStore)(storeRef.current);
    return (<react_redux_1.Provider store={storeRef.current}>
      <react_2.PersistGate loading={null} persistor={persistor}>
        {children}
      </react_2.PersistGate>
    </react_redux_1.Provider>);
}
