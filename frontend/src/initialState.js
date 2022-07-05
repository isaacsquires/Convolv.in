const initialState = {
    'channelsSwitch': false,
    input: {
        size: [64,64],
        dims: 2,
        channels: 3,
    },
    layers: [
        {
            "k": 4,
            "p": 2,
            "s": 2,
            'sf': 0,
            'channels': 3,
            "type": "conv",
        },
    ],
    error: null
};

export default initialState;