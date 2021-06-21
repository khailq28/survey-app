import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { changeStatusForm } from "../../actions";
import socket from "../../socket";

Result.propTypes = {
    status: PropTypes.bool,
    idForm: PropTypes.string,
};

Result.defaultProps = {
    status: null,
    idForm: null,
};

const mapStateToProps = (state) => {
    return {
        status: state.survey.status,
        idForm: state.survey._id,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeStatusForm: () => {
            dispatch(changeStatusForm());
        },
    };
};

function Result(props) {
    var { idForm, status } = props;

    useEffect(() => {
        socket.on("SERVER_SEND_NEW_STATUS", () => {
            props.changeStatusForm();
        });
    }, []);

    let handleSwitch = () => {
        props.changeStatusForm();
        socket.emit("CLIENT_CHANGE_STATUS", {
            idForm,
            value: !props.status,
        });
    };

    return (
        <Container>
            <Box>
                <Header>
                    <Left>0 câu trả lời</Left>
                    <Right>
                        Chấp nhận phản hồi
                        <Switch
                            name="status"
                            color="primary"
                            checked={props.status}
                            onClick={handleSwitch}
                        />
                    </Right>
                </Header>
            </Box>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100vw;
    display: grid;
    padding-top: 70px;
    align-items: center;
    justify-content: center;
`;

const Box = styled.div`
    background-color: white;
    border-radius: 6px;
    padding: 25px 20px;
    text-transform: capitalize;
    width: 750px;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    @media (max-width: 768px) {
        width: 96vw;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Left = styled.div`
    color: black;
    box-sizing: border-box;
    font-size: 26px;
    font-weight: 400;
    line-height: 135%;
`;

const Right = styled.div`
    color: var(--icon-color);
    box-sizing: border-box;
    font-size: 13px;
    line-height: 135%;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Result);
