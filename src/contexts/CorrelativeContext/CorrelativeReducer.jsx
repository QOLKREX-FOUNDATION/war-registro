
export const CorrelativeReducer = (state, action) => {
    switch (action.type) {
        case '[Correlative] - Set Id Correlative':
            return {
                ...state,
                idCorrelative: action.payload,
            };


        default:
            return state;
    }
}