import { HttpError } from './dataManager';

declare module '@tanStack/react-query' {
    interface Register {
        defaultError: HttpError
    }
}