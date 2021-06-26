import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Chart from "./Chart";

ChartList.propTypes = {
    questions: PropTypes.array,
};

ChartList.defaultProps = { questions: [] };

const mapStateToProps = (state) => {
    return { questions: state.survey.questions };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function ChartList(props) {
    var { questions } = props;

    return (
        <div style={{ marginBottom: "30px" }}>
            {questions.map((question, index) => (
                <Chart key={index} question={question} index={index} />
            ))}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartList);
