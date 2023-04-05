export const getOptionsInitialState = (props) => {
    if (
        props.questionData &&
        props.questionData.options &&
        props.questionData.type !== "true or false"
    ) {
        const options = props.questionData.options;
        const formattedOptions = options.map((option, index) => {
            return { id: index + 1, value: option };
        });

        return formattedOptions;
    } else {
        return [
            {
                id: 1,
                value: "",
            },
        ];
    }
};
