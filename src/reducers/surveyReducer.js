var INITIAL_STATE = {
    id: "",
    title: "",
    description: "",
    questions: [
        {
            questionText: "asdf?",
            questionType: "radio",
            options: [
                { optionText: "a" },
                { optionText: "b" },
                { optionText: "c" },
            ],
            open: true,
            required: false,
        },
    ],
};

const surveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return { ...state };
    }
};

export default surveyReducer;
