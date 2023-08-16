import { configureStore } from "@reduxjs/toolkit";
import { clientSliceReducer } from "./SLICE/userReducer";
import adminSliceReducer from "./SLICE/adminReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfigUser = { key: "user", storage, version: 1 };
const persistConfigAdmin = { key: "admin", storage, version: 1 };

const userPersistedReducer = persistReducer(persistConfigUser, clientSliceReducer.reducer);
const adminPersistConfigAdmin = persistReducer(persistConfigAdmin, adminSliceReducer.reducer);

export const store = configureStore({
    reducer: {
        userSlice: userPersistedReducer,
        adminSlice: adminPersistConfigAdmin,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
