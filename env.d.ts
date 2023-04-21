/// <reference types="vite/client" />
export interface Params {
    floors: number[],
    floorHeight: number,
    speed: number,
}

export interface State {
    showParamsModal: boolean,
    params: Params
    elCurrentFloor: number | undefined,
    destinationFloors: number[],
}