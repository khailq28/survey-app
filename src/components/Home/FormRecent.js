import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import StorageIcon from "@material-ui/icons/Storage";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

FormRecent.propTypes = {
    surver: PropTypes.object,
    handleOnClick: PropTypes.func,
    handleRemoveSurvey: PropTypes.func,
};

FormRecent.defaultProps = {
    surver: null,
    handleOnClick: null,
    handleRemoveSurvey: null,
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

function FormRecent(props) {
    var { surver } = props;
    const history = useHistory();

    const handleOnClick = (id) => {
        history.push("/form/edit/" + id);
    };

    return (
        <Card>
            <img
                src="/images/home/form.png"
                alt=""
                onClick={() => handleOnClick(surver.id)}
            />
            <Body>
                <Content>
                    <ContentBody onClick={() => handleOnClick(surver.id)}>
                        <StorageButton />
                        &nbsp;
                        <Title>{surver.title}</Title>
                    </ContentBody>
                    <DeleteButton
                        onClick={() => props.handleRemoveSurvey(surver.id)}
                    >
                        <CustomDeleteIcon />
                    </DeleteButton>
                </Content>
            </Body>
        </Card>
    );
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 20%), 0 0 0 rgb(0 0 0 / 25%);
    border-radius: 8px;
    animation: scaleForm 0.8s ease-in-out forwards;
    width: 100%;
    cursor: pointer;

    &:hover {
        border: 1px solid #6e2594;
    }

    img {
        box-sizing: border-box;
        width: 70%;
        margin: auto;
        margin-top: 2px;
    }
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 18px;
`;

const Title = styled.h5`
    overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 100%;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
    width: 100%;
`;

const ContentBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const StorageButton = styled(StorageIcon)`
    color: white;
    font-size: 20px;
    background-color: #6e2594;
    padding: 3px;
    margin-right: 3px;
    border-radius: 2px;
`;
const CustomDeleteIcon = styled(DeleteIcon)`
    color: var(--icon-color);
    font-size: 20px;
    transition: 0.4s;

    &:hover {
        font-size: 30px;
        color: var(--basic-color);
    }
`;

const DeleteButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default connect(mapStateToProps, mapDispatchToProps)(FormRecent);
