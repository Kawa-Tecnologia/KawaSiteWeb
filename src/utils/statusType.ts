export enum BackendStatus {
    PAID = 'PAID',
    REQUESTED = 'REQUESTED',
    CANCELED = 'CANCELED',
    APPROVED = 'APPROVED'
}

export enum FrontendStatus {
    PAGO = 'PAGO',
    SOLICITADO = 'SOLICITADO',
    CANCELADO = 'CANCELADO',
    APROVADO = 'APROVADO'
}

export const mapBackendToFrontendStatus = (backendStatus: BackendStatus): FrontendStatus => {
    switch (backendStatus) {
        case BackendStatus.PAID:
            return FrontendStatus.PAGO;
        case BackendStatus.REQUESTED:
            return FrontendStatus.SOLICITADO;
        case BackendStatus.CANCELED:
            return FrontendStatus.CANCELADO;
        case BackendStatus.APPROVED:
            return FrontendStatus.APROVADO;
        default:
            return FrontendStatus.SOLICITADO;
    }
};