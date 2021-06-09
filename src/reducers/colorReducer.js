// import * as actionType from "../actions/actionType";
var INITIAL_STATE = [
    {
        interface: "#DB4437",
        background: [
            { color: "#FAE3E1" },
            { color: "#F6D0CD" },
            { color: "#F2BEB9" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#673AB7",
        background: [
            { color: "#F0EBF8" },
            { color: "#E1D8F1" },
            { color: "#D1C4E9" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#3F51B5",
        background: [
            { color: "#ECEEF8" },
            { color: "#D9DCF0" },
            { color: "#C5CBE9" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#4285F4",
        background: [
            { color: "#E3EDFD" },
            { color: "#D0E1FC" },
            { color: "#BDD4FB" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#03A9F4",
        background: [
            { color: "#D9F2FD" },
            { color: "#C0EAFC" },
            { color: "#A7E1FB" },
            { color: "#FFFFFF" },
        ],
    },
    {
        interface: "#00BCD4",
        background: [
            { color: "#D9F5F9" },
            { color: "#BFEEF4" },
            { color: "#A6E8F0" },
            { color: "#FFFFFF" },
        ],
    },
    {
        interface: "#FF5722",
        background: [
            { color: "#FFE6DE" },
            { color: "#FFD5C8" },
            { color: "#FFFFFF" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#FF9800",
        background: [
            { color: "#FFF0D9" },
            { color: "#FFE5BF" },
            { color: "#FFDBA6" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#009688",
        background: [
            { color: "#D9EFED" },
            { color: "#BFE5E1" },
            { color: "#A6DAD5" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#4CAF50",
        background: [
            { color: "#E4F3E5" },
            { color: "#D2EBD3" },
            { color: "#C0E3C2" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#607D8B",
        background: [
            { color: "#E7ECEE" },
            { color: "#D7DFE2" },
            { color: "#ECEDEF" },
            { color: "#F6F6F6" },
        ],
    },
    {
        interface: "#9E9E9E",
        background: [
            { color: "#F0F0F0" },
            { color: "#E7E7E7" },
            { color: "#DDDDDD" },
            { color: "#F6F6F6" },
        ],
    },
];

const colorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return [...state];
    }
};

export default colorReducer;
