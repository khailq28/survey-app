import React from "react";
import styled from "styled-components";
import FormBody from "./FormBody";
import FormTitle from "./FormTitle";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";

QuestionForm.propTypes = {
    handleLoading: PropTypes.func,
    loading: PropTypes.bool,
};

function QuestionForm(props) {
    return (
        <Container>
            {props.loading ? (
                <FormTitle />
            ) : (
                <SkeletonTitle
                    animation="wave"
                    variant="rect"
                    width="750px"
                    height="200px"
                />
            )}

            <Box>
                <FormBody
                    loading={props.loading}
                    handleLoading={props.handleLoading}
                />
            </Box>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    display: grid;
    padding-top: 70px;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    /* margin-bottom: 15px; */

    .add_question {
        background-color: white;
        border-radius: 8px;
        padding: 25px 22px;
        text-transform: capitalize;
        display: flex;
        flex-direction: column;
        /* padding-bottom:10px; */
        padding-top: 0px;
        width: 93%;
        margin-left: 10px;
    }
`;

const SkeletonTitle = styled(Skeleton)`
    border-radius: 6px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
`;

export default QuestionForm;
