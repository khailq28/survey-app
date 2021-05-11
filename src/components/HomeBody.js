import React from "react";
import style from "../style/homeBody.module.css";
import PostAddIcon from "@material-ui/icons/PostAdd";
import StorageIcon from "@material-ui/icons/Storage";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import { IconButton } from "@material-ui/core";

import FormRecent from "./FormRecent";

function HomeBody(props) {
    return (
        <div className={style.container}>
            <div className={style.createNewSurvey}>
                <PostAddIcon className={style.icon} />
                <p>Bắt đầu biểu mẫu mới</p>
            </div>

            <div className={style.mainbody}>
                <div className={style.main_top}>
                    <div
                        className={style.main_top_left}
                        style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                        Biểu mẫu gần đây
                    </div>

                    <div className={style.main_top_right}>
                        <IconButton>
                            <StorageIcon
                                style={{ fontSize: "26px", color: "black" }}
                            />
                        </IconButton>
                        <IconButton>
                            <SortByAlphaIcon
                                style={{ fontSize: "26px", color: "black" }}
                            />
                        </IconButton>
                    </div>
                </div>
                <div className={style.main_docs}>
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                    <FormRecent />
                </div>
            </div>
        </div>
    );
}

export default HomeBody;
