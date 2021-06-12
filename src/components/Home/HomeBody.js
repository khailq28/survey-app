import React, { useEffect } from "react";
import styled from "styled-components";
import PostAddIcon from "@material-ui/icons/PostAdd";
import StorageIcon from "@material-ui/icons/Storage";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FormRecent from "./FormRecent";
import { connect } from "react-redux";
import {
    setStatusDialog,
    sortListSurveys,
    setViewMode,
    setSurveysHome,
    changeStatusProgess,
} from "../../actions";
import PropTypes from "prop-types";
import socket from "../../socket";
import BodySkeleton from "./BodySkeleton";

HomeBody.propTypes = {
    setStatusDialog: PropTypes.func,
    sortListSurveys: PropTypes.func,
    setViewMode: PropTypes.func,
    setSurveysHome: PropTypes.func,
    changeStatusProgess: PropTypes.func,
    handleLoading: PropTypes.func,
    loading: PropTypes.bool,
    user: PropTypes.object,
    listSurvey: PropTypes.array,
    sort: PropTypes.object,
    keyword: PropTypes.string,
    viewMode: PropTypes.string,
};

HomeBody.defaultProps = {
    setStatusDialog: null,
    sortListSurveys: null,
    setSurveysHome: null,
    setViewMode: null,
    changeStatusProgess: null,
    handleLoading: null,
    loading: false,
    user: null,
    listSurvey: [],
    sort: null,
    keyword: "",
    viewMode: null,
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        listSurvey: state.listSurvey,
        sort: state.tools.sort,
        keyword: state.tools.search,
        viewMode: state.tools.viewMode,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setStatusDialog: (id) => {
            dispatch(setStatusDialog(id));
        },

        sortListSurveys: () => {
            dispatch(sortListSurveys());
        },

        setViewMode: () => {
            dispatch(setViewMode());
        },

        setSurveysHome: (aSurvey) => {
            dispatch(setSurveysHome(aSurvey));
        },

        changeStatusProgess: (bStatus) => {
            dispatch(changeStatusProgess(bStatus));
        },
    };
};

function HomeBody(props) {
    const history = useHistory();

    var { listSurvey, sort, keyword, viewMode, loading } = props;

    useEffect(() => {
        if (props.user) {
            // props.changeStatusProgess(true);
            socket.emit("CLIENT_GET_SURVEY_BY_AUTHOR", props.user.email);
        }

        // set state surveys
        socket.on("SERVER_SEND_SURVEYS", (aData) => {
            props.setSurveysHome(aData);
            props.changeStatusProgess(false);
            props.handleLoading();
        });

        socket.on("SERVER_SEND_SURVEYS_ALL", (aData) => {
            props.setSurveysHome(aData);
            props.changeStatusProgess(false);
            props.handleLoading();
        });

        socket.on("SERVER_SEND_MESSAGE_CREATE_SURVEY_SUCCESS", (id) => {
            history.push("/form/edit/" + id);
        });
    }, [props.user]);

    const CreateForm = () => {
        props.changeStatusProgess(true);
        socket.emit("CLIENT_CREATE_NEW_FORM");
    };

    const handleRemoveSurvey = (id) => {
        props.setStatusDialog(id);
    };

    // search
    if (keyword) {
        listSurvey = listSurvey.filter((survey) => {
            return (
                survey.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            );
        });
    }

    // sort
    listSurvey.sort((a, b) => {
        if (a.title > b.title) return sort.value;
        //1 tang, -1 giam
        else if (a.title < b.title) return -sort.value;
        else return 0;
    });

    return (
        <>
            {loading ? (
                <Container>
                    <CreateNewSurvey onClick={CreateForm}>
                        <AddIcon />
                        <p>Bắt đầu biểu mẫu mới</p>
                    </CreateNewSurvey>

                    <Body>
                        <Top>
                            <Left>Biểu mẫu gần đây</Left>

                            <Right>
                                <IconButton onClick={props.setViewMode}>
                                    {viewMode === "grid" ? (
                                        <StorageButton />
                                    ) : (
                                        <ViewComfyButton />
                                    )}
                                </IconButton>
                                <IconButton onClick={props.sortListSurveys}>
                                    <SortByButton />
                                </IconButton>
                            </Right>
                        </Top>

                        {listSurvey.length === 0 ? (
                            <ArrayEmpty>Không có nội dung hiển thị</ArrayEmpty>
                        ) : viewMode === "grid" ? (
                            <Content>
                                {listSurvey.map((survey, index) => (
                                    <FormRecent
                                        survey={survey}
                                        key={index}
                                        viewMode={viewMode}
                                        handleRemoveSurvey={handleRemoveSurvey}
                                    />
                                ))}
                            </Content>
                        ) : (
                            <ContentList>
                                {listSurvey.map((survey, index) => (
                                    <FormRecent
                                        survey={survey}
                                        key={index}
                                        viewMode={viewMode}
                                        handleRemoveSurvey={handleRemoveSurvey}
                                    />
                                ))}
                            </ContentList>
                        )}
                    </Body>
                </Container>
            ) : (
                <BodySkeleton />
            )}
        </>
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
        border: 4px solid rgba(14, 42, 71, 0.9);
        transition-duration: 200ms;
    }

    & > p {
        margin-left: 45px;
    }

    @media (max-width: 280px) {
        width: 90%;
        font-size: 16px;
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

const ContentList = styled.div`
    padding: 8px;
    border-top: 1px rgb(0 0 0 / 20%) solid;
    width: 100%;
    box-sizing: border-box;
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

const ViewComfyButton = styled(ViewComfyIcon)`
    font-size: 26px;
    color: black;
`;

const SortByButton = styled(SortByAlphaIcon)`
    font-size: 26px;
    color: black;
`;

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);
