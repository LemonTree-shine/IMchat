var defaultData = {

}

export function reducer(state = {}, action){
    switch (action.type) {
        case 'ADD':
            return {...state,...action.data};
        default: 
            return state;
    }
};

export function reducer2(state = {}, action){
    switch (action.type) {
        case 'USER':
            return {...state,...action.data};
        default: 
            return state;
    }
};