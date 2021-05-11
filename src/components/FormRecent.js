import React from "react";
import style from "../style/formRecent.module.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import StorageIcon from "@material-ui/icons/Storage";

function FormRecent(props) {
    return (
        <div className={style.doc_card}>
            <img src="/images/home/t-shirt.png" alt="" />
            <div className={style.doc_card_content}>
                <h5 style={{ overFlow: "ellipsis" }}>abc</h5>
                <div className={style.doc_content}>
                    <div
                        className={style.content_left}
                        style={{ fontSize: "12px", color: "grey" }}
                    >
                        <StorageIcon
                            style={{
                                color: "white",
                                fontSize: "20px",
                                backgroundColor: "#6E2594",
                                padding: "3px",
                                marginRight: "3px",
                                borderRadius: "2px",
                            }}
                        />{" "}
                        Đã mở 6/5/2021
                    </div>

                    <MoreVertIcon style={{ color: "grey", fontSize: "20px" }} />
                </div>
            </div>
        </div>
    );
}

export default FormRecent;
