import React from "react";
import PropTypes from "prop-types";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { IconButton } from "@material-ui/core";

ExportCSV.propTypes = {
    survey: PropTypes.object,
};

function ExportCSV(props) {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const { survey } = props;

    const exportToCSV = () => {
        let custs = [];
        for (let x = 0; x < survey.submiter.length; x++) {
            var arr = [];
            for (let y = 0; y < survey.questions.length; y++) {
                for (let z = 0; z < survey.questions[y].answers.length; z++) {
                    // get answer
                    if (
                        survey.submiter[x].name ===
                        survey.questions[y].answers[z].user
                    ) {
                        var answer = "";
                        var aAnswer = survey.questions[y].answers[z].answer;
                        if (survey.questions[y].questionType === "checkbox") {
                            answer += aAnswer.toString();
                        } else {
                            answer += aAnswer[0];
                        }

                        arr.push({
                            ques: survey.questions[y].questionText,
                            ans: answer,
                        });
                    }
                }

                // custs.push({
                //     "Thời gian": survey.submiter[x].created,
                //     Email: survey.submiter[x].name,
                //     "Câu hỏi": survey.questions[y].questionText,
                //     "Câu trả lời": answer,
                // });
            }
            var obj = {
                "Thời gian": survey.submiter[x].created,
                Email: survey.submiter[x].name,
            };
            for (var j = 0; j < arr.length; j++) {
                obj[
                    arr[j].ques
                        ? arr[j].ques.charAt(0).toUpperCase() +
                          arr[j].ques.slice(1)
                        : "Câu hỏi " + (j + 1)
                ] = arr[j].ans;
            }

            custs.push(obj);
        }
        console.log(custs);

        // save file
        const ws = XLSX.utils.json_to_sheet(custs);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, survey.title + fileExtension);
    };

    return (
        <IconButton onClick={exportToCSV}>
            <img
                src="/images/sheet.png"
                alt=""
                style={{
                    width: "25px",
                    borderRadius: "3px",
                }}
            />
        </IconButton>
    );
}

export default ExportCSV;
