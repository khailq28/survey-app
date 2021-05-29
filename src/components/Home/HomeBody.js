import React from "react";
import styled from "styled-components";
import PostAddIcon from "@material-ui/icons/PostAdd";
import StorageIcon from "@material-ui/icons/Storage";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import { IconButton } from "@material-ui/core";
import uuid from "react-uuid";
import { useHistory } from "react-router-dom";
import FormRecent from "./FormRecent";
import { connect } from "react-redux";
import { createNewForm, setStatusDialog } from "../../actions";
import PropTypes from "prop-types";

HomeBody.propTypes = {
    createNewForm: PropTypes.func,
    setStatusDialog: PropTypes.func,
    user: PropTypes.object,
    listSurvey: PropTypes.array,
};

HomeBody.defaultProps = {
    createNewForm: null,
    setStatusDialog: null,
    userEmail: null,
    listSurvey: [],
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        listSurvey: state.listSurvey,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createNewForm: (id, author) => {
            dispatch(createNewForm(id, author));
        },

        setStatusDialog: (id) => {
            dispatch(setStatusDialog(id));
        },
    };
};

function HomeBody(props) {
    const history = useHistory();

    var { listSurvey } = props;

    const CreateForm = () => {
        let id = uuid();
        props.createNewForm(id, props.user.email);

        history.push("/form/edit/" + id);
    };

    const handleRemoveSurvey = (id) => {
        props.setStatusDialog(id);
    };

    return (
        <Container>
            <CreateNewSurvey onClick={CreateForm}>
                <AddIcon />
                <p>Bắt đầu biểu mẫu mới</p>
            </CreateNewSurvey>

            <Body>
                <Top>
                    <Left>Biểu mẫu gần đây</Left>

                    <Right>
                        <IconButton>
                            <StorageButton />
                        </IconButton>
                        <IconButton>
                            <SortByButton />
                        </IconButton>
                    </Right>
                </Top>

                {listSurvey.length === 0 ? (
                    <ArrayEmpty>Bạn chưa tạo biểu mẫu nào</ArrayEmpty>
                ) : (
                    <Content>
                        {listSurvey.map((survey, index) => (
                            <FormRecent
                                surver={survey}
                                key={index}
                                handleRemoveSurvey={handleRemoveSurvey}
                            />
                        ))}
                    </Content>
                )}
            </Body>
        </Container>
    );
}

const Container = styled.div`
    max-width: 1128px;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    margin-top: 70px;
`;

const CreateNewSurvey = styled.div`
    font-weight: bold;
    color: #f9f9f9;
    background-color: #0063e5;
    letter-spacing: 1.5px;
    font-size: 18px;
    padding: 10px 0;
    border: 1px solid transparent;
    border-radius: 8px;
    width: 290px;
    height: auto;
    margin: 12px 0 12px 20px;
    position: relative;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: animateDown infinite 1.5s forwards;

    &:hover {
        background-color: #0483ee;
    }

    & > p {
        margin-left: 45px;
    }
`;

const AddIcon = styled(PostAddIcon)`
    position: absolute;
    top: 14px;
    left: 13px;
    font-size: 40px !important;
`;

const Body = styled.div`
    background-color: white;
    width: 100%;
    margin-left: 3px;
    border-radius: 15px;
    position: relative;
    box-sizing: border-box;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 40%);
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    margin: 5px 5px 0 5px;
`;

const Left = styled.div`
    display: inline-block;
    color: #202124;
    font-size: 20px !important;
    font-weight: 520 !important;
    font-size: 16px;
    font-weight: 500;
`;

const Right = styled.div`
    display: inline-block;
    margin-right: 2px;
    border-left: 1px rgb(0 0 0 / 20%) solid;
`;

const Content = styled.div`
    border-top: 1px rgb(0 0 0 / 20%) solid;
    display: grid;
    grid-gap: 20px;
    gap: 20px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    width: 100%;
    box-sizing: border-box;
    padding: 8px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const ArrayEmpty = styled.div`
    border-top: 1px rgb(0 0 0 / 20%) solid;
    box-sizing: border-box;
    padding: 10px 15px;
    color: red;
    font-size: 16px;
    font-weight: 600;
`;

const StorageButton = styled(StorageIcon)`
    font-size: 26px;
    color: black;
`;

const SortByButton = styled(SortByAlphaIcon)`
    font-size: 26px;
    color: black;
`;

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);
