import {configureStore} from '@redux/toolkit';
import tareasReducer from '.slices/tareasSlice';

export const store= configureStore({
    reducer: {
        tareas: tareasReducer
    }
})