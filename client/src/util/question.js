const formatChoices = (choices) => {
    const formattedChoices = choices.map((choice, index) => {
        return { id: index + 1, value: choice };
    });
    return formattedChoices;
};

module.exports = { formatChoices };
